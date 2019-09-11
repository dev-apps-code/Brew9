//
//  Profile
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";

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
			tabBarIcon: ({ iconTintColor }) => {

				return <Image
					source={require("./../../assets/images/group-14-2.png")}/>
			},
		}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {

	}

	onLevelPressed = () => {

		const { navigate } = this.props.navigation

		navigate("MemberProfile")
	}

	onVIPPressed = () => {

		const { navigate } = this.props.navigation

		navigate("VIPPurchase")
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

	onQRButtonTwoPressed = () => {

	}

	onRedeemButtonTwoPressed = () => {

	}

	onNotificationButtonPressed = () => {

	}

	onPointShopPressed = () => {
		const { navigate } = this.props.navigation

		navigate("PointShop")
	}

	onClubPressed = () => {
		const { navigate } = this.props.navigation

		navigate("MemberCenter")
	}

	render() {

		return <View
			style={styles.profileView}>
				<ScrollView
					style={styles.scrollScrollView}>
					<View
						style={styles.topsectionView}>
						<Image
							source={require("./../../assets/images/brew9-doodle-02.png")}
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
									source={require("./../../assets/images/profile-pic-4.png")}
									style={styles.profilePicImage}/>
								<View
									pointerEvents="box-none"
									style={{
										width: 60 * alpha,
										height: 48 * alpha,
										marginLeft: 9 * alpha,
										marginTop: 4 * alpha,
										alignItems: "flex-start",
									}}>
									<Text
										style={styles.nameText}>Nobody</Text>
									<TouchableOpacity
										onPress={this.onLevelPressed}
										style={styles.levelButton}>
										<Text
											style={styles.levelButtonText}>Lv2</Text>
									</TouchableOpacity>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									pointerEvents="box-none"
									style={{
										width: 105 * alpha,
										height: 51 * alpha,
										marginTop: 5 * alpha,
										alignItems: "flex-end",
									}}>
									<Text
										style={styles.memberText}>Gold member</Text>
									<TouchableOpacity
										onPress={this.onVIPPressed}
										style={styles.vipButton}>
										<Text
											style={styles.vipButtonText}>2020-06-19 expired</Text>
										<Image
											source={require("./../../assets/images/arrow-2.png")}
											style={styles.vipButtonImage}/>
									</TouchableOpacity>
								</View>
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
											style={styles.pointvalueText}>843</Text>
										<Text
											style={styles.pointText}>Point </Text>
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
											style={styles.rewardvalueText}>7</Text>
										<Text
											style={styles.rewardText}>Reward </Text>
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
												style={styles.rmText}>RM</Text>
											<Text
												style={styles.textText}>30.00</Text>
										</View>
										<Text
											style={styles.walletText}>Wallet </Text>
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
								<Text
									style={styles.clubbuttonButtonText}></Text>
							</TouchableOpacity>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									alignSelf: "center",
									width: 54 * alpha,
									top: 17 * alpha,
									height: 55 * alpha,
									alignItems: "center",
								}}>
								<View
									style={styles.vipiconView}>
									<Image
										source={require("./../../assets/images/group-3-12.png")}
										style={styles.group3Image}/>
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
											source={require("./../../assets/images/group-8-13.png")}
											style={styles.group8Image}/>
									</View>
								</View>
								<Text
									style={styles.vipClubText}>VIP Club</Text>
							</View>
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
								<Text
									style={styles.pointshopbuttonButtonText}></Text>
							</TouchableOpacity>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									alignSelf: "center",
									width: 85 * alpha,
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
						</View>
					</View>
				<View
					style={styles.bottomsectionView}>
					<View
						style={styles.memberStatusView}>
						<TouchableOpacity
							onPress={this.onMemberButtonPressed}
							style={styles.memberbuttonButton}>
							<Text
								style={styles.memberbuttonButtonText}></Text>
						</TouchableOpacity>
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
					</View>
					<View
						style={styles.orderhistoryView}>
						<TouchableOpacity
							onPress={this.onOrderButtonPressed}
							style={styles.orderbuttonButton}>
							<Text
								style={styles.orderbuttonButtonText}></Text>
						</TouchableOpacity>
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
					</View>
					<View
						style={styles.personalInfoView}>
						<TouchableOpacity
							onPress={this.onPersonalButtonPressed}
							style={styles.personalbuttonButton}>
							<Text
								style={styles.personalbuttonButtonText}></Text>
						</TouchableOpacity>
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
					</View>
					<View
						pointerEvents="box-none"
						style={{
							height: 98 * alpha,
						}}>
						<View
							style={styles.qrCodeView}>
							<TouchableOpacity
								onPress={this.onQRButtonTwoPressed}
								style={styles.qrbuttonButton}>
								<Text
									style={styles.qrbuttonButtonText}></Text>
							</TouchableOpacity>
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
						</View>
						<View
							style={styles.redeemStationView}>
							<TouchableOpacity
								onPress={this.onRedeemButtonTwoPressed}
								style={styles.redeembuttonButton}>
								<Text
									style={styles.redeembuttonButtonText}></Text>
							</TouchableOpacity>
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
										style={styles.redeemStationText}>Redeem Station</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.redeemDescriptionText}>Redeem voucher</Text>
								</View>
							</View>
						</View>
					</View>
					<View
						style={styles.notificationView}>
						<TouchableOpacity
							onPress={this.onNotificationButtonPressed}
							style={styles.notificationbuttonButton}>
							<Text
								style={styles.notificationbuttonButtonText}></Text>
						</TouchableOpacity>
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
					</View>
				</View>
			</ScrollView>
		</View>
	}
}
const styles = StyleSheet.create({
	amendedView: {
		backgroundColor: "white",
		flex: 1,
	},
	scrollScrollView: {
		backgroundColor: "transparent",
		height: 603 * alpha,
	},
	topsectionView: {
		backgroundColor: "transparent",
		height: 213 * alpha,
	},
	backgroundImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		height: 213 * alpha,
	},
	profilePicImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 58 * alpha,
		height: 58 * alpha,
	},
	nameText: {
		backgroundColor: "transparent",
		color: "rgb(51, 49, 49)",
		fontFamily: "Helvetica-Bold",
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
		width: 48 * alpha,
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
		fontFamily: "Helvetica-Bold",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	vipButtonText: {
		color: "rgb(108, 108, 108)",
		fontFamily: "Helvetica-Bold",
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
		width: 105 * alpha,
		height: 23 * alpha,
		marginTop: 10 * alpha,
	},
	vipButtonImage: {
		resizeMode: "contain",
		marginLeft: 10 * alpha,
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
		width: 75 * alpha,
		height: 24 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	rmText: {
		backgroundColor: "transparent",
		color: "rgb(32, 32, 32)",
		fontFamily: "Helvetica",
		fontSize: 8 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginTop: 12 * alpha,
	},
	textText: {
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
		fontFamily: "Helvetica-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 7 * alpha,
	},
	vipiconView: {
		backgroundColor: "transparent",
		width: 20 * alpha,
		height: 31 * alpha,
	},
	group3Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 3 * alpha,
		right: 4 * alpha,
		top: 6 * alpha,
		height: 13 * alpha,
	},
	group8Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 31 * alpha,
		marginRight: 1 * alpha,
	},
	vipClubText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica-Bold",
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
		width: 375 * alpha,
		height: 300 * alpha,
		marginRight: 1,
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
		fontFamily: "Helvetica-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginLeft: 11 * alpha,
	},
	upgradeMemberText: {
		backgroundColor: "transparent",
		color: "rgb(184, 180, 180)",
		fontFamily: "Helvetica-Bold",
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
		fontFamily: "Helvetica-Bold",
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
		fontFamily: "Helvetica-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginLeft: 10 * alpha,
	},
	qrCodeView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 1 * alpha,
		top: 0,
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
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginLeft: 12 * alpha,
	},
	qrDescriptionText: {
		color: "rgb(184, 180, 180)",
		fontFamily: "Helvetica-Bold",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	redeemStationView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 1,
		right: 0,
		top: 48 * alpha,
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
		fontFamily: "Helvetica-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginLeft: 10 * alpha,
	},
	redeemDescriptionText: {
		color: "rgb(184, 180, 180)",
		fontFamily: "Helvetica-Bold",
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
		fontFamily: "Helvetica-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 11 * alpha,
	},
})
