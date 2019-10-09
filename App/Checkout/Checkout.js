//
//  Checkout
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { Alert, StyleSheet, View, TouchableOpacity, Image, Text, ScrollView } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import {connect} from "react-redux";
import Modal from "react-native-modal"
import PhoneInput from 'react-native-phone-input'
import Toast, {DURATION} from 'react-native-easy-toast'
import HudLoading from "../Components/HudLoading"
import ActivateAccountRequestObject from '../Requests/activate_account_request_object'
import LoginWithSmsRequestObject from "../Requests/login_with_sms_request_object"
import {createAction, Storage} from "../Utils"
import { commonStyles } from "../Common/common_style"

@connect(({ members,shops }) => ({
	currentMember: members.profile,
	members: members,
	selectedShop: shops.selectedShop
}))
export default class Checkout extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Checkout",
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
			shop: this.props.navigation.getParam("shop", null),
			delivery_options: 'pickup',
			cart_total: this.props.navigation.getParam("cart_total", 0.00)
		}
	}

	componentDidMount() {
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	onBranchButtonPressed = () => {

	}

	onLocationButtonPressed = () => {
		const { navigate } = this.props.navigation

		navigate("DirectionMap", {
			shop: this.state.shop
		})
	}

	onDeliveryButtonPressed = () => {
		this.setState({
			delivery_options: 'delivery'
		})
	}

	onPickUpButtonPressed = () => {
		this.setState({
			delivery_options: 'pickup'
		})
	}

	onAutoFillPressed = () => {

	}

	onVoucherButtonPressed = () => {
		const { navigate } = this.props.navigation

		navigate("CheckoutVoucher")
	}

	onPaymentButtonPressed = () => {
		
		
		// if not enough credit ...

		// if no phone no, ask to update
	}

	loadMakeOrder(){
		const { dispatch, selectedShop } = this.props

		const {cart} = this.state
		this.setState({ loading: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
				loading: false,
				})        
			}
		}
		const obj = new MakeOrderRequestObj(cart, voucher_item_ids)
		obj.setUrlId(selectedShop.id) 
		dispatch(
			createAction('shops/loadMakeOrder')({
				object:obj,
				callback,
			})
		)
	}

	onPayNowPressed = () => {
		const { navigate } = this.props.navigation
		const {cart_total} = this.state
		const {currentMember } = this.props

		if (currentMember) {
			if (cart_total < parseFloat(currentMember.credits).toFixed(2)){
				this.refs.toast.show("You do not have enough credit. Please top up at our counter");
				return
			}

			Alert.alert(
				'Confirmation',
				'Are you sure you want to confirm the order?',
				[
				  { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
				  {
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				  },
				  { text: 'OK', onPress: () => console.log('OK Pressed') },
				],
				{ cancelable: false }
			  );

			return
		} else {
			navigate("VerifyStack")
			return
		}

	
	}

	onClosePressed = () => {

		const {currentMember} = this.props
		const {cart_total }= this.state
		this.setState({ 
			loginModalVisible: false, 
			registerModalVisible: false, 
		})
		

		// navigate("Transaction", {
		// 	amount: cart_total
		// })
	}

	render() {

		let cart = this.props.navigation.getParam("cart", "")
		let cart_total_quantity = this.props.navigation.getParam("cart_total_quantity",0)
		
		let {cart_total} = this.state
		let {currentMember, selectedShop} = this.props

		let credits = (currentMember != undefined && currentMember.credits != undefined) ? parseFloat(currentMember.credits).toFixed(2) : 0
		const cart_items = cart.map((item, key) => {

			if (item.selected_variants) {

				let filtered = item.selected_variants.filter(function(el) { return el })
				let variant_array = filtered.map(a => a.value)

				return <View
					style={styles.itemView}
					key={key}>
					<View
						pointerEvents="box-none"
						style={{
							alignSelf: "flex-start",
							width: 257 * alpha,
							height: 49 * alpha,
							marginLeft: 16 * alpha,
							marginTop: 10 * alpha,
							alignItems: "flex-start",
						}}>
						<Text
							style={styles.nameText}>{item.name}</Text>
						<Text
							style={styles.variantText}>{variant_array.join(", ")}</Text>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.quantityText}>x{item.quantity}</Text>
					<Text
						style={styles.cartpriceText}>${parseFloat(item.price).toFixed(2)}</Text>
				</View>
			} else {
				return <View
					style={styles.itemTwoView}
					key={key}>
					<Text
						style={styles.nameTwoText}>{item.name}</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.quantityTwoText}>x{item.quantity}</Text>
					<Text
						style={styles.rm20TwoText}>${parseFloat(item.price).toFixed(2)}</Text>
				</View>
			}
		})

		return <View
			style={styles.checkoutView}>
			<ScrollView
				style={styles.scrollviewScrollView}>
				<View
					style={styles.branchView}>
					<View
						style={styles.branchTwoView}>
						<View
							pointerEvents="box-none"
							style={{
								height: 31 * alpha,
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							<View
								style={styles.branchThreeView}>
								<Text
									style={styles.branchText}>{this.state.shop ? this.state.shop.name : ""}</Text>
								<Image
									source={require("./../../assets/images/group-4-5.png")}
									style={styles.arrowImage2}/>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
								<TouchableOpacity onPress={this.onLocationButtonPressed}>
									<Image
										source={require("./../../assets/images/group-8-11.png")}
										style={styles.group8Image}/>
								</TouchableOpacity>
						</View>					
						<Text
							style={styles.distance1kmPleaseText}>Distance {selectedShop.distance} km
						</Text>
					</View>
				{/*	<View
						pointerEvents="box-none"
						style={{
							height: 54 * alpha,
							marginLeft: 15 * alpha,
							marginRight: 15 * alpha,
							marginTop: 23 * alpha,
							flexDirection: "row",
							alignItems: "flex-start",
						}}>
						<View
							style={this.state.delivery_options == 'pickup' ? styles.selfPickUpView_selected : styles.selfPickUpView}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 25 * alpha,
									right: 0 * alpha,
									bottom: 0 * alpha,
									height: 54 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Image
									source={require("./../../assets/images/pick-up-2.png")}
									style={this.state.delivery_options == 'pickup' ? styles.pickUpImage_selected : styles.pickUpImage}/>
								<Text
									style={this.state.delivery_options == 'pickup' ? styles.selfPickUpText_selected : styles.selfPickUpText}>Self Pick-up</Text>
								<View
									style={{
										flex: 1,
									}}/>
								{this.state.delivery_options == 'pickup' ? <Image
									source={require("./../../assets/images/fill-1-3.png")}
									style={styles.tabTwoImage}/> : null}
							</View>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									alignSelf: "center",
									top: 0 * alpha,
									bottom: 0 * alpha,
									justifyContent: "center",
								}}>
								<TouchableOpacity
									onPress={this.onPickUpButtonPressed}
									style={styles.pickupbuttonButton}>
									<Text
										style={styles.pickupbuttonButtonText}></Text>
								</TouchableOpacity>
							</View>
						</View>


						<View
							style={{
								flex: 1,
							}}/>

						<View
							style={this.state.delivery_options == 'delivery' ? styles.deliveryView_selected : styles.deliveryView}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 36 * alpha,
									right: 0 * alpha,
									bottom: 0 * alpha,
									height: 54 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Image
									source={require("./../../assets/images/delivery-2.png")}
									style={this.state.delivery_options == 'delivery' ? styles.deliveryImage_selected : styles.deliveryImage}/>
								<Text
									style={this.state.delivery_options == 'delivery' ? styles.deliveryText_selected : styles.deliveryText}>Delivery</Text>
								<View
									style={{
										flex: 1,
									}}/>
								{this.state.delivery_options == 'delivery' ?
									<Image
										source={require("./../../assets/images/fill-1-3.png")}
										style={styles.tabImage}/>
									: null}
							</View>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									alignSelf: "center",
									top: 0 * alpha,
									bottom: 0 * alpha,
									justifyContent: "center",
								}}>
								<TouchableOpacity
									onPress={this.onDeliveryButtonPressed}
									style={styles.deliverybuttonButton}>
									<Text
										style={styles.deliverybuttonButtonText}></Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					 <View>
						style={styles.contactView}>
						<Text
							style={styles.contactText}>Contact</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<TextInput
							keyboardType="number-pad"
							autoCorrect={false}
							placeholder=""
							value={phone_no}
							style={styles.phoneinputTextInput}/>
						<TouchableOpacity
							onPress={this.onAutoFillPressed}
							style={styles.autoFillButton}>
							<Text
								style={styles.autoFillButtonText}>Update Phone No.</Text>
						</TouchableOpacity>
					</View> */}
				</View>
				{/*<View*/}
				{/*	style={styles.capacityView}>*/}
				{/*	<View*/}
				{/*		style={styles.groupView}>*/}
				{/*		<Text*/}
				{/*			style={styles.orderCapacityText}>Order Capacity</Text>*/}
				{/*		<View*/}
				{/*			style={styles.rateView}>*/}
				{/*			<View*/}
				{/*				style={styles.rectangleView}/>*/}
				{/*		</View>*/}
				{/*		<Text*/}
				{/*			style={styles.orders34CupsText}>13</Text>*/}
				{/*		<View*/}
				{/*			style={{*/}
				{/*				flex: 1,*/}
				{/*			}}/>*/}
				{/*		<Text*/}
				{/*			style={styles.estimated15MinsToText}>Estimated </Text>*/}
				{/*	</View>*/}
				{/*</View>*/}
				<View
					style={styles.ordersummaryView}>
					<Text
						style={styles.orderConfirmationText}>Order Confirmation</Text>
						{cart_items}
					<View
						style={styles.voucherView}>
						<TouchableOpacity
							onPress={this.onVoucherButtonPressed}
							style={styles.voucherButton}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0 * alpha,
									right: 0 * alpha,
									top: 0 * alpha,
									bottom: 0 * alpha,
									justifyContent: "center",
								}}>
								<View
									pointerEvents="box-none"
									style={{
										height: 18 * alpha,
										marginLeft: 16 * alpha,
										marginRight: 16 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={styles.promoCodeText}>Available Voucher</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.statusText}>-</Text>
									<Image
										source={require("./../../assets/images/group-4-5.png")}
										style={styles.arrowImage}/>
								</View>
							</View>
						</TouchableOpacity>

					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.summaryText}>Total {cart_total_quantity} {cart_total_quantity>1 ? 'items' : 'item'}</Text>
				</View>
				<View
					style={styles.paymentMethodView}>
					<TouchableOpacity
						onPress={this.onPaymentButtonPressed}
						style={styles.paymentButton}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0 * alpha,
								right: 0 * alpha,
								top: 0 * alpha,
								bottom: 0 * alpha,
								justifyContent: "center",
							}}>
							<View
								pointerEvents="box-none"
								style={{
									height: 27 * alpha,
									marginLeft: 16 * alpha,
									marginRight: 16 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Text
									style={styles.paymentMethodText}>Payment Method</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.paymenticonView}>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											alignSelf: "center",
											top: 0 * alpha,
											bottom: 0 * alpha,
											justifyContent: "center",
										}}>
										<Image
											source={require("./../../assets/images/group-3-11.png")}
											style={styles.group3TwoImage}/>											
									</View>

									{/* <Image
										source={require("./../../assets/images/group-6-6.png")}
										style={styles.group6TwoImage}/> */}
								</View>
								<Text
									style={styles.paymenttypeText}>Brew9 Credit ({this.props.members.currency} {credits})</Text>
								{/* <Image
									source={require("./../../assets/images/group-4-5.png")}
									style={styles.arrowTwoImage}/> */}
							</View>


						</View>
					</TouchableOpacity>
				</View>
				{/* <View
					style={styles.remarkView}>
					<TouchableOpacity
						onPress={this.onRemarkButtonPressed}
						style={styles.remarkButton}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0 * alpha,
								right: 0 * alpha,
								top: 0 * alpha,
								bottom: 0 * alpha,
								justifyContent: "center",
							}}>
							<View
								pointerEvents="box-none"
								style={{
									height: 19 * alpha,
									marginLeft: 16 * alpha,
									marginRight: 16 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Text
									style={styles.remarkText}>Remark</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.remarksText}>No sugar</Text>
								<Image
									source={require("./../../assets/images/group-4-5.png")}
									style={styles.arrowThreeImage}/>
							</View>
						</View>
					</TouchableOpacity>
				</View> */}
			</ScrollView>
			<View
				style={styles.totalPayNowView}>
				<Text
					style={styles.priceText}>${cart_total}</Text>
				<View
					style={{
						flex: 1,
					}}/>
				<TouchableOpacity
					onPress={this.onPayNowPressed}
					style={styles.payNowButton}>
					<Text
						style={styles.payNowButtonText}>Pay Now</Text>
				</TouchableOpacity>
			</View>
			<Toast ref="toast"
            position="center"/>
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
	checkoutView: {
		backgroundColor: "rgb(247, 247, 247)",
		flex: 1,
	},
	scrollviewScrollView: {
		backgroundColor: "transparent",
		flex: 1,
		top: 0 * alpha,
		bottom: 57 * alpha,
	},
	branchView: {
		backgroundColor: "white",
		height: 73 * alpha,
		width: "100%",
		flex: 1,
		marginBottom:10*alpha,
	},
	branchTwoView: {
		backgroundColor: "transparent",
		height: 38 * alpha,
		marginLeft: 15 * alpha,
		marginRight: 15 * alpha,
		marginTop: 14 * alpha,
	},
	branchThreeView: {
		backgroundColor: "transparent",
		width: 120 * alpha,
		height: 22 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	branchText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	arrowImage2: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 11 * alpha,
		height: 11 * alpha,
		marginLeft: 21 * alpha,
	},
	group8Image: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 26 * alpha,
		height: 26 * alpha,
	},
	distance1kmPleaseText: {
		color: "rgb(163, 163, 163)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
	},
	selfPickUpView: {
		backgroundColor: "white",
		borderWidth: 1 * alpha,
		borderColor: "rgb(151, 151, 151)",
		borderStyle: "solid",
		width: 168 * alpha,
		height: 54 * alpha,
	},
	selfPickUpView_selected: {
		backgroundColor: "white",
		borderWidth: 1 * alpha,
		borderColor: "rgb(0, 178, 227)",
		borderStyle: "solid",
		width: 168 * alpha,
		height: 54 * alpha,
	},
	pickUpImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 32 * alpha,
		height: 26 * alpha,
		tintColor : "rgb(70, 76, 84)"
	},
	pickUpImage_selected: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 32 * alpha,
		height: 26 * alpha,
	},
	selfPickUpText: {
		backgroundColor: "transparent",
		color: "rgb(70, 76, 84)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 18 * alpha,
	},
	selfPickUpText_selected: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 18 * alpha,
	},
	fill1Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 17 * alpha,
		height: 17 * alpha,
	},
	tabImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 17 * alpha,
		height: 17 * alpha,
	},
	tabTwoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 17 * alpha,
		height: 17 * alpha,
	},
	pickupbuttonButtonImage: {
		resizeMode: "contain",
	},
	pickupbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 168 * alpha,
		height: 54 * alpha,
	},
	pickupbuttonButtonText: {
		color: "white",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	deliveryView: {
		backgroundColor: "white",
		borderWidth: 1 * alpha,
		borderColor: "rgb(151, 151, 151)",
		borderStyle: "solid",
		width: 168 * alpha,
		height: 54 * alpha,
	},
	deliveryView_selected: {
		backgroundColor: "white",
		borderWidth: 1 * alpha,
		borderColor: "rgb(0, 178, 227)",
		borderStyle: "solid",
		width: 168 * alpha,
		height: 54 * alpha,
	},
	deliveryImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 35 * alpha,
		height: 23 * alpha,
	},
	deliveryImage_selected: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 35 * alpha,
		height: 23 * alpha,
		tintColor: "rgb(0, 178, 227)",
	},
	deliveryText: {
		color: "rgb(70, 76, 84)",
		fontFamily: "Helvetica",
		fontSize: 12 * alpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 27 * alpha,
	},
	deliveryText_selected: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 12 * alpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 27 * alpha,
	},
	deliverybuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 168 * alpha,
		height: 54 * alpha,
	},
	deliverybuttonButtonImage: {
		resizeMode: "contain",
	},
	deliverybuttonButtonText: {
		color: "white",
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	contactView: {
		backgroundColor: "transparent",
		height: 24 * alpha,
		marginLeft: 15 * alpha,
		marginRight: 15 * alpha,
		marginBottom: 5 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	contactText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	phoneinputTextInput: {
		backgroundColor: "transparent",
		padding: 0,
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		width: 150 * alpha,
		height: 12 * alpha,
		marginRight: 5 * alpha,
	},
	autoFillButton: {
		backgroundColor: "transparent",
		borderWidth: 1 * alpha,
		borderColor: "rgb(0, 178, 227)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 5*alpha,
		height: 24 * alpha,
	},
	autoFillButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	autoFillButtonText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	capacityView: {
		backgroundColor: "white",
		borderWidth: 1 * alpha,
		borderColor: "white",
		borderStyle: "solid",
		height: 134 * alpha,
		marginTop: 10 * alpha,
		justifyContent: "center",
	},
	groupView: {
		backgroundColor: "transparent",
		height: 103 * alpha,
		marginLeft: 16 * alpha,
		marginRight: 15 * alpha,
		alignItems: "flex-start",
	},
	orderCapacityText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	rateView: {
		backgroundColor: "rgb(244, 244, 244)",
		borderRadius: 11 * alpha,
		alignSelf: "stretch",
		height: 22 * alpha,
		marginTop: 8 * alpha,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	rectangleView: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 11 * alpha,
		width: 216 * alpha,
		height: 22 * alpha,
	},
	orders34CupsText: {
		color: "rgb(55, 56, 57)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 10 * alpha,
	},
	estimated15MinsToText: {
		color: "rgb(79, 76, 76)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	ordersummaryView: {
		backgroundColor: "white",
		flex: 1,
		paddingTop: 0 * alpha,
	},
	orderConfirmationText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-start",

		marginLeft: 16 * alpha,
		marginTop: 13 * alpha,
	},
	itemTwoView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	nameTwoText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 16 * alpha,
	},
	quantityTwoText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginRight: 14 * alpha,
	},
	rm20TwoText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 15 * alpha,
	},
	voucherView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
	},
	promoCodeText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	statusText: {
		color: "rgb(181, 181, 181)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		width: 61 * alpha,
		marginRight: 5 * alpha,
	},
	arrowImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 11 * alpha,
		height: 11 * alpha,
	},
	voucherButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 375 * alpha,
		height: 50 * alpha,
	},
	voucherButtonImage: {
		resizeMode: "contain",
	},
	voucherButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	summaryText: {
		color: "rgb(135, 135, 135)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		marginRight: 15 * alpha,
		marginBottom: 8 * alpha,
	},
	paymentMethodView: {
		backgroundColor: "white",
		height: 50 * alpha,
		marginTop: 10 * alpha,
	},
	paymentMethodText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	paymenticonView: {
		backgroundColor: "transparent",
		width: 28 * alpha,
		height: 27 * alpha,
		marginRight: 1 * alpha,
	},
	group3TwoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 24 * alpha,
		height: 24 * alpha,
	},
	group6TwoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		alignSelf: "center",
		width: 26 * alpha,
		top: 0 * alpha,
		height: 24 * alpha,
	},
	paymenttypeText: {
		color: 'rgb(85,85,85)',
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		borderRadius: 3.5 * alpha,
		marginRight: 9 * alpha,
	},
	arrowTwoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 11 * alpha,
		height: 11 * alpha,
	},
	paymentButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		bottom: 0 * alpha,
	},
	paymentButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	paymentButtonImage: {
		resizeMode: "contain",
	},
	remarkView: {
		backgroundColor: "white",
		height: 50 * alpha,
	},
	remarkText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	remarksText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginRight: 9 * alpha,
	},
	arrowThreeImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 11 * alpha,
		height: 11 * alpha,
	},
	remarkButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		bottom: 0 * alpha,
	},
	remarkButtonImage: {
		resizeMode: "contain",
	},
	remarkButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	totalPayNowView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		bottom: 40 * alpha,
		height: 47 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	priceText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 16 * alpha,
	},
	payNowButton: {
		backgroundColor: "rgb(0, 178, 227)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 114 * alpha,
		height: 47 * alpha,
	},
	payNowButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	payNowButtonText: {
		color: "white",
		fontFamily: "SFProText-Medium",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	itemView: {
		backgroundColor: "transparent",
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	nameText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	variantText: {
		color: "rgb(148, 148, 148)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 14 * alpha,
		backgroundColor: "transparent",
		width: 257 * alpha,
		height: 28 * alpha,
		marginTop: 2 * alpha,
	},
	quantityText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 16 * alpha,
	},
	cartpriceText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 15 * alpha,
	},

})
