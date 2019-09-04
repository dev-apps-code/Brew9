//
//  Transaction
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, StyleSheet, View, Image } from "react-native"
import React from "react"


export default class Transaction extends React.Component {

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
				style={styles.iphone8Copy23View}>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 20,
						height: 647,
					}}>
					<View
						style={styles.navigationView}>
						<Image
							source={require("./../../assets/images/back-2.png")}
							style={styles.backImage}/>
						<Text
							style={styles.confirmTransactionText}>Confirm Transaction</Text>
					</View>
					<View
						style={styles.contentView}>
						<View
							pointerEvents="box-none"
							style={{
								height: 150,
							}}>
							<View
								style={styles.cartinfoView}>
								<Text
									style={styles.itemnameText}>Annual Membership Card</Text>
								<Text
									style={styles.priceText}>RM179.00</Text>
							</View>
							<View
								style={styles.payeeView}>
								<Text
									style={styles.payeeText}>Payee</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.brew9Text}>Brew9</Text>
							</View>
						</View>
						<View
							style={styles.paymentmethodView}>
							<View
								style={styles.headerView}>
								<Text
									style={styles.paymentMethodText}>Payment Method</Text>
							</View>
							<View
								style={styles.paymentsView}>
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
										style={styles.paymentView}>
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
												style={styles.addBankCardToPayText}>Add Bank Card to Pay</Text>
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
											<Image
												source={require("./../../assets/images/chosen.png")}
												style={styles.chosenImage}/>
										</View>
									</View>
								</View>
								<View
									style={styles.payNowView}>
									<Text
										style={styles.payNowText}>Pay Now</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
				<View
					style={styles.line11View}/>
			</View>
	}
}

const styles = StyleSheet.create({
	iphone8Copy23View: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	navigationView: {
		backgroundColor: "rgb(240, 240, 240)",
		height: 49,
		marginLeft: 1,
		marginRight: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	backImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 13,
		height: 13,
		marginLeft: 21,
	},
	confirmTransactionText: {
		color: "rgb(69, 67, 67)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 14,
	},
	contentView: {
		backgroundColor: "transparent",
		height: 598,
	},
	cartinfoView: {
		backgroundColor: "rgb(240, 240, 240)",
		position: "absolute",
		left: 1,
		right: 1,
		top: 0,
		height: 111,
		alignItems: "center",
	},
	itemnameText: {
		color: "rgb(55, 55, 55)",
		fontFamily: "Helvetica",
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 23,
	},
	priceText: {
		color: "rgb(69, 67, 67)",
		fontFamily: "Helvetica",
		fontSize: 35,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 4,
	},
	payeeView: {
		backgroundColor: "white",
		shadowColor: "rgb(230, 230, 230)",
		shadowRadius: 2,
		shadowOpacity: 1,
		position: "absolute",
		left: 0,
		right: 0,
		top: 110,
		height: 40,
		flexDirection: "row",
		alignItems: "center",
	},
	payeeText: {
		color: "rgb(165, 165, 165)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 28,
	},
	brew9Text: {
		color: "rgb(78, 78, 78)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 28,
	},
	paymentmethodView: {
		backgroundColor: "transparent",
		height: 448,
	},
	headerView: {
		backgroundColor: "rgb(240, 240, 240)",
		height: 40,
		marginLeft: 1,
		marginRight: 1,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	paymentMethodText: {
		color: "rgb(165, 165, 165)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 27,
	},
	paymentsView: {
		backgroundColor: "transparent",
		height: 408,
	},
	paymentView: {
		backgroundColor: "white",
		width: 375,
		height: 40,
	},
	addBankCardToPayText: {
		backgroundColor: "transparent",
		color: "rgb(34, 34, 34)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	chosenImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 18,
		height: 18,
		marginRight: 34,
	},
	payNowView: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 4,
		position: "absolute",
		alignSelf: "center",
		width: 321,
		top: 59,
		height: 41,
		justifyContent: "center",
		alignItems: "center",
	},
	payNowText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	line11View: {
		backgroundColor: "rgb(187, 185, 185)",
		position: "absolute",
		left: 0,
		right: 0,
		top: 69,
		height: 1,
	},
})
