//
//  MemberWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native"
import React from "react"
import { connect } from "react-redux";
import { KURL_INFO } from "../Utils/server";

import { alpha, fontAlpha } from "../Common/size";
import { TITLE_FONT, NON_TITLE_FONT } from "../Common/common_style";

import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from "../Common/config"
import { getMemberIdForApi } from '../Services/members_helper'

@connect(({ members }) => ({
	members: members.profile,
	company_id: members.company_id,
}))
export default class MemberWallet extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			headerTitle: <Text style={{ textAlign: 'center', alignSelf: "center", fontFamily: TITLE_FONT }}>Brew9 Inspiration</Text>,
			headerTintColor: "black",
			headerLeft: <View
				style={styles.headerLeftContainer}>
				<TouchableOpacity
					onPress={params.onBackPressed ? params.onBackPressed : () => null}
					style={styles.navigationBarItem}>
					<Image
						source={require("./../../assets/images/back.png")}
						style={styles.navigationBarItemIcon} />
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

	onFaqPressed = async() => {
		const { navigate } = this.props.navigation
		const { company_id, members } = this.props
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('More', getMemberIdForApi(members), 'FAQs'))

		navigate("WebCommon", {
			title: 'FAQs',
			web_url: await KURL_INFO() + '?page=faqs&id=' + company_id,
		})
	}

	onFeedbackPressed = () => {
		const { members } = this.props
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('More', getMemberIdForApi(members), 'Feedback'))

		Linking.openURL('mailto:feedback@brew9.co')
	}

	render() {

		const { members } = this.props

		return <View
			style={styles.walletView}>
			<ScrollView
				style={styles.viewScrollView}>

				<View
					style={styles.menuView}>

					<TouchableOpacity
						onPress={() => this.onFaqPressed()}
						style={styles.menuRowbuttonButton}>
						<View
							style={styles.menuRowView}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0 * alpha,
									right: 0 * alpha,
									top: 0 * alpha,
									bottom: 0,
									justifyContent: "center",
								}}>
								<View
									pointerEvents="box-none"
									style={{
										height: 24 * alpha,
										marginLeft: 20 * alpha,
										marginRight: 20 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={styles.menuRowLabelText}>FAQs</Text>
									<View
										style={{
											flex: 1,
										}} />
									<Image
										source={require("./../../assets/images/next.png")}
										style={styles.menuRowArrowImage} />
								</View>
							</View>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0 * alpha,
									right: 0 * alpha,
									top: 0 * alpha,
									bottom: 0,
								}}>

								<Text
									style={styles.menuRowDescriptionText}></Text>

								<View
									style={styles.menuRowLineView} />
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.onFeedbackPressed()}
						style={styles.menuRowbuttonButton}>
						<View
							style={styles.menuRowView}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0 * alpha,
									right: 0 * alpha,
									top: 0 * alpha,
									bottom: 0,
									justifyContent: "center",
								}}>
								<View
									pointerEvents="box-none"
									style={{
										height: 24 * alpha,
										marginLeft: 20 * alpha,
										marginRight: 20 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={styles.menuRowLabelText}>Feedback</Text>
									<View
										style={{
											flex: 1,
										}} />
									<Image
										source={require("./../../assets/images/next.png")}
										style={styles.menuRowArrowImage} />
								</View>
							</View>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0 * alpha,
									right: 0 * alpha,
									top: 0 * alpha,
									height: 58 * alpha,
								}}>
							</View>
						</View>
					</TouchableOpacity>
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
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
	},
	navigationBarItemIcon: {
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
	walletView: {
		backgroundColor: "white",
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
		flex: 1,
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
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		alignItems: "center",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	creditView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 200 * alpha,
		height: 34 * alpha,
		marginTop: 7 * alpha,
		alignItems: "center",
	},
	textText: {
		backgroundColor: "transparent",
		color: "rgb(58, 58, 58)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
		marginTop: 7 * alpha,
	},
	currencyText: {
		backgroundColor: "transparent",
		color: "rgb(58, 58, 58)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
		alignSelf: "flex-start",
		marginTop: 7 * alpha,
	},
	userCreditText: {
		backgroundColor: "transparent",
		color: "rgb(58, 58, 58)",
		fontFamily: TITLE_FONT,
		fontSize: 27 * fontAlpha,
		fontStyle: "normal",

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
		fontFamily: NON_TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",

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

	seperatorTwoView: {
		backgroundColor: "rgb(244, 244, 244)",
		width: 356 * alpha,
		height: 1 * alpha,
		marginTop: 22 * alpha,
	},
	transactionHistoryText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",

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
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},

	seperatorThreeView: {
		backgroundColor: "rgb(244, 244, 244)",
		width: 354 * alpha,
		height: 1 * alpha,
		marginTop: 17 * alpha,
	},
	faqText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",

		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 20 * alpha,
	},
	changePasswordView: {
		backgroundColor: "transparent",
		height: 51 * alpha,
	},

	seperatorFourView: {
		backgroundColor: "rgb(244, 244, 244)",
		width: 356 * alpha,
		height: 1 * alpha,
		marginTop: 23 * alpha,
	},
	changePasswordText: {
		color: "rgb(41, 41, 41)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",

		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 20 * alpha,
	},
	resetPasswordView: {
		backgroundColor: "transparent",
		height: 51 * alpha,
		marginRight: 1 * alpha,
	},

	seperatorFiveView: {
		backgroundColor: "rgb(244, 244, 244)",
		width: 356 * alpha,
		height: 1 * alpha,
	},
	resetPasswordText: {
		backgroundColor: "transparent",
		color: "rgb(41, 41, 41)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
		marginLeft: 20 * alpha,
	},

	menuView: {
		backgroundColor: "transparent",
		flex: 1,
		marginTop: 13 * alpha,
		marginBottom: 13 * alpha,
	},

	menuRowView: {
		backgroundColor: "transparent",
		height: 58 * alpha,
		marginRight: 1 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	menuRowLabelText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	menuRowDisableLabelText: {
		color: "rgb(188, 188, 188)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	menuRowDescriptionText: {
		color: "rgb(188, 188, 188)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginRight: 23 * alpha,
	},
	arrowTwoView: {
		backgroundColor: "transparent",
		width: 7 * alpha,
		height: 8 * alpha,
	},
	menuRowbuttonButton: {
		backgroundColor: "transparent",
		flex: 1,
	},

	menuRowLineView: {
		backgroundColor: "rgb(245, 245, 245)",
		position: "absolute",
		alignSelf: "center",
		width: 375 * alpha,
		top: 57 * alpha,
		height: 1 * alpha,
		left: 20 * alpha,
	},

	menuRowArrowImage: {
		width: 10 * alpha,
		tintColor: "rgb(195, 195, 195)",
		resizeMode: "contain",
	},
})
