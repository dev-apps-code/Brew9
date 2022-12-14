import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Linking,
  RefreshControl,
  AppState,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Moment from 'moment';
import _ from 'lodash';
import {Analytics, Event} from 'expo-analytics';
import {LinearGradient} from 'expo-linear-gradient';
import {alpha, fontAlpha, windowWidth, windowHeight} from '../Common/size';
import {connect} from 'react-redux';
import GetCurrentOrderRequestObject from '../Requests/get_current_order_request_object';
import {getResponseMsg} from '../Utils/responses';
import * as commonStyles from '../Common/common_style';
import {ANALYTICS_ID} from '../Common/config';
import {createAction} from '../Utils/index';
import {getMemberIdForApi} from '../Services/members_helper';
import {Brew9Loading, CurveSeparator, HudLoading} from '../Components';

const {
  TITLE_FONT,
  NON_TITLE_FONT,
  TABBAR_INACTIVE_TINT,
  TABBAR_ACTIVE_TINT,
  PRIMARY_COLOR,
  LIGHT_BLUE,
  HEADER_NO_BACK,
  DEFAULT_GREY_BACKGROUND,
} = commonStyles;
@connect(({members, shops, config}) => ({
  currentMember: members.profile,
  company_id: members.company_id,
  location: members.location,
  selectedShop: shops.selectedShop,
  selectedTab: config.selectedTab,
  popUp: shops.popUp,
  currentOrder: shops.currentOrder,
  orders: shops.orders,
  responses: config.responses,
  shopResponses: config.shopResponses,
}))
export default class PickUp extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Text style={HEADER_NO_BACK}>Your Order</Text>,
      headerTintColor: 'black',
      headerLeft: null,
      headerRight: null,
    };
  };

  static tabBarItemOptions = (navigation, store) => {
    return {
      tabBarLabel: 'Order',
      tabBarOnPress: ({navigation, defaultHandler}) => {
        store.dispatch(createAction('config/setToggleShopLocation')(false));
        store.dispatch(createAction('config/setTab')('pickup'));
        defaultHandler();
      },
      tabBarIcon: ({iconTintColor, focused}) => {
        const image = focused
          ? require('./../../assets/images/pickup_selected_tab.png')
          : require('./../../assets/images/pickup_tab.png');

        return (
          <Image
            source={image}
            style={{
              resizeMode: 'contain',
              width: 30,
              height: 30 * alpha,
              tintColor: focused ? TABBAR_ACTIVE_TINT : TABBAR_INACTIVE_TINT,
            }}
          />
        );
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      appState: AppState.currentState,
      total_exp: 0,
      total_point: 0,
      showPopUp: false,
    };
  }

  componentDidMount() {
    this.loadCurrentOrder();
    const {currentMember} = this.props;
    const {navigation} = this.props;
    AppState.addEventListener('change', this._handleAppStateChange);
    this.navigationListener = navigation.addListener('willFocus', (payload) => {
      if (currentMember != null) {
        this.loadCurrentOrder();
      }
      if (this.props.popUp != this.state.showPopUp) {
        this.setState({showPopUp: this.props.popUp});
      }
    });
  }

  componentWillUnmount() {
    this.removeNavigationListener();
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    const {currentMember} = this.props;
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
    }
    this.setState({appState: nextAppState});
  };

  removeNavigationListener() {
    if (this.navigationListener) {
      this.navigationListener.remove();
      this.navigationListener = null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedTab != this.props.selectedTab) {
      // this.loadCurrentOrder()
    }
    if (this.props.selectedTab == 'pickup') {
      if (this.props.popUp != this.state.showPopUp) {
        this.setState({showPopUp: this.props.popUp});
      }
    }
  }

  onOrderHistoryPressed = () => {
    const {currentMember} = this.props;
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event('My Order', getMemberIdForApi(currentMember), 'Order History'),
    );

    const {navigate} = this.props.navigation;
    navigate('OrderHistory');
  };

  onCallPressed = (phone_no) => {
    Linking.openURL(`tel:${phone_no}`);
  };

  onOrderPressed = () => {
    const {navigate} = this.props.navigation;
    const {currentMember} = this.props;
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event('My Order', getMemberIdForApi(currentMember), 'Order'),
    );

    navigate('Home');
  };

  loadCurrentOrder() {
    const {dispatch, currentMember} = this.props;
    let {refreshing} = this.state;
    if (currentMember != null) {
      refreshing
        ? this.setState({loading: false})
        : this.setState({loading: true});
      const callback = (eventObject) => {
        if (eventObject.success) {
        }
        this.setState({
          loading: false,
          refreshing: false,
        });
      };
      const obj = new GetCurrentOrderRequestObject();
      obj.setUrlId(currentMember.id);
      dispatch(
        createAction('members/loadCurrentOrder')({
          object: obj,
          callback,
        }),
      );
    }
  }

  renderSeparator = () => <CurveSeparator />;

  renderQueueView(current_order) {
    const {responses, selectedShop} = this.props;

    const queues = current_order.map((item, key) => {
      let claim_day = item.pickup_status == 'Tomorrow' ? 'TOMORROW' : '';
      let cart_total = parseFloat(item.sub_total) + parseFloat(item.discount);
      // Pick up title
      let pick_up_title = item.delivery_method ? 'ETA Delivery' : 'Pickup';

      let isDelivery = item.delivery_method == 1;
      let eta_time = item?.estimate_collection_time || item.pickup_time;
      let pick_up_time = isDelivery ? eta_time : item.pickup_time;
      pick_up_time = Moment(pick_up_time, 'H:mm').format('h:mm A');
      let _eta_time = pick_up_time.split(' ');
      let estimated_time = _eta_time[0];
      let meridiem = _eta_time[1];

      // Set progress bar values
      let progressValues = {pending: 0.33, processing: 0.66, ready: 1};
      let progress = progressValues[item.status] || 0;

      let delivery_fee = item.delivery_fee ? item.delivery_fee : 0;
      let subtotal = item.sub_total || 0;
      let subtotal_string = '$' + parseFloat(subtotal).toFixed(2);

      let calculate_cart_total = cart_total;

      // Suggesting this must be added to a default values
      let paid_order_message = '';
      let unpaid_order_message = '';

      let remarks = '';
      if (item.delivery_method) {
        //old response
        // let default_remark =
        //   'Your order is now in process and will be delivered to ' +
        //   'you estimated 30 minutes.';

        // remarks = responses.get('Delivery Remark') || default_remark;
        remarks = getResponseMsg({
          props: this.props,
          shopId: selectedShop.id,
          key: 'Delivery Remark',
          defaultText:
            'Your order is now in process and will be delivered to you estimated 30 minutes.',
        });
      } else {
        if (item.paid == true) {
          //old response
          // paid_order_message = responses.get('Not Collected Order');
          paid_order_message = getResponseMsg({
            props: this.props,
            shopId: selectedShop.id,
            key: 'Not Collected Order',
            defaultText:
              'Order must be collected within 30 minutes of collection time. Otherwise it will be canceled and non-refundable',
          });
        } else {
          //old response
          // unpaid_order_message = responses.get('Pending Payment (Remarks)');
          unpaid_order_message = getResponseMsg({
            props: this.props,
            shopId: selectedShop.id,
            key: 'Pending Payment (Remarks)',
            defaultText: 'Your order will be processed upon receiving payment.',
          });
        }

        remarks = item.paid ? paid_order_message : unpaid_order_message;
      }

      const pendingPayment = getResponseMsg({
        props: this.props,
        shopId: selectedShop.id,
        key: 'Pending Payment Text',
        defaultText: 'Pending Payment',
      });

      const order_items = item.order_items.map((productItem, key) => {
        var price_string =
          productItem.total_price != undefined && productItem.total_price > 0
            ? `$${parseFloat(productItem.total_price).toFixed(2)}`
            : productItem.total_price != undefined &&
              productItem.total_price == 0
            ? 'Free'
            : '';

        return (
          <View style={styles.drinksView} key={key}>
            <View
              pointerEvents="box-none"
              style={{
                justifyContent: 'center',
                backgroundColor: 'transparent',
                flex: 1,
                flexDirection: 'row',
              }}>
              <View
                style={[styles.productDetailView, {marginRight: 5 * alpha}]}>
                <Text style={styles.productNameText}>
                  {productItem.product_name}
                </Text>
                {productItem.variations != null &&
                productItem.variations != '' ? (
                  <Text style={styles.productVariantText}>
                    {productItem.variations}
                  </Text>
                ) : (
                  <View style={styles.spacer} />
                )}
              </View>
              <View
                style={{
                  flex: 0.4,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.productQuantityText}>
                  x{productItem.quantity}
                </Text>

                <Text style={styles.productPriceText}>{price_string}</Text>
              </View>
              {item.order_items != null &&
                key < item.order_items.length - 1 && (
                  <Image
                    source={require('./../../assets/images/dotted-line.png')}
                    style={styles.dottedLineImage}
                  />
                )}
            </View>
          </View>
        );
      });

      const promotions = item.promotions.map((item, key) => {
        var promotion_discount = '';
        // if (item.reward_type == 'Discount') {
        if (item.value_type == 'fixed') {
          promotion_discount = `-$${parseFloat(item.promotion_value).toFixed(
            2,
          )}`;
          calculate_cart_total -= item.value;
        } else if (item.value_type == 'percent') {
          promotion_discount = `-$${parseFloat(item.promotion_value).toFixed(
            2,
          )}`;
          calculate_cart_total -= parseFloat(
            calculate_cart_total * (item.value / 100),
          );
        }

        return (
          <View style={[styles.drinksView, {marginTop: 0}]} key={key}>
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: 'transparent',
                flex: 1,
                flexDirection: 'row',
              }}>
              <View style={styles.productDetailView}>
                <Text style={[styles.productNameText, {marginBottom: 0}]}>
                  {item.cart_text}
                </Text>

                <View style={styles.spacer} />
              </View>

              {item.reward_type == 'Discount' && (
                <Text style={styles.productPriceText}>
                  {promotion_discount}
                </Text>
              )}
              {item.promotions != null && key < item.promotions.length - 1 && (
                <Image
                  source={require('./../../assets/images/dotted-line.png')}
                  style={styles.dottedLineImage}
                />
              )}
            </View>
          </View>
        );
        // }
      });
      var queue_no_remarks = item.queue_no;

      if (!item.delivery_method && !item.paid) {
        queue_no_remarks = '-';
      }
      const voucher_items = item.voucher_items.map((voucherItem, key) => {
        let voucher_discount = '';

        /* Queue no should only not show when item is pickup and not paid  */

        return (
          <View style={[styles.drinksView, {marginTop: 0}]} key={key}>
            <View
              pointerEvents="box-none"
              style={{
                justifyContent: 'center',
                backgroundColor: 'transparent',
                flex: 1,
                flexDirection: 'row',
              }}>
              <View style={styles.productDetailView}>
                <Text style={styles.productNameText}>
                  {voucherItem.voucher.name}
                </Text>

                <View style={{marginBottom: 10 * alpha}} />
              </View>

              <Text style={styles.productPriceText}>
                -${item.voucher_value}
              </Text>
              {/* {voucherItem.voucher_items != null &&
                key < item.voucher_items.length - 1 && (
                  <Image
                    source={require('./../../assets/images/dotted-line.png')}
                    style={styles.dottedLineImage}
                  />
                )} */}
            </View>
          </View>
        );
      });

      return (
        <View style={styles.pickUpQueueView} key={key}>
          <View
            pointerEvents="box-none"
            style={{
              alignSelf: 'flex-start',
              flex: 1,
              height: 29 * alpha,
              marginLeft: 19 * alpha,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}></View>
          <View style={[styles.queueView, {marginTop: 15 * alpha}]}>
            <View
              style={[
                styles.queueView,
                {
                  alignItems: 'center',
                  marginTop: item.paid == false ? 40 : 0 * alpha,
                },
              ]}>
              <View
                pointerEvents="box-none"
                style={{
                  flex: 1,
                  marginTop: 19 * alpha,
                  flexDirection: 'row',
                }}>
                <View style={styles.queueHeaderBlock}>
                  <Text style={styles.queueheaderText}>Order Number</Text>
                  <Text style={styles.queuenumberText}>{queue_no_remarks}</Text>
                </View>
                <View style={styles.queueHeaderBlock}>
                  <Text style={styles.pickupTimeheaderText}>
                    {pick_up_title}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.pickupTimeText}>
                      {estimated_time}
                      <Text style={styles.pickupTimeAMPMText}>{meridiem}</Text>
                    </Text>
                  </View>
                  {item.delivery_method == 1 && claim_day != null ? (
                    <Text style={styles.delivery_day}>{claim_day}</Text>
                  ) : undefined}
                </View>
              </View>

              <View style={styles.progressView}>
                <View style={styles.orderedView}>
                  <Image
                    source={require('./../../assets/images/ordered-icon.png')}
                    style={
                      item.status === 'pending'
                        ? styles.orderedSelectedImage
                        : styles.orderedImage
                    }
                  />
                  <View
                    style={{
                      flex: 1,
                    }}
                  />
                  <Text
                    style={
                      item.status === 'pending'
                        ? styles.orderedSelectedText
                        : styles.orderedText
                    }>
                    Ordered
                  </Text>
                </View>
                <Image
                  source={require('./../../assets/images/divider.png')}
                  style={styles.dividerImage}
                />
                <View style={styles.processingView}>
                  <Image
                    source={require('./../../assets/images/preparing.png')}
                    style={
                      item.status === 'processing'
                        ? styles.processingSelectedImage
                        : styles.processingImage
                    }
                  />
                  <View
                    style={{
                      flex: 1,
                    }}
                  />
                  <Text
                    style={
                      item.status === 'processing'
                        ? styles.processingSelectedText
                        : styles.processingText
                    }>
                    Preparing
                  </Text>
                </View>
                <Image
                  source={require('./../../assets/images/divider.png')}
                  style={styles.dividerImage}
                />
                <View style={styles.pickUpView}>
                  <Image
                    source={require('./../../assets/images/ordered-ready.png')}
                    style={
                      item.status === 'ready'
                        ? styles.pickupSelectedImage
                        : styles.pickupImage
                    }
                  />
                  <View
                    style={{
                      flex: 1,
                    }}
                  />
                  <Text
                    style={
                      item.status === 'ready'
                        ? styles.pickUpSelectedText
                        : styles.pickUpText
                    }>
                    Order Ready
                  </Text>
                </View>
              </View>
              <View style={styles.progressbarView}>
                {this.renderProgressBar(progress)}
              </View>
              <TouchableOpacity
                style={styles.refreshView}
                onPress={this.onRefresh}>
                <Image
                  source={require('./../../assets/images/refresh-sharp.png')}
                  style={styles.refreshImage}
                />
              </TouchableOpacity>
            </View>
            {item.paid == false && (
              <TouchableOpacity
                style={styles.updateOrder}
                onPress={() => {
                  this.onEditOrder(item.order_items, item);
                }}>
                <Text style={styles.updateOrderText}>{pendingPayment}</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.orderDetailView}>
            <View style={styles.locationWrapperView}>
              <View style={styles.locationView}>
                <View style={styles.branchView}>
                  <Text style={styles.shopBranchText}>{item.shop.name}</Text>
                  <Text numberOfLines={3} style={styles.shopBranchAddressText}>
                    {item.shop.short_address}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                />
                <View style={styles.callView}>
                  <TouchableOpacity
                    onPress={() => this.onCallPressed(item.shop.phone_no)}
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
                    onPress={() => this.onPressDirection()}
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
            </View>
            {this.renderSeparator()}

            <View style={styles.drinksViewWrapper}>
              {order_items}
              <View style={{marginTop: 10 * alpha}}>{promotions}</View>
              {voucher_items}
            </View>
            {this.renderSeparator()}

            <View style={styles.totalViewWrapper}>
              <View style={styles.orderTotalView}>
                <Text style={styles.totallabelText}>Status</Text>
                <View
                  style={{
                    flex: 1,
                  }}
                />
                <Text style={styles.orderTotalText}>
                  {item.paid == true ? 'paid' : 'unpaid'}
                </Text>
              </View>
            </View>
            {this.renderSeparator()}

            {item.delivery_fee > 0 ? (
              <View style={styles.totalViewWrapper}>
                <View style={styles.orderTotalView}>
                  <Text style={styles.totallabelText}>SubTotal</Text>
                  <View
                    style={{
                      flex: 1,
                    }}
                  />
                  <Text style={styles.orderTotalText}>{subtotal_string}</Text>
                </View>
              </View>
            ) : undefined}
            {item.delivery_fee > 0 ? this.renderSeparator() : undefined}
            {item.delivery_fee > 0 ? (
              <View style={styles.totalViewWrapper}>
                <View style={styles.orderTotalView}>
                  <Text style={styles.totallabelText}>Delivery Fee</Text>
                  <View
                    style={{
                      flex: 1,
                    }}
                  />
                  <Text style={styles.orderTotalText}>
                    {item.delivery_fee > 0
                      ? `$${parseFloat(item.delivery_fee).toFixed(2)}`
                      : undefined}
                  </Text>
                </View>
              </View>
            ) : undefined}
            {item.delivery_fee > 0 ? this.renderSeparator() : undefined}
            <View style={styles.totalViewWrapper}>
              <View style={styles.orderTotalView}>
                <Text style={styles.totallabelText}>TOTAL</Text>
                <View
                  style={{
                    flex: 1,
                  }}
                />
                <Text style={styles.orderTotalText}>
                  ${parseFloat(item.total).toFixed(2)}
                </Text>
              </View>
            </View>
            {this.renderSeparator()}
            <View style={styles.remarkViewWrapper}>
              <View style={styles.remarkView}>
                <View
                  pointerEvents="box-none"
                  style={{
                    marginHorizontal: 20 * alpha,
                    marginVertical: 11 * alpha,
                    alignItems: 'flex-start',
                  }}>
                  <View
                    pointerEvents="box-none"
                    style={{
                      alignSelf: 'stretch',
                      // height: 19 * alpha,
                      marginTop: 3 * alpha,
                      marginLeft: 3 * alpha,
                      marginRight: 4 * alpha,
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                    }}>
                    <Text style={[styles.orderTime100717Text, {flex: 0.25}]}>
                      Order time{' '}
                    </Text>
                    <Text style={[styles.orderTime100717Text]}> : </Text>
                    <Text style={[styles.orderTime100717Text, {flex: 1}]}>
                      {item.payment_time}
                    </Text>
                  </View>
                  <View
                    pointerEvents="box-none"
                    style={{
                      alignSelf: 'stretch',
                      // height: 19 * alpha,
                      marginTop: 3 * alpha,
                      marginLeft: 3 * alpha,
                      marginRight: 4 * alpha,
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                    }}>
                    <Text style={[styles.orderNo020028201Text, {flex: 0.25}]}>
                      Receipt no.{' '}
                    </Text>
                    <Text style={[styles.orderNo020028201Text]}> : </Text>
                    <Text style={[styles.orderNo020028201Text, {flex: 1}]}>
                      {item.receipt_no}
                    </Text>
                  </View>
                  <View
                    pointerEvents="box-none"
                    style={{
                      alignSelf: 'stretch',
                      // height: 19 * alpha,
                      marginTop: 3 * alpha,
                      marginLeft: 3 * alpha,
                      marginRight: 4 * alpha,
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                    }}>
                    <Text style={[styles.remarkNoPackingText, {flex: 0.25}]}>
                      Remarks{' '}
                    </Text>
                    <Text style={[styles.remarkNoPackingText]}> : </Text>
                    <Text style={[styles.remarkNoPackingText, {flex: 1}]}>
                      {remarks}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    });

    return (
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }>
        {queues}
        <View style={{height: 60 * alpha}} />
      </ScrollView>
    );
  }

  onRefresh = () => {
    this.setState({refreshing: true}, () => this.loadCurrentOrder());
  };

  onEditOrder = (order_items, current_order) => {
    const {navigate} = this.props.navigation;
    const {dispatch} = this.props;
    dispatch(
      createAction('orders/editCart')({
        order_items: order_items,
        order: current_order,
      }),
    );
    navigate('Home');
  };

  onPressDirection() {
    let {selectedShop} = this.props;

    let lat = selectedShop.latitude;
    let long = selectedShop.longitude;
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

  closePopUp = () => {
    const {dispatch} = this.props;
    dispatch(
      createAction('shops/setPopUp')({
        popUp: false,
      }),
    );

    this.setState({showPopUp: false});
  };

  renderProgressBar(progress) {
    progress_percent = progress * 100;
    return (
      <View style={{flexDirection: 'row', height: 10 * alpha, flex: 1}}>
        <View
          style={{
            flex: 1,
            borderColor: '#000',
            borderWidth: 1 * alpha,
            borderRadius: 5 * alpha,
          }}>
          <View
            style={[StyleSheet.absoluteFill, {backgroundColor: 'transparent'}]}
          />
          <LinearGradient
            colors={[LIGHT_BLUE, PRIMARY_COLOR]}
            start={[0, 0]}
            end={[1, 0]}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              borderRadius: 4 * alpha,
              width: `${progress_percent}%`,
            }}
          />
        </View>
      </View>
    );
  }

  renderEmpty() {
    return (
      <View style={styles.orderView}>
        <View style={styles.noOrderView}>
          <View style={styles.viewView}>
            <View
              pointerEvents="box-none"
              style={{
                position: 'absolute',
                alignSelf: 'center',
                top: 0 * alpha,
                bottom: 0 * alpha,
                justifyContent: 'center',
              }}>
              <View style={styles.centerView}>
                <Image
                  source={require('./../../assets/images/cup_icon.png')}
                  style={styles.logoImage}
                />
                <View style={styles.messageView}>
                  <Text style={styles.youHavenTMakeAnyText}>
                    You haven???t make any order yet.
                  </Text>
                  <Text style={styles.grabYoursNowText}>Grab yours now!</Text>
                </View>
              </View>
            </View>
            <View
              pointerEvents="box-none"
              style={{
                position: 'absolute',
                alignSelf: 'center',
                width: 185 * alpha,
                bottom: 23 * alpha,
                height: 72 * alpha,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={this.onOrderPressed}
                style={styles.orderButton}>
                <Text style={styles.orderButtonText}>Order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onOrderHistoryPressed}
                style={styles.orderHistoryButton}>
                <Text style={styles.orderHistoryButtonText}>Order History</Text>
                <Image
                  source={require('./../../assets/images/next.png')}
                  style={styles.orderHistoryButtonImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderPointExpModal() {
    const {currentOrder} = this.props;

    const total_points =
      currentOrder != null ? parseFloat(currentOrder.awarded_point) : 0;
    const total_exp =
      currentOrder != null ? parseFloat(currentOrder.awarded_point) : 0;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showPopUp}
        onRequestClose={() => this.closePopUp()}>
        <TouchableWithoutFeedback onPress={() => this.closePopUp()}>
          <View style={[styles.popUpBackground]}>
            <View style={[styles.popUpContent]}>
              <Text style={styles.pointExpModalTitle}>You have receive</Text>
              <View style={{marginBottom: 10}}>
                <View style={styles.popUpInput1}>
                  <Text>Points</Text>
                  <Text style={styles.pointExpModalPointText}>
                    +{total_points}
                  </Text>
                </View>
                <View style={styles.popUpInput2}>
                  <Text>XP Experience</Text>
                  <Text style={styles.pointExpModalExpText}>+{total_exp}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.closePopUp()}
                style={styles.popUpInput3}>
                <Text style={styles.orderButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  render() {
    const {orders} = this.props;
    // console.log('orders ', orders);
    return (
      <View style={styles.pickUpMainView}>
        {this.state.loading ? (
          <Brew9Loading />
        ) : orders.length > 0 ? (
          this.renderQueueView(orders)
        ) : (
          this.renderEmpty()
        )}
        {this.renderPointExpModal()}
        <HudLoading isLoading={this.state.refreshing} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  updateOrder: {
    backgroundColor: 'red',
    position: 'absolute',
    width: '100%',
    top: 0,
    right: 0,
    height: 40 * alpha,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 14 * alpha,
    borderTopLeftRadius: 14 * alpha,
  },
  updateOrderText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: TITLE_FONT,
    fontSize: 14 * alpha,
  },
  orderPaidStatus: {
    position: 'absolute',
    width: '50%',
    top: 0,
    left: 0,
    height: 40 * alpha,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 14 * alpha,
  },
  orderPaidStatusText: {
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    textAlign: 'center',
    fontSize: 14 * alpha,
  },
  popUpBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  popUpContent: {
    backgroundColor: 'white',
    minHeight: windowHeight / 5,
    // aspectRatio: 1,
    maxHeight: windowHeight / 2,
    paddingVertical: 20 * alpha,
    marginHorizontal: 50 * alpha,
    paddingHorizontal: 20 * alpha,
    justifyContent: 'space-between',
    borderRadius: 5 * alpha,
  },
  popUpInput1: {
    backgroundColor: '#fff5ee',
    paddingHorizontal: 10 * alpha,
    paddingVertical: 10 * alpha,
    borderRadius: 5 * alpha,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    flexDirection: 'row',
  },
  popUpInput2: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10 * alpha,
    paddingVertical: 10 * alpha,
    borderRadius: 5 * alpha,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    flexDirection: 'row',
  },
  popUpInput3: {
    backgroundColor: 'rgb(0, 178, 227)',
    paddingHorizontal: 10 * alpha,
    paddingVertical: 10 * alpha,
    borderRadius: 5 * alpha,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    marginTop: 5,
  },
  pickUpMainView: {
    backgroundColor: DEFAULT_GREY_BACKGROUND,
    flex: 1,
  },
  orderView: {
    backgroundColor: 'rgb(239, 239, 239)',
    width: '100%',
    height: '100%',
  },
  noOrderView: {
    backgroundColor: 'white',
    borderRadius: 13 * alpha,
    flex: 1,
    marginLeft: 24 * alpha,
    marginRight: 24 * alpha,
    marginTop: 70 * alpha,
    marginBottom: 70 * alpha,
    alignItems: 'center',
  },
  viewView: {
    backgroundColor: 'transparent',
    flex: 1,
    width: 185 * alpha,
  },
  centerView: {
    backgroundColor: 'transparent',
    width: 181 * alpha,
    height: 140 * alpha,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10 * alpha,
  },
  logoImage: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    width: 90 * alpha,
    height: 90 * alpha,
  },
  messageView: {
    backgroundColor: 'transparent',
    width: windowWidth - 40 * alpha,
    height: 35 * alpha,
    marginTop: 16 * alpha,
    alignItems: 'center',
  },
  youHavenTMakeAnyText: {
    color: 'rgb(134, 134, 134)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  grabYoursNowText: {
    backgroundColor: 'transparent',
    color: 'rgb(134, 134, 134)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 7 * alpha,
  },
  orderButton: {
    backgroundColor: 'rgb(0, 178, 227)',
    borderRadius: 5 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 185 * alpha,
    height: 33 * alpha,
    marginBottom: 23 * alpha,
  },
  orderButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha,
  },
  orderButtonText: {
    color: 'rgb(254, 254, 254)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  orderHistoryButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 113 * alpha,
    height: 16 * alpha,
  },
  orderHistoryButtonText: {
    color: 'rgb(176, 176, 176)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  orderHistoryButtonImage: {
    tintColor: 'rgb(176, 176, 176)',
    width: 10 * alpha,
    resizeMode: 'contain',
    marginLeft: 5 * alpha,
  },
  loadingIndicator: {
    marginTop: 100 * alpha,
  },

  pickUpQueueView: {
    // backgroundColor: 'rgb(239, 239, 239)',
    // backgroundColor: DEFAULT_GREY_BACKGROUND,
    flex: 1,
  },
  customerServiceButton: {
    backgroundColor: 'rgb(251, 251, 251)',
    borderRadius: 14.5 * alpha,
    shadowColor: 'rgba(240, 240, 240, 0.5)',
    shadowRadius: 1,
    shadowOpacity: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 96 * alpha,
    height: 29 * alpha,
  },
  customerServiceButtonText: {
    color: 'rgb(51, 51, 51)',
    fontFamily: TITLE_FONT,
    fontSize: 10 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  customerServiceButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha,
  },
  saySomethingButton: {
    backgroundColor: 'rgb(251, 251, 251)',
    borderRadius: 14.5,
    shadowColor: 'rgba(240, 240, 240, 0.5)',
    shadowRadius: 1,
    shadowOpacity: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 96 * alpha,
    height: 29 * alpha,
    marginLeft: 1 * alpha,
  },
  saySomethingButtonText: {
    color: 'rgb(51, 51, 51)',
    fontFamily: TITLE_FONT,
    fontSize: 10 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  saySomethingButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha,
  },
  queueView: {
    backgroundColor: 'white',
    borderTopRightRadius: 14 * alpha,
    borderTopLeftRadius: 14 * alpha,
    flex: 1,
    marginLeft: 20 * alpha,
    marginRight: 20 * alpha,
    // marginTop: 40 * alpha,
    // alignItems: "center",
  },

  queuenumberText: {
    backgroundColor: 'transparent',
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 35 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 5 * alpha,
  },
  queueheaderText: {
    color: 'rgb(50, 50, 50)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  pickupTimeText: {
    backgroundColor: 'transparent',
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 35 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 5 * alpha,
    alignSelf: 'center',
  },
  pickupTimeAMPMText: {
    backgroundColor: 'transparent',
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  delivery_day: {
    backgroundColor: 'transparent',
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    alignSelf: 'center',
  },
  pickupTimeheaderText: {
    color: 'rgb(50, 50, 50)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  progressView: {
    backgroundColor: 'transparent',
    width: 300 * alpha,
    height: 53 * alpha,
    marginTop: 20 * alpha,
    marginBottom: 5 * alpha,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  orderedView: {
    backgroundColor: 'transparent',
    width: 80 * alpha,
    height: 50 * alpha,
    alignItems: 'center',
    flexDirection: 'column',
  },
  orderedImage: {
    tintColor: 'rgb(205, 207, 208)',
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    height: 26 * alpha,
    backgroundColor: 'transparent',
  },
  orderedSelectedImage: {
    tintColor: 'rgb(35, 31, 32)',
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    height: 26 * alpha,
    backgroundColor: 'transparent',
  },
  orderedText: {
    color: 'rgb(205, 207, 208)',
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  orderedSelectedText: {
    color: 'rgb(35, 31, 32)',
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  dividerImage: {
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    height: 4 * alpha,
    marginTop: 15 * alpha,
    marginLeft: -10 * alpha,
    marginRight: -10 * alpha,
  },
  pickUpView: {
    backgroundColor: 'transparent',
    width: 80 * alpha,
    height: 50 * alpha,
    alignItems: 'center',
    flexDirection: 'column',
  },
  refreshView: {
    // backgroundColor: LIGHT_BLUE,
    width: 25 * alpha,
    height: 25 * alpha,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0 * alpha,
    bottom: 63 * alpha,
    // borderWidth: 1,
    // borderColor: PRIMARY_COLOR,
    // borderRadius: 5
    // flex: 0.2
    // flexDirection: "column".
  },
  pickupImage: {
    tintColor: 'rgb(205, 207, 208)',
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    height: 25 * alpha,
  },
  refreshImage: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    height: 20 * alpha,
  },
  pickupSelectedImage: {
    tintColor: 'rgb(35, 31, 32)',
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    height: 25 * alpha,
  },
  pickUpText: {
    color: 'rgb(205, 207, 208)',
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  pickUpSelectedText: {
    color: 'rgb(35, 31, 32)',
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  processingView: {
    backgroundColor: 'transparent',
    width: 80 * alpha,
    height: 50 * alpha,
    alignItems: 'center',
    flexDirection: 'column',
  },
  processingImage: {
    tintColor: 'rgb(205, 207, 208)',
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    height: 26 * alpha,
  },
  processingSelectedImage: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    height: 26 * alpha,
  },
  processingText: {
    color: 'rgb(205, 207, 208)',
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  processingSelectedText: {
    color: 'rgb(35, 31, 32)',
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  dividerTwoImage: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    width: 22 * alpha,
    height: 4 * alpha,
  },
  waitingView: {
    backgroundColor: 'rgb(241, 241, 241)',
    borderRadius: 15 * alpha,
    width: 137 * alpha,
    height: 30 * alpha,
    marginTop: 9 * alpha,
    justifyContent: 'center',
    alignItems: 'center',
  },
  queuelengthText: {
    color: 'rgb(136, 136, 136)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: 'rgb(136, 136, 136)',
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginBottom: 20 * alpha,
    marginBottom: 20 * alpha,
  },
  orderDetailView: {
    backgroundColor: 'rgb(245,245,245)',
    flex: 1,
    marginLeft: 20 * alpha,
    marginRight: 20 * alpha,
    marginBottom: 10 * alpha,
  },
  branchDirectionView: {
    backgroundColor: 'transparent',
    left: 0 * alpha,
    right: 2 * alpha,
    top: 0 * alpha,
    height: 90 * alpha,
  },
  topFillImage: {
    resizeMode: 'cover',
    position: 'absolute',
    width: windowWidth - 40 * alpha,
    left: 0 * alpha,
    right: 0 * alpha,
    top: 0 * alpha,
    height: 90 * alpha,
  },
  branchAddressView: {
    backgroundColor: 'transparent',
    width: 200 * alpha,
  },
  shopNameText: {
    color: 'rgb(63, 63, 63)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'left',
    backgroundColor: 'transparent',
    marginRight: 35 * alpha,
  },
  addressText: {
    color: 'rgb(164, 164, 164)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    flex: 1,
  },
  phoneText: {
    color: 'rgb(164, 164, 164)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    left: 1 * alpha,
    bottom: 0 * alpha,
  },
  callButtonText: {
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  callButton: {
    backgroundColor: 'transparent',
    borderRadius: 18 * alpha,
    borderWidth: 1 * alpha,
    borderColor: 'rgb(149, 149, 149)',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 36 * alpha,
    height: 36 * alpha,
    marginRight: 15 * alpha,
  },
  callButtonImage: {
    resizeMode: 'contain',
  },
  directionButton: {
    backgroundColor: 'transparent',
    borderRadius: 18 * alpha,
    borderWidth: 1 * alpha,
    borderColor: 'rgb(149, 149, 149)',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 36 * alpha,
    height: 36 * alpha,
  },
  directionButtonText: {
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  directionButtonImage: {
    resizeMode: 'contain',
  },
  lineView: {
    backgroundColor: 'rgb(231, 231, 231)',
    height: 2 * alpha,
    width: windowWidth - 80 * alpha,
    marginTop: 10 * alpha,
    alignSelf: 'center',
  },
  lineTwoView: {
    backgroundColor: 'rgb(231, 231, 231)',
    width: windowWidth - 80 * alpha,
    height: 2 * alpha,
    alignSelf: 'center',
  },
  totalViewWrapper: {
    backgroundColor: 'rgb(245,245,245)',
    flex: 1,
  },
  orderTotalView: {
    backgroundColor: 'transparent',
    height: 21 * alpha,
    marginLeft: 25 * alpha,
    marginRight: 25 * alpha,
    marginTop: 10 * alpha,
    marginBottom: 10 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
  },
  totallabelText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
  },
  orderTotalText: {
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'right',
    backgroundColor: 'transparent',
  },
  drinksViewWrapper: {
    backgroundColor: 'rgb(245,245,245)',
    flex: 1,
  },
  drinksView: {
    backgroundColor: 'transparent',
    flex: 1,
    marginLeft: 25 * alpha,
    marginRight: 25 * alpha,
    marginTop: 10 * alpha,
  },

  dottedLineImageTwo: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    position: 'absolute',
    bottom: 0,
    width: 280 * alpha,
    height: 2 * alpha,
  },
  totalView: {
    backgroundColor: 'transparent',
    height: 21 * alpha,
    marginLeft: 25 * alpha,
    marginRight: 24 * alpha,
    marginTop: 26 * alpha,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  totalText: {
    backgroundColor: 'transparent',
    color: 'rgb(63, 63, 63)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'center',
  },
  remarkViewWrapper: {
    backgroundColor: 'rgb(245,245,245)',
    flex: 1,
    borderBottomRightRadius: 14 * alpha,
    borderBottomLeftRadius: 14 * alpha,
  },
  remarkView: {
    backgroundColor: 'transparent',
    flex: 1,
    // height: 70 * alpha,
    paddingBottom: 10 * alpha,
  },
  bottomFillImage: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    position: 'absolute',
    alignSelf: 'center',
    width: 334 * alpha,
    top: 0 * alpha,
    height: 116 * alpha,
  },

  pleaseCallBranchFText: {
    color: 'rgb(164, 164, 164)',
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginLeft: 3 * alpha,
    marginTop: 21 * alpha,
  },
  orderTime100717Text: {
    color: 'rgb(164, 164, 164)',
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    // textAlign: "center",
    backgroundColor: 'transparent',
    marginTop: 2 * alpha,
  },
  copyButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha,
  },
  copyButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 27 * alpha,
    height: 16 * alpha,
  },
  copyButtonText: {
    color: 'rgb(164, 164, 164)',
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  orderNo020028201Text: {
    backgroundColor: 'transparent',
    color: 'rgb(164, 164, 164)',
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    // textAlign: "center",
    // marginLeft: 3 * alpha,
    marginTop: 1 * alpha,
  },
  remarkNoPackingText: {
    backgroundColor: 'transparent',
    color: 'rgb(164, 164, 164)',
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    // textAlign: "center",
    // marginLeft: 3 * alpha,
    // marginTop: 5 * alpha,
  },

  voucherView: {
    backgroundColor: 'transparent',
    height: 18 * alpha,
    marginLeft: 26 * alpha,
    marginRight: 25 * alpha,
    marginBottom: 10 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameFourText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'left',
  },
  descriptionThreeText: {
    color: 'rgb(54, 54, 54)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    backgroundColor: 'transparent',
  },

  productDetailView: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'flex-start',
  },
  productNameText: {
    backgroundColor: 'transparent',
    color: 'rgb(63, 63, 63)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
    marginBottom: 5 * alpha,
  },
  productVariantText: {
    color: 'rgb(164, 164, 164)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    width: 191 * alpha,
    marginBottom: 10 * alpha,
  },
  productQuantityText: {
    color: 'rgb(50, 50, 50)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    backgroundColor: 'transparent',
    // marginRight: 4 * alpha,
    // width: 25 * alpha,
  },
  productPriceText: {
    color: 'rgb(50, 50, 50)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'right',
    backgroundColor: 'transparent',
    // width: 45 * alpha,
  },
  spacer: {
    marginBottom: 10 * alpha,
  },
  dottedLineImage: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    width: 291 * alpha,
    height: 2 * alpha,
  },

  locationWrapperView: {
    backgroundColor: 'rgb(245, 245, 245)',
    flex: 1,
  },
  locationView: {
    backgroundColor: 'transparent',
    height: 64 * alpha,
    marginLeft: 25 * alpha,
    marginRight: 25 * alpha,
    marginTop: 18 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchView: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    width: 182 * alpha,
    height: 60 * alpha,
  },
  shopBranchText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
    marginRight: 12 * alpha,
  },
  shopBranchAddressText: {
    color: 'rgb(146, 146, 146)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginLeft: 1 * alpha,
  },
  callView: {
    backgroundColor: 'transparent',
    width: 35 * alpha,
    height: 55 * alpha,
    marginRight: 8 * alpha,
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
    height: 35 * alpha,
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
    textAlign: 'center',
    marginLeft: 6 * alpha,
    marginRight: 7 * alpha,
  },
  directionView: {
    backgroundColor: 'transparent',
    width: 50 * alpha,
    height: 55 * alpha,
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
    marginRight: 7 * alpha,
  },
  directionIconButtonImage: {
    resizeMode: 'contain',
  },
  directionText: {
    color: 'rgb(163, 163, 163)',
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  receiptSectionSeperator: {
    flex: 1,
    backgroundColor: 'rgb(239, 239, 239)',
    alignContent: 'center',
    justifyContent: 'center',
  },

  curveSeparator: {
    tintColor: 'rgb(245, 245, 245)',
    height: 14 * alpha,
    resizeMode: 'stretch',
    width: '100%',
    backgroundColor: 'transparent',
  },

  sectionSeperatorView: {
    backgroundColor: 'rgb(234, 234, 234)',
    position: 'absolute',
    alignSelf: 'center',
    width: 300 * alpha,
    height: 1 * alpha,
  },

  queueHeaderBlock: {
    backgroundColor: 'transparent',
    marginLeft: 10 * alpha,
    marginRight: 10 * alpha,
  },
  progressbarView: {
    backgroundColor: 'transparent',
    flex: 1,
    width: 250 * alpha,
    height: 10 * alpha,
    marginBottom: 20 * alpha,
  },

  pointExpModalTitle: {
    paddingBottom: 5,
    textAlign: 'center',
    fontFamily: TITLE_FONT,
  },
  pointExpModalPointText: {
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
  },
  pointExpModalExpText: {
    // color: '#deb887',
    // fontFamily: NON_TITLE_FONT,
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
  },
});
