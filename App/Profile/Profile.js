//
//  Profile
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import {connect} from "react-redux";
import {KURL_INFO} from "../Utils/server";
import {createAction} from '../Utils'
import ProfileRequestObject from '../Requests/profile_request_object.js'
@connect(({ members }) => ({
	members:members,
	company_id:members.company_id,
	currentMember: members.profile,
	free_membership: members.free_membership,
	premium_membership: members.premium_membership
}))
export default class Profile extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			header: null,
			headerLeft: null,
			headerRight: null,
		}
	}

	static tabBarItemOptions = ({ navigation }) => {

		return {
			tabBarLabel: "Profile",
			tabBarIcon: ({ iconTintColor, focused }) => {
				const image = focused 
				? require('./../../assets/images/profile_selected.png') 
				: require('./../../assets/images/profile.png')

				return <Image
					source={image}
					style={{resizeMode: "contain", width: 30 * alpha, height: 30 * alpha }}/>
			},
		}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.loadProfile()	
	}

	loadProfile(){
		const { dispatch, currentMember } = this.props
		this.setState({ loading: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					loading: false,
				})
			}
		}
		const obj = new ProfileRequestObject()
		if (currentMember != null){
			obj.setUrlId(currentMember.id)
		}
		
		dispatch(
			createAction('members/loadProfile')({
				object:obj,
				callback,
			})
		)
	}

	onLevelPressed = () => {

		const { navigate } = this.props.navigation

		navigate("MemberProfile")
	}

	onVIPPressed = () => {
		const {  currentMember } = this.props

		if (currentMember.premium_membership) {
			const { navigate } = this.props.navigation

			navigate("MemberCenter")
		}
		else {
			const { navigate } = this.props.navigation

			navigate("VIPPurchase")
		}

	}

	onRewardButtonPressed = () => {

		const { navigate } = this.props.navigation

		navigate("MemberReward")
	}

	onPointButtonPressed = () => {

		const { navigate } = this.props.navigation

		navigate("PointHistory")
	}

	onWalletButtonPressed = () => {

		const { navigate } = this.props.navigation

		navigate("MemberWallet")
	}

	onMemberButtonPressed = () => {

		const { navigate } = this.props.navigation

		navigate("MemberProfile")
	}

	onOrderButtonPressed = () => {

		const { navigate } = this.props.navigation

		navigate("OrderHistory")
	}

	onPersonalButtonPressed = () => {

		const { navigate } = this.props.navigation

		navigate("MemberProfile")
	}

	onQRButtonPressed = () => {
		const { navigate } = this.props.navigation

		navigate("PayByWallet")
	}

	onRedeemButtonPressed = () => {
		const { navigate } = this.props.navigation

		navigate("RedeemPromotion")
	}

	onPointShopPressed = () => {
		const { navigate } = this.props.navigation

		navigate("PointShop")
	}

	onClubPressed = () => {
		const { navigate } = this.props.navigation

		navigate("MemberCenter")
	}

	onAboutButtonPressed = () => {
		const { navigate } = this.props.navigation
		const {  company_id } = this.props

		navigate("WebCommon", {
			title: 'About Brew9',
			web_url: KURL_INFO + '?page=faqs&id=' + company_id,
		})
	}

	render() {

		const { currentMember ,members} = this.props

		var background_photo;
		var level_name;
		var display_name;
		var points;
		var avatar;
		var vouchers_count;
		if (currentMember != null ){
			console.log("current mem",currentMember.id)
			background_photo =    {uri:currentMember.free_membership.membership_level.image}
			level_name = currentMember.premium_membership ? currentMember.premium_membership.membership_level.name : currentMember.free_membership.membership_level.name
			display_name = currentMember.name ? currentMember.name : currentMember.phone_no
			points = currentMember.points
			avatar = {uri: currentMember.image}
			vouchers_count = currentMember.voucher_items_count
			credits = parseFloat(currentMember.credits).toFixed(2)
		}else{
			background_photo =  {uri:''}
			level_name = ''
			display_name = 'Brew 9'
			points = 0
			avatar = require("./../../assets/images/avatar.png")
			vouchers_count = 0
			credits = 0
		}


		return (<View
			style={styles.profileView}>
				<ScrollView
					style={styles.scrollScrollView}>
					<View
						style={styles.topsectionView}>
						<Image
							source={ background_photo }
							style={styles.backgroundImage}/>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0,
								right: 0,
								top: 49 * alpha,
								height: 146 * alpha,
							}}>
							<View
								pointerEvents="box-none"
								style={{
									height: 58 * alpha,
									marginLeft: 21 * alpha,
									marginRight: 21 * alpha,
									flexDirection: "row",
									alignItems: "flex-start",
								}}>
								<Image
									source={avatar} 
									style={styles.profilePicImage}/>
								<View
									pointerEvents="box-none"
									style={{
										width: 150 * alpha,
										height: 48 * alpha,
										marginLeft: 9 * alpha,
										marginTop: 4 * alpha,
										alignItems: "flex-start",
									}}>
									<Text
										style={styles.nameText}>{ display_name}</Text>
									<TouchableOpacity
										onPress={this.onLevelPressed}
										style={styles.levelButton}>
										<Text
											style={styles.levelButtonText}>{level_name}</Text>
									</TouchableOpacity>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								{/* <View
									pointerEvents="box-none"
									style={{
										width: 105 * alpha,
										height: 51 * alpha,
										marginTop: 5 * alpha,
										alignItems: "flex-end",
									}}>
									<Text
										style={styles.memberText}></Text>
									<TouchableOpacity
										onPress={this.onVIPPressed}
										style={styles.vipButton}>
										<Text
											style={styles.vipButtonText}>{ members.premium_membership ? "Expired at " + members.premium_membership.expiry_date : "Purchase Membership" }</Text>
										<Image
											source={require("./../../assets/images/arrow-2.png")}
											style={styles.vipButtonImage}/>
									</TouchableOpacity>
								</View> */}
							</View>
							<View
								style={styles.memberpointsinfoView}>
								<View
									style={styles.pointviewView}>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											alignSelf: "center",
											width: 37 * alpha,
											top: 0,
											height: 47 * alpha,
											alignItems: "center",
										}}>
										<Text
											style={styles.pointvalueText}>{points}</Text>
										<Text
											style={styles.pointText}>Point</Text>
									</View>
									<TouchableOpacity
										onPress={this.onPointButtonPressed}
										style={styles.pointbuttonButton}>
										<Text
											style={styles.pointbuttonButtonText}></Text>
									</TouchableOpacity>
								</View>
								<View
									style={styles.rewardviewView}>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											alignSelf: "center",
											width: 49 * alpha,
											top: 0,
											height: 47 * alpha,
											alignItems: "center",
										}}>
										<Text
											style={styles.rewardvalueText}>{vouchers_count}</Text>
										<Text
											style={styles.rewardText}>Voucher</Text>
									</View>
									<TouchableOpacity
										onPress={this.onRewardButtonPressed}
										style={styles.rewardbuttonButton}>
										<Text
											style={styles.rewardbuttonButtonText}></Text>
									</TouchableOpacity>
								</View>
								<View
									style={styles.walletviewView}>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											alignSelf: "center",
											width: 75 * alpha,
											top: 0,
											height: 47 * alpha,
											alignItems: "center",
										}}>
										<View
											style={styles.walletvalueView}>
											<Text
												style={styles.currencyText}>{members.currency}</Text>
											<Text
												style={styles.userCreditText}>{credits}</Text>
										</View>
										<Text
											style={styles.walletText}>Wallet</Text>
									</View>
									<TouchableOpacity
										onPress={this.onWalletButtonPressed}
										style={styles.buttonButton}>
										<Text
											style={styles.buttonButtonText}></Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
					<View
						style={styles.midsectionView}>
						<View
							style={styles.viewTwoView}>
							<TouchableOpacity
								onPress={this.onClubPressed}
								style={styles.clubbuttonButton}>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										alignSelf: "center",
										flex: 1,
										top: 17 * alpha,
										height: 55 * alpha,
										alignItems: "center",
									}}>
									<View
										style={styles.vipiconView}>
										<Image
											source={require("./../../assets/images/group-14-7.png")}
											style={styles.group8Image}/>
										{/* <View
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
												source={require("./../../assets/images/group-8-13.png")}
												style={styles.group8Image}/>
										</View> */}
									</View>
									<Text
										style={styles.vipClubText}>Member Center</Text>
								</View>

							</TouchableOpacity>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.viewView}>
							<TouchableOpacity
								onPress={this.onPointShopPressed}
								style={styles.pointshopbuttonButton}>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										alignSelf: "center",
										flex: 1,
										top: 22 * alpha,
										height: 50 * alpha,
										alignItems: "center",
									}}>
									<Image
										source={require("./../../assets/images/group-7-2.png")}
										style={styles.pointiconImage}/>
									<Text
										style={styles.pointRewardText}>Point Reward</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				<View
					style={styles.bottomsectionView}>
					<View
						style={styles.memberStatusView}>
						<TouchableOpacity
							onPress={this.onMemberButtonPressed}
							style={styles.memberbuttonButton}>
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
								<View
									pointerEvents="box-none"
									style={{
										height: 19 * alpha,
										marginLeft: 30 * alpha,
										marginRight: 30 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Image
										source={require("./../../assets/images/group-5-4.png")}
										style={styles.membericonImage}/>
									<Text
										style={styles.memberStatusText}>Member Status</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.upgradeMemberText}>Upgrade Member</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View
						style={styles.orderhistoryView}>
						<TouchableOpacity
							onPress={this.onOrderButtonPressed}
							style={styles.orderbuttonButton}>
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
								<View
									pointerEvents="box-none"
									style={{
										height: 22 * alpha,
										marginLeft: 30 * alpha,
										marginRight: 237 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Image
										source={require("./../../assets/images/group-9-5.png")}
										style={styles.ordericonImage}/>
									<Text
										style={styles.orderHistoryText}>Order History</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View
						style={styles.personalInfoView}>
						<TouchableOpacity
							onPress={this.onPersonalButtonPressed}
							style={styles.personalbuttonButton}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0,
									top: 0,
									bottom: 0,
									justifyContent: "center",
								}}>
								<View
									pointerEvents="box-none"
									style={{
										width: 107 * alpha,
										height: 20 * alpha,
										marginLeft: 30 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<View
										style={styles.personaliconView}>
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
												source={require("./../../assets/images/group-3-13.png")}
												style={styles.group3TwoImage}/>
										</View>
										<Image
											source={require("./../../assets/images/group-6-7.png")}
											style={styles.group6Image}/>
									</View>
									<Text
										style={styles.personalInfoText}>Personal Info</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View
						style={styles.qrCodeView}>
						<TouchableOpacity
							onPress={this.onQRButtonPressed}
							style={styles.qrbuttonButton}>

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
								<View
									pointerEvents="box-none"
									style={{
										height: 18 * alpha,
										marginLeft: 30 * alpha,
										marginRight: 30 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<View
										style={styles.qriconView}>
										<Image
											source={require("./../../assets/images/group-3-3.png")}
											style={styles.group3ThreeImage}/>
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
												source={require("./../../assets/images/clip-5-11.png")}
												style={styles.clip5Image}/>
										</View>
									</View>
									<Text
										style={styles.qrCodeText}>QR Code</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.qrDescriptionText}>Scan for reward or pay</Text>
								</View>
							</View>

						</TouchableOpacity>
					</View>
					{/* <View
						style={styles.redeemStationView}>
						<TouchableOpacity
							onPress={this.onRedeemButtonPressed}
							style={styles.redeembuttonButton}>

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
								<View
									pointerEvents="box-none"
									style={{
										height: 17 * alpha,
										marginLeft: 30 * alpha,
										marginRight: 30 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<View
										style={styles.redeemiconView}>
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
												source={require("./../../assets/images/group-5-5.png")}
												style={styles.group5Image}/>
										</View>
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
												source={require("./../../assets/images/stroke-6-2.png")}
												style={styles.stroke6Image}/>
										</View>
									</View>
									<Text
										style={styles.redeemStationText}>Redeem Award</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.redeemDescriptionText}>Redeem voucher</Text>
								</View>
							</View>

						</TouchableOpacity>
					</View> */}
					{/* <View
						style={styles.notificationView}>
						<TouchableOpacity
							onPress={this.onNotificationButtonPressed}
							style={styles.notificationbuttonButton}>

							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0,
									top: 0,
									bottom: 0,
									justifyContent: "center",
								}}>
								<View
									pointerEvents="box-none"
									style={{
										width: 97 * alpha,
										height: 20 * alpha,
										marginLeft: 30 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Image
										source={require("./../../assets/images/group-9-6.png")}
										style={styles.notificationiconImage}/>
									<Text
										style={styles.notificationText}>Notification</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View> */}

					<View
						style={styles.aboutView}>
						<TouchableOpacity
							onPress={this.onAboutButtonPressed}
							style={styles.aboutbuttonButton}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0,
									top: 0,
									bottom: 0,
									justifyContent: "center",
								}}>
								<View
									pointerEvents="box-none"
									style={{
										width: 97 * alpha,
										height: 20 * alpha,
										marginLeft: 30 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Image
										source={require("./../../assets/images/about.png")}
										style={styles.abouticonImage}/>
									<Text
										style={styles.aboutText}>About Brew9</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>)
	}
}

const styles = StyleSheet.create({
	profileView: {
		backgroundColor: "white",
		flex: 1,
	},
	scrollScrollView: {
		backgroundColor: "transparent",
		flex: 1,
	},
	topsectionView: {
		backgroundColor: "#EEEEEE",
		height: 213 * alpha,
	},
	backgroundImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 1,
		top: 0,
		width: "100%",
		height: 213 * alpha,
	},
	profilePicImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		borderRadius: 29 * alpha,
		width: 58 * alpha,
		height: 58 * alpha,
	},
	nameText: {
		backgroundColor: "transparent",
		color: "rgb(51, 49, 49)",
		fontFamily: "SFProText-Medium",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	levelButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	levelButton: {
		backgroundColor: "rgb(50, 50, 50)",
		borderRadius: 8.5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 60 * alpha,
		height: 17 * alpha,
		marginTop: 12 * alpha,
	},
	levelButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	memberText: {
		backgroundColor: "transparent",
		color: "rgb(51, 49, 49)",
		fontFamily: "SFProText-Medium",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	vipButtonText: {
		color: "rgb(108, 108, 108)",
		fontFamily: "SFProText-Medium",
		fontSize: 8 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	vipButton: {
		backgroundColor: "rgba(255, 253, 253, 0.28)",
		borderRadius: 10 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0 * alpha,
		width: 113 * alpha,
		height: 23 * alpha,
		marginTop: 10 * alpha,
	},
	vipButtonImage: {
		resizeMode: "contain",
		marginLeft: 7 * alpha,
	},
	memberpointsinfoView: {
		backgroundColor: "transparent",
		height: 47 * alpha,
		marginTop: 41 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	pointviewView: {
		backgroundColor: "transparent",
		width: 125 * alpha,
		height: 47 * alpha,
	},
	pointvalueText: {
		color: "rgb(32, 32, 32)",
		fontSize: 20 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	pointText: {
		color: "rgb(32, 32, 32)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 7 * alpha,
	},
	pointbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	pointbuttonButtonImage: {
		resizeMode: "contain",
	},
	pointbuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	rewardviewView: {
		backgroundColor: "transparent",
		flex: 1,
		alignSelf: "stretch",
	},
	rewardvalueText: {
		backgroundColor: "transparent",
		color: "rgb(32, 32, 32)",
		fontSize: 20 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	rewardText: {
		backgroundColor: "transparent",
		color: "rgb(32, 32, 32)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginTop: 7 * alpha,
	},
	rewardbuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	rewardbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	rewardbuttonButtonImage: {
		resizeMode: "contain",
	},
	walletviewView: {
		backgroundColor: "transparent",
		width: 125 * alpha,
		height: 47 * alpha,
		marginRight: 1,
	},
	walletvalueView: {
		backgroundColor: "transparent",
		width: 85 * alpha,
		height: 24 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	currencyText: {
		backgroundColor: "transparent",
		color: "rgb(32, 32, 32)",
		fontFamily: "Helvetica",
		fontSize: 8 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginTop: 12 * alpha,
	},
	userCreditText: {
		color: "rgb(32, 32, 32)",
		fontSize: 20 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		flex: 1,
		alignSelf: "center",
		marginLeft: 3 * alpha,
	},
	walletText: {
		backgroundColor: "transparent",
		color: "rgb(32, 32, 32)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginTop: 7 * alpha,
	},
	buttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	buttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	buttonButtonImage: {
		resizeMode: "contain",
	},
	midsectionView: {
		backgroundColor: "transparent",
		height: 90 * alpha,
		marginRight: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	viewView: {
		backgroundColor: "transparent",
		width: 146 * alpha,
		height: 90 * alpha,
		marginRight: 41 * alpha,
	},
	viewTwoView: {
		backgroundColor: "transparent",
		width: 146 * alpha,
		height: 90 * alpha,
		marginLeft: 41 * alpha,
	},
	pointshopbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0 * alpha,
		width: 146 * alpha,
		height: 90 * alpha,
	},
	pointshopbuttonButtonImage: {
		resizeMode: "contain",
	},
	pointshopbuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	clubbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	clubbuttonButtonImage: {
		resizeMode: "contain",
	},
	clubbuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	pointiconImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 28 * alpha,
		height: 27 * alpha,
	},
	pointRewardText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 7 * alpha,
	},
	vipiconView: {
		backgroundColor: "transparent",
		height: 31 * alpha,
	},
	group8Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		height: 44 * alpha,
	},
	vipClubText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 8 * alpha,
	},
	bottomsectionView: {
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		flex: 1,
		flexDirection: "column",
		width: 375 * alpha,
	},
	memberStatusView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
	},
	memberbuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	memberbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 50 * alpha,
	},
	memberbuttonButtonImage: {
		resizeMode: "contain",
	},
	membericonImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 19 * alpha,
		height: 19 * alpha,
	},
	memberStatusText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginLeft: 11 * alpha,
	},
	upgradeMemberText: {
		backgroundColor: "transparent",
		color: "rgb(184, 180, 180)",
		fontFamily: "SFProText-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	orderhistoryView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
	},
	orderbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 50 * alpha,
	},
	orderbuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	orderbuttonButtonImage: {
		resizeMode: "contain",
	},
	ordericonImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 15 * alpha,
		height: 22 * alpha,
	},
	orderHistoryText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		flex: 1,
		marginLeft: 15 * alpha,
	},
	personalInfoView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
	},
	personalbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 50 * alpha,
	},
	personalbuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	personalbuttonButtonImage: {
		resizeMode: "contain",
	},
	personaliconView: {
		backgroundColor: "transparent",
		width: 20 * alpha,
		height: 20 * alpha,
	},
	group3TwoImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 17 * alpha,
	},
	group6Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		position: "absolute",
		left: 3 * alpha,
		right: 4 * alpha,
		top: 1 * alpha,
		height: 6 * alpha,
	},
	personalInfoText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginLeft: 10 * alpha,
	},
	qrCodeView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
	},
	qrbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 50 * alpha,
	},
	qrbuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	qrbuttonButtonImage: {
		resizeMode: "contain",
	},
	qriconView: {
		backgroundColor: "transparent",
		width: 18 * alpha,
		height: 18 * alpha,
	},
	group3ThreeImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		position: "absolute",
		left: 0,
		right: 9 * alpha,
		top: 0,
		height: 9 * alpha,
	},
	clip5Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 19 * alpha,
	},
	qrCodeText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginLeft: 12 * alpha,
	},
	qrDescriptionText: {
		color: "rgb(184, 180, 180)",
		fontFamily: "SFProText-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	redeemStationView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
	},
	redeembuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 50 * alpha,
	},
	redeembuttonButtonImage: {
		resizeMode: "contain",
	},
	redeembuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	redeemiconView: {
		backgroundColor: "transparent",
		width: 20 * alpha,
		height: 17 * alpha,
	},
	group5Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 16 * alpha,
	},
	stroke6Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 8 * alpha,
		marginLeft: 14 * alpha,
		marginRight: 3 * alpha,
	},
	redeemStationText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginLeft: 10 * alpha,
	},
	redeemDescriptionText: {
		color: "rgb(184, 180, 180)",
		fontFamily: "SFProText-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	notificationView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
	},
	notificationbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 1 * alpha,
		right: 0,
		top: 0,
		height: 50 * alpha,
	},
	notificationbuttonButtonImage: {
		resizeMode: "contain",
	},
	notificationbuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	notificationiconImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 19 * alpha,
		height: 20 * alpha,
	},
	notificationText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 11 * alpha,
	},
	aboutView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
	},
	aboutbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 1 * alpha,
		right: 0,
		top: 0,
		height: 50 * alpha,
	},
	aboutbuttonButtonImage: {
		resizeMode: "contain",
	},
	aboutbuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	abouticonImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 19 * alpha,
		height: 20 * alpha,
	},
	aboutText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 11 * alpha,
	},
})
