//
//  VIPPurchase
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { StyleSheet, Image, View, TouchableOpacity, Text, ScrollView } from "react-native"
import {alpha, fontAlpha} from "../common/size";


export default class VIPPurchase extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "VIP Purchase",
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

	onPayPressed = () => {

		const { navigate } = this.props.navigation

		navigate("Transaction")
	}

	render() {

		return <View
			style={styles.VIPView}>
			<ScrollView
				style={styles.scrollviewScrollView}>
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
								source={require("./../../assets/images/coffee-card-05-2.png")}
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
						style={styles.packInformationView}>
						<View
							pointerEvents="box-none"
							style={{
								width: 147 * alpha,
								height: 114 * alpha,
								alignItems: "flex-start",
							}}>
							<Text
								style={styles.welcomeGiftPackText}>Welcome Gift Pack</Text>
							<View
								style={styles.prioritydescriptionView}>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										alignSelf: "center",
										top: 0,
										bottom: 0,
										justifyContent: "center",
									}}>
									<Image
										source={require("./../../assets/images/group-3-16.png")}
										style={styles.group3Image}/>
								</View>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										alignSelf: "center",
										top: 0,
										bottom: 0,
										justifyContent: "center",
									}}>
									<Text
										style={styles.noNeedQueueText}>No need queue</Text>
								</View>
							</View>
							<View
								pointerEvents="box-none"
								style={{
									width: 146 * alpha,
									height: 53 * alpha,
									marginLeft: 1 * alpha,
									marginTop: 9 * alpha,
									flexDirection: "row",
									alignItems: "flex-start",
								}}>
								<View
									style={styles.priorityView}>
									<View
										style={styles.priorityiconView}>
										<Image
											source={require("./../../assets/images/group-4-8.png")}
											style={styles.group4Image}/>
										<View
											style={styles.group2View}>
											<Text
												style={styles.x2Text}>x2</Text>
										</View>
									</View>
									<Text
										style={styles.priorityText}>Priority</Text>
								</View>
								<View
									style={styles.deliveryView}>
									<View
										style={styles.deliveryiconView}>
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
												style={styles.group20View}>
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
														source={require("./../../assets/images/group-7-3.png")}
														style={styles.group7Image}/>
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
														style={styles.stroke8View}/>
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
														source={require("./../../assets/images/group-19-2.png")}
														style={styles.group19Image}/>
												</View>
											</View>
										</View>
										<View
											style={styles.group2CopyView}>
											<Text
												style={styles.x2TwoText}>x2</Text>
										</View>
									</View>
									<Text
										style={styles.freeDeliveryText}>Free Delivery</Text>
								</View>
							</View>
						</View>
						<View
							style={styles.buy1free1View}>
							<View
								style={styles.free1iconView}>
								<Image
									source={require("./../../assets/images/group-9-8.png")}
									style={styles.group9Image}/>
								<View
									style={styles.group2Copy2View}>
									<Text
										style={styles.x1Text}>x1</Text>
								</View>
							</View>
							<Text
								style={styles.buy1Free1Text}>Buy 1 Free 1</Text>
						</View>
						<View
							style={styles.buy2free1View}>
							<View
								style={styles.free2iconView}>
								<Image
									source={require("./../../assets/images/group-13-8.png")}
									style={styles.group13Image}/>
								<View
									style={styles.group2Copy3View}>
									<Text
										style={styles.x2ThreeText}>x2</Text>
								</View>
							</View>
							<Text
								style={styles.buy2Free1Text}>Buy 2 Free 1</Text>
						</View>
					</View>
				</View>
				<View
					style={styles.monthlyAfterActivateView}>
					<Text
						style={styles.detailsText}>Monthly after activate: Silver Member</Text>
					<View
						style={styles.rm5OffView}>
						<Text
							style={styles.descriptionText}>RM5 off with RM150 spend</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.valueText}>x2/mth</Text>
					</View>
					<View
						style={styles.offView}>
						<Text
							style={styles.descriptionTwoText}>10% off on specific drinks</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.valueTwoText}>x1/mth</Text>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<View
						style={styles.termsView}>
						<View
							style={styles.rectangleView}/>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.agreeWithBrew9MemText}>Agree with</Text>
						<Text
							style={styles.agreeWithBrew9MemTwoText}>Brew9 member regulations</Text>
					</View>
				</View>
			</ScrollView>
			<View
				style={styles.totalPayNowView}>
				<View
					style={styles.payNowCopyView}>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 0,
							top: 0,
							bottom: 0,
							justifyContent: "center",
						}}>
						<Text
							style={styles.totalRm15012MontText}>Total:  </Text>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 0,
							right: 0,
							top: 0,
							height: 51 * alpha,
						}}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								right: 0,
								top: 0,
								bottom: 0,
								justifyContent: "center",
							}}>
							<TouchableOpacity
								onPress={this.onPayPressed}
								style={styles.payButton}>
								<Text
									style={styles.payButtonText}>Pay Now</Text>
							</TouchableOpacity>
						</View>
						<View
							style={styles.lineView}/>
					</View>
				</View>
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
	},
	navigationBarItem: {

	},
	navigationBarItemTitle: {
		color: "black",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
	},
	navigationBarItemIcon: {
		tintColor: "black",
	},
	VIPView: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	scrollviewScrollView: {
		backgroundColor: "transparent",
		flex: 1,
	},
	welcomeGiftPackView: {
		backgroundColor: "white",
		height: 365 * alpha,
		marginRight: 1 * alpha,
		alignItems: "flex-end",
	},
	membercardView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 280 * alpha,
		height: 182 * alpha,
		marginTop: 6 * alpha,
	},
	coffeeCard05Image: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: null,
		height: 182 * alpha,
	},
	memberCardText: {
		color: "rgb(82, 46, 30)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		alignSelf: "center",
		top: 10 * alpha,
	},
	packInformationView: {
		backgroundColor: "transparent",
		width: 324 * alpha,
		height: 114 * alpha,
		marginRight: 21 * alpha,
		marginBottom: 21 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	welcomeGiftPackText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	prioritydescriptionView: {
		backgroundColor: "transparent",
		width: 77 * alpha,
		height: 16 * alpha,
		marginTop: 17 * alpha,
	},
	group3Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 77 * alpha,
		height: 16 * alpha,
	},
	noNeedQueueText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	priorityView: {
		backgroundColor: "transparent",
		width: 41 * alpha,
		height: 53 * alpha,
	},
	priorityiconView: {
		backgroundColor: "transparent",
		height: 26 * alpha,
		marginLeft: 2 * alpha,
		marginRight: 2 * alpha,
	},
	group4Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 6 * alpha,
		top: 0,
		height: 22 * alpha,
	},
	group2View: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 7,
		position: "absolute",
		right: 0,
		width: 15 * alpha,
		top: 12 * alpha,
		height: 14 * alpha,
		justifyContent: "center",
	},
	x2Text: {
		color: "rgb(253, 253, 253)",
		fontFamily: "DINPro-Bold",
		fontSize: 8 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 3 * alpha,
		marginRight: 3 * alpha,
	},
	priorityText: {
		backgroundColor: "transparent",
		color: "rgb(51, 51, 51)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 11 * alpha,
	},
	deliveryView: {
		backgroundColor: "transparent",
		width: 78 * alpha,
		height: 53 * alpha,
		marginLeft: 27 * alpha,
	},
	deliveryiconView: {
		backgroundColor: "transparent",
		height: 26 * alpha,
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
	},
	group20View: {
		backgroundColor: "transparent",
		height: 22 * alpha,
		marginRight: 4 * alpha,
	},
	group7Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 21 * alpha,
		marginLeft: 3 * alpha,
	},
	stroke8View: {
		backgroundColor: "rgb(62, 62, 63)",
		height: 2 * alpha,
		marginLeft: 5 * alpha,
		marginRight: 19 * alpha,
	},
	group19Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 21 * alpha,
		marginRight: 5 * alpha,
	},
	group2CopyView: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 7 * alpha,
		position: "absolute",
		right: 1 * alpha,
		width: 15 * alpha,
		top: 12 * alpha,
		height: 14 * alpha,
		justifyContent: "center",
	},
	x2TwoText: {
		backgroundColor: "transparent",
		color: "rgb(253, 253, 253)",
		fontFamily: "DINPro-Bold",
		fontSize: 8 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 3 * alpha,
		marginRight: 3 * alpha,
	},
	freeDeliveryText: {
		color: "rgb(51, 51, 51)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 11 * alpha,
	},
	buy1free1View: {
		backgroundColor: "transparent",
		width: 69 * alpha,
		height: 57 * alpha,
		marginLeft: 18 * alpha,
		marginTop: 57 * alpha,
	},
	free1iconView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 26 * alpha,
		height: 30 * alpha,
	},
	group9Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		position: "absolute",
		left: 0,
		right: 4 * alpha,
		top: 0,
		height: 27 * alpha,
	},
	group2Copy2View: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 7 * alpha,
		position: "absolute",
		left: 10 * alpha,
		right: 0,
		bottom: 0,
		height: 14 * alpha,
		justifyContent: "center",
	},
	x1Text: {
		color: "rgb(253, 253, 253)",
		fontFamily: "DINPro-Bold",
		fontSize: 8 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 4 * alpha,
		marginRight: 3 * alpha,
	},
	buy1Free1Text: {
		backgroundColor: "transparent",
		color: "rgb(51, 51, 51)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 13 * alpha,
	},
	buy2free1View: {
		backgroundColor: "transparent",
		width: 69 * alpha,
		height: 55 * alpha,
		marginLeft: 21 * alpha,
		marginTop: 59 * alpha,
	},
	free2iconView: {
		backgroundColor: "transparent",
		height: 28 * alpha,
		marginLeft: 17 * alpha,
		marginRight: 16 * alpha,
	},
	group13Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		position: "absolute",
		left: 0,
		right: 7 * alpha,
		top: 0,
		height: 22 * alpha,
	},
	group2Copy3View: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 7 * alpha,
		position: "absolute",
		left: 20 * alpha,
		right: 0,
		bottom: 0,
		height: 14 * alpha,
		justifyContent: "center",
	},
	x2ThreeText: {
		backgroundColor: "transparent",
		color: "rgb(253, 253, 253)",
		fontFamily: "DINPro-Bold",
		fontSize: 8 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 4 * alpha,
		marginRight: 3 * alpha,
	},
	buy2Free1Text: {
		color: "rgb(51, 51, 51)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 13 * alpha,
	},
	monthlyAfterActivateView: {
		backgroundColor: "white",
		height: 200 * alpha,
		marginTop: 10 * alpha,
		alignItems: "flex-start",
	},
	detailsText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 30 * alpha,
		marginTop: 29 * alpha,
	},
	rm5OffView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 317 * alpha,
		height: 16 * alpha,
		marginTop: 24 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	descriptionText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	valueText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	offView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 317 * alpha,
		height: 16 * alpha,
		marginTop: 28 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	descriptionTwoText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	valueTwoText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	termsView: {
		backgroundColor: "transparent",
		width: 214 * alpha,
		height: 16 * alpha,
		marginLeft: 31 * alpha,
		marginBottom: 19 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	rectangleView: {
		backgroundColor: "transparent",
		borderRadius: 3 * alpha,
		borderWidth: 1 * alpha,
		borderColor: "rgb(229, 229, 229)",
		borderStyle: "solid",
		width: 16 * alpha,
		height: 16 * alpha,
	},
	agreeWithBrew9MemText: {
		color: "rgb(148, 147, 147)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 11 * alpha,
	},
	agreeWithBrew9MemTwoText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 2 * alpha,
	},
	totalPayNowView: {
		backgroundColor: "transparent",
		height: 51 * alpha,
		justifyContent: "center",
	},
	payNowCopyView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
		marginLeft: 1 * alpha,
	},
	totalRm15012MontText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 30 * alpha,
	},
	payButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	payButton: {
		backgroundColor: "rgb(0, 178, 227)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 129 * alpha,
		height: 50 * alpha,
	},
	payButtonText: {
		color: "white",
		fontFamily: "Helvetica-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	lineView: {
		backgroundColor: "rgb(229, 229, 229)",
		position: "absolute",
		left: 0,
		right: 1 * alpha,
		top: 0,
		height: 1 * alpha,
	},
})
