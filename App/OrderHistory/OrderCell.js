//
//  Puchong
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, Image, TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";

export default class OrderCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onCellPress = () => {
	
	}

	onCompletedPressed = () => {
		const { navigate } = this.props.navigation

		navigate("OrderReceipt")
	}

	onReviewPressed = () => {
		const { navigate } = this.props.navigation

		navigate("OrderReview")
	}

	onInvoicePressed = () => {
		const { navigate } = this.props.navigation

		navigate("OrderInvoice")
	}
	render() {

		return <TouchableWithoutFeedback
			onPress={this.onCellPress}>
			<View
				navigation={this.props.navigation}
				style={styles.ordercell}>
				<View
					pointerEvents="box-none"
					style={{
						height: 122 * alpha,
					}}>
					<View
						style={styles.orderheaderView}>
						<Text
							style={styles.branchText}>Puchong Branch</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<TouchableOpacity
							onPress={this.onCompletedPressed}
							style={styles.completedButton}>
							<Text
								style={styles.completedButtonText}>Completed</Text>
						</TouchableOpacity>
						<Image
							source={require("./../../assets/images/group-10.png")}
							style={styles.groupImage}/>
					</View>
					<View
						style={styles.orderitemsView}>
						<Image
							source={require("./../../assets/images/group-10-3.png")}
							style={styles.group10Image}/>
						<Image
							source={require("./../../assets/images/group-11-3.png")}
							style={styles.group11Image}/>
						<Image
							source={require("./../../assets/images/group-12-8.png")}
							style={styles.group12Image}/>
						<Image
							source={require("./../../assets/images/group-13-5.png")}
							style={styles.group13Image}/>
						<View
							style={styles.group14View}>
							<View
								style={styles.rectangleCopy11View}/>
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
									source={require("./../../assets/images/bitmap-copy-7.png")}
									style={styles.bitmapCopy7Image}/>
							</View>
						</View>
						<View
							style={styles.group15View}>
							<Image
								source={require("./../../assets/images/group-21.png")}
								style={styles.groupTwoImage}/>
						</View>
					</View>
				</View>
				<View
					style={styles.detailsView}>
					<View
						pointerEvents="box-none"
						style={{
							height: 25 * alpha,
							marginLeft: 21 * alpha,
							marginRight: 20 * alpha,
							marginTop: 10 * alpha,
							flexDirection: "row",
							alignItems: "flex-start",
						}}>
						<View
							style={styles.ordernoView}>
							<Text
								style={styles.orderNoText}>Order No.   :</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.textText}>1234567890</Text>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.priceText}>RM117.00</Text>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<View
						style={styles.ordertimeView}>
						<Text
							style={styles.orderTimeText}>Order Time :</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.textTwoText}>2019-06-23  14:01:52</Text>
					</View>
				</View>
				<View
					style={{
						flex: 1,
					}}/>
				<View
					style={styles.lineView}/>
				<View
					style={styles.optionView}>
					<TouchableOpacity
						onPress={this.onReviewPressed}
						style={styles.reviewButton}>
						<Text
							style={styles.reviewButtonText}>Review</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.onInvoicePressed}
						style={styles.receiptButton}>
						<Text
							style={styles.receiptButtonText}>Receipt</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	ordercell: {
		backgroundColor: "white",
		width: "100%",
		height: 228 * alpha,
	},
	orderheaderView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 50 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	branchText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 20 * alpha,
	},
	completedButtonText: {
		color: "rgb(149, 149, 149)",
		fontFamily: "Helvetica-Bold",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	completedButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	completedButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 53 * alpha,
		height: 13 * alpha,
		marginRight: 3 * alpha,
	},
	groupImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 7 * alpha,
		height: 8 * alpha,
		marginRight: 20 * alpha,
	},
	orderitemsView: {
		backgroundColor: "rgb(248, 248, 248)",
		position: "absolute",
		left: 0,
		right: 0,
		top: 50 * alpha,
		height: 72 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	group10Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 43 * alpha,
		height: 48 * alpha,
		marginLeft: 21 * alpha,
	},
	group11Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 45 * alpha,
		height: 43 * alpha,
		marginLeft: 8 * alpha,
	},
	group12Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 42 * alpha,
		height: 43 * alpha,
		marginLeft: 9 * alpha,
	},
	group13Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 42 * alpha,
		height: 43 * alpha,
		marginLeft: 10 * alpha,
	},
	group14View: {
		backgroundColor: "transparent",
		width: 45 * alpha,
		height: 48 * alpha,
		marginLeft: 9 * alpha,
	},
	rectangleCopy11View: {
		backgroundColor: "rgb(252, 252, 252)",
		position: "absolute",
		left: 0,
		right: 0,
		top: 5 * alpha,
		height: 4 * alpha,
	},
	bitmapCopy7Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 44 * alpha,
		marginLeft: 8 * alpha,
		marginRight: 3 * alpha,
	},
	group15View: {
		backgroundColor: "rgb(252, 252, 252)",
		flex: 1,
		height: 43 * alpha,
		marginLeft: 7 * alpha,
		marginRight: 51 * alpha,
		justifyContent: "center",
	},
	groupTwoImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 3 * alpha,
		marginLeft: 15 * alpha,
		marginRight: 13 * alpha,
	},
	detailsView: {
		backgroundColor: "transparent",
		height: 52 * alpha,
	},
	ordernoView: {
		backgroundColor: "transparent",
		width: 132 * alpha,
		height: 14 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	orderNoText: {
		color: "rgb(149, 149, 149)",
		fontFamily: "DINPro-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	textText: {
		backgroundColor: "transparent",
		color: "rgb(149, 149, 149)",
		fontFamily: "DINPro-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	priceText: {
		color: "black",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "center",
	},
	ordertimeView: {
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 178 * alpha,
		height: 14 * alpha,
		marginLeft: 21 * alpha,
		marginBottom: 10 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	orderTimeText: {
		color: "rgb(149, 149, 149)",
		fontFamily: "DINPro-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	textTwoText: {
		backgroundColor: "transparent",
		color: "rgb(149, 149, 149)",
		fontFamily: "DINPro-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	lineView: {
		backgroundColor: "rgb(241, 241, 241)",
		alignSelf: "center",
		width: 334 * alpha,
		height: 1 * alpha,
		marginBottom: 10 * alpha,
	},
	optionView: {
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 150 * alpha,
		height: 31 * alpha,
		marginRight: 19 * alpha,
		marginBottom: 11 * alpha,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	reviewButtonText: {
		color: "rgb(94, 94, 94)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	reviewButton: {
		backgroundColor: "transparent",
		borderRadius: 2 * alpha,
		borderWidth: 1,
		borderColor: "rgb(231, 230, 230)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 70 * alpha,
		height: 31 * alpha,
		marginRight: 11 * alpha,
	},
	reviewButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	receiptButton: {
		backgroundColor: "transparent",
		borderRadius: 2 * alpha,
		borderWidth: 1,
		borderColor: "rgb(0, 178, 227)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 69 * alpha,
		height: 31 * alpha,
	},
	receiptButtonText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	receiptButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
})
