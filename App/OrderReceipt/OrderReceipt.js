//
//  OrderReceipt
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, TouchableOpacity, View, StyleSheet, Image, ScrollView } from "react-native"
import React from "react"
import {alpha, fontAlpha} from "../Common/size";
import {connect} from "react-redux";

@connect(({ members }) => ({
	members:members
}))
export default class OrderReceipt extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Order",
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

	onCustomerServicePressed = () => {
	
	}

	onDirectionIconPressed = () => {
	
	}

	onCallIconPressed = () => {
	
	}

	render() {
	
		return <View
				style={styles.orderReceiptView}>
				<ScrollView
					style={styles.orderScrollView}>
					{/*<TouchableOpacity*/}
					{/*	onPress={this.onCustomerServicePressed}*/}
					{/*	style={styles.customerServiceButton}>*/}
					{/*	<Image*/}
					{/*		source={require("./../../assets/images/group-3-22.png")}*/}
					{/*		style={styles.customerServiceButtonImage}/>*/}
					{/*	<Text*/}
					{/*		style={styles.customerServiceButtonText}>Customer Service</Text>*/}
					{/*</TouchableOpacity>*/}
					<View
						style={styles.orderCartView}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0 * alpha,
								width: 338 * alpha,
								top: 0 * alpha,
								height: 662 * alpha,
								alignItems: "flex-start",
							}}>
							<View
								style={styles.whiteboxView}/>
							<View
								style={styles.viewView}/>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0 * alpha,
								right: 0 * alpha,
								top: 24 * alpha,
								bottom: 61 * alpha,
								alignItems: "center",
							}}>
							<View
								style={styles.completeOrderView}>
								<Image
									source={require("./../../assets/images/group-3-20.png")}
									style={styles.logoImage}/>
								<Text
									style={styles.completedOrderText}>Completed Order</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.thankMessageText}>Thank you for your support, welcome again.</Text>
							</View>
							<View
								style={styles.lineView}/>
							<View
								style={styles.locationView}>
								<View
									style={styles.branchView}>
									<Text
										style={styles.kualaLumpurBranchText}>Kuala Lumpur Branch</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.firstFloorBlockBText}>First Floor, Block B, ABC Mall</Text>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.callView}>
									<TouchableOpacity
										onPress={this.onCallIconPressed}
										style={styles.callIconButton}>
										<Image
											source={require("./../../assets/images/group-3-23.png")}
											style={styles.callIconButtonImage}/>
									</TouchableOpacity>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.callText}>Call</Text>
								</View>
								<View
									style={styles.directionView}>
									<TouchableOpacity
										onPress={this.onDirectionIconPressed}
										style={styles.directionIconButton}>
										<Image
											source={require("./../../assets/images/group-3-17.png")}
											style={styles.directionIconButtonImage}/>
									</TouchableOpacity>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.directionText}>Direction</Text>
								</View>
							</View>
							<View
								style={styles.lineTwoView}/>
							<View
								style={styles.itemTwoView}>
								<View
									pointerEvents="box-none"
									style={{
										alignSelf: "stretch",
										width: 179 * alpha,
										marginTop: 14 * alpha,
										marginBottom: 17 * alpha,
										alignItems: "flex-start",
									}}>
									<Text
										style={styles.nameTwoText}>Grapes</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.descriptionTwoText}>Sugar level, Rose, Cheese{"\n"}Ice blended, Less Sugar, Normal Ice</Text>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.quantityTwoText}>x1</Text>
								<Text
									style={styles.priceTwoText}>29</Text>
							</View>
							<View
								style={styles.item2View}>
								<Text
									style={styles.nameThreeText}>Potato</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.quantityThreeText}>x1</Text>
								<Text
									style={styles.priceThreeText}>9</Text>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								style={styles.voucherView}>
								<Text
									style={styles.nameFourText}>Buy 2 Free 1</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.descriptionThreeText}>-28.00</Text>
							</View>
							<View
								style={styles.voucher2View}>
								<Text
									style={styles.nameFiveText}>Priority Voucher</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.descriptionFourText}>Prior Made</Text>
							</View>
							<View
								style={styles.totalView}>
								<Text
									style={styles.totallabelText}>TOTAL</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.totalText}>70.00</Text>
							</View>
							<View
								style={styles.lineThreeView}/>
							<Text
								style={styles.callrefundText}>Please call for refund.</Text>
						</View>
						<View
							style={styles.itemView}>
							<View
								pointerEvents="box-none"
								style={{
									alignSelf: "stretch",
									width: 179 * alpha,
									marginTop: 14 * alpha,
									marginBottom: 17 * alpha,
									alignItems: "flex-start",
								}}>
								<Text
									style={styles.nameText}>Grapes</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.descriptionText}>Sugar level, Rose, Cheese{"\n"}Ice blended, Less Sugar, Normal Ice</Text>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.quantityText}>x1</Text>
							<Text
								style={styles.priceText}>29</Text>
						</View>
					</View>
				</ScrollView>
			</View>
	}
}

const styles = StyleSheet.create({
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
		width: 70 * alpha,
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
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
	orderReceiptView: {
		backgroundColor: "rgb(238, 238, 238)",
		flex: 1,
	},
	orderScrollView: {
		backgroundColor: "transparent",
		flex: 1,
	},
	customerServiceButtonText: {
		color: "rgb(67, 65, 65)",
		fontFamily: "DINPro-Bold",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	customerServiceButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	customerServiceButton: {
		backgroundColor: "white",
		borderRadius: 14.5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "flex-end",
		width: 119 * alpha,
		height: 29 * alpha,
		marginRight: 19 * alpha,
		marginTop: 13 * alpha,
	},
	orderCartView: {
		backgroundColor: "transparent",
		height: 706 * alpha,
		marginLeft: 18 * alpha,
		marginRight: 19 * alpha,
		marginTop: 13 * alpha,
	},
	whiteboxView: {
		backgroundColor: "white",
		width: 338 * alpha,
		height: 168 * alpha,
	},
	viewView: {
		backgroundColor: "rgb(248, 248, 248)",
		width: 338 * alpha,
		height: 495 * alpha,
	},
	completeOrderView: {
		backgroundColor: "transparent",
		width: 243 * alpha,
		height: 88 * alpha,
		alignItems: "center",
	},
	logoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 23 * alpha,
		height: 46 * alpha,
	},
	completedOrderText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 2 * alpha,
	},
	thankMessageText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		alignSelf: "stretch",
		marginLeft: 2 * alpha,
		marginRight: 2 * alpha,
	},
	lineView: {
		backgroundColor: "rgb(234, 234, 234)",
		alignSelf: "stretch",
		height: 2 * alpha,
		marginTop: 55 * alpha,
	},
	locationView: {
		backgroundColor: "transparent",
		width: 289 * alpha,
		height: 64 * alpha,
		marginTop: 18 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	branchView: {
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 162 * alpha,
		height: 39 * alpha,
	},
	kualaLumpurBranchText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginRight: 12 * alpha,
	},
	firstFloorBlockBText: {
		color: "rgb(146, 146, 146)",
		fontFamily: "DINPro-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 1 * alpha,
	},
	callView: {
		backgroundColor: "transparent",
		width: 35 * alpha,
		height: 62 * alpha,
		marginRight: 8 * alpha,
	},
	callIconButton: {
		backgroundColor: "transparent",
		borderRadius: 17.5 * alpha,
		borderWidth: 1,
		borderColor: "rgb(180, 179, 179)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 35 * alpha,
	},
	callIconButtonText: {
		color: "black",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	callIconButtonImage: {
		resizeMode: "contain",
	},
	callText: {
		color: "rgb(163, 163, 163)",
		fontFamily: "DINPro-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 6 * alpha,
		marginRight: 7 * alpha,
	},
	directionView: {
		backgroundColor: "transparent",
		width: 50 * alpha,
		height: 62 * alpha,
	},
	directionIconButton: {
		backgroundColor: "transparent",
		borderRadius: 17.5 * alpha,
		borderWidth: 1,
		borderColor: "rgb(180, 179, 179)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 35 * alpha,
		marginLeft: 8 * alpha,
		marginRight: 7 * alpha,
	},
	directionIconButtonImage: {
		resizeMode: "contain",
	},
	directionIconButtonText: {
		color: "black",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	directionText: {
		color: "rgb(163, 163, 163)",
		fontFamily: "DINPro-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	lineTwoView: {
		backgroundColor: "rgb(234, 234, 234)",
		width: 291 * alpha,
		height: 1 * alpha,
		marginTop: 12 * alpha,
	},
	itemTwoView: {
		backgroundColor: "transparent",
		width: 289 * alpha,
		height: 90 * alpha,
		marginTop: 89 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	nameTwoText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	descriptionTwoText: {
		color: "rgb(146, 146, 146)",
		fontFamily: "DINPro-Bold",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	quantityTwoText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 52 * alpha,
		marginTop: 26 * alpha,
	},
	priceTwoText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 26 * alpha,
	},
	item2View: {
		backgroundColor: "transparent",
		width: 289 * alpha,
		height: 46 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	nameThreeText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	quantityThreeText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 56 * alpha,
	},
	priceThreeText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 3 * alpha,
	},
	voucherView: {
		backgroundColor: "transparent",
		width: 289 * alpha,
		height: 18 * alpha,
		marginBottom: 17 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	nameFourText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	descriptionThreeText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	voucher2View: {
		backgroundColor: "transparent",
		width: 289 * alpha,
		height: 17 * alpha,
		marginBottom: 23 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	nameFiveText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	descriptionFourText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	totalView: {
		backgroundColor: "transparent",
		width: 290 * alpha,
		height: 21 * alpha,
		marginBottom: 14 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	totallabelText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	totalText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	lineThreeView: {
		backgroundColor: "rgb(234, 234, 234)",
		width: 291 * alpha,
		height: 1 * alpha,
		marginBottom: 13 * alpha,
	},
	callrefundText: {
		color: "rgb(152, 149, 149)",
		fontFamily: "DINPro-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		marginLeft: 26 * alpha,
	},
	itemView: {
		backgroundColor: "transparent",
		position: "absolute",
		alignSelf: "center",
		width: 289 * alpha,
		top: 262 * alpha,
		height: 90 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	nameText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	descriptionText: {
		color: "rgb(146, 146, 146)",
		fontFamily: "DINPro-Bold",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	quantityText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 52 * alpha,
		marginTop: 26 * alpha,
	},
	priceText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 26 * alpha,
	},
})
