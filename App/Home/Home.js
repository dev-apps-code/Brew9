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
import ProductRequestObject from "../Requests/product_request_object.js";

@connect(({ members }) => ({
	member_id: members.member_id,
	member_point: members.member_point,
}))
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
				elevation: 0,
				shadowOpacity: 0
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
		this.state = {
			page: 1,
			total: 0,
			data: [],
			products:[],
			loading: true,
			isRefreshing: true,
		}
	}

	componentDidMount() {
		this.loadStorePushToken()
		this.loadStoreProducts()
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

	loadShops(){
		const { dispatch } = this.props

		this.setState({ loading: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
				loading: false,
				})
			}
		}
		const obj = new NearestShopRequestObject(latitude, longitude)
		obj.setUrlId(1) 
		dispatch(
			createAction('companies/loadShops')({
				object:obj,
				callback,
			}
		))
	}

	loadStoreProducts() {

		const { dispatch } = this.props
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					isRefreshing: false,
					loading: false,
					data: this.state.data.concat(eventObject.result),
					total: eventObject.total,
					page: this.state.page + 1,
				},function () {
					var items = []
					for(var index in this.state.data) {
						items = items.concat(this.state.data[index].products)
					}
					this.setState({
						products: this.state.products.concat(items)
					})
				}.bind(this))
			}
		}

		const obj = new ProductRequestObject()
		obj.setUrlId(1)
		dispatch(
			createAction('products/loadStoreProducts')({
				object: obj,
				callback
			})
		)
	}

	onRefresh() {
		this.setState({
			isRefreshing: true,
			data: [],
			products: [],
		})
		this.loadStoreProducts()
	}

	onCheckoutPressed = () => {
		const { navigate } = this.props.navigation

		navigate("Checkout")
	}

	renderCategorylistFlatListCell = ({ item }) => {

		var selected = false
		if(item.id == 1) {
			selected = true
		}
		return <CategoryCell
			navigation={this.props.navigation}
			categoryname={item.name}
			selected={selected}
		/>
	}

	renderProductlistFlatListCell = ({ item }) => {

		console.log(item.image.url)
		return <ProductCell
			navigation={this.props.navigation}
			productname={item.name}
			productprice={item.price}
			productimage={item.image.url}
			productdescription={item.description}
		/>
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
						data={this.state.data}
						style={styles.categorylistFlatList}
						keyExtractor={(item, index) => index.toString()}/>
				</View>
				<View
					style={{
						flex: 1,
					}}/>
				<View
					style={styles.productlistFlatListViewWrapper}>
					<FlatList
						renderItem={this.renderProductlistFlatListCell}
						data={this.state.products}
						style={styles.productlistFlatList}
						refreshing={this.state.isRefreshing}
						onRefresh={this.onRefresh.bind(this)}
						keyExtractor={(item, index) => index.toString()}/>
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
								left: 38,
								right: 13,
								top: 5,
								height: 45,
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							<View
								style={styles.shopppingCartView}>
								<View
									style={styles.group5View}>
									<View
										pointerEvents="box-none"
										style={{
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
												style={styles.group4Image}/>
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
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.totalpriceText}>RM20</Text>
						</View>
						<View
							style={styles.badgeView}>
							<Text
								style={styles.numberofitemText}>2</Text>
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
		width: 40 * alpha,
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
	cartView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: 61 * alpha,
	},
	totalAmountView: {
		backgroundColor: "transparent",
		width: 280 * alpha,
		height: 61 * alpha,
	},
	rectangleView: {
		backgroundColor: "rgb(231, 230, 230)",
		position: "absolute",
		left: 0,
		right: 0,
		top: 10 * alpha,
		height: 51 * alpha,
	},
	shopppingCartView: {
		backgroundColor: "white",
		borderRadius: 22.5 * alpha,
		width: 102 * alpha,
		height: 45 * alpha,
		justifyContent: "center",
	},
	group5View: {
		backgroundColor: "transparent",
		height: 26 * alpha,
		marginLeft: 15 * alpha,
		marginRight: 12 * alpha,
		flexDirection: "row",
	},
	fill1Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 15 * alpha,
		height: 16 * alpha,
	},
	group4Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 8 * alpha,
		height: 8 * alpha,
	},
	line8View: {
		backgroundColor: "rgb(85, 85, 85)",
		width: 9 * alpha,
		height: 1 * alpha,
	},
	shoppingCartText: {
		color: "rgb(57, 57, 57)",
		fontFamily: "Helvetica-Bold",
		fontSize: 11 * alpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		alignSelf: "center",
	},
	totalpriceText: {
		color: "rgb(57, 57, 57)",
		fontFamily: "Helvetica-Bold",
		fontSize: 18 * alpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 20 * alpha,
	},
	badgeView: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "white",
		borderStyle: "solid",
		position: "absolute",
		left: 123 * alpha,
		right: 137 * alpha,
		top: 0,
		height: 20 * alpha,
		justifyContent: "center",
	},
	numberofitemText: {
		color: "rgb(255, 251, 251)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 6 * alpha,
		marginRight: 6 * alpha,
	},
	checkoutButton: {
		backgroundColor: "rgb(0, 178, 227)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		right: 0,
		width: 95 * alpha,
		top: 10 * alpha,
		height: 51 * alpha,
	},
	checkoutButtonText: {
		color: "white",
		fontFamily: "Helvetica-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	checkoutButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
})


