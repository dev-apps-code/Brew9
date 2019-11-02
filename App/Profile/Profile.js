//
//  Profile
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowWidth } from "../Common/size";
import {connect} from "react-redux";
import {KURL_INFO} from "../Utils/server";
import {createAction} from '../Utils'
import ProfileRequestObject from '../Requests/profile_request_object'
import LogoutRequestObject from "../Requests/logout_request_object"
import Constants from 'expo-constants';
import {TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR, TABBAR_INACTIVE_TINT, TABBAR_ACTIVE_TINT, DISABLED_COLOR, LIGHT_BLUE} from "../Common/common_style";
import { LinearGradient } from 'expo-linear-gradient';

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

	static tabBarItemOptions = ( navigation,store ) => {

		return {
			tabBarLabel: "Profile",
			tabBarOnPress: ({ navigation, defaultHandler }) => {

				store.dispatch(createAction("config/setToggleShopLocation")(false))
				store.dispatch(createAction("config/setTab")("profile"))
				defaultHandler()
			  },
			tabBarIcon: ({ iconTintColor, focused }) => {
				const image = focused 
				? require('./../../assets/images/profile_selected_tab.png') 
				: require('./../../assets/images/profile_tab.png')

				return <Image
					source={image}
					style={{resizeMode: "contain", width: 30 * alpha, height: 30 * alpha, tintColor: focused ? TABBAR_ACTIVE_TINT : TABBAR_INACTIVE_TINT }}/>
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
			console.log("Profile", eventObject)
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
			web_url: KURL_INFO + '?page=about_us&id=' + company_id,
		})
	}

	onLogoutButtonPress = () => {
		const {  currentMember } = this.props

		if (currentMember !== null) {
			// this.loadDestroy()
			const { navigate } = this.props.navigation
			navigate("MemberProfile")
		}else{
			const { navigate } = this.props.navigation
			navigate("VerifyStack")
			return
		}
	}

	renderProgressBar(progress) {

		progress_percent = progress * 100
		return (
			<View style={{flexDirection: "row", height: 10 * alpha,  flex: 1}}>
			  <View style={{ flex: 1, borderColor: "#000", borderWidth: 0.5 * alpha, borderRadius: 4 * alpha,}}>
				<View
				  style={[StyleSheet.absoluteFill, { backgroundColor: "transparent" }]}
				/>
				<LinearGradient
					colors={[LIGHT_BLUE, PRIMARY_COLOR]}
					start={[0,0]}
					end={[1,0]}
					style={{
						position: "absolute",
						left: 0,
						top: 0,
						bottom: 0,
						borderRadius: 4 * alpha,
						width: `${progress_percent}%`,
					}}
				/>
			  </View>
			</View>
		  )
	}
	render() {

		const { currentMember ,members} = this.props
		var background_photo;
		var level_name;
		var display_name;
		var points;
		var avatar;
		var membership_name;
		var next_level_name
		var isLogin = true;
		var membership_progress

		var vouchers_count;
		if (currentMember != null ){
			background_photo =    {uri: currentMember.free_membership != null ? currentMember.free_membership.membership_level.image : ''}
			level_name = currentMember.premium_membership ? currentMember.premium_membership.membership_level.name : currentMember.free_membership.membership_level.name
			display_name = currentMember.name ? currentMember.name : currentMember.phone_no
			membership_name = currentMember.premium_membership ? currentMember.premium_membership.membership_plan.name : currentMember.free_membership.membership_plan.name
			points = currentMember.points
			avatar = currentMember.image != null ? {uri: currentMember.image} : require("./../../assets/images/user.png")
			vouchers_count = currentMember.voucher_items_count
			credits = parseFloat(currentMember.credits).toFixed(2)
			member_exp = currentMember.premium_membership ? currentMember.premium_membership.experience_points : currentMember.free_membership.experience_points
			exp_needed = currentMember.premium_membership ? currentMember.premium_membership.membership_level.maximum_experience : currentMember.free_membership.membership_level.maximum_experience
			membership_progress = currentMember.premium_membership ?
				currentMember.premium_membership.experience_points/currentMember.premium_membership.membership_level.maximum_experience :
				currentMember.free_membership.experience_points/currentMember.free_membership.membership_level.maximum_experience
			next_level_name = currentMember.premium_membership ? currentMember.premium_membership.membership_level.next_level_name : currentMember.free_membership.membership_level.next_level_name
		}else{
			background_photo =  {uri:''}
			level_name = ''
			display_name = 'Brew 9'
			points = 0
			avatar = require("./../../assets/images/user.png")
			vouchers_count = 0
			credits = 0
			membership_name = ""
			member_exp = 0
			exp_needed = 1
			next_level_name = ""
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
							{/* <View
								style={styles.fill1View}/>
							<Image
								source={require("./../../assets/images/fill-2.png")}
								style={styles.fill2Image}/> */}
							<Image
								source={require("./../../assets/images/profile_top_banner.png")}
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
														left: 0,
														right: 0,
														top: 0,
														height: 22 * alpha,
													}}>
													<View
														pointerEvents="box-none"
														style={{
															position: "absolute",
															left: 0 * alpha,
															right: 0 * alpha,
															top: 0,
															height: 15 * alpha,
															flexDirection: "row",
															alignItems: "flex-start",
														}}>
														<Text
															style={styles.initiallevelText}>{level_name}</Text>
														<View
															style={{
																flex: 1,
															}}/>
														<Text
															style={styles.nextlevelText}>{next_level_name}</Text>
													</View>
													<View
														style={styles.progressbarView}>
															{this.renderProgressBar(membership_progress ? membership_progress : 0)}
													</View>
													
												</View>
												<Text
													style={styles.levelexpText}>{member_exp} / {exp_needed}</Text>
											</View>
										</View>
										<View
											style={{
												flex: 1,
											}}/>
										<View style={{elevation: 2 * alpha}}>
										<TouchableOpacity onPress={()=> this.onMemberButtonPressed()}>
										<Image
											source={avatar}
											style={styles.profileImage}/>
											</TouchableOpacity>
										</View>
										
									</View>
									<View
										style={styles.dividerView}/>
									<View
										pointerEvents="box-none"
										style={{
											height: 83 * alpha,
											marginTop: 15 *alpha,
											justifyContent: "space-between",
											flexDirection: "row",
											alignItems: "flex-start",
										}}>
										<TouchableOpacity
											onPress={() => this.onPointButtonPressed()}
											style={styles.pointButtonView}
											>
											<View
												style={styles.pointView}>
												<Image
													source={require("./../../assets/images/point_center.png")}
													style={styles.pointiconImage}/>
												<Text
													style={styles.pointvalueText}>{points}</Text>
												
												<Text
													style={styles.pointText}>Point</Text>
											</View>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={() => this.onRewardButtonPressed()}
												style={styles.rewardButtonView}>
											<View
												style={styles.rewardView}>
												<Image
													source={require("./../../assets/images/voucher_center.png")}
													style={styles.rewardiconImage}/>
												<Text
													style={styles.rewardvalueText}>{vouchers_count}</Text>
												<Text
													style={styles.rewardText}>Voucher</Text>
											</View>
										</TouchableOpacity>										
										<TouchableOpacity
											onPress={() => this.onWalletButtonPressed()}
											style={styles.walletButtonView}>
											<View
												style={styles.walletView}>
												<Image
													source={require("./../../assets/images/wallet_center.png")}
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
									marginLeft: 25 * alpha,
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
									source={require("./../../assets/images/mission.png")}
									style={styles.missioniconImage}/>
							</View>
						</View>
						
							<Text
								style={styles.missioncenterbuttonButtonText}></Text>
						
						</View>
				</TouchableOpacity>
				
				
				<View
					style={styles.menuView}>
						<TouchableOpacity
							onPress={() => this.onLogoutButtonPress()}
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
										style={styles.menuRowLabelText}>{isLogin ? "My Profile" : "Signup/Login"}</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Image
											source={require("./../../assets/images/forward.png")}
											style={styles.menuRowArrowImage}/>
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
								
								<View
									style={styles.menuRowLineView}/>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.onOrderButtonPressed()}
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
										style={isLogin ? styles.menuRowLabelText : styles.menuRowDisableLabelText}>Order History</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Image
											source={require("./../../assets/images/forward.png")}
											style={styles.menuRowArrowImage}/>
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
									style={styles.menuRowLineView}/>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.onQRButtonPressed()}
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
										style={isLogin ? styles.menuRowLabelText : styles.menuRowDisableLabelText}>QR Code</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.menuRowDescriptionText}>Scan for reward or pay</Text>
									<Image
											source={require("./../../assets/images/forward.png")}
											style={styles.menuRowArrowImage}/>
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
								
								<View
									style={styles.menuRowLineView}/>
							</View>
						</View>
					</TouchableOpacity>
													
					<TouchableOpacity
							onPress={() => this.onAboutButtonPressed()}
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
										style={isLogin ? styles.menuRowLabelText : styles.menuRowDisableLabelText}>About Brew9</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Image
											source={require("./../../assets/images/forward.png")}
											style={styles.menuRowArrowImage}/>
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
		height: 500 * alpha,
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
		backgroundColor: PRIMARY_COLOR,
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
		width: windowWidth,
		left: 0 * alpha,
		right: 8 * alpha,
		top: 1 * alpha,
		height: 159 * alpha,
	},
	group133Image: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		position: "absolute",
		width: windowWidth,
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
		elevation: 2 * alpha,
	},
	rectangleTwoView: {
		backgroundColor: "white",
		height: 27 * alpha,
		elevation: 2 * alpha,
	},
	rectangleView: {
		backgroundColor: "white",
		elevation: 2 * alpha,
		flex: 1,
	},
	membershipinfoView: {
		backgroundColor: "transparent",
		width: 193 * alpha,
		height: 51 * alpha,
		marginTop: 28 * alpha,
		alignItems: "flex-start",
		elevation: 2 * alpha,
	},
	membershiplabelText: {
		color: "rgb(65, 28, 15)",
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
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
		fontFamily: NON_TITLE_FONT,
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
		marginLeft: 2 * alpha,
		elevation: 2 * alpha,
	},
	initiallevelText: {
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		elevation: 2 * alpha,
	},
	nextlevelText: {
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "right",
		backgroundColor: "transparent",
		elevation: 2 * alpha,
	},
	progressbarView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 15 * alpha,
		height: 10 * alpha,
		elevation: 2 * alpha,
	},
	progresslineView: {
		backgroundColor: "transparent",
		flex: 1,
		paddingTop: 0,
		elevation: 2 * alpha,
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
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		alignSelf: "center",
		top: 1 * alpha,
	},
	profileImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
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
		elevation: 2 * alpha,
	},
	
	pointiconImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 49 * alpha,
		height: 33 * alpha,
	},
	pointvalueText: {
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 17 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 6 * alpha,
	},
	pointText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 5 * alpha,
	},
	walletButtonView: {
		backgroundColor: "transparent",
		width: (windowWidth-60)/3,
		height: 83 * alpha,
		alignItems: "center",
		elevation: 2 * alpha,
	},
	walletView: {
		backgroundColor: "transparent",
		width: (windowWidth-60)/3,
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
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 17 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 6 * alpha,
	},
	walletText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 5 * alpha,
	},
	pointButtonView: {
		alignSelf: "center",
		backgroundColor: "transparent",
		width: (windowWidth-60)/3,
		height: 83 * alpha,
		alignItems: "center",
		elevation: 2 * alpha,
	},
	pointView: {
		backgroundColor: "transparent",
		width: (windowWidth-60)/3,
		height: 83 * alpha,
		alignItems: "center",
	},
	rewardButtonView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: (windowWidth-60)/3,
		height: 83 * alpha,
		alignItems: "center",
		elevation: 2 * alpha,
	},
	rewardView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: (windowWidth-60)/3,
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
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 17 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 6 * alpha,
	},
	rewardText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
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
		fontFamily: TITLE_FONT,
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
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
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
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 20 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	missioniconImage: {
		backgroundColor: "transparent",
		resizeMode: "contain",
		width: 93 * alpha,
		height: 103 * alpha,
	},
	missioncenterbuttonButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
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
		elevation: 2 * alpha,
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
		backgroundColor: "transparent",
		borderWidth: 1 * alpha,
		borderColor: "rgb(245, 245, 245)",
		borderStyle: "solid",
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