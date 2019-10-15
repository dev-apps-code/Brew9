//
//  MemberWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {Image, View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import {connect} from "react-redux";
import {KURL_INFO} from "../Utils/server";

@connect(({ members }) => ({
	members: members.profile
}))
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

	onTopUpPressed = () => {
		const { navigate } = this.props.navigation

		navigate("TopUpWallet")
	}

	onFaqPressed = () => {
		const { navigate } = this.props.navigation
		const { members } = this.props

		navigate("WebCommon", {
			title: 'FAQs',
			web_url: KURL_INFO + '?page=faqs&id=' + members.company_id,
		})
	}

	render() {

		const { members } = this.props

		return <View
			style={styles.walletView}>
			<ScrollView
				style={styles.viewScrollView}>
				<View
					style={styles.cardviewView}>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 0 * alpha,
							right: 0 * alpha,
							top: 0 * alpha,
							bottom: 15 * alpha,
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
								style={styles.rmText}>{members.currency}</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.textText}>{parseFloat(members.credits).toFixed(2)}</Text>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<TouchableOpacity
							onPress={this.onTopUpPressed}
							style={styles.topUpButton}>
							<Text
								style={styles.topUpButtonText}>Top Up</Text>
						</TouchableOpacity>
					</View>
					<View
						style={styles.optionsView}>
						<View
							style={styles.seperatorView}/>
						<View
							style={styles.transactionHistoryView}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0 * alpha,
									right: 0 * alpha,
									top: 0 * alpha,
									bottom: 0 * alpha,
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
									right: 10 * alpha,
									width: 356 * alpha,
									top: 21 * alpha,
									height: 33 * alpha,
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
									left: 0 * alpha,
									top: 0 * alpha,
									bottom: 0 * alpha,
									justifyContent: "center",
								}}>
								<Text
									style={styles.transactionHistoryText}>Transaction History</Text>
							</View>
						</View>
						<View
							style={styles.faqView}>
							<TouchableOpacity
								onPress={this.onFaqPressed}
								style={styles.faqButton}>
								<Text
									style={styles.faqButtonText}></Text>
							</TouchableOpacity>
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
									style={styles.groupTwoImage}/>
								<View
									style={styles.seperatorThreeView}/>
							</View>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0 * alpha,
									top: 0 * alpha,
									bottom: 0 * alpha,
									justifyContent: "center",
								}}>
								<Text
									style={styles.faqText}>FAQ</Text>
							</View>
						</View>
						{/*<View*/}
						{/*	style={styles.changePasswordView}>*/}
						{/*	<View*/}
						{/*		pointerEvents="box-none"*/}
						{/*		style={{*/}
						{/*			position: "absolute",*/}
						{/*			right: 10 * alpha,*/}
						{/*			width: 356 * alpha,*/}
						{/*			top: 19 * alpha,*/}
						{/*			height: 34 * alpha,*/}
						{/*			alignItems: "center",*/}
						{/*		}}>*/}
						{/*		<Image*/}
						{/*			source={require("./../../assets/images/group-2.png")}*/}
						{/*			style={styles.groupThreeImage}/>*/}
						{/*		<View*/}
						{/*			style={styles.seperatorFourView}/>*/}
						{/*	</View>*/}
						{/*	<View*/}
						{/*		pointerEvents="box-none"*/}
						{/*		style={{*/}
						{/*			position: "absolute",*/}
						{/*			left: 0 * alpha,*/}
						{/*			top: 0 * alpha,*/}
						{/*			bottom: 0 * alpha,*/}
						{/*			justifyContent: "center",*/}
						{/*		}}>*/}
						{/*		<Text*/}
						{/*			style={styles.changePasswordText}>Change Password</Text>*/}
						{/*	</View>*/}
						{/*</View>*/}
						{/*<View*/}
						{/*	style={styles.resetPasswordView}>*/}
						{/*	<View*/}
						{/*		pointerEvents="box-none"*/}
						{/*		style={{*/}
						{/*			position: "absolute",*/}
						{/*			right: 10 * alpha,*/}
						{/*			width: 356 * alpha,*/}
						{/*			top: 22 * alpha,*/}
						{/*			height: 32 * alpha,*/}
						{/*			alignItems: "center",*/}
						{/*		}}>*/}
						{/*		<Image*/}
						{/*			source={require("./../../assets/images/group-2.png")}*/}
						{/*			style={styles.groupFourImage}/>*/}
						{/*		<View*/}
						{/*			style={styles.seperatorFiveView}/>*/}
						{/*	</View>*/}
						{/*	<View*/}
						{/*		pointerEvents="box-none"*/}
						{/*		style={{*/}
						{/*			position: "absolute",*/}
						{/*			left: 0 * alpha,*/}
						{/*			top: 0 * alpha,*/}
						{/*			bottom: 0 * alpha,*/}
						{/*			justifyContent: "center",*/}
						{/*		}}>*/}
						{/*		<Text*/}
						{/*			style={styles.resetPasswordText}>Reset Password</Text>*/}
						{/*	</View>*/}
						{/*</View>*/}
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
	walletView: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	viewScrollView: {
		backgroundColor: "transparent",
		flex: 1,
		marginBottom: 1 * alpha,
	},
	cardviewView: {
		backgroundColor: "transparent",
		height: 211 * alpha,
		marginLeft: 0 * alpha,
		marginRight: 0 * alpha,
	},
	greyblockView: {
		backgroundColor: "rgb(248, 248, 248)",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 123 * alpha,
	},
	rightblockView: {
		backgroundColor: "white",
		borderRadius: 10 * alpha,
		shadowColor: "rgba(144, 144, 144, 0.5)",
		shadowRadius: 2 * alpha,
		shadowOpacity: 1,
		position: "absolute",
		right: -12 * alpha,
		width: 24 * alpha,
		top: 52 * alpha,
		bottom: 0 * alpha,
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
		height: 378 * alpha,
		marginRight: 10 * alpha,
	},
	balanceView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 158 * alpha,
		height: 113 * alpha,
		marginTop: 16 * alpha,
		alignItems: "center",
	},
	availableBalanceText: {
		color: "rgb(58, 58, 58)",
		fontFamily: "SFProText-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	rm30View: {
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 51 * alpha,
		height: 34 * alpha,
		marginLeft: 45 * alpha,
		marginTop: 7 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	currencyText: {
		backgroundColor: "transparent",
		color: "rgb(58, 58, 58)",
		fontFamily: "SFProText-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		alignSelf: "flex-start",
		marginTop: 7 * alpha,
	},
	userCreditText: {
		backgroundColor: "transparent",
		color: "rgb(58, 58, 58)",
		fontFamily: "DINPro-Bold",
		fontSize: 27 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	topUpButton: {
		backgroundColor: "rgb(70, 70, 70)",
		borderRadius: 3 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 158 * alpha,
		height: 36 * alpha,
	},
	topUpButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	topUpButtonText: {
		color: "white",
		fontFamily: "SFProText-Medium",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	optionsView: {
		backgroundColor: "transparent",
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
		height: 51 * alpha,
		marginLeft: 1 * alpha,
		marginRight: 1 * alpha,
	},
	transactionhistoryButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 51 * alpha,
	},
	transactionhistoryButtonText: {
		color: "black",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	transactionhistoryButtonImage: {
		resizeMode: "contain",
	},
	groupImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		alignSelf: "flex-end",
		width: 9 * alpha,
		height: 10 * alpha,
		marginRight: 11 * alpha,
	},
	seperatorTwoView: {
		backgroundColor: "rgb(244, 244, 244)",
		width: 356 * alpha,
		height: 1 * alpha,
		marginTop: 22 * alpha,
	},
	transactionHistoryText: {
		backgroundColor: "transparent",
		color: "rgb(41, 41, 41)",
		fontFamily: "SFProText-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 20 * alpha,
	},
	faqView: {
		backgroundColor: "transparent",
		height: 51 * alpha,
		marginRight: 1 * alpha,
	},
	faqButtonImage: {
		resizeMode: "contain",
	},
	faqButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 51 * alpha,
	},
	faqButtonText: {
		color: "white",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	groupTwoImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		alignSelf: "flex-end",
		width: 9 * alpha,
		height: 10 * alpha,
		marginRight: 10 * alpha,
	},
	seperatorThreeView: {
		backgroundColor: "rgb(244, 244, 244)",
		width: 354 * alpha,
		height: 1 * alpha,
		marginTop: 17 * alpha,
	},
	faqText: {
		color: "rgb(41, 41, 41)",
		fontFamily: "SFProText-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 20 * alpha,
	},
	changePasswordView: {
		backgroundColor: "transparent",
		height: 51 * alpha,
	},
	groupThreeImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		alignSelf: "flex-end",
		width: 9 * alpha,
		height: 10 * alpha,
		marginRight: 11 * alpha,
	},
	seperatorFourView: {
		backgroundColor: "rgb(244, 244, 244)",
		width: 356 * alpha,
		height: 1 * alpha,
		marginTop: 23 * alpha,
	},
	changePasswordText: {
		color: "rgb(41, 41, 41)",
		fontFamily: "SFProText-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 20 * alpha,
	},
	resetPasswordView: {
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
		width: 356 * alpha,
		height: 1 * alpha,
	},
	resetPasswordText: {
		backgroundColor: "transparent",
		color: "rgb(41, 41, 41)",
		fontFamily: "SFProText-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 20 * alpha,
	},
})
