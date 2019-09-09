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
import { connect } from 'react-redux';
import { createAction } from '../Utils/index'
import ProductCell from "./ProductCell"
import CategoryCell from "./CategoryCell"
import { alpha, fontAlpha } from "../common/size";

@connect()
export default class Home extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			headerTintColor: "black",
			headerLeft: <View
				style={styles.headerLeftContainer}>
				<TouchableOpacity
					onPress={params.onLogoPressed ? params.onLogoPressed : () => null}
					style={styles.navigationBarItem}>
					<Image
						source={require("./../../assets/images/logo.png")}
						style={styles.navigationBarItemIcon}/>
				</TouchableOpacity>
			</View>,
			headerRight: null,
			headerStyle: {
			},
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

	onCheckoutPressed = () => {
		const { navigate } = this.props.navigation

		navigate("Checkout")
	}

	categorylistFlatListMockData = [{
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

	renderCategorylistFlatListCell = ({ item }) => {

		return <CategoryCell
			navigation={this.props.navigation}/>
	}

	productlistFlatListMockData = [{
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

	renderProductlistFlatListCell = ({ item }) => {

		return <ProductCell
			navigation={this.props.navigation}/>
	}

	render() {

		return <View
			style={styles.page1View}>
			<View
				style={styles.topsectionView}>
				<View
					pointerEvents="box-none"
					style={{
						height: 31 * alpha,
						marginLeft: 14 * alpha,
						marginRight: 14 * alpha,
						marginTop: 4 * alpha,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					<View
						style={styles.branchView}>
						<TouchableOpacity
							onPress={this.onBranchPressed}
							style={styles.branchButton}>
							<Text
								style={styles.branchButtonText}>Branch</Text>
							<Image
								source={require("./../../assets/images/group-22.png")}
								style={styles.branchButtonImage}/>
						</TouchableOpacity>
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
								left: 0,
								right: 0,
								top: 0,
								bottom: 0,
								justifyContent: "center",
							}}>
							<Image
								source={require("./../../assets/images/rectangle-3.png")}
								style={styles.rectangleImage}/>
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
							<View
								pointerEvents="box-none"
								style={{
									height: 29 * alpha,
									marginLeft: 1 * alpha,
									marginRight: 4 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<View
									style={styles.pickUpView}>
									<Text
										style={styles.pickUpText}>Pick Up</Text>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.deliveryText}>Delivery</Text>
							</View>
						</View>
					</View>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						height: 14 * alpha,
						marginLeft: 14 * alpha,
						marginRight: 19 * alpha,
						marginTop: 7 * alpha,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.distance1kmText}>Distance 1km</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<View
						style={styles.moreView}>
						<TouchableOpacity
							onPress={this.onMorePressed}
							style={styles.moreButton}>
							<Text
								style={styles.moreButtonText}>More</Text>
						</TouchableOpacity>
						<Image
							source={require("./../../assets/images/bitmap-14.png")}
							style={styles.bitmapImage}/>
					</View>
				</View>
			</View>
			<View
				style={styles.productsectionView}>
				<View
					style={styles.categorylistFlatListViewWrapper}>
					<FlatList
						renderItem={this.renderCategorylistFlatListCell}
						data={this.categorylistFlatListMockData}
						style={styles.categorylistFlatList}/>
				</View>
				<View
					style={{
						flex: 1,
					}}/>
				<View
					style={styles.productlistFlatListViewWrapper}>
					<FlatList
						renderItem={this.renderProductlistFlatListCell}
						data={this.productlistFlatListMockData}
						style={styles.productlistFlatList}/>
				</View>
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	navigationBarItem: {
	},
	navigationBarItemIcon: {
		tintColor: "rgb(0, 194, 236)",
	},
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
	},
	page1View: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	topsectionView: {
		backgroundColor: "white",
		shadowColor: "rgba(198, 192, 192, 0.5)",
		shadowRadius: 5 * alpha,
		shadowOpacity: 1 * alpha,
		position: "absolute",
		left: 0,
		right: 0,
		height: 67 * alpha,
	},
	branchView: {
		backgroundColor: "transparent",
		width: 64 * alpha,
		height: 19 * alpha,
		marginTop: 6 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	branchButtonImage: {
		resizeMode: "contain",
		marginLeft: 10 * alpha,
	},
	branchButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 73 * alpha,
		height: 19 * alpha,
		marginTop: 6 * alpha,
	},
	branchButtonText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	groupImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		flex: 1,
		height: 10 * alpha,
		marginLeft: 6 * alpha,
	},
	pickUpDeliveryView: {
		backgroundColor: "transparent",
		width: 96 * alpha,
		height: 31 * alpha,
	},
	rectangleImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		opacity: 0.34,
		width: null,
		height: 31 * alpha,
	},
	pickUpView: {
		backgroundColor: "rgba(42, 41, 41, 0.89)",
		borderRadius: 14.5 * alpha,
		width: 49 * alpha,
		height: 29 * alpha,
		justifyContent: "center",
	},
	pickUpText: {
		color: "rgb(253, 253, 253)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 7 * alpha,
		marginRight: 7 * alpha,
	},
	deliveryText: {
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	distance1kmText: {
		backgroundColor: "transparent",
		color: "rgb(188, 181, 181)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	moreView: {
		backgroundColor: "transparent",
		width: 32 * alpha,
		height: 12 * alpha,
		marginTop: 1 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	moreButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		flex: 1,
		height: 12 * alpha,
		marginRight: 2 * alpha,
	},
	moreButtonText: {
		color: "rgb(162, 162, 162)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	moreButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	downArrowImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 8 * alpha,
		height: 4 * alpha,
	},
	productsectionView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 67 * alpha,
		bottom: 0,
		flexDirection: "row",
	},
	categorylistFlatList: {
		backgroundColor: "transparent",
		width: "100%",
		height: "100%",
	},
	categorylistFlatListViewWrapper: {
		width: 90 * alpha,
	},
	productlistFlatList: {
		backgroundColor: "white",
		width: "100%",
		height: "100%",
	},
	productlistFlatListViewWrapper: {
		width: 285 * alpha,
		marginBottom: 1 * alpha,
	},
})


