//
//  PromotionDetail
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";

export default class PromotionDetail extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Promotion",
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
		})
	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	render() {
	
		const promo = this.props.navigation.getParam("details", null)
console.log("Promo Detail", promo)
		return <View
				style={styles.promotiondetailView}>
				<Text
					style={styles.titleText}>{promo.title}</Text>
				<Text
					style={styles.timeText}>{promo.updated_at}</Text>
				<Image
					source={{uri: promo.notification_image.url}}
					style={styles.promoimageImage}/>
				<Text
					style={styles.descriptionText}>{promo.text}</Text>
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
	promotiondetailView: {
		backgroundColor: "white",
		flex: 1,
		alignItems: "center",
	},
	labelText: {
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 13 * alpha,
	},
	titleText: {
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 24 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 295 * alpha,
		marginLeft: 20 * alpha,
		marginTop: 23 * alpha,
	},
	timeText: {
		color: "rgb(151, 151, 151)",
		fontFamily: "Helvetica-LightOblique",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		marginLeft: 20 * alpha,
		marginTop: 6 * alpha,
	},
	promoimageImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		alignSelf: "stretch",
		width: null,
		height: 152 * alpha,
		marginTop: 18 * alpha,
	},
	descriptionText: {
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
		marginTop: 20 * alpha,
	},
})
