//
//  PickUp
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native"
import React from "react"
import {alpha, fontAlpha} from "../common/size";

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
			tabBarIcon: ({ iconTintColor, focused }) => {
				const image = focused 
				? require('./../../assets/images/pickup_selected.png') 
				: require('./../../assets/images/pickup.png')

				return <Image
					source={image}
					style={{resizeMode: "contain", width: 30 * alpha, height: 30 * alpha }}/>
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

	}

	render() {
	
		return <View
				style={styles.iphone8Copy2View}>
				<View
					style={styles.noOrderView}>
					<View
						style={styles.viewView}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								alignSelf: "center",
								top: 0 * alpha,
								bottom: 0 * alpha,
								justifyContent: "center",
							}}>
							<View
								style={styles.centerView}>
								<Image
									source={require("./../../assets/images/brew9-doodle-09-3.png")}
									style={styles.logoImage}/>
								<View
									style={styles.messageView}>
									<Text
										style={styles.youHavenTMakeAnyText}>You haven’t make any order yet.</Text>
									<Text
										style={styles.grabYoursNowText}>Grab yours now!</Text>
								</View>
							</View>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								alignSelf: "center",
								width: 185 * alpha,
								bottom: 23 * alpha,
								height: 72 * alpha,
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
	noOrderView: {
		backgroundColor: "white",
		borderRadius: 13 * alpha,
		flex: 1,
		marginLeft: 24 * alpha,
		marginRight: 24 * alpha,
		marginTop: 70 * alpha,
		marginBottom: 70 * alpha,
		alignItems: "center",
	},
	viewView: {
		backgroundColor: "transparent",
		flex: 1,
		width: 185 * alpha,
	},
	centerView: {
		backgroundColor: "transparent",
		width: 181 * alpha,
		height: 140 * alpha,
		alignItems: "center",
	},
	logoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 65 * alpha,
		height: 89 * alpha,
	},
	messageView: {
		backgroundColor: "transparent",
		width: 180 * alpha,
		height: 35 * alpha,
		marginTop: 16 * alpha,
		alignItems: "center",
	},
	youHavenTMakeAnyText: {
		color: "rgb(134, 134, 134)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	grabYoursNowText: {
		backgroundColor: "transparent",
		color: "rgb(134, 134, 134)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginTop: 7 * alpha,
	},
	orderButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 185 * alpha,
		height: 33 * alpha,
		marginBottom: 23 * alpha,
	},
	orderButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	orderButtonText: {
		color: "rgb(254, 254, 254)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
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
		width: 113 * alpha,
		height: 16 * alpha,
	},
	orderHistoryButtonText: {
		color: "rgb(176, 176, 176)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	orderHistoryButtonImage: {
		resizeMode: "contain",
		marginLeft: 10 * alpha,
	},
})