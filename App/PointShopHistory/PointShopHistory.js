//
//  PointShopHistory
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {FlatList, View, StyleSheet, TouchableOpacity, Image, Text} from "react-native"
import Cell from "./Cell"
import React from "react"
import {alpha, fontAlpha} from "../Common/size";
import { connect } from "react-redux";
import GetPointProductRedemptionRequestObject from '../Requests/get_point_product_redemption_request_object'
import {createAction} from '../Utils'
import { NON_TITLE_FONT, TITLE_FONT } from "../Common/common_style"

@connect(({ members, shops }) => ({
	currentMember: members.profile,
	company_id: members.company_id,
	location: members.location,
	selectedShop: shops.selectedShop
}))
export default class PointShopHistory extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			headerTitle: <Text style={{ textAlign: 'center', alignSelf: "center", fontFamily: TITLE_FONT}}>Purchase History</Text>,
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
			loading_list:true,
			orders_initial: true,
			orders_data: [],
			orders_page: 1,
		 }
	}

	componentDidMount() {
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
		this.loadPointProductRedemption(this.state.orders_page)
	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	loadPointProductRedemption(page){
		const { dispatch, currentMember } = this.props
		const { page_no } = this.state
		this.setState({ loading_list: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
				orders_initial: false,
				orders_data: this.state.orders_data.concat(eventObject.result),
				orders_total: eventObject.total,
				orders_page: this.state.orders_page + 1,
				})      
			}
			this.setState({loading_list: false})
		}
		const obj = new GetPointProductRedemptionRequestObject(page_no)
		obj.setUrlId(currentMember.id)
		obj.setPage(page_no)
		dispatch(
			createAction('members/loadPointProductRedemption')({
				object:obj,
				callback,
			})
		)
	}

	renderTableViewFlatListCell = ({ item }) => {
	
		return <Cell
				item = {item}
				redeem_name = {item.name}
				redeem_shop = {item.shop.name}
				redeem_at = {item.redeemed_at}
				updated_at = {item.updated_at}
				redeem_points = {item.points}
				product_image = {item.points_product.thumb}
				navigation={this.props.navigation}/>
	}

	render() {
	
		const { orders_data} = this.state

		return <View
				style={styles.pointPurchaseHistoryView}>
				
				<View
					style={styles.tableViewFlatListViewWrapper}>
					{(!this.state.loading_list && this.state.orders_data.length > 0) ?
					<FlatList
						renderItem={this.renderTableViewFlatListCell}
						data={orders_data}
						style={styles.tableViewFlatList}
						keyExtractor={(item, index) => index.toString()}/>
					: <View
							style={styles.blankView}>
						<Text style={styles.noLabelText}>You have not make any redemption</Text>
				</View> 
				}
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
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
	},
	navigationBarItemIcon: {
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
	pointPurchaseHistoryView: {
		backgroundColor: "white",
		flex: 1,
	},
	tableViewFlatList: {
		backgroundColor: "transparent",
		width: "100%",
		height: "100%",
	},
	tableViewFlatListViewWrapper: {
		flex: 1,
	},
	blankView: {
		backgroundColor: "transparent",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	noLabelText: {
		color: "rgb(149, 149, 149)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
})
