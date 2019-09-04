//
//  Home
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, StyleSheet, FlatList, Image, TouchableOpacity, View , StatusBar} from "react-native"
import React from "react"
import PushRequestObject from '../Requests/push_request_object'
import Product from "./Product"
import Category from "./Category"
import { connect } from 'react-redux';
import {createAction} from '../Utils/index'
@connect()
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
		this.loadStorePushToken()
	}

	loadStorePushToken() {
		const { dispatch } = this.props
		this.setState({ refreshing: true });
		const callback = eventObject => {
		  if (eventObject.success) {
			this.setState({ refreshing: false })
		  }
		}
		const obj = new PushRequestObject('device_key', 'device_type', 'push_identifier', "os")
		obj.setUrlId('1')
		dispatch(
		  createAction('members/loadStorePushToken')({
			object:obj,
			callback,
		  })
		)
	  }

	onRightTwoPressed = () => {
	
	}

	onLeftTwoPressed = () => {
	
	}

	onCheckoutPressed = () => {
		const { navigate } = this.props.navigation

		navigate("Checkout")
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
	}]

	renderMenucategoryFlatListCell = ({ item }) => {
	
		return <Category
				navigation={this.props.navigation}/>
	}

	render() {
	
		return <View
				style={styles.page1View}>
				<StatusBar barStyle="dark-content" />
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
							style={styles.branchTwoView}>
							<View
								pointerEvents="box-none"
								style={{
									alignSelf: "stretch",
									height: 19,
									marginRight: 29,
									flexDirection: "row",
									alignItems: "flex-start",
								}}>
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
							<Text
								style={styles.distanceText}>Distance 1km</Text>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							pointerEvents="box-none"
							style={{
								width: 92,
								marginRight: 17,
								marginTop: 3,
								marginBottom: 5,
								alignItems: "flex-end",
							}}>
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
						marginBottom: 49,
					}}>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
							flexDirection: "row",
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
					<View
						style={styles.cartView}>
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
								style={styles.totalAmountView}>
								<View
									style={styles.rectangleView}/>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										left: 37,
										right: 12,
										top: 0,
										height: 50,
										flexDirection: "row",
										alignItems: "flex-start",
									}}>
									<View
										style={styles.shopppingCartTotalView}>
										<View
											style={styles.rectangleTwoView}/>
										<View
											pointerEvents="box-none"
											style={{
												position: "absolute",
												left: 15,
												right: 3,
												top: 0,
												height: 42,
												alignItems: "flex-end",
											}}>
											<View
												style={styles.tiny2View}>
												<Text
													style={styles.textText}>5</Text>
											</View>
											<View
												style={styles.group5View}>
												<View
													pointerEvents="box-none"
													style={{
														alignSelf: "stretch",
														width: 15,
														marginTop: 1,
														marginBottom: 4,
													}}>
													<View
														pointerEvents="box-none"
														style={{
															position: "absolute",
															left: 0,
															top: 0,
															bottom: 0,
															justifyContent: "center",
														}}>
														<Image
															source={require("./../../assets/images/fill-1.png")}
															style={styles.fill1Image}/>
													</View>
													<View
														pointerEvents="box-none"
														style={{
															position: "absolute",
															left: 3,
															width: 9,
															top: 0,
															bottom: 2,
															alignItems: "flex-start",
														}}>
														<Image
															source={require("./../../assets/images/group-4-2.png")}
															style={styles.group4TwoImage}/>
														<View
															style={{
																flex: 1,
															}}/>
														<View
															style={styles.line8View}/>
													</View>
												</View>
												<View
													style={{
														flex: 1,
													}}/>
												<Text
													style={styles.shoppingCartText}>Shopping{"\n"}Cart</Text>
											</View>
										</View>
									</View>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.rm62Text}>RM62</Text>
								</View>
							</View>
						</View>
						<TouchableOpacity
							onPress={this.onCheckoutPressed}
							style={styles.checkoutButton}>
							<Text
								style={styles.checkoutButtonText}>Checkout</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	page1View: {
		backgroundColor: "rgb(243, 243, 243)",
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
	rightButtonImage: {
		resizeMode: "contain",
	},
	rightButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	circleImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
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
	leftButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	dotImage: {
		backgroundColor: "transparent",
		resizeMode: "contain",
		width: null,
		height: 6,
		marginLeft: 13,
		marginRight: 12,
	},
	branchView: {
		backgroundColor: "white",
		shadowColor: "rgba(198, 192, 192, 0.5)",
		shadowRadius: 5,
		shadowOpacity: 1,
		height: 58,
		flexDirection: "row",
	},
	branchTwoView: {
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 105,
		height: 44,
		marginLeft: 25,
		marginTop: 10,
		alignItems: "flex-start",
	},
	branchText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		flex: 1,
		marginRight: 13,
	},
	group4Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 13,
		height: 12,
		marginTop: 3,
	},
	distanceText: {
		backgroundColor: "transparent",
		color: "rgb(188, 181, 181)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	pickUpDeliveryView: {
		backgroundColor: "transparent",
		width: 92,
		height: 33,
	},
	deliveryText: {
		backgroundColor: "transparent",
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 4,
	},
	switchImage: {
		backgroundColor: "transparent",
		opacity: 0.34,
		resizeMode: "center",
		width: null,
		height: 33,
	},
	pickUpView: {
		backgroundColor: "rgba(42, 41, 41, 0.89)",
		borderRadius: 15.5,
		width: 52,
		height: 31,
		marginLeft: 1,
		justifyContent: "center",
	},
	pickUpText: {
		color: "rgb(253, 253, 253)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 10,
		marginRight: 10,
	},
	moreView: {
		backgroundColor: "transparent",
		width: 29,
		height: 11,
		marginRight: 5,
		flexDirection: "row",
		alignItems: "center",
	},
	moreText: {
		backgroundColor: "transparent",
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		flex: 1,
		marginRight: 4,
	},
	morearrowImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 6,
		height: 5,
	},
	menucategoryFlatList: {
		backgroundColor: "transparent",
		width: "100%",
		height: "100%",
	},
	menucategoryFlatListViewWrapper: {
		alignSelf: "flex-start",
		width: 91,
		height: 488,
	},
	menuFlatList: {
		backgroundColor: "rgb(255, 254, 254)",
		width: "100%",
		height: "100%",
	},
	menuFlatListViewWrapper: {
		flex: 1,
		marginTop: 1,
	},
	cartView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: 59,
	},
	totalAmountView: {
		backgroundColor: "transparent",
		width: 280,
		height: 59,
	},
	rectangleView: {
		backgroundColor: "rgb(231, 230, 230)",
		position: "absolute",
		left: 0,
		right: 0,
		top: 10,
		height: 49,
	},
	shopppingCartTotalView: {
		backgroundColor: "transparent",
		width: 102,
		height: 50,
	},
	rectangleTwoView: {
		backgroundColor: "white",
		borderRadius: 22.5,
		position: "absolute",
		left: 0,
		right: 0,
		top: 5,
		height: 45,
	},
	tiny2View: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "white",
		borderStyle: "solid",
		width: 16,
		height: 16,
		justifyContent: "center",
	},
	textText: {
		color: "rgb(255, 251, 251)",
		fontFamily: "Helvetica-Bold",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 5,
		marginRight: 4,
	},
	group5View: {
		backgroundColor: "transparent",
		alignSelf: "stretch",
		height: 26,
		marginRight: 9,
		flexDirection: "row",
		alignItems: "center",
	},
	fill1Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 15,
		height: 16,
	},
	group4TwoImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 8,
		height: 8,
	},
	line8View: {
		backgroundColor: "rgb(85, 85, 85)",
		width: 9,
		height: 1,
	},
	shoppingCartText: {
		color: "rgb(57, 57, 57)",
		fontFamily: "Helvetica-Bold",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	rm62Text: {
		color: "rgb(57, 57, 57)",
		fontFamily: "Helvetica-Bold",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 27,
	},
	checkoutButton: {
		backgroundColor: "rgb(0, 178, 227)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		right: 0,
		width: 95,
		top: 10,
		height: 49,
	},
	checkoutButtonImage: {
		resizeMode: "contain",
		marginRight: 10,
	},
	checkoutButtonText: {
		color: "white",
		fontFamily: "Helvetica-Bold",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
})
