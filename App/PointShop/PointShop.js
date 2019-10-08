//
//  PointShop
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {Text, View, StyleSheet, FlatList, TouchableOpacity, Image} from "react-native"
import React from "react"
import PointProductCell from "./PointProductCell"
import { alpha, fontAlpha } from "../Common/size";
import { KURL_INFO } from "../../App/Utils/server.js"
import {createAction} from "../Utils";
import {connect} from "react-redux";
import PointsProductsRequestObject from "../Requests/points_products_request_object.js"

@connect(({ members }) => ({
	members: members.profile
}))
export default class PointShop extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Point Shop",
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
		}
	}

	componentDidMount() {
		this.loadPointsProducts()
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	loadPointsProducts(){
		const { dispatch, members } = this.props
		this.setState({ loading: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					loading: false,
					data: eventObject.result,
				})
			}

		}
		const obj = new PointsProductsRequestObject()
		obj.setUrlId(members.company_id)
		dispatch(
			createAction('companies/loadPointsProducts')({
				object:obj,
				callback,
			})
		)
	}

	sectionData = [

		{
			title: 'Main dishes',
			data: ['Pizza', 'Burger', 'Risotto'],
		},
		{
			title: 'Sides',
			data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
		},
		{
			title: 'Drinks',
			data: ['Water', 'Coke', 'Beer'],
		},
		{
			title: 'Desserts',
			data: ['Cheese Cake', 'Ice Cream'],
		},


	]

	onPointHistoryPressed = () => {

		const { navigate } = this.props.navigation

		navigate("PointHistory")
	}

	onTransactionHistoryPressed = () => {
		const { navigate } = this.props.navigation

		navigate("PointShopHistory")
	}

	onRulesPressed = () => {
		const { navigate } = this.props.navigation

		navigate("WebCommon", {
			title: 'Point Rules',
			web_url: KURL_INFO + '?page=point_rules&id=1',
		})
	}

	renderPointproductlistFlatListCell = ({ item, index }) => {
	
		return <PointProductCell
				navigation={this.props.navigation}
				sectionId={item.id}
				sectionHeader={item.name}
				products={item.points_products}
				index={index}/>
	}

	render() {

		const { members } = this.props
		return <View
			style={styles.pointShopView}>
			<View
				style={styles.contentView}>
				<View
					pointerEvents="box-none"
					style={{
						height: 122 * alpha,
					}}>
					<View
						style={styles.pointCollectedView}>
						<View
							style={styles.pointCollectedTwoView}>
							<Text
								style={styles.pointsText}>{members.points}</Text>
							<Text
								style={styles.pointsCollectedText}>Points Collected</Text>
						</View>
					</View>
					<TouchableOpacity
						onPress={this.onRulesPressed}
						style={styles.rulesButton}>
						<Image
							source={require("./../../assets/images/icon-rule.png")}
							style={styles.rulesButtonImage}/>
						<Text
							style={styles.rulesButtonText}>Point Rule</Text>
					</TouchableOpacity>
				</View>
				<View
					style={styles.headerView}>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
							justifyContent: "center",
						}}>
						<View
							pointerEvents="box-none"
							style={{
								height: 21 * alpha,
								marginLeft: 45 * alpha,
								marginRight: 28 * alpha,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<TouchableOpacity
								onPress={this.onPointHistoryPressed}
								style={styles.pointHistoryButton}>
								<Text
									style={styles.pointHistoryButtonText}>Points History</Text>
							</TouchableOpacity>
							<View
								style={{
									flex: 1,
								}}/>
							<TouchableOpacity
								onPress={this.onTransactionHistoryPressed}
								style={styles.transactionHistoryButton}>
								<Text
									style={styles.transactionHistoryButtonText}>Point History</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							alignSelf: "center",
							top: 0,
							bottom: 0,
							justifyContent: "center",
						}}>
						<View
							style={styles.seperatorView}/>
					</View>
				</View>
				<View
					style={styles.pointproductlistFlatListViewWrapper}>
					<FlatList
						renderItem={this.renderPointproductlistFlatListCell}
						data={this.state.data}
						style={styles.pointproductlistFlatList}
						keyExtractor={(item, index) => index.toString()}/>
				</View>
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
	pointShopView: {
		backgroundColor: "white",
		flex: 1,
	},
	contentView: {
		backgroundColor: "transparent",
		flex: 1,
		marginBottom: 3 * alpha,
	},
	pointCollectedView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 122 * alpha,
		alignItems: "center",
	},
	pointCollectedTwoView: {
		backgroundColor: "transparent",
		width: 163 * alpha,
		height: 57 * alpha,
		marginTop: 21 * alpha,
		alignItems: "center",
	},
	pointsText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 31 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	pointsCollectedText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "DINPro-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	rulesButtonText: {
		color: "rgb(42, 42, 42)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	rulesButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		right: 21 * alpha,
		width: 81 * alpha,
		top: 90 * alpha,
		height: 13 * alpha,
	},
	rulesButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	headerView: {
		backgroundColor: "white",
		height: 31 * alpha,
		marginRight: 1 * alpha,
	},
	pointHistoryButtonText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	pointHistoryButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 97 * alpha,
		height: 21 * alpha,
	},
	pointHistoryButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	transactionHistoryButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 133 * alpha,
		height: 21 * alpha,
	},
	transactionHistoryButtonText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	transactionHistoryButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	seperatorView: {
		backgroundColor: "rgb(221, 221, 221)",
		width: 1 * alpha,
		height: 20 * alpha,
	},
	pointproductlistFlatList: {
		backgroundColor: "white",
		width: "100%",
		height: "100%",
	},
	pointproductlistFlatListViewWrapper: {
		flex: 1,
		marginRight: 1 * alpha,
	},
})