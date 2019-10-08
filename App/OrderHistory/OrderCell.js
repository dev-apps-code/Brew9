//
//  Puchong
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, Image, TouchableWithoutFeedback, TouchableOpacity, View, StyleSheet } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";

export default class OrderCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onCellPress = () => {
	
	}

	onCompletePressed = (order) => {
		const { navigate } = this.props.navigation

		navigate("OrderReceipt", {
			order_id: order.id
		})
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

		var trim_products = this.props.products.slice(0, 5);

		const item_images = trim_products.map((item, key) =>

			<Image
				key={key}
				source={{uri: item.image}}
				style={styles.productimageImage}/>

		)

		return <TouchableWithoutFeedback
			onPress={this.onPuchongPress}>
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
							style={styles.puchongBranchText}>{this.props.shop_name}</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<TouchableOpacity
							onPress={() => this.onCompletePressed(this.props.order_id)}
							style={styles.completeButton}>
							<Text
								style={styles.completeButtonText}>Completed</Text>
							<Image
								source={require("./../../assets/images/group-2.png")}
								style={styles.completeButtonImage}/>
						</TouchableOpacity>
					</View>
					<View
						style={styles.orderitemsView}>
						<View
							style={styles.productgroupView}>
							{item_images}
							{
								this.props.products.length > 5 && (<Image
									source={require("./../../assets/images/group-21.png")}
									style={styles.etcimageImage}/>)
							}

						</View>
					</View>
				</View>
				<View
					style={styles.detailsView}>
					<View
						style={styles.ordernoView}>
						<Text
							style={styles.labelText}>Order No.   :</Text>
						<Text
							style={styles.ordernumberText}>{this.props.receipt_no}</Text>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							alignSelf: "stretch",
							height: 18 * alpha,
							marginLeft: 20 * alpha,
							marginRight: 20 * alpha,
							marginTop: 1 * alpha,
							flexDirection: "row",
							alignItems: "flex-start",
						}}>
						<View
							style={styles.ordertimeView}>
							<Text
								style={styles.labelTwoText}>Order Time :</Text>
							<Text
								style={styles.textText}>{this.props.payment_time}</Text>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.priceText}>{this.props.currency}{this.props.total}</Text>
					</View>
				</View>
				<View
					style={{
						flex: 1,
					}}/>
				<View
					style={styles.lineView}/>
				{/*<View*/}
				{/*	style={styles.optionView}>*/}
				{/*	<TouchableOpacity*/}
				{/*		onPress={this.onReviewPressed}*/}
				{/*		style={styles.reviewButton}>*/}
				{/*		<Text*/}
				{/*			style={styles.reviewButtonText}>Review</Text>*/}
				{/*	</TouchableOpacity>*/}
				{/*	<TouchableOpacity*/}
				{/*		onPress={this.onReceiptPressed}*/}
				{/*		style={styles.receiptButton}>*/}
				{/*		<Text*/}
				{/*			style={styles.receiptButtonText}>Receipt</Text>*/}
				{/*	</TouchableOpacity>*/}
				{/*</View>*/}
			</View>
		</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	ordercell: {
		backgroundColor: "white",
		width: "100%",
		// height: 228 * alpha,
		height: 197 * alpha,
	},
	orderheaderView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 50 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	puchongBranchText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "SFProText-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 20 * alpha,
	},
	completeButtonText: {
		color: "rgb(149, 149, 149)",
		fontFamily: "SFProText-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	completeButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 71 * alpha,
		height: 13 * alpha,
		marginRight: 15 * alpha,
	},
	completeButtonImage: {
		resizeMode: "contain",
		marginLeft: 10 * alpha,
	},
	orderitemsView: {
		backgroundColor: "rgb(248, 248, 248)",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 50 * alpha,
		height: 72 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	productgroupView: {
		backgroundColor: "transparent",
		width: 308 * alpha,
		height: 43 * alpha,
		marginLeft: 20 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	productimageImage: {
		backgroundColor: "rgb(252, 252, 252)",
		resizeMode: "stretch",
		width: 43 * alpha,
		height: 43 * alpha,
		marginRight: 10 * alpha,
	},
	etcimageImage: {
		backgroundColor: "rgb(252, 252, 252)",
		resizeMode: "center",
		width: 43 * alpha,
		height: 43 * alpha,
	},
	detailsView: {
		backgroundColor: "transparent",
		height: 52 * alpha,
		alignItems: "flex-start",
	},
	ordernoView: {
		backgroundColor: "transparent",
		width: 240 * alpha,
		height: 14 * alpha,
		marginLeft: 20 * alpha,
		marginTop: 10 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	labelText: {
		backgroundColor: "transparent",
		color: "rgb(149, 149, 149)",
		fontFamily: "DINPro-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	ordernumberText: {
		backgroundColor: "transparent",
		color: "rgb(149, 149, 149)",
		fontFamily: "DINPro-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 13 * alpha,
	},
	ordertimeView: {
		backgroundColor: "transparent",
		width: 240 * alpha,
		height: 14 * alpha,
		marginTop: 3 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	labelTwoText: {
		backgroundColor: "transparent",
		color: "rgb(149, 149, 149)",
		fontFamily: "DINPro-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	textText: {
		color: "rgb(149, 149, 149)",
		fontFamily: "DINPro-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 12 * alpha,
	},
	priceText: {
		backgroundColor: "transparent",
		color: "black",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		alignSelf: "center",
	},
	lineView: {
		backgroundColor: "rgb(241, 241, 241)",
		alignSelf: "center",
		width: 334 * alpha,
		height: 1 * alpha,
		marginBottom: 10,
	},
	optionView: {
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 150 * alpha,
		height: 31 * alpha,
		marginRight: 19 * alpha,
		marginBottom: 11,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	reviewButtonText: {
		color: "rgb(94, 94, 94)",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	reviewButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	reviewButton: {
		backgroundColor: "transparent",
		borderRadius: 2 * alpha,
		borderWidth: 1 * alpha,
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
	receiptButton: {
		backgroundColor: "transparent",
		borderRadius: 2 * alpha,
		borderWidth: 1 * alpha,
		borderColor: "rgb(0, 178, 227)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 69 * alpha,
		height: 31 * alpha,
	},
	receiptButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	receiptButtonText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
})
