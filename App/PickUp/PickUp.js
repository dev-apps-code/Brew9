//
//  PickUp
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native"
import React from "react"
import {alpha, fontAlpha} from "../Common/size";
import { ScrollView } from "react-native-gesture-handler";

export default class PickUp extends React.Component {

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
			tabBarLabel: "Pickup",
			tabBarIcon: ({ iconTintColor, focused }) => {
				const image = focused 
				? require('./../../assets/images/pickup_selected.png') 
				: require('./../../assets/images/pickup.png')

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

	}

	onOrderHistoryPressed = () => {

		const { navigate } = this.props.navigation

		navigate("OrderHistory")
	}

	onOrderPressed = () => {

	}

	renderQueueView() {

		return <View
				style={styles.pickUpQueueView}>
				<View
					pointerEvents="box-none"
					style={{
						alignSelf: "flex-start",
						width: 193 * alpha,
						height: 29 * alpha,
						marginLeft: 19 * alpha,
						marginTop: 43 * alpha,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					{/* <TouchableOpacity
						onPress={this.onCustomerServicePressed}
						style={styles.customerServiceButton}>
						<Image
							source={require("./../../assets/images/group-8-22.png")}
							style={styles.customerServiceButtonImage}/>
						<Text
							style={styles.customerServiceButtonText}>Customer {"\n"}Service</Text>
					</TouchableOpacity> */}
					<TouchableOpacity
						onPress={this.onSaySomethingPressed}
						style={styles.saySomethingButton}>
						<Image
							source={require("./../../assets/images/group-9-12.png")}
							style={styles.saySomethingButtonImage}/>
						<Text
							style={styles.saySomethingButtonText}>Say{"\n"}Something</Text>
					</TouchableOpacity>
				</View>
				<View
					style={styles.queueView}>
					<View
						pointerEvents="box-none"
						style={{
							alignSelf: "flex-end",
							width: 102 * alpha,
							height: 52 * alpha,
							marginRight: 111 * alpha,
							marginTop: 19 * alpha,
						}}>
						<Text
							style={styles.queuenumberText}>8428</Text>
						<Text
							style={styles.queueheaderText}>Queue Number</Text>
					</View>
					<View
						style={styles.progressView}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0 * alpha,
								right: 0 * alpha,
								top: 0 * alpha,
								bottom: 0 * alpha,
								justifyContent: "center",
							}}>
							<View
								pointerEvents="box-none"
								style={{
									height: 50 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<View
									style={styles.orderedView}>
									<Image
										source={require("./../../assets/images/group-9-copy-13.png")}
										style={styles.orderedImage}/>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.orderedText}>Ordered</Text>
								</View>
								<Image
									source={require("./../../assets/images/group-11-copy-5.png")}
									style={styles.dividerImage}/>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.pickUpView}>
									<Image
										source={require("./../../assets/images/group-7-copy-8.png")}
										style={styles.pickupImage}/>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.pickUpText}>Pick Up</Text>
								</View>
							</View>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								right: 0 * alpha,
								top: 0 * alpha,
								bottom: 0 * alpha,
								justifyContent: "center",
							}}>
							<View
								pointerEvents="box-none"
								style={{
									width: 87 * alpha,
									height: 53 * alpha,
									marginRight: 54 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<View
									style={styles.processingView}>
									<Image
										source={require("./../../assets/images/group-13-11.png")}
										style={styles.processingImage}/>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.processingText}>Processing</Text>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<Image
									source={require("./../../assets/images/group-11-copy-5.png")}
									style={styles.dividerTwoImage}/>
							</View>
						</View>
					</View>
					<View
						style={styles.waitingView}>
						<Text
							style={styles.queuelengthText}>14</Text>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.messageText}>Notification will be sent when your drinks are ready</Text>
				</View>
				<View
					style={styles.orderDetailView}>
					<View
						style={styles.branchDirectionView}>
						<Image
							source={require("./../../assets/images/top-fill.png")}
							style={styles.topFillImage}/>
						<View
							pointerEvents="box-none"
							style={{
								flex: 1,
								justifyContent: "center",
							}}>
							<View
								pointerEvents="box-none"
								style={{
									height: 50 * alpha,
									marginLeft: 25 * alpha,
									marginRight: 21 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<View
									style={styles.branchAddressView}>
									<Text
										style={styles.puchongBranchText}>Puchong Branch</Text>
									<View
										pointerEvents="box-none"
										style={{
											flex: 1,
											marginRight: 55 * alpha,
											marginTop: 2 * alpha,
										}}>
										<Text
											style={styles.puchongSelangorText}>Puchong Selangor</Text>
										<Text
											style={styles.textText}>0071-2</Text>
									</View>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<TouchableOpacity
									onPress={this.onCallPressed}
									style={styles.callButton}>
									<Image
										source={require("./../../assets/images/group-6-23.png")}
										style={styles.callButtonImage}/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={this.onDirectionPressed}
									style={styles.directionButton}>
									<Image
										source={require("./../../assets/images/group-3-30.png")}
										style={styles.directionButtonImage}/>
								</TouchableOpacity>
							</View>
							<View
							style={styles.lineView}/>
						</View>
						
					</View>
					<View
						pointerEvents="box-none"
						style={{
							flex: 1,
						}}>
						<View
							style={styles.cartView}>
							<View
								style={styles.drinksView}>
								<Text
									style={styles.mochaText}>Mocha</Text>
								<View
									pointerEvents="box-none"
									style={{
										height: 37 * alpha,
										marginTop: 2 * alpha,
										flexDirection: "row",
										alignItems: "flex-start",
									}}>
									<Text
										style={styles.noStrawNormalSugText}>No straw, Normal sugar, Normal ice (Recommended)</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.x1Text}>x1</Text>
									<Text
										style={styles.rm11Text}>RM 11</Text>
								</View>
								<Image
									source={require("./../../assets/images/group-109-copy.png")}
									style={styles.dottedLineImage}/>
							</View>
							<View
								style={styles.drinksView}>
								<Text
									style={styles.mochaText}>Mocha</Text>
								<View
									pointerEvents="box-none"
									style={{
										height: 37 * alpha,
										marginTop: 2 * alpha,
										flexDirection: "row",
										alignItems: "flex-start",
									}}>
									<Text
										style={styles.noStrawNormalSugText}>No straw, Normal sugar, Normal ice (Recommended)</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.x1Text}>x1</Text>
									<Text
										style={styles.rm11Text}>RM 11</Text>
								</View>
								<Image
									source={require("./../../assets/images/group-109-copy.png")}
									style={styles.dottedLineImage}/>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								style={styles.totalView}>
								<Text
									style={styles.totalText}>Total</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.rm1100Text}>RM 11.00</Text>
							</View>
						</View>
					</View>
					<View
						style={styles.remarkView}>
						<Image
							source={require("./../../assets/images/bottom-fill.png")}
							style={styles.bottomFillImage}/>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 22 * alpha,
								right: 21 * alpha,
								top: 11 * alpha,
								bottom: 11 * alpha,
								alignItems: "flex-start",
							}}>
							<View
								style={styles.lineTwoView}/>
							<Text
								style={styles.pleaseCallBranchFText}>Please call branch for refund</Text>
							<View
								pointerEvents="box-none"
								style={{
									alignSelf: "stretch",
									height: 19 * alpha,
									marginLeft: 3 * alpha,
									marginRight: 4 * alpha,
									flexDirection: "row",
									alignItems: "flex-start",
								}}>
								<Text
									style={styles.orderTime100717Text}>Order time:  10/07 17:42</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<TouchableOpacity
									onPress={this.onCopyPressed}
									style={styles.copyButton}>
									<Text
										style={styles.copyButtonText}>Copy</Text>
								</TouchableOpacity>
							</View>
							<Text
								style={styles.orderNo020028201Text}>Order no.:  0200282019100</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.remarkNoPackingText}>Remark:  No packing</Text>
						</View>
					</View>
				</View>
			</View>
	}

	renderEmpty() {
		return <View
			style={styles.noOrderView}>
			<View
				style={styles.viewView}>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						alignSelf: "center",
						top: 0 * alpha,
						bottom: 0 * alpha,
						justifyContent: "center",
					}}>
					<View
						style={styles.centerView}>
						<Image
							source={require("./../../assets/images/brew9-doodle-09-3.png")}
							style={styles.logoImage}/>
						<View
							style={styles.messageView}>
							<Text
								style={styles.youHavenTMakeAnyText}>You haven’t make any order yet.</Text>
							<Text
								style={styles.grabYoursNowText}>Grab yours now!</Text>
						</View>
					</View>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						alignSelf: "center",
						width: 185 * alpha,
						bottom: 23 * alpha,
						height: 72 * alpha,
						justifyContent: "flex-end",
						alignItems: "center",
					}}>
					<TouchableOpacity
						onPress={this.onOrderPressed}
						style={styles.orderButton}>
						<Text
							style={styles.orderButtonText}>Order</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.onOrderHistoryPressed}
						style={styles.orderHistoryButton}>
						<Text
							style={styles.orderHistoryButtonText}>Order History</Text>
						<Image
							source={require("./../../assets/images/group-2.png")}
							style={styles.orderHistoryButtonImage}/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	}
	render() {
		
		return <ScrollView
				style={styles.pickUpMainView}>
				{/* {this.renderEmpty()} */}
				{this.renderQueueView()}
			</ScrollView>
	}
}

const styles = StyleSheet.create({
	pickUpMainView: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	noOrderView: {
		backgroundColor: "white",
		borderRadius: 13 * alpha,
		flex: 1,
		marginLeft: 24 * alpha,
		marginRight: 24 * alpha,
		marginTop: 70 * alpha,
		marginBottom: 70 * alpha,
		alignItems: "center",
	},
	viewView: {
		backgroundColor: "transparent",
		flex: 1,
		width: 185 * alpha,
	},
	centerView: {
		backgroundColor: "transparent",
		width: 181 * alpha,
		height: 140 * alpha,
		alignItems: "center",
	},
	logoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 65 * alpha,
		height: 89 * alpha,
	},
	messageView: {
		backgroundColor: "transparent",
		width: 180 * alpha,
		height: 35 * alpha,
		marginTop: 16 * alpha,
		alignItems: "center",
	},
	youHavenTMakeAnyText: {
		color: "rgb(134, 134, 134)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	grabYoursNowText: {
		backgroundColor: "transparent",
		color: "rgb(134, 134, 134)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginTop: 7 * alpha,
	},
	orderButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 185 * alpha,
		height: 33 * alpha,
		marginBottom: 23 * alpha,
	},
	orderButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	orderButtonText: {
		color: "rgb(254, 254, 254)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	orderHistoryButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 113 * alpha,
		height: 16 * alpha,
	},
	orderHistoryButtonText: {
		color: "rgb(176, 176, 176)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	orderHistoryButtonImage: {
		resizeMode: "contain",
		marginLeft: 10 * alpha,
	},








	pickUpQueueView: {
		backgroundColor: "rgb(239, 239, 239)",
		flex: 1,
	},
	customerServiceButton: {
		backgroundColor: "rgb(251, 251, 251)",
		borderRadius: 14.5 * alpha,
		shadowColor: "rgba(240, 240, 240, 0.5)",
		shadowRadius: 1,
		shadowOpacity: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 96 * alpha,
		height: 29 * alpha,
	},
	customerServiceButtonText: {
		color: "rgb(51, 51, 51)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	customerServiceButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	saySomethingButton: {
		backgroundColor: "rgb(251, 251, 251)",
		borderRadius: 14.5,
		shadowColor: "rgba(240, 240, 240, 0.5)",
		shadowRadius: 1,
		shadowOpacity: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 96 * alpha,
		height: 29 * alpha,
		marginLeft: 1 * alpha,
	},
	saySomethingButtonText: {
		color: "rgb(51, 51, 51)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	saySomethingButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	queueView: {
		backgroundColor: "rgb(253, 253, 253)",
		borderTopRightRadius: 14 * alpha,
		borderTopLeftRadius: 14 * alpha,
		height: 228 * alpha,
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
		marginTop: 16 * alpha,
		alignItems: "center",
	},
	queuenumberText: {
		backgroundColor: "transparent",
		color: "rgb(50, 50, 50)",
		fontFamily: "DINPro-Medium",
		fontSize: 26 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		position: "absolute",
		right: 24 * alpha,
		top: 18 * alpha,
	},
	queueheaderText: {
		color: "rgb(50, 50, 50)",
		fontFamily: "DINPro-Medium",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		right: 0 * alpha,
		top: 0 * alpha,
	},
	progressView: {
		backgroundColor: "transparent",
		width: 220 * alpha,
		height: 53 * alpha,
		marginTop: 20 * alpha,
	},
	orderedView: {
		backgroundColor: "transparent",
		width: 48 * alpha,
		height: 50 * alpha,
	},
	orderedImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 26 * alpha,
		marginLeft: 14 * alpha,
		marginRight: 11 * alpha,
	},
	orderedText: {
		color: "rgb(205, 207, 208)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	dividerImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 22 * alpha,
		height: 4 * alpha,
		marginLeft: 9 * alpha,
	},
	pickUpView: {
		backgroundColor: "transparent",
		width: 45 * alpha,
		height: 49 * alpha,
	},
	pickupImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 25 * alpha,
		marginLeft: 9 * alpha,
		marginRight: 10 * alpha,
	},
	pickUpText: {
		color: "rgb(205, 207, 208)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	processingView: {
		backgroundColor: "transparent",
		width: 65 * alpha,
		height: 53 * alpha,
	},
	processingImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 27 * alpha,
		height: 28 * alpha,
		marginLeft: 18 * alpha,
	},
	processingText: {
		color: "rgb(35, 31, 32)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	dividerTwoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 22 * alpha,
		height: 4 * alpha,
	},
	waitingView: {
		backgroundColor: "rgb(241, 241, 241)",
		borderRadius: 15 * alpha,
		width: 137 * alpha,
		height: 30 * alpha,
		marginTop: 9 * alpha,
		justifyContent: "center",
		alignItems: "center",
	},
	queuelengthText: {
		color: "rgb(136, 136, 136)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	messageText: {
		color: "rgb(136, 136, 136)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginBottom: 14 * alpha,
	},
	orderDetailView: {
		backgroundColor: "transparent",
		flex: 1,
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
		marginTop: 5 * alpha,
		marginBottom: 10 * alpha,
	},
	branchDirectionView: {
		backgroundColor: "transparent",
		left: 0 * alpha,
		right: 2 * alpha,
		top: 0 * alpha,
		height: 90 * alpha,
	},
	topFillImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 90 * alpha,
	},
	branchAddressView: {
		backgroundColor: "transparent",
		width: 154 * alpha,
		height: 50 * alpha,
	},
	puchongBranchText: {
		color: "rgb(63, 63, 63)",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginRight: 35 * alpha,
	},
	puchongSelangorText: {
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
	},
	textText: {
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 1 * alpha,
		bottom: 0 * alpha,
	},
	callButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	callButton: {
		backgroundColor: "transparent",
		borderRadius: 18 * alpha,
		borderWidth: 1 * alpha,
		borderColor: "rgb(149, 149, 149)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 36 * alpha,
		height: 36 * alpha,
		marginRight: 15 * alpha,
	},
	callButtonImage: {
		resizeMode: "contain",
	},
	directionButton: {
		backgroundColor: "transparent",
		borderRadius: 18 * alpha,
		borderWidth: 1 * alpha,
		borderColor: "rgb(149, 149, 149)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 36 * alpha,
		height: 36 * alpha,
	},
	directionButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	directionButtonImage: {
		resizeMode: "contain",
	},
	lineView: {
		backgroundColor: "rgb(231, 231, 231)",
		height: 2 * alpha,
		marginLeft: 22 * alpha,
		marginRight: 22 * alpha,
		marginTop: 26 * alpha,
	},
	cartView: {
		backgroundColor: "rgb(245, 245, 245)",
		flex: 1,
		marginTop: -1 * alpha,
	},
	drinksView: {
		backgroundColor: "transparent",
		height: 84 * alpha,
		marginLeft: 25 * alpha,
		marginRight: 24 * alpha,
		marginTop: 10 * alpha,
	},
	mochaText: {
		backgroundColor: "transparent",
		color: "rgb(63, 63, 63)",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		alignSelf: "flex-start",
	},
	noStrawNormalSugText: {
		backgroundColor: "transparent",
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 191 * alpha,
		marginTop: 6 * alpha,
	},
	x1Text: {
		backgroundColor: "transparent",
		color: "rgb(50, 50, 50)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginRight: 16 * alpha,
	},
	rm11Text: {
		backgroundColor: "transparent",
		color: "rgb(50, 50, 50)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	dottedLineImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: null,
		height: 2 * alpha,
		marginTop: 22 * alpha,
	},
	totalView: {
		backgroundColor: "transparent",
		height: 21 * alpha,
		marginLeft: 25 * alpha,
		marginRight: 24 * alpha,
		marginTop: 26 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	totalText: {
		backgroundColor: "transparent",
		color: "rgb(63, 63, 63)",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	rm1100Text: {
		backgroundColor: "transparent",
		color: "rgb(50, 50, 50)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		alignSelf: "flex-start",
		marginTop: 4 * alpha,
	},
	remarkView: {
		backgroundColor: "transparent",
		flex: 1,
		marginTop: -1,
		height: 116 * alpha,
		paddingBottom: 10 * alpha,
	},
	bottomFillImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		position: "absolute",
		alignSelf: "center",
		width: 334 * alpha,
		top: 0 * alpha,
		height: 116 * alpha,
	},
	lineTwoView: {
		backgroundColor: "rgb(231, 231, 231)",
		alignSelf: "stretch",
		height: 2 * alpha,
	},
	pleaseCallBranchFText: {
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 3 * alpha,
		marginTop: 21 * alpha,
	},
	orderTime100717Text: {
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 2 * alpha,
	},
	copyButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	copyButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 27 * alpha,
		height: 16 * alpha,
	},
	copyButtonText: {
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	orderNo020028201Text: {
		backgroundColor: "transparent",
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginLeft: 3 * alpha,
		marginTop: 1 * alpha,
	},
	remarkNoPackingText: {
		backgroundColor: "transparent",
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginLeft: 3 * alpha,
	},
})