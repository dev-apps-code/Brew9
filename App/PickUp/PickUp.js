//
//  PickUp
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native"
import React from "react"


export default class PickUp extends React.Component {

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
				tabBarLabel: "Pickup",
				tabBarIcon: ({ iconTintColor }) => {
				
					return <Image
							source={require("./../../assets/images/group-41-2.png")}/>
				},
			}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onOrderHistoryPressed = () => {
	
		const { navigate } = this.props.navigation
		
		navigate("OrderHistory")
	}

	onOrderPressed = () => {
	
		const { navigate } = this.props.navigation
		
		navigate("Home")
	}

	render() {
	
		return <View
				style={styles.iphone8Copy2View}>
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
									source={require("./../../assets/images/right-13.png")}
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
							left: 0,
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
									source={require("./../../assets/images/left-13.png")}
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
						style={styles.noOrderView}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								alignSelf: "center",
								width: 185,
								bottom: 30,
								height: 54,
								justifyContent: "flex-end",
								alignItems: "center",
							}}>
							<TouchableOpacity
								onPress={this.onOrderPressed}
								style={styles.orderButton}>
								<Text
									style={styles.orderButtonText}>Order</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={this.onOrderHistoryPressed}
								style={styles.orderHistoryButton}>
								<Text
									style={styles.orderHistoryButtonText}>Order History</Text>
								<Image
									source={require("./../../assets/images/group-2.png")}
									style={styles.orderHistoryButtonImage}/>
							</TouchableOpacity>
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
								style={styles.infoView}>
								<Image
									source={require("./../../assets/images/brew9-doodle-09.png")}
									style={styles.cupImage}/>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.labelView}>
									<Text
										style={styles.youHavenTMakeAnyText}>You haven’t make any order yet.</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.grabYoursNowText}>Grab yours now!</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	iphone8Copy2View: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	menuView: {
		backgroundColor: "transparent",
		position: "absolute",
		right: 9,
		width: 82,
		top: 30,
		height: 32,
	},
	rightCircleView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
	},
	rightImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		opacity: 0.6,
		width: null,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	circleImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 16,
		marginLeft: 12,
		marginRight: 17,
	},
	leftDotView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
	},
	leftImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		opacity: 0.61,
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
	noOrderView: {
		backgroundColor: "white",
		borderRadius: 13,
		width: 327,
		height: 490,
	},
	orderButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 185,
		height: 33,
		marginBottom: 7,
	},
	orderButtonImage: {
		resizeMode: "contain",
		marginRight: 10,
	},
	orderButtonText: {
		color: "rgb(254, 254, 254)",
		fontFamily: "Helvetica",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	orderHistoryButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 90,
		height: 14,
	},
	orderHistoryButtonImage: {
		resizeMode: "contain",
		marginLeft: 5,
	},
	orderHistoryButtonText: {
		color: "rgb(176, 176, 176)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	infoView: {
		backgroundColor: "transparent",
		width: 144,
		height: 117,
		marginRight: 88,
		alignItems: "flex-start",
	},
	cupImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 56,
		height: 76,
		marginLeft: 41,
	},
	labelView: {
		backgroundColor: "transparent",
		width: 168,
		height: 27,
	},
	youHavenTMakeAnyText: {
		color: "rgb(134, 134, 134)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 11,
		marginRight: 12,
	},
	grabYoursNowText: {
		color: "rgb(134, 134, 134)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		alignSelf: "center",
	},
})
