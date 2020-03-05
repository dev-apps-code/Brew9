//
//  Profile
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Animated, AppState, Modal, TouchableWithoutFeedback, TextInput, Platform } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowWidth, windowHeight } from "../Common/size";
import { connect } from "react-redux";
import { KURL_INFO, KURL_MEMBERSHIP_INFO, getAppVersion, getBuildVersion } from "../Utils/server";
import { createAction } from '../Utils'
import ProfileRequestObject from '../Requests/profile_request_object'
import VerifyCouponCodeObj from '../Requests/verify_coupon _code_request_object'
import LogoutRequestObject from "../Requests/logout_request_object"
import NotificationsRequestObject from "../Requests/notifications_request_object";
import Constants from 'expo-constants';
import { LIGHT_GREY, TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR, TABBAR_INACTIVE_TINT, TABBAR_ACTIVE_TINT, DISABLED_COLOR, LIGHT_BLUE, DEFAULT_GREY_BACKGROUND } from "../Common/common_style";
import { LinearGradient } from 'expo-linear-gradient';
import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from "../Common/config"
import ProfileMenu from "./ProfileMenu";
import ProfileRowMenu from "./ProfileRowMenu"
import { getMemberIdForApi } from '../Services/members_helper'

@connect(({ members, config }) => ({
	selectedTab: config.selectedTab,
	members: members,
	company_id: members.company_id,
	currentMember: members.profile,
	free_membership: members.free_membership,
	premium_membership: members.premium_membership
}))
export default class Profile extends React.Component {

	timer = null

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			gesturesEnabled: false,
			swipeEnabled: false,
			header: null,
			headerLeft: null,
			headerRight: null,
		}
	}

	static tabBarItemOptions = (navigation, store) => {

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
					style={{ resizeMode: "contain", width: 30 * alpha, height: 30 * alpha, tintColor: focused ? TABBAR_ACTIVE_TINT : TABBAR_INACTIVE_TINT }} />
			},
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			hasShimmered: false,
			appState: AppState.currentState,
			timestamp: undefined,
			showRedeemVoucher: false

		}
		this.loadProfile = this.loadProfile.bind(this)
		this.moveAnimation = new Animated.ValueXY({ x: 0, y: 0 })
	}

	componentDidMount() {
		this.loadProfile()
		this.loopShimmer()
		this.timer = setInterval(() => this.loopShimmer(), 3000)
		this.props.navigation.addListener('didFocus', this.loadProfile)
		AppState.addEventListener('change', this._handleAppStateChange);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
		AppState.removeEventListener('change', this._handleAppStateChange);
	}

	_handleAppStateChange = nextAppState => {
		const { currentMember } = this.props
		if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
			if (currentMember != null) {
				this.loadProfile();
			}
		}
		this.setState({ appState: nextAppState });
	};

	loopShimmer() {
		const { hasShimmered } = this.state
		if (hasShimmered == false) {
			Animated.timing(this.moveAnimation, {
				toValue: { x: windowWidth - (40 * alpha), y: 0 },
				duration: 700
			}).start()
			this.setState({ hasShimmered: true })
		} else {
			Animated.timing(this.moveAnimation, {
				toValue: { x: 0, y: 0 },
				duration: 700
			}).start()
			this.setState({ hasShimmered: false })
		}

	}

	loadProfile() {
		const { timestamp } = this.state


		if (timestamp != undefined) {
			const date = new Date()
			const diff = date.getTime() - timestamp
			if (diff < 10000) {
				return false;
			}
		}
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
		if (currentMember != null) {
			obj.setUrlId(currentMember.id)
		}

		dispatch(
			createAction('members/loadProfile')({
				object: obj,
				callback,
			})
		)
	}

	loadDestroy() {
		const { dispatch } = this.props
		const { navigate } = this.props.navigation
		this.setState({ loading: true })

		const callback = eventObject => {
			if (eventObject.success) {
				navigate("VerifyUser", {
					returnToRoute: this.props.navigation.state
				})
			}
			this.setState({
				loading: false,
			})
		}
		const obj = new LogoutRequestObject(Constants.installationId)
		dispatch(
			createAction('members/loadDestroy')({
				object: obj,
				callback,
			})
		)
	}

	onLevelPressed = () => {

		const { currentMember } = this.props
		if (currentMember !== null && currentMember.premium_membership) {
			const { navigate } = this.props.navigation

			navigate("MemberProfile")
		}
	}

	onMembershipInfoPressed = () => {
		const { navigate } = this.props.navigation
		const { company_id } = this.props

		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Profile', getMemberIdForApi(this.props.currentMember), "Membership Info"))

		navigate("WebCommon", {
			title: 'Membership Rewards',
			web_url: KURL_INFO + '?page=membership_info&id=' + company_id,
		})
		// navigate("WebCommon", {
		// 	title: 'Membership Info',
		// 	web_url: KURL_MEMBERSHIP_INFO,
		// })
	}

	onMissionCenterPressed = () => {

		const { currentMember } = this.props
		const { navigate } = this.props.navigation
		const analytics = new Analytics(ANALYTICS_ID)
		const { navigation, dispatch } = this.props
		analytics.event(new Event('Profile', getMemberIdForApi(this.props.currentMember), "Mission Center"))
		if (currentMember !== null) {
			this.navigationListener = navigation.addListener('willFocus', payload => {
				this.removeNavigationListener()
				const { state } = payload
				const { params } = state

				if (params != undefined && params.updated == true) {
					this.loadProfile()
				}

				// dispatch(createAction('members/loadCurrentUserFromCache')({}))
			})
			navigate("MissionCenter", {
				returnToRoute: navigation.state
			})
		} else {
			navigate("VerifyUser", {
				returnToRoute: this.props.navigation.state
			})
		}

	}

	removeNavigationListener() {
		if (this.navigationListener) {
			this.navigationListener.remove()
			this.navigationListener = null
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
		const { currentMember } = this.props
		const { validVouchers } = this.state
		const { navigate } = this.props.navigation
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Profile', getMemberIdForApi(this.props.currentMember), "Member Voucher"))
		if (currentMember !== null) {
			navigate("MemberVoucher", { validVouchers: validVouchers })
		} else {
			navigate("VerifyUser", {
				returnToRoute: this.props.navigation.state
			})
		}
	}

	onPointButtonPressed = () => {
		const { currentMember } = this.props
		const { navigate } = this.props.navigation
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Profile', getMemberIdForApi(this.props.currentMember), "Member Point"))
		if (currentMember !== null) {
			navigate("PointShop")
		} else {
			navigate("VerifyUser", {
				returnToRoute: this.props.navigation.state
			})
		}
	}

	onWalletButtonPressed = () => {
		const { currentMember } = this.props
		const { navigate } = this.props.navigation
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Profile', getMemberIdForApi(this.props.currentMember), "Member Wallet"))
		if (currentMember !== null) {
			navigate("MemberWallet")
		} else {
			navigate("VerifyUser", {
				returnToRoute: this.props.navigation.state
			})
		}
	}

	onMemberButtonPressed = () => {
		const { currentMember } = this.props
		const { navigate } = this.props.navigation
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Profile', getMemberIdForApi(this.props.currentMember), "Member Profile"))
		if (currentMember !== null) {
			const { navigate } = this.props.navigation
			navigate("MemberProfile")
		} else {
			navigate("VerifyUser", {
				returnToRoute: this.props.navigation.state
			})
		}
	}

	onOrderButtonPressed = () => {
		const { currentMember } = this.props
		const { navigate } = this.props.navigation
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Profile', getMemberIdForApi(this.props.currentMember), "Order History"))
		navigate("OrderHistory")
	}

	onPersonalButtonPressed = () => {
		const { currentMember } = this.props
		const { navigate } = this.props.navigation
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Profile', getMemberIdForApi(this.props.currentMember), "Member Profile"))
		if (currentMember !== null) {
			navigate("MemberProfile")
		} else {
			navigate("VerifyUser", {
				returnToRoute: this.props.navigation.state
			})
		}
	}

	onLevelInfoPressed = () => {
		const { navigate } = this.props.navigation
		const { members, company_id } = this.props
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Profile', getMemberIdForApi(this.props.currentMember), "Level Info"))
		navigate("WebCommon", {
			title: 'Level Info',
			web_url: KURL_INFO + '?page=level_info&id=' + company_id,
		})
	}



	onQRButtonPressed = () => {
		const { currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("PayByWallet")
		}
	}

	onRedeemButtonPressed = () => {
		const { currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("RedeemPromotion")
		}
	}
	onRedeemVoucherPressed = () => {
		const { currentMember } = this.props
		const { navigate } = this.props.navigation
		if (currentMember !== null) {
			this.setState({
				showRedeemVoucher: true
			})
		} else {
			navigate("VerifyUser", {
				returnToRoute: this.props.navigation.state
			})
		}
	}
	closePopUp = () => {
		this.setState({
			showRedeemVoucher: false
		})
	}
	onChangeCoupon = (text) => {
		this.setState({
			coupon: text
		})
	}
	onOK = () => {
		this.setState({
			showRedeemVoucher: false
		})

	}
	onRedeemCouponCode = () => {
		let { coupon } = this.state
		let { dispatch } = this.props

		if (coupon) {
			const callback = eventObject => {
				if (eventObject.success) {
					// this.refs.toast.show("Successfully add review!", TOAST_DURATION)

				} else {
					// this.refs.toast.show(eventObject.message, TOAST_DURATION)
				}

			}
			const obj = new VerifyCouponCodeObj(coupon)
			dispatch(
				createAction('vouchers/loadVerifyCouponCode')({
					object: obj,
					callback,
				})
			)
		}

	}

	onPointShopPressed = () => {
		const { currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("PointShop")
		}
	}

	onClubPressed = () => {
		const { currentMember } = this.props
		if (currentMember !== null) {
			const { navigate } = this.props.navigation

			navigate("MemberCenter")
		}
	}

	onAboutButtonPressed = () => {
		const { navigate } = this.props.navigation
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Profile', getMemberIdForApi(this.props.currentMember), "About"))
		navigate("About")
	}

	onFaqPressed = () => {
		const { navigate } = this.props.navigation
		const { company_id } = this.props
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Profile', getMemberIdForApi(this.props.currentMember), 'FAQs'))

		navigate("WebCommon", {
			title: 'FAQs',
			web_url: KURL_INFO + '?page=faqs&id=' + company_id,
		})
	}

	onFeedbackPressed = () => {
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Profile', getMemberIdForApi(this.props.currentMember), 'Feedback'))

		Linking.openURL('mailto:feedback@brew9.co?subject=Brew9 app feedback' + '(' + Platform.OS + '-' + getAppVersion() + ')')
	}

	onProfileButtonPress = () => {
		const { currentMember } = this.props
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Profile', getMemberIdForApi(this.props.currentMember), "Member Profile"))
		if (currentMember !== null) {
			// this.loadDestroy()
			const { navigate } = this.props.navigation
			navigate("MemberProfile")
		} else {
			const { navigate } = this.props.navigation
			navigate("VerifyUser", {
				returnToRoute: this.props.navigation.state
			})
			return
		}
	}

	renderRedeemVoucher() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.state.showRedeemVoucher}
				onRequestClose={() => this.closePopUp()}>
				<TouchableWithoutFeedback onPress={() => this.closePopUp()}>

					<View style={[styles.popUpBackground]}>
						<View style={[styles.popUpContent]}>
							<View style={styles.popUpInput1}>
								<Text style={styles.titleText}>Redeem Your Voucher</Text>
							</View>
							<TouchableOpacity onPress={() => this.closePopUp()} style={styles.cancelCouponCode}>
								<Image
									source={require("./../../assets/images/x-3.png")}
									style={styles.cancelImage} />
							</TouchableOpacity>
							<View style={styles.popUpInput2}>
								<TextInput
									style={styles.couponCode}
									placeholder={'Enter voucher code'}
									maxLength={8}
									onChangeText={text => this.onChangeCoupon(text)}

								/>

							</View>
							<TouchableOpacity
								onPress={() => this.onRedeemCouponCode()}
								style={styles.ok_button}>
								<Text
									style={styles.okButtonText}>OK</Text>
							</TouchableOpacity>


						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		)
	}

	renderProgressBar(progress) {

		progress_percent = progress * 100
		return (
			<View style={{ flexDirection: "row", height: 10 * alpha, flex: 1 }}>
				<View style={{ flex: 1, borderColor: "#000", borderWidth: 1 * alpha, borderRadius: 5 * alpha }}>
					<View
						style={[StyleSheet.absoluteFill, { backgroundColor: "transparent" }]}
					/>
					<LinearGradient
						colors={[LIGHT_BLUE, PRIMARY_COLOR]}
						start={[0, 0]}
						end={[1, 0]}
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
		const { currentMember, members } = this.props
		const { hasShimmered } = this.state

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
		if (currentMember != null) {
			background_photo = { uri: currentMember.free_membership != null ? currentMember.free_membership.membership_level.image : '' }
			level_name = currentMember.premium_membership ? currentMember.premium_membership.membership_level.name : currentMember.free_membership.membership_level.name
			display_name = currentMember.name ? currentMember.name : currentMember.phone_no
			membership_name = currentMember.premium_membership ? currentMember.premium_membership.membership_plan.name : currentMember.free_membership.membership_plan.name
			points = currentMember.points
			avatar = currentMember.image != null ? { uri: currentMember.image } : require("./../../assets/images/user.png")
			vouchers_count = currentMember.voucher_items_count
			credits = parseFloat(currentMember.credits).toFixed(2)
			member_exp = currentMember.premium_membership ? currentMember.premium_membership.experience_points : currentMember.free_membership.experience_points
			exp_needed = currentMember.premium_membership ? currentMember.premium_membership.membership_level.maximum_experience : currentMember.free_membership.membership_level.maximum_experience
			membership_progress = currentMember.premium_membership ?
				currentMember.premium_membership.experience_points / currentMember.premium_membership.membership_level.maximum_experience :
				currentMember.free_membership.experience_points / currentMember.free_membership.membership_level.maximum_experience
			next_level_name = currentMember.premium_membership ? currentMember.premium_membership.membership_level.next_level_name : currentMember.free_membership.membership_level.next_level_name
		} else {
			background_photo = { uri: '' }
			level_name = 'Level 1'
			display_name = ''
			points = 0
			avatar = require("./../../assets/images/user.png")
			vouchers_count = 0
			credits = 0
			membership_name = "Standard Member"
			member_exp = 0
			exp_needed = 300
			next_level_name = "Level 2"
		}

		if (currentMember === null) {
			isLogin = false
		}

		return <ScrollView
			style={styles.profileView}>
			<View
				pointerEvents="box-none"
				style={{
					height: 530 * alpha,
				}}>
				<View
					style={styles.membersectionView}>
					<View
						style={styles.topbackgroundView}>
						<Image
							source={require("./../../assets/images/profile_top_banner.png")}
							style={styles.group133Image} />
					</View>
					<View
						style={styles.memberDetailView}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0 * alpha,
								right: 0 * alpha,
								top: 10 * alpha,
								height: 200 * alpha,
							}}>
							<View
								style={styles.detailsView}>
								<View
									style={styles.rectangleTwoView} />
								<View
									style={styles.rectangleView} />
							</View>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 15 * alpha,
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
												width: 250 * alpha,
												height: 23 * alpha,
												marginLeft: 2 * alpha,
												flexDirection: "row",
												alignItems: "center",
											}}>
											<Text
												style={styles.membershiplabelText}>{membership_name}</Text>
											{membership_name != "" && (<View
												style={styles.membershiplevelButton}>
												<Text
													style={styles.membershiplevelText}>{level_name}</Text>
											</View>)}
											<TouchableOpacity onPress={() => this.onLevelInfoPressed()}
												style={styles.levelInfoView}>
												<Image
													source={require("./../../assets/images/exclaimation.png")}
													style={styles.howToUseButtonImage} />
											</TouchableOpacity>

										</View>
										<View
											style={[styles.expbarView]}>
											<View
												pointerEvents="box-none"
												style={{
													position: "absolute",
													left: 0,
													right: 0,
													top: 0,
													height: 24 * alpha,
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
														}} />
													<Text
														style={styles.nextlevelText}>{next_level_name}</Text>
												</View>
												<View
													style={styles.progressbarView}>
													{this.renderProgressBar(membership_progress ? membership_progress : 0)}
												</View>

											</View>
											<Text
												style={styles.levelexpText}>{member_exp} / {exp_needed} XP</Text>
										</View>
									</View>
									<View
										style={{
											flex: 1,
										}} />
									<View style={{ elevation: 2 * alpha }}>
										<TouchableOpacity onPress={() => this.onMemberButtonPressed()}>
											<Image
												source={avatar}
												style={styles.profileImage} />
										</TouchableOpacity>
									</View>

								</View>
								<View
									style={styles.dividerView} />
								<View
									pointerEvents="box-none"
									style={{
										height: 83 * alpha,
										marginTop: 15 * alpha,
										justifyContent: "space-between",
										flexDirection: "row",
										alignItems: "flex-start",
									}}>
									<ProfileRowMenu onPress={this.onPointButtonPressed} icon={require("./../../assets/images/point_center.png")} iconStyle={styles.pointiconImage} value={points} title={'Point'} />
									<ProfileRowMenu onPress={this.onRewardButtonPressed} icon={require("./../../assets/images/voucher_center.png")} iconStyle={styles.rewardiconImage} value={vouchers_count} title={'Voucher'} />
									<ProfileRowMenu onPress={this.onWalletButtonPressed} icon={require("./../../assets/images/wallet_center.png")} iconStyle={styles.walletIconImage} value={"$" + parseFloat(credits).toFixed(2)} title={'Wallet'} />

								</View>
							</View>
						</View>
					</View>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 20 * alpha,
						width: 290 * alpha,
						top: 80 * alpha,
						height: 250 * alpha,
						alignItems: "flex-start",
					}}>
					<View
						style={styles.notificationView}>
					</View>
					<Text
						style={styles.welcomeSomebodyText}>Welcome {display_name}</Text>
					<Text
						style={styles.companySloganText}>Redefine Coffee. Chocolate. Juice.</Text>
				</View>
			</View>
			{/* <TouchableOpacity
				onPress={() => this.onMissionCenterPressed()}
				style={styles.missioncenterbuttonButton}>
				<Image
					source={require("./../../assets/images/mission_center.png")}
					style={styles.missionCenterBackground} />
				<Animated.View style={[this.moveAnimation.getLayout(), hasShimmered ? { opacity: 1 } : { opacity: 0 }]} >
					<Image
						source={require("./../../assets/images/reflection.png")}
						style={styles.missionCenterReflection} />
				</Animated.View>
				<View
					style={styles.missionCentreView}>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							alignItems: "center"
						}}>
						<Image
							source={require("./../../assets/images/crown.png")}
							style={styles.missioniconImage} />
						<Text
							style={styles.missioncenterbuttonButtonText}>Claim Rewards</Text>
					</View>

					<Image
						source={require("./../../assets/images/next.png")}
						style={styles.missionArrow} />
				</View>
			</TouchableOpacity> */}


			<View
				style={styles.menuView}>
				<ProfileMenu onPress={this.onOrderButtonPressed} text={'Order History'} />
				<ProfileMenu onPress={this.onRedeemVoucherPressed} text={'Redeem Voucher'} />
				<ProfileMenu onPress={this.onMembershipInfoPressed} text={'Membership Rewards'} />
				<ProfileMenu onPress={this.onProfileButtonPress} text={'My Profile'} />
				<ProfileMenu onPress={this.onFaqPressed} text={'FAQs'} />
				<ProfileMenu onPress={this.onFeedbackPressed} text={'Feedback'} />
			</View>
			{this.renderRedeemVoucher()}
		</ScrollView>
	}
}

const styles = StyleSheet.create({
	cancelCouponCode: {
		position: 'absolute',
		width: 15 * alpha,
		height: 15 * alpha,
		right: 15 * alpha,
		top: 15 * alpha
	},
	cancelImage: {
		width: 15 * alpha,
		height: 15 * alpha,
		tintColor: LIGHT_GREY
	},
	titleText: {
		color: '#696969',
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
	},
	popUpInput1: {
		backgroundColor: '#f5f5f5',
		flex: 0.5,
		borderTopLeftRadius: 5 * alpha,
		borderTopRightRadius: 5 * alpha,
		paddingVertical: 10 * alpha,
		alignItems: 'center',
		justifyContent: 'center'

	},
	popUpInput2: {
		backgroundColor: 'transparent',
		flex: 1,
		marginVertical: 20 * alpha,
		paddingHorizontal: 20 * alpha,
		alignItems: 'center',
		justifyContent: 'center',


	},
	couponCode: {
		backgroundColor: '#f5f5f5',
		padding: 10 * alpha,
		color: LIGHT_GREY,
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		borderRadius: 5 * alpha,
		fontStyle: "normal",
		textAlign: "center",
		// height: 40 * alpha,
		width: 200 * alpha,
		flex: 1
	},
	ok_button: {
		backgroundColor: PRIMARY_COLOR,
		flex: 0.5,
		borderBottomLeftRadius: 5 * alpha,
		borderBottomRightRadius: 5 * alpha,
		paddingVertical: 10 * alpha,
		alignItems: 'center',
		justifyContent: 'center'
	},
	okButtonText: {
		color: 'white',
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		borderRadius: 5 * alpha,
		fontStyle: "normal",
		textAlign: "center",
	},
	popUpBackground: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.4)',
		justifyContent: 'center',
	},
	popUpContent: {
		backgroundColor: 'white',
		minHeight: windowHeight / 5,
		// aspectRatio: 1,
		// maxHeight: windowHeight / 2,
		// paddingVertical: 20 * alpha,
		marginHorizontal: 50 * alpha,
		// paddingHorizontal: 20 * alpha,
		justifyContent: 'space-between',
		borderRadius: 5 * alpha,

	},
	profileView: {
		backgroundColor: "white",
		flex: 1,
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
		left: 20 * alpha,
		right: 20 * alpha,
		top: 308 * alpha,
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
		width: 250 * alpha,
		height: 61 * alpha,
		marginTop: 28 * alpha,
		alignItems: "flex-start",
		elevation: 2 * alpha,
	},
	membershiplabelText: {
		color: "rgb(65, 28, 15)",
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 2 * alpha,
	},
	membershiplevelButton: {
		backgroundColor: "transparent",
		borderWidth: 1 * alpha,
		borderColor: "rgba(181, 181, 181, 0.5)",
		borderRadius: 8 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 16 * alpha,
		marginLeft: 6 * alpha,
	},
	membershiplevelText: {
		color: "rgb(108, 108, 108)",
		fontFamily: TITLE_FONT,
		fontSize: 10 * fontAlpha,
		textAlign: "center",
		marginLeft: 10 * alpha,
		marginRight: 10 * alpha,
	},
	membershipstatusButton: {
		backgroundColor: "rgba(181, 181, 181, 0.28)",
		borderRadius: 11.5 * alpha,
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
		color: LIGHT_GREY,
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		elevation: 2 * alpha,
	},
	nextlevelText: {
		color: LIGHT_GREY,
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
	levelInfoButton: {
		width: 40 * alpha,
		height: 14 * alpha,
		marginRight: 20 * alpha,
		right: -10 * alpha,
		position: "absolute",
		top: 20 * alpha,
		backgroundColor: "transparent"
	},
	levelInfoView: {
		// width: 40 * alpha,
		marginLeft: 5 * alpha,
		aspectRatio: 1,
		height: 16 * alpha,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	levelInfoText: {
		color: "rgb(151, 151, 151)",
		fontFamily: TITLE_FONT,
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	group4Image: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: null,
		height: 10 * alpha,
	},
	group7Image: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 144 * alpha,
		height: 8 * alpha,
		marginLeft: 2 * alpha,
	},
	levelInfo: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		position: "absolute",
		fontSize: 10 * alpha,
		top: 25 * alpha,
	},
	levelexpText: {
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		alignSelf: "center",
		top: 0 * alpha,
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
		tintColor: LIGHT_GREY,
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 49 * alpha,
		height: 33 * alpha,
	},
	pointvalueText: {
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 18 * fontAlpha,
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
		marginLeft: 14 * alpha,
	},
	walletButtonView: {
		backgroundColor: "transparent",
		width: (windowWidth - 60) / 3,
		height: 83 * alpha,
		alignItems: "center",
		elevation: 2 * alpha,
	},
	walletView: {
		backgroundColor: "transparent",
		width: (windowWidth - 60) / 3,
		height: 83 * alpha,
		alignItems: "center",
	},
	walletIconImage: {
		tintColor: LIGHT_GREY,
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 51 * alpha,
		height: 33 * alpha,
	},
	walletcreditText: {
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 18 * fontAlpha,
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
		marginLeft: 14 * alpha,
	},
	pointButtonView: {
		alignSelf: "center",
		backgroundColor: "transparent",
		width: (windowWidth - 60) / 3,
		height: 83 * alpha,
		alignItems: "center",
		elevation: 2 * alpha,
	},
	pointView: {
		backgroundColor: "transparent",
		width: (windowWidth - 60) / 3,
		height: 83 * alpha,
		alignItems: "center",
	},
	rewardButtonView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: (windowWidth - 60) / 3,
		height: 83 * alpha,
		alignItems: "center",
		elevation: 2 * alpha,
	},
	rewardView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: (windowWidth - 60) / 3,
		height: 83 * alpha,
		alignItems: "center",
	},
	rewardiconImage: {
		tintColor: LIGHT_GREY,
		backgroundColor: "transparent",
		resizeMode: "contain",
		width: 51 * alpha,
		height: 33 * alpha,
	},
	rewardvalueText: {
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 18 * fontAlpha,
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
		marginLeft: 14 * alpha,
	},
	notificationView: {
		alignSelf: "center",
		width: 217 * alpha,
		height: 37 * alpha,
		flexDirection: "row",
		alignItems: "center",
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
	welcomeSomebodyText: {
		backgroundColor: "transparent",
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 176 * alpha,
	},
	companySloganText: {
		backgroundColor: "transparent",
		color: LIGHT_GREY,
		fontFamily: TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 3 * alpha,
	},

	menuView: {
		backgroundColor: "transparent",
		flex: 1,
		marginTop: 13 * alpha,
		marginBottom: 13 * alpha,
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
		width: 35 * alpha,
		height: 35 * alpha,
		marginLeft: 20 * alpha,
	},
	missioncenterbuttonButtonText: {
		color: "white",
		fontFamily: TITLE_FONT,
		fontSize: 15 * fontAlpha,
		marginLeft: 10 * alpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	missioncenterbuttonButtonImage: {
		resizeMode: "contain",
	},
	missioncenterbuttonButton: {
		// backgroundColor: "white",
		// shadowColor: "rgba(217, 217, 217, 0.5)",
		// shadowRadius: 10,
		// shadowOpacity: 1,
		flex: 1,
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
		height: 67 * alpha,
		// marginTop: 177 * alpha,
	},

	missionCenterBackground: {
		resizeMode: "contain",
		position: "absolute",
		width: "100%",
		height: 67 * alpha,
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
	},

	missionCenterReflection: {
		resizeMode: "contain",
		position: "absolute",
		height: 67 * alpha,
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
	},
	missionCentreView: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		flex: 1,
		padding: 0,
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		bottom: 0,
	},
	missionArrow: {
		width: 10 * alpha,
		marginRight: 10 * alpha,
		tintColor: "white",
		resizeMode: "contain",
	},

	infoArrow: {
		width: 9 * alpha,
		marginLeft: 5 * alpha,
		height: "100%",
		tintColor: "rgb(54, 54, 54)",
		resizeMode: "contain",
	},
	howToUseButtonImage: {
		resizeMode: "contain",
		tintColor: "rgb(151, 151, 151)",
		width: 12 * alpha,
		// marginRight: 3 * alpha,
	},
})