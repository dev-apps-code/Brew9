//
//  WebCommon
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {View, WebView, StyleSheet, TouchableOpacity, Image} from "react-native"
import React from "react"
import {alpha, fontAlpha} from "../common/size";


export default class WebCommon extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: navigation.getParam("title", ""),
			headerTintColor: "black",
			headerLeft: <View
				style={styles.headerLeftContainer}>
				<TouchableOpacity
					onPress={params.onBackPressed ? params.onBackPressed : () => null}
					style={styles.navigationBarItem}>
					<Image
						source={require("./../../assets/images/back.png")}
						style={styles.navigationBarItemIcon}/>
				</TouchableOpacity>
			</View>,
			headerRight: null,
			headerStyle: {
				elevation: 0,
				shadowOpacity: 0
			},
		}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}


	render() {

		return <View
				style={styles.commonWebView}>
				<WebView
					style={styles.webviewWebView}
					source={{uri: this.props.navigation.getParam("web_url", "")}}/>
			</View>
	}
}

const styles = StyleSheet.create({
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
	},
	navigationBarItem: {

	},
	navigationBarItemTitle: {
		color: "black",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
	},
	navigationBarItemIcon: {
		tintColor: "black",
	},
	commonWebView: {
		backgroundColor: "white",
		flex: 1,
	},
	webviewWebView: {
		backgroundColor: "transparent",
		flex: 1,
	},
})
