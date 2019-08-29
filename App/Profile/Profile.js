//
//  Profile
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native"
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

	onGoToVIPPressed = () => {
	
	}

	render() {
	
		return <View
				style={styles.iphone8Copy7View}>
				<View
					style={styles.viewView}>
					<View
						style={styles.headerView}>
						<View
							style={styles.backgroundView}>
							<View
								style={styles.group9View}>
								<Image
									source={require("./../../assets/images/group-3-2.png")}
									style={styles.group3Image}/>
								<View
									pointerEvents="box-none"
									style={{
										alignSelf: "stretch",
										height: 117,
										marginRight: 1,
										marginTop: 6,
									}}>
									<Image
										source={require("./../../assets/images/group-6-4.png")}
										style={styles.group6Image}/>
									<Image
										source={require("./../../assets/images/fill-7-4.png")}
										style={styles.fill7Image}/>
								</View>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<Image
								source={require("./../../assets/images/group-13-4.png")}
								style={styles.group13Image}/>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0,
								right: 0,
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
													source={require("./../../assets/images/right-6.png")}
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
													source={require("./../../assets/images/left-6.png")}
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
										<Text
											style={styles.pointsText}>0</Text>
										<View
											style={{
												flex: 1,
											}}/>
										<Text
											style={styles.rewardlabelText}>Reward </Text>
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
											marginLeft: 67,
											marginRight: 45,
											flexDirection: "row",
											alignItems: "center",
										}}>
										<View
											style={styles.memberpointsView}>
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
											style={{
												flex: 1,
											}}/>
										<View
											style={styles.walletcreditsView}>
											<View
												pointerEvents="box-none"
												style={{
													height: 34,
												}}>
												<View
													style={styles.creditviewView}>
													<Text
														style={styles.currencyText}>RM</Text>
													<Text
														style={styles.creditsText}>0.00</Text>
												</View>
												<Text
													style={styles.nonActiveText}>non-active</Text>
											</View>
											<View
												style={{
													flex: 1,
												}}/>
											<Text
												style={styles.walletlabelText}>Wallet </Text>
										</View>
									</View>
								</View>
							</View>
						</View>
					</View>
					<View
						style={styles.contentView}>
						<View
							style={styles.membershipLevelView}>
							<View
								style={styles.membershipTwoView}>
								<Image
									source={require("./../../assets/images/group-14-6.png")}
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
									source={require("./../../assets/images/group-3-7.png")}
									style={styles.statusiconImage}/>
								<Text
									style={styles.memberStatusText}>Member Status</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.descriptionText}>Upgrade Member</Text>
							</View>
							<View
								style={styles.orderHistoryView}>
								<Image
									source={require("./../../assets/images/group-14-5.png")}
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
										style={styles.group3TwoImage}/>
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
											source={require("./../../assets/images/clip-5-6.png")}
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
									source={require("./../../assets/images/group-12-4.png")}
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
		backgroundColor: "white",
		flex: 1,
	},
	viewView: {
		backgroundColor: "transparent",
		height: 710,
		marginTop: 20,
	},
	headerView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 212,
	},
	backgroundView: {
		backgroundColor: "rgb(242, 242, 242)",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 212,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	group9View: {
		backgroundColor: "transparent",
		opacity: 0.06,
		width: 96,
		height: 175,
		alignItems: "center",
	},
	group3Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 27,
		height: 51,
		marginTop: 1,
	},
	group6Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 117,
	},
	fill7Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		right: 27,
		width: 36,
		top: 56,
		height: 32,
	},
	group13Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		opacity: 0.07,
		width: 135,
		height: 140,
		marginRight: 36,
		marginTop: 71,
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
		resizeMode: "contain",
		backgroundColor: "transparent",
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
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: null,
		height: 6,
		marginLeft: 13,
		marginRight: 12,
	},
	membershipinfoView: {
		backgroundColor: "transparent",
		width: 281,
		height: 40,
		marginTop: 26,
		flexDirection: "row",
		alignItems: "center",
	},
	memberView: {
		backgroundColor: "transparent",
		width: 72,
		height: 40,
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
	membershipView: {
		backgroundColor: "transparent",
		width: 82,
		height: 38,
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
	goToVipButtonImage: {
		resizeMode: "contain",
		marginRight: 10,
	},
	goToVipButtonText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	arrowImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 7,
		height: 8,
		marginRight: 8,
	},
	pointsView: {
		backgroundColor: "transparent",
		alignSelf: "stretch",
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
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	memberpointsView: {
		backgroundColor: "transparent",
		width: 41,
		height: 50,
	},
	pointsTwoText: {
		backgroundColor: "transparent",
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginLeft: 13,
		marginRight: 14,
	},
	memberlabelText: {
		backgroundColor: "transparent",
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	walletcreditsView: {
		backgroundColor: "transparent",
		width: 85,
		height: 53,
	},
	creditviewView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 19,
		top: 4,
		height: 30,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	currencyText: {
		backgroundColor: "transparent",
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 8,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginTop: 14,
	},
	creditsText: {
		backgroundColor: "transparent",
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 25,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		flex: 1,
		marginLeft: 4,
	},
	nonActiveText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 7,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		position: "absolute",
		right: 0,
		top: 0,
	},
	walletlabelText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		marginLeft: 10,
	},
	contentView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 211,
		height: 387,
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
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
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
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
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
	descriptionText: {
		color: "rgb(184, 180, 180)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginRight: 16,
	},
	orderHistoryView: {
		backgroundColor: "transparent",
		height: 23,
		marginLeft: 39,
		marginRight: 229,
		marginTop: 18,
		flexDirection: "row",
		alignItems: "center",
	},
	historyiconImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 18,
		height: 23,
	},
	orderHistoryText: {
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 23,
	},
	personalInfoView: {
		backgroundColor: "transparent",
		height: 21,
		marginLeft: 38,
		marginRight: 16,
		marginTop: 28,
		flexDirection: "row",
		alignItems: "center",
	},
	personaliconImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 21,
		height: 21,
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
		textAlign: "center",
		backgroundColor: "transparent",
	},
	qrCodeView: {
		backgroundColor: "transparent",
		height: 19,
		marginLeft: 39,
		marginRight: 16,
		marginTop: 33,
		flexDirection: "row",
		alignItems: "center",
	},
	qriconView: {
		backgroundColor: "transparent",
		width: 18,
		height: 18,
	},
	group3TwoImage: {
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
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 23,
	},
	qrdescriptionText: {
		color: "rgb(184, 180, 180)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	exchangeStationView: {
		backgroundColor: "transparent",
		height: 21,
		marginLeft: 38,
		marginRight: 14,
		marginTop: 30,
		flexDirection: "row",
		alignItems: "center",
	},
	redeemiconImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 20,
		height: 21,
	},
	redeemStationText: {
		backgroundColor: "transparent",
		color: "rgb(91, 91, 91)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginLeft: 26,
	},
	redeemdescriptionText: {
		backgroundColor: "transparent",
		color: "rgb(184, 180, 180)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
})
