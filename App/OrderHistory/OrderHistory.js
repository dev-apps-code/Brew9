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
import { alpha, fontAlpha } from "../common/size";

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

	orderHistoryFlatListMockData = [{
		key: "1",
	}, {
		key: "2",
	}, {
		key: "3",
	}, {
		key: "4",
	}, {
		key: "5",
	}, {
		key: "6",
	}, {
		key: "7",
	}, {
		key: "8",
	}, {
		key: "9",
	}, {
		key: "10",
	}]

	renderOrderHistoryFlatListCell = ({ item }) => {
	
		return <OrderCell
				navigation={this.props.navigation}/>
	}

	render() {
	
		return <View
				style={styles.OrderHistoryView}>
				<View
					style={styles.headerView}>
					<Text
						style={styles.purchaseHistoryText}>Purchase History</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.seeAllText}>See all</Text>
					<Image
						source={require("./../../assets/images/group-16.png")}
						style={styles.groupImage}/>
				</View>
				<View
					style={styles.orderHistoryFlatListViewWrapper}>
					<FlatList
						renderItem={this.renderOrderHistoryFlatListCell}
						data={this.orderHistoryFlatListMockData}
						style={styles.orderHistoryFlatList}/>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
	},
	navigationBarItem: {

	},
	navigationBarItemTitle: {
		color: "black",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
	},
	navigationBarItemIcon: {
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
		fontFamily: "Helvetica-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 20 * alpha,
	},
	seeAllText: {
		backgroundColor: "transparent",
		color: "rgb(102, 101, 101)",
		fontFamily: "Helvetica-Bold",
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
