import React from 'react';
import Constants from 'expo-constants';
import {
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
  ActivityIndicator,
  Platform,
  Linking,
  AppState,
  Keyboard,
  BackHandler
} from 'react-native';
import Brew9Modal from '../Components/Brew9Modal';
import Modal from 'react-native-modal';
import PushRequestObject from '../Requests/push_request_object';
import { connect } from 'react-redux';
import { createAction } from '../Utils/index';
import ProductCell from './ProductCell';
import CategoryCell from './CategoryCell';
import CartCell from './CartCell';
import { alpha, fontAlpha, windowHeight, windowWidth } from '../Common/size';
import ProductRequestObject from '../Requests/product_request_object';
import NearestShopRequestObject from '../Requests/nearest_shop_request_object';
import SwitchSelector from 'react-native-switch-selector';
import Toast from 'react-native-easy-toast';
import _ from 'lodash';
import AutoHeightImage from 'react-native-auto-height-image';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import CategoryHeaderCell from './CategoryHeaderCell';
import {
  TITLE_FONT,
  NON_TITLE_FONT,
  TABBAR_INACTIVE_TINT,
  TABBAR_ACTIVE_TINT,
  PRIMARY_COLOR,
  RED,
  LIGHT_BLUE_BACKGROUND,
  TOAST_DURATION
} from '../Common/common_style';
import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from '../Common/config';
import { getPreciseDistance } from 'geolib';
import { AsyncStorage } from 'react-native';
import Banners from './Banners';
import OneSignal from 'react-native-onesignal';
import ImageCell from './ImageCell';
import AnimationLoading from '../Components/AnimationLoading';
@connect(({ members, shops, config, orders }) => ({
  currentMember: members.profile,
  company_id: members.company_id,
  location: members.location,
  shop: shops.selectedShop,
  isToggleShopLocation: config.isToggleShopLocation,
  cart_total_quantity: orders.cart_total_quantity,
  promotion_trigger_count: orders.promotion_trigger_count,
  cart: orders.cart,
  promotions: orders.promotions,
  cart_total: orders.cart_total,
  toggle_update_count: orders.toggle_update_count,
  discount_cart_total: orders.discount_cart_total,
  clearCart: orders.clearCart,
  currentPromoText: orders.currentPromoText
}))
export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTintColor: 'black',
      headerLeft: (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={params.onLogoPressed ? params.onLogoPressed : () => null}
            style={styles.navigationBarItem}
          >
            <Image
              source={require('./../../assets/images/logo.png')}
              style={styles.navigationBarItemIcon}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity
            onPress={
              params.onQrScanPressed ? params.onQrScanPressed : () => null
            }
            style={styles.navigationBarItem}
          >
            <Image
              source={require('./../../assets/images/scan_qr_button.png')}
              style={styles.navigationBarRightItemIcon}
            />
          </TouchableOpacity>
        </View>
      )
    };
  };

  static tabBarItemOptions = (navigation, store) => {
    return {
      tabBarLabel: 'Menu',
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        store.dispatch(createAction('config/setToggleShopLocation')(false));
        store.dispatch(createAction('config/setTab')('home'));
        defaultHandler();
      },
      tabBarIcon: ({ iconTintColor, focused }) => {
        const image = focused
          ? require('./../../assets/images/order_selected_tab.png')
          : require('./../../assets/images/order_tab.png');

        return (
          <Image
            source={image}
            style={{
              resizeMode: 'contain',
              width: 30,
              height: 30 * alpha,
              tintColor: focused ? TABBAR_ACTIVE_TINT : TABBAR_INACTIVE_TINT
            }}
          />
        );
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = this._getState();
    this.renderBottom = false;
    this.moveAnimation = new Animated.ValueXY({ x: 0, y: windowHeight });
    this.toggleCartView = this.toggleCartView.bind(this);
    this.check_promotion_trigger = this.check_promotion_trigger.bind(this);
    this.initializeOneSignal();
  }

  _getState = () => ({
    visible: false,
    isCartToggle: false,
    page: 1,
    data: [],
    product_category: [],
    products: [],
    loading: true,
    isRefreshing: false,
    selected_category: 0,
    menu_banners: [],
    product_view_height: 0 * alpha,
    modalVisible: false,
    selected_index: null,
    select_quantity: 1,
    delivery: 0,
    modalGalleryVisible: true,
    selected_promotion: '',
    isPromoToggle: false,
    ignoreVersion: false,
    appState: AppState.currentState,
    image_isHorizontal: false,
    image_check: false,
    image_isLong: false,
    app_url: '',
    location: null,
    distance: '-',
    member_distance: 1000,
    first_promo_popup: false,
    popUpVisible: false,
    scroll_Index: null,
    refresh_products: true,
    monitorLocation: null
  });

  initializeOneSignal = () => {
    // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS
    OneSignal.init('1e028dc3-e7ee-45a1-a537-a04d698ada1d', {
      kOSSettingsKeyAutoPrompt: true
    });

    OneSignal.addEventListener('received', this._onReceived.bind(this));
    OneSignal.addEventListener('opened', this._onOpened.bind(this));
    OneSignal.addEventListener('ids', this._onIds.bind(this));
  };

  onQrScanPressed = () => {
    const { navigation } = this.props;
    const { currentMember } = this.props;
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(new Event('Home', 'Click', 'ScanQr'));

    if (currentMember != null) {
      navigation.navigate('ScanQr');
    } else {
      this.refs.toast.show(
        'You need to login before you can topup',
        TOAST_DURATION,
        () => {
          navigation.navigate('VerifyUser', {
            returnToRoute: navigation.state,
            check_promotion_trigger: () => this.check_promotion_trigger()
          });
        }
      );
    }
  };

  getLocationAndLoadShops = async () => {
    const { dispatch } = this.props;
    try {
      const response = await Permissions.getAsync(Permissions.LOCATION);
      if (response.status === 'denied') {
        this.loadShops();
        return;
      }
      if (response.status !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        // api will be called when by location if it is not denied
        if (status === 'denied') {
          this.loadShops();
          return;
        }
      }

      const { monitorLocation } = this.state;

      if (monitorLocation == null) {
        this.setState({ monitorLocation: mLocation });

        const mLocation = Location.watchPositionAsync(
          {
            distanceInterval: 1000,
            timeInterval: 10000
          },
          (newLocation) => {
            dispatch(createAction('members/setLocation')(newLocation));
          },
          (error) => console.log(error)
        );
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFocused !== this.props.isFocused) {
      if (prevProps.location !== this.props.location) {
        if (prevProps.location != null) {
          this.loadShops();
        }
        this.computeDistance();
      }
      if (prevProps.currentMember !== this.props.currentMember) {
        console.log('currentMember Changed???');
        this.loadShops();
        this.computeDistance();
      }
      if (prevProps.cart !== this.props.cart) {
        this.check_promotion_trigger();
      }
      if (prevProps.promotions !== this.props.promotions) {
        this.updateCartHeight();
      }
      if (prevProps.toggle_update_count !== this.props.toggle_update_count) {
        setTimeout(
          function () {
            this.toggleCartView(true, true);
          }.bind(this),
          50
        );
      }
    }
  }

  computeDistance() {
    const { location, shop } = this.props;
    if (location != null && shop != null) {
      const prevLatInRad = location.coords.latitude;
      const prevLongInRad = location.coords.longitude;
      const latInRad = shop.latitude;
      const longInRad = shop.longitude;
      var pdis = getPreciseDistance(
        { latitude: prevLatInRad, longitude: prevLongInRad },
        { latitude: latInRad, longitude: longInRad }
      );

      this.setDistanceString(pdis);
    }
  }

  setDistanceString(calculated_distance) {
    var distance_string = '';
    var parseDistance = calculated_distance;
    if (parseDistance > 1000) {
      distance_string = `${parseFloat(parseDistance / 1000).toFixed(1)}km`;
    } else {
      distance_string = `${parseDistance}m`;
    }
    this.setState({
      distance: distance_string,
      member_distance: parseDistance / 1000
    });
  }

  componentWillMount() {
    this.setState({ isPromoToggle: false });
  }

  unmounted = false;

  componentDidMount() {
    this.unmounted = false;
    Keyboard.dismiss();
    this.props.navigation.setParams({
      onQrScanPressed: this.onQrScanPressed
    });
    this.getLocationAndLoadShops();

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.loadShops();
    });

    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.unmounted = true; // test variable

    this.removeNavigationListener();
    this.focusListener.remove();
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    OneSignal.removeEventListener('received', this._onReceived);
    OneSignal.removeEventListener('opened', this._onOpened);
    OneSignal.removeEventListener('ids', this._onIds);
  }

  _onReceived(notification) {
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event('Push Notification', 'Received', notification.payload.body)
    );
  }

  _onOpened(openResult) {
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event(
        'Push Notification',
        'Open',
        openResult.notification.payload.body
      )
    );
  }

  _onIds(device) {
    this.loadStorePushToken(device.userId);
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('active');
      this.setState({ refresh_products: true });
      this.getLocationAndLoadShops();
      console.log('--getlocation439--');
    }
    this.setState({
      appState: nextAppState,
      visible: false
    });
  };

  handleBackPress = () => {
    const { navigation } = this.props;
    if (!navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    } else {
      const activeRoute = navigation.state.routeName == 'Home' ? true : false;
      if (activeRoute) {
        this.setState({ visible: true });
      }
    }
  };

  loadStorePushToken = (token) => {
    const { dispatch, currentMember } = this.props;
    const callback = (eventObject) => {};
    const obj = new PushRequestObject(
      Constants.installationId,
      Constants.deviceName,
      token,
      Platform.OS
    );
    if (currentMember != null) {
      obj.setUrlId(currentMember.id);
      dispatch(
        createAction('members/loadStorePushToken')({
          object: obj,
          callback
        })
      );
    }
  };

  loadShops() {
    if (!this.unmounted) {
      const { dispatch, company_id, location } = this.props;
      const { first_promo_popup } = this.state;

      const callback = (eventObject) => {
        if (eventObject.success) {
          const { menu_banners } = eventObject.result;
          this.setState({ menu_banners }, () => {
            this.check_promotion_trigger();

            const { refresh_products } = this.state;
            if (refresh_products) {
              this.loadStoreProducts();

              console.log('--getlocation496--');
              if (first_promo_popup == false) {
                this.shouldShowFeatured(this.props.shop);
              }
            }
          });
        }
      };

      var latitude = location != null ? location.coords.latitude : null;
      var longitude = location != null ? location.coords.longitude : null;

      /**
       * Notice:
       * Feature to load nearest shop is temporarily disabled. We load shop
       * despite location of the user.
       */
      const obj = new NearestShopRequestObject(latitude, longitude);
      obj.setUrlId(company_id);
      dispatch(
        createAction('shops/loadShops')({
          object: obj,
          callback
        })
      );
    }
  }

  loadStoreProducts() {
    const { dispatch, company_id } = this.props;
    const { menu_banners } = this.state;

    const callback = (eventObject) => {
      if (eventObject.success) {
        if (eventObject.result.force_upgrade) {
          this.refs.toast.show(eventObject.message, TOAST_DURATION, () => {
            Linking.openURL(eventObject.result.url);
          });
        } else {
          this.setState(
            {
              data: eventObject.result,
              total: eventObject.total,
              page: this.state.page + 1,
              refresh_products: false
            },
            function () {
              let data = [...this.state.data];
              var items = [];
              var index_length = menu_banners.length;
              for (var index in data) {
                data[index].selected = index == 0 ? true : false;
                data[index].scroll_index = index_length;
                items = items.concat(data[index]);
                index_length = index_length + 1;
                items = items.concat(data[index].products);
                index_length = index_length + data[index].products.length;
              }
              this.setState(
                {
                  products: menu_banners.concat(items),
                  data: data
                },
                function () {
                  this.check_promotion_trigger();
                }
              );
            }.bind(this)
          );
        }
      }
      this.setState({
        isRefreshing: false,
        loading: false
      });
    };

    const obj = new ProductRequestObject();
    obj.setUrlId(company_id);
    dispatch(
      createAction('products/loadStoreProducts')({
        object: obj,
        callback
      })
    );
  }

  onRefresh() {
    this.setState({
      isRefreshing: true,
      data: [],
      products: [],
      refresh_products: true
    });
    console.log('--loadshops580--');
    this.loadShops();
  }

  onCheckoutPressed = () => {
    const { member_distance, delivery } = this.state;
    const { navigate } = this.props.navigation;
    const {
      navigation,
      dispatch,
      currentMember,
      shop,
      cart,
      promotions
    } = this.props;

    if (currentMember != undefined) {
      const analytics = new Analytics(ANALYTICS_ID);
      analytics.event(new Event('Home', 'Click', 'Checkout'));
      // if (member_distance > shop.max_order_distance_in_km) {
      // 	this.refs.toast.show("You are too far away", TOAST_DURATION)
      // 	return
      // } else {

      this.navigationListener = navigation.addListener(
        'willFocus',
        (payload) => {
          this.removeNavigationListener();
          const { clearCart } = this.props;

          if (clearCart == true) {
            console.log('--loadshops604--');
            this.loadShops();
            navigate('PickUp');
          } else {
          }
        }
      );

      navigate('Checkout', {
        returnToRoute: navigation.state
      });
      // }
    } else {
      this.navigationListener = navigation.addListener(
        'willFocus',
        (payload) => {
          this.removeNavigationListener();
          this.loadShops();
          console.log('--loadshops633--');
        }
      );
      navigate('VerifyUser', {
        returnToRoute: navigation.state,
        check_promotion_trigger: () => this.check_promotion_trigger()
      });
    }
  };

  removeNavigationListener() {
    if (this.navigationListener) {
      this.navigationListener.remove();
      this.navigationListener = null;
    }
  }

  onBannerPressed = (item, index) => {
    const productId = item?.promo_product_id || null;

    if (productId) {
      // Banner linked to a product
      const { products } = this.state;

      products.forEach((item, index) => {
        if (item.id === productId) {
          if (index < products.length) {
            this.flatListRef.scrollToIndex({ animated: true, index });
          }

          this.onCellPress(null, index);
          return;
        }
      });
    } else {
      // Banner just a promo image
      const { banner_detail_image } = item;

      if (banner_detail_image) {
        const selected_promotion = banner_detail_image;
        const isPromoToggle = true;

        this.calculateImageDimension(selected_promotion);
        this.setState({ isPromoToggle, selected_promotion });
      }
    }
  };

  _toggleDelivery = (value) => {
    const { dispatch, shop } = this.props;
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(new Event('Home', 'Click', 'Delivery'));
    let delivery = value == 1 ? true : false;

    if (delivery && shop.delivery_option == false) {
      this.setState({ delivery: 0 }, () => {
        this.refs.toggle.toggleItem(0, false);

        var msg =
          'Our delivery is too busy at the moment.Please try again in 30 mins.';
        if (shop.response_message != undefined) {
          delivery_disabled_response = _.find(
            shop.response_message,
            (obj) => obj.key === 'Delivery Disabled'
          );

          msg = delivery_disabled_response?.text || msg;
        }
        this.refs.toast.show(
          <View style={{ justifyContent: 'center' }}>
            <Text
              style={{
                color: 'white',
                fontFamily: NON_TITLE_FONT,
                textAlign: 'center'
              }}
            >
              {msg}
            </Text>
          </View>,

          TOAST_DURATION
        );
      });
      return;
    }
    dispatch(createAction('members/setDeliveryOption')(delivery));
  };

  onSelectCategory = (scroll_index, selected_index) => {
    let data = [...this.state.data];
    this.setState({
      data,
      selected_category: selected_index,
      scroll_Index: scroll_index
    });
    if (scroll_index < this.state.products.length) {
      this.flatListRef.scrollToIndex({ animated: true, index: scroll_index });
    }
  };

  reachProductIndex = (viewableItems, changed) => {
    let viewable = viewableItems.viewableItems;
    let data = [...this.state.data];
    if (viewable.length > 0 && viewable[0].hasOwnProperty('index')) {
      var first_index = viewable[0].index;
      var last_index = viewable[viewable.length - 1].index;
      for (var index in data) {
        data[index].selected = false;
      }

      for (var index in data) {
        var next_index = parseInt(index) + 1;
        var second_index = parseInt(first_index) + 1;
        if (first_index < data[index].scroll_index && index == 0) {
          data[index].selected = true;
          break;
        } else if (data[parseInt(next_index)]) {
          if (
            second_index >= data[index].scroll_index &&
            second_index < data[parseInt(next_index)].scroll_index
          ) {
            if (this.state.scroll_Index != null) {
              if (this.state.scroll_Index == data[index].scroll_index) {
                data[index].selected = true;
                break;
              }
            } else {
              data[index].selected = true;
              break;
            }
          }
        } else {
          data[data.length - 1].selected = true;
          break;
        }
      }
      this.setState({ data });
    }
  };

  onMorePressed = () => {
    const { isToggleShopLocation, dispatch } = this.props;
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(new Event('Home', 'Click', 'Location'));
    if (isToggleShopLocation) {
      dispatch(createAction('config/setToggleShopLocation')(false));
    } else {
      dispatch(createAction('config/setToggleShopLocation')(true));
    }
  };

  getCartHeight() {
    const { cart, promotions } = this.props;
    const { product_view_height } = this.state;
    var headerHeight = 31 * alpha;
    // var height = (cart.length * 71) * alpha + (promotions.length * 71) * alpha
    var height = cart.length * 71 * alpha;

    var height_cap = windowHeight * 0.4;
    var content = height + headerHeight;

    var finalheight = product_view_height - content;

    if (finalheight < height_cap) {
      finalheight = height_cap;
    }

    return finalheight;
  }

  toggleCartView = (isUpdate, toggleOn) => {
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(new Event('Home', 'Click', 'View Cart'));

    if (isUpdate) {
      // if (cart.length > 0) {
      // 	this.setState({ isCartToggle: true }, function () {
      // 		Animated.spring(this.moveAnimation, {
      // 			toValue: { x: 0, y: this.getCartHeight() },
      // 		}).start()
      // 	})
      // }else{
      // 	this.setState({ isCartToggle: false }, function () {
      // 		Animated.spring(this.moveAnimation, {
      // 			toValue: { x: 0, y: windowHeight },
      // 		}).start()
      // 	})
      // }
    } else {
      if (!toggleOn) {
        this.setState({ isCartToggle: false }, function () {
          Animated.spring(this.moveAnimation, {
            toValue: { x: 0, y: windowHeight }
          }).start();
        });
      } else {
        this.setState({ isCartToggle: true }, function () {
          Animated.spring(this.moveAnimation, {
            toValue: { x: 0, y: this.getCartHeight() }
          }).start();
        });
      }
    }
  };

  measureView(event) {
    if (this.state.product_view_height == 0) {
      this.setState({
        product_view_height: event.nativeEvent.layout.height
      });
    }
  }

  renderPopOutCartFlatListCell = ({ item, index }) => {
    if (item.clazz == 'product') {
      return (
        <CartCell
          navigation={this.props.navigation}
          id={item.id}
          name={item.name}
          index={index}
          item={item}
          quantity={item.quantity}
          variations={item.selected_variants}
          // currency={this.props.members.currency}
          onChangeQuantity={this.onChangeQuantityPress}
          price={item.price}
        />
      );
      // } else if (item.clazz == "promotion") {
      // 	return <CartPromoCell
      // 		navigation={this.props.navigation}
      // 		name={item.name}
      // 		price={item.price}
      // 		type={item.type}
      // 	/>
    }
  };

  renderCategorylistFlatListCell = ({ item, index }) => {
    return (
      <CategoryCell
        navigation={this.props.navigation}
        categoryname={item.name}
        categoryImage={item.image.url}
        categoryDescription={item.description}
        index={index}
        scrollIndex={item.scroll_index}
        onSelectCategory={this.onSelectCategory}
        selected={item.selected}
        label={item.label}
      />
    );
  };

  renderProductlistFlatListCell = ({ item, index }) => {
    if (item) {
      if (item.clazz == 'product') {
        return (
          <ProductCell
            navigation={this.props.navigation}
            currency={'$'}
            index={index}
            item={item}
            productname={item.name}
            productprice={item.price}
            productDiscountTitle={item.discount_title}
            productDiscountPrice={item.discounted_price}
            productimage={item.middle}
            productquantity={item.quantity}
            productsummary={item.summary}
            productvariant={item.variants}
            productenable={item.enabled}
            productstatus={item.status}
            productHidden={item.hidden}
            productTagLabel={item.discount_tag_label}
            productTagColor={item.discount_tag_color}
            productTagText={item.discount_tag_text_color}
            recommended={item.recommended}
            daily_limit={item.product_settings[0].daily_limit}
            productingredient={item.ingredients}
            producttotalquantity={item.total_quantity}
            onChangeQuantity={this.onChangeQuantityPress}
            onCellPress={this.onCellPress}
          />
        );
      } else if (item.clazz == 'menu_banner') {
        return (
          <Banners
            banner={item.banner_images}
            onBannerPressed={this.onBannerPressed}
          />
        );

        // <BannerCell
        // 	index={index}
        // 	item={item}
        // 	navigation={this.props.navigation}
        // 	bannerImage={item.image}
        // 	bannerDescription={item.description}
        // 	detailImage={item.banner_detail_image}
        // 	onPressItem={this.onBannerPressed}
        // />
      } else if (item.clazz == 'product_category') {
        return (
          <CategoryHeaderCell
            index={index}
            item={item}
            navigation={this.props.navigation}
            categoryName={item.name}
            categoryDescription={item.description}
          />
        );
      }
    }
  };

  onCellPress = (item, index) => {
    if (this.state.isCartToggle) {
      this.toggleCartView(false, true);
    }
    this.setState({ modalVisible: true, selected_index: index });
  };

  onChangeQuantityPress = (item, index, operation, isCart) => {
    const { cart_total, dispatch } = this.props;

    let cart = [...this.props.cart];

    if (isCart) {
      var product_index = this.state.products.findIndex(
        (element) => element.id == item.id && element.clazz == 'product'
      );
      var item = this.state.products[product_index];

      var selected_cart = cart[index];

      var cartItem = {
        clazz: item.clazz,
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image,
        price: selected_cart.price,
        selected_variants: selected_cart.selected_variants,
        quantity: selected_cart.quantity
      };

      if (operation === 'add') {
        if (cartItem.quantity) {
          item.quantity = item.quantity + 1;
          cartItem.quantity = cartItem.quantity + 1;
          item.total_quantity = item.total_quantity + 1;
        } else {
          item.quantity = 1;
          cartItem.quantity = 1;
        }

        this.state.products[product_index] = item;

        if (index >= 0) {
          cart[index] = cartItem;
          dispatch(
            createAction('orders/updateCart')({
              cart
            })
          );
        } else {
          dispatch(
            createAction('orders/updateCart')({
              cart: this.props.cart.concat(cartItem)
            })
          );
        }
      } else {
        if (cartItem.quantity > 1) {
          if (item.quantity > 0) item.quantity = item.quantity - 1;
          cartItem.quantity = cartItem.quantity - 1;
          item.total_quantity = item.total_quantity - 1;
        } else {
          item.quantity = null;
          cartItem.quantity = null;
          item.total_quantity = 0;
        }

        this.state.products[product_index] = item;

        if (index >= 0) {
          cart[index] = cartItem;
          // this.state.cart.splice(cart_index, 1, cartItem)
        }
        if (cartItem.quantity === null) {
          cart.splice(index, 1);
        }

        dispatch(
          createAction('orders/updateCart')({
            cart
          })
        );
      }
    } else {
      var item = this.state.products[index];

      var cartItem = {
        clazz: item.clazz,
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      };

      var cart_index = cart.findIndex((element) => element.id == item.id);

      if (operation === 'add') {
        if (item.quantity) {
          item.quantity = item.quantity + 1;
          cartItem.quantity = cartItem.quantity + 1;
        } else {
          item.quantity = 1;
          cartItem.quantity = 1;
        }

        this.state.products[index] = item;

        if (cart_index >= 0) {
          cart[cart_index] = cartItem;
          dispatch(
            createAction('orders/updateCart')({
              cart
            })
          );
        } else {
          dispatch(
            createAction('orders/updateCart')({
              cart: this.props.cart.concat(cartItem)
            })
          );
        }
      } else {
        if (item.quantity > 1) {
          item.quantity = item.quantity - 1;
          cartItem.quantity = cartItem.quantity - 1;
        } else {
          item.quantity = null;
          cartItem.quantity = null;
        }

        this.state.products[index] = item;

        if (cart_index >= 0) {
          cart[cart_index] = cartItem;
          // this.state.cart.splice(cart_index, 1, cartItem)
        }
        if (item.quantity === null) {
          cart.splice(cart_index, 1);
        }
        var calculated_total = (
          parseFloat(cart_total) - parseFloat(item.price)
        ).toFixed(2);
        dispatch(
          createAction('orders/updateCart')({
            cart
          })
        );
      }

      this.forceUpdate();
    }
  };

  roundOff(value) {
    console.log('before value: ');
    console.log(value);
    roundOffValue = 0;
    let n = parseInt((value * 100).toFixed(10)),
      x = n % 10;
    let result = n + 10 - x;
    if (x < 6) result -= 10 / (parseInt(x / 3) + 1);
    roundOffValue = (result / 100).toFixed(2);
    console.log('\n\nValue');
    console.log(roundOffValue);

    return roundOffValue;
  }

  check_promotion_trigger = () => {
    const {
      currentMember,
      dispatch,
      promotions,
      cart_total,
      shop
    } = this.props;

    let newcart = [...this.props.cart];
    let finalCart = [];

    var promotions_item = [];
    var final_cart_value = cart_total;
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
                  var discount_value = promotion.value ? promotion.value : 0;
                  price = (cart_total * discount_value) / 100;
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
                  final_cart_value = cart_total - price;
                } else if (
                  promotion.value_type != null &&
                  promotion.value_type == 'fixed'
                ) {
                  var discount_value = promotion.value ? promotion.value : 0;
                  price = promotion.value;
                  final_cart_value = cart_total - discount_value;
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

  updateCartHeight() {
    if (this.state.isCartToggle) {
      Animated.spring(this.moveAnimation, {
        toValue: { x: 0, y: this.getCartHeight() }
      }).start();
    }
  }

  onAddToCartPressed = (product) => {
    let cart = [...this.props.cart];
    const { dispatch } = this.props;
    const clone_variants = _.cloneDeep(product.selected_variants);
    const search_cart_index = cart.findIndex(
      (element) =>
        element.id == product.id &&
        _.isEqual(product.selected_variants, element.selected_variants)
    );

    var search_cart = cart[search_cart_index];

    let cartItem = {
      clazz: product.clazz,
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.calculated_price,
      quantity: this.state.select_quantity,
      selected_variants: clone_variants
    };

    product.total_quantity =
      parseInt(product.total_quantity) + parseInt(this.state.select_quantity);

    if (search_cart) {
      search_cart.quantity =
        parseInt(search_cart.quantity) + parseInt(this.state.select_quantity);
      this.setState({ select_quantity: 1 });
      dispatch(
        createAction('orders/updateCart')({
          cart: cart
        })
      );
    } else {
      dispatch(
        createAction('orders/updateCart')({
          cart: cart.concat(cartItem)
        })
      );
      this.setState({
        products: this.state.products,
        select_quantity: 1
      });
    }

    this.setState({
      modalVisible: false
    });
  };

  onClosePressed = () => {
    this.setState({
      modalVisible: false,
      isPromoToggle: false,
      image_check: false,
      select_quantity: 1
    });
  };

  onClearPress = () => {
    const { dispatch, cart } = this.props;

    if (cart.length > 0) {
      dispatch(createAction('orders/resetCart')());
      this.toggleCartView(false, false);
    }

    for (var index in this.state.products) {
      this.state.products[index].quantity = null;
      this.state.products[index].total_quantity = 0;
    }
  };

  calculateImageDimension(selected_promotion) {
    const { image_check } = this.state;
    let image_width = 0;
    let image_height = 0;
    var image_long = false;

    if (!image_check) {
      Image.getSize(selected_promotion, (width, height) => {
        (image_width = width), (image_height = height);

        var ratio = windowWidth / image_width;
        var calculated_height = image_height * ratio;

        if (calculated_height > windowHeight) {
          image_long = true;
        }
        if (image_width > image_height) {
          this.setState({
            image_isHorizontal: true,
            image_check: true,
            image_isLong: image_long
          });
        } else {
          this.setState({
            image_isHorizontal: false,
            image_check: true,
            image_isLong: image_long
          });
        }
      });
    }
  }

  onFeaturedPromotionPressed(item) {
    const { currentMember } = this.props;
    if (item.image.url != undefined && item.image.url != '') {
      // let should_show = this.shouldShowFeatured(this.props.shop)
      // if (should_show == true) {
      this.setState(
        {
          selected_promotion: item.image.url,
          first_promo_popup: true
        },
        function () {
          this.setState({
            isPromoToggle: true
          });
          this.calculateImageDimension(item.image.url);
        }
      );
      // }
    }
  }

  get_product(index) {
    if (index) {
      let product = this.state.products[index];
      if (product) {
        product.discounted_price > 0
          ? (product.current_price = product.discounted_price)
          : (product.current_price = product.price);
        if (product.quantity == null) product.quantity = 1;
        if (product.calculated_price == null)
          product.calculated_price = product.current_price;
        if (product.selected_quantity == null) product.selected_quantity = 1;
        if (product.total_quantity == null) product.total_quantity = 0;
        if (product.variants) {
          if (product.selected_variants == null) {
            var selected = [];
            for (var index in product.variants) {
              var variant = product.variants[index];
              var hasRecommended = false;
              var value = null;
              for (var index in variant.variant_values) {
                if (hasRecommended == false) {
                  value = variant.variant_values[index];
                  hasRecommended = variant.variant_values[index].recommended;
                }
              }
              if (hasRecommended == false) {
                value = variant.variant_values[0];
              }
              product.calculated_price = (
                parseFloat(product.calculated_price) +
                parseFloat(value.price ? value.price : 0.0)
              ).toFixed(2);
              selected.push(value);
            }
            product.selected_variants = selected;
          }
        }
        return product;
      }
    }
    return null;
  }

  onVariantPressed = (
    selected_product,
    selected_variants,
    key,
    selected_value,
    required
  ) => {
    let selected_item = selected_value;
    if (!required && selected_variants[key] === selected_value) {
      selected_item = null;
    }
    selected_variants[key] = selected_item;
    let filtered = selected_variants.filter(function (el) {
      return el;
    });

    let total = filtered.reduce((a, b) => +a + +b.price, 0);
    total = parseFloat(total);

    let { discounted_price, price } = selected_product;
    discounted_price = parseFloat(discounted_price);
    price = parseFloat(price);

    let _price =
      discounted_price && discounted_price != 0 ? discounted_price : price;
    selected_product.calculated_price = _price + total;

    this.setState({
      products: this.state.products
    });
  };

  dismissProduct() {
    this.setState({ modalVisible: false });
  }
  getVariantPrice = (price) => {
    let sen = (price + '').split('.');
    if (sen[1] == 0) {
      return parseInt(price);
    } else {
      return parseFloat(price).toFixed(2);
    }
  };

  renderModalContent = (selected_product, shop) => {
    let select_quantity = this.state.select_quantity;

    let filtered = selected_product.selected_variants.filter((el) => el);
    let variant_array = filtered.map((a) => a.value);

    let order_limit = 100;

    if (selected_product.product_settings[0].order_limit) {
      order_limit = selected_product.product_settings[0].order_limit;
    }

    var enabled = selected_product.enabled;

    if (!shop.can_order) {
      enabled = false;
    }

    const ingredients = selected_product.ingredients.map((item, key) => {
      return (
        <View
          style={
            item.highlight
              ? styles.ingredientHighlightView
              : styles.ingredientView
          }
          key={key}
        >
          <Text
            style={
              item.highlight
                ? styles.ingredientHighlightText
                : styles.ingredientText
            }
          >
            {item.name}
          </Text>
        </View>
      );
    });

    const variants = selected_product.variants.map((item, key) => {
      let selected_variants = selected_product.selected_variants;
      let required_variant = item.required;

      return (
        <View style={styles.optionsTwoView} key={key}>
          <Text style={styles.optiontitleTwoText}>{item.display_name}</Text>
          <View style={styles.optionchoiceView}>
            {item.variant_values.map((value, value_key) => {
              var selected = selected_variants.includes(value);
              var price = this.getVariantPrice(value.price);
              return (
                <TouchableOpacity
                  key={value_key}
                  onPress={() =>
                    this.onVariantPressed(
                      selected_product,
                      selected_variants,
                      key,
                      value,
                      required_variant
                    )
                  }
                  style={
                    selected ? styles.selectedButton : styles.unselectedButton
                  }
                >
                  {value.recommended && (
                    <Image
                      source={require('./../../assets/images/star.png')}
                      style={styles.recommendedStarImage}
                    />
                  )}
                  <Text
                    style={
                      selected
                        ? styles.selectedButtonText
                        : styles.unselectedButtonText
                    }
                  >
                    {value.value}{' '}
                    <Text style={{ color: selected ? 'white' : PRIMARY_COLOR }}>
                      {value.price > 0 && `$${price}`}
                    </Text>
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    });

    return (
      <View style={styles.popOutView}>
        <View style={styles.topbuttonView}>
          {/* <TouchableOpacity
						onPress={this.onFavouritePressed}
						style={styles.favouriteButton}>
						<Image
							source={require("./../../assets/images/group-9-11.png")}
							style={styles.favouriteButtonImage}/>
					</TouchableOpacity> */}
          <TouchableOpacity
            onPress={this.onClosePressed}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <ImageCell image={selected_product.image} />

        <View pointerEvents="box-none">
          <ScrollView style={styles.contentScrollView}>
            <View style={styles.productView}>
              <Text style={styles.nameText}>{selected_product.name}</Text>
              <View
                style={{
                  flex: 1
                }}
              />
              {selected_product.ingredients && (
                <View
                  pointerEvents="box-none"
                  style={{
                    alignSelf: 'flex-start',
                    flex: 1,
                    marginLeft: 1 * alpha,
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                  }}
                >
                  {ingredients}
                </View>
              )}

              {selected_product.description != null &&
                selected_product.description != '' && (
                  <Text style={styles.descriptionText}>
                    {selected_product.description}
                  </Text>
                )}
            </View>
            {variants}
          </ScrollView>
          {selected_product.calculated_price > 0.0 &&
          selected_product.calculated_price ? (
            <View style={styles.bottomView}>
              <View style={styles.lineView} />
              <View style={styles.summaryView}>
                <View
                  pointerEvents="box-none"
                  style={{
                    // height: 32 * alpha,
                    flexDirection: 'row'
                    // alignItems: "center",
                  }}
                >
                  <Text style={styles.priceText}>
                    $
                    {selected_product.calculated_price
                      ? parseFloat(selected_product.calculated_price).toFixed(2)
                      : 0.0}
                  </Text>
                  <View
                    style={{
                      flex: 1
                    }}
                  />
                  <View style={styles.controlView}>
                    <View
                      pointerEvents="box-none"
                      style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        top: 0 * alpha,
                        bottom: 0 * alpha,
                        justifyContent: 'center'
                      }}
                    >
                      <Text style={styles.quantityText}>{select_quantity}</Text>
                    </View>
                    <View
                      pointerEvents="box-none"
                      style={{
                        position: 'absolute',
                        left: 0 * alpha,
                        right: 0 * alpha,
                        top: 0 * alpha,
                        height: 23 * alpha,
                        flexDirection: 'row',
                        alignItems: 'flex-start'
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          if (select_quantity > 1 && enabled == true)
                            this.setState({
                              select_quantity: (select_quantity -= 1)
                            });
                        }}
                        style={styles.removeButton}
                      >
                        <Image
                          source={require('./../../assets/images/button-4.png')}
                          style={styles.removeButtonImage}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          flex: 1
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          if (select_quantity < order_limit && enabled == true)
                            this.setState({
                              select_quantity: (select_quantity += 1)
                            });
                        }}
                        style={styles.addButton}
                      >
                        <Image
                          source={require('./../../assets/images/add-18.png')}
                          style={styles.addButtonImage}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1
                  }}
                />
                <Text style={styles.optionsText}>
                  {variant_array.join(', ')}
                </Text>
              </View>
              <TouchableOpacity
                disabled={!enabled}
                onPress={() => this.onAddToCartPressed(selected_product)}
                style={
                  enabled
                    ? [styles.addToCartButton, styles.normal]
                    : [styles.addToCartButton, styles.disabled]
                }
              >
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ height: 10 * alpha }}></View>
          )}
        </View>
      </View>
    );
  };

  render() {
    let selected_product = this.get_product(this.state.selected_index);
    let { delivery, distance } = this.state;
    let { isToggleShopLocation, cart, promotions, shop } = this.props;
    let categoryBottomSpacer = undefined;
    let renderBottom = this.renderBottom;
    // let should_show = this.shouldShowFeatured(shop)
    let fullList = [...cart, ...promotions];
    if (shop !== null) {
      if (shop.can_order == false) {
        if (shop.featured_promotion !== null) {
          categoryBottomSpacer = styles.categoryListPosition3;
        } else {
          categoryBottomSpacer = styles.categoryListPosition4;
        }
      } else {
        if (shop.featured_promotion !== null && cart.length > 0) {
          //Have Feature Have Cart
          categoryBottomSpacer = styles.categoryListPosition3;
        } else if (shop.featured_promotion !== null && cart.length == 0) {
          //Have Feature No Cart
          categoryBottomSpacer = styles.categoryListPosition2;
        } else if (shop.featured_promotion == null && cart.length > 0) {
          //No Feature Have Cart

          categoryBottomSpacer = styles.categoryListPosition2;
        } else {
          //All no
          categoryBottomSpacer = styles.categoryListPosition1;
        }
      }
    } else {
      categoryBottomSpacer = styles.categoryListPosition1;
    }

    return (
      <View style={styles.page1View}>
        <View style={styles.topsectionView}>
          <View
            pointerEvents="box-none"
            style={{
              height: 31 * alpha,
              marginLeft: 10 * alpha,
              marginRight: 10 * alpha,
              marginTop: 8 * alpha,
              flexDirection: 'row'
            }}
          >
            <View style={styles.branchView}>
              {/* <TouchableOpacity
							onPress={this.onBranchPressed}
							style={styles.branchButton}> */}
              <Text style={styles.branchButtonText}>
                {shop ? shop.name : ''}
              </Text>
              {/* <Image
							source={require("./../../assets/images/group-22.png")}
							style={styles.branchButtonImage}/> */}
              {/* </TouchableOpacity> */}
            </View>

            <View
              style={{
                flex: 1
              }}
            />
            <View style={styles.pickUpDeliveryView}>
              {shop && (
                <SwitchSelector
                  ref="toggle"
                  options={[
                    { label: 'Pick Up', value: 0 },
                    { label: 'Delivery', value: 1 }
                  ]}
                  initial={this.state.delivery}
                  value={this.state.delivery}
                  textColor={'#4E4D4D'}
                  selectedColor={'#FFFFFF'}
                  buttonColor={'#2A2929'}
                  borderColor={'#979797'}
                  backgroundColor={'rgb(240,240,240)'}
                  style={styles.pickUpDeliveryViewTemp}
                  textStyle={styles.optionText}
                  fontSize={10 * alpha}
                  height={32 * alpha}
                  onPress={(value) => this._toggleDelivery(value)}
                />
              )}
            </View>
          </View>
          <View
            pointerEvents="box-none"
            style={{
              height: 14 * alpha,
              marginLeft: 10 * alpha,
              marginRight: 19 * alpha,
              marginTop: 7 * alpha,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
              // backgroundColor: 'red'
            }}
          >
            <Text style={styles.distance1kmText}>Distance {distance}</Text>
            <View
              style={{
                // height: 14 * alpha,
                // marginLeft: 10 * alpha,
                // marginRight: 19 * alpha,
                // marginTop: 7 * alpha,
                flexDirection: 'row'
                // alignItems: "flex-start",
              }}
            >
              {/* <Text
							style={styles.distance1kmText}>Distance {distance}</Text> */}
              {/* <View
							style={{
								flex: 1,
							}} /> */}
              <View style={styles.moreView}>
                <TouchableOpacity
                  onPress={this.onMorePressed}
                  style={styles.moreButton}
                >
                  <Text style={styles.distance1kmText}>
                    {isToggleShopLocation ? 'Hide' : 'Location'}
                  </Text>
                </TouchableOpacity>
                {isToggleShopLocation ? (
                  <Image
                    source={require('./../../assets/images/bitmap-15.png')}
                    style={styles.bitmapImage}
                  />
                ) : (
                  <Image
                    source={require('./../../assets/images/bitmap-14.png')}
                    style={styles.bitmapImage}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
        {this.renderPromotionTopBar()}
        {this.state.loading ? (
          <AnimationLoading />
        ) : (
          <View
            style={styles.productsectionView}
            onLayout={(event) => this.measureView(event)}
          >
            <View style={[styles.categorylistFlatListViewWrapper]}>
              <FlatList
                renderItem={this.renderCategorylistFlatListCell}
                data={this.state.data}
                style={styles.categorylistFlatList}
                keyExtractor={(item, index) => index.toString()}
              />

              <View style={categoryBottomSpacer} />
              {this.renderFeaturedPromo(shop, cart)}
            </View>
            <View
              style={{
                flex: 1
              }}
            />
            <View
              style={
                !renderBottom
                  ? styles.productlistFlatListViewWrapper
                  : styles.productlistFlatListViewWrapperwithALert
              }
            >
              {this.state.loading ? undefined : (
                <FlatList
                  renderItem={this.renderProductlistFlatListCell}
                  data={this.state.products}
                  initialNumToRender={6}
                  onScrollToIndexFailed={(error) => {
                    this.flatListRef.scrollToOffset({
                      offset: error.averageItemLength * error.index,
                      animated: true
                    });
                    setTimeout(() => {
                      if (
                        this.state.products.length !== 0 &&
                        this.flatListRef !== null
                      ) {
                        this.flatListRef.scrollToIndex({
                          index: error.index,
                          animated: true
                        });
                      }
                    }, 5);
                  }}
                  ref={(ref) => {
                    this.flatListRef = ref;
                  }}
                  style={styles.productlistFlatList}
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh.bind(this)}
                  onViewableItemsChanged={this.reachProductIndex}
                  onScrollBeginDrag={() => {
                    this.setState({ scroll_Index: null });
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
            </View>
          </View>
        )}
        {this.props.isToggleShopLocation && (
          <View style={styles.showLocationView}>
            <MapView
              style={styles.mapImage}
              initialRegion={{
                latitude: shop ? parseFloat(shop.latitude) : 0.0,
                longitude: shop ? parseFloat(shop.longitude) : 0.0,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
              }}
              onMapReady={() =>
                this.marker &&
                this.marker.showCallout &&
                this.marker.showCallout()
              }
            >
              <MapView.Marker
                ref={(marker) => (this.marker = marker)}
                coordinate={{
                  latitude: shop ? parseFloat(shop.latitude) : 0.0,
                  longitude: shop ? parseFloat(shop.longitude) : 0.0
                }}
                title="Brew9"
                description={shop.location}
              />
            </MapView>
            {/* <View
						style={styles.branchInfoView}> */}
            {/* <Text
							style={styles.branchInfoText}>Outlet Info</Text> */}
            {/* { (shop != null && shop.image != null) && ( */}

            {/* <Image
							source={{ uri: shop.image.thumb.url }}
							style={styles.shopImage} /> */}
            {/* ) } */}
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 10 * alpha,
                paddingBottom: 80 * alpha
              }}
            >
              <Text style={styles.branchHeaderAddress}>Address </Text>
              <Text style={styles.branchAddress}>
                {shop ? shop.address : ''}
              </Text>
              <Text style={styles.branchHeaderContact}>Contact </Text>
              <Text style={styles.branchContact}>
                {shop ? shop.phone_no : ''}
              </Text>
              <Text style={styles.businessHeaderHourText}>Business Hours</Text>
              <Text style={styles.businessHourText}>
                {shop ? shop.opening_closing_text : ''}
              </Text>
            </ScrollView>
          </View>
          // </View>
        )}

        <Animated.View
          style={[styles.cartsummaryviewView, this.moveAnimation.getLayout()]}
        >
          <View style={styles.clearAllView}>
            <TouchableOpacity
              onPress={this.onClearPress}
              style={styles.clearButton}
            >
              <Image
                source={require('./../../assets/images/group-14-13.png')}
                style={styles.clearButtonImage}
              />
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.popOutCartFlatListViewWrapper}>
            <FlatList
              renderItem={this.renderPopOutCartFlatListCell}
              data={fullList}
              style={styles.popOutCartFlatList}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Animated.View>

        <View style={styles.bottomAlertView}>
          {this.renderAlertBar(cart, shop)}
          {this.renderBottomBar(cart, shop)}
        </View>
        {selected_product ? (
          <Modal
            isVisible={this.state.modalVisible}
            onBackdropPress={() => this.dismissProduct()}
            hideModalContentWhileAnimating={true}
          >
            {this.renderModalContent(selected_product, shop)}
          </Modal>
        ) : null}

        {this.renderGallery()}
        <Toast
          ref="toast"
          style={{ bottom: windowHeight / 2 - 40 }}
          textStyle={{
            color: 'white',
            fontFamily: NON_TITLE_FONT,
            textAlign: 'center'
          }}
        />
        <Brew9Modal
          visible={this.state.visible}
          cancelable={true}
          title={'Exit App '}
          description={'exit the  application?'}
          okayButtonAction={() => {
            BackHandler.exitApp();
          }}
          cancelButtonAction={() => this.setState({ visible: false })}
        />

        <Brew9Modal
          visible={this.state.popUpVisible}
          cancelable={false}
          title={this.state.title}
          description={this.state.description}
          okayButtonAction={() => {
            if (this.state.url != null && this.state.url != '') {
              Linking.openURL(this.state.url);
            } else {
              this.setState({ popUpVisible: false });
            }
          }}
        />
      </View>
    );
  }

  renderAlertBar(cart, shop) {
    const style = cart.length > 0 ? styles.alertViewCart : styles.alertView;
    if (shop !== null) {
      if (shop.is_opened === false) {
        this.renderBottom = true;
        return (
          <View style={style}>
            <Text style={styles.alertViewText}>{shop.alert_message}</Text>
          </View>
        );
      }

      if (shop.can_order == false && shop.alert_message != null) {
        const template = shop.alert_message;
        this.renderBottom = true;
        return (
          <View style={style}>
            <Text style={styles.alertViewText}>{template}</Text>
          </View>
        );
      }
    }

    return undefined;
  }

  shouldShowFeatured(shop) {
    const { currentMember } = this.props;
    //jira
    // this.onFeaturedPromotionPressed(shop.featured_promotion);
    if (shop) {
      AsyncStorage.getItem('featured', (err, result) => {
        if (shop.featured_promotion != null) {
          if (result == null || result != shop.featured_promotion.id) {
            if (currentMember != null) {
              if (
                shop.featured_promotion != null &&
                shop.featured_promotion.for_new_user == true &&
                currentMember.first_time_buyer == true
              ) {
                AsyncStorage.setItem(
                  'featured',
                  JSON.stringify(shop.featured_promotion.id)
                );
                this.onFeaturedPromotionPressed(shop.featured_promotion);
              } else if (
                shop.featured_promotion != null &&
                shop.featured_promotion.for_new_user == false
              ) {
                AsyncStorage.setItem(
                  'featured',
                  JSON.stringify(shop.featured_promotion.id)
                );
                this.onFeaturedPromotionPressed(shop.featured_promotion);
              }
            } else {
              AsyncStorage.setItem(
                'featured',
                JSON.stringify(shop.featured_promotion.id)
              );
              this.onFeaturedPromotionPressed(shop.featured_promotion);
            }
          }
        }
      });
    }
  }

  renderFeaturedPromo(shop, cart) {
    let style = undefined;
    if (shop !== null) {
      if (shop.can_order == false) {
        if (cart.length > 0) {
          style = styles.featuredpromoButtonPosition3;
        } else {
          style = styles.featuredpromoButtonPosition2;
        }
      } else {
        if (cart.length > 0) {
          style = styles.featuredpromoButtonPosition2;
        } else {
          style = styles.featuredpromoButtonPosition1;
        }
      }
    } else {
      if (cart.length > 0) {
        style = styles.featuredpromoButtonPosition2;
      } else {
        style = styles.featuredpromoButtonPosition1;
      }
    }

    if (shop && shop.featured_promotion && shop.featured_promotion.icon) {
      return (
        <TouchableOpacity
          onPress={() =>
            this.onFeaturedPromotionPressed(shop.featured_promotion)
          }
          style={[style, styles.featuredpromoButton]}
        >
          <Image
            source={{ uri: shop.featured_promotion.icon.url }}
            style={styles.featuredpromoButtonImage}
          />
        </TouchableOpacity>
      );
      // }
    }

    return undefined;
  }

  renderPromotionTopBar() {
    const { currentPromoText } = this.props;

    if (currentPromoText.length > 0) {
      return (
        <View style={styles.promotionTopBarView}>
          <View style={styles.promotionBarView}>
            <Text numberOfLines={2} style={styles.promotionTopBarText}>
              {currentPromoText}
            </Text>
          </View>
        </View>
      );
    }
    return undefined;
  }

  renderBottomBar(cart, shop) {
    const { cart_total_quantity, cart_total } = this.props;
    if (cart.length > 0) {
      return (
        <View style={styles.cartView}>
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 0 * alpha,
              top: 0 * alpha,
              bottom: 0 * alpha,
              justifyContent: 'center'
            }}
          >
            <View style={styles.totalAmountView}>
              <View style={styles.rectangleView} />
              <View
                pointerEvents="box-none"
                style={{
                  position: 'absolute',
                  left: 28 * alpha,
                  right: 13 * alpha,
                  top: 9 * alpha,
                  height: 45 * alpha,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <View style={styles.shopppingCartView}>
                  <TouchableOpacity
                    onPress={() =>
                      this.toggleCartView(false, !this.state.isCartToggle)
                    }
                    style={styles.shopppingCartButton}
                  >
                    <View style={styles.group5View}>
                      <View
                        pointerEvents="box-none"
                        style={{
                          width: 15 * alpha,
                          marginTop: 1 * alpha,
                          marginBottom: 4 * alpha
                        }}
                      >
                        <Image
                          source={require('./../../assets/images/shopping-bag.png')}
                          style={styles.cartImage}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1
                        }}
                      />
                      <Text style={styles.shoppingCartText}>Cart</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {/* <View
								style={{
									flex: 1,
								}} /> */}
                <Text style={styles.totalpriceText}>
                  ${parseFloat(cart_total).toFixed(2)}
                </Text>
              </View>
              <View style={styles.badgeView}>
                <Text style={styles.numberofitemText}>
                  {cart_total_quantity}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.checkoutButtonView}>
            <TouchableOpacity
              onPress={() => this.onCheckoutPressed()}
              style={styles.checkoutButton}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return undefined;
  }

  renderGallery() {
    const {
      image_isHorizontal,
      isPromoToggle,
      image_isLong,
      selected_promotion
    } = this.state;
    if (selected_promotion && isPromoToggle) {
      return (
        <Modal
          visible={isPromoToggle}
          style={{ margin: 0, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        >
          {/* <ImageViewer backgroundColor={""} imageUrls={images}/> */}
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="white" />
          </View>
          <ScrollView style={{ horizontal: true, flex: 1 }}>
            <View
              style={
                image_isHorizontal
                  ? styles.bannerContainImage
                  : !image_isHorizontal && !image_isLong
                  ? styles.bannerShortImage
                  : styles.bannerImage
              }
            >
              <AutoHeightImage
                source={{ uri: selected_promotion }}
                width={windowWidth}
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => this.onClosePressed()}
            style={styles.closeGalleryButton}
          >
            <Text style={styles.closeGalleryButtonText}>X</Text>
          </TouchableOpacity>
        </Modal>
      );
    }
  }
}

const styles = StyleSheet.create({
  navigationBarItem: {},
  loadingIndicator: {
    marginTop: 100 * alpha
  },
  loading: {
    position: 'absolute',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navigationBarItemIcon: {
    tintColor: 'rgb(0, 194, 236)'
  },
  navigationBarRightItemIcon: {
    resizeMode: 'contain',
    tintColor: TABBAR_INACTIVE_TINT
  },
  shopImage: {
    resizeMode: 'cover',
    width: windowWidth,
    aspectRatio: 2 / 1,
    marginRight: 50
    // height: 45 * alpha,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    marginLeft: 8 * alpha
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 8 * alpha
  },
  page1View: {
    backgroundColor: 'rgb(243, 243, 243)',
    flex: 1
  },
  topsectionView: {
    backgroundColor: 'white',
    shadowColor: 'rgba(198, 192, 192, 0.5)',
    shadowRadius: 5 * alpha,
    shadowOpacity: 1 * alpha,
    left: 0 * alpha,
    right: 0 * alpha,
    height: 67 * alpha
  },
  branchView: {
    backgroundColor: 'transparent',
    width: 200 * alpha,
    height: 19 * alpha,
    marginTop: 6 * alpha,
    flexDirection: 'row',
    alignItems: 'center'
  },
  branchButtonImage: {
    resizeMode: 'contain',
    marginLeft: 10 * alpha
  },
  branchButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 190 * alpha,
    height: 19 * alpha,
    marginTop: 6 * alpha
  },
  branchButtonText: {
    color: 'rgb(99, 97, 97)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  pickUpDeliveryView: {
    borderRadius: 16 * alpha,
    width: 96 * alpha,
    height: 32 * alpha
  },

  pickUpDeliveryViewTemp: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 16 * alpha,
    width: 96 * alpha,
    height: 32 * alpha
  },

  pickUpView: {
    backgroundColor: 'rgba(42, 41, 41, 0.89)',
    borderRadius: 14.5 * alpha,
    width: 49 * alpha,
    height: 29 * alpha,
    justifyContent: 'center'
  },
  optionText: {
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha
  },
  pickUpText: {
    color: 'rgb(253, 253, 253)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginLeft: 7 * alpha,
    marginRight: 7 * alpha
  },
  deliveryText: {
    color: 'rgb(78, 77, 77)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent'
  },
  distance1kmText: {
    backgroundColor: 'transparent',
    color: 'rgb(188, 181, 181)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal'
    // textAlign: "left",
  },
  moreView: {
    backgroundColor: 'transparent',
    width: 65 * alpha,
    height: 12 * alpha,
    marginTop: 1 * alpha,
    flexDirection: 'row',
    alignItems: 'center'
  },
  moreButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 0,
    flex: 1,
    height: 12 * alpha,
    marginRight: 2 * alpha
  },
  moreButtonText: {
    color: 'rgb(162, 162, 162)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  moreButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },

  productsectionView: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row'
  },
  categorylistFlatList: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%'
  },

  categorylistFlatListViewWrapper: {
    width: 85 * alpha
  },
  categoryListPosition1: {
    height: 0 * alpha
  },
  categoryListPosition2: {
    height: 60 * alpha
  },
  categoryListPosition3: {
    height: 100 * alpha
  },
  categoryListPosition4: {
    height: 30 * alpha
  },
  productlistFlatList: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%'
  },
  productlistFlatListViewWrapper: {
    width: 290 * alpha,
    marginBottom: 1 * alpha
  },
  productlistFlatListViewWrapperwithALert: {
    width: 290 * alpha,
    marginBottom: 25 * alpha
  },
  cartView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0 * alpha,
    right: 0 * alpha,
    bottom: 0 * alpha,
    height: 60 * alpha
  },
  bannerImage: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  bannerShortImage: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: windowHeight
  },
  bannerContainImage: {
    backgroundColor: 'transparent',
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  totalAmountView: {
    backgroundColor: 'transparent',
    width: 280 * alpha,
    height: 70 * alpha
  },
  rectangleView: {
    backgroundColor: 'rgb(231, 230, 230)',
    position: 'absolute',
    left: 0 * alpha,
    right: 0 * alpha,
    top: 20 * alpha,
    height: 46 * alpha
  },
  shopppingCartView: {
    backgroundColor: 'white',
    borderRadius: 20 * alpha,
    width: 90 * alpha,
    // aspectRatio: 1 / 2,
    height: 40 * alpha,
    justifyContent: 'center'
  },
  shopppingCartButton: {
    backgroundColor: 'transparent',
    borderRadius: 20 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    width: 90 * alpha,
    height: 40 * alpha
  },
  group5View: {
    backgroundColor: 'transparent',
    height: 26 * alpha,
    marginLeft: 12 * alpha,
    marginRight: 12 * alpha,
    flexDirection: 'row'
  },

  line8View: {
    backgroundColor: 'rgb(85, 85, 85)',
    width: 9 * alpha,
    height: 1 * alpha
  },
  shoppingCartText: {
    color: 'rgb(57, 57, 57)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    textAlign: 'center',
    marginLeft: 10 * alpha,
    backgroundColor: 'transparent',
    alignSelf: 'center'
  },
  cartImage: {
    resizeMode: 'contain',
    width: 20 * alpha,
    height: 20 * alpha
  },
  totalpriceText: {
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 18 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginTop: 24 * alpha
    // fontWeight:'bold'
  },
  badgeView: {
    backgroundColor: 'rgb(0, 178, 227)',
    borderRadius: 10 * alpha,
    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'solid',
    position: 'absolute',
    left: 100 * alpha,
    top: 5 * alpha,
    height: 20 * alpha,
    aspectRatio: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberofitemText: {
    color: 'rgb(255, 251, 251)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  checkoutButtonView: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    right: 0 * alpha,
    width: 95 * alpha,
    top: 15 * alpha,
    height: 46 * alpha
  },
  checkoutButton: {
    backgroundColor: 'rgb(0, 178, 227)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    right: 0 * alpha,
    width: 95 * alpha,
    top: 0 * alpha,
    height: 46 * alpha
  },
  checkoutButtonText: {
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left'
  },
  checkoutButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  cartsummaryviewView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0 * alpha,
    right: 0 * alpha,
    bottom: 25 * alpha,
    flex: 1
  },
  clearAllView: {
    backgroundColor: 'rgb(245, 245, 245)',
    height: 31 * alpha,
    marginLeft: 1 * alpha,
    marginRight: 1 * alpha,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  clearButtonText: {
    color: 'rgb(144, 141, 141)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  clearButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 55 * alpha,
    height: 18 * alpha,
    marginLeft: 15 * alpha
  },
  clearButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  popOutCartFlatList: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 33 * alpha,
    flex: 1
  },
  popOutCartFlatListViewWrapper: {
    backgroundColor: 'white',
    flex: 1
  },
  popOutView: {
    backgroundColor: 'white',
    borderRadius: 11 * alpha,
    position: 'absolute',
    width: '100%',
    flex: 1
  },
  topbuttonView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: 67 * alpha,
    height: 28 * alpha,
    top: 14 * alpha,
    right: 14 * alpha,
    alignItems: 'flex-end',
    zIndex: 999
  },
  favouriteButtonImage: {
    resizeMode: 'contain'
  },
  favouriteButtonText: {
    color: 'black',
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  favouriteButton: {
    backgroundColor: 'rgb(191, 191, 191)',
    borderRadius: 14 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 28 * alpha,
    height: 28 * alpha,
    marginRight: 11 * alpha
  },
  closeButton: {
    backgroundColor: 'rgb(191, 191, 191)',
    borderRadius: 12.5 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 25 * alpha,
    height: 25 * alpha
  },
  closeButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  closeButtonText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 18 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  closeGalleryButton: {
    backgroundColor: 'black',
    borderRadius: 20 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    width: 40 * alpha,
    height: 40 * alpha,
    top: 30 * alpha,
    right: 10 * alpha
  },
  closeGalleryButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  closeGalleryButtonText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 18 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  contentScrollView: {
    backgroundColor: 'transparent',
    flex: 1,
    marginTop: 5 * alpha,
    maxHeight: 250 * alpha
  },
  productView: {
    backgroundColor: 'transparent',
    width: '100%',
    flex: 1,
    marginLeft: 19 * alpha,
    marginTop: 20 * alpha
  },
  nameText: {
    color: 'rgb(54, 54, 54)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 17 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginRight: 28 * alpha
  },
  descriptionHeaderText: {
    color: 'rgb(167, 167, 167)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginRight: 28 * alpha,
    marginTop: 10 * alpha
  },
  descriptionText: {
    color: 'rgb(130, 130, 130)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'justify',
    backgroundColor: 'transparent',
    marginRight: 28 * alpha,
    marginTop: 5 * alpha,
    marginBottom: 5 * alpha,
    lineHeight: 17 * alpha
  },
  ingredientView: {
    backgroundColor: 'rgb(245, 245, 245)',
    justifyContent: 'center',
    marginRight: 5 * alpha,
    marginTop: 3 * alpha
  },
  ingredientText: {
    backgroundColor: 'transparent',
    color: 'rgb(130, 130, 130)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginRight: 4 * alpha,
    marginLeft: 4 * alpha,
    marginTop: 4 * alpha,
    marginBottom: 4 * alpha
  },
  ingredientHighlightView: {
    backgroundColor: LIGHT_BLUE_BACKGROUND,
    justifyContent: 'center',
    marginRight: 5 * alpha,
    marginTop: 3 * alpha
  },
  ingredientHighlightText: {
    backgroundColor: 'transparent',
    color: PRIMARY_COLOR,
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginRight: 4 * alpha,
    marginLeft: 4 * alpha,
    marginTop: 4 * alpha,
    marginBottom: 4 * alpha
  },

  milkText: {
    color: 'rgb(167, 167, 167)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 9 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginLeft: 6 * alpha,
    marginRight: 5 * alpha
  },
  optionsTwoView: {
    backgroundColor: 'transparent',
    marginTop: 5 * alpha,
    marginBottom: 5 * alpha,
    alignItems: 'flex-start',
    borderRadius: 7.0,
    overflow: 'hidden'
  },
  optiontitleTwoText: {
    color: 'rgb(141, 141, 141)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginLeft: 20 * alpha
  },
  optionchoiceView: {
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    marginLeft: 20 * alpha,
    marginRight: 20 * alpha,
    marginTop: 2 * alpha,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  unselectedButton: {
    backgroundColor: 'rgb(238, 238, 238)',
    borderRadius: 2 * alpha,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    marginBottom: 4 * alpha,
    marginRight: 4 * alpha
  },
  recommendedStarImage: {
    resizeMode: 'contain',
    marginLeft: 4 * alpha,
    marginRight: -4 * alpha
  },
  unselectedButtonText: {
    color: 'rgb(82, 80, 80)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    marginRight: 4 * alpha,
    marginLeft: 4 * alpha,
    marginTop: 4 * alpha,
    marginBottom: 4 * alpha
  },
  selectedButton: {
    backgroundColor: 'rgb(0, 178, 227)',
    borderRadius: 2 * alpha,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    marginBottom: 4 * alpha,
    marginRight: 4 * alpha
  },
  selectedButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  selectedButtonText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    marginRight: 4 * alpha,
    marginLeft: 4 * alpha,
    marginTop: 4 * alpha,
    marginBottom: 4 * alpha
  },
  optionsView: {
    backgroundColor: 'transparent',
    width: 270 * alpha,
    height: 87 * alpha,
    marginLeft: 20 * alpha,
    marginTop: 10 * alpha,
    alignItems: 'flex-start'
  },
  optiontitleText: {
    color: 'rgb(141, 141, 141)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent'
  },
  recommendedButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  recommendedButton: {
    backgroundColor: 'rgb(0, 178, 227)',
    borderRadius: 2 * alpha,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 85 * alpha,
    height: 28 * alpha
  },
  recommendedButtonText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 9 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center'
  },
  unavailableButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  unavailableButtonText: {
    color: 'rgb(201, 201, 201)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 9 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center'
  },
  unavailableButton: {
    backgroundColor: 'rgba(238, 238, 238, 0.62)',
    borderRadius: 2 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 67 * alpha,
    height: 28 * alpha,
    marginLeft: 12 * alpha
  },
  choiceThreeButton: {
    backgroundColor: 'rgb(238, 238, 238)',
    borderRadius: 2 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 94 * alpha,
    height: 28 * alpha
  },
  choiceThreeButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  choiceThreeButtonText: {
    color: 'rgb(82, 80, 80)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 9 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center'
  },
  choiceTwoButton: {
    backgroundColor: 'rgb(238, 238, 238)',
    borderRadius: 2 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    marginRight: 10 * alpha,
    marginLeft: 10 * alpha,
    height: 27 * alpha
  },
  choiceTwoButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  choiceTwoButtonText: {
    color: 'rgb(82, 80, 80)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 9 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center'
  },
  choiceButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  choiceButton: {
    backgroundColor: 'rgb(238, 238, 238)',
    borderRadius: 2 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 66 * alpha,
    height: 27 * alpha,
    marginLeft: 13 * alpha
  },
  choiceButtonText: {
    color: 'rgb(82, 80, 80)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 9 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center'
  },
  bottomView: {
    backgroundColor: 'transparent',
    // height: 113 * alpha,
    justifyContent: 'flex-end'
  },
  lineView: {
    backgroundColor: 'rgb(151, 151, 151)',
    opacity: 0.29,
    height: 1 * alpha,
    marginBottom: 12 * alpha
  },
  summaryView: {
    backgroundColor: 'transparent',
    // height: 37 * alpha,
    marginLeft: 20 * alpha,
    marginRight: 20 * alpha,
    marginBottom: 12 * alpha
  },
  priceText: {
    backgroundColor: 'transparent',
    color: 'rgb(0, 178, 227)',
    fontFamily: TITLE_FONT,
    fontSize: 21 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  controlView: {
    backgroundColor: 'transparent',
    width: 74 * alpha,
    height: 23 * alpha
  },
  quantityText: {
    backgroundColor: 'transparent',
    color: 'rgb(85, 83, 81)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 21 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  removeButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 23 * alpha,
    height: 23 * alpha
  },
  removeButtonImage: {
    resizeMode: 'contain'
  },
  removeButtonText: {
    color: 'black',
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  addButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    alignSelf: 'center',
    width: 23 * alpha,
    height: 23 * alpha
  },
  addButtonText: {
    color: 'black',
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  addButtonImage: {
    resizeMode: 'contain'
  },
  optionsText: {
    backgroundColor: 'transparent',
    color: 'rgb(141, 141, 141)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 1 * alpha,
    marginTop: 1 * alpha
  },
  normal: {
    backgroundColor: 'rgb(0, 178, 227)'
  },
  disabled: {
    backgroundColor: 'rgba(0, 178, 227, 0.3)'
  },
  addToCartButton: {
    borderRadius: 4 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    height: 36 * alpha,
    marginLeft: 20 * alpha,
    marginRight: 20 * alpha,
    marginBottom: 15 * alpha
  },
  addToCartButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  addToCartButtonText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  productimageImage: {
    resizeMode: 'cover',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    width: 150 * alpha,
    height: 150 * alpha
  },
  imageblockView: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 21 * alpha,
    height: 150 * alpha,
    alignItems: 'center'
  },
  bottomAlertView: {
    position: 'absolute',
    left: 0 * alpha,
    right: 0 * alpha,
    bottom: 0 * alpha,
    flex: 1,
    width: windowWidth
  },
  alertViewCart: {
    backgroundColor: 'darkgray',
    marginBottom: 35 * alpha,
    paddingBottom: 10 * alpha
    // position: "absolute",
    // left: 0 * alpha,
    // right: 0 * alpha,
    // bottom: 60 * alpha,
  },
  alertView: {
    backgroundColor: 'darkgray'
  },
  alertViewTitle: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    paddingTop: 10 * alpha,
    paddingBottom: 5 * alpha,
    alignSelf: 'center'
  },
  alertViewText: {
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    paddingTop: 7 * alpha,
    paddingLeft: 7 * alpha,
    paddingRight: 7 * alpha,
    paddingBottom: 7 * alpha,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10 * alpha
  },
  showLocationView: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    position: 'absolute',
    marginTop: 67 * alpha,
    alignItems: 'flex-start'
    // flex: 1,
    // marginHorizontal:10
  },
  deliveryView: {
    backgroundColor: 'transparent',
    width: 322 * alpha,
    height: 105 * alpha,
    marginLeft: 14 * alpha,
    marginTop: 7 * alpha
  },
  deliveryTwoText: {
    backgroundColor: 'transparent',
    color: 'rgb(55, 55, 55)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  freeWithRm40SpendText: {
    backgroundColor: 'transparent',
    color: 'rgb(160, 160, 160)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginTop: 9 * alpha
  },
  deliveredByBrew9Text: {
    backgroundColor: 'transparent',
    color: 'rgb(160, 160, 160)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginTop: 19 * alpha
  },
  deliverAreaAffectText: {
    backgroundColor: 'transparent',
    color: 'rgb(160, 160, 160)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    alignSelf: 'stretch'
  },
  deliveryRm5ExtraText: {
    backgroundColor: 'transparent',
    color: 'rgb(160, 160, 160)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  branchInfoView: {
    backgroundColor: 'transparent',
    // flex: 1,
    // width: windowWidth - 100 * alpha,
    // height: 76 * alpha,
    // marginHorizontal: 10 * alpha,
    // marginTop: 15 * alpha,
    alignItems: 'flex-start'
  },
  branchInfoText: {
    backgroundColor: 'transparent',
    color: 'rgb(55, 55, 55)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: 10 * alpha
  },
  branchHeaderAddress: {
    backgroundColor: 'transparent',
    color: 'rgb(160, 160, 160)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginTop: 9 * alpha
  },
  branchAddress: {
    backgroundColor: 'transparent',
    color: 'rgb(160, 160, 160)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginTop: 3 * alpha
  },
  branchHeaderContact: {
    backgroundColor: 'transparent',
    color: 'rgb(160, 160, 160)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginTop: 9 * alpha
  },
  branchContact: {
    backgroundColor: 'transparent',
    color: 'rgb(160, 160, 160)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginTop: 3 * alpha
  },
  businessHeaderHourText: {
    backgroundColor: 'transparent',
    color: 'rgb(160, 160, 160)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    alignSelf: 'stretch',
    marginTop: 9 * alpha
  },
  businessHourText: {
    backgroundColor: 'transparent',
    color: 'rgb(160, 160, 160)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    alignSelf: 'stretch',
    marginTop: 3 * alpha
  },
  featuredpromoButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    width: 60 * alpha,
    height: 60 * alpha,
    left: 10 * alpha
  },
  featuredpromoButtonPosition1: {
    bottom: 0 * alpha
  },
  featuredpromoButtonPosition2: {
    bottom: 40 * alpha
  },
  featuredpromoButtonPosition3: {
    bottom: 90 * alpha
  },
  featuredpromoButtonImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  },
  mapImage: {
    backgroundColor: 'transparent',
    height: 200 * alpha,
    width: '100%'
  },
  promotionTopBarView: {
    backgroundColor: 'transparent'
  },
  promotionBarView: {
    width: '100%',
    height: 32 * alpha,
    backgroundColor: RED,
    justifyContent: 'center',
    alignItems: 'center'
  },
  promotionTopBarText: {
    fontFamily: TITLE_FONT,
    color: 'white',
    fontSize: 12 * alpha,
    alignSelf: 'center',
    paddingLeft: 10 * alpha,
    paddingRight: 10 * alpha
  }
});
