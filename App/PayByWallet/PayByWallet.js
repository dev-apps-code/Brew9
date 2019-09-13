//
//  PayByWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {StyleSheet, Image, Text, View, TouchableOpacity} from "react-native"
import React from "react"
import {alpha, fontAlpha} from "../common/size";


export default class PayByWallet extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Pay By Wallet",
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
				style={styles.walletPaymentView}>
				<View
					style={styles.topiconsView}>
					<View
						style={styles.iconView}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0,
								right: 0,
								top: 0,
								height: 55 * alpha,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<View
								style={styles.group9View}>
								<Image
									source={require("./../../assets/images/group-3-14.png")}
									style={styles.group3Image}/>
								<View
									pointerEvents="box-none"
									style={{
										height: 36 * alpha,
									}}>
									<Image
										source={require("./../../assets/images/group-6-8.png")}
										style={styles.group6Image}/>
									<Image
										source={require("./../../assets/images/fill-7-5.png")}
										style={styles.fill7Image}/>
								</View>
							</View>
							<Image
								source={require("./../../assets/images/group-13-7.png")}
								style={styles.group13Image}/>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								style={styles.group6View}>
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
									<Image
										source={require("./../../assets/images/group-3-15.png")}
										style={styles.group3TwoImage}/>
								</View>
								<Image
									source={require("./../../assets/images/fill-4-2.png")}
									style={styles.fill4Image}/>
							</View>
							<Image
								source={require("./../../assets/images/group-12-10.png")}
								style={styles.group12Image}/>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								alignSelf: "center",
								top: 0,
								bottom: 0,
								justifyContent: "center",
							}}>
							<Image
								source={require("./../../assets/images/group-14-11.png")}
								style={styles.group14Image}/>
						</View>
					</View>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						height: 557 * alpha,
					}}>
					<View
						style={styles.walletBalanceView}>
						<Image
							source={require("./../../assets/images/profile-pic-5.png")}
							style={styles.profilePicImage}/>
						<Text
							style={styles.nicknameText}>Somebody</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.payByWalletView}>
							<View
								style={styles.selectView}/>
							<Text
								style={styles.payByBrew9WalletText}>Pay by Brew9 wallet</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.balanceText}>(Balance RM0)</Text>
						</View>
						<Image
							source={require("./../../assets/images/line-12.png")}
							style={styles.lineImage}/>
					</View>
					<View
						style={styles.qrCodeViewView}>
						<Text
							style={styles.scanQrcodeToEarnText}>Scan QRCode to earn point (Payment not supported)</Text>
						<Image
							source={require("./../../assets/images/qr-code-2.png")}
							style={styles.qrCodeImage}/>
						<Text
							style={styles.autoText}>Auto refresh every 30 seconds</Text>
					</View>
				</View>
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
	walletPaymentView: {
		backgroundColor: "white",
		flex: 1,
	},
	topiconsView: {
		backgroundColor: "rgb(216, 216, 216)",
		height: 130 * alpha,
		alignItems: "flex-end",
	},
	iconView: {
		backgroundColor: "transparent",
		width: 293 * alpha,
		height: 55 * alpha,
		marginRight: 38 * alpha,
		marginTop: 21 * alpha,
	},
	group9View: {
		backgroundColor: "transparent",
		width: 26 * alpha,
		height: 53 * alpha,
	},
	group3Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 16 * alpha,
		marginLeft: 9 * alpha,
		marginRight: 9 * alpha,
	},
	group6Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 36 * alpha,
	},
	fill7Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		position: "absolute",
		left: 9 * alpha,
		right: 8 * alpha,
		top: 17 * alpha,
		height: 10 * alpha,
	},
	group13Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		alignSelf: "flex-start",
		width: 40 * alpha,
		height: 43 * alpha,
		marginLeft: 32 * alpha,
		marginTop: 12 * alpha,
	},
	group6View: {
		backgroundColor: "transparent",
		width: 31 * alpha,
		height: 52 * alpha,
		marginRight: 33 * alpha,
	},
	group3TwoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 52 * alpha,
		marginLeft: 1 * alpha,
	},
	fill4Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 8 * alpha,
		right: 9 * alpha,
		top: 25 * alpha,
		height: 14 * alpha,
	},
	group12Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		alignSelf: "flex-start",
		width: 34 * alpha,
		height: 42 * alpha,
		marginTop: 12 * alpha,
	},
	group14Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 32 * alpha,
		height: 48 * alpha,
	},
	walletBalanceView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 129 * alpha,
		alignItems: "center",
	},
	profilePicImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 73 * alpha,
		height: 73 * alpha,
	},
	nicknameText: {
		backgroundColor: "transparent",
		color: "rgb(69, 67, 67)",
		fontFamily: "Helvetica-Bold",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginTop: 10 * alpha,
	},
	payByWalletView: {
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 253 * alpha,
		height: 17 * alpha,
		marginRight: 58 * alpha,
		marginBottom: 20 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	selectView: {
		backgroundColor: "transparent",
		borderRadius: 8 * alpha,
		borderWidth: 1,
		borderColor: "rgb(208, 205, 205)",
		borderStyle: "solid",
		width: 16 * alpha,
		height: 16 * alpha,
	},
	payByBrew9WalletText: {
		color: "rgb(69, 67, 67)",
		fontFamily: "Helvetica-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 10 * alpha,
	},
	balanceText: {
		color: "rgb(186, 179, 179)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	lineImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		alignSelf: "flex-end",
		width: 275 * alpha,
		height: 3 * alpha,
		marginRight: 40 * alpha,
	},
	qrCodeViewView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0,
		right: 0,
		top: 128 * alpha,
		height: 429 * alpha,
		alignItems: "center",
	},
	scanQrcodeToEarnText: {
		color: "rgb(62, 61, 61)",
		fontFamily: "Helvetica-Bold",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 44 * alpha,
	},
	qrCodeImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 161 * alpha,
		height: 163 * alpha,
		marginTop: 19 * alpha,
	},
	autoText: {
		color: "rgb(192, 192, 192)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 9 * alpha,
	},
})
