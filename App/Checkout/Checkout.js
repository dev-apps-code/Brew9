//
//  Checkout
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native"
import React from "react"


export default class Checkout extends React.Component {

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

	onPayNowPressed = () => {
	
		const { navigate } = this.props.navigation
		
		navigate("Transaction")
	}

	render() {
	
		return <View
				style={styles.iphone8Copy5View}>
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
											source={require("./../../assets/images/right-14.png")}
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
											source={require("./../../assets/images/left-14.png")}
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
								width: 99,
								height: 14,
								marginLeft: 21,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Image
								source={require("./../../assets/images/group-4-3.png")}
								style={styles.group4Image}/>
							<Text
								style={styles.shoppingCartText}>Shopping Cart</Text>
						</View>
					</View>
				</View>
				<View
					style={styles.contentView}>
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
							}}>
							<View
								style={styles.groupView}>
								<View
									pointerEvents="box-none"
									style={{
										height: 31,
										flexDirection: "row",
										alignItems: "flex-start",
									}}>
									<Text
										style={styles.branchText}>Branch</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Image
										source={require("./../../assets/images/group-8-11.png")}
										style={styles.group8Image}/>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.distance1kmPleaseText}>Distance 1km, please confirm your nearest branch</Text>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								pointerEvents="box-none"
								style={{
									height: 19,
									marginLeft: 25,
									marginRight: 21,
									marginBottom: 12,
									flexDirection: "row",
									alignItems: "flex-end",
								}}>
								<Text
									style={styles.contactText}>Contact</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.dropYourContactSText}>Drop your contact, so we can contact you</Text>
								<View
									style={styles.autoFillView}>
									<Text
										style={styles.autoFillText}>Auto-fill</Text>
								</View>
							</View>
							<View
								style={styles.rectangleView}/>
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
									height: 52,
									marginLeft: 25,
									marginRight: 21,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<View
									style={styles.selfPickUpView}>
									<Image
										source={require("./../../assets/images/pick-up.png")}
										style={styles.pickUpImage}/>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.selfPickUpText}>Self Pick-up</Text>
									<View
										pointerEvents="box-none"
										style={{
											alignSelf: "flex-end",
											width: 16,
											height: 16,
										}}>
										<Image
											source={require("./../../assets/images/fill-1-2.png")}
											style={styles.fill1Image}/>
										<Image
											source={require("./../../assets/images/tick-2.png")}
											style={styles.tickImage}/>
									</View>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.deliveryTwoView}>
									<Image
										source={require("./../../assets/images/delivery.png")}
										style={styles.deliveryImage}/>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.deliveryText}>Delivery</Text>
								</View>
							</View>
						</View>
					</View>
					<View
						style={styles.toPaymentView}>
						<View
							style={styles.orderConfirmationView}>
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
									style={styles.frapView}>
									<View
										pointerEvents="box-none"
										style={{
											alignSelf: "stretch",
											width: 81,
											alignItems: "flex-start",
										}}>
										<Text
											style={styles.frappucinoText}>Frappucino</Text>
										<View
											style={{
												flex: 1,
											}}/>
										<Text
											style={styles.ventiText}>Venti</Text>
									</View>
									<View
										style={{
											flex: 1,
										}}/>
									<Image
										source={require("./../../assets/images/x.png")}
										style={styles.xCopyImage}/>
									<Text
										style={styles.textTwoText}>1</Text>
									<Text
										style={styles.rm12Text}>RM12</Text>
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
									alignItems: "center",
								}}>
								<Text
									style={styles.orderConfirmationText}>Order Confirmation</Text>
								<View
									style={styles.espressoView}>
									<Text
										style={styles.espressoText}>Espresso</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Image
										source={require("./../../assets/images/x.png")}
										style={styles.xImage}/>
									<Text
										style={styles.textText}>2</Text>
									<Text
										style={styles.rm20Text}>RM20</Text>
								</View>
								<View
									style={styles.promoCodeView}>
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
										style={styles.group4TwoImage}/>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.total3UnitsRm32Text}>Total 3 units,</Text>
								<View
									style={styles.rectangleTwoView}/>
							</View>
						</View>
						<View
							style={styles.paymentMethodView}>
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
								<Image
									source={require("./../../assets/images/group-4-5.png")}
									style={styles.group4ThreeImage}/>
							</View>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
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
									style={styles.group4FourImage}/>
							</View>
						</View>
						<View
							style={styles.rectangleCopy4View}/>
					</View>
				</View>
				<View
					style={{
						flex: 1,
					}}/>
				<View
					style={styles.payNowView}>
					<Text
						style={styles.rm32Text}>RM32</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<View
						pointerEvents="box-none"
						style={{
							width: 84,
							height: 39,
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
							<View
								style={styles.rectangleThreeView}/>
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
							<TouchableOpacity
								onPress={this.onPayNowPressed}
								style={styles.payNowButton}>
								<Text
									style={styles.payNowButtonText}>Pay Now</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	iphone8Copy5View: {
		backgroundColor: "white",
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
		resizeMode: "center",
		backgroundColor: "transparent",
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
	shoppingCartText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 9,
	},
	contentView: {
		backgroundColor: "transparent",
		height: 613,
		marginTop: 11,
	},
	deliveryView: {
		backgroundColor: "transparent",
		height: 152,
	},
	groupView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 329,
		height: 32,
	},
	branchText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	group8Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 23,
		height: 23,
		marginTop: 8,
	},
	distance1kmPleaseText: {
		backgroundColor: "transparent",
		color: "rgb(188, 181, 181)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "flex-start",
	},
	contactText: {
		color: "rgb(70, 76, 84)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginBottom: 2,
	},
	dropYourContactSText: {
		color: "rgb(219, 212, 212)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 5,
		marginBottom: 3,
	},
	autoFillView: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "rgb(0, 178, 227)",
		borderStyle: "solid",
		width: 45,
		height: 19,
		justifyContent: "center",
	},
	autoFillText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 8,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 9,
		marginRight: 9,
	},
	rectangleView: {
		backgroundColor: "rgb(247, 247, 247)",
		height: 9,
	},
	selfPickUpView: {
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "rgb(0, 178, 227)",
		borderStyle: "solid",
		width: 160,
		height: 52,
		flexDirection: "row",
		alignItems: "center",
	},
	pickUpImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 32,
		height: 28,
		marginLeft: 30,
	},
	selfPickUpText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 14,
	},
	fill1Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		right: 0,
		width: 16,
		bottom: 0,
		height: 16,
	},
	tickImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		right: 1,
		width: 9,
		bottom: 1,
		height: 7,
	},
	deliveryTwoView: {
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "rgb(151, 151, 151)",
		borderStyle: "solid",
		width: 151,
		height: 52,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	deliveryImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 33,
		height: 23,
		marginLeft: 25,
		marginTop: 17,
	},
	deliveryText: {
		color: "rgb(70, 76, 84)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "center",
		marginRight: 41,
	},
	toPaymentView: {
		backgroundColor: "white",
		height: 313,
	},
	orderConfirmationView: {
		backgroundColor: "transparent",
		height: 184,
		marginTop: 10,
	},
	frapView: {
		backgroundColor: "transparent",
		width: 321,
		height: 33,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	frappucinoText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	ventiText: {
		color: "rgb(130, 128, 128)",
		fontFamily: "Helvetica-LightOblique",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	xCopyImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 9,
		height: 9,
		marginRight: 3,
		marginTop: 6,
	},
	textTwoText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 18,
		marginTop: 3,
	},
	rm12Text: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 3,
	},
	orderConfirmationText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "flex-start",
		marginLeft: 26,
	},
	espressoView: {
		backgroundColor: "transparent",
		width: 321,
		height: 19,
		marginTop: 23,
		flexDirection: "row",
		alignItems: "center",
	},
	espressoText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	xImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 9,
		height: 9,
		marginRight: 3,
	},
	textText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 18,
	},
	rm20Text: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	promoCodeView: {
		backgroundColor: "transparent",
		width: 318,
		height: 14,
		marginTop: 62,
		flexDirection: "row",
		alignItems: "center",
	},
	promoCodeText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	group10Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 13,
		height: 14,
		marginLeft: 7,
	},
	noText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 8,
	},
	group4TwoImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 11,
		height: 11,
	},
	total3UnitsRm32Text: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "flex-end",
		marginRight: 30,
		marginBottom: 10,
	},
	rectangleTwoView: {
		backgroundColor: "rgb(247, 247, 247)",
		alignSelf: "stretch",
		height: 9,
	},
	paymentMethodView: {
		backgroundColor: "white",
		height: 41,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	paymentMethodTwoView: {
		backgroundColor: "transparent",
		width: 327,
		height: 27,
		marginLeft: 18,
		flexDirection: "row",
		alignItems: "center",
	},
	paymentMethodText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	group7View: {
		backgroundColor: "transparent",
		width: 26,
		height: 27,
		marginRight: 8,
	},
	group3Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 24,
		marginLeft: 1,
		marginRight: 1,
	},
	group6Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 24,
	},
	group4ThreeImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 11,
		height: 11,
	},
	remarkView: {
		backgroundColor: "white",
		height: 41,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	remarkTwoView: {
		backgroundColor: "transparent",
		width: 327,
		height: 14,
		marginLeft: 18,
		flexDirection: "row",
		alignItems: "center",
	},
	remarkText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	noSugarText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 8,
	},
	group4FourImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 11,
		height: 11,
	},
	rectangleCopy4View: {
		backgroundColor: "rgb(247, 247, 247)",
		height: 37,
	},
	payNowView: {
		backgroundColor: "transparent",
		height: 39,
		flexDirection: "row",
		alignItems: "center",
	},
	rm32Text: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica-Bold",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 18,
	},
	rectangleThreeView: {
		backgroundColor: "rgb(0, 178, 227)",
		width: 84,
		height: 39,
	},
	payNowButtonText: {
		color: "white",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	payNowButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 51,
		height: 14,
		marginRight: 16,
	},
	payNowButtonImage: {
		resizeMode: "contain",
		marginRight: 10,
	},
})
