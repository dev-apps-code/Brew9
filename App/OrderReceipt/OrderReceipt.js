//
//  OrderReceipt
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, TouchableOpacity, View, StyleSheet, Image, ScrollView, Linking } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import { connect } from "react-redux";
import openMap from 'react-native-open-maps';
import { TITLE_FONT, NON_TITLE_FONT } from "../Common/common_style";

@connect(({ members, shops }) => ({
	currentMember: members.profile,
	company_id: members.company_id,
	location: members.location,
	selectedShop: shops.selectedShop,

}))
export default class OrderReceipt extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			headerTitle: <Text style={{ textAlign: 'center', alignSelf: "center", fontFamily: TITLE_FONT }}>Order</Text>,
			headerTintColor: "black",
			headerLeft: <View
				style={styles.headerLeftContainer}>
				<TouchableOpacity
					onPress={params.onBackPressed ? params.onBackPressed : () => null}
					style={styles.navigationBarItem}>
					<Image
						source={require("./../../assets/images/back.png")}
						style={styles.navigationBarItemIcon} />
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
	onLocationButtonPressed = () => {
		const { navigate } = this.props.navigation

		navigate("DirectionMap", {
			shop: this.props.selectedShop
		})
	}


	onCallPressed = (phone_no) => {
		Linking.openURL(`tel:${phone_no}`)
	}

	renderOrderItems(items, vouchers, order) {

		const order_items = items.map((item, key) => {
			var price_string = item.total_price != undefined && item.total_price > 0 ? `$${parseFloat(item.total_price).toFixed(2)}` : item.total_price != undefined && item.total_price == 0 ? "Free" : ""
			return <View
				style={styles.drinksView}
				key={key}>
				<View
					pointerEvents="box-none"
					style={{
						justifyContent: "center",
						backgroundColor: "transparent",
						flex: 1,
						flexDirection: "row"
					}}>
					<View
						style={styles.productDetailView}>
						<Text
							style={styles.productNameText}>{item.product_name}</Text>
						{(item.variations != null && item.variations != "") ?
							<Text
								style={styles.productVariantText}>{item.variations}</Text> :
							<View style={styles.spacer} />
						}
					</View>
					<View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5 * alpha }}>
						<Text
							style={styles.productQuantityText}>x{item.quantity}</Text>

						<Text
							style={styles.productPriceText}>{price_string}</Text>
						{key < items.length - 1 && (<Image
							source={require("./../../assets/images/group-109-copy.png")}
							style={styles.dottedLineImage} />)}
					</View>

				</View>
			</View>


		})

		const voucher_items = vouchers.map((item, key) => {

			let cart_total = parseFloat(order.total) + parseFloat(order.discount)
			var voucher_discount = ''

			if (item.voucher.discount_type == "fixed") {
				voucher_discount = `-$${item.voucher.discount_price}`
			} else if (item.voucher.discount_type == "percent") {
				voucher_discount = `-$${parseFloat(cart_total * (item.voucher.discount_price / 100)).toFixed(2)}`

			}

			return <View
				style={styles.voucherView}
				key={key}>
				<Text
					style={styles.voucherNameText}>{item.voucher.name}</Text>
				<View
					style={{
						flex: 1,
					}} />
				<Text
					style={styles.voucherDescriptionText}>{voucher_discount}</Text>
			</View>
		})

		return <View style={styles.drinksViewWrapper}><View style={styles.orderitemsView}>
			{order_items}
			{voucher_items}
		</View>
		</View>
	}

	render() {

		const { order } = this.state

		return <View
			style={styles.orderReceiptView}>
			<ScrollView
				style={styles.orderScrollView}>
				<View
					style={styles.orderCartView}>
					<View
						style={styles.whiteboxView} />
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
								style={styles.logoImage} />
							<Text
								style={styles.completedOrderText}>Completed Order</Text>
							<View
								style={{
									flex: 1,
								}} />
							<Text
								style={styles.thankMessageText}>Thank you, let's brew again.</Text>
						</View>
						<View
							style={styles.viewView} />
					</View>
					<View
						pointerEvents="box-none"
						style={{
							marginTop: 167 * alpha,
							flex: 1,
						}}>
						<View
							style={styles.lineView} />
						<View style={styles.locationWrapperView}>
							<View
								style={styles.locationView}>
								<View
									style={styles.branchView}>
									<Text
										style={styles.shopBranchText}>{order.shop.name}</Text>
									<Text
										numberOfLines={3}
										style={styles.shopBranchAddressText}>{order.shop.short_address}</Text>
								</View>
								<View
									style={{
										flex: 1,
									}} />
								<View
									style={styles.callView}>
									<TouchableOpacity
										onPress={() => this.onCallPressed(order.shop.phone_no)}
										style={styles.callIconButton}>
										<Image
											source={require("./../../assets/images/group-3-23.png")}
											style={styles.callIconButtonImage} />
									</TouchableOpacity>
									<View
										style={{
											flex: 1,
										}} />
									<Text
										style={styles.callText}>Call</Text>
								</View>
								<View
									style={styles.directionView}>
									<TouchableOpacity
										onPress={() => this.onLocationButtonPressed()}
										style={styles.directionIconButton}>
										<Image
											source={require("./../../assets/images/group-3-17.png")}
											style={styles.directionIconButtonImage} />
									</TouchableOpacity>
									<View
										style={{
											flex: 1,
										}} />
									<Text
										style={styles.directionText}>Direction</Text>
								</View>
							</View>
						</View>
						<View style={styles.receiptSectionSeperator}>
							<Image
								source={require("./../../assets/images/curve_in_background.png")}
								style={styles.curve_in} />
							<View
								style={styles.sectionSeperatorView} />
						</View>
						{this.renderOrderItems(order.order_items, order.voucher_items, order)}
						<View style={styles.receiptSectionSeperator}>
							<Image
								source={require("./../../assets/images/curve_in_background.png")}
								style={styles.curve_in} />
							<View
								style={styles.sectionSeperatorView} />
						</View>
						<View style={styles.totalViewWrapper}>
							<View
								style={styles.totalView}>
								<Text
									style={styles.totallabelText}>TOTAL</Text>
								<View
									style={{
										flex: 1,
									}} />
								<Text
									style={styles.totalText}>${order.total >= 0 ? parseFloat(order.total).toFixed(2) : "0.00"}</Text>
							</View>
						</View>
						{/* <Text
								style={styles.callrefundText}>Please call for refund.</Text> */}
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
		fontFamily: TITLE_FONT,
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
		fontFamily: TITLE_FONT,
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",

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
		alignSelf: "stretch",
		marginLeft: 18 * alpha,
		marginRight: 18 * alpha,
		marginTop: 13 * alpha,
		marginBottom: 20 * alpha,
		borderRadius: 14 * alpha,
		flex: 1,
	},
	whiteboxView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 168 * alpha,
		borderTopRightRadius: 14 * alpha,
		borderTopLeftRadius: 14 * alpha,
	},
	completeOrderView: {
		backgroundColor: "transparent",
		width: 243 * alpha,
		height: 88 * alpha,
		alignItems: "center",
	},
	logoImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 30 * alpha,
		height: 60 * alpha,
	},
	completedOrderText: {
		color: "rgb(0, 178, 227)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",

		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 10 * alpha,
	},
	thankMessageText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		marginTop: 5 * alpha,
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
	locationWrapperView: {
		backgroundColor: "rgb(245, 245, 245)",
		flex: 1,
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
		width: 182 * alpha,
		height: 60 * alpha,
	},
	shopBranchText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
		marginRight: 12 * alpha,
	},
	shopBranchAddressText: {
		color: "rgb(146, 146, 146)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 1 * alpha,
	},
	callView: {
		backgroundColor: "transparent",
		width: 35 * alpha,
		height: 55 * alpha,
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
	callText: {
		backgroundColor: "transparent",
		color: "rgb(163, 163, 163)",
		fontFamily: TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
		marginLeft: 6 * alpha,
		marginRight: 7 * alpha,
	},
	directionView: {
		backgroundColor: "transparent",
		width: 50 * alpha,
		height: 55 * alpha,
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
		fontFamily: TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
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
	voucherDescriptionText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
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
	totalViewWrapper: {
		backgroundColor: "rgb(245,245,245)",
		flex: 1,
		borderBottomLeftRadius: 14 * alpha,
		borderBottomRightRadius: 14 * alpha,
	},
	totalView: {
		backgroundColor: "transparent",
		height: 21 * alpha,
		marginLeft: 26 * alpha,
		marginRight: 24 * alpha,
		marginTop: 10 * alpha,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 18 * alpha,
	},
	totallabelText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",

		textAlign: "center",
	},
	totalText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		textAlign: "right",
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
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
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
		flexDirection: "row",
		alignItems: "flex-start",
	},
	nameText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
	},
	descriptionText: {
		backgroundColor: "transparent",
		color: "rgb(146, 146, 146)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",

		textAlign: "left",
	},
	quantityText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		marginRight: 52 * alpha,
		marginTop: 26 * alpha,
	},
	priceText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 26 * alpha,
	},
	itemTwoView: {
		backgroundColor: "transparent",
		height: 90 * alpha,
		marginRight: 1 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
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
		fontFamily: TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		width: 190 * alpha,
		textAlign: "left",
		backgroundColor: "transparent",
	},
	quantityThreeText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		marginRight: 56 * alpha,
	},
	priceThreeText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		marginRight: 3 * alpha,
	},

	voucherView: {
		backgroundColor: "transparent",
		height: 18 * alpha,
		marginBottom: 10 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	voucherNameText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
	},

	drinksViewWrapper: {
		backgroundColor: "rgb(245,245,245)",
		flex: 1,
	},
	drinksView: {
		backgroundColor: "transparent",
		flex: 1,
		marginTop: 10 * alpha,
	},

	productDetailView: {
		backgroundColor: "transparent",
		flex: 1,
		alignItems: "flex-start",
	},
	productNameText: {
		backgroundColor: "transparent",
		color: "rgb(63, 63, 63)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
		marginBottom: 5 * alpha,
	},
	productVariantText: {
		color: "rgb(164, 164, 164)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 191 * alpha,
		marginBottom: 10 * alpha,
	},
	productQuantityText: {
		color: "rgb(50, 50, 50)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		// marginRight: 4 * alpha,
		// width: 25 * alpha,
	},
	productPriceText: {
		color: "rgb(50, 50, 50)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		// width: 45 * alpha,
	},
	spacer: {
		marginBottom: 10 * alpha,
	},
	dottedLineImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		alignSelf: "center",
		position: "absolute",
		bottom: 0,
		width: 291 * alpha,
		height: 2 * alpha,
	},

	receiptSectionSeperator: {
		flex: 1,
		backgroundColor: "transparent",
		alignContent: "center",
		justifyContent: "center",
	},

	curve_in: {
		height: 14 * alpha,
		resizeMode: "stretch",
		width: "100%",
		backgroundColor: "transparent",
	},

	sectionSeperatorView: {
		backgroundColor: "rgb(234, 234, 234)",
		position: "absolute",
		alignSelf: "center",
		width: 300 * alpha,
		height: 1 * alpha,

	},

})
