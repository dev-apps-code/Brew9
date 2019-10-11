//
//  OrderHistory
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import OrderCell from "./OrderCell.js"
import {Text, View, FlatList, Image, StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import { connect } from "react-redux";
import GetOrderRequestObject from '../Requests/get_order_request_object'
import {createAction} from '../Utils'
@connect(({ members, shops }) => ({
	currentMember: members.profile,
	company_id: members.company_id,
	location: members.location,
	selectedShop: shops.selectedShop
}))
export default class OrderHistory extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Order History",
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
			loading_list: true,
			orders_initial: true,
			orders_data: [],
			orders_page: 1,
		 }
	}

	loadOrders(page){
		const { dispatch ,currentMember} = this.props	
		this.setState({ loading_list: true })
		const callback = eventObject => {
			this.setState({loading_list: false,})
			if (eventObject.success) {
				this.setState({
				orders_initial: false,
				orders_data: this.state.orders_data.concat(eventObject.result),
				orders_total: eventObject.total,
				orders_page: this.state.orders_page + 1,				
				})        				
			}
			
		}
		const obj = new GetOrdersRequestObject(page)
		obj.setUrlId(currentMember.id) 
		obj.setPage(page)
		dispatch(
			createAction('members/loadOrders')({
				object:obj,
				callback,
			})
		)
	}


	loadMore(){
		const { loading_list , orders_data , orders_total , orders_page} = this.state
		if (!loading_list){
			if (orders_total > orders_data.length) {
				this.loadOrders(orders_page)
			}
		}
	}



	componentDidMount() {
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
		this.loadGetOrders()
	}

	loadGetOrders(){
		const { dispatch, currentMember } = this.props
		if (currentMember !== null) {
			this.setState({ loading: true })
			const callback = eventObject => {
				if (eventObject.success) {
					this.setState({
						orders: this.state.orders.concat(eventObject.result)
					})
				}
				this.setState({
					loading: false,
				})        
			}
			const obj = new GetOrderRequestObject()
			obj.setUrlId(currentMember.id)
			// obj.setUrlId(1)
			dispatch(
				createAction('orders/loadGetOrders')({
					object:obj,
					callback,
				})
			)
		}
	}
	
	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	renderOrderHistoryFlatListCell = ({ item }) => {
	
		return <OrderCell
				navigation={this.props.navigation}
				order_id={item.id}
				total={item.total}
				receipt_no={item.receipt_no}
				payment_time={item.payment_time}
				shop_name={item.shop.name}
				products={item.order_items}
				status={item.status}
		/>
	}

	render() {
		const {orders_data} = this.state
		return <View
				style={styles.OrderHistoryView}>
				<View
					style={styles.headerView}>
					<Text
						style={styles.purchaseHistoryText}>Order History</Text>
					<View
						style={{
							flex: 1,
						}}/>
					{/*<Text*/}
					{/*	style={styles.seeAllText}>See all</Text>*/}
					{/*<Image*/}
					{/*	source={require("./../../assets/images/group-16.png")}*/}
					{/*	style={styles.groupImage}/>*/}
				</View>
				<View
					style={styles.orderHistoryFlatListViewWrapper}>
					<FlatList
						onEndReached={this.loadMore.bind(this)}
						renderItem={this.renderOrderHistoryFlatListCell}
						data={orders_data}
						style={styles.orderHistoryFlatList}
						keyExtractor={(item, index) => index.toString()}/>
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
	OrderHistoryView: {
		backgroundColor: "white",
		flex: 1,
	},
	headerView: {
		backgroundColor: "white",
		shadowColor: "rgba(226, 226, 226, 0.5)",
		shadowRadius: 4 * alpha,
		shadowOpacity: 1 * alpha,
		height: 38 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	purchaseHistoryText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "SFProText-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 20 * alpha,
	},
	seeAllText: {
		backgroundColor: "transparent",
		color: "rgb(102, 101, 101)",
		fontFamily: "SFProText-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginRight: 5 * alpha,
	},
	groupImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 7 * alpha,
		height: 8 * alpha,
		marginRight: 20 * alpha,
	},
	orderHistoryFlatList: {
		backgroundColor: "rgb(247, 247, 247)",
		shadowColor: "rgba(238, 238, 238, 0.5)",
		shadowRadius: 1 * alpha,
		shadowOpacity: 1 * alpha,
		width: "100%",
		height: "100%",
	},
	orderHistoryFlatListViewWrapper: {
		flex: 1,
	},
})
