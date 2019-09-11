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
import { createStackNavigator, createAppContainer } from "react-navigation"

import Checkout from "./App/Checkout/Checkout"
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
import PointShopItem from "./App/PointShopItem/PointShopItem"
import PointShopHistory from "./App/PointShopHistory/PointShopHistory"
import PayByWallet from "./App/PayByWallet/PayByWallet"
import MemberCenter from "./App/MemberCenter/MemberCenter"

import {createStore, applyMiddleware} from 'redux';
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
	PayByWallet: {
		screen: PayByWallet,
	},
	Transaction: {
		screen: Transaction,
	},
}, {
	initialRouteName: "Home",
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
	}
}, {
	initialRouteName: "Profile",
})

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
		activeTintColor: "rgb(85, 85, 85)",
		inactiveTintColor: "black",
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

const RootNavigator = createStackNavigator({
	TabGroupOne: {
		screen: TabGroupOne,
	},
}, {
	mode: "modal",
	headerMode: "none",
	initialRouteName: "TabGroupOne",
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
