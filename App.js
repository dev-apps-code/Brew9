//
//  App.js
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { createBottomTabNavigator } from "react-navigation"
import * as Font from "expo-font"
import { DangerZone, AppLoading } from "expo"
import Home from "./App/Home/Home"
import { createStackNavigator, createAppContainer } from "react-navigation"
import Profile from "./App/Profile/Profile"
import PickUp from "./App/PickUp/PickUp"

const PushRouteOne = createStackNavigator({
	Home: {
		screen: Home,
	},
}, {
	initialRouteName: "Home",
})

const PushRouteTwo = createStackNavigator({
	PickUp: {
		screen: PickUp,
	},
}, {
	initialRouteName: "PickUp",
})

const PushRouteThree = createStackNavigator({
	Profile: {
		screen: Profile,
	},
}, {
	initialRouteName: "Profile",
})

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
			"Helvetica": require("./assets/fonts/Helvetica.ttf"),
			"Helvetica-Bold": require("./assets/fonts/HelveticaBold.ttf"),
		})
		this.setState({
			fontsReady: true,
		})
	}

	render() {
	
		if (!this.state.fontsReady) { return (<AppLoading />); }
		return <AppContainer/>
	}
}
