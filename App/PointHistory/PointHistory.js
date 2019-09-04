//
//  PointHistory
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { FlatList, StyleSheet, Text, Image, View, TouchableOpacity } from "react-native"
import Cell from "./Cell"
import { alpha, fontAlpha } from "../common/size";
import { createAction } from "../Utils";
import { connect } from "react-redux"

export default class PointHistory extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "",
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
				<TouchableOpacity
					onPress={params.onItemPressed ? params.onItemPressed : () => null}
					style={styles.navigationBarItem}>
					<Text
						style={styles.navigationBarItemTitle}>Points</Text>
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
		// const ds = new FlatList.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
		this.state = {
			upcomingDataSourceArray: [],
			upcomingDataTotal: 0,
			pastDataTotal: 0,
			pastDataSourceArray: [],
			isLoading: false,
			refreshing: false,
			isInitialListLoading: true,
			isLoadingTab: false,
			tabPageNo: 1,
		}
	}

	callpointHistory(page) {
		const { dispatch } = this.props

		const member_id = 1
		const page_no = page

		const callback = eventObject => {
			this.setState({ isLoadingTab: false })
			if (eventObject.success) {
				this.setState({
					pastDataSourceArray: this.state.pastDataSourceArray.concat(
						eventObject.result
					),
					actualDataSource: this.state.actualDataSource.cloneWithRows(
						this.state.pastDataSourceArray.concat(eventObject.result)
					),
					isInitialListLoading: false,
					pastDataTotal: parseInt(eventObject.total),
					tabPageNo: page_no + 1,
				})
			} else {
				this.refs.toast.show(eventObject.message)
			}
		}
		this.setState({ isLoadingTab: true })

		// dispatch(
		// 	createAction('point_statements/loadPointHistory')({
		// 		callback,
		// 		page: page_no,
		// 		member_id: member_id,
		// 	})
		// )
	}

	componentDidMount() {
		this.callpointHistory(1)
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

	historyFlatListMockData = [{
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

	renderHistoryFlatListCell = ({ item }) => {

		return <Cell
			navigation={this.props.navigation}/>
	}

	render() {

		return <View
			style={styles.pointHistoryView}>
			<View
				style={styles.contentView}>
				<View
					style={styles.pointCollectedView}>
					<Text
						style={styles.headerText}>Points Collected</Text>
					<Text
						style={styles.pointsText}>843</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<View
						style={styles.pointRuleView}>
						<Image
							source={require("./../../assets/images/icon-rule.png")}
							style={styles.iconRuleImage}/>
						<TouchableOpacity
							onPress={this.onPointRulePressed}
							style={styles.pointRuleButton}>
							<Text
								style={styles.pointRuleButtonText}>Point Rule</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View
					style={styles.headerView}>
					<Text
						style={styles.transactionHistoryText}>Transaction History</Text>
				</View>
				<View
					style={styles.historyFlatListViewWrapper}>
					<FlatList
						renderItem={this.renderHistoryFlatListCell}
						data={this.historyFlatListMockData}
						style={styles.historyFlatList}/>
				</View>
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	navigationBarItem: {
	},
	navigationBarItemTitle: {
		color: "black",
		marginLeft: 10 * alpha,
	},
	navigationBarItemIcon: {
		tintColor: "black",
	},
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
	},
	pointHistoryView: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	contentView: {
		backgroundColor: "transparent",
		flex: 1,
	},
	pointCollectedView: {
		backgroundColor: "white",
		height: 130 * alpha,
		marginLeft: 1 * alpha,
		marginRight: 1 * alpha,
		alignItems: "center",
	},
	headerText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 15 * alpha,
	},
	pointsText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 36 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 11 * alpha,
	},
	pointRuleView: {
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 66 * alpha,
		height: 13 * alpha,
		marginRight: 19 * alpha,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	iconRuleImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 8 * alpha,
		height: 9 * alpha,
		marginRight: 7 * alpha,
		marginBottom: 12 * alpha,
	},
	pointRuleButtonText: {
		color: "rgb(30, 29, 29)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	pointRuleButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 55 * alpha,
		height: 13 * alpha,
		marginBottom: 12 * alpha,
	},
	pointRuleButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	headerView: {
		backgroundColor: "white",
		height: 43 * alpha,
		marginRight: 1 * alpha,
		marginTop: 10 * alpha,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	transactionHistoryText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 15 * alpha,
	},
	historyFlatList: {
		backgroundColor: "white",
		width: "100%",
		height: "100%",
	},
	historyFlatListViewWrapper: {
		flex: 1,
		marginLeft: 1 * alpha,
	},
})
