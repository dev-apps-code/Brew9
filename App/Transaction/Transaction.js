//
//  Transaction
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { StyleSheet, Image, TouchableOpacity, Text, View } from "react-native"
import { alpha, fontAlpha } from "../Common/size";
import {connect} from "react-redux";

@connect(({ members }) => ({
	members: members.profile
}))
export default class Transaction extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Confirm Transaction",
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

	onPayNowPressed = () => {

	}

	render() {

		return <View
			style={styles.TransactionView}>
			<View
				style={styles.contentView}>
				<View
					pointerEvents="box-none"
					style={{
						height: 150 * alpha,
					}}>
					<View
						style={styles.cartinfoView}>
						<Text
							style={styles.itemnameText}>{this.props.navigation.getParam("transaction_name","Payment")}</Text>
						<Text
							style={styles.carttotalText}>{this.props.members.currency}{this.props.navigation.getParam("amount",0.00)}</Text>
					</View>
					<View
						style={styles.payeeView}>
						<Text
							style={styles.payeeText}>Payee</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.brew9Text}>Brew9</Text>
					</View>
				</View>
				<View
					style={styles.paymentmethodView}>
					<View
						style={styles.headerView}>
						<Text
							style={styles.paymentMethodText}>Payment Method</Text>
					</View>
					<View
						style={styles.paymentView}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								alignSelf: "center",
								top: 0,
								bottom: 0,
								justifyContent: "center",
							}}>
							<Text
								style={styles.addBankCardToPayText}>Add Bank Card to Pay</Text>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								right: 0,
								top: 0,
								bottom: 0,
								justifyContent: "center",
							}}>
							<Image
								source={require("./../../assets/images/chosen.png")}
								style={styles.chosenImage}/>
						</View>
					</View>
					<TouchableOpacity
						onPress={this.onPayNowPressed}
						style={styles.payNowButton}>
						<Text
							style={styles.payNowButtonText}>Pay Now</Text>
					</TouchableOpacity>
				</View>
			</View>
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
	TransactionView: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	contentView: {
		backgroundColor: "transparent",
		height: 598 * alpha,
	},
	cartinfoView: {
		backgroundColor: "rgb(240, 240, 240)",
		position: "absolute",
		left: 1 * alpha,
		right: 1 * alpha,
		top: 0,
		height: 111 * alpha,
		alignItems: "center",
	},
	itemnameText: {
		color: "rgb(55, 55, 55)",
		fontFamily: "Helvetica",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 23 * alpha,
	},
	carttotalText: {
		backgroundColor: "transparent",
		color: "rgb(69, 67, 67)",
		fontFamily: "Helvetica",
		fontSize: 35 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 4 * alpha,
	},
	payeeView: {
		backgroundColor: "white",
		shadowColor: "rgb(230, 230, 230)",
		shadowRadius: 2 * alpha,
		shadowOpacity: 1,
		position: "absolute",
		left: 0,
		right: 0,
		top: 110 * alpha,
		height: 40 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	payeeText: {
		color: "rgb(165, 165, 165)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 28 * alpha,
	},
	brew9Text: {
		color: "rgb(78, 78, 78)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 28 * alpha,
	},
	paymentmethodView: {
		backgroundColor: "transparent",
		height: 448 * alpha,
	},
	headerView: {
		backgroundColor: "rgb(240, 240, 240)",
		height: 40 * alpha,
		marginLeft: 1 * alpha,
		marginRight: 1 * alpha,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	paymentMethodText: {
		color: "rgb(165, 165, 165)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 27 * alpha,
	},
	paymentView: {
		backgroundColor: "white",
		height: 40 * alpha,
		marginRight: 2 * alpha,
	},
	addBankCardToPayText: {
		color: "rgb(34, 34, 34)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	chosenImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 18 * alpha,
		height: 18 * alpha,
		marginRight: 34 * alpha,
	},
	payNowButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 4 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "center",
		width: 321 * alpha,
		height: 41 * alpha,
		marginTop: 19 * alpha,
	},
	payNowButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	payNowButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
})

