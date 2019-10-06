//
//  OrderInvoice
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Image, TouchableOpacity, View, Text, StyleSheet, ScrollView } from "react-native"
import React from "react"
import {alpha, fontAlpha} from "../Common/size";


export default class OrderInvoice extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Order Invoice",
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

	onPersonalPressed = () => {
	
	}

	onEnterprisePressed = () => {
	
	}

	render() {
	
		return <View
				style={styles.orderInvoiceView}>
				<View
				style={styles.toplineView}/>
				<ScrollView
					style={styles.pageScrollView}>
					<View
						style={styles.companyView}>
						<View
							style={styles.logoView}>
							<Image
								source={require("./../../assets/images/group-3-19.png")}
								style={styles.group3Image}/>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.brew9SdnBhdText}>Brew9 Sdn Bhd</Text>
					</View>
					<View
						style={styles.tipsView}>
						<Text
							style={styles.tipsText}>Tips:</Text>
						<View
							pointerEvents="box-none"
							style={{
								height: 45 * alpha,
								marginLeft: 2 * alpha,
								marginRight: 1 * alpha,
								marginTop: 1 * alpha,
							}}>
							<Text
								style={styles.loremIpsumDolorText}>1. Lorem ipsum dolor sit amet, consectetuer adipiscing.</Text>
							<Text
								style={styles.loremIpsumDolorThreeText}>2. Lorem ipsum dolor sit amet, consectetuer adipiscing{"\n"}onsectetuer adipiscing.</Text>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.loremIpsumDolorTwoText}>3. Lorem ipsum dolor sit amet, consectetuer adipiscing.</Text>
					</View>
					<View
						style={styles.detailsView}>
						<View
							style={styles.receiptAmountView}>
							<Text
								style={styles.receiptAmountText}>Receipt Amount</Text>
							<Text
								style={styles.amountText}>RM117.00</Text>
						</View>
						<View
							style={styles.orderDateView}>
							<Text
								style={styles.orderDateText}>Order Date</Text>
							<Text
								style={styles.dateText}>2019-06-20</Text>
						</View>
						<View
							style={styles.orderNoView}>
							<Text
								style={styles.orderNoText}>Order No.</Text>
							<Text
								style={styles.textText}>12345678</Text>
						</View>
						<View
							style={styles.companyTypeView}>
							<Text
								style={styles.companyTypeText}>Company Type</Text>
							<TouchableOpacity
								onPress={this.onPersonalPressed}
								style={styles.personalButton}>
								<Text
									style={styles.personalButtonText}>Personal</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={this.onEnterprisePressed}
								style={styles.enterpriseButton}>
								<Text
									style={styles.enterpriseButtonText}>Enterprise</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View
						style={styles.formView}>
						<View
							style={styles.receiptNameView}>
							<Text
								style={styles.receiptNameText}>*Receipt Name</Text>
							<Text
								style={styles.pleaseFillInNameText}>*Please fill in name (must fill)</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Image
								source={require("./../../assets/images/tick-3.png")}
								style={styles.tickImage}/>
						</View>
						<View
							style={styles.numberView}>
							<Text
								style={styles.numberText}>*Number</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.pleaseFillInNumbText}>*Please fill in number (must fill)</Text>
						</View>
						<View
							style={styles.openAccountView}>
							<Text
								style={styles.openAcountText}>Open Acount</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.pleaseFillInOpenText}>Please fill in open account</Text>
						</View>
						<View
							style={styles.accountNumberView}>
							<Text
								style={styles.accountNumberText}>Account Number</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.pleaseFillInAccouCopyText}>Please fill in account number</Text>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.addressView}>
							<Text
								style={styles.addressText}>Address</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.pleaseFillInAddreText}>Please fill in address</Text>
						</View>
						<View
							style={styles.phoneView}>
							<Text
								style={styles.phoneText}>Phone</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.pleaseFillInAddreCopyText}>Please fill in address</Text>
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
	orderInvoiceView: {
		backgroundColor: "rgb(238, 238, 238)",
		flex: 1,
	},
	toplineView: {
		backgroundColor: "rgb(0, 178, 227)",
		position: "absolute",
		left: 0,
		width: 262 * alpha,
		height: 3 * alpha,
	},
	pageScrollView: {
		backgroundColor: "transparent",
		flex: 1,
	},
	companyView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 103 * alpha,
		height: 126 * alpha,
		marginTop: 51 * alpha,
	},
	logoView: {
		backgroundColor: "white",
		borderRadius: 46 * alpha,
		height: 92 * alpha,
		marginLeft: 5 * alpha,
		marginRight: 6 * alpha,
		justifyContent: "center",
		alignItems: "center",
	},
	group3Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 27 * alpha,
		height: 52 * alpha,
	},
	brew9SdnBhdText: {
		backgroundColor: "transparent",
		color: "rgb(87, 87, 87)",
		fontFamily: "DINPro-Medium",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	tipsView: {
		backgroundColor: "transparent",
		width: 321 * alpha,
		height: 78 * alpha,
		marginLeft: 18 * alpha,
		marginTop: 36 * alpha,
	},
	tipsText: {
		backgroundColor: "transparent",
		color: "rgb(156, 155, 155)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "flex-start",
	},
	loremIpsumDolorText: {
		backgroundColor: "transparent",
		color: "rgb(156, 155, 155)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
	},
	loremIpsumDolorThreeText: {
		backgroundColor: "transparent",
		color: "rgb(156, 155, 155)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		position: "absolute",
		left: 0 * alpha,
		right: 3 * alpha,
		top: 13 * alpha,
	},
	loremIpsumDolorTwoText: {
		backgroundColor: "transparent",
		color: "rgb(156, 155, 155)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 2 * alpha,
		marginRight: 1 * alpha,
	},
	detailsView: {
		backgroundColor: "transparent",
		width: 375 * alpha,
		height: 111 * alpha,
		marginTop: 29 * alpha,
	},
	receiptAmountView: {
		backgroundColor: "transparent",
		height: 17 * alpha,
		marginLeft: 1 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	receiptAmountText: {
		color: "rgb(156, 155, 155)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 17 * alpha,
	},
	amountText: {
		backgroundColor: "transparent",
		color: "rgb(76, 76, 76)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 44 * alpha,
	},
	orderDateView: {
		backgroundColor: "transparent",
		height: 17 * alpha,
		marginTop: 13 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	orderDateText: {
		backgroundColor: "transparent",
		color: "rgb(156, 155, 155)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 17 * alpha,
	},
	dateText: {
		backgroundColor: "transparent",
		color: "rgb(76, 76, 76)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 69 * alpha,
	},
	orderNoView: {
		backgroundColor: "transparent",
		height: 17 * alpha,
		marginTop: 13 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	orderNoText: {
		backgroundColor: "transparent",
		color: "rgb(156, 155, 155)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 17 * alpha,
	},
	userCreditText: {
		backgroundColor: "transparent",
		color: "rgb(76, 76, 76)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 76 * alpha,
	},
	companyTypeView: {
		backgroundColor: "transparent",
		height: 22 * alpha,
		marginTop: 12 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	companyTypeText: {
		backgroundColor: "transparent",
		color: "rgb(156, 155, 155)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 18 * alpha,
	},
	personalButton: {
		backgroundColor: "transparent",
		borderRadius: 5 * alpha,
		borderWidth: 1,
		borderColor: "rgb(76, 76, 76)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 55 * alpha,
		height: 22 * alpha,
		marginLeft: 48 * alpha,
	},
	personalButtonText: {
		color: "rgb(76, 76, 76)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	personalButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	enterpriseButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 60 * alpha,
		height: 22 * alpha,
		marginLeft: 7 * alpha,
	},
	enterpriseButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	enterpriseButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	formView: {
		backgroundColor: "transparent",
		alignSelf: "stretch",
		height: 281 * alpha,
		marginTop: 24 * alpha,
		marginBottom: 20 * alpha,
	},
	receiptNameView: {
		backgroundColor: "white",
		borderRadius: 4 * alpha,
		borderWidth: 1,
		borderColor: "rgb(197, 197, 197)",
		borderStyle: "solid",
		height: 37 * alpha,
		marginLeft: 18 * alpha,
		marginRight: 18 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	receiptNameText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 14 * alpha,
	},
	pleaseFillInNameText: {
		backgroundColor: "transparent",
		color: "rgb(182, 182, 182)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 41 * alpha,
	},
	tickImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 17 * alpha,
		height: 17 * alpha,
		marginRight: 7 * alpha,
	},
	numberView: {
		backgroundColor: "white",
		borderRadius: 4 * alpha,
		borderWidth: 1,
		borderColor: "rgb(197, 197, 197)",
		borderStyle: "solid",
		height: 38 * alpha,
		marginLeft: 18 * alpha,
		marginRight: 18 * alpha,
		marginTop: 12 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	numberText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 14 * alpha,
	},
	pleaseFillInNumbText: {
		backgroundColor: "transparent",
		color: "rgb(182, 182, 182)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 59 * alpha,
	},
	openAccountView: {
		backgroundColor: "white",
		borderRadius: 4 * alpha,
		borderWidth: 1,
		borderColor: "rgb(197, 197, 197)",
		borderStyle: "solid",
		height: 37 * alpha,
		marginLeft: 18 * alpha,
		marginRight: 18 * alpha,
		marginTop: 11 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	openAcountText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 14 * alpha,
	},
	pleaseFillInOpenText: {
		backgroundColor: "transparent",
		color: "rgb(182, 182, 182)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 82 * alpha,
	},
	accountNumberView: {
		backgroundColor: "white",
		borderRadius: 4 * alpha,
		borderWidth: 1,
		borderColor: "rgb(197, 197, 197)",
		borderStyle: "solid",
		height: 37 * alpha,
		marginLeft: 18 * alpha,
		marginRight: 18 * alpha,
		marginTop: 11 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	accountNumberText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 14 * alpha,
	},
	pleaseFillInAccouCopyText: {
		backgroundColor: "transparent",
		color: "rgb(182, 182, 182)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 69 * alpha,
	},
	addressView: {
		backgroundColor: "white",
		borderRadius: 4 * alpha,
		borderWidth: 1,
		borderColor: "rgb(197, 197, 197)",
		borderStyle: "solid",
		height: 37 * alpha,
		marginLeft: 18 * alpha,
		marginRight: 18 * alpha,
		marginBottom: 11,
		flexDirection: "row",
		alignItems: "center",
	},
	addressText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 14 * alpha,
	},
	pleaseFillInAddreText: {
		backgroundColor: "transparent",
		color: "rgb(182, 182, 182)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 109 * alpha,
	},
	phoneView: {
		backgroundColor: "white",
		borderRadius: 4 * alpha,
		borderWidth: 1,
		borderColor: "rgb(197, 197, 197)",
		borderStyle: "solid",
		height: 37 * alpha,
		marginLeft: 18 * alpha,
		marginRight: 18 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	phoneText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 14 * alpha,
	},
	pleaseFillInAddreCopyText: {
		backgroundColor: "transparent",
		color: "rgb(182, 182, 182)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 109 * alpha,
	},
})
