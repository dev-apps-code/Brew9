//
//  MemberCenter
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Image, Text, StyleSheet, TouchableOpacity, View } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import { connect } from "react-redux";
import { ProgressBar, Colors } from 'react-native-paper';
import {KURL_INFO} from "../Utils/server";

@connect(({ members }) => ({
	members: members.profile
}))
export default class MemberCenter extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Member Center",
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

	onMemberServicePressed = () => {
		const { navigate } = this.props.navigation
		const { members } = this.props

		navigate("WebCommon", {
			title: 'Member Services',
			web_url: KURL_INFO + '?page=member_services&id=' + members.company_id,
		})
	}

	onActivateButtonPressed = () => {
		const { navigate } = this.props.navigation

		navigate("VIPPurchase")
	}

	onUpgradePressed = () => {
		const { navigate } = this.props.navigation
		const { members } = this.props

		navigate("WebCommon", {
			title: 'Brew9',
			web_url: KURL_INFO + '?page=level_infos&id=' + members.company_id,
		})
	}

	onMissionCentrePressed = () => {
		const { navigate } = this.props.navigation

		navigate("MissionCenter")
	}

	onWalletPressed = () => {
		const { navigate } = this.props.navigation

		navigate("MemberWallet")
	}

	onOtherLevelBenefitsPressed = () => {
		const { navigate } = this.props.navigation
		const { members } = this.props

		navigate("WebCommon", {
			title: 'Member Services',
			web_url: KURL_INFO + '?page=level_benefits&id=' + members.company_id,
		})
	}

	render() {

		const { members } = this.props

		var isPremium = members.premium_membership ? true : false
		var membership_progress = isPremium ?
			members.premium_membership.experience_points/members.premium_membership.membership_level.maximum_experience :
			members.free_membership.experience_points/members.free_membership.membership_level.maximum_experience

		var membership_exp = isPremium ? members.premium_membership.membership_level.experience_needed : members.free_membership.membership_level.experience_needed
		var membership_next_level_exp = isPremium ? members.premium_membership.membership_level.maximum_experience : members.free_membership.membership_level.maximum_experience
		var exp_to_next_level = membership_next_level_exp - membership_exp

		return <View
				style={styles.memberCenterView}>
				<View
					pointerEvents="box-none"
					style={{
						height: 329 * alpha,
					}}>
					<View
						style={styles.profileView}>
						<Image
							source={members.image ? {uri: members.image} : require("./../../assets/images/avatar.png")}
							style={styles.avatarImage}/>
						<View
							pointerEvents="box-none"
							style={{
								width: 110 * alpha,
								height: 45 * alpha,
								marginLeft: 19 * alpha,
								marginTop: 13 * alpha,
								alignItems: "flex-start",
							}}>
							<Text
								style={styles.nameText}>{members.name}</Text>
							<View
								pointerEvents="box-none"
								style={{
									width: 107 * alpha,
									height: 17 * alpha,
									marginLeft: 3 * alpha,
									marginTop: 3 * alpha,
									flexDirection: "row",
									alignItems: "flex-start",
								}}>
								<Text
									style={styles.levelText}>{isPremium ? members.premium_membership.membership_level.name : members.free_membership.membership_level.name}</Text>
								<View
									pointerEvents="box-none"
									style={{
										width: 74 * alpha,
										height: 13 * alpha,
										marginLeft: 13 * alpha,
										marginTop: 2 * alpha,
										alignItems: "flex-start",
									}}>
									<Text
										style={styles.expText}>{membership_exp ? membership_exp : "-" }/{membership_next_level_exp ? membership_next_level_exp : "-"}</Text>
									<ProgressBar style={styles.lineView} progress={membership_progress ? membership_progress : 1} color={"rgb(0, 178, 227)"} />



								</View>
							</View>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.memberServiceView}>
							<View
								style={styles.exclaimationView}>
								<Text
									style={styles.iText}>i</Text>
							</View>
							<TouchableOpacity
								onPress={this.onMemberServicePressed}
								style={styles.memberServiceButton}>
								<Text
									style={styles.memberServiceButtonText}>Member Service</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View
						style={styles.membershipView}>
						<View
							style={styles.membershipTwoView}>
							<Image
								source={{uri: members.image}}
								style={styles.backgroundImage}/>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 12 * alpha,
									right: 12 * alpha,
									top: 21 * alpha,
									bottom: 22 * alpha,
								}}>
								<View
									pointerEvents="box-none"
									style={{
										height: 25 * alpha,
										marginLeft: 1 * alpha,
										flexDirection: "row",
										alignItems: "flex-start",
									}}>
									<Text
										style={styles.membershipText}>{isPremium ? members.premium_membership.membership_plan.name : members.free_membership.membership_plan.name }</Text>
									<View
										style={{
											flex: 1,
										}}/>
									{
										// members.isPremium ? null : <TouchableOpacity
										// 	onPress={this.onActivateButtonPressed}
										// 	style={styles.activateButtonButton}>
										// 	<Text
										// 		style={styles.activateButtonButtonText}>Activate</Text>
										// </TouchableOpacity>
									}

								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<TouchableOpacity
									onPress={this.onUpgradePressed}
									style={styles.upgradeButton}>
									<Text
										style={styles.upgradeButtonText}>{exp_to_next_level} exp more to upgrade to next level, upgrade info</Text>
									<Image
										source={require("./../../assets/images/group-18.png")}
										style={styles.upgradeButtonImage}/>
								</TouchableOpacity>
							</View>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								height: 23 * alpha,
								marginLeft: 32 * alpha,
								marginRight: 57 * alpha,
								marginTop: 33 * alpha,
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							<TouchableOpacity
								onPress={this.onMissionCentrePressed}
								style={styles.missionCentreButton}>
								<Image
									source={require("./../../assets/images/group-5-11.png")}
									style={styles.missionCentreButtonImage}/>
								<Text
									style={styles.missionCentreButtonText}>Mission Centre</Text>
							</TouchableOpacity>
							<View
								style={{
									flex: 1,
								}}/>
							<TouchableOpacity
								onPress={this.onWalletPressed}
								style={styles.walletButton}>
								<Image
									source={require("./../../assets/images/group-6-9.png")}
									style={styles.walletButtonImage}/>
								<Text
									style={styles.walletButtonText}>My Wallet</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View
					style={styles.lineTwoView}/>
				{/* <View
					style={styles.nextLevelRewardView}>
					<View
						pointerEvents="box-none"
						style={{
							height: 17 * alpha,
							marginLeft: 20 * alpha,
							marginRight: 20 * alpha,
							marginTop: 30 * alpha,
							flexDirection: "row",
							alignItems: "flex-start",
						}}>
						<Text
							style={styles.nextLevelRewardsText}>Next Level Rewards</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<TouchableOpacity
							onPress={this.onOtherLevelBenefitsPressed}
							style={styles.otherLevelRewardButton}>
							<Text
								style={styles.otherLevelRewardButtonText}>Other Level Benefits</Text>
							<Image
								source={require("./../../assets/images/group-2.png")}
								style={styles.otherLevelRewardButtonImage}/>
						</TouchableOpacity>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							height: 34 * alpha,
							marginLeft: 30 * alpha,
							marginRight: 50 * alpha,
							marginTop: 32 * alpha,
							flexDirection: "row",
							alignItems: "flex-start",
						}}>
						<View
							style={styles.discountView}>
							<Image
								source={require("./../../assets/images/group-8-17.png")}
								style={styles.group8Image}/>
							<View
								pointerEvents="box-none"
								style={{
									flex: 1,
									alignSelf: "stretch",
									marginLeft: 10 * alpha,
									alignItems: "flex-start",
								}}>
								<Text
									style={styles.discount3Text}>Discount *3</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.rm5OffWithRm120SText}>RM5 off with RM120 spend</Text>
							</View>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.freeView}>
							<Image
								source={require("./../../assets/images/group-9-9.png")}
								style={styles.group9Image}/>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								pointerEvents="box-none"
								style={{
									alignSelf: "stretch",
									width: 58 * alpha,
									alignItems: "flex-end",
								}}>
								<Text
									style={styles.free2Text}>Free *2</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.buy6Free1Text}>Buy 6 Free 1</Text>
							</View>
						</View>
					</View>
				</View> */}
			</View>
	}
}

const styles = StyleSheet.create({
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
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
		resizeMode: "contain",
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
	memberCenterView: {
		backgroundColor: "white",
		flex: 1,
	},
	profileView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 1 * alpha,
		right: 0,
		top: 0,
		height: 76 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	avatarImage: {
		backgroundColor: "transparent",
		borderRadius: 24 * alpha,
		resizeMode: "contain",
		width: 48 * alpha,
		height: 48 * alpha,
		marginLeft: 21 * alpha,
		marginTop: 14 * alpha,
	},
	nameText: {
		color: "rgb(73, 73, 73)",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	levelText: {
		backgroundColor: "transparent",
		color: "rgb(73, 73, 73)",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	expText: {
		color: "rgb(37, 36, 36)",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	lineView: {
		backgroundColor: "transparent",
		width: 74 * alpha,
		height: 2 * alpha,
	},
	memberServiceView: {
		backgroundColor: "transparent",
		width: 92 * alpha,
		height: 13 * alpha,
		marginRight: 20 * alpha,
		marginTop: 45 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	exclaimationView: {
		backgroundColor: "transparent",
		borderRadius: 6.5 * alpha,
		borderWidth: 1,
		borderColor: "rgb(110, 110, 110)",
		borderStyle: "solid",
		width: 13 * alpha,
		height: 13 * alpha,
		justifyContent: "center",
	},
	iText: {
		color: "rgb(110, 110, 110)",
		fontFamily: "SFProText-Medium",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 5 * alpha,
		marginRight: 5 * alpha,
	},
	memberServiceButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		flex: 1,
		height: 12 * alpha,
		marginLeft: 5 * alpha,
	},
	memberServiceButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	memberServiceButtonText: {
		color: "rgb(84, 81, 81)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	membershipView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 75 * alpha,
		height: 254 * alpha,
	},
	membershipTwoView: {
		backgroundColor: "transparent",
		height: 157 * alpha,
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
	},
	backgroundImage: {
		backgroundColor: "#EEEEEE",
		opacity: 0.68,
		resizeMode: "cover",
		width: 336 * alpha,
		height: 157 * alpha,
	},
	membershipText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 17 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 1 * alpha,
	},
	activateButtonButton: {
		backgroundColor: "transparent",
		borderRadius: 12 * alpha,
		borderWidth: 1,
		borderColor: "rgb(54, 54, 54)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 49 * alpha,
		height: 25 * alpha,
	},
	activateButtonButtonText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	activateButtonButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	upgradeButtonImage: {
		resizeMode: "contain",
		marginLeft: 10 * alpha,
	},
	upgradeButtonText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	upgradeButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "flex-start",
		width: 250 * alpha,
		height: 14 * alpha,
	},
	missionCentreButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 110 * alpha,
		height: 23 * alpha,
	},
	missionCentreButtonText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	missionCentreButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	walletButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 97 * alpha,
		height: 20 * alpha,
		marginTop: 3 * alpha,
	},
	walletButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	walletButtonText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	lineTwoView: {
		backgroundColor: "rgb(224, 224, 224)",
		alignSelf: "center",
		width: 334,
		height: 1,
	},
	nextLevelRewardView: {
		backgroundColor: "transparent",
		height: 296 * alpha,
	},
	nextLevelRewardsText: {
		backgroundColor: "transparent",
		color: "rgb(23, 22, 22)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	otherLevelRewardButtonText: {
		color: "rgb(118, 118, 118)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	otherLevelRewardButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 119 * alpha,
		height: 13 * alpha,
		marginTop: 4 * alpha,
	},
	otherLevelRewardButtonImage: {
		resizeMode: "contain",
		marginLeft: 10 * alpha,
	},
	discountView: {
		backgroundColor: "transparent",
		width: 150 * alpha,
		height: 34 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	group8Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 19 * alpha,
		height: 22 * alpha,
	},
	discount3Text: {
		backgroundColor: "transparent",
		color: "rgb(59, 58, 58)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 1 * alpha,
	},
	rm5OffWithRm120SText: {
		color: "rgb(80, 79, 79)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-end",
	},
	freeView: {
		backgroundColor: "transparent",
		width: 102 * alpha,
		height: 34 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	group9Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 27 * alpha,
		height: 18 * alpha,
	},
	free2Text: {
		color: "rgb(59, 58, 58)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 12 * alpha,
	},
	buy6Free1Text: {
		color: "rgb(80, 79, 79)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
})
