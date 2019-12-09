//
//  MemberWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native"
import React from "react"
import { createAction } from "../Utils";
import { connect } from "react-redux";
import { KURL_INFO } from "../Utils/server";
import { alpha, fontAlpha } from "../Common/size";
import { TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR, DEFAULT_GREY_BACKGROUND, BUTTONBOTTOMPADDING } from "../Common/common_style";
import TopUpCard from "./TopUpCard"
import TopUpProductsRequestObject from "../Requests/top_up_products_request_object";
import TopUpOrderRequestObject from "../Requests/top_up_order_request_object";

@connect(({ members, shops }) => ({
	members: members.profile,
	selectedShop: shops.selectedShop
}))
export default class MemberWallet extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Wallet",
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
			loading_list: false,
			data: [],
			selectedTopUpProduct: null,
			selected: 0,
			order: null,
			toggleTopUp: false,
		}
	}

	componentDidMount() {
		this.loadTopUpProducts()
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
	}

	loadTopUpProducts() {
		const { dispatch, members } = this.props

		this.setState({ loading_list: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					data: eventObject.result,
				}, function () {
					if (eventObject.result.length > 0) {
						this.setState({
							selectedTopUpProduct: eventObject.result[0]
						})
					}
				}.bind(this))
			}
			this.setState({
				loading_list: false,
			})
		}
		const obj = new TopUpProductsRequestObject()
		obj.setUrlId(members.company_id)
		dispatch(
			createAction('companies/loadTopUpProducts')({
				object: obj,
				callback,
			})
		)
	}

	loadMakeOrder(topUpProductId) {
		const { navigate } = this.props.navigation
		const { dispatch, selectedShop } = this.props
		const { selectedTopUpProduct } = this.state

		this.setState({ loading: true })
		const callback = eventObject => {
			this.setState({
				loading: false,
			})
			if (eventObject.success) {

				const order = eventObject.result
				this.setState({ order: order })
				navigate("PaymentsWebview", {
					name: `Top Up - ${selectedTopUpProduct.price}`,
					order_id: order.receipt_no,
					session_id: order.session_id,
					amount: order.total,
					type: 'top_up',
				})
			} else {
				this.setState({
					modal_visible: true,
					modal_description: eventObject.message,
				})
			}
		}
		const obj = new TopUpOrderRequestObject(selectedShop.id)
		obj.setUrlId(topUpProductId)
		dispatch(
			createAction('top_up/loadMakeOrder')({
				object: obj,
				callback,
			})
		)
	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	onTransactionHistoryPressed = () => {

		const { navigate } = this.props.navigation

		navigate("CreditHistory")
	}

	onTopUpPressed = () => {

		const { selectedTopUpProduct } = this.state

		this.loadMakeOrder(selectedTopUpProduct.id)
	}

	onTopUpCardPressed = (topUpProduct, index) => {

		this.setState({
			selectedTopUpProduct: topUpProduct,
			selected: index,
			toggleTopUp: true
		})
	}

	renderTopuplistFlatListCell = ({ item, index }) => {

		return <TopUpCard
			navigation={this.props.navigation}
			image={item.image}
			price={item.price}
			index={index}
			item={item}
			currency={this.props.members.currency}
			selected={this.state.selected}
			onPressItem={this.onTopUpCardPressed}
		/>
	}

	render() {

		const { members } = this.props
		const { toggleTopUp } = this.state
		return <View
			style={styles.walletView}>
			<ScrollView
				style={styles.walletScrollView}>
				<View
					style={styles.walletSummaryView}>
					<View
						style={styles.walletCreditView}>
						<Text
							style={styles.creditsText}>${parseFloat(members.credits).toFixed(2)}</Text>

						<Text
							style={styles.walletCreditText}>Spendable cash</Text>

					</View>
					<View
						style={{
							flex: 1,
						}} />
					<TouchableOpacity
						onPress={() => this.onTransactionHistoryPressed()}
						style={styles.creditHistoryButton}>
						<Image
							source={require("./../../assets/images/icon-rule.png")}
							style={styles.creditHistoryButtonImage} />
						<Text
							style={styles.creditHistoryButtonText}>Wallet History</Text>
					</TouchableOpacity>
				</View>
				<View
					style={styles.headerView}>
					<Text
						style={styles.transactionHistoryText}>Online Top Up</Text>
				</View>
				<View
					style={styles.topuplistFlatListViewWrapper}>
					<FlatList
						renderItem={this.renderTopuplistFlatListCell}
						data={this.state.data}
						numColumns={2}
						style={styles.topuplistFlatList}
						selected={this.state.selected}
						keyExtractor={(item, index) => index.toString()} />
				</View>
				<View style={styles.shopTopUp}>
					<Text style={styles.shopTopUpText}>
						Top up is also available in-store.
					</Text>
				</View>
			</ScrollView>
			{toggleTopUp == true && (
				<View
					style={styles.topUpView}>
					<Text
						style={styles.selectedValueText}>${this.state.selectedTopUpProduct ? this.state.selectedTopUpProduct.price : ''}</Text>
					<View
						style={{
							flex: 1,
						}} />
					<TouchableOpacity
						onPress={() => this.onTopUpPressed()}
						style={styles.topupButton}>
						<Text
							style={styles.topupButtonText}>Top Up</Text>
					</TouchableOpacity>
				</View>
			)}
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
	walletView: {
		backgroundColor: DEFAULT_GREY_BACKGROUND,
		flex: 1,
	},
	walletScrollView: {
		backgroundColor: "transparent",
		flex: 1,
		marginBottom: 1 * alpha,
	},
	walletSummaryView: {
		backgroundColor: "white",
		height: 130 * alpha,
		marginRight: 1 * alpha,
		alignItems: "flex-end",
	},
	walletCreditView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		flexDirection: "column",
		width: 300 * alpha,
		flex: 1,
		marginTop: 18 * alpha,
	},
	walletCreditText: {
		color: "rgb(59, 59, 59)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		alignSelf: "center",
		marginTop: 5 * alpha,
	},
	creditsText: {
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 31 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		alignSelf: "center",
		top: 5 * alpha,
	},
	creditHistoryButtonImage: {
		resizeMode: "contain",
		marginRight: 5 * alpha,
	},
	creditHistoryButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 15 * alpha,
		marginRight: 19 * alpha,
		marginBottom: 18 * alpha,
	},
	creditHistoryButtonText: {
		color: "rgb(30, 29, 29)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	headerView: {
		backgroundColor: "white",
		height: 40 * alpha,
		marginTop: 10 * alpha,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	transactionHistoryText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
		marginLeft: 10 * alpha,
	},
	topuplistFlatListViewWrapper: {
		flex: 1,
		backgroundColor: "white"
	},
	topuplistFlatList: {
		width: "100%",
		height: "100%",
	},
	topUpView: {
		backgroundColor: "white",
		height: 52 * alpha,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: BUTTONBOTTOMPADDING
	},
	selectedValueText: {
		color: "rgb(59, 59, 59)",
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 21 * alpha,
	},
	topupButton: {
		backgroundColor: "rgb(0, 178, 227)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 129 * alpha,
		height: 52 * alpha,
	},
	topupButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
	},
	topupButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	shopTopUp: {
		flex: 1,
		backgroundColor: "white"
	},
	shopTopUpText: {
		margin: 20 * alpha,
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
	}
})
