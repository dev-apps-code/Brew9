//
//  PointHistory
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { FlatList, StyleSheet, Text, Image, View, TouchableOpacity, RefreshControl } from "react-native"
import PointsCell from "./PointsCell"
import { alpha, fontAlpha } from "../common/size";
import { createAction } from '../Utils/index'
import { connect } from "react-redux";
import PointStatementRequestObject from "../Requests/point_statement_request_object"

@connect(({ members }) => ({
	member_id: members.member_id,
	member_point: members.member_point,
}))
export default class PointHistory extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Points",
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
			page: 1,
			total: 0,
			data: [],
			loading: true,
			isRefreshing: true,
		}
	}

	loadPointHistory(page_no) {
		const { dispatch, member_id } = this.props
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					isRefreshing: false,
					loading: false,
					data: this.state.data.concat(eventObject.result),
					total: eventObject.total,
					page: this.state.page + 1
				})
			}
		}
		const obj = new PointStatementRequestObject()
		obj.setUrlId(member_id)
		obj.setPage(page_no)
		dispatch(
			createAction('point_statements/loadPointHistory')({
				object: obj,
				callback
			})
		)
	}

	onRefresh() {
		this.setState({
			isRefreshing: true,
			data: [],
			page: 1
		})
		this.loadPointHistory(1)
	}

	loadMore() {
		const {
			total,
			data,
			loading,
		} = this.state

		if (!loading) {
			if (total > data.length) {
				this.setState({
					isRefreshing: true
				})
				this.loadPointHistory(this.state.page)
			}
		}
	}

	componentDidMount() {
		this.loadPointHistory(1)
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
	}

	onPointRulePressed = () => {

	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	onItemPressed = () => {

	}

	renderHistoryFlatListCell = ({ item }) => {

		return <PointsCell
			id={item.id}
			description={item.description}
			value={item.value}
			created_at={item.created_at}
			shop={item.shop.name}
			navigation={this.props.navigation}
		/>
	}

	render() {

		return <View
			style={styles.pointHistoryView}>
			<View
				style={styles.contentView}>
				<View
					style={styles.pointCollectedView}>
					<View
						style={styles.pointCollectedTwoView}>
						<Text
							style={styles.pointsCollectedText}>Points Collected</Text>
						<Text
							style={styles.pointsText}>843</Text>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<TouchableOpacity
						onPress={this.onPointRulePressed}
						style={styles.pointRuleButton}>
						<Image
							source={require("./../../assets/images/icon-rule.png")}
							style={styles.pointRuleButtonImage}/>
						<Text
							style={styles.pointRuleButtonText}>Point Rule</Text>
					</TouchableOpacity>
				</View>
				<View
					style={styles.headerView}>
					<Text
						style={styles.transactionHistoryText}>Transaction History</Text>
				</View>
				<View
					style={styles.pointhistoryFlatListViewWrapper}>
					<FlatList
						renderItem={this.renderHistoryFlatListCell}
						data={this.state.data}
						style={styles.historyFlatList}
						refreshing={this.state.isRefreshing}
						onRefresh={this.onRefresh.bind(this)}
						onEndReachedThreshold={0.1}
						onEndReached={this.loadMore.bind(this)}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>
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
	pointHistoryView: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	contentView: {
		backgroundColor: "transparent",
		flex: 1,
		marginBottom: 32 * alpha,
	},
	pointCollectedView: {
		backgroundColor: "white",
		height: 130 * alpha,
		marginRight: 1 * alpha,
		alignItems: "flex-end",
	},
	pointCollectedTwoView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 163 * alpha,
		height: 57 * alpha,
		marginTop: 28 * alpha,
	},
	pointsCollectedText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "DINPro-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 28 * alpha,
		right: 30 * alpha,
		top: 0,
	},
	pointsText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 31 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		alignSelf: "center",
		top: 18 * alpha,
	},
	pointRuleButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	pointRuleButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 77 * alpha,
		height: 15 * alpha,
		marginRight: 19 * alpha,
		marginBottom: 18 * alpha,
	},
	pointRuleButtonText: {
		color: "rgb(30, 29, 29)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	headerView: {
		backgroundColor: "white",
		height: 47 * alpha,
		marginRight: 1 * alpha,
		marginTop: 10 * alpha,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	transactionHistoryText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "DINPro-Bold",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 26 * alpha,
	},
	pointhistoryFlatList: {
		backgroundColor: "white",
		width: "100%",
		height: "100%",
	},
	pointhistoryFlatListViewWrapper: {
		flex: 1,
		marginRight: 1,
	},
})