//
//  PointHistory
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { FlatList, StyleSheet, Text, Image, View, TouchableOpacity, ActivityIndicator } from "react-native"
import PointsCell from "./PointsCell"
import { alpha, fontAlpha } from "../Common/size";
import { createAction } from '../Utils/index'
import { connect } from "react-redux";
import PointStatementRequestObject from "../Requests/point_statement_request_object"
import {KURL_INFO} from "../Utils/server";
import {TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR, LIGHT_GREY, DEFAULT_GREY_BACKGROUND} from "../Common/common_style";
@connect(({ members }) => ({
	members: members.profile
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
			isRefreshing: false,
		}
	}

	loadPointHistory(page_no) {
		const { dispatch, members } = this.props
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
		obj.setUrlId(members.id)
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
		const { navigate } = this.props.navigation
		const { members } = this.props

		navigate("WebCommon", {
			title: 'Point Rules',
			web_url: KURL_INFO + '?page=point_rules&id=' + members.company_id,
		})
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
			shop={item.shop}
			navigation={this.props.navigation}
		/>
	}

	render() {

		const { members } = this.props

		var expiry_date = ""

		if (members.point_expiry_date != null && members.point_expiry_date != ""){
			expiry_date = `Expiry Date: ${members.point_expiry_date}`
		}

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
							style={styles.pointsText}>{members.points}</Text>
							{members.point_expiry_date != undefined}
						<Text
							style={styles.pointsExpiryText}>{expiry_date}</Text>
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
						style={styles.transactionHistoryText}>Point History</Text>
				</View>

				{this.state.loading ?
					<View style={[styles.container, styles.horizontal]}>
						<ActivityIndicator size="large" />
					</View> : <View
					style={styles.pointhistoryFlatListViewWrapper}>
						{(!this.state.loading && this.state.data.length > 0) ?
						<FlatList
							renderItem={this.renderHistoryFlatListCell}
							data={this.state.data}
							style={styles.historyFlatList}
							refreshing={this.state.isRefreshing}
							onRefresh={this.onRefresh.bind(this)}
							onEndReachedThreshold={0.1}
							onEndReached={this.loadMore.bind(this)}
							keyExtractor={(item, index) => index.toString()}
						/> :<View
						style={styles.blankView}>
						<Text
							style={styles.noLabelText}>No Point History</Text>
					</View>
						}
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
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10 * alpha,
	},
	pointHistoryView: {
		backgroundColor: DEFAULT_GREY_BACKGROUND,
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
		flexDirection: "column",
		width: 300 * alpha,
		flex: 1,
		marginTop: 18 * alpha,
	},
	pointsCollectedText: {
		color: "rgb(59, 59, 59)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		alignSelf: "center",
	},
	pointsText: {
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
pointsExpiryText: {
		color: LIGHT_GREY,
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		alignSelf: "center",
		top: 10 * alpha,
	},
	pointRuleButtonImage: {
		resizeMode: "contain",
		marginRight: 5 * alpha,
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
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		
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