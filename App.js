//
//  App.js
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//
import * as Font from "expo-font";
import { DangerZone, AppLoading } from "expo";
import React from "react";
import * as Sentry from 'sentry-expo';
import { createBottomTabNavigator } from "react-navigation";
import Constants from 'expo-constants'
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import Login from "./App/Login/Login";
import Checkout from "./App/Checkout/Checkout";
import CheckoutVoucher from "./App/Checkout/CheckoutVoucher";
import VoucherDetail from "./App/Checkout/VoucherDetail";
import Profile from "./App/Profile/Profile";
import MemberWallet from "./App/MemberWallet/MemberWallet";
import MemberVoucher from "./App/MemberVoucher/MemberVoucher";
import MembershipInfo from "./App/MembershipInfo/MembershipInfo";
import PickUp from "./App/PickUp/PickUp";
import MemberProfile from "./App/MemberProfile/MemberProfile";
import Home from "./App/Home/Home";
import VIPPurchase from "./App/VIPPurchase/VIPPurchase";
import PointHistory from "./App/PointHistory/PointHistory";
import Transaction from "./App/Transaction/Transaction";
import OrderHistory from "./App/OrderHistory/OrderHistory";
import PointShop from "./App/PointShop/PointShop";
import PointShopFullList from "./App/PointShop/PointShopFullList";
import PointShopItem from "./App/PointShopItem/PointShopItem";
import PointShopHistory from "./App/PointShopHistory/PointShopHistory";
import PayByWallet from "./App/PayByWallet/PayByWallet";
import MemberCenter from "./App/MemberCenter/MemberCenter";
import WebCommon from "./App/WebCommon/WebCommon";
import WebCommonModal from "./App/WebCommonModal/WebCommonModal";
import TopUpWallet from "./App/TopUpWallet/TopUpWallet";
import OrderReceipt from "./App/OrderReceipt/OrderReceipt";
import OrderReview from "./App/OrderReview/OrderReview";
import OrderInvoice from "./App/OrderInvoice/OrderInvoice";
import RedeemPromotion from "./App/RedeemPromotion/RedeemPromotion";
import Notification from "./App/Notification/Notification";
import PromotionDetail from "./App/Notification/PromotionDetail";
import MissionCenter from "./App/MissionCenter/MissionCenter";
import Confirmation from "./App/Confirmation/Confirmation";
import FirstScreen from "./App/FirstScreen/FirstScreen";
import BannerView from "./App/Home/BannerView";
import VerifyUser from "./App/VerifyUser/VerifyUser";
import Register from "./App/Register/Register";
import DirectionMap from "./App/DirectionMap/DirectionMap";
import FeaturedPromotionDetail from "./App/Home/FeaturedPromotionDetail";
import ScanQr from "./App/Home/ScanQr";
import PayByCard from "./App/PayByCard/PayByCard"
import CreditHistory from "./App/CreditHistory/CreditHistory"

import { create } from "dva-core";
import { Provider, connect } from "react-redux";
import { registerModels } from "./App/Model/index";
import PaymentsWebview from "./App/Checkout/PaymentsWebview"
import { TABBAR_ACTIVE_TINT, TABBAR_INACTIVE_TINT } from "./App/Common/common_style";

Sentry.init({
  dsn: 'https://a6c00af5b64644139799e721b45d61f4@sentry.io/1797623',
  enableInExpoDevelopment: true,
  debug: true
});
const VerifyUserStack = createStackNavigator(
  {
    VerifyUser: {
      screen: VerifyUser
    },
    Register: {
      screen: Register
    },
    WebCommonModal: {
      screen: WebCommonModal
    },
    WebCommon: {
      screen: WebCommon
    }
  },
  {
    initialRouteName: "VerifyUser",
    mode: "modal",
    header: "none"
  }
);


const PushOrder = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    PaymentsWebview:{
      screen: PaymentsWebview
    },
    Checkout: {
      screen: Checkout,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    FeaturedPromotionDetail: {
      screen: FeaturedPromotionDetail
    },
    DirectionMap: {
      screen: DirectionMap
    },
    CheckoutVoucher: {
      screen: CheckoutVoucher
    },
    VoucherDetail: {
      screen: VoucherDetail
    },
    BannerView: {
      screen: BannerView
    },
    PayByWallet: {
      screen: PayByWallet
    },
    PayByCard: {
      screen: PayByCard
    },
    Transaction: {
      screen: Transaction
    },
    WebCommonModal: {
      screen: WebCommonModal
    },
    WebCommon: {
      screen: WebCommon
    },
    Register: {
      screen: Register,
      header: "none"
    },
    ScanQr: {
      screen: ScanQr
    },   
  },
  {
    initialRouteName: "Home"
  }
);


export const VerifyStack = createStackNavigator(
  {
    VerifyUser: {
      screen: VerifyUser
    },
    Register: {
      screen: Register
    },
    WebCommonModal: {
      screen: WebCommonModal
    },
    WebCommon: {
      screen: WebCommon
    }
  },
  {
    initialRouteName: "VerifyUser"
  }
);

const PushPickup = createStackNavigator(
  {
    PickUp: {
      screen: PickUp
    },
    OrderHistory: {
      screen: OrderHistory
    }
  },
  {
    initialRouteName: "PickUp"
  }
);

const PushInbox = createStackNavigator(
  {
    Notification: {
      screen: Notification
    },
    PromotionDetail: {
      screen: PromotionDetail
    }
  },
  {
    initialRouteName: "Notification"
  }
);

const PushProfile = createStackNavigator(
  {
    Profile: {
      screen: Profile
    },
    PaymentsWebview:{
      screen: PaymentsWebview
    },
    VIPPurchase: {
      screen: VIPPurchase
    },
    Transaction: {
      screen: Transaction
    },
    MembershipInfo: {
      screen: MembershipInfo
    },
    MemberVoucher: {
      screen: MemberVoucher
    },
    PointHistory: {
      screen: PointHistory
    },
    CreditHistory: {
      screen: CreditHistory
    },
    MemberWallet: {
      screen: MemberWallet
    },
    OrderHistory: {
      screen: OrderHistory
    },
    PointShop: {
      screen: PointShop
    },
    PointShopFullList: {
      screen: PointShopFullList
    },
    PointShopItem: {
      screen: PointShopItem
    },
    PointShopHistory: {
      screen: PointShopHistory
    },
    MemberProfile: {
      screen: MemberProfile
    },
    MemberCenter: {
      screen: MemberCenter
    },
    WebCommon: {
      screen: WebCommon
    },
    TopUpWallet: {
      screen: TopUpWallet
    },
    OrderReceipt: {
      screen: OrderReceipt
    },
    OrderReview: {
      screen: OrderReview
    },
    OrderInvoice: {
      screen: OrderInvoice
    },
    RedeemPromotion: {
      screen: RedeemPromotion
    },
    PayByWallet: {
      screen: PayByWallet
    },
    MissionCenter: {
      screen: MissionCenter
    },
    VoucherDetail: {
      screen: VoucherDetail
    }
  },
  {
    initialRouteName: "Profile"
  }
);



PushOrder.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName != "Home") {
      tabBarVisible = false;
    }
  }
  return {
    tabBarVisible
  };
};


const prevGetStateForHome = PushOrder.router.getStateForAction;
PushOrder.router.getStateForAction = (action, state) => {

  if (action.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'Home') {
    return state;
  }

  return prevGetStateForHome(action, state);
}

PushPickup.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName != "PickUp") {
      tabBarVisible = false;
    }
  }
  return {
    tabBarVisible
  };
};


const prevGetStateForPickUp = PushPickup.router.getStateForAction;
PushPickup.router.getStateForAction = (action, state) => {

  if (action.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'PickUp') {
    return state;
  }

  return prevGetStateForPickUp(action, state);
}

PushInbox.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName != "Notification") {
      tabBarVisible = false;
    }
  }
  return {
    tabBarVisible
  };
};

const prevGetStateForPushInbox = PushInbox.router.getStateForAction;
PushInbox.router.getStateForAction = (action, state) => {

  if (action.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'Notification') {
    return state;
  }

  return prevGetStateForPushInbox(action, state);
}

PushProfile.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName != "Profile") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const prevGetStateForPushProfile = PushProfile.router.getStateForAction;
PushProfile.router.getStateForAction = (action, state) => {

  if (action.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'Profile') {
    return state;
  }

  return prevGetStateForPushProfile(action, state);
}

const TabGroupOne = createBottomTabNavigator(
  {
    PushOrder: {
      screen: PushOrder
    },
    PushPickup: {
      screen: PushPickup
    },
    PushInbox: {
      screen: PushInbox
    },
    PushProfile: {
      screen: PushProfile
    }
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      activeTintColor: TABBAR_ACTIVE_TINT,
      inactiveTintColor: TABBAR_INACTIVE_TINT,
      indicatorStyle: {
        backgroundColor: "transparent"
      },
      style: {
        backgroundColor: "rgb(224, 224, 224)"
      }
    },
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;

      switch (routeName) {
        case "PushOrder":
          return Home.tabBarItemOptions(navigation,store);
        case "PushPickup":
          return PickUp.tabBarItemOptions(navigation,store);
        case "PushInbox":
          return Notification.tabBarItemOptions(navigation,store);
        case "PushProfile":
          return Profile.tabBarItemOptions(navigation,store);
      }
    }
  }
);

const AuthenticationStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Confirmation: {
      screen: Confirmation
    }
  },
  {
    initialRouteName: "Login"
  }
);

const RootNavigator = createStackNavigator(
  {
    FirstScreen: {
      screen: FirstScreen
    },
    TabGroupOne: {
      screen: TabGroupOne
    },
    VerifyStack: {
      screen: VerifyStack
    },
    VerifyUserStack:{
      screen: VerifyUserStack,
    
    }
  },
  {
    initialRouteName: "FirstScreen",
    mode: "modal",
    headerMode: "none"
  }
);

const app = create(); // 创建dva实例，可传递配置参数。https://dvajs.com/api/#app-dva-opts

registerModels(app);
app.start(); // 实例初始化

const store = app._store;

const AppContainer = createAppContainer(RootNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsReady: false
    };
  }

  componentDidMount() {
    this.initProjectFonts();
  }

  async initProjectFonts() {
    await Font.loadAsync({
      "ClanPro-Book": require("./assets/fonts/ClanPro-Book.ttf"),
      "ClanPro-News": require("./assets/fonts/ClanPro-News.ttf"),
    });
    this.setState({
      fontsReady: true
    });
  }

  render() {
    if (!this.state.fontsReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
