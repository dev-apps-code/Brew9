//
//  OrderHistory
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { FlatList, View, StyleSheet, Text, Image } from "react-native"
import React from "react"
import OrderCell from "./OrderCell"


export default class OrderHistory extends React.Component {

	static navigationOptions = ({ navigation }) => {
	
		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	orderlistFlatListMockData = [{
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

	renderOrderlistFlatListCell = ({ item }) => {
	
		return <OrderCell
				navigation={this.props.navigation}/>
	}

	render() {
	
		return <View
				style={styles.iphone8Copy19View}>
				<View
					style={styles.navigationView}>
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
							style={styles.logoView}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									right: 0,
									top: 0,
									bottom: 0,
									justifyContent: "center",
								}}>
								<View
									style={styles.rightCircleView}>
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
										<Image
											source={require("./../../assets/images/right-14.png")}
											style={styles.rightImage}/>
									</View>
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
										<Image
											source={require("./../../assets/images/circle.png")}
											style={styles.circleImage}/>
									</View>
								</View>
							</View>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									right: 0,
									top: 0,
									bottom: 0,
									justifyContent: "center",
								}}>
								<View
									style={styles.leftDotView}>
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
										<Image
											source={require("./../../assets/images/left-14.png")}
											style={styles.leftImage}/>
									</View>
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
										<Image
											source={require("./../../assets/images/dot.png")}
											style={styles.dotImage}/>
									</View>
								</View>
							</View>
						</View>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 0,
							top: 0,
							bottom: 0,
							justifyContent: "center",
						}}>
						<View
							pointerEvents="box-none"
							style={{
								width: 101,
								height: 14,
								marginLeft: 21,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Image
								source={require("./../../assets/images/group-4-3.png")}
								style={styles.group4Image}/>
							<Text
								style={styles.orderHistoryText}>Order History</Text>
						</View>
					</View>
				</View>
				<View
					style={styles.purchaseHistoryView}>
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
					pointerEvents="box-none"
					style={{
						height: 556,
					}}>
					<View
						style={styles.rectangleView}/>
					<View
						style={styles.orderlistFlatListViewWrapper}>
						<FlatList
							renderItem={this.renderOrderlistFlatListCell}
							data={this.orderlistFlatListMockData}
							style={styles.orderlistFlatList}/>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	iphone8Copy19View: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	navigationView: {
		backgroundColor: "transparent",
		height: 52,
		marginTop: 20,
	},
	logoView: {
		backgroundColor: "white",
		height: 52,
	},
	rightCircleView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
		marginRight: 9,
	},
	rightImage: {
		backgroundColor: "transparent",
		opacity: 0.6,
		resizeMode: "center",
		width: null,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	circleImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 16,
		marginLeft: 12,
		marginRight: 17,
	},
	leftDotView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
		marginRight: 47,
	},
	leftImage: {
		backgroundColor: "transparent",
		opacity: 0.61,
		resizeMode: "center",
		width: null,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	dotImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 6,
		marginLeft: 13,
		marginRight: 12,
	},
	group4Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 13,
		height: 12,
	},
	orderHistoryText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 10,
	},
	purchaseHistoryView: {
		backgroundColor: "white",
		shadowColor: "rgba(226, 226, 226, 0.5)",
		shadowRadius: 4,
		shadowOpacity: 1,
		height: 39,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	purchaseHistoryText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 26,
		marginTop: 15,
	},
	seeAllText: {
		color: "rgb(149, 149, 149)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 6,
		marginTop: 17,
	},
	groupImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		flex: 1,
		height: 8,
		marginLeft: 6,
		marginRight: 24,
		marginTop: 20,
	},
	rectangleView: {
		backgroundColor: "rgb(244, 244, 244)",
		shadowColor: "rgba(238, 238, 238, 0.5)",
		shadowRadius: 1,
		shadowOpacity: 1,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 556,
	},
	orderlistFlatList: {
		backgroundColor: "transparent",
		width: "100%",
		height: "100%",
	},
	orderlistFlatListViewWrapper: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 10,
		height: 546,
	},
})
