//
//  Home
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import Product from "./Product"
import { FlatList, StyleSheet, Image, View, Text, TouchableOpacity } from "react-native"
import Category from "./Category"


export default class Home extends React.Component {

	static navigationOptions = ({ navigation }) => {
	
		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}
	}

	static tabBarItemOptions = ({ navigation }) => {
	
		return {
				tabBarLabel: "Order",
				tabBarIcon: ({ iconTintColor }) => {
				
					return <Image
							source={require("./../../assets/images/group-53.png")}/>
				},
			}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onRightTwoPressed = () => {
	
	}

	onLeftTwoPressed = () => {
	
	}

	menuFlatListMockData = [{
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

	renderMenuFlatListCell = ({ item }) => {
	
		return <Product
				navigation={this.props.navigation}/>
	}

	menucategoryFlatListMockData = [{
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
	}, {
		key: "11",
	}, {
		key: "12",
	}, {
		key: "13",
	}, {
		key: "14",
	}, {
		key: "15",
	}]

	renderMenucategoryFlatListCell = ({ item }) => {
	
		return <Category
				navigation={this.props.navigation}/>
	}

	render() {
	
		return <View
				style={styles.page1View}>
				<View
					style={styles.titleBarView}>
					<View
						style={styles.logoView}>
						<Image
							source={require("./../../assets/images/group-26-2.png")}
							style={styles.logoImage}/>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.menuView}>
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
									style={styles.navrightbuttonView}>
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
										<TouchableOpacity
											onPress={this.onRightTwoPressed}
											style={styles.rightButton}>
											<Image
												source={require("./../../assets/images/right-3.png")}
												style={styles.rightButtonImage}/>
										</TouchableOpacity>
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
									left: 0,
									top: 0,
									bottom: 0,
									justifyContent: "center",
								}}>
								<View
									style={styles.navleftbuttonView}>
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
										<TouchableOpacity
											onPress={this.onLeftTwoPressed}
											style={styles.leftButton}>
											<Image
												source={require("./../../assets/images/left-3.png")}
												style={styles.leftButtonImage}/>
										</TouchableOpacity>
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
						style={styles.branchView}>
						<View
							pointerEvents="box-none"
							style={{
								height: 33,
								marginLeft: 25,
								marginRight: 17,
								marginTop: 3,
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							<View
								style={styles.branchTwoView}>
								<Text
									style={styles.branchText}>Branch</Text>
								<Image
									source={require("./../../assets/images/group-4.png")}
									style={styles.group4Image}/>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								style={styles.pickUpDeliveryView}>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										right: 0,
										top: 0,
										bottom: 0,
										justifyContent: "center",
									}}>
									<Text
										style={styles.deliveryText}>Delivery</Text>
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
										source={require("./../../assets/images/menu-button2-4.png")}
										style={styles.switchImage}/>
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
										style={styles.pickUpView}>
										<Text
											style={styles.pickUpText}>Pick Up</Text>
									</View>
								</View>
							</View>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							pointerEvents="box-none"
							style={{
								height: 12,
								marginLeft: 25,
								marginRight: 22,
								marginBottom: 4,
								flexDirection: "row",
								alignItems: "flex-end",
							}}>
							<Text
								style={styles.distanceText}>Distance 1km</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								style={styles.moreView}>
								<Text
									style={styles.moreText}>More</Text>
								<Image
									source={require("./../../assets/images/group.png")}
									style={styles.morearrowImage}/>
							</View>
						</View>
					</View>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					<View
						style={styles.menucategoryFlatListViewWrapper}>
						<FlatList
							renderItem={this.renderMenucategoryFlatListCell}
							data={this.menucategoryFlatListMockData}
							style={styles.menucategoryFlatList}/>
					</View>
					<View
						style={styles.menuFlatListViewWrapper}>
						<FlatList
							renderItem={this.renderMenuFlatListCell}
							data={this.menuFlatListMockData}
							style={styles.menuFlatList}/>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	page1View: {
		backgroundColor: "white",
		flex: 1,
	},
	titleBarView: {
		backgroundColor: "transparent",
		height: 110,
		marginTop: 20,
	},
	logoView: {
		backgroundColor: "white",
		height: 52,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	logoImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 61,
		height: 32,
		marginLeft: 26,
		marginTop: 13,
	},
	menuView: {
		backgroundColor: "transparent",
		width: 82,
		height: 32,
		marginRight: 9,
		marginTop: 10,
	},
	navrightbuttonView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
	},
	rightButtonImage: {
		resizeMode: "contain",
	},
	rightButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	rightButtonText: {
		color: "black",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	circleImage: {
		backgroundColor: "transparent",
		resizeMode: "contain",
		width: null,
		height: 16,
		marginLeft: 12,
		marginRight: 17,
	},
	navleftbuttonView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
	},
	leftButtonText: {
		color: "black",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	leftButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	leftButtonImage: {
		resizeMode: "contain",
	},
	dotImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: null,
		height: 6,
		marginLeft: 13,
		marginRight: 12,
	},
	branchView: {
		backgroundColor: "transparent",
		shadowColor: "rgba(198, 192, 192, 00.50)",
		shadowRadius: 5,
		shadowOpacity: 1,
		height: 58,
	},
	branchTwoView: {
		backgroundColor: "transparent",
		width: 105,
		height: 19,
		marginTop: 7,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	branchText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		flex: 1,
		marginRight: 13,
	},
	group4Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 13,
		height: 12,
		marginLeft: 13,
	},
	pickUpDeliveryView: {
		backgroundColor: "transparent",
		width: 92,
		height: 33,
	},
	deliveryText: {
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 4,
	},
	switchImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		opacity: 0.34,
		width: null,
		height: 33,
	},
	pickUpView: {
		backgroundColor: "rgba(42, 41, 41, 00.89)",
		borderRadius: 15.5,
		width: 52,
		height: 31,
		marginLeft: 1,
		justifyContent: "center",
	},
	pickUpText: {
		backgroundColor: "transparent",
		color: "rgb(253, 253, 253)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 10,
		marginRight: 10,
	},
	distanceText: {
		color: "rgb(188, 181, 181)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	moreView: {
		backgroundColor: "transparent",
		width: 29,
		height: 11,
		marginBottom: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	moreText: {
		backgroundColor: "transparent",
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 8,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		flex: 1,
		marginRight: 4,
	},
	morearrowImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 6,
		height: 5,
	},
	menucategoryFlatList: {
		backgroundColor: "transparent",
		width: "100%",
		height: "100%",
	},
	menucategoryFlatListViewWrapper: {
		width: 91,
		height: "100%",
	},
	menuFlatList: {
		backgroundColor: "rgb(255, 254, 254)",
		width: "100%",
		height: "100%",
	},
	menuFlatListViewWrapper: {
		flex: 1,
		alignSelf: "stretch",
		marginTop: 1,
	},
})
