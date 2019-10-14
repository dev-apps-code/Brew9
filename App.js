//
//  App.js
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

<<<<<<< HEAD
import * as Font from "expo-font";
import { DangerZone, AppLoading } from "expo";
import React from "react";

import { createBottomTabNavigator } from "react-navigation";
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
import MemberReward from "./App/MemberReward/MemberReward";
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

import { create } from "dva-core";
import { Provider, connect } from "react-redux";
import { registerModels } from "./App/Model/index";

const PushOrder = createStackNavigator(
  {
    Home: {
      screen: Home
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
    Transaction: {
      screen: Transaction
    },
    WebCommonModal: {
      screen: WebCommonModal
    },
    Register: {
      screen: Register,
      header: "none"
    }
  },
  {
    initialRouteName: "Home"
  }
);

const VerifyStack = createStackNavigator(
  {
    VerifyUser: {
      screen: VerifyUser
    },
    Register: {
      screen: Register
    },
    WebCommonModal: {
      screen: WebCommonModal
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
    VIPPurchase: {
      screen: VIPPurchase
    },
    Transaction: {
      screen: Transaction
    },
    MembershipInfo: {
      screen: MembershipInfo
    },
    MemberReward: {
      screen: MemberReward
    },
    PointHistory: {
      screen: PointHistory
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
=======
import * as Font from "expo-font"
import { DangerZone, AppLoading } from "expo"
import React from "react"

import { createBottomTabNavigator } from "react-navigation"
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation"

import Login from "./App/Login/Login"
import Checkout from "./App/Checkout/Checkout"
import CheckoutVoucher from "./App/Checkout/CheckoutVoucher"
import VoucherDetail from "./App/Checkout/VoucherDetail"
import Profile from "./App/Profile/Profile"
import MemberWallet from "./App/MemberWallet/MemberWallet"
import MemberVoucher from "./App/MemberVoucher/MemberVoucher"
import MembershipInfo from "./App/MembershipInfo/MembershipInfo"
import PickUp from "./App/PickUp/PickUp"
import MemberProfile from "./App/MemberProfile/MemberProfile"
import Home from "./App/Home/Home"
import VIPPurchase from "./App/VIPPurchase/VIPPurchase"
import PointHistory from "./App/PointHistory/PointHistory"
import Transaction from "./App/Transaction/Transaction"
import OrderHistory from "./App/OrderHistory/OrderHistory"
import PointShop from "./App/PointShop/PointShop"
import PointShopFullList from "./App/PointShop/PointShopFullList"
import PointShopItem from "./App/PointShopItem/PointShopItem"
import PointShopHistory from "./App/PointShopHistory/PointShopHistory"
import PayByWallet from "./App/PayByWallet/PayByWallet"
import MemberCenter from "./App/MemberCenter/MemberCenter"
import WebCommon from "./App/WebCommon/WebCommon"
import WebCommonModal from "./App/WebCommonModal/WebCommonModal"
import TopUpWallet from "./App/TopUpWallet/TopUpWallet"
import OrderReceipt from "./App/OrderReceipt/OrderReceipt"
import OrderReview from "./App/OrderReview/OrderReview"
import OrderInvoice from "./App/OrderInvoice/OrderInvoice"
import RedeemPromotion from "./App/RedeemPromotion/RedeemPromotion"
import Notification from "./App/Notification/Notification"
import PromotionDetail from "./App/Notification/PromotionDetail"
import MissionCenter from "./App/MissionCenter/MissionCenter"
import Confirmation from "./App/Confirmation/Confirmation"
import FirstScreen from "./App/FirstScreen/FirstScreen"
import BannerView from "./App/Home/BannerView"
import VerifyUser from "./App/VerifyUser/VerifyUser"
import Register from "./App/Register/Register"
import DirectionMap from "./App/DirectionMap/DirectionMap"
import FeaturedPromotionDetail from "./App/Home/FeaturedPromotionDetail"
import ScanQr from "./App/Home/ScanQr"

import { create } from 'dva-core'
import { Provider, connect } from 'react-redux'
import {registerModels} from './App/Model/index'

const PushOrder = createStackNavigator({
	Home: {
		screen: Home,
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
		screen: DirectionMap,
	},
	CheckoutVoucher: {
		screen: CheckoutVoucher,
	},
	VoucherDetail: {
		screen: VoucherDetail,
	},
	BannerView: {
		screen: BannerView,
	},
	PayByWallet: {
		screen: PayByWallet,
	},
	Transaction: {
		screen: Transaction,
	},
	WebCommonModal: {
		screen: WebCommonModal,
	},
	WebCommon: {
		screen: WebCommon,
	},
	Register: {
		screen: Register,		
		header: 'none'
	},
	ScanQr: {
		screen: ScanQr,
	}
}, {
	initialRouteName: "Home",
})


const VerifyUserStack = createStackNavigator({
	VerifyUser: {
		screen: VerifyUser,		
	},
	Register: {
		screen: Register,
		
	},
	WebCommonModal: {
		screen: WebCommonModal,
	},
	WebCommon: {
		screen: WebCommon,
	},
}, {
	initialRouteName: "VerifyUser",
	mode: 'modal',
})

const VerifyStack = createStackNavigator({
	VerifyUser: {
		screen: VerifyUser,	
	
	},
	Register: {
		screen: Register,
		
	},
	WebCommonModal: {
		screen: WebCommonModal,
	},
	WebCommon: {
		screen: WebCommon,
	},
}, {

	initialRouteName: "VerifyUser",
})


const PushPickup = createStackNavigator({
	PickUp: {
		screen: PickUp,
	},
	OrderHistory: {
		screen: OrderHistory,
	},
}, {
	initialRouteName: "PickUp",
})

const PushInbox = createStackNavigator({
	Notification: {
		screen: Notification,
	},
	PromotionDetail: {
		screen: PromotionDetail,
	}
}, {
	initialRouteName: "Notification",
})

const PushProfile = createStackNavigator({
	Profile: {
		screen: Profile,
	},
	VIPPurchase: {
		screen: VIPPurchase,
	},
	Transaction: {
		screen: Transaction,
	},
	MembershipInfo: {
		screen: MembershipInfo,
	},
	MemberVoucher: {
		screen: MemberVoucher,
	},
	PointHistory: {
		screen: PointHistory,
	},
	MemberWallet: {
		screen: MemberWallet,
	},
	OrderHistory: {
		screen: OrderHistory,
	},
	PointShop: {
		screen: PointShop,
	},
	PointShopFullList: {
		screen: PointShopFullList,
	},
	PointShopItem: {
		screen: PointShopItem,
	},
	PointShopHistory: {
		screen: PointShopHistory,
	},
	MemberProfile: {
		screen: MemberProfile,
	},
	MemberCenter: {
		screen: MemberCenter,
	},
	WebCommon: {
		screen: WebCommon,
	},
	TopUpWallet: {
		screen: TopUpWallet,
	},
	OrderReceipt: {
		screen: OrderReceipt,
	},
	OrderReview: {
		screen: OrderReview,
	},
	OrderInvoice: {
		screen: OrderInvoice,
	},
	RedeemPromotion: {
		screen: RedeemPromotion,
	},
	PayByWallet: {
		screen: PayByWallet,
	},
	MissionCenter: {
		screen: MissionCenter,
	},
	VoucherDetail:{
		screen: VoucherDetail,
	},
}, {
	initialRouteName: "Profile",
})
>>>>>>> 2c9887aa617ddb429c23e3c5dc84611740205d91

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
      activeTintColor: "black",
      inactiveTintColor: "rgb(85, 85, 85)",
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
          return Home.tabBarItemOptions(navigation);
        case "PushPickup":
          return PickUp.tabBarItemOptions(navigation);
        case "PushInbox":
          return Notification.tabBarItemOptions(navigation);
        case "PushProfile":
          return Profile.tabBarItemOptions(navigation);
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
    }
  },
  {
    initialRouteName: "TabGroupOne",
    mode: "modal",
    headerMode: "none"
  }
);

<<<<<<< HEAD
=======
const TabGroupOne = createBottomTabNavigator({
	PushOrder: {
		screen: PushOrder,
	},
	PushPickup: {
		screen: PushPickup,
	},
	PushInbox: {
		screen: PushInbox,
	},
	PushProfile: {
		screen: PushProfile,
	},

}, {
	tabBarPosition: "bottom",
	animationEnabled: true,
	tabBarOptions: {
		showIcon: true,
		activeTintColor: "black",
		inactiveTintColor: "rgb(85, 85, 85)",
		indicatorStyle: {
			backgroundColor: "transparent",
		},
		style: {
			backgroundColor: "rgb(224, 224, 224)",
		},
	},
	defaultNavigationOptions: ({ navigation }) => {
	
		const { routeName } = navigation.state
		
		switch (routeName) {
			case "PushOrder":
				return Home.tabBarItemOptions(navigation)
			case "PushPickup":
				return PickUp.tabBarItemOptions(navigation)
			case "PushInbox":
				return Notification.tabBarItemOptions(navigation)
			case "PushProfile":
				return Profile.tabBarItemOptions(navigation)
		}
	},
})

const AuthenticationStack = createStackNavigator({
	Login: {
		screen: Login,
	},
	Confirmation: {
		screen: Confirmation,
	},
}, {
	initialRouteName: "Login",
})

const RootNavigator = createSwitchNavigator({
	FirstScreen: {
		screen: FirstScreen,
	},
	TabGroupOne: {
		screen: TabGroupOne,
	},
	VerifyStack: {
		screen: VerifyStack,	
	},
	VerifyUserStack: {
		screen: VerifyUserStack,	
	},
}, {
	initialRouteName: "FirstScreen",
	mode: 'modal',
    headerMode: 'none',
})
 
>>>>>>> 2c9887aa617ddb429c23e3c5dc84611740205d91
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
      "Helvetica-Bold": require("./assets/fonts/HelveticaBold.ttf"),
      "DINPro-Medium": require("./assets/fonts/DINProMedium139361.ttf"),
      Helvetica: require("./assets/fonts/Helvetica.ttf"),
      "Helvetica-LightOblique": require("./assets/fonts/HelveticaLightOblique.ttf"),
      "DINPro-Bold": require("./assets/fonts/DINProBold.otf"),
      "Helvetica-Light": require("./assets/fonts/HelveticaLight.ttf"),
      "Helvetica-Oblique": require("./assets/fonts/HelveticaOblique.ttf"),
      "SFProText-Bold": require("./assets/fonts/SFProText-Bold.ttf"),
      "SFProText-BoldItalic": require("./assets/fonts/SFProText-BoldItalic.ttf"),
      "SFProText-Heavy": require("./assets/fonts/SFProText-Heavy.ttf"),
      "SFProText-HeavyItalic": require("./assets/fonts/SFProText-HeavyItalic.ttf"),
      "SFProText-LightItalic": require("./assets/fonts/SFProText-LightItalic.ttf"),
      "SFProText-Medium": require("./assets/fonts/SFProText-Medium.ttf"),
      "SFProText-MediumItalic": require("./assets/fonts/SFProText-MediumItalic.ttf"),
      "SFProText-Regular": require("./assets/fonts/SFProText-Regular.ttf"),
      "SFProText-RegularItalic": require("./assets/fonts/SFProText-RegularItalic.ttf"),
      "SFProText-Semibold": require("./assets/fonts/SFProText-Semibold.ttf"),
      "SFProText-SemiboldItalic": require("./assets/fonts/SFProText-SemiboldItalic.ttf"),
      "ClanPro-Black": require("./assets/fonts/ClanPro-Black.ttf"),
      "ClanPro-BlackItalic": require("./assets/fonts/ClanPro-BlackItalic.ttf"),
      "ClanPro-Bold": require("./assets/fonts/ClanPro-Bold.ttf"),
      "ClanPro-BoldItalic": require("./assets/fonts/ClanPro-BoldItalic.ttf"),
      "ClanPro-Book": require("./assets/fonts/ClanPro-Book.ttf"),
      "ClanPro-BookItalic": require("./assets/fonts/ClanPro-BookItalic.ttf"),
      "ClanPro-CompBlack": require("./assets/fonts/ClanPro-CompBlack.ttf"),
      "ClanPro-CompBlackItalic": require("./assets/fonts/ClanPro-CompBlackItalic.ttf"),
      "ClanPro-CompBold": require("./assets/fonts/ClanPro-CompBold.ttf"),
      "ClanPro-CompBoldItalic": require("./assets/fonts/ClanPro-CompBoldItalic.ttf"),
      "ClanPro-CompBook": require("./assets/fonts/ClanPro-CompBook.ttf"),
      "ClanPro-CompBookItalic": require("./assets/fonts/ClanPro-CompBookItalic.ttf"),
      "ClanPro-CompMedium": require("./assets/fonts/ClanPro-CompMedium.ttf"),
      "ClanPro-CompMediumItalic": require("./assets/fonts/ClanPro-CompMediumItalic.ttf"),
      "ClanPro-CompNews": require("./assets/fonts/ClanPro-CompNews.ttf"),
      "ClanPro-CompNewsItalic": require("./assets/fonts/ClanPro-CompNewsItalic.ttf"),
      "ClanPro-CompThin": require("./assets/fonts/ClanPro-CompThin.ttf"),
      "ClanPro-CompThinItalic": require("./assets/fonts/ClanPro-CompThinItalic.ttf"),
      "ClanPro-CompUltra": require("./assets/fonts/ClanPro-CompUltra.ttf"),
      "ClanPro-CompUltraItalic": require("./assets/fonts/ClanPro-CompUltraItalic.ttf"),
      "ClanPro-CondBlack": require("./assets/fonts/ClanPro-CondBlack.ttf"),
      "ClanPro-CondBlackItalic": require("./assets/fonts/ClanPro-CondBlackItalic.ttf"),
      "ClanPro-CondBold": require("./assets/fonts/ClanPro-CondBold.ttf"),
      "ClanPro-CondBoldItalic": require("./assets/fonts/ClanPro-CondBoldItalic.ttf"),
      "ClanPro-CondBook": require("./assets/fonts/ClanPro-CondBook.ttf"),
      "ClanPro-CondBookItalic": require("./assets/fonts/ClanPro-CondBookItalic.ttf"),
      "ClanPro-CondMedium": require("./assets/fonts/ClanPro-CondMedium.ttf"),
      "ClanPro-CondMediumItalic": require("./assets/fonts/ClanPro-CondMediumItalic.ttf"),
      "ClanPro-CondNews": require("./assets/fonts/ClanPro-CondNews.ttf"),
      "ClanPro-CondNewsItalic": require("./assets/fonts/ClanPro-CondNewsItalic.ttf"),
      "ClanPro-CondThin": require("./assets/fonts/ClanPro-CondThin.ttf"),
      "ClanPro-CondThinItalic": require("./assets/fonts/ClanPro-CondThinItalic.ttf"),
      "ClanPro-CondUltra": require("./assets/fonts/ClanPro-CondUltra.ttf"),
      "ClanPro-CondUltraItalic": require("./assets/fonts/ClanPro-CondUltraItalic.ttf"),
      "ClanPro-ExtdBlack": require("./assets/fonts/ClanPro-ExtdBlack.ttf"),
      // "ClanPro-ExtdBlackItalic": require("./assets/fonts/ClanPro-ExtdBlackItalic.ttf"),
      "ClanPro-ExtdBold": require("./assets/fonts/ClanPro-ExtdBold.ttf"),
      "ClanPro-ExtdBoldItalic": require("./assets/fonts/ClanPro-ExtdBoldItalic.ttf"),
      "ClanPro-ExtdBook": require("./assets/fonts/ClanPro-ExtdBook.ttf"),
      "ClanPro-ExtdBookItalic": require("./assets/fonts/ClanPro-ExtdBookItalic.ttf"),
      "ClanPro-ExtdMedium": require("./assets/fonts/ClanPro-ExtdMedium.ttf"),
      "ClanPro-ExtdMediumItalic": require("./assets/fonts/ClanPro-ExtdMediumItalic.ttf"),
      "ClanPro-ExtdNews": require("./assets/fonts/ClanPro-ExtdNews.ttf"),
      "ClanPro-ExtdNewsItalic": require("./assets/fonts/ClanPro-ExtdNewsItalic.ttf"),
      "ClanPro-ExtdThin": require("./assets/fonts/ClanPro-ExtdThin.ttf"),
      "ClanPro-ExtdThinItalic": require("./assets/fonts/ClanPro-ExtdThinItalic.ttf"),
      "ClanPro-ExtdUltra": require("./assets/fonts/ClanPro-ExtdUltra.ttf"),
      "ClanPro-ExtdUltraItalic": require("./assets/fonts/ClanPro-ExtdUltraItalic.ttf"),
      "ClanPro-Medium": require("./assets/fonts/ClanPro-Medium.ttf"),
      "ClanPro-MediumItalic": require("./assets/fonts/ClanPro-MediumItalic.ttf"),
      "ClanPro-NarrBlack": require("./assets/fonts/ClanPro-NarrBlack.ttf"),
      "ClanPro-NarrBlackItalic": require("./assets/fonts/ClanPro-NarrBlackItalic.ttf"),
      "ClanPro-NarrBold": require("./assets/fonts/ClanPro-NarrBold.ttf"),
      "ClanPro-NarrBoldItalic": require("./assets/fonts/ClanPro-NarrBoldItalic.ttf"),
      "ClanPro-NarrBook": require("./assets/fonts/ClanPro-NarrBook.ttf"),
      "ClanPro-NarrBookItalic": require("./assets/fonts/ClanPro-NarrBookItalic.ttf"),
      "ClanPro-NarrMedium": require("./assets/fonts/ClanPro-NarrMedium.ttf"),
      "ClanPro-NarrMediumItalic": require("./assets/fonts/ClanPro-NarrMediumItalic.ttf"),
      "ClanPro-NarrNews": require("./assets/fonts/ClanPro-NarrNews.ttf"),
      "ClanPro-NarrNewsItalic": require("./assets/fonts/ClanPro-NarrNewsItalic.ttf"),
      "ClanPro-NarrThin": require("./assets/fonts/ClanPro-NarrThin.ttf"),
      "ClanPro-NarrThinItalic": require("./assets/fonts/ClanPro-NarrThinItalic.ttf"),
      "ClanPro-NarrUltra": require("./assets/fonts/ClanPro-NarrUltra.ttf"),
      "ClanPro-NarrUltraItalic": require("./assets/fonts/ClanPro-NarrUltraItalic.ttf"),
      "ClanPro-News": require("./assets/fonts/ClanPro-News.ttf"),
      "ClanPro-NewsItalic": require("./assets/fonts/ClanPro-NewsItalic.ttf"),
      "ClanPro-Thin": require("./assets/fonts/ClanPro-Thin.ttf"),
      "ClanPro-ThinItalic": require("./assets/fonts/ClanPro-ThinItalic.ttf"),
      "ClanPro-Ultra": require("./assets/fonts/ClanPro-Ultra.ttf"),
      "ClanPro-UltraItalic": require("./assets/fonts/ClanPro-UltraItalic.ttf"),
      "ClanPro-WideBlack": require("./assets/fonts/ClanPro-WideBlack.ttf"),
      "ClanPro-WideBlackItalic": require("./assets/fonts/ClanPro-WideBlackItalic.ttf"),
      "ClanPro-WideBold": require("./assets/fonts/ClanPro-WideBold.ttf"),
      "ClanPro-WideBoldItalic": require("./assets/fonts/ClanPro-WideBoldItalic.ttf"),
      "ClanPro-WideBook": require("./assets/fonts/ClanPro-WideBook.ttf"),
      "ClanPro-WideBookItalic": require("./assets/fonts/ClanPro-WideBookItalic.ttf"),
      "ClanPro-WideMedium": require("./assets/fonts/ClanPro-WideMedium.ttf"),
      "ClanPro-WideMediumItalic": require("./assets/fonts/ClanPro-WideMediumItalic.ttf"),
      "ClanPro-WideNews": require("./assets/fonts/ClanPro-WideNews.ttf"),
      "ClanPro-WideNewsItalic": require("./assets/fonts/ClanPro-WideNewsItalic.ttf"),
      "ClanPro-WideThin": require("./assets/fonts/ClanPro-WideThin.ttf"),
      "ClanPro-WideThinItalic": require("./assets/fonts/ClanPro-WideThinItalic.ttf"),
      "ClanPro-WideUltra": require("./assets/fonts/ClanPro-WideUltra.ttf"),
      "ClanPro-WideUltraItalic": require("./assets/fonts/ClanPro-WideUltraItalic.ttf")
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
