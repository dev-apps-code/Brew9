//
//  PointShopHistory
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {FlatList, View, StyleSheet, TouchableOpacity, Image} from "react-native"
import Cell from "./Cell"
import React from "react"
import {alpha, fontAlpha} from "../Common/size";


export default class PointShopHistory extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Purchase History",
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

	tableViewFlatListMockData = [{
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

	renderTableViewFlatListCell = ({ item }) => {
	
		return <Cell
				navigation={this.props.navigation}/>
	}

	render() {
	
		return <View
				style={styles.pointPurchaseHistoryView}>
				<View
					style={styles.tableViewFlatListViewWrapper}>
					<FlatList
						renderItem={this.renderTableViewFlatListCell}
						data={this.tableViewFlatListMockData}
						style={styles.tableViewFlatList}/>
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
})
