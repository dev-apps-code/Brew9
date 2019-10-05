//
//  App.js
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

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
import MemberReward from "./App/MemberReward/MemberReward"
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
import MissionCenter from "./App/MissionCenter/MissionCenter"
import Confirmation from "./App/Confirmation/Confirmation"
import FirstScreen from "./App/FirstScreen/FirstScreen"
import BannerView from "./App/Home/BannerView"
import VerifyUser from "./App/VerifyUser/VerifyUser"
import Register from "./App/Register/Register"

import { create } from 'dva-core'
import { Provider, connect } from 'react-redux'
import {registerModels} from './App/Model/index'

const PushRouteOne = createStackNavigator({
	Home: {
		screen: Home,
	},
	Checkout: {
		screen: Checkout,
		navigationOptions: {
			tabBarVisible: false
		}
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
	Register: {
		screen: Register,
		mode: 'modal',
		header: 'none'
	},
}, {
	initialRouteName: "Home",
})

const VerifyStack = createStackNavigator({
	VerifyUser: {
		screen: VerifyUser,	
		mode: 'modal',
		headerMode: 'none',
	},
	Register: {
		screen: Register,
		mode: 'modal',
		header: 'none'
	},
	WebCommonModal: {
		screen: WebCommonModal,
	},
}, {
	mode: 'modal',
	headerMode: 'none',
	initialRouteName: "VerifyUser",
})


const PushRouteTwo = createStackNavigator({
	PickUp: {
		screen: PickUp,
	},
	OrderHistory: {
		screen: OrderHistory,
	},
}, {
	initialRouteName: "PickUp",
})

const PushRouteThree = createStackNavigator({
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
	MemberReward: {
		screen: MemberReward,
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
	Notification: {
		screen: Notification,
	},
	PayByWallet: {
		screen: PayByWallet,
	},
	MissionCenter: {
		screen: MissionCenter,
	},
	VoucherDetail:{
		screen: VoucherDetail,
	}
}, {
	initialRouteName: "Profile",
})

PushRouteOne.navigationOptions = ({ navigation }) => {
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

PushRouteTwo.navigationOptions = ({ navigation }) => {
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

PushRouteThree.navigationOptions = ({ navigation }) => {

	let tabBarVisible = true;

	let routeName = navigation.state.routes[navigation.state.index].routeName

	if ( routeName != 'Profile' ) {
		tabBarVisible = false
	}

	return {
		tabBarVisible,
	}
}



const TabGroupOne = createBottomTabNavigator({
	PushRouteOne: {
		screen: PushRouteOne,
	},
	PushRouteTwo: {
		screen: PushRouteTwo,
	},
	PushRouteThree: {
		screen: PushRouteThree,
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
			case "PushRouteOne":
				return Home.tabBarItemOptions(navigation)
			case "PushRouteTwo":
				return PickUp.tabBarItemOptions(navigation)
			case "PushRouteThree":
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

const RootNavigator = createStackNavigator({
	FirstScreen: {
		screen: FirstScreen,
	},
	TabGroupOne: {
		screen: TabGroupOne,
	},
	VerifyStack: {
		screen: VerifyStack,	
	},
}, {
	initialRouteName: "TabGroupOne",
    headerMode: 'none',
})
 
const app = create(); // 创建dva实例，可传递配置参数。https://dvajs.com/api/#app-dva-opts
 
registerModels(app)
app.start(); // 实例初始化
 
const store = app._store;

const AppContainer = createAppContainer(RootNavigator)



export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			fontsReady: false,
		}
	}

	componentDidMount() {
	
		this.initProjectFonts()
	}

	async initProjectFonts() {
	
		await Font.loadAsync({
			"Helvetica-Bold": require("./assets/fonts/HelveticaBold.ttf"),
			"DINPro-Medium": require("./assets/fonts/DINProMedium139361.ttf"),
			"Helvetica": require("./assets/fonts/Helvetica.ttf"),
			"Helvetica-LightOblique": require("./assets/fonts/HelveticaLightOblique.ttf"),
			"DINPro-Bold": require("./assets/fonts/DINProBold.otf"),
			"Helvetica-Light": require("./assets/fonts/HelveticaLight.ttf"),
			"Helvetica-Oblique": require("./assets/fonts/HelveticaOblique.ttf"),
		})
		this.setState({
			fontsReady: true,
		})
	}


	render() {
	
		if (!this.state.fontsReady) { return (<AppLoading />); }
		return <Provider store={store}>
			<AppContainer/>
	  	</Provider>
	}
}
