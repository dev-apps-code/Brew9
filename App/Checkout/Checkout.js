import React from 'react';
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
  Platform,
} from 'react-native';
import _ from 'lodash';
import Moment from 'moment';
import {connect} from 'react-redux';
import {Analytics, Event} from 'expo-analytics';
import {createAction} from '../Utils';
import {Brew9PopUp, Brew9Toast, HudLoading} from '../Components';
import {alpha, fontAlpha, windowHeight, windowWidth} from '../Common/size';
import DeliveryFeeRequestObject from '../Requests/delivery_fee_request_object';
import MakeOrderRequestObj from '../Requests/make_order_request_obj.js';
import TopUpProductsRequestObject from '../Requests/top_up_products_request_object';

import ValidVouchersRequestObject from '../Requests/valid_voucher_request_object.js';
import {getResponseMsg} from '../Utils/responses';
import * as commonStyles from '../Common/common_style';
import {ANALYTICS_ID} from '../Common/config';
import {getMemberIdForApi} from '../Services/members_helper';
import TimeSelector from '../Components/TimeSelector';
import CurveSeparator from '../Components/CurveSeparator';
import SelectShopRequestObject from '../Requests/select_shop_request_object';

const {
  TITLE_FONT,
  NON_TITLE_FONT,
  BUTTONBOTTOMPADDING,
  DEFAULT_GREY_BACKGROUND,
  PRIMARY_COLOR,
  TOAST_DURATION,
  LIGHT_GREY,
} = commonStyles;
@connect(({members, shops, orders, config}) => ({
  companyId: members.company_id,
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
  isDelivery: orders.isDelivery,
  location: members.location,
  shippingAddress: members.shippingAddress,
  responses: config.responses,
  shopResponses: config.shopResponses,
}))
class Checkout extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: (
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: TITLE_FONT,
          }}>
          Checkout
        </Text>
      ),
      headerTintColor: 'black',
      headerLeft: (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={params.onBackPressed ? params.onBackPressed : () => null}
            style={styles.navigationBarItem}>
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
        shadowOpacity: 0,
      },
    };
  };

  constructor(props) {
    super(props);
    _.throttle(
      this.checkout.bind(this),
      500, // no new clicks within 500ms time window
    );
    const {currentMember, cart_total} = props;
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
        type: null,
      },
      enablePaynow: true,
      isConfirmCheckout: false,
      topUpPromo: null,
    };
    const xy = {x: 0, y: windowHeight};
    this.movePickAnimation = new Animated.ValueXY(xy);
    this.timeSelectorAnimation = new Animated.ValueXY(xy);
    this.moveAnimation = new Animated.ValueXY(xy);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed,
      onItemPressed: this.onItemPressed,
    });

    const {dispatch, isDelivery} = this.props;

    this.setState(
      {
        valid_vouchers: [],
      },
      function () {
        this.loadValidVouchers();
        this.loadTopUpProducts();
        {
          isDelivery && this.loadDeliveryFee();
        }
      },
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
          selected_address: this.props.currentMember.defaultAddress,
        },
        () => this.loadDeliveryFee(),
      );
    }
  }

  setPayNowStatus = () => {
    let {pick_up_status, selected_payment} = this.state;
    if (pick_up_status != null && selected_payment != null) {
      this.setState({
        enablePaynow: true,
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
    const {selected_address} = this.state;
    const {cart_total, dispatch, isDelivery, selectedShop} = this.props;

    console.log('isDelivery ', isDelivery);

    if (isDelivery === false || selected_address === null) {
      this.setState({deliveryFee: 0.0, delivery_description: ''});
      return;
    }

    const callback = (response) => {
      if (response.success) {
        const {result} = response;
        const deliveryFee = parseFloat(result?.delivery_fee || 0).toFixed(2);
        const delivery_description = result?.delivery_fee_description || '';
        this.setState({deliveryFee, delivery_description});
      } else {
        this.setState({deliveryFee: 0.0, delivery_description: ''});
      }
    };

    const object = new DeliveryFeeRequestObject(
      cart_total,
      selected_address.id,
    );

    object.setUrlId(selectedShop.id);
    const action = createAction('shops/loadDeliveryFee')({object, callback});
    dispatch(action);
  };

  loadValidVouchers() {
    const {
      dispatch,
      currentMember,
      selectedShop,
      cart,
      promotions,
      cart_order_id,
    } = this.props;
    if (currentMember != null) {
      const callback = (eventObject) => {
        if (eventObject.success) {
          const valid_vouchers = eventObject.result;
          this.setState({valid_vouchers});

          var valid_voucher_counts = _.filter(valid_vouchers, function (o) {
            if (o.is_valid == true) {
              return o;
            }
          }).length;

          const analytics = new Analytics(ANALYTICS_ID);
          analytics.event(
            new Event(
              'Valid Voucher',
              getMemberIdForApi(currentMember),
              valid_voucher_counts,
            ),
          );
        }
      };

      // Products with 'product' class are valid
      filtered_cart = _.filter(cart, {clazz: 'product'});

      const obj = new ValidVouchersRequestObject(
        selectedShop.id,
        filtered_cart,
        promotions,
        cart_order_id,
      );

      obj.setUrlId(currentMember.id);

      dispatch(
        createAction('vouchers/loadVouchersForCart')({
          object: obj,
          callback,
        }),
      );
    }
  }

  onBackPressed = () => {
    const {navigation} = this.props;
    const {routeName, key} = navigation.getParam('returnToRoute');

    navigation.navigate({routeName, key});
  };

  onConfirmOrderSchedule = (option, hour, min, range) => {
    var today = Moment();
    var tomorrow = Moment().add(1, 'days');
    var selected_date = option == 'Tomorrow' ? tomorrow : today;

    var pick_up_status = option;

    hour = this.formatSelectedHour(hour);

    var pick_up_time = `${selected_date.format('YYYY-MM-DD')} ${hour}:${min}`;

    this.setState({pick_up_time, pick_up_status, range}, () =>
      this.setPayNowStatus(),
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
    let lat = shop.latitude;
    let long = shop.longitude;
    let latitude = lat ? parseFloat(lat) : 4.8886091;
    let longitude = long ? parseFloat(long) : 114.8976136;
    let location = latitude + ',' + longitude;
    const url = Platform.select({
      ios:
        'https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=' +
        location,
      android: 'https://www.google.com/maps/dir/?api=1&destination=' + location,
    });

    Linking.openURL(url);
  }

  onVoucherButtonPressed = () => {
    const {navigate} = this.props.navigation;
    const {currentMember} = this.props;
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event('Checkout', getMemberIdForApi(currentMember), 'Select Voucher'),
    );
    navigate('CheckoutVoucher', {
      valid_vouchers: this.state.valid_vouchers,
      cart: this.props.cart,
      addVoucherAction: this.addVoucherItemsToCart,
    });
  };

  loadTopUpProducts() {
    const {dispatch, members, selectedShop} = this.props;
    const {id} = selectedShop;
    const callback = (eventObject) => {
      if (eventObject.success) {
        const topUpPromoList = eventObject.result;
        const availableTopUpPromotion = topUpPromoList.find(function (elem) {
          let {promotion_text, shops} = elem;
          var exists = shops.includes(id);
          if (promotion_text && exists) {
            return true;
          }
          return false;
        });
        const {promotion_text} = availableTopUpPromotion;
        this.setState({
          topUpPromo: promotion_text,
        });
      }
    };
    const obj = new TopUpProductsRequestObject();
    obj.setUrlId(members.company_id);
    dispatch(
      createAction('companies/loadTopUpProducts')({
        object: obj,
        callback,
      }),
    );
  }

  renderTopUpPromotion = () => {
    const {topUpPromo} = this.state;
    const {selectedShop} = this.props;
    const {allow_wallet} = selectedShop;

    const tagStyle = allow_wallet
      ? styles.tag
      : [
          styles.tag,
          {
            borderColor: '#A3A3A3',
            borderWidth: alpha * 1,
            backgroundColor: 'transparent',
          },
        ];
    const tagTextStyle = allow_wallet
      ? styles.tagText
      : [styles.tagText, {color: '#A3A3A3'}];

    return topUpPromo ? (
      <View style={tagStyle}>
        <Text numberOfLines={1} style={tagTextStyle}>
          {topUpPromo}
        </Text>
      </View>
    ) : null;
  };

  addShippingAddress = () => {
    const {navigation} = this.props;

    this.setState({visible: false});
    navigation.navigate('ShippingAddress', {
      selected_address: this.state.selected_address,
      returnToRoute: this.props.navigation.state,
    });
  };

  addFirstShippingAddress = () => {
    const {navigation} = this.props;
    this.setState({visible: false});
    navigation.navigate('AddShippingAddress', {
      params: null,
      initialAddress: true,
    });
  };

  onCancelVoucher = (item) => {
    let new_voucher_list = [...this.state.vouchers_to_use];
    const search_voucher_index = new_voucher_list.findIndex(
      (element) => element.id == item.id,
    );

    new_voucher_list.splice(search_voucher_index, 1);
    this.setState(
      {
        vouchers_to_use: new_voucher_list,
      },
      function () {
        this.applyVoucher(new_voucher_list);
      },
    );
  };

  addVoucherItemsToCart = (voucher_item) => {
    this.setState({vouchers_to_use: [voucher_item]});
    this.applyVoucher([voucher_item]);
  };

  roundOff(value) {
    roundOffValue = 0;
    let n = parseInt((value * 100).toFixed(10)),
      x = n % 10;
    let result = n + 10 - x;
    if (x < 6) {
      result -= 10 / (parseInt(x / 3) + 1);
    }
    roundOffValue = (result / 100).toFixed(2);

    return roundOffValue;
  }

  check_promotion_trigger = () => {
    const {currentMember, dispatch, cart_total, selectedShop} = this.props;

    let {sub_total_voucher} = this.state;
    let shop = selectedShop;
    let newcart = [...this.props.cart];
    let finalCart = [];
    var promotions_item = [];
    var final_cart_value =
      sub_total_voucher != 0 ? sub_total_voucher : cart_total;
    var cart_total_voucher =
      sub_total_voucher != 0 ? sub_total_voucher : cart_total;
    var final_promo_text = '';

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
                    type: promotion.value_type,
                  };
                  this.setState({
                    promotionDiscountValue: promotionSettings,
                  });
                  var discount_value = promotion.value ? promotion.value : 0;
                  price = this.roundOff(
                    (final_cart_value * discount_value) / 100,
                  );
                  roundedPrice = this.roundOff(
                    (final_cart_value * discount_value) / 100,
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
                    type: promotion.value_type,
                  };
                  this.setState({
                    promotionDiscountValue: promotionSettings,
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
                roundedPrice: roundedPrice,
              };

              promotions_item.push(cartItem);
            } else {
              var display_text = promotion.display_text;
              final_promo_text = display_text.replace(
                '$remaining',
                `$${parseFloat(remaining).toFixed(2)}`,
              );

              break;
            }
          }
        }
      }
      this.setState({
        final_price: final_cart_value,
        promotionTotalDiscount: cart_total - final_cart_value,
      });
    }

    if (this.props.cart.length == 0) {
      final_promo_text = '';
      this.setState({isCartToggle: false}, function () {
        Animated.spring(this.moveAnimation, {
          toValue: {x: 0, y: windowHeight},
        }).start();
      });
    } else {
    }

    dispatch(
      createAction('orders/updatePromotionText')({
        promotionText: final_promo_text,
      }),
    );
    dispatch(
      createAction('orders/updatePromotions')({
        promotions: promotions_item,
      }),
    );

    dispatch(
      createAction('orders/updateDiscountCartTotal')({
        discount_cart_total: final_cart_value,
      }),
    );
  };

  filterProductsByVoucher(voucher, qty) {
    const {cart, discount_cart_total} = this.props;
    var targetQuantity = voucher.eligible_discount_quantity;
    var targetProductIDList = voucher.product_ids;
    var voucherID = voucher.id;
    var voucherDetails = voucher.voucher;
    var voucherDiscountTotal = 0;
    var promotionDiscountTotal = this.state.promotionTotalDiscount;
    var promotionSettings = this.state.promotionDiscountValue;
    var promotionValue = 0;

    cart.sort(function (a, b) {
      if (parseFloat(a.price) < parseFloat(b.price)) {
        return -1;
      }
      return 0;
    });

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
                (productPrice * promotionSettings.value) / 100,
              );
              var voucherDeductionValue = this.roundOff(
                (productPrice * voucherDetails.discount_price) / 100.0,
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
                (productPrice * voucherDetails.discount_price) / 100.0,
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
    const {discount_cart_total} = this.props;
    const {selected_payment} = this.state;
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
              vouchers_to_use[index],
            );
          } else if (voucher.discount_type.toLowerCase() == 'fixed') {
            voucherDeductedTotal =
              voucherDeductedTotal - voucher.discount_price;
          } else if (voucher.discount_type.toLowerCase() == 'percent') {
            var voucherConvertedToFix = this.roundOff(
              (voucherDeductedTotal * voucher.discount_price) / 100.0,
            );
            voucherDeductedTotal = voucherDeductedTotal - voucherConvertedToFix;
          }
        }
      }
    }

    const final_price = voucherDeductedTotal;
    const voucherTotalDiscount = discount_cart_total - voucherDeductedTotal;

    this.setState({final_price, voucherTotalDiscount});

    if (selected_payment == 'credit_card' && voucherDeductedTotal <= 0) {
      this.setState({selected_payment: ''});
    }
  }

  onPaymentButtonPressed = () => {
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event(
        'Checkout',
        getMemberIdForApi(this.props.currentMember),
        'Select Payment',
      ),
    );
    this.tooglePayment();
  };

  removeItemFromCart(products, description) {
    const {dispatch} = this.props;
    let newcart = [...this.props.cart];
    let product_ids = products.map((item) => item.id);
    for (item of newcart) {
      if (product_ids.includes(item.id)) {
        item.cannot_order = true;
      }
    }
    dispatch(
      createAction('orders/updateCart')({
        cart: newcart,
      }),
    );
  }

  onRemoveItem(item) {
    const {dispatch} = this.props;
    let new_cart = [...this.props.cart];
    const search_product_index = new_cart.findIndex(
      (element) => element.id == item.id,
    );

    new_cart.splice(search_product_index, 1);

    dispatch(
      createAction('orders/updateCart')({
        cart: new_cart,
      }),
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
      isDelivery,
    } = this.props;
    const {navigate} = this.props.navigation;
    const {
      vouchers_to_use,
      selected_payment,
      pick_up_status,
      pick_up_time,
      selected_address,
    } = this.state;

    let address_id = selected_address == null ? null : selected_address.id;

    this.setState({loading: true, isConfirmCheckout: false});

    const callback = (eventObject) => {
      this.setState({loading: false});

      if (eventObject.success) {
        if (selected_payment == 'credits') {
          setTimeout(
            function () {
              this.clearCart();
            }.bind(this),
            500,
          );
        } else if (selected_payment == 'counter') {
          setTimeout(
            function () {
              this.clearCart();
            }.bind(this),
            500,
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
            clearCart: () => this.clearCart(),
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
    if (isDelivery) {
      delivery_option = 1;
    }

    filtered_cart = _.filter(cart, {clazz: 'product'});
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
      address_id,
    );
    obj.setUrlId(selectedShop.id);
    dispatch(
      createAction('shops/loadMakeOrder')({
        object: obj,
        callback,
      }),
    );
  }

  onWalletButtonPressed = () => {
    this.setState({
      selected_payment: 'credits',
    });
    this.setPayNowStatus();
  };

  onCreditButtonPressed = () => {
    this.setState({
      selected_payment: 'credit_card',
    });
    this.setPayNowStatus();
  };
  onCounterButtonPressed = () => {
    this.setState({
      selected_payment: 'counter',
    });
    this.setPayNowStatus();
  };

  clearCart = () => {
    const {navigation, dispatch} = this.props;
    dispatch(createAction('orders/resetCart')({}));
    const {routeName, key} = navigation.getParam('returnToRoute');
    navigation.navigate({
      routeName,
      key,
    });
  };

  fetchShopDetails = () => {
    const {location, selectedShop} = this.props;
    const {id} = selectedShop;
    const latitude = location !== null ? location.coords.latitude : null;
    const longitude = location !== null ? location.coords.longitude : null;

    if (latitude !== null && longitude !== null) {
      const object = new SelectShopRequestObject(latitude, longitude);

      object.setUrlId(this.props.companyId);
      object.setShopId(id);

      const callback = this.fetchShopDetailsCallback;
      const params = {object, callback};
      const action = createAction('shops/selectShop')(params);
      this.props.dispatch(action);
    } else {
      const object = new SelectShopRequestObject();
      object.setUrlId(this.props.companyId);
      object.setShopId(id);

      const callback = this.fetchShopDetailsCallback;
      const params = {object, callback};
      const action = createAction('shops/selectShop')(params);
      this.props.dispatch(action);
    }
  };

  fetchShopDetailsCallback = (eventObject) => {
    const noTimeSlotsAvailableText = getResponseMsg({
      props: this.props,
      shopId: this.props.selectedShop.id,
      key: 'no_time_slots_available',
      defaultText: 'No time slots available.',
    });

    if (eventObject.success) {
      this.timepicker.updateTimeOptions(() => {
        if (!this.timepicker.hasSchedule()) {
          this.refs.toast.show(noTimeSlotsAvailableText, TOAST_DURATION);
        } else {
          this.timepicker.toggle();
        }
      });
    }
  };

  checkout = () => {
    const {selected_payment} = this.state;

    if (selected_payment === 'credit_card') {
      this.setState({isConfirmCheckout: true});
    } else {
      this.onPayNowPressed();
    }
  };

  renderConfirmPopup = () => {
    const {id} = this.props.selectedShop;
    const {isConfirmCheckout} = this.state;
    const description = getResponseMsg({
      props: this.props,
      shopId: id,
      key: 'credit_card_confirm_popup_description',
      defaultText: 'Are you sure you want to order from this location?',
    });
    const title = getResponseMsg({
      props: this.props,
      shopId: id,
      key: 'credit_card_confirm_popup_title',
      defaultText: 'Confirm Checkout',
    });
    const OkText = getResponseMsg({
      props: this.props,
      shopId: id,
      key: 'credit_card_confirm_button',
      defaultText: 'Confirm',
    });
    const popUpVisible = isConfirmCheckout;

    return (
      <Brew9PopUp
        onBackgroundPress={() => {}}
        onPressOk={this.onPayNowPressed}
        {...{popUpVisible, title, description, OkText}}
      />
    );
  };

  onPayNowPressed = () => {
    this.setState({
      isConfirmCheckout: false,
    });
    const {navigate} = this.props.navigation;
    const {
      selected_payment,
      pick_up_status,
      final_price,
      pick_up_time,
      selected_address,
    } = this.state;
    const {currentMember, selectedShop, isDelivery} = this.props;
    const analytics = new Analytics(ANALYTICS_ID);
    const event = new Event(
      'Checkout',
      getMemberIdForApi(currentMember),
      'Pay Now',
    );

    analytics.event(event);

    if (currentMember != undefined) {
      if (isDelivery && !selected_address) {
        this.addShippingAddress();
        return;
      } else {
        if (selected_payment == '') {
          const paymentSelectionText = getResponseMsg({
            props: this.props,
            shopId: selectedShop.id,
            key: 'Popup - Select Payment',
            defaultText: 'Please select a payment method',
          });

          this.refs.toast.show(paymentSelectionText, TOAST_DURATION + 1000);

          return;
        }

        if (selected_payment == 'credits') {
          if (
            parseFloat(final_price) >
            parseFloat(currentMember.credits).toFixed(2)
          ) {
            const insufficientText = getResponseMsg({
              props: this.props,
              shopId: selectedShop.id,
              key: 'Popup - Insufficient credit',
              defaultText:
                'Oops, insufficient E-Wallet credit! Please select other payment option.',
            });

            this.refs.toast.show(insufficientText, TOAST_DURATION + 1000);

            return;
          }
        }

        if (pick_up_status === null) {
          this.fetchShopDetails();
          return;
        } else {
          if (selectedShop !== null) {
            const {opening_hour} = selectedShop;
            const closingTime = Moment(opening_hour.end_time, 'h:mm');
            const pickupTime = Moment(pick_up_time, 'h:mm');
            const timeNow = Moment(new Date(), 'HH:mm');
            const timeDiff = Moment().diff(pick_up_time, 'minutes');

            // selected pickup or delivery time must not be below current time
            if (timeDiff > 0) {
              this.fetchShopDetails();
              return;
            }

            if (pickupTime < timeNow && pick_up_status === 'Pick Later') {
              const message = 'Pick up time is not available';
              this.refs.toast.show(message, TOAST_DURATION);
              return;
            } else if (pickupTime > closingTime) {
              // TODO please convert
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
        returnToRoute: this.props.navigation.state,
      });
      return;
    }
  };

  addressConfirmation = () => {
    this.setState({addressConfirmation: true});
  };

  measureView(event) {
    this.setState({
      payment_view_height: event.nativeEvent.layout.height,
    });
  }

  onClosePressed = () => {
    this.setState({
      loginModalVisible: false,
      registerModalVisible: false,
    });
  };

  onCallPressed = (phone_no) => {
    Linking.openURL(`tel:${phone_no}`);
  };

  tooglePickup = () => {
    const {isPickupToogle, pickup_view_height} = this.state;

    var product_checkout_height = pickup_view_height;
    var content = 247 * alpha;
    var finalheight = pickup_view_height - content - BUTTONBOTTOMPADDING;

    if (isPickupToogle) {
      this.setState(
        {isPickupToogle: false, isTimeSelectorToggled: false},
        function () {
          Animated.spring(this.movePickAnimation, {
            toValue: {x: 0, y: windowHeight},
          }).start();
        },
      );
    } else {
      this.setState(
        {isPickupToogle: true, isTimeSelectorToggled: true},
        function () {
          Animated.spring(this.movePickAnimation, {
            toValue: {x: 0, y: 52 * alpha},
          }).start();
        },
      );
    }
  };

  _toggleTimeSelector = () => {
    const {isTimeSelectorToggled} = this.state;

    const y = () => (isTimeSelectorToggled ? windowHeight : 52 * alpha);

    this.setState({isTimeSelectorToggled: !isTimeSelectorToggled}, function () {
      Animated.spring(this.timeSelectorAnimation, {
        toValue: {x: 0, y: y()},
      }).start();
    });
  };

  tooglePayment = () => {
    const {isPaymentToggle, payment_view_height} = this.state;

    var product_checkout_height = payment_view_height;
    var content = 247 * alpha;

    if (isPaymentToggle) {
      this.setState({isPaymentToggle: false}, function () {
        Animated.spring(this.moveAnimation, {
          toValue: {x: 0, y: windowHeight},
        }).start();
      });
    } else {
      this.setState({isPaymentToggle: true}, function () {
        Animated.spring(this.moveAnimation, {
          toValue: {x: 0, y: 52 * alpha},
        }).start();
      });
    }
  };

  pickUpNow = () => {
    let {selectedShop} = this.props;
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
    const {cart, discount_cart_total} = this.props;

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
        <View key={key} style={[styles.drinksView]}>
          <View
            pointerEvents="box-none"
            style={{
              justifyContent: 'center',
              backgroundColor: 'transparent',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
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
                this.roundOff(this.state.voucherTotalDiscount),
              ).toFixed(2)}`}</Text>
            ) : undefined}

            <TouchableOpacity
              onPress={() => this.onCancelVoucher(item)}
              style={styles.cancelVoucherButton}>
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
      o,
    ) {
      if (o.is_valid == true) {
        return o;
      }
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
          style={styles.voucherButton}>
          <View pointerEvents="box-none" style={styles.sectionRowView}>
            <Text style={styles.productNameText}>Brew9 Vouchers</Text>
            <View style={styles.spacer} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={
                  this.state.valid_vouchers != null &&
                  this.state.valid_vouchers.length > 0
                    ? styles.productVoucherText
                    : styles.productVoucherDisableText
                }>
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
    const {currentMember} = this.props;
    const {selected_payment} = this.state;

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
                alignItems: 'center',
              }}>
              <View
                style={[
                  selected_payment != ''
                    ? styles.greenCircle
                    : styles.redCircle,
                ]}
              />
              <Text style={[styles.productNameText]}>Payment</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  onSelectTimePress = () => {
    this.fetchShopDetails();
  };

  renderPickupTime() {
    const {pick_up_status, pick_up_time} = this.state;
    var {isDelivery} = this.props;
    var pick_up = isDelivery ? 'Delivery Time' : 'Pick Up Time';
    var formatted_time = this._getFormattedSchedule();
    return (
      <View style={styles.sectionView}>
        <TouchableOpacity
          onPress={() => this.onSelectTimePress()}
          style={styles.voucherButton}>
          <View pointerEvents="box-none" style={styles.sectionRowView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                alignItems: 'center',
              }}>
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
        <View key={key} style={styles.drinksView}>
          <View
            pointerEvents="box-none"
            style={{
              justifyContent: 'center',
              backgroundColor: 'transparent',
              flex: 1,
              flexDirection: 'row',
            }}>
            <View style={styles.productDetailView}>
              <Text
                style={
                  item.cannot_order != undefined && item.cannot_order == true
                    ? styles.productNameDisabledText
                    : styles.productNameText
                }>
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
                style={styles.cancelVoucherButton}>
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
          this.props.isDelivery && {
            paddingTop: 20,
          },
        ]}>
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
          key={key}
          style={[styles.drinksView, {marginVertical: 0 * alpha}]}>
          <View
            pointerEvents="box-none"
            style={{
              justifyContent: 'center',
              backgroundColor: 'transparent',
              flex: 1,
              flexDirection: 'row',
            }}>
            <View style={styles.productDetailView}>
              <Text
                style={[
                  item.cannot_order != undefined && item.cannot_order == true
                    ? styles.productNameDisabledText
                    : styles.productNameText,
                  {marginBottom: 0},
                ]}>
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
          <View style={[styles.sectionView, {paddingBottom: 10 * alpha}]}>
            <View style={styles.orderitemsView}>{promotions_item}</View>
          </View>
        </View>
      );
    }
  };

  renderDeliveryAddress = (address) => {
    let {deliveryFee, final_price, delivery_description} = this.state;
    let text = address ? 'Change' : 'Add';
    let non_negative_subTotal_price = parseFloat(
      Math.max(0, final_price),
    ).toFixed(2);
    return (
      <View style={styles.deliveryAddressView}>
        <View style={styles.voucherButton}>
          <View style={styles.drinksView}>
            <View style={[styles.deliveryAddressDetail, {flex: 1}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 3 * alpha,
                }}>
                <Text style={[styles.productNameText]}>Delivery Address</Text>
                <TouchableOpacity
                  onPress={() => this.addShippingAddress()}
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
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
              paddingBottom: 10 * alpha,
            }}>
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
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 1}}>
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

  renderTimeSelector = () => {
    const {isDelivery, selectedShop} = this.props;
    const {opening_hour, delivery_hour} = selectedShop;

    let today = [];
    let tomorrow = [];

    if (isDelivery) {
      today = delivery_hour?.today?.delivery_time_slot || [];
      tomorrow = delivery_hour?.tomorrow?.delivery_time_slot || [];
    } else {
      today = opening_hour?.ordering_time_slot || [];
    }
    return (
      <TimeSelector
        animation={this.timeSelectorAnimation}
        delivery={this.props.isDelivery}
        onConfirm={this.onConfirmOrderSchedule}
        ref={(ref) => (this.timepicker = ref)}
        today={today || []}
        toggle={this._toggleTimeSelector}
        tomorrow={tomorrow || []}
      />
    );
  };

  renderWalletPaymentSection = () => {
    const {selected_payment} = this.state;
    const {currentMember, selectedShop} = this.props;
    const {allow_wallet, allow_wallet_text} = selectedShop;

    const selectBoxStyle = allow_wallet
      ? selected_payment === 'credits'
        ? styles.activeSelectBox
        : styles.inactiveSelectBox
      : [
          styles.inactiveSelectBox,
          {backgroundColor: '#E4E4E4', borderWidth: 0},
        ];

    const iconStyle =
      selected_payment === 'credits'
        ? styles.walletActiveIcon
        : styles.walletInactiveIcon;

    const credits =
      currentMember !== undefined
        ? parseFloat(currentMember.credits).toFixed(2)
        : 0;

    const walletCreditsStyle =
      credits > 0 ? styles.activeCreditsText : styles.inActiveCreditsText;

    const allowText = allow_wallet_text ? (
      <Text style={styles.allowText}>{allow_wallet_text}</Text>
    ) : null;

    const titleTextStyle = allow_wallet
      ? styles.allowedPaymentOption
      : styles.notAllowedPaymentOption;

    return (
      <View>
        <TouchableOpacity
          onPress={() => this.onWalletButtonPressed()}
          style={styles.paymentOptionsListView}>
          <View style={styles.iconContainer}>
            <Image
              source={require('./../../assets/images/wallet_center.png')}
              style={iconStyle}
            />
          </View>
          <View>
            <View style={styles.walletTextContainer}>
              <Text style={titleTextStyle}>Wallet</Text>
              {this.renderTopUpPromotion()}
            </View>
            {allow_wallet && <Text style={walletCreditsStyle}>${credits}</Text>}
          </View>
          <View style={selectBoxStyle} />
        </TouchableOpacity>
        {allowText}
      </View>
    );
  };

  renderCardPaymentSection = () => {
    const {selected_payment} = this.state;
    const {selectedShop} = this.props;
    const {allow_credit_card, allow_credit_card_text} = selectedShop;

    const selectBoxStyle = allow_credit_card
      ? selected_payment === 'credit_card'
        ? styles.activeSelectBox
        : styles.inactiveSelectBox
      : [
          styles.inactiveSelectBox,
          {backgroundColor: '#E4E4E4', borderWidth: 0},
        ];

    const iconStyle =
      selected_payment === 'credit_card'
        ? styles.cardActiveIcon
        : styles.cardInactiveICon;

    const allowText = allow_credit_card_text ? (
      <Text style={styles.allowText}>{allow_credit_card_text}</Text>
    ) : null;

    const titleTextStyle = allow_credit_card
      ? styles.allowedPaymentOption
      : styles.notAllowedPaymentOption;

    return (
      <View>
        <TouchableOpacity
          onPress={() => this.onCreditButtonPressed()}
          style={styles.paymentOptionsListView}>
          <View style={styles.iconContainer}>
            <Image
              source={require('./../../assets/images/credit_card.png')}
              style={iconStyle}
            />
          </View>
          <View>
            <View style={styles.walletTextContainer}>
              <Text style={titleTextStyle}>Credit / Debit Card</Text>
            </View>
          </View>
          <View style={selectBoxStyle} />
        </TouchableOpacity>
        {allowText}
      </View>
    );
  };

  renderCashPaymentSection = () => {
    const {selected_payment} = this.state;
    const {selectedShop} = this.props;
    const {allow_pay_in_store, allow_pay_in_store_text} = selectedShop;

    const selectBoxStyle = allow_pay_in_store
      ? selected_payment === 'counter'
        ? styles.activeSelectBox
        : styles.inactiveSelectBox
      : [
          styles.inactiveSelectBox,
          {backgroundColor: '#E4E4E4', borderWidth: 0},
        ];

    const iconStyle =
      selected_payment === 'counter'
        ? styles.cashActiveIcon
        : styles.cashInactiveIcon;

    const allowText = allow_pay_in_store_text ? (
      <Text style={styles.allowText}>{allow_pay_in_store_text}</Text>
    ) : null;

    const titleTextStyle = allow_pay_in_store
      ? styles.allowedPaymentOption
      : styles.notAllowedPaymentOption;
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.onCounterButtonPressed()}
          style={styles.paymentOptionsListView}>
          <View style={styles.iconContainer}>
            <Image
              source={require('./../../assets/images/cash.png')}
              style={iconStyle}
            />
          </View>
          <View>
            <View style={styles.walletTextContainer}>
              <Text style={titleTextStyle}>Pay In Store</Text>
            </View>
          </View>
          <View style={selectBoxStyle} />
        </TouchableOpacity>
        {allowText}
      </View>
    );
  };

  renderPaymentOptions = () => {
    return (
      <View style={styles.paymentOptionsView}>
        {this.renderWalletPaymentSection()}
        {this.renderCardPaymentSection()}
        {this.renderCashPaymentSection()}
      </View>
    );
  };

  renderShopImage = () => {
    let {selectedShop} = this.props;
    let {url} = selectedShop.image;
    let shopImage = url ? (
      <View style={styles.completeOrderView}>
        <Image
          resizeMode={'cover'}
          source={{uri: url}}
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
      deliveryFee,
    } = this.state;
    let {selectedShop, cart, promotions, isDelivery} = this.props;
    var final_price_delivery =
      parseFloat(final_price) + parseFloat(deliveryFee);
    let non_negative_final_price = parseFloat(
      Math.max(0, final_price_delivery),
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
                flex: 1,
              }}>
              <View style={styles.locationWrapperView}>
                {!isDelivery && (
                  <View style={styles.locationView}>
                    <View style={styles.branchView}>
                      <Text style={styles.shopBranchText}>
                        {selectedShop.name}
                      </Text>
                      <Text
                        numberOfLines={3}
                        style={styles.shopBranchAddressText}>
                        {selectedShop.short_address}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                      }}
                    />
                    <View style={styles.callView}>
                      <TouchableOpacity
                        onPress={() =>
                          this.onCallPressed(selectedShop.phone_no)
                        }
                        style={styles.callIconButton}>
                        <Image
                          source={require('./../../assets/images/call-Icon.png')}
                          style={styles.callIconButtonImage}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          flex: 1,
                        }}
                      />
                      <Text style={styles.callText}>Call</Text>
                    </View>
                    <View style={styles.directionView}>
                      <TouchableOpacity
                        onPress={() => this.onPressDirection(selectedShop)}
                        // onPress={() => this.onLocationButtonPressed()}
                        style={styles.directionIconButton}>
                        <Image
                          source={require('./../../assets/images/direction-Icon.png')}
                          style={styles.directionIconButtonImage}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          flex: 1,
                        }}
                      />
                      <Text style={styles.directionText}>Direction</Text>
                    </View>
                  </View>
                )}
              </View>

              {!isDelivery && <CurveSeparator />}
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

              {isDelivery
                ? selected_address != undefined
                  ? this.renderDeliveryAddress(selected_address)
                  : this.renderDeliveryAddress(false)
                : undefined}
              {isDelivery && <CurveSeparator />}
              <View style={styles.totalViewWrapper}>
                <View style={styles.totalView}>
                  <Text style={styles.totallabelText}>TOTAL</Text>
                  <View
                    style={{
                      flex: 1,
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
    let {deliveryFee, enablePaynow} = this.state;
    let style = enablePaynow
      ? [styles.payNowButton, {backgroundColor: 'rgb(0, 178, 227)'}]
      : [styles.payNowButton, {backgroundColor: '#BDBDBD'}];

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
          disabled={!enablePaynow}
          onPress={() => this.checkout()}
          style={style}>
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
      selected_address,
    } = this.state;
    let {cart_total, discount_cart_total} = this.props;
    let non_negative_final_price = parseFloat(Math.max(0, final_price)).toFixed(
      2,
    );
    return (
      <SafeAreaView style={styles.checkoutViewPadding}>
        <ScrollView
          onLayout={(event) => this.measureView(event)}
          style={styles.scrollviewScrollView}>
          <View style={styles.ordersummaryView}>
            {this.renderCheckoutReceipt()}
          </View>
        </ScrollView>
        {(isPaymentToggle == true || isPickupToogle == true) && (
          <View style={styles.checkoutViewOverlay} />
        )}
        {this.renderPayNow(non_negative_final_price)}
        {this.renderTimeSelector()}
        <HudLoading isLoading={this.state.loading} />
        <Brew9Toast ref="toast" />
        <Brew9PopUp
          cancelText={'Cancel'}
          description={'Please add delivery address'}
          OkText={'Add address'}
          onBackgroundPress={this.closePopUp}
          onChangeText={(text) => this.onChangeCoupon(text)}
          onPressCancel={() => this.setState({visible: false})}
          onPressOk={this.addFirstShippingAddress}
          popUpVisible={this.state.visible}
          title={''}
        />
        {this.renderConfirmPopup()}
        {selected_address && (
          <Brew9PopUp
            cancelText={'Cancel'}
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
            onBackgroundPress={this.closePopUp}
            onChangeText={(text) => this.onChangeCoupon(text)}
            onPressCancel={() => this.setState({addressConfirmation: false})}
            onPressOk={() =>
              this.setState({addressConfirmation: false}, () =>
                this.loadMakeOrder(),
              )
            }
            popUpVisible={this.state.addressConfirmation}
            title={'Are you sure to use this address as delivery address?'}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  activeCreditsText: {
    color: PRIMARY_COLOR,
    fontFamily: NON_TITLE_FONT,
    fontSize: fontAlpha * 14,
  },
  activeSelectBox: {
    backgroundColor: '#00B2E3',
    borderColor: '#BAB7B7',
    borderRadius: 9 * alpha,
    borderStyle: 'solid',
    borderWidth: 1 * alpha,
    height: 16 * alpha,
    position: 'absolute',
    right: alpha * 10,
    width: 16 * alpha,
  },
  addressText: {
    backgroundColor: 'transparent',
    color: 'rgb(146, 146, 146)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    paddingBottom: 5 * alpha,
    paddingLeft: 0,
    width: 191 * alpha,
  },
  allowText: {
    backgroundColor: 'transparent',
    color: '#A3A3A3',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginLeft: alpha * 10,
    textAlign: 'left',
    width: 191 * alpha,
  },
  branchText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: NON_TITLE_FONT,

    fontSize: 15 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  branchView: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    height: 60 * alpha,
    justifyContent: 'center',
    width: 182 * alpha,
  },

  callIconButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'rgb(180, 179, 179)',
    borderRadius: 17.5 * alpha,
    borderStyle: 'solid',
    borderWidth: 1 * alpha,
    flexDirection: 'row',
    height: 35 * alpha,
    justifyContent: 'center',
    padding: 0,
  },
  callIconButtonImage: {
    resizeMode: 'contain',
  },
  callText: {
    backgroundColor: 'transparent',
    color: 'rgb(163, 163, 163)',
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    marginLeft: 6 * alpha,
    marginRight: 7 * alpha,
    textAlign: 'center',
  },
  callView: {
    backgroundColor: 'transparent',
    height: 55 * alpha,
    marginRight: 8 * alpha,
    width: 35 * alpha,
  },
  callrefundText: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    color: 'rgb(152, 149, 149)',
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    marginBottom: 13,
    marginLeft: 26 * alpha,
    marginTop: 13 * alpha,
    textAlign: 'left',
  },
  cancelImage: {
    height: 15 * alpha,
    resizeMode: 'contain',
    width: 15 * alpha,
  },
  cancelVoucherButton: {
    height: 15 * alpha,
    marginLeft: 5 * alpha,
    width: 15 * alpha,
  },

  cardActiveIcon: {
    height: alpha * 23,
    tintColor: PRIMARY_COLOR,
    width: alpha * 23,
  },
  cardInactiveICon: {
    height: alpha * 23,
    tintColor: 'rgb(186, 183, 183)',
    width: alpha * 23,
  },
  cashActiveIcon: {
    height: alpha * 19,
    tintColor: PRIMARY_COLOR,
    width: alpha * 19,
  },
  cashInactiveIcon: {
    height: alpha * 19,
    tintColor: 'rgb(186, 183, 183)',
    width: alpha * 19,
  },
  cc: {
    height: alpha * 16,
    marginLeft: alpha * 9,
    width: alpha * 27,
  },
  checkoutViewOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  checkoutViewPadding: {
    backgroundColor: DEFAULT_GREY_BACKGROUND,
    flex: 1,
    paddingBottom: (47 + BUTTONBOTTOMPADDING) * alpha,
  },
  completeOrderView: {
    alignItems: 'center',
    borderTopLeftRadius: 14 * alpha,
    borderTopRightRadius: 14 * alpha,
    height: alpha * 150,
    overflow: 'hidden',
    width: '100%',
  },
  completedOrderText: {
    backgroundColor: 'transparent',
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    marginBottom: 30 * alpha,
    marginTop: 10 * alpha,
    textAlign: 'center',
  },
  dc: {
    height: alpha * 30,
    marginLeft: alpha * 7,
    width: alpha * 25,
  },
  deliveryAddressDetail: {
    backgroundColor: 'transparent',
    color: 'rgb(63, 63, 63)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    marginBottom: 5 * alpha,
    textAlign: 'right',
  },
  deliveryAddressView: {
    backgroundColor: 'rgb(245,245,245)',
    paddingHorizontal: 24 * alpha,
  },
  deliveryImage: {
    backgroundColor: 'transparent',
    height: 23 * alpha,
    resizeMode: 'contain',
    width: 35 * alpha,
  },
  deliveryNoted: {
    backgroundColor: 'transparent',
    color: '#ff4500',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    width: 191 * alpha,
  },
  deliveryView: {
    backgroundColor: 'white',
    borderColor: 'rgb(151, 151, 151)',
    borderStyle: 'solid',
    borderWidth: 1 * alpha,
    height: 54 * alpha,
    width: 168 * alpha,
  },
  deliveryView_selected: {
    backgroundColor: 'white',
    borderColor: 'rgb(0, 178, 227)',
    borderStyle: 'solid',
    borderWidth: 1 * alpha,
    height: 54 * alpha,
    width: 168 * alpha,
  },

  descriptionText: {
    backgroundColor: 'transparent',
    color: 'rgb(146, 146, 146)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'left',
  },
  directionIconButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'rgb(180, 179, 179)',
    borderRadius: 17.5 * alpha,
    borderStyle: 'solid',
    borderWidth: 1 * alpha,
    flexDirection: 'row',
    height: 35 * alpha,
    justifyContent: 'center',
    marginLeft: 8 * alpha,
    marginRight: 7 * alpha,
    padding: 0,
  },

  directionIconButtonImage: {
    resizeMode: 'contain',
  },
  directionText: {
    backgroundColor: 'transparent',
    color: 'rgb(163, 163, 163)',
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
  },
  directionView: {
    backgroundColor: 'transparent',
    height: 55 * alpha,
    width: 50 * alpha,
  },
  dottedLineImage: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    bottom: 0,
    height: 2 * alpha,
    position: 'absolute',
    resizeMode: 'cover',
    width: 291 * alpha,
  },

  drinksView: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingTop: 10 * alpha,
  },

  editAddressText: {
    backgroundColor: 'transparent',
    color: 'rgb(50, 50, 50)',
    flex: 1,
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    width: 191 * alpha,
    // marginBottom: 10 * alpha,
  },
  greenCircle: {
    backgroundColor: 'green',
    borderRadius: 5 * alpha,
    height: 10 * alpha,
    marginRight: 5 * alpha,
    width: 10 * alpha,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    marginLeft: 8 * alpha,
    width: 70 * alpha,
  },
  iconContainer: {
    marginRight: alpha * 5,
    width: alpha * 25,
  },
  inActiveCreditsText: {
    color: '#ED6E69',
    fontFamily: NON_TITLE_FONT,
    fontSize: fontAlpha * 14,
  },
  inactiveSelectBox: {
    backgroundColor: 'transparent',
    borderColor: '#BAB7B7',
    borderRadius: 9 * alpha,
    borderStyle: 'solid',
    borderWidth: 1 * alpha,
    height: 16 * alpha,
    position: 'absolute',
    right: alpha * 10,
    width: 16 * alpha,
  },
  item2View: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 46 * alpha,
    marginRight: 1 * alpha,
  },
  itemTwoView: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 90 * alpha,
    marginRight: 1 * alpha,
  },
  itemView: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 90 * alpha,
  },
  lineThreeView: {
    backgroundColor: 'rgb(234, 234, 234)',
    height: 1 * alpha,
    marginLeft: 25 * alpha,
    marginRight: 24 * alpha,
    marginTop: 14 * alpha,
  },
  locationView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 64 * alpha,
    marginLeft: 25 * alpha,
    marginRight: 25 * alpha,
    marginTop: 18 * alpha,
  },
  locationWrapperView: {
    backgroundColor: 'rgb(245, 245, 245)',
    flex: 1,
  },
  logoImage: {
    backgroundColor: 'transparent',
    height: 60 * alpha,
    marginTop: 30 * alpha,
    resizeMode: 'contain',
    width: 30 * alpha,
  },
  menuRowArrowImage: {
    width: 10 * alpha,
    height: 10 * alpha,
    marginLeft: 5 * alpha,
    // marginTop: 4 * alpha,
    tintColor: 'rgb(50, 50, 50)',
    resizeMode: 'contain',
  },
  nameText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 15 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
  },
  nameThreeText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 15 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
    width: 190 * alpha,
  },
  navigationBarItem: {
    width: '100%',
  },
  navigationBarItemIcon: {
    height: 18 * alpha,
    tintColor: 'black',
    width: 18 * alpha,
  },
  orderCartView: {
    alignSelf: 'stretch',
    backgroundColor: 'rgb(245, 245, 245)',
    borderRadius: 14 * alpha,
    flex: 1,
    marginBottom: 50 * alpha + BUTTONBOTTOMPADDING,
    marginLeft: 18 * alpha,
    marginRight: 18 * alpha,
    marginTop: 13 * alpha,
  },
  orderReceiptView: {
    backgroundColor: DEFAULT_GREY_BACKGROUND,
    flex: 1,
  },
  orderScrollView: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  orderitemsView: {
    // backgroundColor: 'green',
    // marginLeft: 24 * alpha,
    // marginRight: 24 * alpha,
    // flex: 1
  },
  ordersummaryView: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 0 * alpha,
  },
  payNowButton: {
    alignItems: 'center',
    backgroundColor: 'rgb(0, 178, 227)',
    flexDirection: 'row',
    height: 47 * alpha,
    justifyContent: 'center',
    padding: 0,
    width: 114 * alpha,
  },
  payNowButtonText: {
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
  },
  paymentButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
  paymentButtonText: {
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 18 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginLeft: 20 * alpha,
    textAlign: 'left',
  },
  allowedPaymentOption: {
    color: '#363636',
    fontFamily: NON_TITLE_FONT,
    fontSize: fontAlpha * 14,
  },
  notAllowedPaymentOption: {
    color: '#A3A3A3',
    fontFamily: NON_TITLE_FONT,
    fontSize: fontAlpha * 14,
  },
  paymentOptionsListView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    minHeight: alpha * 40,
  },
  paymentOptionsView: {
    // height: alpha * 120,
    flex: 1,
    paddingHorizontal: alpha * 17,
  },
  pickupbuttonButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 54 * alpha,
    justifyContent: 'center',
    padding: 0,
    width: 168 * alpha,
  },
  pickupbuttonButtonImage: {
    resizeMode: 'contain',
  },
  pickupbuttonButtonText: {
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
  },

  priceText: {
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginTop: 26 * alpha,
    textAlign: 'left',
  },
  priceThreeText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginRight: 3 * alpha,
    textAlign: 'right',
  },
  productDetailView: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  },
  productNameDisabledText: {
    backgroundColor: 'transparent',
    color: LIGHT_GREY,
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    marginBottom: 5 * alpha,
    textAlign: 'left',
  },

  productNameText: {
    backgroundColor: 'transparent',
    color: 'rgb(63, 63, 63)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
    // marginBottom: 5 * alpha
  },

  productPriceText: {
    backgroundColor: 'transparent',
    color: 'rgb(50, 50, 50)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    width: 55 * alpha,
  },
  productQuantityText: {
    backgroundColor: 'transparent',
    color: 'rgb(50, 50, 50)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginRight: 4 * alpha,
    textAlign: 'right',
    width: 25 * alpha,
  },

  productVariantText: {
    backgroundColor: 'transparent',
    color: 'rgb(164, 164, 164)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginBottom: 10 * alpha,
    textAlign: 'left',
    width: 191 * alpha,
  },
  productVoucherDisableText: {
    backgroundColor: 'transparent',
    color: 'rgb(163, 163, 163)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
  },
  productVoucherText: {
    backgroundColor: 'transparent',
    color: 'rgb(50, 50, 50)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
  },
  quantityText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginRight: 52 * alpha,
    marginTop: 26 * alpha,
    textAlign: 'right',
  },
  quantityThreeText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginRight: 56 * alpha,
    textAlign: 'right',
  },
  redCircle: {
    backgroundColor: 'red',
    borderRadius: 5 * alpha,
    height: 10 * alpha,
    marginRight: 5 * alpha,
    width: 10 * alpha,
  },
  scrollviewScrollView: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  sectionRowView: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: alpha * 40,
  },
  sectionView: {
    backgroundColor: 'rgb(245,245,245)',
    flex: 1,
    paddingHorizontal: 24 * alpha,
  },
  shopBranchAddressText: {
    backgroundColor: 'transparent',
    color: 'rgb(146, 146, 146)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    marginLeft: 1 * alpha,
    textAlign: 'left',
  },
  shopBranchText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    marginRight: 12 * alpha,
    textAlign: 'left',
  },
  shopImage: {
    height: '100%',
    width: '100%',
  },
  shopImageContainer: {
    borderColor: 'red',
    borderWidth: 2,
    height: alpha * 100,
    paddingLeft: 18 * alpha,
    paddingRight: 18 * alpha,
    width: windowWidth,
  },

  spacer: {
    marginBottom: 10 * alpha,
  },

  tabImage: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    height: 17 * alpha,
    resizeMode: 'contain',
    width: 17 * alpha,
  },
  tabTwoImage: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    height: 17 * alpha,
    resizeMode: 'contain',
    width: 17 * alpha,
  },

  tag: {
    backgroundColor: '#ED6E69',
    borderRadius: alpha * 10,
    marginLeft: 10,
    maxWidth: alpha * 150,
    paddingHorizontal: alpha * 7,
    paddingVertical: alpha * 2,
  },
  tagText: {
    color: '#FFFFFF',
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha,
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
    alignItems: 'center',
  },
  totalText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'right',
  },
  totalView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 21 * alpha,
    marginBottom: 18 * alpha,
    marginLeft: 26 * alpha,
    marginRight: 24 * alpha,
    marginTop: 10 * alpha,
  },
  totalViewWrapper: {
    backgroundColor: 'rgb(245,245,245)',
    borderBottomLeftRadius: 14 * alpha,
    borderBottomRightRadius: 14 * alpha,
    flex: 1,
  },

  totallabelText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'center',
  },

  union: {
    height: alpha * 27,
    marginLeft: alpha * 7,
    width: alpha * 27,
  },
  visa: {
    height: alpha * 9,
    marginLeft: alpha * 7,
    width: alpha * 27,
  },
  voucher2View: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 17 * alpha,
    marginLeft: 26 * alpha,
    marginRight: 25 * alpha,
    marginTop: 17 * alpha,
  },
  voucherButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    padding: 0,
  },

  voucherButtonText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  voucherButtonText: {
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 10 * alpha,
    paddingLeft: 5 * alpha,
    paddingRight: 5 * alpha,
    textAlign: 'center',
  },

  voucherButtonView: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10 * alpha,
    width: 60 * alpha,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 5 * alpha,
    marginLeft: 5 * alpha,
  },

  voucherDescriptionText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },

  voucherDetailView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
  },

  voucherPriceText: {
    backgroundColor: 'transparent',
    color: 'rgb(50, 50, 50)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    width: 55 * alpha,
  },

  voucherQuantityText: {
    backgroundColor: 'transparent',
    color: 'rgb(50, 50, 50)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    width: 50 * alpha,
  },
  voucherView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 18 * alpha,
    marginLeft: 26 * alpha,
    marginRight: 25 * alpha,
    marginTop: 42 * alpha,
  },
  voucherView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 18 * alpha,
    marginBottom: 10 * alpha,
  },
  walletActiveIcon: {
    height: alpha * 25,
    tintColor: PRIMARY_COLOR,
    width: alpha * 25,
  },
  walletInactiveIcon: {
    height: alpha * 25,
    tintColor: 'rgb(186, 183, 183)',
    width: alpha * 25,
  },
  walletTextContainer: {
    flexDirection: 'row',
  },
  whiteboxView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 14 * alpha,
    borderTopRightRadius: 14 * alpha,
    flex: 1,
    width: '100%',
  },
});

export default Checkout;
