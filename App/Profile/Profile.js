//
//  Profile
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowHeight } from "../Common/size";
import {connect} from "react-redux";
import {KURL_INFO} from "../Utils/server";
import {createAction} from '../Utils'
import ProfileRequestObject from '../Requests/profile_request_object'
import LogoutRequestObject from "../Requests/logout_request_object"
import Constants from 'expo-constants';
import {TITLE_FONT, NON_TITLE_FONT} from "../Common/common_style";

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

	loadDestroy(){
		const { dispatch } = this.props
		const { navigate } = this.props.navigation
		this.setState({ loading: true })

		const callback = eventObject => {
			if (eventObject.success) {
				navigate("VerifyStack")
			}
			this.setState({
				loading: false,
			}) 
		}
		const obj = new LogoutRequestObject(Constants.installationId)
		dispatch(
			createAction('members/loadDestroy')({
				object:obj,
				callback,
			})
		)
	}

	onLevelPressed = () => {

		const {  currentMember } = this.props
		if (currentMember !== null && currentMember.premium_membership) {
			const { navigate } = this.props.navigation

			navigate("MemberProfile")
		}
	}

	onMissionCenterPressed = () => {

		const {  currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("MissionCenter")
		}
	}

	onVIPPressed = () => {
		const { currentMember } = this.props

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
		const {  currentMember } = this.props
		const {validVouchers} = this.state

		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("MemberVoucher",{validVouchers:validVouchers})
			
		}		
	}

	onPointButtonPressed = () => {
		const {  currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("PointHistory")
		}
	}

	onWalletButtonPressed = () => {
		const {  currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("MemberWallet")
		}
	}

	onMemberButtonPressed = () => {
		const {  currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("MemberProfile")
		}
	}

	onOrderButtonPressed = () => {
		const {  currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("OrderHistory")
		}
	}

	onPersonalButtonPressed = () => {
		const { currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("MemberProfile")
		}
	}

	onQRButtonPressed = () => {
		const {  currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("PayByWallet")
		}
	}

	onRedeemButtonPressed = () => {
		const {  currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("RedeemPromotion")
		}
	}

	onPointShopPressed = () => {
		const {  currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("PointShop")
		}
	}

	onClubPressed = () => {
		const {  currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("MemberCenter")
		}
	}

	onAboutButtonPressed = () => {
		const { navigate } = this.props.navigation
		const {  company_id } = this.props

		navigate("WebCommon", {
			title: 'About Brew9',
			web_url: KURL_INFO + '?page=faqs&id=' + company_id,
		})
	}

	onLogoutButtonPress = () => {
		const {  currentMember } = this.props

		if (currentMember !== null) {
			this.loadDestroy()
		}else{
			const { navigate } = this.props.navigation
			navigate("VerifyStack")
			return
		}
	}

	render() {

		const { currentMember ,members} = this.props
		var background_photo;
		var level_name;
		var display_name;
		var points;
		var avatar;
		var isLogin = true;

		var vouchers_count;
		if (currentMember != null ){
			background_photo =    {uri: currentMember.free_membership != null ? currentMember.free_membership.membership_level.image : ''}
			level_name = currentMember.premium_membership ? currentMember.premium_membership.membership_level.name : currentMember.free_membership.membership_level.name
			display_name = currentMember.name ? currentMember.name : currentMember.phone_no
			membership_name = currentMember.premium_membership ? currentMember.premium_membership.membership_plan.name : currentMember.free_membership.membership_plan.name
			points = currentMember.points
			avatar = currentMember.image != null ? {uri: currentMember.image} : require("./../../assets/images/avatar.png")
			vouchers_count = currentMember.voucher_items_count
			credits = parseFloat(currentMember.credits).toFixed(2)
			// console.log("Member", currentMember)
		}else{
			background_photo =  {uri:''}
			level_name = ''
			display_name = 'Brew 9'
			points = 0
			avatar = require("./../../assets/images/avatar.png")
			vouchers_count = 0
			credits = 0
		}

		if (currentMember === null) {
			isLogin = false
		}

		return <ScrollView
				style={styles.amendedCopy3View}>
				<View
					pointerEvents="box-none"
					style={{
						height: 340 * alpha,
					}}>
					<View
						style={styles.membersectionView}>
						<View
							style={styles.topbackgroundView}>
							<View
								style={styles.fill1View}/>
							<Image
								source={require("./../../assets/images/fill-2.png")}
								style={styles.fill2Image}/>
							<Image
								source={require("./../../assets/images/group-133-3.png")}
								style={styles.group133Image}/>
						</View>
						<View
							style={styles.memberDetailView}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0 * alpha,
									right: 0 * alpha,
									top: 0 * alpha,
									height: 199 * alpha,
								}}>
								<View
									style={styles.detailsView}>
									<View
										style={styles.rectangleTwoView}/>
									<View
										style={styles.rectangleView}/>
								</View>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										left: 12 * alpha,
										right: 15 * alpha,
										top: 0 * alpha,
										height: 187 * alpha,
									}}>
									<View
										pointerEvents="box-none"
										style={{
											height: 79 * alpha,
											flexDirection: "row",
											alignItems: "flex-start",
										}}>
										<View
											style={styles.membershipinfoView}>
											<View
												pointerEvents="box-none"
												style={{
													width: 191 * alpha,
													height: 23 * alpha,
													marginLeft: 2 * alpha,
													flexDirection: "row",
													alignItems: "flex-start",
												}}>
												<Text
													style={styles.membershiplabelText}>{membership_name}</Text>
												{/* <TouchableOpacity
													onPress={this.onMembershipStatusPressed}
													style={styles.membershipstatusButton}>
													<Text
														style={styles.membershipstatusButtonText}>2020-06-19 expired</Text>
													<Image
														source={require("./../../assets/images/group-6-31.png")}
														style={styles.membershipstatusButtonImage}/>
												</TouchableOpacity> */}
											</View>
											<View
												style={styles.expbarView}>
												<View
													pointerEvents="box-none"
													style={{
														position: "absolute",
														left: 0 * alpha,
														right: 0 * alpha,
														top: 0 * alpha,
														height: 22 * alpha,
													}}>
													<View
														pointerEvents="box-none"
														style={{
															position: "absolute",
															right: 3 * alpha,
															width: 190 * alpha,
															top: 0 * alpha,
															height: 11 * alpha,
															flexDirection: "row",
															justifyContent: "flex-end",
															alignItems: "flex-start",
														}}>
														<Text
															style={styles.initiallevelText}>{}</Text>
														<Text
															style={styles.nextlevelText}>{}</Text>
													</View>
													<View
														style={styles.progressbarView}>
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
															<Image
																source={require("./../../assets/images/group-4-14.png")}
																style={styles.group4Image}/>
														</View>
														<View
															pointerEvents="box-none"
															style={{
																position: "absolute",
																left: 0 * alpha,
																top: 0 * alpha,
																bottom: 0,
																justifyContent: "center",
															}}>
															<Image
																source={require("./../../assets/images/group-7-4.png")}
																style={styles.group7Image}/>
														</View>
													</View>
												</View>
												<Text
													style={styles.levelexpText}></Text>
											</View>
										</View>
										<View
											style={{
												flex: 1,
											}}/>
										<Image
											source={avatar}
											style={styles.profileImage}/>
									</View>
									<View
										style={styles.dividerView}/>
									<View
										pointerEvents="box-none"
										style={{
											height: 83 * alpha,
											marginLeft: 15 * alpha,
											marginRight: 12 * alpha,
											marginTop: 15 * alpha,
											flexDirection: "row",
											alignItems: "flex-start",
										}}>
										<TouchableOpacity
											onPress={() => this.onRewardButtonPressed()} >
											<View
												style={styles.pointView}>
												<Image
													source={require("./../../assets/images/icon-23-copy.png")}
													style={styles.pointiconImage}/>
												<Text
													style={styles.pointvalueText}>{points}</Text>
												<View
													style={{
														flex: 1,
													}}/>
												<Text
													style={styles.pointText}>Point</Text>
											</View>
										</TouchableOpacity>
										<View
											style={{
												flex: 1,
											}}/>
										<TouchableOpacity
											onPress={() => this.onRewardButtonPressed()} >
											<View
												style={styles.walletView}>
												<Image
													source={require("./../../assets/images/icon-25-copy.png")}
													style={styles.walletIconImage}/>
												<Text
													style={styles.walletcreditText}>${parseFloat(credits).toFixed(2)}</Text>
												<Text
													style={styles.walletText}>Wallet</Text>
											</View>
										</TouchableOpacity>
									</View>
								</View>
							</View>
							<TouchableOpacity
								onPress={() => this.onPointButtonPressed()} >
								<View
									style={styles.rewardView}>
									<Image
										source={require("./../../assets/images/icon-24-copy.png")}
										style={styles.rewardiconImage}/>
									<Text
										style={styles.rewardvalueText}>{vouchers_count}</Text>
									<Text
										style={styles.rewardText}>Reward</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 19 * alpha,
							width: 277 * alpha,
							top: 70 * alpha,
							height: 232 * alpha,
							alignItems: "flex-start",
						}}>
						<View
							style={styles.notificationView}>
							{/* <Image
								source={require("./../../assets/images/bell-2.png")}
								style={styles.bellImage}/>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.messageText}>13 new messages, click to see</Text>
							<View
								style={styles.group7View}>
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
									<Image
										source={require("./../../assets/images/group-3-32.png")}
										style={styles.group3Image}/>
								</View>
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
									<Image
										source={require("./../../assets/images/group-6-29.png")}
										style={styles.group6Image}/>
								</View>
							</View> */}
						</View>
						<Text
							style={styles.welcomeSomebodyText}>Welcome, {display_name}!</Text>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => this.onMissionCenterPressed()}
					style={styles.missioncenterbuttonButton}>
					<View
						style={styles.missionCentreView}>
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
									height: 103 * alpha,
									marginLeft: 45 * alpha,
									marginRight: 28 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Text
									style={styles.missionlabelText}>MISSION CENTRE</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Image
									source={require("./../../assets/images/group-198-2.png")}
									style={styles.missioniconImage}/>
							</View>
						</View>
						
							<Text
								style={styles.missioncenterbuttonButtonText}></Text>
						
						</View>
				</TouchableOpacity>
				{/* <View
					style={styles.monthlyBenefitView}>
					<View
						pointerEvents="box-none"
						style={{
							width: 161 * alpha,
							height: 121 * alpha,
							alignItems: "flex-start",
						}}>
						<Text
							style={styles.monthlyBenefitsCopyText}>Monthly Benefits</Text>
						<View
							pointerEvents="box-none"
							style={{
								width: 146 * alpha,
								height: 85 * alpha,
								marginLeft: 15 * alpha,
								marginTop: 18 * alpha,
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							<View
								style={styles.priorityView}>
								<View
									style={styles.groupView}>
									<Image
										source={require("./../../assets/images/icon-28-copy-2.png")}
										style={styles.icon28CopyImage}/>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.priorityCopyText}>Priority</Text>
							</View>
							<View
								style={styles.freeDeliveryView}>
								<View
									style={styles.group2View}>
									<Image
										source={require("./../../assets/images/icon-29-copy-2.png")}
										style={styles.icon29CopyImage}/>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.freeDeliveryCopyText}>Free Delivery</Text>
							</View>
						</View>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<View
						style={styles.buy1Free1View}>
						<View
							style={styles.group3View}>
							<Image
								source={require("./../../assets/images/icon-30-copy-2.png")}
								style={styles.icon30CopyImage}/>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.buy1Free1CopyText}>Buy 1 Free 1</Text>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							width: 75 * alpha,
							height: 121 * alpha,
							alignItems: "flex-end",
						}}>
						<Text
							style={styles.moreCopyText}>more</Text>
						<View
							style={styles.buy2Free1View}>
							<View
								style={styles.group5View}>
								<Image
									source={require("./../../assets/images/icon-31-copy-2.png")}
									style={styles.icon31CopyImage}/>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.buy2Free1CopyText}>Buy 2 Free 1</Text>
						</View>
					</View>
				</View> */}
				
				<View
					style={styles.menuView}>
					<TouchableOpacity
						onPress={() => this.onOrderButtonPressed()}
						style={styles.orderhostorybuttonButton}>
						<View
							style={styles.orderHistoryView}>
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
										height: 14 * alpha,
										marginLeft: 20 * alpha,
										marginRight: 20 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={styles.orderHistoryLabelText}>Order History</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Image
											source={require("./../../assets/images/arrow.png")}
											style={styles.arrowImage}/>
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
										style={styles.orderhostorybuttonButtonText}></Text>
								
								<View
									style={styles.lineView}/>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.onQRButtonPressed()}
						style={styles.qrbuttonButton}>
						<View
							style={styles.qrCodeView}>
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
										height: 14 * alpha,
										marginLeft: 20 * alpha,
										marginRight: 20 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={styles.qrCodeLabelText}>QR Code</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.qrDescriptionText}>Scan for reward or pay</Text>
									<Image
											source={require("./../../assets/images/arrow.png")}
											style={styles.arrowImage}/>
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
										style={styles.qrbuttonButtonText}></Text>
								
								<View
									style={styles.lineTwoView}/>
							</View>
						</View>
					</TouchableOpacity>
					{/* <TouchableOpacity
						onPress={() => this.onRedeemButtonPressed()}
						style={styles.redeembuttonButton}>
						<View
							style={styles.redeemStationView}>
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
										height: 14 * alpha,
										marginLeft: 20 * alpha,
										marginRight: 20 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={styles.redeemStationLabelText}>Redeem Station</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.redeemDescriptionText}>Redeem for member or voucher</Text>
									<Image
											source={require("./../../assets/images/arrow.png")}
											style={styles.arrowImage}/>
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
								
									<Text
										style={styles.redeembuttonButtonText}></Text>
								
								<View
									style={styles.lineThreeView}/>
							</View>
						</View>
					</TouchableOpacity> */}
					<TouchableOpacity
							onPress={() => this.onAboutButtonPressed()}
							style={styles.aboutbuttonButton}>
						<View
							style={styles.aboutView}>
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
										height: 14 * alpha,
										marginLeft: 20 * alpha,
										marginRight: 20 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={styles.aboutLabelText}>About Brew9</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Image
											source={require("./../../assets/images/arrow.png")}
											style={styles.arrowImage}/>
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
								<Text
									style={styles.aboutbuttonButtonText}></Text>
								
							</View>
						</View>
						<View
								style={styles.lineThreeView}/>
					</TouchableOpacity>
					<TouchableOpacity
							onPress={() => this.onLogoutButtonPress()}
							style={styles.logoutbuttonButton}>
						<View
							style={styles.logoutView}>
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
										height: 14 * alpha,
										marginLeft: 20 * alpha,
										marginRight: 20 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={styles.logoutLabelText}>{isLogin ? "Logout" : "Signup/Login"}</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Image
											source={require("./../../assets/images/arrow.png")}
											style={styles.arrowImage}/>
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
								<Text
									style={styles.logoutbuttonButtonText}></Text>
								
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
	}
}

const styles = StyleSheet.create({
	amendedCopy3View: {
		backgroundColor: "white",
		flex: 1,
	},
	membersectionView: {
		backgroundColor: "transparent",
		opacity: 0.99,
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 340 * alpha,
	},
	topbackgroundView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 353 * alpha,
	},
	fill1View: {
		backgroundColor: "rgb(221, 210, 194)",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 159 * alpha,
	},
	fill2Image: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 8 * alpha,
		top: 1 * alpha,
		height: 159 * alpha,
	},
	group133Image: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 353 * alpha,
	},
	memberDetailView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 19 * alpha,
		right: 19 * alpha,
		top: 298 * alpha,
		height: 199 * alpha,
	},
	detailsView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 17 * alpha,
		shadowColor: "rgba(217, 217, 217, 0.5)",
		shadowRadius: 10 * alpha,
		shadowOpacity: 1,
		height: 182 * alpha,
	},
	rectangleTwoView: {
		backgroundColor: "white",
		height: 27 * alpha,
	},
	rectangleView: {
		backgroundColor: "white",
		flex: 1,
	},
	membershipinfoView: {
		backgroundColor: "transparent",
		width: 193 * alpha,
		height: 51 * alpha,
		marginTop: 28 * alpha,
		alignItems: "flex-start",
	},
	membershiplabelText: {
		color: "rgb(65, 28, 15)",
		fontFamily: "Helvetica-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 2 * alpha,
	},
	membershipstatusButton: {
		backgroundColor: "rgba(181, 181, 181, 0.28)",
		borderRadius: 11.5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 94 * alpha,
		height: 23 * alpha,
		marginLeft: 6 * alpha,
	},
	membershipstatusButtonText: {
		color: "rgb(108, 108, 108)",
		fontFamily: "Helvetica-Bold",
		fontSize: 8 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	membershipstatusButtonImage: {
		resizeMode: "contain",
		marginLeft: 10 * alpha,
	},
	expbarView: {
		backgroundColor: "transparent",
		width: 193 * alpha,
		height: 22 * alpha,
		marginTop: 6 * alpha,
	},
	initiallevelText: {
		color: "rgb(15, 62, 81)",
		fontFamily: "DINPro-Bold",
		fontSize: 8 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginRight: 164 * alpha,
	},
	nextlevelText: {
		color: "rgb(15, 62, 81)",
		fontFamily: "DINPro-Bold",
		fontSize: 8 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	progressbarView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 11 * alpha,
		height: 11 * alpha,
	},
	group4Image: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: null,
		height: 10 * alpha,
	},
	group7Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 144 * alpha,
		height: 8 * alpha,
		marginLeft: 2 * alpha,
	},
	levelexpText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 7 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		position: "absolute",
		left: 20 * alpha,
		top: 1 * alpha,
	},
	profileImage: {
		resizeMode: "contain",
		backgroundColor: "white",
		width: 78 * alpha,
		height: 78 * alpha,
		borderRadius: 39 * alpha,
	},
	dividerView: {
		backgroundColor: "rgb(232, 232, 232)",
		height: 1 * alpha,
		marginLeft: 3 * alpha,
		marginRight: 3 * alpha,
		marginTop: 9 * alpha,
	},
	pointView: {
		backgroundColor: "transparent",
		width: 65 * alpha,
		height: 83 * alpha,
		alignItems: "center",
	},
	pointiconImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 49 * alpha,
		height: 33 * alpha,
	},
	pointvalueText: {
		color: "rgb(26, 72, 84)",
		fontFamily: "DINPro-Medium",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 6 * alpha,
	},
	pointText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	walletView: {
		backgroundColor: "transparent",
		width: 66 * alpha,
		height: 83 * alpha,
		alignItems: "center",
	},
	walletIconImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 51 * alpha,
		height: 33 * alpha,
	},
	walletcreditText: {
		color: "rgb(26, 72, 84)",
		fontFamily: "DINPro-Medium",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 6 * alpha,
	},
	walletText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 5 * alpha,
	},
	rewardView: {
		backgroundColor: "transparent",
		position: "absolute",
		alignSelf: "center",
		width: 65 * alpha,
		top: 104 * alpha,
		height: 83 * alpha,
		alignItems: "center",
	},
	rewardiconImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 51 * alpha,
		height: 33 * alpha,
	},
	rewardvalueText: {
		color: "rgb(26, 72, 84)",
		fontFamily: "DINPro-Medium",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 6 * alpha,
	},
	rewardText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 5 * alpha,
	},
	notificationView: {
		// backgroundColor: "white",
		// borderRadius: 18.5,
		// shadowColor: "rgba(157, 157, 157, 0.5)",
		// shadowRadius: 4,
		// shadowOpacity: 1,
		alignSelf: "center",
		width: 217 * alpha,
		height: 37 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	bellImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 26 * alpha,
		height: 25 * alpha,
		marginLeft: 10 * alpha,
	},
	messageText: {
		color: "rgb(69, 69, 69)",
		fontFamily: "DINPro-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginRight: 5 * alpha,
	},
	group7View: {
		backgroundColor: "transparent",
		flex: 1,
		height: 7 * alpha,
		marginLeft: 5 * alpha,
		marginRight: 16 * alpha,
	},
	group3Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 4 * alpha,
	},
	group6Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 4 * alpha,
	},
	welcomeSomebodyText: {
		backgroundColor: "transparent",
		color: "rgb(250, 250, 250)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginTop: 176 * alpha,
	},
	missionCentreView: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		bottom: 0,
	},
	missionlabelText: {
		backgroundColor: "transparent",
		color: "rgb(26, 72, 84)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	missioniconImage: {
		backgroundColor: "transparent",
		resizeMode: "contain",
		width: 93 * alpha,
		height: 103 * alpha,
	},
	missioncenterbuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	missioncenterbuttonButtonImage: {
		resizeMode: "contain",
	},
	missioncenterbuttonButton: {
		backgroundColor: "white",
		shadowColor: "rgba(217, 217, 217, 0.5)",
		shadowRadius: 10,
		shadowOpacity: 1,
		height: 120 * alpha,
		marginLeft: 18 * alpha,
		marginRight: 18 * alpha,
		marginTop: 167 * alpha,
	},
	monthlyBenefitView: {
		backgroundColor: "transparent",
		height: 121 * alpha,
		marginLeft: 18 * alpha,
		marginRight: 19 * alpha,
		marginTop: 41 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	monthlyBenefitsCopyText: {
		color: "rgb(69, 69, 69)",
		fontFamily: "Helvetica-Bold",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	priorityView: {
		backgroundColor: "transparent",
		width: 60 * alpha,
		height: 85 * alpha,
	},
	groupView: {
		backgroundColor: "white",
		borderRadius: 30 * alpha,
		shadowColor: "rgba(205, 205, 205, 0.5)",
		shadowRadius: 7,
		shadowOpacity: 1,
		height: 60 * alpha,
		justifyContent: "center",
	},
	icon28CopyImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 47 * alpha,
		marginLeft: 7 * alpha,
		marginRight: 10 * alpha,
	},
	priorityCopyText: {
		backgroundColor: "transparent",
		color: "rgb(44, 44, 44)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginLeft: 12 * alpha,
		marginRight: 13 * alpha,
	},
	freeDeliveryView: {
		backgroundColor: "transparent",
		width: 66 * alpha,
		height: 85 * alpha,
		marginLeft: 20 * alpha,
	},
	group2View: {
		backgroundColor: "white",
		borderRadius: 30 * alpha,
		shadowColor: "rgba(205, 205, 205, 0.5)",
		shadowRadius: 7,
		shadowOpacity: 1,
		height: 60 * alpha,
		marginLeft: 3 * alpha,
		marginRight: 3 * alpha,
		justifyContent: "center",
	},
	icon29CopyImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 46 * alpha,
		marginLeft: 9 * alpha,
		marginRight: 9 * alpha,
	},
	freeDeliveryCopyText: {
		color: "rgb(44, 44, 44)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	buy1Free1View: {
		backgroundColor: "transparent",
		width: 63 * alpha,
		height: 85 * alpha,
		marginRight: 20 * alpha,
		marginTop: 36 * alpha,
	},
	group3View: {
		backgroundColor: "white",
		borderRadius: 30 * alpha,
		shadowColor: "rgba(205, 205, 205, 0.5)",
		shadowRadius: 7,
		shadowOpacity: 1,
		height: 60 * alpha,
		marginLeft: 1 * alpha,
		marginRight: 2 * alpha,
		justifyContent: "center",
	},
	icon30CopyImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 46 * alpha,
		marginLeft: 9 * alpha,
		marginRight: 8 * alpha,
	},
	buy1Free1CopyText: {
		color: "rgb(44, 44, 44)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	moreCopyText: {
		color: "rgb(69, 69, 69)",
		fontFamily: "DINPro-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	buy2Free1View: {
		backgroundColor: "transparent",
		width: 63 * alpha,
		height: 85 * alpha,
		marginRight: 12 * alpha,
		marginTop: 18 * alpha,
	},
	group5View: {
		backgroundColor: "white",
		borderRadius: 30 * alpha,
		shadowColor: "rgba(205, 205, 205, 0.5)",
		shadowRadius: 7,
		shadowOpacity: 1,
		height: 60 * alpha,
		marginLeft: 1 * alpha,
		marginRight: 2 * alpha,
		justifyContent: "center",
	},
	icon31CopyImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 47 * alpha,
		marginLeft: 9 * alpha,
		marginRight: 8 * alpha,
	},
	buy2Free1CopyText: {
		color: "rgb(44, 44, 44)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	menuView: {
		backgroundColor: "transparent",
		flex: 1,
		marginTop: 13 * alpha,
		marginBottom: 13 * alpha,
	},
	orderHistoryView: {
		backgroundColor: "transparent",
		height: 58 * alpha,
		marginRight: 1 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	orderHistoryLabelText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	arrowView: {
		backgroundColor: "transparent",
		width: 7 * alpha,
		height: 8 * alpha,
	},
	arrowImage: {
		width: 7 * alpha,
		resizeMode: "contain"
	},
	orderhostorybuttonButton: {
		backgroundColor: "transparent",
		flex: 1,
	},
	orderhostorybuttonButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	orderhostorybuttonButtonImage: {
		resizeMode: "contain",
	},
	lineView: {
		backgroundColor: "transparent",
		borderWidth: 1 * alpha,
		borderColor: "rgb(244, 244, 244)",
		borderStyle: "solid",
		position: "absolute",
		alignSelf: "center",
		width: 376 * alpha,
		top: 57 * alpha,
		height: 1 * alpha,
	},
	qrCodeView: {
		backgroundColor: "transparent",
		height: 58 * alpha,
		marginRight: 1 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	qrCodeLabelText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	qrDescriptionText: {
		color: "rgb(188, 188, 188)",
		fontFamily: "Helvetica",
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
	qrbuttonButton: {
		backgroundColor: "transparent",
		flex: 1,
	},
	qrbuttonButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	qrbuttonButtonImage: {
		resizeMode: "contain",
	},
	lineTwoView: {
		backgroundColor: "transparent",
		borderWidth: 1 * alpha,
		borderColor: "rgb(244, 244, 244)",
		borderStyle: "solid",
		position: "absolute",
		alignSelf: "center",
		width: 375 * alpha,
		top: 57 * alpha,
		height: 1 * alpha,
	},
	redeemStationView: {
		backgroundColor: "transparent",
		height: 58 * alpha,
		marginRight: 1 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	redeemStationLabelText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	redeemDescriptionText: {
		color: "rgb(188, 188, 188)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginRight: 23 * alpha,
	},
	arrowThreeView: {
		backgroundColor: "transparent",
		width: 7 * alpha,
		height: 8 * alpha,
	},
	redeembuttonButton: {
		backgroundColor: "transparent",
		flex: 1,
	},
	redeembuttonButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	redeembuttonButtonImage: {
		resizeMode: "contain",
	},
	lineThreeView: {
		backgroundColor: "transparent",
		borderWidth: 1 * alpha,
		borderColor: "rgb(244, 244, 244)",
		borderStyle: "solid",
		position: "absolute",
		left: 1 * alpha,
		right: 0 * alpha,
		top: 57 * alpha,
		height: 1 * alpha,
	},
	moreView: {
		backgroundColor: "transparent",
		height: 58 * alpha,
		marginRight: 1 * alpha,
	},
	moreCopyTwoText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 20 * alpha,
	},
	logoutView: {
		backgroundColor: "transparent",
		width: "100%",
		height: 58 * alpha,
		marginRight: 1 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	logoutLabelText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	logoutDescriptionText: {
		color: "rgb(188, 188, 188)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginRight: 23 * alpha,
	},
	arrowThreeView: {
		backgroundColor: "transparent",
		width: 7 * alpha,
		height: 8 * alpha,
	},
	logoutbuttonButton: {
		backgroundColor: "transparent",
		flex: 1,
	},
	logoutbuttonButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	logoutbuttonButtonImage: {
		resizeMode: "contain",
	},
	aboutView: {
		backgroundColor: "transparent",
		width: "100%",
		height: 58 * alpha,
		marginRight: 1 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	aboutLabelText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	aboutDescriptionText: {
		color: "rgb(188, 188, 188)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginRight: 23 * alpha,
	},
	arrowThreeView: {
		backgroundColor: "transparent",
		width: 7 * alpha,
		height: 8 * alpha,
	},
	aboutbuttonButton: {
		backgroundColor: "transparent",
		flex: 1,
	},
	aboutbuttonButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	aboutbuttonButtonImage: {
		resizeMode: "contain",
	},
	lineThreeView: {
		backgroundColor: "transparent",
		borderWidth: 1 * alpha,
		borderColor: "rgb(244, 244, 244)",
		borderStyle: "solid",
		position: "absolute",
		left: 1 * alpha,
		right: 0 * alpha,
		top: 57 * alpha,
		height: 1 * alpha,
	},
})