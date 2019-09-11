//
//  PointShopItem
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";

export default class PointShopItem extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Item",
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

	onRedeemRewardPressed = () => {
	
	}

	render() {
	
		return <View
				style={styles.pointItemView}>
				<Image
					source={require("./../../assets/images/card-04.png")}
					style={styles.productimageImage}/>
				<View
					pointerEvents="box-none"
					style={{
						height: 50 * alpha,
					}}>
					<View
						style={styles.viewView}/>
					<View
						style={styles.viewTwoView}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 13 * alpha,
								width: 64 * alpha,
								top: 5 * alpha,
								height: 40 * alpha,
							}}>
							<Text
								style={styles.titleText}>Voucher A</Text>
							<Text
								style={styles.valueText}>1000</Text>
						</View>
						<Text
							style={styles.pointsText}>Points</Text>
					</View>
				</View>
				<View
					style={styles.viewThreeView}>
					<Text
						style={styles.titleTwoText}>Product Type</Text>
					<Text
						style={styles.pointsTwoText}> - Voucher</Text>
				</View>
				<View
					style={styles.viewFourView}>
					<Text
						style={styles.titleThreeText}>Valid Date</Text>
					<Text
						style={styles.pointsThreeText}> - 1 month from date of purchase</Text>
				</View>
				<View
					style={styles.viewFiveView}>
					<Text
						style={styles.titleFourText}>Time of use</Text>
					<Text
						style={styles.pointsFourText}> - All Day</Text>
				</View>
				<View
					style={{
						flex: 1,
					}}/>
				<TouchableOpacity
					onPress={this.onRedeemRewardPressed}
					style={styles.purchaseButton}>
					<Text
						style={styles.purchaseButtonText}>Purchase</Text>
				</TouchableOpacity>
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
	pointItemView: {
		backgroundColor: "white",
		flex: 1,
	},
	productimageImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 200 * alpha,
	},
	viewView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0,
		width: 375 * alpha,
		top: 0,
		height: 40 * alpha,
	},
	viewTwoView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 50 * alpha,
	},
	titleText: {
		color: "black",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		top: 0,
	},
	valueText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		top: 17 * alpha,
	},
	pointsText: {
		color: "rgb(142, 142, 142)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		left: 52 * alpha,
		top: 25 * alpha,
	},
	viewThreeView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
		alignItems: "flex-start",
	},
	titleTwoText: {
		color: "black",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 13 * alpha,
		marginTop: 5 * alpha,
	},
	pointsTwoText: {
		color: "black",
		fontFamily: "DINPro-Medium",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 124 * alpha,
		marginLeft: 13 * alpha,
		marginTop: 1 * alpha,
	},
	viewFourView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
		alignItems: "flex-start",
	},
	titleThreeText: {
		color: "black",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 13 * alpha,
		marginTop: 5 * alpha,
	},
	pointsThreeText: {
		color: "black",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 324 * alpha,
		height: 19 * alpha,
		marginLeft: 13 * alpha,
	},
	viewFiveView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
		alignItems: "flex-start",
	},
	titleFourText: {
		color: "black",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 13 * alpha,
		marginTop: 5 * alpha,
	},
	pointsFourText: {
		color: "black",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 324 * alpha,
		height: 19 * alpha,
		marginLeft: 13 * alpha,
	},
	purchaseButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderWidth: 0.5,
		borderColor: "rgb(215, 215, 215)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 51 * alpha,
	},
	purchaseButtonText: {
		color: "white",
		fontFamily: "Helvetica-Bold",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "right",
	},
	purchaseButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
})
