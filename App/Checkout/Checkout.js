import {
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Linking,
  SafeAreaView,
  Platform
} from 'react-native';
import React from 'react';
import { alpha, fontAlpha, windowHeight, windowWidth } from '../Common/size';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import HudLoading from '../Components/HudLoading';
import { createAction, Storage } from '../Utils';
import DeliveryFeeRequestObject from '../Requests/delivery_fee_request_object';
import MakeOrderRequestObj from '../Requests/make_order_request_obj.js';
import ValidVouchersRequestObject from '../Requests/valid_voucher_request_object.js';
import _ from 'lodash';
import Brew9Toast from '../Components/Brew9Toast';

import {
  TITLE_FONT,
  NON_TITLE_FONT,
  BUTTONBOTTOMPADDING,
  DEFAULT_GREY_BACKGROUND,
  PRIMARY_COLOR,
  TOAST_DURATION,
  LIGHT_GREY
} from '../Common/common_style';
import Moment from 'moment';
import { Analytics, Event } from 'expo-analytics';
import { ANALYTICS_ID } from '../Common/config';
import openMap from 'react-native-open-maps';
import { getMemberIdForApi } from '../Services/members_helper';
import Brew9PopUp from '../Components/Brew9PopUp';
import OrderForSelector from '../Components/OrderForSelector';
import CurveSeparator from '../Components/CurveSeparator';
@connect(({ members, shops, orders, config }) => ({
  company_id: members.company_id,
  currentMember: members.profile,
  members: members,
  selectedShop: shops.selectedShop,
  cart_total_quantity: orders.cart_total_quantity,
  promotion_trigger_count: orders.promotion_trigger_count,
  cart: orders.cart,
  cart_order_id: orders.cart_order_id,
  promotions: orders.promotions,
  promotion_ids: orders.promotion_ids,
  cart_total: orders.cart_total,
  discount_cart_total: orders.discount_cart_total,
  location: members.location,
  delivery: members.delivery,
  shippingAddress: members.shippingAddress,
  responses: config.responses
}))
export default class Checkout extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: TITLE_FONT
          }}
        >
          Checkout
        </Text>
      ),
      headerTintColor: 'black',
      headerLeft: (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={params.onBackPressed ? params.onBackPressed : () => null}
            style={styles.navigationBarItem}
          >
            <Image
              source={require('./../../assets/images/back.png')}
              style={styles.navigationBarItemIcon}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      }
    };
  };

  constructor(props) {
    super(props);
    _.throttle(
      this.checkout.bind(this),
      500 // no new clicks within 500ms time window
    );
    const { discount_cart_total, currentMember, cart_total } = props;
    this.state = {
      delivery_options: 'pickup',
      delivery_description: '',
      vouchers_to_use: [],
      voucher: '',
      valid_vouchers: [],
      isPaymentToggle: false,
      payment_view_height: 0 * alpha,
      selected_payment: '',
      pick_up_time: null,
      pick_up_status: null,
      selected_hour: '00',
      selected_minute: '00',
      selected_address: currentMember.defaultAddress,
      selected_date: null,
      hour_range: [],
      minute_range: [],
      isPickupToogle: false,
      isTimeSelectorToggled: false,
      pickup_view_height: 150 * alpha,
      selected_hour_index: 0,
      selected_minute_index: 0,
      paynow_clicked: false,
      sub_total_voucher: 0,
      final_price: cart_total,
      visible: false,
      applyCode: false,
      addressConfirmation: false,
      deliveryFee: 0.0,
      loading: false,
      range: '',
      voucherTotalDiscount: 0,
      promotionTotalDiscount: 0,
      promotionDiscountValue: {
        value: 0,
        type: null
      },
      enablePaynow: false,
      isConfirmCheckout: false
    };
    const xy = { x: 0, y: windowHeight };
    this.movePickAnimation = new Animated.ValueXY(xy);
    this.timeSelectorAnimation = new Animated.ValueXY(xy);
    this.moveAnimation = new Animated.ValueXY(xy);
  }

  componentDidMount() {
    console.log('\n\n');
    // console.log(this.props.selectedShop)
    console.log(Object.keys(this.props.selectedShop));
    console.log('\n\n');

    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed,
      onItemPressed: this.onItemPressed
    });

    const { dispatch, delivery } = this.props;

    this.setState(
      {
        valid_vouchers: []
      },
      function () {
        this.loadValidVouchers();
        {
          delivery && this.loadDeliveryFee();
        }
      }
    );
    dispatch(createAction('orders/noClearCart')());
    this.check_promotion_trigger();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.promotion_trigger_count != this.props.promotion_trigger_count
    ) {
      this.check_promotion_trigger();
    }
    if (prevProps.currentMember !== this.props.currentMember) {
      this.setState(
        {
          selected_address: this.props.currentMember.defaultAddress
        },
        () => this.loadDeliveryFee()
      );
    }
  }

  setPayNowStatus = () => {
    let { pick_up_status, selected_payment } = this.state;
    if (pick_up_status != null && selected_payment != null) {
      this.setState({
        enablePaynow: true
      });
    }
  };

  /**
   * Formatted price text
   * @returns {string}
   */
  _formattedPrice = (price) => '$' + parseFloat(price).toFixed(2);

  // add 0 before hr if hr is single digit
  formatSelectedHour = (hr) => (hr < 10 ? `0${hr}` : hr);

  loadDeliveryFee = () => {
    // delivery fees are based on location so if recipient address is empty
    // no delivery fee is calculated
    if (this.state.selected_address === null) {
      this.setState({ deliveryFee: 0.0, delivery_description: '' });
      return;
    }

    const callback = (response) => {
      if (response.success) {
        let deliveryFee = response?.result?.delivery_fee || 0;
        let description = response?.result?.delivery_fee_description || '';
        this.setState({
          deliveryFee: parseFloat(deliveryFee).toFixed(2),
          delivery_description: description
        });
      } else {
        // Reset values if in case request fails
        ////console.log('Something went wrong.');
        this.setState({ deliveryFee: 0.0, delivery_description: '' });
      }
    };

    const object = new DeliveryFeeRequestObject(
      this.props.cart_total,
      this.state.selected_address.id
    );

    object.setUrlId(this.props.selectedShop.id);

    this.props.dispatch(
      createAction('shops/loadDeliveryFee')({
        object,
        callback
      })
    );
  };

  loadValidVouchers() {
    const {
      dispatch,
      currentMember,
      selectedShop,
      cart,
      promotions,
      cart_order_id
    } = this.props;
    if (currentMember != null) {
      const callback = (eventObject) => {
        if (eventObject.success) {
          const valid_vouchers = eventObject.result;
          this.setState({ valid_vouchers });

          var valid_voucher_counts = _.filter(valid_vouchers, function (o) {
            if (o.is_valid == true) return o;
          }).length;

          const analytics = new Analytics(ANALYTICS_ID);
          analytics.event(
            new Event(
              'Valid Voucher',
              getMemberIdForApi(currentMember),
              valid_voucher_counts
            )
          );
        }
      };

      // Products with 'product' class are valid
      filtered_cart = _.filter(cart, { clazz: 'product' });

      const obj = new ValidVouchersRequestObject(
        selectedShop.id,
        filtered_cart,
        promotions,
        cart_order_id
      );

      obj.setUrlId(currentMember.id);

      dispatch(
        createAction('vouchers/loadVouchersForCart')({
          object: obj,
          callback
        })
      );
    }
  }

  onBackPressed = () => {
    const { navigation } = this.props;
    const { routeName, key } = navigation.getParam('returnToRoute');

    navigation.navigate({ routeName, key });
  };

  onConfirmOrderSchedule = (option, hour, min, range) => {
    var today = Moment();
    var tomorrow = Moment().add(1, 'days');
    var selected_date = option == 'Tomorrow' ? tomorrow : today;

    var pick_up_status = option;

    hour = this.formatSelectedHour(hour);

    var pick_up_time = `${selected_date.format('YYYY-MM-DD')} ${hour}:${min}`;

    this.setState({ pick_up_time, pick_up_status, range }, () =>
      this.setPayNowStatus()
    );

    this._toggleTimeSelector();
  };

  _getFormattedSchedule = () => {
    var _pick_up_time = Moment(this.state.pick_up_time).format('H:mma');
    switch (this.state.pick_up_status) {
      case 'Now':
        return 'Now';

      case 'Later':
        return this.state.range;

      case 'Tomorrow':
        return 'Tomorrow ' + this.state.range;
    }
  };

  onBranchButtonPressed = () => {};

  // onLocationButtonPressed = () => {
  //   const { navigate } = this.props.navigation;

  //   navigate('DirectionMap', {
  //     shop: this.props.selectedShop
  //   });
  // };

  onPressDirection(shop) {
    // console.log(shop)
    let lat = shop.latitude;
    let long = shop.longitude;
    let latitude = lat ? parseFloat(lat) : 4.8886091;
    let longitude = long ? parseFloat(long) : 114.8976136;
    let location = latitude + ',' + longitude;
    const url = Platform.select({
      ios:
        'https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=' +
        location,
      android: 'https://www.google.com/maps/dir/?api=1&destination=' + location
    });

    Linking.openURL(url);
  }

  onDeliveryButtonPressed = () => {
    this.setState({
      delivery_options: 'delivery'
    });
  };

  onPickUpButtonPressed = () => {
    this.setState({
      delivery_options: 'pickup'
    });
  };

  onAutoFillPressed = () => {};

  onVoucherButtonPressed = () => {
    const { navigate } = this.props.navigation;
    const { currentMember } = this.props;
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event('Checkout', getMemberIdForApi(currentMember), 'Select Voucher')
    );
    navigate('CheckoutVoucher', {
      valid_vouchers: this.state.valid_vouchers,
      cart: this.props.cart,
      addVoucherAction: this.addVoucherItemsToCart
    });
  };

  addShippingAddress = () => {
    const { navigation } = this.props;

    this.setState({ visible: false });
    navigation.navigate('ShippingAddress', {
      selected_address: this.state.selected_address,
      returnToRoute: this.props.navigation.state
    });
  };

  addFirstShippingAddress = () => {
    const { navigation } = this.props;
    this.setState({ visible: false });
    navigation.navigate('AddShippingAddress', {
      params: null,
      initialAddress: true
    });
  };

  onCancelVoucher = (item) => {
    let new_voucher_list = [...this.state.vouchers_to_use];
    const search_voucher_index = new_voucher_list.findIndex(
      (element) => element.id == item.id
    );

    new_voucher_list.splice(search_voucher_index, 1);
    this.setState(
      {
        vouchers_to_use: new_voucher_list
      },
      function () {
        this.applyVoucher(new_voucher_list);
      }
    );
  };

  addVoucherItemsToCart = (voucher_item) => {
    const { vouchers_to_use } = this.state;
    // ////console.log("\nSelected Voucher:")
    // ////console.log(voucher_item)
    this.setState({ vouchers_to_use: [voucher_item] });
    this.applyVoucher([voucher_item]);
  };

  roundOff(value) {
    roundOffValue = 0;
    let n = parseInt((value * 100).toFixed(10)),
      x = n % 10;
    let result = n + 10 - x;
    if (x < 6) result -= 10 / (parseInt(x / 3) + 1);
    roundOffValue = (result / 100).toFixed(2);

    return roundOffValue;
  }

  check_promotion_trigger = () => {
    const {
      currentMember,
      dispatch,
      promotions,
      cart_total,
      selectedShop,
      delivery,
      cart
    } = this.props;

    let { sub_total_voucher, deliveryFee } = this.state;
    let shop = selectedShop;
    let newcart = [...this.props.cart];
    let finalCart = [];
    var promotions_item = [];
    var final_cart_value =
      sub_total_voucher != 0 ? sub_total_voucher : cart_total;
    var cart_total_voucher =
      sub_total_voucher != 0 ? sub_total_voucher : cart_total;
    var final_promo_text = '';
    // var cartTotalQuantity = 0;
    // cart.map((value, key) => {
    //   cartTotalQuantity += value.quantity

    // })

    // ////console.log("quantity:")
    // ////console.log(cartTotalQuantity)
    // reset cart promotions
    for (var index in newcart) {
      item = newcart[index];
      if (item.clazz == 'product') {
        finalCart.push(item);
      }
    }
    if (shop.all_promotions != null && shop.all_promotions.length > 0) {
      for (var index in shop.all_promotions) {
        var promotion = shop.all_promotions[index];
        if (currentMember != null) {
          if (promotion.trigger_price != null) {
            var price = 0;
            var roundedPrice = 0;
            var trigger_price = parseFloat(promotion.trigger_price);
            var remaining = trigger_price - cart_total;
            if (remaining <= 0) {
              shop.all_promotions[index].has_triggered = true;
              if (
                promotion.reward_type != null &&
                promotion.reward_type == 'Discount'
              ) {
                if (
                  promotion.value_type != null &&
                  promotion.value_type == 'percent'
                ) {
                  var promotionSettings = {
                    value: promotion.value,
                    type: promotion.value_type
                  };
                  this.setState({
                    promotionDiscountValue: promotionSettings
                  });
                  var discount_value = promotion.value ? promotion.value : 0;
                  price = this.roundOff(
                    (final_cart_value * discount_value) / 100
                  );
                  roundedPrice = this.roundOff(
                    (final_cart_value * discount_value) / 100
                  );
                  if (
                    promotion.maximum_discount_allow != null &&
                    price > promotion.maximum_discount_allow
                  ) {
                    price = promotion.maximum_discount_allow;
                  }
                  final_cart_value = final_cart_value - price;
                } else if (
                  promotion.value_type != null &&
                  promotion.value_type == 'fixed'
                ) {
                  var promotionSettings = {
                    value: promotion.value,
                    type: promotion.value_type
                  };
                  this.setState({
                    promotionDiscountValue: promotionSettings
                  });
                  var discount_value = promotion.value ? promotion.value : 0;
                  price = promotion.value;
                  final_cart_value = final_cart_value - discount_value;
                }
              }

              let cartItem = {
                clazz: 'promotion',
                id: promotion.id,
                name: promotion.cart_text,
                description: '',
                price: price,
                type: promotion.reward_type,
                roundedPrice: roundedPrice
              };

              promotions_item.push(cartItem);
            } else {
              var display_text = promotion.display_text;
              final_promo_text = display_text.replace(
                '$remaining',
                `$${parseFloat(remaining).toFixed(2)}`
              );

              break;
            }
          }
        }
      }
      this.setState({
        final_price: final_cart_value,
        promotionTotalDiscount: cart_total - final_cart_value
      });
    }

    if (this.props.cart.length == 0) {
      final_promo_text = '';
      this.setState({ isCartToggle: false }, function () {
        Animated.spring(this.moveAnimation, {
          toValue: { x: 0, y: windowHeight }
        }).start();
      });
    } else {
    }

    dispatch(
      createAction('orders/updatePromotionText')({
        promotionText: final_promo_text
      })
    );
    dispatch(
      createAction('orders/updatePromotions')({
        promotions: promotions_item
      })
    );

    dispatch(
      createAction('orders/updateDiscountCartTotal')({
        discount_cart_total: final_cart_value
      })
    );
  };

  filterProductsByVoucher(voucher, qty) {
    const { cart, discount_cart_total } = this.props;
    var targetQuantity = voucher.eligible_discount_quantity;
    var targetProductIDList = voucher.product_ids;
    var voucherID = voucher.id;
    var voucherDetails = voucher.voucher;
    var voucherDiscountTotal = 0;
    var promotionDiscountTotal = this.state.promotionTotalDiscount;
    var promotionSettings = this.state.promotionDiscountValue;
    var promotionValue = 0;

    // if(promotionSettings.type == 'percent'){
    //   promotionValue = promotionSettings.value/100
    // }

    ////console.log("VALUE")
    ////console.log(promotionSettings)
    ////console.log("Promotion Total Discount: ")
    ////console.log(this.state.promotionTotalDiscount)
    ////console.log("Voucher: ")
    ////console.log(voucher)
    //console.log("ELIGIBLE_QTY")
    //console.log(targetQuantity)
    //console.log("before")
    //console.log(cart)

    cart.sort(function (a, b) {
      if (parseFloat(a.price) < parseFloat(b.price)) {
        return -1;
      }
      return 0;
    });

    //console.log("after")
    //console.log(cart)

    cart.map((value, key) => {
      var productID = value.id;
      var productQuantity = value.quantity;
      var productPrice = value.price;
      if (targetProductIDList.includes(productID)) {
        var discountVoucherQuantity = Math.min(targetQuantity, productQuantity);

        if (targetQuantity > 0) {
          targetQuantity -= discountVoucherQuantity;
          value.discount_voucher_quantity = discountVoucherQuantity;
          value.discount_voucher_item_id = voucherID;

          if (promotionSettings.type == 'percent') {
            if (voucherDetails.discount_type.toLowerCase() == 'fixed') {
              voucherDiscountTotal =
                voucherDiscountTotal +
                voucherDetails.discount_price * discountVoucherQuantity;
            } else if (
              voucherDetails.discount_type.toLowerCase() == 'percent'
            ) {
              var voucherDeductionPercentage = voucherDetails.discount_price;
              productPrice -= this.roundOff(
                (productPrice * promotionSettings.value) / 100
              );
              var voucherDeductionValue = this.roundOff(
                (productPrice * voucherDetails.discount_price) / 100.0
              );
              voucherDiscountTotal =
                voucherDiscountTotal +
                voucherDeductionValue * discountVoucherQuantity;
            }
          } else if (promotionSettings.type == null) {
            if (voucherDetails.discount_type.toLowerCase() == 'fixed') {
              voucherDiscountTotal =
                voucherDiscountTotal +
                voucherDetails.discount_price * discountVoucherQuantity;
            } else if (
              voucherDetails.discount_type.toLowerCase() == 'percent'
            ) {
              var voucherDeductionPercentage = voucherDetails.discount_price;
              var voucherDeductionValue = this.roundOff(
                (productPrice * voucherDetails.discount_price) / 100.0
              );
              voucherDiscountTotal =
                voucherDiscountTotal +
                voucherDeductionValue * discountVoucherQuantity;
            }
          }
        }
      }
    });

    return discount_cart_total - voucherDiscountTotal;
  }

  applyVoucher(vouchers_to_use) {
    const { discount_cart_total } = this.props;
    const { selected_payment } = this.state;
    var voucherDeductedTotal = discount_cart_total;

    for (var index in vouchers_to_use) {
      let voucher = vouchers_to_use[index].voucher;

      if (voucher.voucher_type == 'Cash Voucher') {
        voucherDeductedTotal = voucherDeductedTotal - voucher.discount_price;
      } else if (voucher.voucher_type == 'Discount') {
        if (
          voucher.discount_type != null &&
          voucher.discount_type != '' &&
          voucher.discount_price != null &&
          voucher.discount_price != 0
        ) {
          if (vouchers_to_use[index].product_ids.length != 0) {
            voucherDeductedTotal = this.filterProductsByVoucher(
              vouchers_to_use[index]
            );
          } else if (voucher.discount_type.toLowerCase() == 'fixed') {
            voucherDeductedTotal =
              voucherDeductedTotal - voucher.discount_price;
          } else if (voucher.discount_type.toLowerCase() == 'percent') {
            var voucherConvertedToFix = this.roundOff(
              (voucherDeductedTotal * voucher.discount_price) / 100.0
            );
            voucherDeductedTotal = voucherDeductedTotal - voucherConvertedToFix;
          }
        }
      }
    }

    const final_price = voucherDeductedTotal;
    const voucherTotalDiscount = discount_cart_total - voucherDeductedTotal;

    this.setState({ final_price, voucherTotalDiscount });

    if (selected_payment == 'credit_card' && voucherDeductedTotal <= 0) {
      this.setState({ selected_payment: '' });
    }
  }

  onPaymentButtonPressed = () => {
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event(
        'Checkout',
        getMemberIdForApi(this.props.currentMember),
        'Select Payment'
      )
    );
    this.tooglePayment();
  };

  removeItemFromCart(products, description) {
    const { dispatch } = this.props;
    let newcart = [...this.props.cart];
    let product_ids = products.map((item) => item.id);
    for (item of newcart) {
      if (product_ids.includes(item.id)) {
        item.cannot_order = true;
      }
    }
    dispatch(
      createAction('orders/updateCart')({
        cart: newcart
      })
    );
  }

  onRemoveItem(item) {
    const { dispatch } = this.props;
    let new_cart = [...this.props.cart];
    const search_product_index = new_cart.findIndex(
      (element) => element.id == item.id
    );

    new_cart.splice(search_product_index, 1);

    dispatch(
      createAction('orders/updateCart')({
        cart: new_cart
      })
    );
  }

  loadMakeOrder() {
    const {
      cart,
      dispatch,
      selectedShop,
      promotion_ids,
      cart_order_id,
      navigation,
      location,
      delivery
    } = this.props;
    const { navigate } = this.props.navigation;
    const {
      vouchers_to_use,
      selected_payment,
      pick_up_status,
      pick_up_time,
      selected_address
    } = this.state;

    let address_id = selected_address == null ? null : selected_address.id;

    this.setState({ loading: true, isConfirmCheckout: false });

    const callback = (eventObject) => {
      this.setState({ loading: false });

      if (eventObject.success) {
        if (selected_payment == 'credits') {
          setTimeout(
            function () {
              this.clearCart();
            }.bind(this),
            500
          );
        } else if (selected_payment == 'counter') {
          setTimeout(
            function () {
              this.clearCart();
            }.bind(this),
            500
          );
        } else {
          const order = eventObject.result;

          navigate('PaymentsWebview', {
            name: `Brew9 Order`,
            order_id: order.receipt_no,
            session_id: order.session_id,
            amount: order.total,
            type: 'order',
            returnToRoute: navigation.state,
            clearCart: () => this.clearCart()
          });
        }
      } else {
        this.refs.toast.show(eventObject.message, TOAST_DURATION);

        if (Array.isArray(eventObject.result)) {
          if (eventObject.result.length > 0) {
            let item = eventObject.result[0];
            if ((item.clazz = 'product')) {
              this.removeItemFromCart(eventObject.result, eventObject.message);
              return;
            }
          }
        }
      }
    };
    var latitude = null;
    var longitude = null;

    if (location != null) {
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;
    }

    delivery_option = 0; // 0 - Pickup 1 - Delivery
    if (delivery) {
      delivery_option = 1;
    }

    filtered_cart = _.filter(cart, { clazz: 'product' });
    const voucher_item_ids = vouchers_to_use.map((item) => item.id);
    const obj = new MakeOrderRequestObj(
      filtered_cart,
      voucher_item_ids,
      this.state.selected_payment,
      promotion_ids,
      pick_up_status,
      pick_up_time,
      cart_order_id,
      latitude,
      longitude,
      delivery_option,
      address_id
    );
    obj.setUrlId(selectedShop.id);
    dispatch(
      createAction('shops/loadMakeOrder')({
        object: obj,
        callback
      })
    );
  }

  onWalletButtonPressed = () => {
    this.setState({
      selected_payment: 'credits'
    });
    this.setPayNowStatus();
  };

  onCreditButtonPressed = () => {
    this.setState({
      selected_payment: 'credit_card'
    });
    this.setPayNowStatus();
  };
  onCounterButtonPressed = () => {
    this.setState({
      selected_payment: 'counter'
    });
    this.setPayNowStatus();
  };

  clearCart = () => {
    const { navigation, dispatch } = this.props;
    dispatch(createAction('orders/resetCart')({}));
    const { routeName, key } = navigation.getParam('returnToRoute');
    navigation.navigate({
      routeName,
      key
    });
  };

  checkout = () => {
    this.setState({ isConfirmCheckout: true });
  };

  renderConfirmPopup = () => {
    let { isConfirmCheckout } = this.state;
    const { responses, selectedShop } = this.props;
    const r = responses;
    const fallbackText = 'Are you sure you want to order from this location?';
    const confirmText = r.get('Checkout Confirm') || fallbackText;
    const description = `${confirmText} ${selectedShop.name}`;
    const title = r.get('Checkout Confirm Title') || 'Confirm Checkout';
    const OkText = r.get('Checkout Confirm Button') || 'Confirm';
    const cancelText = r.get('Checkout Cancel Button') || 'Cancel';
    const popUpVisible = isConfirmCheckout;
    return (
      <Brew9PopUp
        onPressOk={this.onPayNowPressed}
        onBackgroundPress={() => {}}
        onPressCancel={() => this.setState({ isConfirmCheckout: false })}
        {...{ popUpVisible, title, description, OkText, cancelText }}
      />
    );
  };

  onPayNowPressed = () => {
    const { navigate } = this.props.navigation;
    const {
      selected_payment,
      pick_up_status,
      final_price,
      pick_up_time,
      selected_address
    } = this.state;
    const { currentMember, selectedShop, delivery } = this.props;
    const analytics = new Analytics(ANALYTICS_ID);
    const event = new Event(
      'Checkout',
      getMemberIdForApi(currentMember),
      'Pay Now'
    );

    analytics.event(event);

    if (currentMember != undefined) {
      if (delivery && !selected_address) {
        this.addShippingAddress();
        return;
      } else {
        if (selected_payment == '') {
          this.tooglePayment();
          return;
        }

        if (selected_payment == 'credits') {
          if (
            parseFloat(final_price) >
            parseFloat(currentMember.credits).toFixed(2)
          ) {
            var msg =
              this.props.responses.get('Popup - Insufficient credit') ||
              'Oops, insufficient credit.\nPlease select other payment option.';
            this.refs.toast.show(msg, TOAST_DURATION + 1000);

            return;
          }
        }

        if (pick_up_status == null) {
          this._toggleTimeSelector();
          return;
        } else {
          if (selectedShop != null) {
            var opening = Moment(selectedShop.opening_hour.start_time, 'h:mm');
            var closing = Moment(selectedShop.opening_hour.end_time, 'h:mm');
            var pickup = Moment(pick_up_time, 'h:mm');
            var now = Moment(new Date(), 'HH:mm');
            if (pickup < now && pick_up_status == 'Pick Later') {
              const message = 'Pick up time is not available';
              this.refs.toast.show(message, TOAST_DURATION);
              return;
            }
            // else if (pickup < opening) {
            // 	this.refs.toast.show("Shop is not open at this time", TOAST_DURATION)
            // 	return
            // }
            else if (pickup > closing) {
              const message = 'We are closed at this time.';
              this.refs.toast.show(message, TOAST_DURATION);
              return;
            }
          }
        }

        this.loadMakeOrder();

        return;
      }
    } else {
      navigate('VerifyUser', {
        returnToRoute: this.props.navigation.state
      });
      return;
    }
  };

  addressConfirmation = () => {
    this.setState({ addressConfirmation: true });
  };

  measureView(event) {
    this.setState({
      payment_view_height: event.nativeEvent.layout.height
    });
  }

  onClosePressed = () => {
    this.setState({
      loginModalVisible: false,
      registerModalVisible: false
    });
  };

  onCallPressed = (phone_no) => {
    Linking.openURL(`tel:${phone_no}`);
  };

  tooglePickup = () => {
    const { isPickupToogle, pickup_view_height } = this.state;

    var product_checkout_height = pickup_view_height;
    var content = 247 * alpha;
    var finalheight = pickup_view_height - content - BUTTONBOTTOMPADDING;

    if (isPickupToogle) {
      this.setState(
        { isPickupToogle: false, isTimeSelectorToggled: false },
        function () {
          Animated.spring(this.movePickAnimation, {
            toValue: { x: 0, y: windowHeight }
          }).start();
        }
      );
    } else {
      this.setState(
        { isPickupToogle: true, isTimeSelectorToggled: true },
        function () {
          Animated.spring(this.movePickAnimation, {
            toValue: { x: 0, y: 52 * alpha }
          }).start();
        }
      );
    }
  };

  _toggleTimeSelector = () => {
    const { isTimeSelectorToggled } = this.state;

    const y = () => (isTimeSelectorToggled ? windowHeight : 52 * alpha);

    this.setState(
      { isTimeSelectorToggled: !isTimeSelectorToggled },
      function () {
        Animated.spring(this.timeSelectorAnimation, {
          toValue: { x: 0, y: y() }
        }).start();
      }
    );
  };

  tooglePayment = () => {
    const { isPaymentToggle, payment_view_height } = this.state;

    var product_checkout_height = payment_view_height;
    var content = 247 * alpha;

    if (isPaymentToggle) {
      this.setState({ isPaymentToggle: false }, function () {
        Animated.spring(this.moveAnimation, {
          toValue: { x: 0, y: windowHeight }
        }).start();
      });
    } else {
      this.setState({ isPaymentToggle: true }, function () {
        Animated.spring(this.moveAnimation, {
          toValue: { x: 0, y: 52 * alpha }
        }).start();
      });
    }
  };

  pickUpNow = () => {
    let { selectedShop } = this.props;
    var time_now = Moment(new Date(), 'h:mm');
    var opening = Moment(selectedShop.opening_hour.start_time, 'h:mm');
    var closing = Moment(selectedShop.opening_hour.end_time, 'h:mm');
    if (time_now >= opening && time_now <= closing) {
      return true;
    } else {
      return false;
    }
  };

  getCheapestProduct(items) {
    var cheapestPrice = Infinity;
    var cheapestProduct = null;
    for (var i in items) {
      var price = items[i].price;
      if (cheapestPrice > price) {
        cheapestPrice = price;
        cheapestProduct = items[i];
      }
    }

    return cheapestProduct;
  }

  renderVoucherSection(vouchers) {
    const { cart, discount_cart_total } = this.props;

    const voucher_items = vouchers.map((item, key) => {
      var discount_value = null;
      var voucherDisplayName = item.voucher.name;
      if (item.voucher.discount_price) {
        if (item.voucher.discount_type == 'fixed') {
          discount_value = item.voucher.discount_price;
        } else if (item.voucher.discount_type == 'percent') {
          discount_value =
            (discount_cart_total * item.voucher.discount_price) / 100.0;
        }
      }
      if (item.product_ids.length != 0) {
        // this.filterProductsByVoucher(item)
      }

      return (
        <View style={[styles.drinksView]} key={key}>
          <View
            pointerEvents="box-none"
            style={{
              justifyContent: 'center',
              backgroundColor: 'transparent',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View style={styles.productDetailView}>
              <View style={styles.voucherDetailView}>
                <Text style={styles.productNameText}>{voucherDisplayName}</Text>
                <View style={styles.voucherButtonView}>
                  <Text style={styles.voucherButtonText}>Voucher</Text>
                </View>
              </View>
              {/* {item.voucher.description.length > 0 && (
                <View style={styles.voucherDetailView}>
                  <Text style={styles.productVariantText}>
                    {item.voucher.description}
                  </Text>
                </View>
              )} */}
              <View style={styles.spacer} />
            </View>
            {/* {item.voucher.free_quantity ? <Text
                        style={styles.voucherQuantityText}>x{item.voucher.free_quantity}</Text> : undefined} */}
            {discount_value ? (
              <Text style={styles.voucherPriceText}>{`-$${parseFloat(
                this.roundOff(this.state.voucherTotalDiscount)
              ).toFixed(2)}`}</Text>
            ) : undefined}

            <TouchableOpacity
              onPress={() => this.onCancelVoucher(item)}
              style={styles.cancelVoucherButton}
            >
              <Image
                source={require('./../../assets/images/cancel.png')}
                style={styles.cancelImage}
              />
            </TouchableOpacity>

            <Image
              source={require('./../../assets/images/dotted-line.png')}
              style={styles.dottedLineImage}
            />
          </View>
        </View>
      );
    });

    var valid_voucher_counts = _.filter(this.state.valid_vouchers, function (
      o
    ) {
      if (o.is_valid == true) return o;
    }).length;
    return (
      <View style={styles.sectionView}>
        <TouchableOpacity
          onPress={
            this.state.valid_vouchers != null &&
            this.state.valid_vouchers.length > 0
              ? () => this.onVoucherButtonPressed()
              : () => null
          }
          style={styles.voucherButton}
        >
          <View pointerEvents="box-none" style={styles.sectionRowView}>
            <Text style={styles.productNameText}>Brew9 Vouchers</Text>
            <View style={styles.spacer} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Text
                style={
                  this.state.valid_vouchers != null &&
                  this.state.valid_vouchers.length > 0
                    ? styles.productVoucherText
                    : styles.productVoucherDisableText
                }
              >
                {this.state.valid_vouchers != null ? valid_voucher_counts : '-'}{' '}
                usable
              </Text>
              <Image
                source={require('./../../assets/images/next.png')}
                style={styles.menuRowArrowImage}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.orderitemsView}>{voucher_items}</View>
      </View>
    );
  }

  renderPaymentSection() {
    const { currentMember, delivery } = this.props;
    const { selected_payment } = this.state;

    const credits =
      currentMember != undefined
        ? parseFloat(currentMember.credits).toFixed(2)
        : 0;

    return (
      <View style={styles.sectionView}>
        <View style={styles.voucherButton}>
          <View style={styles.sectionRowView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View
                style={[
                  selected_payment != '' ? styles.greenCircle : styles.redCircle
                ]}
              />
              <Text style={[styles.productNameText]}>Payment</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  changeTimeSchedule = () => {
    if (!this.refs.timepicker.hasSchedule()) {
      this.refs.toast.show('No time slots available.', TOAST_DURATION);
    }
    this._toggleTimeSelector();
  };

  renderPickupTime() {
    const { pick_up_status, pick_up_time } = this.state;
    var { delivery } = this.props;
    var pick_up = delivery ? 'Delivery Time' : 'Pick Up Time';
    var formatted_time = this._getFormattedSchedule();
    return (
      <View style={styles.sectionView}>
        <TouchableOpacity
          onPress={() => this.changeTimeSchedule()}
          style={styles.voucherButton}
        >
          <View pointerEvents="box-none" style={styles.sectionRowView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={
                  pick_up_status != null ? styles.greenCircle : styles.redCircle
                }
              />
              <Text style={styles.productNameText}>{pick_up}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Text style={styles.productVoucherText}>
                {pick_up_time != null ? formatted_time : 'Please select'}
              </Text>
              <Image
                source={require('./../../assets/images/next.png')}
                style={styles.menuRowArrowImage}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderOrderItems(items, promotions) {
    let fullList = [...items];
    let last_item = fullList[fullList.length - 1];

    const order_items = fullList.map((item, key) => {
      var price_string =
        item.price != undefined && item.price > 0 && item.clazz == 'product'
          ? `$${parseFloat(item.price).toFixed(2)}`
          : item.price != undefined &&
            item.price > 0 &&
            item.clazz == 'promotion'
          ? `-$${parseFloat(item.roundedPrice).toFixed(2)}`
          : item.type != undefined && item.type == 'Free Items and vouchers'
          ? 'Free'
          : '';

      let filtered =
        item.selected_variants != null
          ? item.selected_variants.filter(function (el) {
              return el;
            })
          : [];

      let variant_array = filtered.map((a) => a.value);
      return (
        <View style={styles.drinksView} key={key}>
          <View
            pointerEvents="box-none"
            style={{
              justifyContent: 'center',
              backgroundColor: 'transparent',
              flex: 1,
              flexDirection: 'row'
            }}
          >
            <View style={styles.productDetailView}>
              <Text
                style={
                  item.cannot_order != undefined && item.cannot_order == true
                    ? styles.productNameDisabledText
                    : styles.productNameText
                }
              >
                {item.name}
              </Text>
              {variant_array.length > 0 ? (
                <Text style={styles.productVariantText}>
                  {variant_array.join(', ')}
                </Text>
              ) : (
                <View style={styles.spacer} />
              )}
            </View>
            <Text style={styles.productQuantityText}>
              {item.quantity != null &&
                item.quantity > 0 &&
                `x${item.quantity}`}
            </Text>
            <Text style={styles.productPriceText}>{price_string}</Text>
            {item.cannot_order != undefined && item.cannot_order == true && (
              <TouchableOpacity
                onPress={() => this.onRemoveItem(item)}
                style={styles.cancelVoucherButton}
              >
                <Image
                  source={require('./../../assets/images/cancel.png')}
                  style={styles.cancelImage}
                />
              </TouchableOpacity>
            )}
            {item.id != last_item.id && (
              <Image
                source={require('./../../assets/images/dotted-line.png')}
                style={styles.dottedLineImage}
              />
            )}
          </View>
        </View>
      );
    });

    return (
      <View
        style={[
          styles.sectionView,
          this.props.delivery && {
            paddingTop: 20
          }
        ]}
      >
        <View style={styles.orderitemsView}>{order_items}</View>
      </View>
    );
  }

  renderPromotions = (promotions) => {
    let promotions_item = promotions.map((item, key) => {
      var price_string =
        item.price != undefined && item.price > 0 && item.clazz == 'product'
          ? `$${parseFloat(item.price).toFixed(2)}`
          : item.price != undefined &&
            item.price > 0 &&
            item.clazz == 'promotion'
          ? `-$${parseFloat(item.price).toFixed(2)}`
          : item.type != undefined && item.type == 'Free Items and vouchers'
          ? 'Free'
          : 'Rebate';
      let filtered =
        item.selected_variants != null
          ? item.selected_variants.filter(function (el) {
              return el;
            })
          : [];

      return (
        <View
          style={[styles.drinksView, { marginVertical: 0 * alpha }]}
          key={key}
        >
          <View
            pointerEvents="box-none"
            style={{
              justifyContent: 'center',
              backgroundColor: 'transparent',
              flex: 1,
              flexDirection: 'row'
            }}
          >
            <View style={styles.productDetailView}>
              <Text
                style={[
                  item.cannot_order != undefined && item.cannot_order == true
                    ? styles.productNameDisabledText
                    : styles.productNameText,
                  { marginBottom: 0 }
                ]}
              >
                {item.name}
              </Text>
            </View>
            <Text style={styles.productQuantityText}>
              {item.quantity != null &&
                item.quantity > 0 &&
                `x${item.quantity}`}
            </Text>
            <Text style={styles.productPriceText}>{price_string}</Text>
          </View>
        </View>
      );
    });

    if (promotions_item && promotions_item.length > 0) {
      return (
        <View>
          <CurveSeparator />
          <View style={[styles.sectionView, { paddingBottom: 10 * alpha }]}>
            <View style={styles.orderitemsView}>{promotions_item}</View>
          </View>
        </View>
      );
    }
  };

  renderDeliveryAddress = (address) => {
    let { deliveryFee, final_price, delivery_description } = this.state;
    let text = address ? 'Change' : 'Add';
    let non_negative_subTotal_price = parseFloat(
      Math.max(0, final_price)
    ).toFixed(2);
    return (
      <View style={styles.deliveryAddressView}>
        <View style={styles.voucherButton}>
          <View style={styles.drinksView}>
            <View style={[styles.deliveryAddressDetail, { flex: 1 }]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 3 * alpha
                }}
              >
                <Text style={[styles.productNameText]}>Delivery Address</Text>
                <TouchableOpacity
                  onPress={() => this.addShippingAddress()}
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text style={[styles.editAddressText]}>{text}</Text>
                  <Image
                    source={require('./../../assets/images/next.png')}
                    style={styles.menuRowArrowImage}
                  />
                </TouchableOpacity>
              </View>

              {address && (
                <View>
                  <Text style={styles.addressText}>
                    {
                      address.address
                      // '\n' +
                      // address.city +
                      // ' , ' +
                      // address.postal_code +
                      // ', ' +
                      // address.state +
                      // ', ' +
                      // address.country
                    }
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // paddingHorizontal: 10 * alpha,
              paddingBottom: 10 * alpha
            }}
          >
            <Text style={styles.productNameText}>Subtotal</Text>
            <Text style={styles.productVoucherText}>
              {`$${parseFloat(non_negative_subTotal_price).toFixed(2)}` ||
                '$ 0.00'}
            </Text>
          </View>
          {address && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.productNameText}>Delivery fees</Text>
                {delivery_description != '' && (
                  <Text style={styles.deliveryNoted}>
                    {delivery_description}
                  </Text>
                )}
              </View>
              <Text style={styles.productVoucherText}>
                {this._formattedPrice(deliveryFee)}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  renderOrderForSelector = () => {
    const { delivery, selectedShop } = this.props;
    const { opening_hour, delivery_hour } = selectedShop;
    let today = [];
    let tomorrow = [];
    if (delivery) {
      (today = delivery_hour?.today?.delivery_time_slot || []),
        (tomorrow = delivery_hour?.tomorrow?.delivery_time_slot || []);
    } else {
      today = opening_hour?.ordering_time_slot || [];
    }
    return (
      <OrderForSelector
        ref="timepicker"
        delivery={this.props.delivery}
        today={today || []}
        tomorrow={tomorrow || []}
        animation={this.timeSelectorAnimation}
        toggleDelivery={this._toggleTimeSelector}
        onConfirm={this.onConfirmOrderSchedule}
      />
    );
  };

  renderPaymentOptions = () => {
    const { currentMember, delivery } = this.props;
    const { final_price, selected_payment } = this.state;
    let cashPayment = delivery ? 'Cash On Delivery' : 'Pay In Store';
    let credits =
      currentMember != undefined
        ? parseFloat(currentMember.credits).toFixed(2)
        : 0;
    var no_payment_needed = final_price <= 0 ? true : false;

    let walletSelectBox =
      selected_payment == 'credits' ? (
        <View style={[styles.selectBox, { backgroundColor: '#00B2E3' }]} />
      ) : (
        <View style={styles.selectBox} />
      );

    let cardSelectBox =
      selected_payment == 'credit_card' ? (
        <View style={[styles.selectBox, { backgroundColor: '#00B2E3' }]} />
      ) : (
        <View style={styles.selectBox} />
      );

    let counterSelectBox =
      selected_payment == 'counter' ? (
        <View style={[styles.selectBox, { backgroundColor: '#00B2E3' }]} />
      ) : (
        <View style={styles.selectBox} />
      );

    let walletIconStyle =
      selected_payment == 'credits'
        ? [styles.paymentWalletIcon, { tintColor: PRIMARY_COLOR }]
        : styles.paymentWalletIcon;

    let cardIconStyle =
      selected_payment == 'credit_card'
        ? [styles.paymentCardIcon, { tintColor: PRIMARY_COLOR }]
        : styles.paymentCardIcon;

    let cashIconStyle =
      selected_payment == 'counter'
        ? [styles.paymentCashIcon, { tintColor: PRIMARY_COLOR }]
        : styles.paymentCashIcon;

    let creditStyle =
      credits > 0
        ? [styles.creditsText, { color: PRIMARY_COLOR }]
        : console.log('was wawart');

    return (
      <View style={styles.paymentOptionsView}>
        <TouchableOpacity
          onPress={() => this.onWalletButtonPressed()}
          style={styles.paymentOptionsListView}
        >
          <Image
            source={require('./../../assets/images/wallet_center.png')}
            style={walletIconStyle}
          />
          <View>
            <View style={styles.walletTextContainer}>
              <Text style={styles.paymentOptionText}>Wallet</Text>
              {/* <View style={styles.tag}>
                <Text style={styles.tagText}>Top up $10 & get $5 extra</Text>
              </View> */}
            </View>
            <Text style={creditStyle}>${credits}</Text>
          </View>
          {walletSelectBox}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.onCreditButtonPressed()}
          style={styles.paymentOptionsListView}
        >
          <Image
            source={require('./../../assets/images/credit_card.png')}
            style={cardIconStyle}
          />
          <Text style={styles.paymentOptionText}>Debit Card</Text>
          <Image
            source={require('./../../assets/images/cc.png')}
            style={styles.cc}
          />
          <Image
            source={require('./../../assets/images/visa.png')}
            style={styles.visa}
          />
          {/* <Image
            source={require('./../../assets/images/union.png')}
            style={styles.union}
          />
          <Image
            source={require('./../../assets/images/dc.png')}
            style={styles.dc}
          /> */}
          {cardSelectBox}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.onCounterButtonPressed()}
          style={styles.paymentOptionsListView}
        >
          <Image
            source={require('./../../assets/images/cash.png')}
            style={cashIconStyle}
          />
          <Text style={styles.paymentOptionText}>{cashPayment}</Text>
          {counterSelectBox}
        </TouchableOpacity>
      </View>
    );
  };

  renderShopImage = () => {
    let { selectedShop } = this.props;
    let { url } = selectedShop.image;
    let shopImage = url ? (
      <View style={styles.completeOrderView}>
        <Image
          source={{ uri: url }}
          resizeMode={'cover'}
          style={styles.shopImage}
        />
      </View>
    ) : (
      <View style={styles.completeOrderView}>
        <Image
          source={require('./../../assets/images/group-3-20.png')}
          style={styles.logoImage}
        />
        <Text style={styles.completedOrderText}>Order Information</Text>
      </View>
    );

    return shopImage;
  };

  renderCheckoutReceipt() {
    const {
      vouchers_to_use,
      final_price,
      selected_address,
      deliveryFee
    } = this.state;
    let { selectedShop, cart, promotions, delivery } = this.props;
    var final_price_delivery =
      parseFloat(final_price) + parseFloat(deliveryFee);
    let non_negative_final_price = parseFloat(
      Math.max(0, final_price_delivery)
    ).toFixed(2);
    return (
      <View style={styles.orderReceiptView}>
        <ScrollView style={styles.orderScrollView}>
          <View style={styles.orderCartView}>
            <View pointerEvents="box-none" style={styles.whiteboxView}>
              {this.renderShopImage()}
            </View>
            <View
              pointerEvents="box-none"
              style={{
                flex: 1
              }}
            >
              <View style={styles.locationWrapperView}>
                {!delivery && (
                  <View style={styles.locationView}>
                    <View style={styles.branchView}>
                      <Text style={styles.shopBranchText}>
                        {selectedShop.name}
                      </Text>
                      <Text
                        numberOfLines={3}
                        style={styles.shopBranchAddressText}
                      >
                        {selectedShop.short_address}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1
                      }}
                    />
                    <View style={styles.callView}>
                      <TouchableOpacity
                        onPress={() =>
                          this.onCallPressed(selectedShop.phone_no)
                        }
                        style={styles.callIconButton}
                      >
                        <Image
                          source={require('./../../assets/images/call-Icon.png')}
                          style={styles.callIconButtonImage}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          flex: 1
                        }}
                      />
                      <Text style={styles.callText}>Call</Text>
                    </View>
                    <View style={styles.directionView}>
                      <TouchableOpacity
                        onPress={() => this.onPressDirection(selectedShop)}
                        // onPress={() => this.onLocationButtonPressed()}
                        style={styles.directionIconButton}
                      >
                        <Image
                          source={require('./../../assets/images/direction-Icon.png')}
                          style={styles.directionIconButtonImage}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          flex: 1
                        }}
                      />
                      <Text style={styles.directionText}>Direction</Text>
                    </View>
                  </View>
                )}
              </View>

              {!delivery && <CurveSeparator />}
              {this.renderOrderItems(cart, promotions)}
              {this.renderPromotions(promotions)}
              <CurveSeparator />
              {this.renderVoucherSection(vouchers_to_use)}
              <CurveSeparator />
              {this.renderPickupTime()}
              <CurveSeparator />
              {this.renderPaymentSection()}
              {this.renderPaymentOptions()}

              <CurveSeparator />

              {delivery
                ? selected_address != undefined
                  ? this.renderDeliveryAddress(selected_address)
                  : this.renderDeliveryAddress(false)
                : undefined}
              {delivery && <CurveSeparator />}
              <View style={styles.totalViewWrapper}>
                <View style={styles.totalView}>
                  <Text style={styles.totallabelText}>TOTAL</Text>
                  <View
                    style={{
                      flex: 1
                    }}
                  />
                  <Text style={styles.totalText}>
                    ${non_negative_final_price}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  renderPayNow(final_price) {
    let { deliveryFee, enablePaynow } = this.state;
    let style = enablePaynow
      ? [styles.payNowButton, { backgroundColor: 'rgb(0, 178, 227)' }]
      : [styles.payNowButton, { backgroundColor: '#BDBDBD' }];

    let final_price_delivery =
      parseFloat(final_price) + parseFloat(deliveryFee);
    return (
      <View style={styles.totalPayNowView}>
        <View style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>
            ${final_price_delivery.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.checkout()}
          style={style}
          disabled={!enablePaynow}
        >
          <Text style={styles.payNowButtonText}>
            {this.state.selected_payment == 'counter' ? 'Order Now' : 'Pay Now'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let {
      isPaymentToggle,
      isPickupToogle,
      final_price,
      selected_address
    } = this.state;
    let { cart_total, discount_cart_total } = this.props;
    let non_negative_final_price = parseFloat(Math.max(0, final_price)).toFixed(
      2
    );
    return (
      <SafeAreaView style={styles.checkoutViewPadding}>
        <ScrollView
          style={styles.scrollviewScrollView}
          onLayout={(event) => this.measureView(event)}
        >
          <View style={styles.ordersummaryView}>
            {this.renderCheckoutReceipt()}
          </View>
        </ScrollView>
        {(isPaymentToggle == true || isPickupToogle == true) && (
          <View style={styles.checkoutViewOverlay} />
        )}
        {this.renderPayNow(non_negative_final_price)}
        {this.renderOrderForSelector()}
        <HudLoading isLoading={this.state.loading} />
        <Brew9Toast ref="toast" />
        <Brew9PopUp
          popUpVisible={this.state.visible}
          title={''}
          description={'Please add delivery address'}
          OkText={'Add address'}
          cancelText={'Cancel'}
          onPressOk={this.addFirstShippingAddress}
          onPressCancel={() => this.setState({ visible: false })}
          onBackgroundPress={this.closePopUp}
          onChangeText={(text) => this.onChangeCoupon(text)}
        />
        {this.renderConfirmPopup()}
        {selected_address && (
          <Brew9PopUp
            popUpVisible={this.state.addressConfirmation}
            title={'Are you sure to use this address as delivery address?'}
            description={
              selected_address.address +
              '\n' +
              selected_address.city +
              ' , ' +
              selected_address.postal_code +
              ', ' +
              selected_address.state +
              ', ' +
              selected_address.country
            }
            OkText={'Confirm'}
            cancelText={'Cancel'}
            onPressOk={() =>
              this.setState({ addressConfirmation: false }, () =>
                this.loadMakeOrder()
              )
            }
            onPressCancel={() => this.setState({ addressConfirmation: false })}
            onBackgroundPress={this.closePopUp}
            onChangeText={(text) => this.onChangeCoupon(text)}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  deliveryNoted: {
    color: '#ff4500',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    width: 191 * alpha
  },
  deliveryAddressDetail: {
    backgroundColor: 'transparent',
    color: 'rgb(63, 63, 63)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'right',
    marginBottom: 5 * alpha
  },
  addressText: {
    color: 'rgb(146, 146, 146)',
    fontSize: 11 * fontAlpha,
    fontFamily: NON_TITLE_FONT,
    fontStyle: 'normal',
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    width: 191 * alpha,
    paddingLeft: 0,
    paddingBottom: 5 * alpha
  },
  editAddressText: {
    color: 'rgb(50, 50, 50)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    backgroundColor: 'transparent',
    width: 191 * alpha,
    flex: 1
    // marginBottom: 10 * alpha,
  },
  deliveryAddressView: {
    paddingHorizontal: 24 * alpha,
    backgroundColor: 'rgb(245,245,245)'
  },

  headerLeftContainer: {
    flexDirection: 'row',
    marginLeft: 8 * alpha,
    width: 70 * alpha
  },
  navigationBarItem: {
    width: '100%'
  },
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
    tintColor: 'black'
  },
  checkoutViewOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  checkoutViewPadding: {
    backgroundColor: DEFAULT_GREY_BACKGROUND,
    paddingBottom: (47 + BUTTONBOTTOMPADDING) * alpha,
    flex: 1
  },
  scrollviewScrollView: {
    backgroundColor: 'transparent',
    flex: 1
  },
  branchText: {
    color: 'rgb(54, 54, 54)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 15 * fontAlpha,

    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent'
  },

  tabImage: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    width: 17 * alpha,
    height: 17 * alpha
  },
  tabTwoImage: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    width: 17 * alpha,
    height: 17 * alpha
  },
  pickupbuttonButtonImage: {
    resizeMode: 'contain'
  },
  pickupbuttonButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 168 * alpha,
    height: 54 * alpha
  },
  pickupbuttonButtonText: {
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left'
  },
  deliveryView: {
    backgroundColor: 'white',
    borderWidth: 1 * alpha,
    borderColor: 'rgb(151, 151, 151)',
    borderStyle: 'solid',
    width: 168 * alpha,
    height: 54 * alpha
  },
  deliveryView_selected: {
    backgroundColor: 'white',
    borderWidth: 1 * alpha,
    borderColor: 'rgb(0, 178, 227)',
    borderStyle: 'solid',
    width: 168 * alpha,
    height: 54 * alpha
  },
  deliveryImage: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    width: 35 * alpha,
    height: 23 * alpha
  },
  ordersummaryView: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 0 * alpha
  },
  voucherButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flex: 1
  },
  voucherButtonText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  paymentButton: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  paymentButtonText: {
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 18 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginLeft: 20 * alpha,
    textAlign: 'left'
  },
  totalPayNowView: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: 0 * alpha,
    right: 0 * alpha,
    // bottom: BUTTONBOTTOMPADDING,
    bottom: 0,
    height: 47 * alpha,
    flexDirection: 'row',
    alignItems: 'center'
  },
  payNowButton: {
    backgroundColor: 'rgb(0, 178, 227)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 114 * alpha,
    height: 47 * alpha
  },
  payNowButtonText: {
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left'
  },

  orderReceiptView: {
    backgroundColor: DEFAULT_GREY_BACKGROUND,
    flex: 1
  },
  orderScrollView: {
    backgroundColor: 'transparent',
    flex: 1
  },

  orderCartView: {
    alignSelf: 'stretch',
    marginLeft: 18 * alpha,
    marginRight: 18 * alpha,
    marginTop: 13 * alpha,
    marginBottom: 50 * alpha + BUTTONBOTTOMPADDING,
    borderRadius: 14 * alpha,
    backgroundColor: 'rgb(245, 245, 245)',
    flex: 1
  },
  whiteboxView: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    borderTopRightRadius: 14 * alpha,
    borderTopLeftRadius: 14 * alpha
  },
  completeOrderView: {
    height: alpha * 150,
    width: '100%',
    borderTopRightRadius: 14 * alpha,
    borderTopLeftRadius: 14 * alpha,
    overflow: 'hidden',
    alignItems: 'center'
  },
  logoImage: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    width: 30 * alpha,
    height: 60 * alpha,
    marginTop: 30 * alpha
  },

  shopImageContainer: {
    height: alpha * 100,
    width: windowWidth,
    paddingLeft: 18 * alpha,
    paddingRight: 18 * alpha,
    borderWidth: 2,
    borderColor: 'red'
  },

  shopImage: {
    height: '100%',
    width: '100%'
  },
  completedOrderText: {
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginTop: 10 * alpha,
    marginBottom: 30 * alpha
  },
  locationWrapperView: {
    backgroundColor: 'rgb(245, 245, 245)',
    flex: 1
  },
  locationView: {
    backgroundColor: 'transparent',
    height: 64 * alpha,
    marginLeft: 25 * alpha,
    marginRight: 25 * alpha,
    marginTop: 18 * alpha,
    flexDirection: 'row',
    alignItems: 'center'
  },
  branchView: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    width: 182 * alpha,
    height: 60 * alpha
  },
  shopBranchText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
    marginRight: 12 * alpha
  },
  shopBranchAddressText: {
    color: 'rgb(146, 146, 146)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginLeft: 1 * alpha
  },
  callView: {
    backgroundColor: 'transparent',
    width: 35 * alpha,
    height: 55 * alpha,
    marginRight: 8 * alpha
  },
  callIconButton: {
    backgroundColor: 'transparent',
    borderRadius: 17.5 * alpha,
    borderWidth: 1 * alpha,
    borderColor: 'rgb(180, 179, 179)',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    height: 35 * alpha
  },
  callIconButtonImage: {
    resizeMode: 'contain'
  },
  callText: {
    backgroundColor: 'transparent',
    color: 'rgb(163, 163, 163)',
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
    marginLeft: 6 * alpha,
    marginRight: 7 * alpha
  },
  directionView: {
    backgroundColor: 'transparent',
    width: 50 * alpha,
    height: 55 * alpha
  },
  directionIconButton: {
    backgroundColor: 'transparent',
    borderRadius: 17.5 * alpha,
    borderWidth: 1 * alpha,
    borderColor: 'rgb(180, 179, 179)',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    height: 35 * alpha,
    marginLeft: 8 * alpha,
    marginRight: 7 * alpha
  },
  directionIconButtonImage: {
    resizeMode: 'contain'
  },
  directionText: {
    color: 'rgb(163, 163, 163)',
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  voucherView: {
    backgroundColor: 'transparent',
    height: 18 * alpha,
    marginLeft: 26 * alpha,
    marginRight: 25 * alpha,
    marginTop: 42 * alpha,
    flexDirection: 'row',
    alignItems: 'center'
  },
  voucherDescriptionText: {
    color: 'rgb(54, 54, 54)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent'
  },
  voucher2View: {
    backgroundColor: 'transparent',
    height: 17 * alpha,
    marginLeft: 26 * alpha,
    marginRight: 25 * alpha,
    marginTop: 17 * alpha,
    flexDirection: 'row',
    alignItems: 'center'
  },
  totalViewWrapper: {
    backgroundColor: 'rgb(245,245,245)',
    flex: 1,
    borderBottomLeftRadius: 14 * alpha,
    borderBottomRightRadius: 14 * alpha
  },
  totalView: {
    backgroundColor: 'transparent',
    height: 21 * alpha,
    marginLeft: 26 * alpha,
    marginRight: 24 * alpha,
    marginTop: 10 * alpha,
    marginBottom: 18 * alpha,
    flexDirection: 'row',
    alignItems: 'center'
  },
  totallabelText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'center'
  },
  totalText: {
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'right',
    backgroundColor: 'transparent'
  },
  lineThreeView: {
    backgroundColor: 'rgb(234, 234, 234)',
    height: 1 * alpha,
    marginLeft: 25 * alpha,
    marginRight: 24 * alpha,
    marginTop: 14 * alpha
  },
  callrefundText: {
    backgroundColor: 'transparent',
    color: 'rgb(152, 149, 149)',
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 26 * alpha,
    marginTop: 13 * alpha,
    marginBottom: 13
  },
  orderitemsView: {
    // backgroundColor: 'green',
    // marginLeft: 24 * alpha,
    // marginRight: 24 * alpha,
    // flex: 1
  },
  itemView: {
    backgroundColor: 'transparent',
    height: 90 * alpha,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  nameText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 15 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left'
  },
  descriptionText: {
    backgroundColor: 'transparent',
    color: 'rgb(146, 146, 146)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'left'
  },
  quantityText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    marginRight: 52 * alpha,
    marginTop: 26 * alpha
  },
  priceText: {
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginTop: 26 * alpha
  },
  itemTwoView: {
    backgroundColor: 'transparent',
    height: 90 * alpha,
    marginRight: 1 * alpha,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },

  item2View: {
    backgroundColor: 'transparent',
    height: 46 * alpha,
    marginRight: 1 * alpha,
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameThreeText: {
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 15 * fontAlpha,
    fontStyle: 'normal',
    width: 190 * alpha,
    textAlign: 'left',
    backgroundColor: 'transparent'
  },
  quantityThreeText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    marginRight: 56 * alpha
  },
  priceThreeText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    marginRight: 3 * alpha
  },

  voucherView: {
    backgroundColor: 'transparent',
    height: 18 * alpha,
    marginBottom: 10 * alpha,
    flexDirection: 'row',
    alignItems: 'center'
  },

  sectionView: {
    backgroundColor: 'rgb(245,245,245)',
    flex: 1,
    paddingHorizontal: 24 * alpha
  },
  drinksView: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingTop: 10 * alpha
  },

  productDetailView: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  voucherDetailView: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  productNameText: {
    backgroundColor: 'transparent',
    color: 'rgb(63, 63, 63)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left'
    // marginBottom: 5 * alpha
  },
  productNameDisabledText: {
    backgroundColor: 'transparent',
    color: LIGHT_GREY,
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
    marginBottom: 5 * alpha
  },
  productVariantText: {
    color: 'rgb(164, 164, 164)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    width: 191 * alpha,
    marginBottom: 10 * alpha
  },
  productQuantityText: {
    color: 'rgb(50, 50, 50)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    backgroundColor: 'transparent',
    marginRight: 4 * alpha,
    width: 25 * alpha
  },
  voucherQuantityText: {
    color: 'rgb(50, 50, 50)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    width: 50 * alpha
  },
  productPriceText: {
    color: 'rgb(50, 50, 50)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    backgroundColor: 'transparent',
    width: 55 * alpha
  },
  voucherPriceText: {
    color: 'rgb(50, 50, 50)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    backgroundColor: 'transparent',
    width: 55 * alpha
  },
  productVoucherText: {
    color: 'rgb(50, 50, 50)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    backgroundColor: 'transparent'
  },
  productVoucherDisableText: {
    color: 'rgb(163, 163, 163)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    backgroundColor: 'transparent'
  },
  spacer: {
    marginBottom: 10 * alpha
  },
  dottedLineImage: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    width: 291 * alpha,
    height: 2 * alpha
  },

  menuRowArrowImage: {
    width: 10 * alpha,
    height: 10 * alpha,
    marginLeft: 5 * alpha,
    // marginTop: 4 * alpha,
    tintColor: 'rgb(50, 50, 50)',
    resizeMode: 'contain'
  },

  voucherButtonView: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10 * alpha,
    width: 60 * alpha,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 5 * alpha,
    marginLeft: 5 * alpha
  },
  voucherButtonText: {
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 10 * alpha,
    textAlign: 'center',
    paddingLeft: 5 * alpha,
    paddingRight: 5 * alpha
  },

  redCircle: {
    backgroundColor: 'red',
    width: 10 * alpha,
    height: 10 * alpha,
    borderRadius: 5 * alpha,
    marginRight: 5 * alpha
  },
  greenCircle: {
    backgroundColor: 'green',
    width: 10 * alpha,
    height: 10 * alpha,
    borderRadius: 5 * alpha,
    marginRight: 5 * alpha
  },
  cancelVoucherButton: {
    width: 15 * alpha,
    height: 15 * alpha,
    marginLeft: 5 * alpha
  },
  cancelImage: {
    width: 15 * alpha,
    height: 15 * alpha,
    resizeMode: 'contain'
  },
  paymentOptionsView: {
    height: alpha * 120,
    flex: 1,
    paddingHorizontal: alpha * 17
  },
  paymentOptionsListView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  sectionRowView: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: alpha * 40
  },

  paymentWalletIcon: {
    height: alpha * 25,
    width: alpha * 25,
    tintColor: 'rgb(186, 183, 183)',
    marginRight: alpha * 10
  },
  paymentCardIcon: {
    height: alpha * 23,
    width: alpha * 23,
    tintColor: 'rgb(186, 183, 183)',
    marginRight: alpha * 10
  },
  paymentCashIcon: {
    height: alpha * 19,
    width: alpha * 19,
    tintColor: 'rgb(186, 183, 183)',
    marginRight: alpha * 10
  },

  paymentOptionText: {
    fontSize: fontAlpha * 14,
    fontFamily: NON_TITLE_FONT,
    color: '#363636'
  },

  selectBox: {
    backgroundColor: 'transparent',
    borderRadius: 9 * alpha,
    borderWidth: 1 * alpha,
    borderColor: '#BAB7B7',
    borderStyle: 'solid',
    width: 16 * alpha,
    height: 16 * alpha,
    position: 'absolute',
    right: alpha * 10
  },

  creditsText: {
    fontSize: fontAlpha * 14,
    fontFamily: NON_TITLE_FONT,
    color: '#ED6E69'
  },

  cc: {
    height: alpha * 16,
    width: alpha * 27,
    marginLeft: alpha * 9
  },
  visa: {
    height: alpha * 9,
    width: alpha * 27,
    marginLeft: alpha * 7
  },
  union: {
    height: alpha * 27,
    width: alpha * 27,
    marginLeft: alpha * 7
  },
  dc: {
    height: alpha * 30,
    width: alpha * 25,
    marginLeft: alpha * 7
  },
  walletTextContainer: {
    flexDirection: 'row'
  },
  tag: {
    borderRadius: alpha * 10,
    backgroundColor: '#ED6E69',
    paddingHorizontal: alpha * 7,
    paddingVertical: alpha * 2,
    marginLeft: 10
  },
  tagText: {
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha,
    color: '#FFFFFF'
  }
});
