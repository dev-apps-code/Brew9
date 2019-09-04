//
//  VIPPurchase
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native"
import React from "react"


export default class VIPPurchase extends React.Component {

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

	onLevelDetailPressed = () => {
	
		const { navigate } = this.props.navigation
		
		navigate("MembershipInfo")
	}

	onPayPressed = () => {
	
		const { navigate } = this.props.navigation
		
		navigate("Transaction")
	}

	render() {
	
		return <View
				style={styles.iphone8Copy21View}>
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
											source={require("./../../assets/images/right-11.png")}
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
											source={require("./../../assets/images/left-11.png")}
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
								width: 77,
								height: 14,
								marginLeft: 21,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Image
								source={require("./../../assets/images/group-4-3.png")}
								style={styles.group4Image}/>
							<Text
								style={styles.goToVipText}>Go to VIP</Text>
						</View>
					</View>
				</View>
				<View
					style={styles.contentView}>
					<View
						style={styles.welcomeGiftPackView}>
						<View
							style={styles.membercardView}>
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
									source={require("./../../assets/images/coffee-card-05.png")}
									style={styles.coffeeCard05Image}/>
							</View>
							<Text
								style={styles.memberCardText}>Member Card</Text>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.giftpackView}>
							<Text
								style={styles.welcomeGiftPackText}>Welcome Gift Pack</Text>
							<View
								style={styles.groupView}>
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
										source={require("./../../assets/images/group-3-10.png")}
										style={styles.group3Image}/>
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
									<Text
										style={styles.noNeedQueueText}>No need queue</Text>
								</View>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								style={styles.packView}>
								<View
									style={styles.priorityView}>
									<View
										style={styles.group14View}>
										<Image
											source={require("./../../assets/images/group-4-4.png")}
											style={styles.group4TwoImage}/>
										<View
											style={styles.group2View}>
											<Text
												style={styles.x2Text}>x2</Text>
										</View>
									</View>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.priorityText}>Priority</Text>
								</View>
								<View
									style={styles.freedeliveryView}>
									<View
										style={styles.group15View}>
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
												source={require("./../../assets/images/group-19.png")}
												style={styles.group19Image}/>
										</View>
										<View
											style={styles.group6View}>
											<Text
												style={styles.x2CopyText}>x2</Text>
										</View>
									</View>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.freeDeliveryText}>Free Delivery</Text>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.buy1free1View}>
									<View
										style={styles.group16View}>
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
												source={require("./../../assets/images/group-9-3.png")}
												style={styles.group9Image}/>
										</View>
										<View
											style={styles.group7View}>
											<Text
												style={styles.x1Text}>x1</Text>
										</View>
									</View>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.buy1Free1Text}>Buy 1 Free 1</Text>
								</View>
								<View
									style={styles.buy2free1View}>
									<View
										style={styles.group17View}>
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
												style={styles.group13View}>
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
														source={require("./../../assets/images/group-5.png")}
														style={styles.group5Image}/>
												</View>
												<Image
													source={require("./../../assets/images/stroke-6.png")}
													style={styles.stroke6Image}/>
												<Image
													source={require("./../../assets/images/stroke-7.png")}
													style={styles.stroke7Image}/>
												<Image
													source={require("./../../assets/images/group-12-7.png")}
													style={styles.group12Image}/>
											</View>
										</View>
										<View
											style={styles.group10View}>
											<Text
												style={styles.x2Copy3Text}>x2</Text>
										</View>
									</View>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.buy2Free1Text}>Buy 2 Free 1</Text>
								</View>
							</View>
						</View>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<View
						style={styles.monthlyawardView}>
						<Text
							style={styles.monthlyAfterActivaText}>Monthly after activate: Silver Member</Text>
						<View
							style={styles.rm5OffView}>
							<Text
								style={styles.rm5OffWithRm150SText}>RM5 off with RM150 spend</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.x2MthText}>x2/mth</Text>
						</View>
						<View
							style={styles.offView}>
							<Text
								style={styles.offOnSpecificText}>10% off on specific drinks</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.x1MthText}>x1/mth</Text>
						</View>
						<TouchableOpacity
							onPress={this.onLevelDetailPressed}
							style={styles.leveldetailButton}>
							<Text
								style={styles.leveldetailButtonText}>Check other level benefit</Text>
							<Image
								source={require("./../../assets/images/arrow.png")}
								style={styles.leveldetailButtonImage}/>
						</TouchableOpacity>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.agreeView}>
							<View
								style={styles.rectangleView}/>
							<Text
								style={styles.agreeWithBrew9MemText}>Agree with</Text>
						</View>
					</View>
					<View
						style={styles.paymentView}>
						<Text
							style={styles.totalRm15012MontText}>Total: </Text>
						<View
							style={{
								flex: 1,
							}}/>
						<TouchableOpacity
							onPress={this.onPayPressed}
							style={styles.payButton}>
							<Text
								style={styles.payButtonText}>Pay Now</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	iphone8Copy21View: {
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
		resizeMode: "center",
		backgroundColor: "transparent",
		opacity: 0.6,
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
		resizeMode: "center",
		backgroundColor: "transparent",
		opacity: 0.61,
		width: null,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	dotImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 6,
		marginLeft: 13,
		marginRight: 12,
	},
	group4Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 13,
		height: 12,
	},
	goToVipText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 10,
	},
	contentView: {
		backgroundColor: "transparent",
		height: 596,
	},
	welcomeGiftPackView: {
		backgroundColor: "white",
		height: 368,
		alignItems: "center",
	},
	membercardView: {
		backgroundColor: "transparent",
		width: 267,
		height: 174,
		marginTop: 23,
	},
	coffeeCard05Image: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: null,
		height: 174,
	},
	memberCardText: {
		backgroundColor: "transparent",
		color: "rgb(82, 46, 30)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		position: "absolute",
		alignSelf: "center",
		top: 13,
	},
	giftpackView: {
		backgroundColor: "transparent",
		width: 274,
		height: 112,
		marginBottom: 20,
		alignItems: "flex-start",
	},
	welcomeGiftPackText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica-Bold",
		fontSize: 13,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	groupView: {
		backgroundColor: "transparent",
		width: 72,
		height: 15,
		marginTop: 20,
	},
	group3Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 15,
	},
	noNeedQueueText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 8,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 9,
		marginRight: 8,
	},
	packView: {
		backgroundColor: "transparent",
		alignSelf: "stretch",
		height: 56,
		marginLeft: 8,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	priorityView: {
		backgroundColor: "transparent",
		width: 38,
		height: 47,
		marginTop: 9,
	},
	group14View: {
		backgroundColor: "transparent",
		height: 25,
	},
	group4TwoImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		position: "absolute",
		left: 0,
		right: 1,
		top: 0,
		height: 21,
	},
	group2View: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 6,
		position: "absolute",
		right: 0,
		width: 12,
		bottom: 0,
		height: 12,
		justifyContent: "center",
	},
	x2Text: {
		backgroundColor: "transparent",
		color: "rgb(253, 253, 253)",
		fontFamily: "Helvetica",
		fontSize: 6,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 3,
		marginRight: 2,
	},
	priorityText: {
		color: "rgb(51, 51, 51)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 5,
		marginRight: 4,
	},
	freedeliveryView: {
		backgroundColor: "transparent",
		width: 54,
		height: 48,
		marginLeft: 25,
		marginTop: 8,
	},
	group15View: {
		backgroundColor: "transparent",
		height: 26,
		marginLeft: 10,
		marginRight: 10,
	},
	group19Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 23,
		marginRight: 3,
	},
	group6View: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 6,
		position: "absolute",
		right: 0,
		width: 12,
		bottom: 0,
		height: 12,
		justifyContent: "center",
	},
	x2CopyText: {
		color: "rgb(253, 253, 253)",
		fontFamily: "Helvetica",
		fontSize: 6,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 3,
		marginRight: 2,
	},
	freeDeliveryText: {
		color: "rgb(51, 51, 51)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	buy1free1View: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 52,
		height: 56,
		marginRight: 23,
	},
	group16View: {
		backgroundColor: "transparent",
		height: 34,
		marginLeft: 13,
		marginRight: 13,
	},
	group9Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 31,
		marginRight: 1,
	},
	group7View: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 6,
		position: "absolute",
		left: 14,
		right: 0,
		bottom: 0,
		height: 12,
		justifyContent: "center",
	},
	x1Text: {
		backgroundColor: "transparent",
		color: "rgb(253, 253, 253)",
		fontFamily: "Helvetica",
		fontSize: 6,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 3,
		marginRight: 2,
	},
	buy1Free1Text: {
		color: "rgb(51, 51, 51)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	buy2free1View: {
		backgroundColor: "transparent",
		width: 52,
		height: 51,
		marginTop: 5,
	},
	group17View: {
		backgroundColor: "transparent",
		height: 29,
		marginLeft: 6,
		marginRight: 7,
	},
	group13View: {
		backgroundColor: "transparent",
		height: 26,
		marginRight: 6,
	},
	group5Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 23,
	},
	stroke6Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 2,
		right: 16,
		top: 6,
		height: 5,
	},
	stroke7Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 16,
		right: 2,
		top: 6,
		height: 5,
	},
	group12Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 13,
		right: 12,
		top: 0,
		height: 6,
	},
	group10View: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 6,
		position: "absolute",
		right: 0,
		width: 12,
		bottom: 0,
		height: 12,
		justifyContent: "center",
	},
	x2Copy3Text: {
		color: "rgb(253, 253, 253)",
		fontFamily: "Helvetica",
		fontSize: 6,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 3,
		marginRight: 2,
	},
	buy2Free1Text: {
		backgroundColor: "transparent",
		color: "rgb(51, 51, 51)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	monthlyawardView: {
		backgroundColor: "white",
		alignSelf: "flex-start",
		width: 375,
		height: 177,
		marginBottom: 2,
		alignItems: "flex-start",
	},
	monthlyAfterActivaText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 49,
		marginTop: 19,
	},
	rm5OffView: {
		backgroundColor: "transparent",
		alignSelf: "stretch",
		height: 14,
		marginLeft: 49,
		marginRight: 54,
		marginTop: 14,
		flexDirection: "row",
		alignItems: "center",
	},
	rm5OffWithRm150SText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	x2MthText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	offView: {
		backgroundColor: "transparent",
		alignSelf: "stretch",
		height: 14,
		marginLeft: 49,
		marginRight: 55,
		marginTop: 13,
		flexDirection: "row",
		alignItems: "center",
	},
	offOnSpecificText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	x1MthText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	leveldetailButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "center",
		width: 240,
		height: 20,
		marginTop: 15,
	},
	leveldetailButtonImage: {
		resizeMode: "contain",
		marginLeft: 10,
	},
	leveldetailButtonText: {
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	agreeView: {
		backgroundColor: "transparent",
		width: 173,
		height: 11,
		marginLeft: 44,
		marginBottom: 15,
		flexDirection: "row",
		alignItems: "center",
	},
	rectangleView: {
		backgroundColor: "transparent",
		borderRadius: 1,
		borderWidth: 1,
		borderColor: "rgb(229, 229, 229)",
		borderStyle: "solid",
		width: 11,
		height: 11,
	},
	agreeWithBrew9MemText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		flex: 1,
		marginLeft: 9,
	},
	paymentView: {
		backgroundColor: "white",
		height: 39,
		flexDirection: "row",
		alignItems: "center",
	},
	totalRm15012MontText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 13,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 46,
	},
	payButton: {
		backgroundColor: "rgb(0, 178, 227)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 109,
		height: 39,
	},
	payButtonImage: {
		resizeMode: "contain",
		marginRight: 10,
	},
	payButtonText: {
		color: "white",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
})
