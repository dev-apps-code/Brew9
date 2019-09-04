//
//  Profile
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { TouchableOpacity, View, StyleSheet, Image, Text } from "react-native"
import React from "react"


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

	onRightPressed = () => {
	
	}

	onLeftPressed = () => {
	
	}

	onProfileButtonPressed = () => {
	
	}

	onGoToVIPPressed = () => {
	
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

	onVWalletButtonPressed = () => {
	
		const { navigate } = this.props.navigation
		
		navigate("MemberWallet")
	}

	render() {
	
		return <View
				style={styles.iphone8Copy7View}>
				<View
					style={styles.contentView}>
					<View
						style={styles.headerView}>
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
								source={require("./../../assets/images/bg-02.png")}
								style={styles.bg02Image}/>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								right: 0,
								width: 375,
								top: 10,
								bottom: 20,
								alignItems: "center",
							}}>
							<View
								style={styles.menuView}>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										right: 0,
										top: 0,
										bottom: 0,
										justifyContent: "center",
									}}>
									<View
										style={styles.navrightbuttonView}>
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
											<TouchableOpacity
												onPress={this.onRightPressed}
												style={styles.rightButton}>
												<Image
													source={require("./../../assets/images/right-7.png")}
													style={styles.rightButtonImage}/>
											</TouchableOpacity>
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
												source={require("./../../assets/images/circle.png")}
												style={styles.circleImage}/>
										</View>
									</View>
								</View>
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
										style={styles.navleftbuttonView}>
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
											<TouchableOpacity
												onPress={this.onLeftPressed}
												style={styles.leftButton}>
												<Image
													source={require("./../../assets/images/left-7.png")}
													style={styles.leftButtonImage}/>
											</TouchableOpacity>
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
												source={require("./../../assets/images/dot.png")}
												style={styles.dotImage}/>
										</View>
									</View>
								</View>
							</View>
							<View
								style={styles.membershipinfoView}>
								<View
									style={styles.memberView}>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											left: 0,
											right: 0,
											top: 0,
											bottom: 0,
										}}>
										<Text
											style={styles.nameText}>Somebody</Text>
										<View
											style={{
												flex: 1,
											}}/>
										<View
											style={styles.levellabelView}>
											<Text
												style={styles.levelText}>Lv1</Text>
										</View>
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
										<TouchableOpacity
											onPress={this.onProfileButtonPressed}
											style={styles.profilebuttonButton}/>
									</View>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.membershipView}>
									<Text
										style={styles.brew9memberText}>Brew9 member</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<View
										style={styles.goToVipView}>
										<TouchableOpacity
											onPress={this.onGoToVIPPressed}
											style={styles.goToVipButton}>
											<Text
												style={styles.goToVipButtonText}>Go to VIP</Text>
										</TouchableOpacity>
										<Image
											source={require("./../../assets/images/arrow.png")}
											style={styles.arrowImage}/>
									</View>
								</View>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								style={styles.pointsView}>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										alignSelf: "center",
										top: 0,
										bottom: 0,
										justifyContent: "center",
									}}>
									<View
										style={styles.rewardpointsView}>
										<View
											pointerEvents="box-none"
											style={{
												position: "absolute",
												left: 0,
												right: 0,
												top: 0,
												bottom: 0,
											}}>
											<Text
												style={styles.pointsText}>0</Text>
											<View
												style={{
													flex: 1,
												}}/>
											<Text
												style={styles.rewardlabelText}>Reward </Text>
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
											<TouchableOpacity
												onPress={this.onRewardButtonPressed}
												style={styles.rewardbuttonButton}/>
										</View>
									</View>
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
									<View
										pointerEvents="box-none"
										style={{
											height: 54,
											marginLeft: 49,
											marginRight: 16,
											flexDirection: "row",
											alignItems: "center",
										}}>
										<View
											style={styles.memberpointsView}>
											<View
												pointerEvents="box-none"
												style={{
													position: "absolute",
													left: 0,
													right: 0,
													top: 0,
													bottom: 0,
												}}>
												<Text
													style={styles.pointsTwoText}>0</Text>
												<View
													style={{
														flex: 1,
													}}/>
												<Text
													style={styles.memberlabelText}>Point </Text>
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
												<TouchableOpacity
													onPress={this.onPointButtonPressed}
													style={styles.pointbuttonButton}/>
											</View>
										</View>
										<View
											style={{
												flex: 1,
											}}/>
										<View
											style={styles.walletcreditsView}>
											<View
												pointerEvents="box-none"
												style={{
													position: "absolute",
													left: 0,
													right: 19,
													top: 4,
													bottom: 0,
													alignItems: "flex-start",
												}}>
												<View
													style={styles.creditviewView}>
													<Text
														style={styles.currencyText}>RM</Text>
													<Text
														style={styles.creditsText}>0.00</Text>
												</View>
												<View
													style={{
														flex: 1,
													}}/>
												<Text
													style={styles.walletlabelText}>Wallet </Text>
											</View>
											<Text
												style={styles.nonActiveText}>non-active</Text>
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
												<TouchableOpacity
													onPress={this.onVWalletButtonPressed}
													style={styles.walletbuttonButton}/>
											</View>
										</View>
									</View>
								</View>
							</View>
						</View>
					</View>
					<View
						style={styles.contentTwoView}>
						<View
							style={styles.membershipLevelView}>
							<View
								style={styles.membershipTwoView}>
								<Image
									source={require("./../../assets/images/group-14-7.png")}
									style={styles.membershipiconImage}/>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.memberlevelText}>Member Club</Text>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								style={styles.pointRewardView}>
								<Image
									source={require("./../../assets/images/group-7.png")}
									style={styles.pointsiconImage}/>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.pointRewardText}>Point Reward</Text>
							</View>
						</View>
						<View
							style={styles.profilesView}>
							<View
								style={styles.memberStatusView}>
								<Image
									source={require("./../../assets/images/group-3-8.png")}
									style={styles.statusiconImage}/>
								<Text
									style={styles.memberStatusText}>Member Status</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.memberdesciprionText}>Upgrade Member</Text>
							</View>
							<View
								style={styles.orderHistoryView}>
								<Image
									source={require("./../../assets/images/group-14-8.png")}
									style={styles.historyiconImage}/>
								<Text
									style={styles.orderHistoryText}>Order History</Text>
							</View>
							<View
								style={styles.personalInfoView}>
								<Image
									source={require("./../../assets/images/group-8-2.png")}
									style={styles.personaliconImage}/>
								<Text
									style={styles.personalInfoText}>Personal Info</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.personaldescriptionText}>Update Info</Text>
							</View>
							<View
								style={styles.qrCodeView}>
								<View
									style={styles.qriconView}>
									<Image
										source={require("./../../assets/images/group-3-3.png")}
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
											source={require("./../../assets/images/clip-5-8.png")}
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
									style={styles.qrdescriptionText}>Scan for reward or pay</Text>
							</View>
							<View
								style={styles.exchangeStationView}>
								<Image
									source={require("./../../assets/images/group-12-5.png")}
									style={styles.redeemiconImage}/>
								<Text
									style={styles.redeemStationText}>Redeem Station</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.redeemdescriptionText}>Redeem for member or voucher</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	iphone8Copy7View: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	contentView: {
		backgroundColor: "transparent",
		flex: 1,
		marginTop: 20,
		marginBottom: 49,
	},
	headerView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 212,
	},
	bg02Image: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: null,
		height: 210,
	},
	menuView: {
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 82,
		height: 32,
		marginRight: 9,
	},
	navrightbuttonView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
	},
	rightButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	rightButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	rightButtonImage: {
		resizeMode: "contain",
	},
	circleImage: {
		backgroundColor: "transparent",
		resizeMode: "contain",
		width: null,
		height: 16,
		marginLeft: 12,
		marginRight: 17,
	},
	navleftbuttonView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
	},
	leftButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	leftButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	leftButtonImage: {
		resizeMode: "contain",
	},
	dotImage: {
		backgroundColor: "transparent",
		resizeMode: "contain",
		width: null,
		height: 6,
		marginLeft: 13,
		marginRight: 12,
	},
	membershipinfoView: {
		backgroundColor: "transparent",
		width: 375,
		height: 40,
		marginTop: 26,
		flexDirection: "row",
		alignItems: "center",
	},
	memberView: {
		backgroundColor: "transparent",
		width: 72,
		height: 40,
		marginLeft: 78,
	},
	nameText: {
		backgroundColor: "transparent",
		color: "rgb(73, 73, 73)",
		fontFamily: "Helvetica-Bold",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	levellabelView: {
		backgroundColor: "rgb(67, 67, 67)",
		borderRadius: 8.5,
		height: 17,
		marginLeft: 11,
		marginRight: 13,
		justifyContent: "center",
	},
	levelText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 17,
		marginRight: 14,
	},
	profilebuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 40,
	},
	profilebuttonButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	profilebuttonButtonImage: {
		resizeMode: "contain",
	},
	membershipView: {
		backgroundColor: "transparent",
		width: 82,
		height: 38,
		marginRight: 16,
	},
	brew9memberText: {
		backgroundColor: "transparent",
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	goToVipView: {
		backgroundColor: "rgb(216, 216, 216)",
		borderRadius: 8.5,
		height: 17,
		marginLeft: 10,
		marginRight: 4,
		flexDirection: "row",
		alignItems: "center",
	},
	goToVipButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		flex: 1,
		height: 11,
		marginLeft: 8,
		marginRight: 6,
	},
	goToVipButtonText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	goToVipButtonImage: {
		resizeMode: "contain",
		marginRight: 10,
	},
	arrowImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 7,
		height: 8,
		marginRight: 8,
	},
	pointsView: {
		backgroundColor: "transparent",
		width: 375,
		height: 54,
	},
	rewardpointsView: {
		backgroundColor: "transparent",
		width: 60,
		height: 50,
	},
	pointsText: {
		backgroundColor: "transparent",
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		alignSelf: "center",
	},
	rewardlabelText: {
		backgroundColor: "transparent",
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	rewardbuttonButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12,
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
		height: 50,
	},
	rewardbuttonButtonImage: {
		resizeMode: "contain",
	},
	memberpointsView: {
		backgroundColor: "transparent",
		width: 41,
		height: 50,
	},
	pointsTwoText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 13,
		marginRight: 14,
	},
	memberlabelText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	pointbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 50,
	},
	pointbuttonButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	pointbuttonButtonImage: {
		resizeMode: "contain",
	},
	walletcreditsView: {
		backgroundColor: "transparent",
		width: 85,
		height: 53,
	},
	creditviewView: {
		backgroundColor: "transparent",
		alignSelf: "stretch",
		height: 30,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	currencyText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 8,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 14,
	},
	creditsText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		flex: 1,
		marginLeft: 4,
	},
	walletlabelText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 10,
	},
	nonActiveText: {
		backgroundColor: "transparent",
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 7,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		position: "absolute",
		right: 0,
		top: 0,
	},
	walletbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 53,
	},
	walletbuttonButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	walletbuttonButtonImage: {
		resizeMode: "contain",
	},
	contentTwoView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0,
		right: 0,
		top: 211,
		height: 386,
	},
	membershipLevelView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 219,
		height: 48,
		marginTop: 40,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	membershipTwoView: {
		backgroundColor: "transparent",
		width: 67,
		height: 43,
		marginTop: 5,
	},
	membershipiconImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 22,
		marginLeft: 16,
		marginRight: 15,
	},
	memberlevelText: {
		backgroundColor: "transparent",
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	pointRewardView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 67,
		height: 48,
		alignItems: "flex-start",
	},
	pointsiconImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 27,
		height: 27,
		marginLeft: 20,
	},
	pointRewardText: {
		backgroundColor: "transparent",
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		alignSelf: "stretch",
	},
	profilesView: {
		backgroundColor: "transparent",
		height: 248,
		marginTop: 34,
	},
	memberStatusView: {
		backgroundColor: "transparent",
		height: 44,
		flexDirection: "row",
		alignItems: "center",
	},
	statusiconImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 19,
		height: 21,
		marginLeft: 38,
	},
	memberStatusText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 23,
	},
	memberdesciprionText: {
		color: "rgb(184, 180, 180)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginRight: 38,
	},
	orderHistoryView: {
		backgroundColor: "transparent",
		height: 44,
		flexDirection: "row",
		alignItems: "center",
	},
	historyiconImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 18,
		height: 23,
		marginLeft: 38,
	},
	orderHistoryText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 24,
	},
	personalInfoView: {
		backgroundColor: "transparent",
		height: 44,
		flexDirection: "row",
		alignItems: "center",
	},
	personaliconImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 21,
		height: 21,
		marginLeft: 38,
	},
	personalInfoText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 21,
	},
	personaldescriptionText: {
		color: "rgb(184, 180, 180)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginRight: 38,
	},
	qrCodeView: {
		backgroundColor: "transparent",
		height: 44,
		flexDirection: "row",
		alignItems: "center",
	},
	qriconView: {
		backgroundColor: "transparent",
		width: 18,
		height: 18,
		marginLeft: 38,
	},
	group3Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 9,
		top: 0,
		height: 9,
	},
	clip5Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 19,
	},
	qrCodeText: {
		backgroundColor: "transparent",
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginLeft: 24,
	},
	qrdescriptionText: {
		backgroundColor: "transparent",
		color: "rgb(184, 180, 180)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		marginRight: 36,
	},
	exchangeStationView: {
		backgroundColor: "transparent",
		height: 44,
		flexDirection: "row",
		alignItems: "center",
	},
	redeemiconImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 20,
		height: 21,
		marginLeft: 38,
	},
	redeemStationText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 22,
	},
	redeemdescriptionText: {
		color: "rgb(184, 180, 180)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginRight: 38,
	},
})
