//
//  PickUp
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { StyleSheet, View, Image, TouchableOpacity, Text, Linking, ActivityIndicator } from "react-native"
import React from "react"
import {alpha, fontAlpha, windowWidth} from "../Common/size";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from 'react-redux'
import GetCurrentOrderRequestObject from '../Requests/get_current_order_request_object'
import { createAction } from '../Utils/index'
import openMap from 'react-native-open-maps';
@connect(({ members, shops }) => ({
	currentMember: members.profile,
	company_id: members.company_id,
	location: members.location,
	selectedShop: shops.selectedShop
}))
export default class PickUp extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "PickUp",
            headerTintColor: "black",          
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
		this.state = {
			loading: true,
			current_order: [],
		}
	}

	componentDidMount() {
		this.loadCurrentOrder()
	}

	onOrderHistoryPressed = () => {

		const { navigate } = this.props.navigation
		const { currentMember } = this.props
		if (currentMember !== null) {
			navigate("OrderHistory")
		}
	}

	onCallPressed = (phone_no) => {
		Linking.openURL(`tel:${phone_no}`)
	}

	onOrderPressed = () => {
		const { navigate } = this.props.navigation

		navigate("Home")
	}

	loadCurrentOrder(){
		const { dispatch, currentMember } = this.props

		if (currentMember != null){
			this.setState({ loading: true })
			const callback = eventObject => {
				if (eventObject.success) {
					this.setState({
						current_order: eventObject.result
					})
				}
				this.setState({
					loading: false,
				})
			}
			const obj = new GetCurrentOrderRequestObject()
			obj.setUrlId(currentMember.id)
			dispatch(
				createAction('members/loadCurrentOrder')({
					object:obj,
					callback,
				})
			)
		}
	}

	renderQueueView(current_order) {

		const queues = current_order.map((item, key) => {

			const order_items = item.order_items.map((item, key) => {

				if (item.variations != null && item.variations != "") {
					return <View
						style={styles.drinksView}
						key={key}>
						<Text
							style={styles.mochaText}>{item.product_name}</Text>
						<View
							pointerEvents="box-none"
							style={{
								height: 37 * alpha,
								marginTop: 2 * alpha,
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							<Text
								style={styles.noStrawNormalSugText}>{item.variations}</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.x1Text}>x{item.quantity}</Text>
							<Text
								style={styles.rm11Text}>${item.total_price}</Text>
						</View>
						<Image
							source={require("./../../assets/images/group-109-copy.png")}
							style={styles.dottedLineImage}/>
					</View>
				} else {
					return <View
					style={styles.drinksTwoView}
					key={key}>
					<Text
						style={styles.mochaTwoText}>{item.product_name}</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.x1TwoText}>x{item.quantity}</Text>
					<Text
						style={styles.rm11TwoText}>${item.total_price}</Text>
				</View>
				}
				
			})

			const voucher_items = item.voucher_items.map((item, key) => {

				return <View
					style={styles.voucherView}
					key={key}>
					<Text
						style={styles.nameFourText}>{item.voucher.name}</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.descriptionThreeText}>{ item.voucher.discount_price ? `-$${item.voucher.discount_price}` : ""}</Text>
				</View>
			})

			return <View
				style={styles.pickUpQueueView}
				key={key}>
				<View
					pointerEvents="box-none"
					style={{
						alignSelf: "flex-start",
						width: 193 * alpha,
						height: 29 * alpha,
						marginLeft: 19 * alpha,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					{/* <TouchableOpacity
						onPress={this.onCustomerServicePressed}
						style={styles.customerServiceButton}>
						<Image
							source={require("./../../assets/images/group-8-22.png")}
							style={styles.customerServiceButtonImage}/>
						<Text
							style={styles.customerServiceButtonText}>Customer {"\n"}Service</Text>
					</TouchableOpacity> */}
					{/* <TouchableOpacity
						onPress={this.onSaySomethingPressed}
						style={styles.saySomethingButton}>
						<Image
							source={require("./../../assets/images/group-9-12.png")}
							style={styles.saySomethingButtonImage}/>
						<Text
							style={styles.saySomethingButtonText}>Say{"\n"}Something</Text>
					</TouchableOpacity> */}
				</View>
				<View
					style={styles.queueView}>
					<View
						pointerEvents="box-none"
						style={{
							alignSelf: "flex-end",
							width: 102 * alpha,
							height: 52 * alpha,
							marginRight: 111 * alpha,
							marginTop: 19 * alpha,
						}}>
						<Text
							style={styles.queuenumberText}>{item.queue_no}</Text>
						<Text
							style={styles.queueheaderText}>Queue Number</Text>
					</View>
					<View
						style={styles.progressView}>
						<View
							pointerEvents="box-none"
							style={{
								left: 0 * alpha,
								right: 0 * alpha,
								top: 0 * alpha,
								bottom: 0 * alpha,
								justifyContent: "center",
							}}>
							<View
								pointerEvents="box-none"
								style={{
									height: 50 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<View
									style={styles.orderedView}>
									<Image
										source={require("./../../assets/images/group-9-copy-13.png")}
										style={item.status === "pending" ? styles.orderedSelectedImage : styles.orderedImage}/>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={item.status === "pending" ? styles.orderedSelectedText : styles.orderedText}>Ordered</Text>
								</View>
								<Image
									source={require("./../../assets/images/group-11-copy-5.png")}
									style={styles.dividerImage}/>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.pickUpView}>
									<Image
										source={require("./../../assets/images/group-7-copy-8.png")}
										style={item.status === "completed" ? styles.pickupSelectedImage  : styles.pickupImage}/>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={item.status === "completed" ? styles.pickUpSelectedText : styles.pickUpText}>Pick Up</Text>
								</View>
							</View>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								right: 0 * alpha,
								top: 0 * alpha,
								bottom: 0 * alpha,
								justifyContent: "center",
							}}>
							<View
								pointerEvents="box-none"
								style={{
									width: 87 * alpha,
									height: 50 * alpha,
									marginRight: 54 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<View
									style={styles.processingView}>
									<Image
										source={require("./../../assets/images/group-13-11.png")}
										style={item.status === "processing" ? styles.processingSelectedImage : styles.processingImage}/>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={item.status === "processing" ? styles.processingSelectedText : styles.processingText}>Processing</Text>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<Image
									source={require("./../../assets/images/group-11-copy-5.png")}
									style={styles.dividerTwoImage}/>
							</View>
						</View>
					</View>
					{/* <View
						style={styles.waitingView}>
						<Text
							style={styles.queuelengthText}>14</Text>
					</View> */}
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.messageText}>Notification will be sent when your drinks are ready</Text>
				</View>
				<View
					style={styles.orderDetailView}>
					<View
						style={styles.branchDirectionView}>
						<Image
							source={require("./../../assets/images/top-fill.png")}
							style={styles.topFillImage}/>
						<View
							pointerEvents="box-none"
							style={{
								flex: 1,
								justifyContent: "center",
							}}>
							<View
								pointerEvents="box-none"
								style={{
									height: 50 * alpha,
									marginLeft: 25 * alpha,
									marginRight: 5 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<View
									style={styles.branchAddressView}>
									<Text
										style={styles.shopNameText}>{item.shop.name}</Text>
									<View
										pointerEvents="box-none"
										style={{
											flex: 1,
											marginTop: 2 * alpha,
										}}>
										<Text
											numberOfLines={2}
											style={styles.addressText}>{item.shop.address}</Text>
										<Text
											style={styles.phoneText}>{item.shop.phone_no}</Text>
									</View>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<TouchableOpacity
									onPress={() => this.onCallPressed(item.shop.phone_no)}
									style={styles.callButton}>
									<Image
										source={require("./../../assets/images/group-6-23.png")}
										style={styles.callButtonImage}/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => this.onDirectionPressed(item.shop)}
									style={styles.directionButton}>
									<Image
										source={require("./../../assets/images/group-3-30.png")}
										style={styles.directionButtonImage}/>
								</TouchableOpacity>
							</View>
							<View
							style={styles.lineView}/>
						</View>
						
					</View>
					<View
						pointerEvents="box-none"
						style={{
							flex: 1,
						}}>
						<View
							style={styles.cartView}>
							
							{order_items}
							{voucher_items}
						</View>
					</View>
					<View
						style={styles.remarkView}>
						<Image
							source={require("./../../assets/images/bottom-fill.png")}
							style={styles.bottomFillImage}/>
							<View
								style={styles.lineTwoView}/>
						<View
							pointerEvents="box-none"
							style={{
								left: 22 * alpha,
								right: 21 * alpha,
								top: 11 * alpha,
								bottom: 11 * alpha,
								alignItems: "flex-start",
							}}>
							
							<Text
								style={styles.pleaseCallBranchFText}>Please call branch for refund</Text>
							<View
								pointerEvents="box-none"
								style={{
									alignSelf: "stretch", 
									height: 19 * alpha,
									marginLeft: 3 * alpha,
									marginRight: 4 * alpha,
									flexDirection: "row",
									alignItems: "flex-start",
								}}>
								<Text
									style={styles.orderTime100717Text}>Order time: {item.payment_time}</Text>
								<View
									style={{
										flex: 1,
									}}/>
								{/* <TouchableOpacity
									onPress={this.onCopyPressed}
									style={styles.copyButton}>
									<Text
										style={styles.copyButtonText}>Copy</Text>
								</TouchableOpacity> */}
							</View>
							<Text
								style={styles.orderNo020028201Text}>Order no.: {item.receipt_no}</Text>
							<Text
								style={styles.remarkNoPackingText}>Remark:</Text>
						</View>
					</View>
				</View>
			</View>
		})

		return <ScrollView style={{flex: 1}}>
			{queues}
		</ScrollView>
	}

	onDirectionPressed(shop) {

		let latitude = shop ? parseFloat(shop.latitude) : 0.0
		let longitude = shop ? parseFloat(shop.longitude) : 0.0

		openMap({ latitude: latitude, longitude: longitude });
	}

	renderEmpty() {
		return <View style={styles.orderView}>
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
	render() {
		
		const { current_order } = this.state
		return <View
				style={styles.pickUpMainView}>
				{ this.state.loading ? <View style={[styles.loadingIndicator]}><ActivityIndicator size="large" /></View>  : current_order.length > 0 ? this.renderQueueView(current_order) : this.renderEmpty() }
			</View>
	}
}

const styles = StyleSheet.create({
	pickUpMainView: {
		backgroundColor: "rgb(239, 239, 239)",
		flex: 1,
	},
	orderView: {
		backgroundColor: "rgb(239, 239, 239)",
		width: "100%",
		height: "100%"
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
<<<<<<< HEAD
<<<<<<< HEAD
		fontFamily: "ClanPro-Book",
=======
		fontFamily: "SFProText-Medium",
>>>>>>> 2c9887aa617ddb429c23e3c5dc84611740205d91
=======
		fontFamily: "SFProText-Medium",
>>>>>>> 2c9887aa617ddb429c23e3c5dc84611740205d91
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	grabYoursNowText: {
		backgroundColor: "transparent",
		color: "rgb(134, 134, 134)",
<<<<<<< HEAD
<<<<<<< HEAD
		fontFamily: "ClanPro-Book",
=======
		fontFamily: "SFProText-Medium",
>>>>>>> 2c9887aa617ddb429c23e3c5dc84611740205d91
=======
		fontFamily: "SFProText-Medium",
>>>>>>> 2c9887aa617ddb429c23e3c5dc84611740205d91
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
<<<<<<< HEAD
<<<<<<< HEAD
		fontFamily: "ClanPro-Book",
=======
		fontFamily: "SFProText-Medium",
>>>>>>> 2c9887aa617ddb429c23e3c5dc84611740205d91
=======
		fontFamily: "SFProText-Medium",
>>>>>>> 2c9887aa617ddb429c23e3c5dc84611740205d91
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
<<<<<<< HEAD
<<<<<<< HEAD
		fontFamily: "ClanPro-Book",
=======
		fontFamily: "SFProText-Medium",
>>>>>>> 2c9887aa617ddb429c23e3c5dc84611740205d91
=======
		fontFamily: "SFProText-Medium",
>>>>>>> 2c9887aa617ddb429c23e3c5dc84611740205d91
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	orderHistoryButtonImage: {
		resizeMode: "contain",
		marginLeft: 10 * alpha,
	},
	loadingIndicator:{
		marginTop:100 * alpha,
	},







	pickUpQueueView: {
		backgroundColor: "rgb(239, 239, 239)",
		flex: 1,
	},
	customerServiceButton: {
		backgroundColor: "rgb(251, 251, 251)",
		borderRadius: 14.5 * alpha,
		shadowColor: "rgba(240, 240, 240, 0.5)",
		shadowRadius: 1,
		shadowOpacity: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 96 * alpha,
		height: 29 * alpha,
	},
	customerServiceButtonText: {
		color: "rgb(51, 51, 51)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	customerServiceButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	saySomethingButton: {
		backgroundColor: "rgb(251, 251, 251)",
		borderRadius: 14.5,
		shadowColor: "rgba(240, 240, 240, 0.5)",
		shadowRadius: 1,
		shadowOpacity: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 96 * alpha,
		height: 29 * alpha,
		marginLeft: 1 * alpha,
	},
	saySomethingButtonText: {
		color: "rgb(51, 51, 51)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	saySomethingButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	queueView: {
		backgroundColor: "rgb(253, 253, 253)",
		borderTopRightRadius: 14 * alpha,
		borderTopLeftRadius: 14 * alpha,
		height: 228 * alpha,
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
		marginTop: 16 * alpha,
		alignItems: "center",
	},
	queuenumberText: {
		backgroundColor: "transparent",
		color: "rgb(50, 50, 50)",
		fontFamily: "DINPro-Medium",
		fontSize: 26 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		position: "absolute",
		right: 24 * alpha,
		top: 18 * alpha,
	},
	queueheaderText: {
		color: "rgb(50, 50, 50)",
		fontFamily: "DINPro-Medium",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		right: 0 * alpha,
		top: 0 * alpha,
	},
	progressView: {
		backgroundColor: "transparent",
		width: 220 * alpha,
		height: 53 * alpha,
		marginTop: 20 * alpha,
	},
	orderedView: {
		backgroundColor: "transparent",
		width: 48 * alpha,
		height: 50 * alpha,
	},
	orderedImage: {
		tintColor: "rgb(205, 207, 208)",
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 26 * alpha,
		marginLeft: 14 * alpha,
		marginRight: 11 * alpha,
	},
	orderedSelectedImage: {
		tintColor: "rgb(35, 31, 32)",
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 26 * alpha,
		marginLeft: 14 * alpha,
		marginRight: 11 * alpha,
	},
	orderedText: {
		color: "rgb(205, 207, 208)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	orderedSelectedText: {
		color: "rgb(35, 31, 32)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	dividerImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 22 * alpha,
		height: 4 * alpha,
		marginLeft: 9 * alpha,
	},
	pickUpView: {
		backgroundColor: "transparent",
		width: 45 * alpha,
		height: 49 * alpha,
	},
	pickupImage: {
		tintColor: "rgb(205, 207, 208)",
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 25 * alpha,
		marginLeft: 9 * alpha,
		marginRight: 10 * alpha,
	},
	pickupSelectedImage: {
		tintColor: "rgb(35, 31, 32)",
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 25 * alpha,
		marginLeft: 9 * alpha,
		marginRight: 10 * alpha,
	},
	pickUpText: {
		color: "rgb(205, 207, 208)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	pickUpSelectedText: {
		color: "rgb(35, 31, 32)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	processingView: {
		backgroundColor: "transparent",
		width: 65 * alpha,
		height: 50 * alpha,
	},
	processingImage: {
		tintColor: "rgb(205, 207, 208)",
		resizeMode: "contain",
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 27 * alpha,
		height: 26 * alpha,
	},
	processingSelectedImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 27 * alpha,
		height: 26 * alpha,
	},
	processingText: {
		color: "rgb(205, 207, 208)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	processingSelectedText: {
		color: "rgb(35, 31, 32)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	dividerTwoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 22 * alpha,
		height: 4 * alpha,
	},
	waitingView: {
		backgroundColor: "rgb(241, 241, 241)",
		borderRadius: 15 * alpha,
		width: 137 * alpha,
		height: 30 * alpha,
		marginTop: 9 * alpha,
		justifyContent: "center",
		alignItems: "center",
	},
	queuelengthText: {
		color: "rgb(136, 136, 136)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	messageText: {
		color: "rgb(136, 136, 136)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginBottom: 14 * alpha,
	},
	orderDetailView: {
		backgroundColor: "transparent",
		flex: 1,
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
		marginTop: 5 * alpha,
		marginBottom: 10 * alpha,
	},
	branchDirectionView: {
		backgroundColor: "transparent",
		left: 0 * alpha,
		right: 2 * alpha,
		top: 0 * alpha,
		height: 90 * alpha,
	},
	topFillImage: {
		resizeMode: "cover",
		position: "absolute",
		width: windowWidth-40*alpha,
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 90 * alpha,
	},
	branchAddressView: {
		backgroundColor: "transparent",
		width: 200 * alpha,
		height: 50 * alpha,
	},
	shopNameText: {
		color: "rgb(63, 63, 63)",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 35 * alpha,
	},
	addressText: {
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		flex: 1,
	},
	phoneText: {
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		left: 1 * alpha,
		bottom: 0 * alpha,
	},
	callButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	callButton: {
		backgroundColor: "transparent",
		borderRadius: 18 * alpha,
		borderWidth: 1 * alpha,
		borderColor: "rgb(149, 149, 149)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 36 * alpha,
		height: 36 * alpha,
		marginRight: 15 * alpha,
	},
	callButtonImage: {
		resizeMode: "contain",
	},
	directionButton: {
		backgroundColor: "transparent",
		borderRadius: 18 * alpha,
		borderWidth: 1 * alpha,
		borderColor: "rgb(149, 149, 149)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 36 * alpha,
		height: 36 * alpha,
	},
	directionButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	directionButtonImage: {
		resizeMode: "contain",
	},
	lineView: {
		backgroundColor: "rgb(231, 231, 231)",
		height: 2 * alpha,
		width: windowWidth - 80 *alpha,
		marginTop: 26 * alpha,
		alignSelf: "center",
	},
	lineTwoView: {
		backgroundColor: "rgb(231, 231, 231)",	
		width: windowWidth - 80 *alpha,
		height: 2* alpha,
		alignSelf: "center",
	},
	cartView: {
		backgroundColor: "rgb(245, 245, 245)",
		flex: 1,
		marginTop: -1 * alpha,
	},
	drinksView: {
		backgroundColor: "transparent",
		height: 84 * alpha,
		marginLeft: 25 * alpha,
		marginRight: 24 * alpha,
		marginTop: 10 * alpha,
	},
	mochaText: {
		backgroundColor: "transparent",
		color: "rgb(63, 63, 63)",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		alignSelf: "flex-start",
	},
	noStrawNormalSugText: {
		backgroundColor: "transparent",
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 191 * alpha,
		marginTop: 6 * alpha,
	},
	x1Text: {
		backgroundColor: "transparent",
		color: "rgb(50, 50, 50)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginRight: 16 * alpha,
	},
	rm11Text: {
		backgroundColor: "transparent",
		color: "rgb(50, 50, 50)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	dottedLineImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: 280*alpha,
		height: 2 * alpha,
		marginTop: 22 * alpha,
	},
	totalView: {
		backgroundColor: "transparent",
		height: 21 * alpha,
		marginLeft: 25 * alpha,
		marginRight: 24 * alpha,
		marginTop: 26 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	totalText: {
		backgroundColor: "transparent",
		color: "rgb(63, 63, 63)",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	rm1100Text: {
		backgroundColor: "transparent",
		color: "rgb(50, 50, 50)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		alignSelf: "flex-start",
		marginTop: 4 * alpha,
	},
	remarkView: {
		backgroundColor: "transparent",
		flex: 1,
		marginTop: -1,
		height: 116 * alpha,
		paddingBottom: 10 * alpha,
	},
	bottomFillImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		position: "absolute",
		alignSelf: "center",
		width: 334 * alpha,
		top: 0 * alpha,
		height: 116 * alpha,
	},

	pleaseCallBranchFText: {
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 3 * alpha,
		marginTop: 21 * alpha,
	},
	orderTime100717Text: {
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 2 * alpha,
	},
	copyButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	copyButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 27 * alpha,
		height: 16 * alpha,
	},
	copyButtonText: {
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	orderNo020028201Text: {
		backgroundColor: "transparent",
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginLeft: 3 * alpha,
		marginTop: 1 * alpha,
	},
	remarkNoPackingText: {
		backgroundColor: "transparent",
		color: "rgb(164, 164, 164)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginLeft: 3 * alpha,
	},
	drinksTwoView: {
		backgroundColor: "transparent",
		height: 61 * alpha,
		marginLeft: 25 * alpha,
		marginRight: 24 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	mochaTwoText: {
		color: "rgb(63, 63, 63)",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 20 * alpha,
	},
	x1TwoText: {
		color: "rgb(50, 50, 50)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginRight: 16 * alpha,
		marginTop: 24 * alpha,
	},
	rm11TwoText: {
		color: "rgb(50, 50, 50)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 24 * alpha,
	},

	voucherView: {
		backgroundColor: "transparent",
		height: 18 * alpha,
		marginLeft: 26 * alpha,
		marginRight: 25 * alpha,
		marginBottom: 10 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	nameFourText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Bold",
		fontSize: 12* fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	descriptionThreeText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
	},
})