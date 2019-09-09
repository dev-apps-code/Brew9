//
//  Checkout
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { TextInput, StyleSheet, View, TouchableOpacity, Image, Text, ScrollView } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";

export default class Checkout extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Checkout",
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

	onBranchButtonPressed = () => {

	}

	onLocationButtonPressed = () => {

	}

	onDeliveryButtonPressed = () => {

	}

	onButtonPressed = () => {

	}

	onAutoFillPressed = () => {

	}

	onPromoCodePressed = () => {

	}

	onPaymentMethodPressed = () => {

	}

	onPayNowPressed = () => {

		const { navigate } = this.props.navigation

		navigate("Transaction")
	}

	render() {

		return <View
			style={styles.checkoutView}>
			<ScrollView
				style={styles.scrollviewScrollView}>
				<View
					style={styles.branchView}>
					<View
						style={styles.branchTwoView}>
						<View
							pointerEvents="box-none"
							style={{
								alignSelf: "stretch",
								height: 31 * alpha,
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							<TouchableOpacity
								onPress={this.onBranchButtonPressed}
								style={styles.branchbuttonButton}>
								<Text
									style={styles.branchbuttonButtonText}>Branch</Text>
								<Image
									source={require("./../../assets/images/group-2.png")}
									style={styles.branchbuttonButtonImage}/>
							</TouchableOpacity>
							<View
								style={{
									flex: 1,
								}}/>
							<TouchableOpacity
								onPress={this.onLocationButtonPressed}
								style={styles.locationbuttonButton}>
								<Image
									source={require("./../../assets/images/group-8-11.png")}
									style={styles.locationbuttonButtonImage}/>
							</TouchableOpacity>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.distanceText}>Distance 1km, please confirm your nearest branch</Text>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							height: 54 * alpha,
							marginLeft: 15 * alpha,
							marginRight: 15 * alpha,
							marginTop: 23 * alpha,
							flexDirection: "row",
							alignItems: "flex-start",
						}}>
						<View
							style={styles.selfPickUpView}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 25 * alpha,
									right: 0,
									bottom: 0,
									height: 39 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Image
									source={require("./../../assets/images/pick-up-2.png")}
									style={styles.pickUpImage}/>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.selfPickUpText}>Self Pick-up</Text>
								<Image
									source={require("./../../assets/images/fill-1-3.png")}
									style={styles.fill1Image}/>
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
								<TouchableOpacity
									onPress={this.onButtonPressed}
									style={styles.pickupbuttonButton}>
									<Text
										style={styles.pickupbuttonButtonText}></Text>
								</TouchableOpacity>
							</View>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.deliveryView}>
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
										height: 23 * alpha,
										marginLeft: 36 * alpha,
										marginRight: 26 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Image
										source={require("./../../assets/images/delivery-2.png")}
										style={styles.deliveryImage}/>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.deliveryText}>Delivery</Text>
								</View>
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
								<TouchableOpacity
									onPress={this.onDeliveryButtonPressed}
									style={styles.deliverybuttonButton}>
									<Text
										style={styles.deliverybuttonButtonText}></Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<View
						style={styles.contactView}>
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
									height: 24 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Text
									style={styles.contactText}>Contact</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<TouchableOpacity
									onPress={this.onAutoFillPressed}
									style={styles.autoFillButton}>
									<Text
										style={styles.autoFillButtonText}>Auto-fill</Text>
								</TouchableOpacity>
							</View>
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
							<TextInput
								autoCorrect={false}
								placeholder="Drop your contact, so we can contact you"
								style={styles.contactinputTextInput}/>
						</View>
					</View>
				</View>
				<View
					style={styles.orderConfirmationView}>
					<Text
						style={styles.orderConfirmationText}>Order Confirmation</Text>
					<View
						style={styles.itemView}>
						<Text
							style={styles.nameText}>Espresso</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.quantityText}>X 2</Text>
						<Text
							style={styles.priceText}>RM20</Text>
					</View>
					<View
						style={styles.itemTwoView}>
						<Text
							style={styles.nameTwoText}>Espresso</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.quantityTwoText}>X 2</Text>
						<Text
							style={styles.priceTwoText}>RM20</Text>
					</View>
					<View
						style={styles.promoCodeView}>
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
									marginLeft: 16 * alpha,
									marginRight: 16 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Text
									style={styles.promoCodeText}>Promo Code</Text>
								<Image
									source={require("./../../assets/images/group-10-2.png")}
									style={styles.group10Image}/>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.noText}>No</Text>
								<Image
									source={require("./../../assets/images/group-4-5.png")}
									style={styles.group4Image}/>
							</View>
						</View>
						<TouchableOpacity
							onPress={this.onPromoCodePressed}
							style={styles.promocodeButton}>
							<Text
								style={styles.promocodeButtonText}>Click me</Text>
						</TouchableOpacity>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.totalText}>Total 3 units:</Text>
				</View>
			</ScrollView>
				<View
					style={{
						flex: 1,
					}}/>
				<View
					style={styles.paymentMethodView}>
					<TouchableOpacity
						onPress={this.onPaymentMethodPressed}
						style={styles.paymentmethodButton}>
						<Text
							style={styles.paymentmethodButtonText}></Text>
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
							style={styles.paymentMethodTwoView}>
							<Text
								style={styles.paymentMethodText}>Payment Method</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								style={styles.group7View}>
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
										source={require("./../../assets/images/group-3-11.png")}
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
									<Image
										source={require("./../../assets/images/group-6-6.png")}
										style={styles.group6Image}/>
								</View>
							</View>
							<View
								style={styles.ovalView}/>
							<Image
								source={require("./../../assets/images/group-4-5.png")}
								style={styles.group4TwoImage}/>
						</View>
					</View>
				</View>
				<View
					style={styles.remarkView}>
					<View
						style={styles.remarkTwoView}>
						<Text
							style={styles.remarkText}>Remark</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.noSugarText}>No sugar</Text>
						<Image
							source={require("./../../assets/images/group-4-5.png")}
							style={styles.group4ThreeImage}/>
					</View>
				</View>
				<View
					style={styles.totalPayNowView}>
					<Text
						style={styles.priceThreeText}>RM32</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<TouchableOpacity
						onPress={this.onPayNowPressed}
						style={styles.payNowButton}>
						<Text
							style={styles.payNowButtonText}>Pay Now</Text>
					</TouchableOpacity>
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
	scrollviewScrollView: {
		backgroundColor: "transparent",
		height: "100%",
	},
	checkoutView: {
		backgroundColor: "rgb(247, 247, 247)",
		flex: 1,
	},
	branchView: {
		backgroundColor: "white",
		height: 173 * alpha,
	},
	branchTwoView: {
		backgroundColor: "transparent",
		height: 38 * alpha,
		marginLeft: 15 * alpha,
		marginRight: 15 * alpha,
		marginTop: 14 * alpha,
		alignItems: "flex-start",
	},
	branchbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 87 * alpha,
		height: 22 * alpha,
	},
	branchbuttonButtonImage: {
		resizeMode: "contain",
		marginLeft: 10 * alpha,
	},
	branchbuttonButtonText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	locationbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "center",
		width: 23 * alpha,
		height: 23 * alpha,
	},
	locationbuttonButtonImage: {
		resizeMode: "contain",
	},
	locationbuttonButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	distanceText: {
		color: "rgb(163, 163, 163)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	selfPickUpView: {
		backgroundColor: "white",
		borderWidth: 1 * alpha,
		borderColor: "rgb(0, 178, 227)",
		borderStyle: "solid",
		width: 168 * alpha,
		height: 54 * alpha,
	},
	pickUpImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 32 * alpha,
		height: 26 * alpha,
	},
	selfPickUpText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 11 * alpha,
	},
	fill1Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 17 * alpha,
		height: 17 * alpha,
	},
	pickupbuttonButtonImage: {
		resizeMode: "contain",
	},
	pickupbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 168 * alpha,
		height: 54 * alpha,
	},
	pickupbuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	deliveryView: {
		backgroundColor: "white",
		borderWidth: 1 * alpha,
		borderColor: "rgb(151, 151, 151)",
		borderStyle: "solid",
		width: 168 * alpha,
		height: 54 * alpha,
	},
	deliveryImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 35 * alpha,
		height: 23 * alpha,
	},
	deliveryText: {
		color: "rgb(70, 76, 84)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	deliverybuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 168 * alpha,
		height: 54 * alpha,
	},
	deliverybuttonButtonImage: {
		resizeMode: "contain",
	},
	deliverybuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	contactView: {
		backgroundColor: "transparent",
		height: 24 * alpha,
		marginLeft: 15 * alpha,
		marginRight: 15 * alpha,
		marginBottom: 5 * alpha,
	},
	contactText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	autoFillButton: {
		backgroundColor: "transparent",
		borderWidth: 1 * alpha,
		borderColor: "rgb(0, 178, 227)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 45 * alpha,
		height: 24 * alpha,
	},
	autoFillButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	autoFillButtonText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	contactinputTextInput: {
		color: "rgb(219, 212, 212)",
		fontFamily: "Helvetica",
		fontSize: 10.5 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		padding: 0,
		width: 229 * alpha,
		height: 14 * alpha,
	},
	orderConfirmationView: {
		backgroundColor: "white",
		height: 220 * alpha,
		marginTop: 10 * alpha,
	},
	orderConfirmationText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		marginLeft: 16 * alpha,
		marginTop: 13 * alpha,
	},
	itemView: {
		backgroundColor: "transparent",
		height: 40 * alpha,
		marginTop: 10 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	nameText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 16 * alpha,
	},
	quantityText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 13 * alpha,
	},
	priceText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 15 * alpha,
	},
	itemTwoView: {
		backgroundColor: "transparent",
		height: 40 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	nameTwoText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 16 * alpha,
	},
	quantityTwoText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 16 * alpha,
	},
	priceTwoText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 15 * alpha,
	},
	promoCodeView: {
		backgroundColor: "transparent",
		height: 45 * alpha,
		marginTop: 13 * alpha,
	},
	promoCodeText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	group10Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 13 * alpha,
		height: 14 * alpha,
		marginLeft: 8 * alpha,
	},
	noText: {
		backgroundColor: "transparent",
		color: "rgb(181, 181, 181)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 5 * alpha,
	},
	group4Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 11 * alpha,
		height: 11 * alpha,
	},
	promocodeButton: {
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
	promocodeButtonText: {
		color: "white",
		fontFamily: "Helvetica-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	promocodeButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	totalText: {
		color: "rgb(135, 135, 135)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		marginRight: 16 * alpha,
		marginBottom: 8 * alpha,
	},
	paymentMethodView: {
		backgroundColor: "white",
		height: 41 * alpha,
	},
	paymentmethodButton: {
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
	paymentmethodButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	paymentmethodButtonImage: {
		resizeMode: "contain",
	},
	paymentMethodTwoView: {
		backgroundColor: "transparent",
		height: 41 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	paymentMethodText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 16 * alpha,
	},
	group7View: {
		backgroundColor: "transparent",
		width: 26 * alpha,
		height: 27 * alpha,
		marginRight: 8 * alpha,
	},
	group3Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 24 * alpha,
		marginRight: 2 * alpha,
	},
	group6Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 24 * alpha,
	},
	ovalView: {
		backgroundColor: "rgb(232, 88, 88)",
		borderRadius: 3.5 * alpha,
		width: 7 * alpha,
		height: 7 * alpha,
		marginRight: 9 * alpha,
	},
	group4TwoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 11 * alpha,
		height: 11 * alpha,
		marginRight: 16 * alpha,
	},
	remarkView: {
		backgroundColor: "white",
		height: 41 * alpha,
		justifyContent: "center",
	},
	remarkTwoView: {
		backgroundColor: "transparent",
		height: 41 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	remarkText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 16 * alpha,
	},
	noSugarText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 7 * alpha,
	},
	group4ThreeImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 11 * alpha,
		height: 11 * alpha,
		marginRight: 16 * alpha,
	},
	totalPayNowView: {
		backgroundColor: "transparent",
		height: 47 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	priceThreeText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica-Bold",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 16 * alpha,
	},
	payNowButton: {
		backgroundColor: "rgb(0, 178, 227)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 114 * alpha,
		height: 47 * alpha,
	},
	payNowButtonText: {
		color: "white",
		fontFamily: "Helvetica-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	payNowButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
})
