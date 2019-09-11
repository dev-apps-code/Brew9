//
//  MemberWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {Image, View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";

export default class MemberWallet extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Wallet",
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

	onTransactionHistoryPressed = () => {

		const { navigate } = this.props.navigation

		navigate("OrderHistory")
	}

	render() {
	
		return <View
				style={styles.walletView}>
				<ScrollView
					style={styles.viewView}>
					<View
						style={styles.cardviewView}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0,
								right: 0,
								top: 0,
								height: 196 * alpha,
							}}>
							<View
								style={styles.greyblockView}/>
							<View
								style={styles.rightblockView}/>
						</View>
						<Image
							source={require("./../../assets/images/card-04-2.png")}
							style={styles.card04Image}/>
					</View>
					<View
						style={styles.infoView}>
						<View
							style={styles.balanceView}>
							<Text
								style={styles.availableBalanceText}>Available Balance</Text>
							<View
								style={styles.rm30View}>
								<Text
									style={styles.rmText}>RM</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.textText}>30</Text>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								style={styles.topUpView}>
								<Text
									style={styles.topUpText}>Top Up</Text>
							</View>
						</View>
						<View
							style={styles.optionsView}>
							<View
								style={styles.seperatorView}/>
							<View
								pointerEvents="box-none"
								style={{
									height: 98 * alpha,
								}}>
								<View
									style={styles.transactionHistoryView}>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											left: 0,
											right: 0,
											top: 0,
											bottom: 0,
											justifyContent: "center",
										}}>
										<TouchableOpacity
											onPress={this.onTransactionHistoryPressed}
											style={styles.transactionhistoryButton}/>
									</View>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											left: 10 * alpha,
											right: 10 * alpha,
											top: 17 * alpha,
											height: 37 * alpha,
											alignItems: "center",
										}}>
										<Image
											source={require("./../../assets/images/group-2.png")}
											style={styles.groupImage}/>
										<View
											style={styles.seperatorTwoView}/>
									</View>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											left: 0,
											top: 0,
											bottom: 0,
											justifyContent: "center",
										}}>
										<Text
											style={styles.transactionHistoryText}>Transaction History</Text>
									</View>
								</View>
								<View
									style={styles.changePasswordView}>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											right: 10,
											width: 356,
											top: 19,
											height: 34,
											alignItems: "flex-end",
										}}>
										<Image
											source={require("./../../assets/images/group-2.png")}
											style={styles.groupTwoImage}/>
										<View
											style={styles.seperatorThreeView}/>
									</View>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											left: 0,
											top: 0,
											bottom: 0,
											justifyContent: "center",
										}}>
										<Text
											style={styles.changePasswordText}>Change Password</Text>
									</View>
								</View>
							</View>
							<View
								style={styles.resetPasswordView}>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										left: 10 * alpha,
										right: 10 * alpha,
										top: 22 * alpha,
										height: 32 * alpha,
										alignItems: "center",
									}}>
									<Image
										source={require("./../../assets/images/group-2.png")}
										style={styles.groupThreeImage}/>
									<View
										style={styles.seperatorFourView}/>
								</View>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										left: 0,
										top: 0,
										bottom: 0,
										justifyContent: "center",
									}}>
									<Text
										style={styles.resetPasswordText}>Reset Password</Text>
								</View>
							</View>
							<View
								style={styles.faqView}>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										right: 11 * alpha,
										width: 354 * alpha,
										top: 26 * alpha,
										height: 28 * alpha,
										alignItems: "center",
									}}>
									<Image
										source={require("./../../assets/images/group-2.png")}
										style={styles.groupFourImage}/>
									<View
										style={styles.seperatorFiveView}/>
								</View>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										left: 0,
										top: 0,
										bottom: 0,
										justifyContent: "center",
									}}>
									<Text
										style={styles.faqText}>FAQ</Text>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
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
	walletView: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	viewView: {
		backgroundColor: "transparent",
		flex: 1,
	},
	cardviewView: {
		backgroundColor: "transparent",
		height: 211 * alpha,
		marginLeft: 1 * alpha,
		marginRight: 10 * alpha,
	},
	greyblockView: {
		backgroundColor: "rgb(248, 248, 248)",
		position: "absolute",
		left: 0,
		right: 10 * alpha,
		top: 0,
		height: 123 * alpha,
	},
	rightblockView: {
		backgroundColor: "white",
		borderRadius: 10 * alpha,
		shadowColor: "rgba(144, 144, 144, 0.5)",
		shadowRadius: 2 * alpha,
		shadowOpacity: 1,
		position: "absolute",
		right: -24 * alpha,
		width: 24 * alpha,
		top: 52 * alpha,
		bottom: 0,
	},
	card04Image: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		position: "absolute",
		alignSelf: "center",
		width: 304 * alpha,
		top: 34 * alpha,
		height: 177 * alpha,
	},
	infoView: {
		backgroundColor: "transparent",
		height: 380 * alpha,
		marginRight: 10 * alpha,
		alignItems: "center",
	},
	balanceView: {
		backgroundColor: "transparent",
		width: 158 * alpha,
		height: 113 * alpha,
		marginTop: 16 * alpha,
	},
	availableBalanceText: {
		color: "rgb(58, 58, 58)",
		fontFamily: "Helvetica-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 20 * alpha,
		marginRight: 19 * alpha,
	},
	rm30View: {
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 51 * alpha,
		height: 34 * alpha,
		marginLeft: 45 * alpha,
		marginTop: 7 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	rmText: {
		backgroundColor: "transparent",
		color: "rgb(58, 58, 58)",
		fontFamily: "Helvetica-Bold",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginTop: 7 * alpha,
	},
	textText: {
		color: "rgb(58, 58, 58)",
		fontFamily: "DINPro-Bold",
		fontSize: 27 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "center",
	},
	topUpView: {
		backgroundColor: "rgb(70, 70, 70)",
		borderRadius: 3 * alpha,
		height: 36 * alpha,
		justifyContent: "center",
		alignItems: "center",
	},
	topUpText: {
		color: "white",
		fontFamily: "Helvetica-Bold",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	optionsView: {
		backgroundColor: "transparent",
		alignSelf: "stretch",
		height: 248 * alpha,
	},
	seperatorView: {
		backgroundColor: "rgb(244, 244, 244)",
		alignSelf: "center",
		width: 354 * alpha,
		height: 1 * alpha,
		marginTop: 48 * alpha,
	},
	transactionHistoryView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 1 * alpha,
		right: 1 * alpha,
		top: 0,
		height: 51 * alpha,
	},
	transactionhistoryButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 51,
	},
	transactionhistoryButtonText: {
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	transactionhistoryButtonImage: {
		resizeMode: "contain",
	},
	groupImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 9 * alpha,
		height: 10 * alpha,
		marginRight: 11 * alpha,
	},
	seperatorTwoView: {
		backgroundColor: "rgb(244, 244, 244)",
		width: 356 * alpha,
		height: 1 * alpha,
		marginTop: 26 * alpha,
	},
	transactionHistoryText: {
		color: "rgb(41, 41, 41)",
		fontFamily: "Helvetica-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 20 * alpha,
	},
	changePasswordView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 50 * alpha,
		height: 51 * alpha,
	},
	changePasswordText: {
		color: "rgb(41, 41, 41)",
		fontFamily: "Helvetica-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 20 * alpha,
	},
	groupTwoImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		alignSelf: "flex-end",
		width: 9 * alpha,
		height: 10 * alpha,
		marginRight: 11 * alpha,
	},
	seperatorThreeView: {
		backgroundColor: "rgb(244, 244, 244)",
		position: "absolute",
		alignSelf: "center",
		width: 356 * alpha,
		top: 52 * alpha,
		height: 1 * alpha,
	},
	resetPasswordView: {
		backgroundColor: "transparent",
		height: 51 * alpha,
		marginRight: 1 * alpha,
	},
	groupThreeImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 9 * alpha,
		height: 10 * alpha,
		marginRight: 11 * alpha,
	},
	seperatorFourView: {
		backgroundColor: "rgb(244, 244, 244)",
		width: 356 * alpha,
		height: 1 * alpha,
	},
	resetPasswordText: {
		color: "rgb(41, 41, 41)",
		fontFamily: "Helvetica-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 20 * alpha,
	},
	faqView: {
		backgroundColor: "transparent",
		height: 51 * alpha,
		marginRight: 1 * alpha,
	},
	groupFourImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 9 * alpha,
		height: 10 * alpha,
		marginRight: 11 * alpha,
	},
	seperatorFiveView: {
		backgroundColor: "rgb(244, 244, 244)",
		width: 354 * alpha,
		height: 1 * alpha,
		marginTop: 17 * alpha,
	},
	faqText: {
		backgroundColor: "transparent",
		color: "rgb(41, 41, 41)",
		fontFamily: "Helvetica-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 20 * alpha,
	},
})
