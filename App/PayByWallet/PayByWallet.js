//
//  PayByWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, ActivityIndicator} from "react-native"
import React from "react"
import {alpha, fontAlpha} from "../Common/size";
import {connect} from "react-redux";
import QrCodeRequestObject from "../Requests/qr_code_request_object";
import {createAction} from "../Utils";
import QRCode from 'react-native-qrcode-svg';

@connect(({ members }) => ({
	members: members.profile
}))
export default class PayByWallet extends React.Component {

	timer = null

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "QR Code",
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
		this.state = {
			loading: true,
			qr_code: null,
		}
	}

	componentDidMount() {
		this.loadQrCode()
		this.timer = setInterval(()=> this.loadQrCode(), 30000)
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	onBackPressed = () => {
		this.props.navigation.goBack()
	}

	loadQrCode(){
		const { dispatch, members } = this.props
		this.setState({ loading_list: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					loading: false,
					qr_code: eventObject.result.code
				})
			}
		}
		const obj = new QrCodeRequestObject()
		obj.setUrlId(members.id)
		dispatch(
			createAction('members/loadQrCode')({
				object:obj,
				callback,
			})
		)
	}

	onSelectWalletPressed = () => {

	}

	render() {

		const { members } = this.props

		return <View
			style={styles.walletPaymentView}>
			<ScrollView
				style={styles.scrollviewScrollView}>
				<View
					style={styles.topiconsView}>
					<View
						style={styles.iconView}>
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
									source={require("./../../assets/images/group-6-11.png")}
									style={styles.group6Image}/>
								<Image
									source={require("./../../assets/images/fill-7-6.png")}
									style={styles.fill7Image}/>
							</View>
						</View>
						<Image
							source={require("./../../assets/images/group-13-10.png")}
							style={styles.group13Image}/>
						<Image
							source={require("./../../assets/images/group-14-12.png")}
							style={styles.group14Image}/>
						<View
							style={styles.group6View}>
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
								<Image
									source={require("./../../assets/images/group-3-24.png")}
									style={styles.group3TwoImage}/>
							</View>
							<Image
								source={require("./../../assets/images/fill-4-3.png")}
								style={styles.fill4Image}/>
						</View>
						<Image
							source={require("./../../assets/images/group-12-12.png")}
							style={styles.group12Image}/>
					</View>
				</View>
				<View
					style={styles.walletBalanceView}>
					<Image
						source={members.image ? {uri: members.image} : require("./../../assets/images/avatar.png")}
						style={styles.profilePicImage}/>
					<Text
						style={styles.nicknameText}>{
							members.name ? members.name : 
							members.nickname ? members.nickname :
							members.phone_no ? members.phone_no : 
							members.facebook_id 
						}</Text>
					<View
						style={styles.payByWalletView}>
						{members.wallet_enabled && (<TouchableOpacity
								onPress={this.onSelectWalletPressed}
								style={styles.selectwalletButton}>
								<Text
									style={styles.selectwalletButtonText}></Text>
							</TouchableOpacity>
						)}
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0 * alpha,
								top: 0 * alpha,
								bottom: 0 * alpha,
								justifyContent: "center",
							}}>
							<View
								pointerEvents="box-none"
								style={{
									width: 253 * alpha,
									height: 17 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<View
									style={styles.selectView}/>
								<Text
									style={members.wallet_enabled ? styles.payByBrew9WalletText : styles.payByBrew9WalletTextDisabled}>Pay by Brew9 wallet</Text>
								<Text
									style={styles.balanceText}>(Balance {members.currency}{members.member_credits})</Text>
							</View>
						</View>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<Image
						source={require("./../../assets/images/line-12-2.png")}
						style={styles.lineImage}/>
				</View>
				<View
					style={styles.qrCodeViewView}>
					<Text
						style={styles.scanQrcodeToEarnText}>Scan QRCode to earn point (Payment not supported)</Text>
						{ this.state.qr_code ? <QRCode
							value={this.state.qr_code}
							size={161 * alpha}
							bgColor='black'
							fgColor='white'/>
						:	<View style={[styles.container, styles.horizontal]}>
								<ActivityIndicator size="large" />
							</View>
						}
					<Text
						style={styles.autoText}>Auto refresh every 30 seconds</Text>
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
	container: {
		height: 160 * alpha,
		width: 160 * alpha,
		justifyContent: 'center',
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10 * alpha,
	},
	scrollviewScrollView: {
		backgroundColor: "transparent",
		flex: 1,
	},
	walletPaymentView: {
		backgroundColor: "white",
		flex: 1,
	},
	topiconsView: {
		backgroundColor: "rgb(216, 216, 216)",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 130 * alpha,
	},
	iconView: {
		backgroundColor: "transparent",
		height: 55 * alpha,
		marginLeft: 44 * alpha,
		marginRight: 38 * alpha,
		marginTop: 21 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
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
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 36 * alpha,
	},
	fill7Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 9 * alpha,
		right: 8 * alpha,
		top: 17 * alpha,
		height: 10 * alpha,
	},
	group13Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 40 * alpha,
		height: 43 * alpha,
		marginLeft: 32 * alpha,
		marginTop: 12 * alpha,
	},
	group14Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 32 * alpha,
		height: 48 * alpha,
		marginLeft: 33 * alpha,
		marginTop: 5 * alpha,
	},
	group6View: {
		backgroundColor: "transparent",
		width: 31 * alpha,
		height: 52 * alpha,
		marginLeft: 32 * alpha,
		marginTop: 3 * alpha,
	},
	group3TwoImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 52 * alpha,
		marginLeft: 1 * alpha,
	},
	fill4Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		position: "absolute",
		left: 8 * alpha,
		right: 9 * alpha,
		top: 25 * alpha,
		height: 14 * alpha,
	},
	group12Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 34 * alpha,
		height: 42 * alpha,
		marginLeft: 33 * alpha,
		marginTop: 12 * alpha,
	},
	walletBalanceView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 92 * alpha,
		height: 167 * alpha,
		alignItems: "center",
	},
	profilePicImage: {
		resizeMode: "cover",
		backgroundColor: "rgb(164, 163, 163)",
		borderRadius: 37 * alpha,
		width: 74 * alpha,
		height: 74 * alpha,
	},
	nicknameText: {
		color: "rgb(69, 67, 67)",
		fontFamily: "SFProText-Medium",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 10 * alpha,
	},
	payByWalletView: {
		backgroundColor: "transparent",
		alignSelf: "stretch",
		height: 17 * alpha,
		marginLeft: 64 * alpha,
		marginRight: 58 * alpha,
		marginTop: 27 * alpha,
	},
	selectwalletButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		bottom: 0 * alpha,
	},
	selectwalletButtonImage: {
		resizeMode: "contain",
	},
	selectwalletButtonText: {
		color: "white",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
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
		fontFamily: "SFProText-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 10 * alpha,
	},
	payByBrew9WalletTextDisabled: {
		color: "rgb(186, 179, 179)",
		fontFamily: "SFProText-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 10 * alpha,
	},
	balanceText: {
		backgroundColor: "transparent",
		color: "rgb(186, 179, 179)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 6 * alpha,
	},
	lineImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		alignSelf: "stretch",
		width: null,
		height: 3 * alpha,
		marginLeft: 60 * alpha,
		marginRight: 40 * alpha,
	},
	qrCodeViewView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 238 * alpha,
		height: 429 * alpha,
		alignItems: "center",
	},
	scanQrcodeToEarnText: {
		color: "rgb(62, 61, 61)",
		fontFamily: "SFProText-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 44 * alpha,
		marginBottom: 19 * alpha,
	},
	autoText: {
		backgroundColor: "transparent",
		color: "rgb(192, 192, 192)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 9 * alpha,
	},
})
