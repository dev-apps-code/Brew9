//
//  Page1Copy8
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size"

export default class VoucherDetail extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Voucher Detail",
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

	onTermsPressed = () => {
	
	}

	onUsePessed = () => {
	
	}

	render() {
	
		return <View
				style={styles.voucherDetailView}>
				<ScrollView
					style={styles.scrollviewScrollView}>
					<View
						style={styles.voucherView}>
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
								style={styles.cellcontentView}>
								<Image
									source={require("./../../assets/images/group-5-3.png")}
									style={styles.backgroundImage}/>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										left: 30 * alpha,
										right: 31 * alpha,
										top: 23 * alpha,
										bottom: 11 * alpha,
									}}>
									<View
										pointerEvents="box-none"
										style={{
											height: 31 * alpha,
											marginRight: 1 * alpha,
											flexDirection: "row",
											alignItems: "flex-start",
										}}>
										<Text
											style={styles.titleText}>RM10 off</Text>
										<View
											style={{
												flex: 1,
											}}/>
										<View
											style={styles.valueView}>
											<Text
												style={styles.currenrcyText}>RM</Text>
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
												<Text
													style={styles.valueText}>10</Text>
											</View>
										</View>
									</View>
									<Text
										style={styles.descriptionText}>with RM150 spend</Text>
									<Image
										source={require("./../../assets/images/line-16-copy-5.png")}
										style={styles.lineImage}/>
									<View
										style={{
											flex: 1,
										}}/>
									<View
										pointerEvents="box-none"
										style={{
											height: 14 * alpha,
											flexDirection: "row",
											alignItems: "flex-end",
										}}>
										<Text
											style={styles.dateText}>2019.07.19-2019.08.19</Text>
										<View
											style={{
												flex: 1,
											}}/>
										<View
											style={styles.termsView}>
											<TouchableOpacity
												onPress={this.onTermsPressed}
												style={styles.termsButton}>
												<Text
													style={styles.termsButtonText}>Terms & Conditions</Text>
											</TouchableOpacity>
											<Image
												source={require("./../../assets/images/group-18.png")}
												style={styles.arrowImage}/>
										</View>
									</View>
								</View>
							</View>
						</View>
						{/* <View
							style={styles.rm10Copy2View}>
							<Text
								style={styles.textText}>%</Text>
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
								<Text
									style={styles.textTwoText}>10</Text>
							</View>
						</View> */}
					</View>
					<View
						style={styles.detailsView}>
						<View
							style={styles.conditionsView}>
							<Text
								style={styles.titleTwoText}>Voucher Limitation</Text>
							<Text
								style={styles.usableshopText}>Shop</Text>
							<Text
								style={styles.usableshopcontentText}>- Usable on all Brew9 Shop in Brunei</Text>
							<Text
								style={styles.usabletimeText}>Time</Text>
							<Text
								style={styles.usabletimecontentText}>- Whiole Day</Text>
							<Text
								style={styles.usableitemText}>Applicable Items</Text>
							<Text
								style={styles.usableitemcontentText}>- All Hot Drinks</Text>
							<Text
								style={styles.usablescenarioText}>How to Use</Text>
							<Text
								style={styles.usablescenariocontentText}>- Usable when view voucher on order menu{"\n"}
								- When ordering from shop, show QRcode to cashier to scan before using voucher</Text>
							<Text
								style={styles.usableconditionText}>Terms and Conditions</Text>
							<Text
								style={styles.usableconditioncontentText}>- Voucher cannot be used to cash voucher, buy 1 free x voucher and other discount voucher{"\n"}
								- Cannot be used on promotion items</Text>
						</View>
					</View>
				</ScrollView>
				<TouchableOpacity
						onPress={this.onUsePessed}
						style={styles.useButton}>
						<Text
							style={styles.useButtonText}>Apply Voucher</Text>
					</TouchableOpacity>
			</View>
	}
}


const styles = StyleSheet.create({
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
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
		resizeMode: "contain",
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
	voucherDetailView: {
		backgroundColor: "white",
		flex: 1,
	},
	scrollviewScrollView: {
		backgroundColor: "white",
		flex: 1,
		marginBottom: 68 * alpha,
	},
	voucherView: {
		backgroundColor: "rgb(243, 243, 243)",
		height: 143 * alpha,
	},
	cellcontentView: {
		backgroundColor: "transparent",
		height: 125 * alpha,
	},
	backgroundImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		shadowColor: "rgba(224, 222, 222, 0.5)",
		shadowRadius: 2,
		shadowOpacity: 1,
		position: "absolute",
		left: 14 * alpha,
		right: 14 * alpha,
		top: 0 * alpha,
		bottom: 0 * alpha,
	},
	titleText: {
		color: "rgb(68, 68, 68)",
		fontFamily: "SFProText-Medium",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 1 * alpha,
	},
	valueView: {
		backgroundColor: "transparent",
		width: 40 * alpha,
		height: 31 * alpha,
	},
	currenrcyText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		top: 6 * alpha,
	},
	valueText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 24 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 14 * alpha,
	},
	descriptionText: {
		color: "rgb(124, 124, 124)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
	},
	lineImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: null,
		height: 2 * alpha,
		marginTop: 20 * alpha,
	},
	dateText: {
		color: "rgb(149, 148, 148)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginBottom: 1 * alpha,
	},
	termsView: {
		backgroundColor: "transparent",
		width: 118 * alpha,
		height: 13 * alpha,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	termsButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 95 * alpha,
		height: 12 * alpha,
		marginRight: 4 * alpha,
	},
	termsButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	termsButtonText: {
		color: "rgb(136, 133, 133)",
		fontFamily: "SFProText-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	arrowImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		flex: 1,
		alignSelf: "flex-end",
		height: 7 * alpha,
		marginLeft: 4 * alpha,
		marginBottom: 2 * alpha,
	},
	rm10Copy2View: {
		backgroundColor: "transparent",
		position: "absolute",
		right: 59 * alpha,
		width: 35 * alpha,
		top: 4 * alpha,
		height: 31 * alpha,
	},
	textText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		right: 0 * alpha,
		top: 16 * alpha,
	},
	textTwoText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 24 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 9 * alpha,
	},
	detailsView: {
		backgroundColor: "transparent",
		flex: 1,
		height: "100%",
	},
	conditionsView: {
		backgroundColor: "transparent",
		flex: 1,
		marginLeft: 20 * alpha,
		marginRight: 23 * alpha,
		marginTop: 25 * alpha,
		alignItems: "flex-start",
	},
	titleTwoText: {
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	usableshopText: {
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 13 * alpha,
	},
	usableshopcontentText: {
		backgroundColor: "transparent",
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	usabletimeText: {
		backgroundColor: "transparent",
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 328 * alpha,
		marginTop: 18 * alpha,
	},
	usabletimecontentText: {
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 332 * alpha,
	},
	usableitemText: {
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 332 * alpha,
		marginTop: 14 * alpha,
	},
	usableitemcontentText: {
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 332 * alpha,
		marginTop: 1 * alpha,
	},
	usablescenarioText: {
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 332 * alpha,
		marginTop: 16 * alpha,
	},
	usablescenariocontentText: {
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 328 * alpha,
	},
	usableconditionText: {
		backgroundColor: "transparent",
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 21 * alpha,
	},
	usableconditioncontentText: {
		backgroundColor: "transparent",
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 328 * alpha,
		marginTop: 1 * alpha,
	},
	useButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 4,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		alignSelf: "center",
		width: 321 * alpha,
		bottom: 14 * alpha,
		height: 41 * alpha,
	},
	useButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	useButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
})