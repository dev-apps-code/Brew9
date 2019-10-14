//
//  OrderReceipt
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, TouchableOpacity, View, StyleSheet, Image, ScrollView,Linking } from "react-native"
import React from "react"
import {alpha, fontAlpha} from "../Common/size";
import {connect} from "react-redux";
import openMap from 'react-native-open-maps';
@connect(({ members }) => ({
	currentMember: members.profile,
	company_id: members.company_id,
	location: members.location,
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
		this.state = {
			order: this.props.navigation.getParam("order", null),
		}
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

	onDirectionPressed(shop) {
		let latitude = shop ? parseFloat(shop.latitude) : 0.0
		let longitude = shop ? parseFloat(shop.longitude) : 0.0

		openMap({ latitude: latitude, longitude: longitude });
	}

	
	onCallPressed = (phone_no) => {
		Linking.openURL(`tel:${phone_no}`)
	}

	renderOrderItems(items) {

		const order_items = items.map((item, key) => {

			if (item.variants != null && item.variants != "") {
				return <View
					style={styles.itemView}
					key={key}>
					<View
						pointerEvents="box-none"
						style={{
							alignSelf: "stretch",
							width: 179 * alpha,
							marginTop: 14 * alpha,
							marginBottom: 17,
							alignItems: "flex-start",
						}}>
						<Text
							style={styles.nameText}>{item.product_name}</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.descriptionText}>{item.variants}</Text>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.quantityText}>x{item.quantity}</Text>
					<Text
						style={styles.priceText}>{item.total_price}</Text>
				</View>
			} else {
				return <View
					style={styles.item2View}
					key={key}>
					<Text
						style={styles.nameThreeText}>{item.product_name}</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.quantityThreeText}>x{item.quantity}</Text>
					<Text
						style={styles.priceThreeText}>{item.total_price}</Text>
				</View>
			}
		})

		return <View style={styles.orderitemsView}>
			{order_items}
		</View>
	}
	
	render() {
	
		const { order } = this.state

		return <View
				style={styles.orderReceiptView}>
				<ScrollView
					style={styles.orderScrollView}>
					{/* <TouchableOpacity
						onPress={this.onCustomerServicePressed}
						style={styles.customerServiceButton}>
						<Image
							source={require("./../../assets/images/group-3-22.png")}
							style={styles.customerServiceButtonImage}/>
						<Text
							style={styles.customerServiceButtonText}>Customer Service</Text>
					</TouchableOpacity> */}
					<View
						style={styles.orderCartView}>
						<View
							style={styles.whiteboxView}/>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0 * alpha,
								width: 338 * alpha,
								top: 24 * alpha,
								flex: 1,
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
								style={styles.viewView}/>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								marginTop: 167 * alpha,
								flex: 1,
							}}>
							<View
								style={styles.lineView}/>
							<View
								style={styles.locationView}>
								<View
									style={styles.branchView}>
									<Text
										style={styles.shopBranchText}>{order.shop.name}</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										numberOfLines={3}
										style={styles.shopBranchAddressText}>{order.shop.address}</Text>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.callView}>
									<TouchableOpacity
										onPress={this.onCallPressed(order.shop.phone_no)}
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
										onPress={ () => this.onDirectionPressed(order.shop)}
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
							{this.renderOrderItems(order.order_items)}
							{/* <View
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
							</View> */}
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
	customerServiceButton: {
		backgroundColor: "white",
		borderRadius: 14.5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 119 * alpha,
		height: 29 * alpha,
		marginRight: 19 * alpha,
		marginTop: 13 * alpha,
	},
	customerServiceButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	orderCartView: {
		backgroundColor: "rgb(248, 248, 248)",
		alignSelf: "stretch",
		marginLeft: 18 * alpha,
		marginRight: 19 * alpha,
		marginTop: 13 * alpha,
		marginBottom: 20,
		flex: 1,
	},
	whiteboxView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 168 * alpha,
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
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
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
		height: 2 * alpha,
	},
	locationView: {
		backgroundColor: "transparent",
		height: 64 * alpha,
		marginLeft: 25 * alpha,
		marginRight: 26 * alpha,
		marginTop: 18 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	branchView: {
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 162 * alpha,
		height: 50 * alpha,
	},
	shopBranchText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginRight: 12 * alpha,
	},
	shopBranchAddressText: {
		color: "rgb(146, 146, 146)",
		fontFamily: "DINPro-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
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
		borderWidth: 1 * alpha,
		borderColor: "rgb(180, 179, 179)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 35 * alpha,
	},
	callIconButtonImage: {
		resizeMode: "contain",
	},
	callIconButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	callText: {
		backgroundColor: "transparent",
		color: "rgb(163, 163, 163)",
		fontFamily: "DINPro-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginLeft: 6 * alpha,
		marginRight: 7 * alpha,
	},
	directionView: {
		backgroundColor: "transparent",
		width: 50 * alpha,
		height: 62 * alpha,
	},
	directionIconButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	directionIconButton: {
		backgroundColor: "transparent",
		borderRadius: 17.5 * alpha,
		borderWidth: 1 * alpha,
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
		height: 1 * alpha,
		marginLeft: 25 * alpha,
		marginRight: 24 * alpha,
		marginTop: 12 * alpha,
	},
	voucherView: {
		backgroundColor: "transparent",
		height: 18 * alpha,
		marginLeft: 26 * alpha,
		marginRight: 25 * alpha,
		marginTop: 42 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	nameFourText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	descriptionThreeText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	voucher2View: {
		backgroundColor: "transparent",
		height: 17 * alpha,
		marginLeft: 26 * alpha,
		marginRight: 25 * alpha,
		marginTop: 17 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	nameFiveText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	descriptionFourText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	totalView: {
		backgroundColor: "transparent",
		height: 21 * alpha,
		marginLeft: 26 * alpha,
		marginRight: 24 * alpha,
		marginTop: 23 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	totallabelText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
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
		height: 1 * alpha,
		marginLeft: 25 * alpha,
		marginRight: 24 * alpha,
		marginTop: 14 * alpha,
	},
	callrefundText: {
		backgroundColor: "transparent",
		color: "rgb(152, 149, 149)",
		fontFamily: "DINPro-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		alignSelf: "flex-start",
		marginLeft: 26 * alpha,
		marginTop: 13 * alpha,
		marginBottom: 13,
	},
	orderitemsView: {
		backgroundColor: "transparent",
		marginLeft: 24 * alpha,
		marginRight: 24 * alpha,
		flex: 1,
	},
	itemView: {
		backgroundColor: "transparent",
		height: 90 * alpha,
		marginLeft: 1 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	nameText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	descriptionText: {
		backgroundColor: "transparent",
		color: "rgb(146, 146, 146)",
		fontFamily: "DINPro-Bold",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	quantityText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
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
	itemTwoView: {
		backgroundColor: "transparent",
		height: 90 * alpha,
		marginRight: 1 * alpha,
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
		height: 46 * alpha,
		marginRight: 1 * alpha,
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
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 56 * alpha,
	},
	priceThreeText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 3 * alpha,
	},
})
