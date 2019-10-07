//
//  WebCommon
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {View, StyleSheet, TouchableOpacity, Image, Text} from "react-native"
import React from "react"
import {alpha, fontAlpha} from "../Common/size";
import { WebView } from 'react-native-webview';

export default class WebCommonModal extends React.Component {

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

		
	}

	onClosePressed = () => {
		this.props.navigation.goBack()
	}

	render() {
		return <View style={styles.mainView}>
			
		<WebView style={styles.webviewWebView} source={{uri: this.props.navigation.getParam("web_url", "")}}/>
		<TouchableOpacity
					onPress={this.onClosePressed}
					style={styles.closeButton}>
					<Text style={styles.closeButtonText}>X</Text>
				</TouchableOpacity>
		</View>
	}
}

const styles = StyleSheet.create({
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
		width: 70 * alpha,
	},
	navigationBarItem: {
		width: "100%",
	},
	navigationBarItemTitle: {
		color: "black",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
	},
	navigationBarItemIcon: {
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
	mainView: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: 40 * alpha,
	},
	commonWebView: {
		backgroundColor: "white",
		flex: 1,
	},
	webviewWebView: {
		backgroundColor: "transparent",
		flex: 1,
		marginTop: 40 * alpha,
	},
	closeButton: {
		backgroundColor: "transparent",
		borderRadius: 12.5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		width: 25 * alpha,
		height: 25 * alpha,
		top: 51 * alpha,
		right: 13 * alpha,
	},
	closeButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	closeButtonText: {
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
})
