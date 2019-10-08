//
//  TopUpWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, TouchableOpacity, View, StyleSheet, Image, FlatList, ActivityIndicator } from "react-native"
import Card from "./Card"
import React from "react"
import {alpha, fontAlpha} from "../Common/size";
import TopUpProductsRequestObject from "../Requests/top_up_products_request_object";
import {createAction} from "../Utils";
import {connect} from "react-redux";

@connect(({ members }) => ({
	members: members.profile
}))
export default class TopUpWallet extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Top Up Wallet",
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
			loading: true,
			data: [],
			selected_price: null,
			selected: 0,
		}
	}

	loadTopUpProducts(){
		const { dispatch, members } = this.props

		this.setState({ loading: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					data: eventObject.result,
				},function () {
					if (eventObject.result.length > 0) {
						this.setState({
							selected_price: eventObject.result[0].price
						})
					}
				}.bind(this))
			}
			this.setState({
				loading: false,
			})
		}
		const obj = new TopUpProductsRequestObject()
		obj.setUrlId(members.company_id)
		dispatch(
			createAction('companies/loadTopUpProducts')({
				object:obj,
				callback,
			})
		)
	}

	componentDidMount() {
		this.loadTopUpProducts()
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	onTopUpPressed = () => {
		const { navigate } = this.props.navigation

		navigate("Transaction", {
			transaction_name: 'Top Up Wallet',
			amount: this.state.selected_price,
		})
	}

	onTopUpCardPressed = (price,index) => {

		this.setState({
			selected_price: price,
			selected: index,
		})
	}

	renderTopuplistFlatListCell = ({ item, index }) => {
	
		return <Card
			navigation={this.props.navigation}
			image={item.image}
			price={item.price}
			index={index}
			currency={this.props.members.currency}
			selected={this.state.selected}
			onPressItem={this.onTopUpCardPressed}
		/>
	}

	render() {

		return <View
			style={styles.topUpWalletView}>
			{/*<View*/}
			{/*	style={styles.noticeView}>*/}
			{/*	<Text*/}
			{/*		style={styles.messageText}>Please contact customer service for top up receipt, orders will no longer be issued.</Text>*/}
			{/*</View>*/}
			{ this.state.loading && (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" />
				</View>
			)}
			<View
				style={styles.topuplistFlatListViewWrapper}>
				<FlatList
					renderItem={this.renderTopuplistFlatListCell}
					data={this.state.data}
					style={styles.topuplistFlatList}
					selected={this.state.selected}
					keyExtractor={(item, index) => index.toString()}/>
			</View>
			<View
				style={styles.topUpView}>
				<Text
					style={styles.selectedValueText}>{this.props.members.currency}{this.state.selected_price ? this.state.selected_price : '' }</Text>
				<View
					style={{
						flex: 1,
					}}/>
				<TouchableOpacity
					onPress={this.onTopUpPressed}
					style={styles.topupButton}>
					<Text
						style={styles.topupButtonText}>Top Up</Text>
				</TouchableOpacity>
			</View>
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
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10 * alpha,
	},
	topUpWalletView: {
		backgroundColor: "rgb(248, 248, 248)",
		flex: 1,
	},
	noticeView: {
		backgroundColor: "rgba(141, 230, 255, 0.4)",
		height: 34 * alpha,
		justifyContent: "center",
		alignItems: "flex-end",
	},
	messageText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "DINPro-Medium",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 20 * alpha,
	},
	topuplistFlatList: {
		backgroundColor: "transparent",
		width: "100%",
		height: "100%",
	},
	topuplistFlatListViewWrapper: {
		flex: 1,
	},
	topUpView: {
		backgroundColor: "white",
		height: 52 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	selectedValueText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "DINPro-Medium",
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
		fontFamily: "SFProText-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	topupButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
})
