//
//  MemberWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Image, View, Text, StyleSheet } from "react-native"
import React from "react"


export default class MemberWallet extends React.Component {

	static navigationOptions = ({ navigation }) => {
	
		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	render() {
	
		return <View
				style={styles.iphone8Copy18View}>
				<View
					style={styles.navigationView}>
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
							style={styles.logoView}>
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
									style={styles.rightCircleView}>
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
											source={require("./../../assets/images/right-10.png")}
											style={styles.rightImage}/>
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
									right: 0,
									top: 0,
									bottom: 0,
									justifyContent: "center",
								}}>
								<View
									style={styles.leftDotView}>
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
											source={require("./../../assets/images/left-10.png")}
											style={styles.leftImage}/>
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
							pointerEvents="box-none"
							style={{
								width: 58,
								height: 14,
								marginLeft: 21,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Image
								source={require("./../../assets/images/group-4-3.png")}
								style={styles.group4Image}/>
							<Text
								style={styles.walletText}>Wallet</Text>
						</View>
					</View>
				</View>
				<View
					style={styles.contentView}>
					<Image
						source={require("./../../assets/images/card-04.png")}
						style={styles.card04Image}/>
					<View
						style={styles.balanceView}>
						<View
							style={styles.groupView}>
							<Text
								style={styles.availablaBalanceText}>Availabla Balance</Text>
							<View
								style={styles.rm30View}>
								<Text
									style={styles.rmText}>RM</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.textText}>30</Text>
							</View>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.topUpView}>
							<Text
								style={styles.topUpText}>Top Up</Text>
						</View>
					</View>
					<View
						style={styles.infoView}>
						<View
							pointerEvents="box-none"
							style={{
								height: 84,
							}}>
							<View
								style={styles.changePasswordView}>
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
											height: 14,
											marginLeft: 33,
											marginRight: 41,
											flexDirection: "row",
											alignItems: "center",
										}}>
										<Text
											style={styles.changePasswordText}>Change Password</Text>
										<Image
											source={require("./../../assets/images/group-2.png")}
											style={styles.groupThreeImage}/>
									</View>
								</View>
								<View
									style={styles.seperatorThreeView}/>
							</View>
							<View
								style={styles.transactionHistoryView}>
								<Text
									style={styles.transactionHistoryText}>Transaction History</Text>
								<Image
									source={require("./../../assets/images/group-2.png")}
									style={styles.groupFourImage}/>
							</View>
						</View>
						<View
							style={styles.resetPasswordView}>
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
										height: 14,
										marginLeft: 33,
										marginRight: 41,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={styles.resetPasswordText}>Reset Password</Text>
									<Image
										source={require("./../../assets/images/group-2.png")}
										style={styles.groupTwoImage}/>
								</View>
							</View>
							<View
								style={styles.seperatorTwoView}/>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.faqView}>
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
										height: 14,
										marginLeft: 33,
										marginRight: 41,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={styles.faqText}>FAQ</Text>
									<Image
										source={require("./../../assets/images/group-2.png")}
										style={styles.groupImage}/>
								</View>
							</View>
							<View
								style={styles.seperatorView}/>
						</View>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	iphone8Copy18View: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	navigationView: {
		backgroundColor: "transparent",
		height: 52,
		marginTop: 20,
	},
	logoView: {
		backgroundColor: "white",
		height: 52,
	},
	rightCircleView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
		marginRight: 9,
	},
	rightImage: {
		backgroundColor: "transparent",
		opacity: 0.6,
		resizeMode: "center",
		width: null,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	circleImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 16,
		marginLeft: 12,
		marginRight: 17,
	},
	leftDotView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
		marginRight: 47,
	},
	leftImage: {
		backgroundColor: "transparent",
		opacity: 0.61,
		resizeMode: "center",
		width: null,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	dotImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 6,
		marginLeft: 13,
		marginRight: 12,
	},
	group4Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 13,
		height: 12,
	},
	walletText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 10,
	},
	contentView: {
		backgroundColor: "transparent",
		height: 595,
		alignItems: "center",
	},
	card04Image: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: 285,
		height: 161,
		marginTop: 28,
	},
	balanceView: {
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 120,
		height: 93,
		marginLeft: 125,
		marginTop: 22,
	},
	groupView: {
		backgroundColor: "transparent",
		height: 55,
		marginLeft: 13,
		marginRight: 13,
		alignItems: "flex-start",
	},
	availablaBalanceText: {
		color: "rgb(58, 58, 58)",
		fontFamily: "Helvetica-Bold",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "stretch",
	},
	rm30View: {
		backgroundColor: "transparent",
		width: 56,
		height: 36,
		marginLeft: 8,
		marginTop: 6,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	rmText: {
		backgroundColor: "transparent",
		color: "rgb(58, 58, 58)",
		fontFamily: "Helvetica-Bold",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginTop: 5,
	},
	textText: {
		backgroundColor: "transparent",
		color: "rgb(58, 58, 58)",
		fontFamily: "Helvetica-Bold",
		fontSize: 30,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		alignSelf: "center",
	},
	topUpView: {
		backgroundColor: "rgb(70, 70, 70)",
		borderRadius: 3,
		height: 29,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	topUpText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 37,
	},
	infoView: {
		backgroundColor: "transparent",
		alignSelf: "stretch",
		height: 168,
		marginTop: 19,
	},
	changePasswordView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 41,
		height: 43,
	},
	changePasswordText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	groupThreeImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		flex: 1,
		height: 10,
		marginLeft: 188,
	},
	seperatorThreeView: {
		backgroundColor: "rgb(232, 232, 232)",
		position: "absolute",
		alignSelf: "center",
		width: 311,
		top: 0,
		height: 1,
	},
	transactionHistoryView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 42,
		flexDirection: "row",
		alignItems: "center",
	},
	transactionHistoryText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 33,
	},
	groupFourImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		flex: 1,
		height: 10,
		marginLeft: 180,
		marginRight: 41,
	},
	resetPasswordView: {
		backgroundColor: "transparent",
		height: 42,
	},
	resetPasswordText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	groupTwoImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		flex: 1,
		height: 10,
		marginLeft: 200,
	},
	seperatorTwoView: {
		backgroundColor: "rgb(232, 232, 232)",
		position: "absolute",
		alignSelf: "center",
		width: 310,
		top: 0,
		height: 1,
	},
	faqView: {
		backgroundColor: "transparent",
		height: 42,
	},
	faqText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	groupImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		flex: 1,
		height: 10,
		marginLeft: 268,
	},
	seperatorView: {
		backgroundColor: "rgb(232, 232, 232)",
		position: "absolute",
		alignSelf: "center",
		width: 310,
		top: 0,
		height: 1,
	},
})
