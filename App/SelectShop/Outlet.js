import {
    Animated,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    Linking,
    SafeAreaView
  } from 'react-native';
  import React from 'react';
  import { alpha, fontAlpha, windowHeight } from '../Common/size';
  import { connect } from 'react-redux';
  import Toast, { DURATION } from 'react-native-easy-toast';
  import HudLoading from '../Components/HudLoading';
  import { createAction, Storage } from '../Utils';
  import DeliveryFeeRequestObject from '../Requests/delivery_fee_request_object';
  import MakeOrderRequestObj from '../Requests/make_order_request_obj.js';
  import ValidVouchersRequestObject from '../Requests/valid_voucher_request_object.js';
  import _ from 'lodash';
  import {
    createMaterialTopTabNavigator,
    createAppContainer,
    NavigationContainer
  } from 'react-navigation';
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
  @connect(({ members, shops, orders }) => ({
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
    shippingAddress: members.shippingAddress
  }))
  export default class Outlet extends React.Component {
  
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <View style={styles.mainView}>

        </View>
      );
    }
  }
  
  Outlet.navigationOptions = {
    tabBarOptions: {
      activeTintColor: 'skyblue',
      inactiveTintColor: 'black',
      style: {
        backgroundColor: 'white'
      },
      tabStyle: {
        height: alpha * 5,
        marginBottom: alpha * 4
      },
      labelStyle: {},
      indicatorStyle: {
        backgroundColor: 'skyblue',
        width: '10%',
        left: '20%'
      }
    }
  };
  
  const styles = StyleSheet.create({
    mainView: {
      height: '100%',
      width: '100%',
      backgroundColor: 'green'
    },
    headerLeftContainer: {},
    navigationBarItem: {},
    navigationBarItemIcon: {
      width: 18 * alpha,
      height: 18 * alpha,
      tintColor: 'black',
      marginLeft: 12 * alpha
    }
  });
  