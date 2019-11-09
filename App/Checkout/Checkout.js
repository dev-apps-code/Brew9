//
//  Checkout
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { Animated, Alert, StyleSheet, View, TouchableOpacity, Image, Text, ScrollView, Linking } from "react-native"
import Brew9Modal from "../Components/Brew9Modal"
import React from "react"
import { alpha, fontAlpha, windowHeight } from "../Common/size";
import {connect} from "react-redux";
import PhoneInput from 'react-native-phone-input'
import Toast, {DURATION} from 'react-native-easy-toast'
import HudLoading from "../Components/HudLoading"
import ActivateAccountRequestObject from '../Requests/activate_account_request_object'
import LoginWithSmsRequestObject from "../Requests/login_with_sms_request_object"
import {createAction, Storage} from "../Utils"
import { commonStyles } from "../Common/common_style"
import MakeOrderRequestObj from '../Requests/make_order_request_obj.js'
import ValidVouchersRequestObject from '../Requests/valid_voucher_request_object.js'
import _ from 'lodash'
import {TITLE_FONT, NON_TITLE_FONT, BUTTONBOTTOMPADDING, DEFAULT_GREY_BACKGROUND, PRIMARY_COLOR} from "../Common/common_style";
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
			cart_total: this.props.navigation.getParam("cart_total", 0.00),
			vouchers_to_use:[],
			valid_vouchers:[],
			discount:0,
			promotion: this.props.navigation.getParam("promotion", []),
			promotion_ids: this.props.navigation.getParam("promotion_ids", []),
			cart:this.props.navigation.getParam("cart", []),
			cart_total_quantity:this.props.navigation.getParam("cart_total_quantity",0),
			modal_visible: false,
			modal_description: "",
			modal_title: "",
			modal_cancelable: false,
			modal_ok_text: null,
			modal_ok_action: ()=> {this.setState({modal_visible:false})},
			modal_cancel_action: ()=> {this.setState({modal_visible:false})},
			payment_toggle: false,
			payment_model_visible: false,
			payment_view_height: 0 * alpha,
			selected_payment: ''
		}

		this.moveAnimation = new Animated.ValueXY({ x: 0, y: windowHeight })
	}

	componentDidMount() {
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
		this.loadValidVouchers()	
	}

	loadValidVouchers(){
		const { dispatch,currentMember,selectedShop } = this.props
		const {cart} = this.state
		if (currentMember != null ){
			const callback = eventObject => {

				console.log(`--   voucher ${eventObject.result}`)
				if (eventObject.success) {
					this.setState({ 
						valid_vouchers: eventObject.result
						})	
					}			      
				}

			filtered_cart = _.filter(cart, {clazz: 'product'});
			const obj = new ValidVouchersRequestObject(selectedShop.id,filtered_cart)
			obj.setUrlId(currentMember.id)
			dispatch(
				createAction('vouchers/loadVouchersForCart')({
					object:obj,
					callback,
				})
			)
		}	
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

		navigate("CheckoutVoucher",{valid_vouchers:this.state.valid_vouchers,cart:this.state.cart,addVoucherAction:this.addVoucherItemsToCart})
	}

	addVoucherItemsToCart =(voucher_item) => {

		const {vouchers_to_use} = this.state
	
		if (vouchers_to_use.length == 0){
			this.setState({vouchers_to_use:[voucher_item]})
			this.calculateVoucherDiscount([voucher_item])
		}else{
			let array = []
			
			for (var index in vouchers_to_use){
				var v = vouchers_to_use[index]			
				if (voucher_item.voucher_type == "SkipQueue" && v.voucher.voucher_type !== "SkipQueue"){
					array.push(v)	
					
					continue
				}
				if (voucher_item.voucher_type !== "SkipQueue" && v.voucher.voucher_type == "SkipQueue"){
					array.push(v)	
					continue
				}						
			}
			array.push(voucher_item)
			
			this.setState({vouchers_to_use:array})
			this.calculateVoucherDiscount(array)
		}		
	}

	calculateVoucherDiscount(vouchers_to_use){
		const {cart_total} = this.state
		var discount = 0
		for (var index in vouchers_to_use){
			var item = vouchers_to_use[index]
			let voucher = item.voucher
			if (voucher.voucher_type == "Cash Voucher"){
				discount = voucher.discount_price
			}else{				
				// console.log(`voucher ${voucher.discount_price} ${voucher.discount_type}`)
				if (voucher.discount_type != null && voucher.discount_type != '' && voucher.discount_price != null && voucher.discount_price != 0){
					if (voucher.discount_type.toLowerCase() == "fixed"){
						discount = voucher.discount_price
					}else if(voucher.discount_type.toLowerCase() == "percent"){
						discount = cart_total * voucher.discount_price/100.0						
					}
				}
			}
		}
		this.setState({discount:discount})
	}

	onPaymentButtonPressed = () => {
		this.tooglePayment()
	}


	removeItemFromCart(products,description) {

		let cart = this.state.cart

		let newCart = [];
		let product_ids = products.map(item => item.id);
		
		let cart_total = 0
		let cart_total_quantity = 0
		for (x of cart) {
			if (!product_ids.includes(x.id)){
				newCart.push(x)
				cart_total_quantity = cart_total_quantity + cartItem.quantity
				cart_total = (parseFloat(cart_total) + parseFloat(x.price)).toFixed(2)
			}
		}
				
		let removed_item_name = `${description} \n\n`

		for (var index in products) {
			let product = products[index];
			removed_item_name = removed_item_name.concat(product.name)
			if (index > 0) {
				removed_item_name = removed_item_name.concat("\n")
			}
		}

		this.setState({
			cart: newCart,
			cart_total:cart_total,
			cart_total_quantity:cart_total_quantity,
			modal_title:'Brew9',
			modal_description:removed_item_name,
			modal_ok_text: null,
			modal_cancelable: false,
			modal_ok_action: ()=> {
				this.setState({modal_visible:false})
				if (newCart.length == 0){
					this.props.navigation.goBack()
				}
			},
			modal_visible:true,
		})
	
	}

	loadMakeOrder(){
		const { dispatch, selectedShop } = this.props
		const { navigate } = this.props.navigation
		const {cart,vouchers_to_use, selected_payment, promotion_ids} = this.state
		this.setState({ loading: true })
		const callback = eventObject => {

			this.setState({
				loading: false,
			})
			if (eventObject.success) {

				if (selected_payment == 'credits'){
					this.setState({
						modal_title:'Brew9',
						modal_description:eventObject.message,
						modal_ok_text: null,
						modal_cancelable: false,
						modal_ok_action: ()=> {
							this.setState({modal_visible:false})
							this.clearCart()
						},
						modal_visible:true,
					})
				}else{
					const order = eventObject.result
					navigate("PaymentsWebview", {
						name: `Brew9 Order`,
						order_id: order.receipt_no,
						session_id:order.session_id,
						amount: order.total,
						type:'order',
					})
				}
			}
			else{

				if (Array.isArray(eventObject.result)){
					if (eventObject.result.length > 0){
						let item = eventObject.result[0]
						if (item.clazz = "product"){
							this.removeItemFromCart(eventObject.result,eventObject.message)
							return
						}
					}
				}
				this.setState({
					modal_title:'Brew9',
					modal_description:eventObject.message,
					modal_ok_text: null,
					modal_cancelable: false,
					modal_ok_action: ()=> {
						this.setState({modal_visible:false})
					},
					modal_visible:true,
				})			
			}
		}
		filtered_cart = _.filter(cart, {clazz: 'product'});
		const voucher_item_ids = vouchers_to_use.map(item => item.id)
		console.log("Promotions", promotion_ids)
		const obj = new MakeOrderRequestObj(filtered_cart, voucher_item_ids,this.state.selected_payment, promotion_ids)
		obj.setUrlId(selectedShop.id) 
		dispatch(
			createAction('shops/loadMakeOrder')({
				object:obj,
				callback,
			})
		)
	}

	onWalletButtonPressed = () => {
		this.setState({
			selected_payment: "credits"
		})
		this.tooglePayment()
	}

	onCreditButtonPressed = () => {
		this.setState({
			selected_payment: "credit_card"
		})
		this.tooglePayment()
	}

	clearCart = () => {
		const {navigation } = this.props
		const { routeName, key } = navigation.getParam('returnToRoute')
		navigation.navigate({ routeName, key, params: { clearCart: true } })
	}

	onPayNowPressed = () => {
		const { navigate } = this.props.navigation
		const {cart_total, selected_payment} = this.state
		const {currentMember,selectedShop } = this.props

		if (currentMember != undefined) {
			 
			if ( selected_payment == "") {
				this.tooglePayment()
			}
			if ( selected_payment == "credits") {
				if (parseFloat(cart_total) > parseFloat(currentMember.credits).toFixed(2)){
					this.setState({
						modal_visible:true,
						modal_title: "Brew9",
						modal_description: "You do not have enough credit. Please top up at our counter",
						modal_ok_text: null,
						modal_cancelable: false,
						modal_ok_action: ()=> {
							this.setState({modal_visible:false})
						},
					})
					return
				}
	
				this.setState({
					modal_visible:true,
					modal_title: "Brew9",
					modal_description: "Are you sure you want to confirm the order?",
					modal_ok_text: null,
					modal_cancelable: true,
					modal_ok_action: ()=> {
						this.setState({modal_visible:false})
						this.loadMakeOrder()
					},
					modal_cancel_action: ()=> {
						this.setState({modal_visible:false})
					}
				})
				return
			} else if ( selected_payment == "credit_card") {
				this.setState({
					modal_visible:true,
					modal_title: "Brew9",
					modal_description: "Are you sure you want to confirm the order?",
					modal_ok_text: null,
					modal_cancelable: true,
					modal_ok_action: ()=> {
						this.setState({modal_visible:false})
						this.loadMakeOrder()
					},
					modal_cancel_action: ()=> {
						this.setState({modal_visible:false})
					}
				})
				return
			}
			
		} else {
			navigate("VerifyUserStack")
			return
		}
	}

	measureView(event) {
		this.setState({
			payment_view_height: event.nativeEvent.layout.height
		})
	}

	onClosePressed = () => {

	
		this.setState({ 
			loginModalVisible: false, 
			registerModalVisible: false, 
		})
		

		// navigate("Transaction", {
		// 	amount: cart_total
		// })
	}

	onDirectionPressed(shop) {
		let latitude = shop ? parseFloat(shop.latitude) : 0.0
		let longitude = shop ? parseFloat(shop.longitude) : 0.0

		openMap({ latitude: latitude, longitude: longitude });
	}

	
	onCallPressed = (phone_no) => {
		Linking.openURL(`tel:${phone_no}`)
	}

	renderPopup() {
		return <Brew9Modal
			title={this.state.modal_title}
			description={this.state.modal_description}
			visible={this.state.modal_visible}
			confirm_text={this.state.modal_ok_text}
			cancelable={this.state.modal_cancelable}
			okayButtonAction={this.state.modal_ok_action}
			cancelButtonAction={this.state.modal_cancel_action}
		/>
	}

	tooglePayment = () => {

		const { isPaymentToggle, payment_view_height } = this.state

		var product_checkout_height = payment_view_height
		var content = 247 * alpha
		var finalheight = product_checkout_height - content - BUTTONBOTTOMPADDING

		if (isPaymentToggle) {
			this.setState({ isPaymentToggle: false }, function(){
				Animated.spring(this.moveAnimation, {
					toValue: {x: 0, y: windowHeight},
				}).start()
			})
		} else {
			this.setState({ isPaymentToggle: true }, function(){
				Animated.spring(this.moveAnimation, {
					toValue: {x: 0, y: 0},
				}).start()
			})
		}
	}

	renderPaymentMethod() {

		const { currentMember } = this.props
		const credits = currentMember != undefined ? parseFloat(currentMember.credits).toFixed(2) : 0
		return <Animated.View
					style={this.moveAnimation.getLayout()} >
				<View
					style={styles.popOutPaymentView}>
					<View
						style={styles.paymentMethodTwoView}>
						<TouchableOpacity
							onPress={() => this.tooglePayment()}
							style={styles.closeButton}>
							<Image
								source={require("./../../assets/images/x-3.png")}
								style={styles.closeButtonImage}/>
						</TouchableOpacity>
						<Text
							style={styles.paymentMethodTwoText}>Payment Method</Text>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							height: 150 * alpha,
						}}>
						<View
							style={styles.brew9walletView}>
								<TouchableOpacity
									onPress={() => this.onWalletButtonPressed()}
									style={styles.walletbuttonButton}>
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
										height: 30 * alpha,
										marginLeft: 60 * alpha,
										marginRight: 17 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<View
										style={styles.walletView}>
										<Text
											style={this.state.selected_payment == "credits" ? styles.brew9WalletSelectedText : styles.brew9WalletText}>Brew9 wallet</Text>
										<View
											style={{
												flex: 1,
											}}/>
										<Text
											style={styles.balanceText}>Balance: ${credits}</Text>
									</View>
									<View
										style={{
											flex: 1,
										}}/>
									{
										this.state.selected_payment == "credits" ?
										<View
											style={styles.selectTwoView}/>
										: <View
										style={styles.selectView}/>
									}
								</View>
							</View>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0 * alpha,
									right: 0 * alpha,
									top: 1 * alpha,
									bottom: 0 * alpha,
								}}>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										left: 17 * alpha,
										right: 0 * alpha,
										bottom: 0 * alpha,
										height: 52 * alpha,
										alignItems: "flex-start",
									}}>
									<View
										style={styles.walleticonView}>
										<Image
											source={require("./../../assets/images/fill-1-8.png")}
											style={styles.fill1Image}/>
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
											<Image
												source={require("./../../assets/images/group-9-13.png")}
												style={styles.group9Image}/>
										</View>
									</View>
									<View
										style={{
											flex: 1,
										}}/>
									<Image
										source={require("./../../assets/images/line-10-copy.png")}
										style={styles.lineImage}/>
								</View>
								
							</View>
							</TouchableOpacity>
						</View>
						
						<View
							style={styles.creditCardView}>
								<TouchableOpacity
										onPress={() => this.onCreditButtonPressed()}
										style={styles.creditbuttonButton}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0 * alpha,
									right: 1 * alpha,
									top: 0 * alpha,
									bottom: 2 * alpha,
									alignItems: "flex-end",
								}}>
								<View
									pointerEvents="box-none"
									style={{
										flex: 1,
										alignSelf: "stretch",
									}}>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											left: 0 * alpha,
											top: 0 * alpha,
											bottom: 0 * alpha,
											justifyContent: "center",
										}}>
										<View
											style={styles.cardiconView}>
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
												<Image
													source={require("./../../assets/images/group-3-31.png")}
													style={styles.group3TwoImage}/>
											</View>
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
												<Image
													source={require("./../../assets/images/group-6-25.png")}
													style={styles.group6TwoImage}/>
											</View>
										</View>
									</View>
									
								
								</View>
								<View
									style={styles.line10View}/>
							</View>
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
										marginLeft: 61 * alpha,
										marginRight: 17 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={this.state.selected_payment == "credit_card" ? styles.creditCardSelectedText : styles.creditCardText}>Credit Card</Text>
									<View
										style={{
											flex: 1,
										}}/>
									{
										this.state.selected_payment == "credit_card" ?
										<View
											style={styles.selectTwoView}/>
										: <View
										style={styles.selectView}/>
									}
									
								</View>
							</View>
							</TouchableOpacity>
						</View>
						
						
					</View>
				</View>
		</Animated.View>
	}

	renderVoucherSection() {

		return <View style={styles.drinksViewWrapper}><View style={styles.orderitemsView}>
				<TouchableOpacity
							onPress={this.onVoucherButtonPressed}
							style={styles.voucherButton}><View
					style={styles.drinksView}>
						<View
							pointerEvents="box-none"
							style={{
								justifyContent: "center",
								backgroundColor:"transparent",
								flex: 1,
								flexDirection: "row"
							}}>
								<View
									style={styles.productDetailView}>
									<Text
										style={styles.productNameText}>Available Voucher</Text>
									
										<View style={styles.spacer} />
								</View>
								<Text
									style={styles.productVoucherText}>{this.state.valid_vouchers != null? this.state.valid_vouchers.length : '-'} available</Text>
								
							</View>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	}
	
	renderOrderItems(items, vouchers, promotions) {

		const { cart_total } = this.state
		let fullList = [...items,...promotions] 
		const order_items = fullList.map((item, key) => {
			var price_string = item.price != undefined && item.price > 0 && item.clazz == "product" ? `$${parseFloat(item.price).toFixed(2)}` 
			: item.price != undefined && item.price > 0 && item.clazz == "promotion" ? `-$${parseFloat(item.price).toFixed(2)}` 
			: item.price != undefined && item.price == 0 ? "Free" : ""
			let filtered = item.selected_variants != null ? item.selected_variants.filter(function(el) { return el }) : []
			let variant_array = filtered.map(a => a.value)
			return <View
					style={styles.drinksView}
					key={key}>
						<View
							pointerEvents="box-none"
							style={{
								justifyContent: "center",
								backgroundColor:"transparent",
								flex: 1,
								flexDirection: "row"
							}}>
								<View
									style={styles.productDetailView}>
									<Text
										style={styles.productNameText}>{item.name}</Text>
									{(variant_array.length > 0) ?
									<Text
										style={styles.productVariantText}>{variant_array.join(", ")}</Text> :
										<View style={styles.spacer} />
									}
								</View>
								<Text
									style={styles.productQuantityText}>{ item.quantity != null && item.quantity > 0 && (`x${item.quantity}`)}</Text>
								<Text
									style={styles.productPriceText}>{price_string}</Text>
								<Image
									source={require("./../../assets/images/group-109-copy.png")}
									style={styles.dottedLineImage}/>
							</View>
				</View>
				
		})

		const voucher_items = vouchers.map((item, key) => {

			var discount_value = null

			if (item.voucher.discount_price) {
				if (item.voucher.discount_type == "fixed") {
					discount_value = item.voucher.discount_price
				} else if (item.voucher.discount_type == "percent") {
					discount_value = cart_total * item.voucher.discount_price/100.0	
				}

			} 
			
			return <View
					style={styles.drinksView}
					key={key}>
						<View
							pointerEvents="box-none"
							style={{
								justifyContent: "center",
								backgroundColor:"transparent",
								flex: 1,
								flexDirection: "row"
							}}>
								<View
									style={styles.productDetailView}>
									<Text
										style={styles.productNameText}>{item.voucher.name}</Text>
									
										<View style={styles.spacer} />
									
								</View>
								<Text
									style={styles.productQuantityText}></Text>
								<Text
									style={styles.productPriceText}>{ discount_value ? `-$${parseFloat(discount_value).toFixed(2)}` : ""}</Text>
								<Image
									source={require("./../../assets/images/group-109-copy.png")}
									style={styles.dottedLineImage}/>
							</View>
				</View>
			
		})

		return <View style={styles.drinksViewWrapper}><View style={styles.orderitemsView}>
			{order_items}
			{voucher_items}
		</View>
		</View>
	}

	renderCheckoutReceipt(){
		const { cart, promotion, vouchers_to_use, shop , cart_total, discount} = this.state
		let {currentMember, selectedShop} = this.props
		var final_price = cart_total - discount 
		if (final_price < 0){
			final_price = 0
		}
		final_price = final_price.toFixed(2)
		let credits = (currentMember != undefined && currentMember.credits != undefined) ? parseFloat(currentMember.credits).toFixed(2) : 0

		return <View
				style={styles.orderReceiptView}>
				<ScrollView
					style={styles.orderScrollView}>
					<View
						style={styles.orderCartView}>
						<View
							pointerEvents="box-none"
							style={styles.whiteboxView}>
							<View
								style={styles.completeOrderView}>
								<Image
									source={require("./../../assets/images/group-3-20.png")}
									style={styles.logoImage}/>
								<Text
									style={styles.completedOrderText}>Order Information</Text>
							</View>
							<View
								style={styles.viewView}/>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								flex: 1,
							}}>
							<View
								style={styles.lineView}/>
								<View style={styles.locationWrapperView}>
								<View
									style={styles.locationView}>
									<View
										style={styles.branchView}>
										<Text
											style={styles.shopBranchText}>{shop.name}</Text>
										<Text
											numberOfLines={3}
											style={styles.shopBranchAddressText}>{shop.address}</Text>
									</View>
									<View
										style={{
											flex: 1,
										}}/>
									<View
										style={styles.callView}>
										<TouchableOpacity
											onPress={() => this.onCallPressed(shop.phone_no)}
											style={styles.callIconButton}>
											<Image
												source={require("./../../assets/images/group-3-23.png")}
												style={styles.callIconButtonImage}/>
										</TouchableOpacity>
										<View
											style={{
												flex: 1,
											}}/>
										<Text
											style={styles.callText}>Call</Text>
									</View>
									<View
										style={styles.directionView}>
										<TouchableOpacity
											onPress={ () => this.onDirectionPressed(shop)}
											style={styles.directionIconButton}>
											<Image
												source={require("./../../assets/images/group-3-17.png")}
												style={styles.directionIconButtonImage}/>
										</TouchableOpacity>
										<View
											style={{
												flex: 1,
											}}/>
										<Text
											style={styles.directionText}>Direction</Text>
									</View>
								</View>
							</View>
							<View style={styles.receiptSectionSeperator}>
								<Image
									source={require("./../../assets/images/curve_in_background.png")}
									style={styles.curve_in}/>
								<View
									style={styles.sectionSeperatorView}/>
							</View>
							
							{this.renderOrderItems(cart, vouchers_to_use, promotion)}
							{this.renderVoucherSection()}
							<View style={styles.receiptSectionSeperator}>
								<Image
									source={require("./../../assets/images/curve_in_background.png")}
									style={styles.curve_in}/>
								<View
									style={styles.sectionSeperatorView}/>
							</View>
							<View style={styles.totalViewWrapper}>
								<View
									style={styles.totalView}>
									<Text
										style={styles.totallabelText}>TOTAL</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.totalText}>${parseFloat(final_price).toFixed(2)}</Text>
								</View>
								
							</View>
						</View>
						
					</View>
				</ScrollView>
			</View>
	}


	render() {

		let {cart,cart_total,vouchers_to_use,discount,cart_total_quantity} = this.state
		let {currentMember, selectedShop} = this.props
		var final_price = cart_total - discount 
		if (final_price < 0){
			final_price = 0
		}
		final_price = final_price.toFixed(2)
		let credits = (currentMember != undefined && currentMember.credits != undefined) ? parseFloat(currentMember.credits).toFixed(2) : 0

		
		return <View
			style={styles.checkoutView}>
			<ScrollView
				style={styles.scrollviewScrollView}
				onLayout={(event) => this.measureView(event)}>
				
				<View
					style={styles.ordersummaryView}>
						{this.renderCheckoutReceipt()}
				</View>
				
			</ScrollView>
			{this.renderPaymentMethod()}
			{this.renderPopup()}
			
			<View
				style={styles.totalPayNowView}>
					<TouchableOpacity
						onPress={() => this.onPaymentButtonPressed()}
						style={styles.paymentButton}>
					<Text
						style={styles.paymentButtonText}>{ this.state.selected_payment == '' ? "Select a payment method" : this.state.selected_payment == "credits" ? 
						`Brew9 Credit ${this.props.members.currency} ${credits}` : "Credit Card"}</Text>
					</TouchableOpacity>
				<TouchableOpacity
					onPress={() => this.onPayNowPressed()}
					style={styles.payNowButton}>
					<Text
						style={styles.payNowButtonText}>Pay Now</Text>
				</TouchableOpacity>
			</View>
			<HudLoading isLoading={this.state.loading}/>
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
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
	},
	navigationBarItemIcon: {
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
	checkoutView: {
		backgroundColor: DEFAULT_GREY_BACKGROUND,
		paddingBottom: (47 + BUTTONBOTTOMPADDING) * alpha,
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
		width: 210 * alpha,
		height: 22 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	branchText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 15 * fontAlpha,

		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
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
		fontFamily: NON_TITLE_FONT,
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
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 32 * alpha,
		height: 26 * alpha,
		tintColor : "rgb(70, 76, 84)"
	},
	pickUpImage_selected: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 32 * alpha,
		height: 26 * alpha,
	},
	selfPickUpText: {
		backgroundColor: "transparent",
		color: "rgb(70, 76, 84)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 18 * alpha,
	},
	selfPickUpText_selected: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 18 * alpha,
	},
	fill1Image: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 17 * alpha,
		height: 17 * alpha,
	},
	tabImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 17 * alpha,
		height: 17 * alpha,
	},
	tabTwoImage: {
		resizeMode: "contain",
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
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
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
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 35 * alpha,
		height: 23 * alpha,
	},
	deliveryImage_selected: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 35 * alpha,
		height: 23 * alpha,
		tintColor: "rgb(0, 178, 227)",
	},
	deliveryText: {
		color: "rgb(70, 76, 84)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * alpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 27 * alpha,
	},
	deliveryText_selected: {
		color: "rgb(0, 178, 227)",
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		
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
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 10 * alpha,
	},
	estimated15MinsToText: {
		color: "rgb(79, 76, 76)",
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: NON_TITLE_FONT,
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
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	nameTwoText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		flex: 1,
		backgroundColor: "transparent",
		marginTop: 5 * alpha,
		marginBottom: 5 * alpha,
		marginLeft: 16 * alpha,
	},
	quantityTwoText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginRight: 14 * alpha,
	},
	rm20TwoText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 15 * alpha,
	},
	voucherView: {
		flex: 1,
		backgroundColor: "transparent",
	},
	promoCodeText: {
		color: "rgb(99, 97, 97)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	discountStatusText: {
		color: "rgb(181, 181, 181)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		width: 61 * alpha,
		marginRight: 5 * alpha,
	},
	statusText: {
		color: "rgb(181, 181, 181)",
		fontFamily: NON_TITLE_FONT,
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
		resizeMode: "contain",
		width: 11 * alpha,
		height: 11 * alpha,
	},
	voucherButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		flex: 1,
	},
	voucherButtonImage: {
		resizeMode: "contain",
	},
	voucherButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	summaryText: {
		color: "rgb(135, 135, 135)",
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: NON_TITLE_FONT,
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
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 24 * alpha,
		height: 24 * alpha,
	},
	group6TwoImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		position: "absolute",
		alignSelf: "center",
		width: 26 * alpha,
		top: 0 * alpha,
		height: 24 * alpha,
	},
	paymenttypeText: {
		color: 'rgb(85,85,85)',
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		borderRadius: 3.5 * alpha,
		marginRight: 9 * alpha,
	},
	arrowTwoImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 11 * alpha,
		height: 11 * alpha,
	},
	paymentButton: {
		width: "100%",
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	paymentButtonText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left"
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
		fontFamily: NON_TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	remarksText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginRight: 9 * alpha,
	},
	arrowThreeImage: {
		backgroundColor: "transparent",
		resizeMode: "contain",
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
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	totalPayNowView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		bottom: BUTTONBOTTOMPADDING,
		height: 47 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	priceText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
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
		fontFamily: NON_TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
	},
	itemView: {
		backgroundColor: "transparent",
		flex: 1,
		flexDirection: "row",
	},
	nameText: {
		color: "rgb(63, 63, 63)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	variantText: {
		color: "rgb(164, 164, 164)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
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
		color: "rgb(63, 63, 63)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 16 * alpha,
		marginTop: 10 * alpha,
	},
	cartpriceText: {
		color: "rgb(63, 63, 63)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 15 * alpha,
		marginTop: 10 * alpha,
	},


	popOutPaymentView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		bottom: 72 * alpha,
		height: 247 * alpha,
	},
	paymentMethodTwoView: {
		backgroundColor: "transparent",
		height: 49 * alpha,
		marginRight: 1 * alpha,
	},
	closeButtonImage: {
		resizeMode: "contain",
	},
	closeButton: {
		backgroundColor: "white",
		borderRadius: 10.5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 12 * alpha,
		width: 21 * alpha,
		top: 19 * alpha,
		height: 21 * alpha,
	},
	closeButtonText: {
		color: "black",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	paymentMethodTwoText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 17 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		position: "absolute",
		alignSelf: "center",
		top: 19 * alpha,
	},
	brew9walletView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 70 * alpha,
		height: 80 * alpha,
	},
	walletView: {
		backgroundColor: "transparent",
		width: 200 * alpha,
		height: 30 * alpha,
	},
	brew9WalletText: {
		backgroundColor: "transparent",
		color: "rgb(186, 183, 183)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	brew9WalletSelectedText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	balanceText: {
		color: "rgb(186, 183, 183)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 1 * alpha,
		marginRight: 28 * alpha,
	},
	selectView: {
		backgroundColor: "transparent",
		borderRadius: 9 * alpha,
		borderWidth: 1 * alpha,
		borderColor: "rgb(186, 183, 183)",
		borderStyle: "solid",
		width: 18 * alpha,
		height: 18 * alpha,
	},
	walleticonView: {
		backgroundColor: "transparent",
		width: 26 * alpha,
		height: 23 * alpha,
	},
	fill1Image: {
		backgroundColor: "transparent",
		resizeMode: "contain",
		position: "absolute",
		left: 3 * alpha,
		right: 4 * alpha,
		top: 2 * alpha,
		height: 1 * alpha,
	},
	group9Image: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: null,
		height: 22 * alpha,
	},
	lineImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		alignSelf: "flex-end",
		width: 316 * alpha,
		height: 3 * alpha,
	},
	walletbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0 * alpha,
		right: 1 * alpha,
		top: 0 * alpha,
		bottom: 0 * alpha,
	},
	walletbuttonButtonImage: {
		resizeMode: "contain",
	},
	walletbuttonButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	creditCardView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 71 * alpha,
	},
	cardiconView: {
		backgroundColor: "transparent",
		width: 28 * alpha,
		height: 26 * alpha,
		marginLeft: 17 * alpha,
	},
	group3TwoImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: null,
		height: 24 * alpha,
		marginLeft: 1 * alpha,
		marginRight: 3 * alpha,
	},
	group6TwoImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: null,
		height: 25 * alpha,
	},
	creditbuttonButtonImage: {
		resizeMode: "contain",
	},
	creditbuttonButton: {
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
	creditbuttonButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	line10View: {
		backgroundColor: "rgb(237, 235, 235)",
		width: 314 * alpha,
		height: 1 * alpha,
	},
	creditCardText: {
		color: "rgb(186, 183, 183)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	creditCardSelectedText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	selectTwoView: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 9 * alpha,
		width: 18 * alpha,
		height: 18 * alpha,
	},




	orderReceiptView: {
		backgroundColor: DEFAULT_GREY_BACKGROUND,
		flex: 1,
	},
	orderScrollView: {
		backgroundColor: "transparent",
		flex: 1,
	},
	customerServiceButtonText: {
		color: "rgb(67, 65, 65)",
		fontFamily: TITLE_FONT,
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		
		textAlign: "left",
	},
	customerServiceButton: {
		backgroundColor: "white",
		borderRadius: 14.5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 119 * alpha,
		height: 29 * alpha,
		marginRight: 19 * alpha,
		marginTop: 13 * alpha,
	},
	customerServiceButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	orderCartView: {
		alignSelf: "stretch",
		marginLeft: 18 * alpha,
		marginRight: 18 * alpha,
		marginTop: 13 * alpha,
		marginBottom: 20 * alpha,
		borderRadius: 14 * alpha,
		flex: 1,
	},
	whiteboxView: {
		backgroundColor: "white",
		flex: 1,
		alignItems: "center",
		borderTopRightRadius: 14 * alpha,
		borderTopLeftRadius: 14 * alpha,
	},
	completeOrderView: {
		backgroundColor: "transparent",
		flex: 1,
		alignItems: "center",
	},
	logoImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 30 * alpha,
		height: 60 * alpha,
		marginTop: 30 * alpha,
	},
	completedOrderText: {
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 10 * alpha,
		marginBottom: 30 * alpha,
	},
	thankMessageText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		marginTop: 5 * alpha,
		textAlign: "center",
		backgroundColor: "transparent",
		alignSelf: "stretch",
		marginLeft: 2 * alpha,
		marginRight: 2 * alpha,
	},
	lineView: {
		backgroundColor: "rgb(234, 234, 234)",
		height: 2 * alpha,
	},
	locationWrapperView: {
		backgroundColor: "rgb(245, 245, 245)",
		flex: 1,
	},
	locationView: {
		backgroundColor: "transparent",
		height: 64 * alpha,
		marginLeft: 25 * alpha,
		marginRight: 25 * alpha,
		marginTop: 18 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	branchView: {
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 182 * alpha,
		height: 60 * alpha,
	},
	shopBranchText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
		marginRight: 12 * alpha,
	},
	shopBranchAddressText: {
		color: "rgb(146, 146, 146)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 1 * alpha,
	},
	callView: {
		backgroundColor: "transparent",
		width: 35 * alpha,
		height: 55 * alpha,
		marginRight: 8 * alpha,
	},
	callIconButton: {
		backgroundColor: "transparent",
		borderRadius: 17.5 * alpha,
		borderWidth: 1 * alpha,
		borderColor: "rgb(180, 179, 179)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 35 * alpha,
	},
	callIconButtonImage: {
		resizeMode: "contain",
	},
	callText: {
		backgroundColor: "transparent",
		color: "rgb(163, 163, 163)",
		fontFamily: TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
		marginLeft: 6 * alpha,
		marginRight: 7 * alpha,
	},
	directionView: {
		backgroundColor: "transparent",
		width: 50 * alpha,
		height: 55 * alpha,
	},
	directionIconButton: {
		backgroundColor: "transparent",
		borderRadius: 17.5 * alpha,
		borderWidth: 1 * alpha,
		borderColor: "rgb(180, 179, 179)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 35 * alpha,
		marginLeft: 8 * alpha,
		marginRight: 7 * alpha,
	},
	directionIconButtonImage: {
		resizeMode: "contain",
	},
	directionText: {
		color: "rgb(163, 163, 163)",
		fontFamily: TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	lineTwoView: {
		backgroundColor: "rgb(234, 234, 234)",
		height: 1 * alpha,
		marginLeft: 25 * alpha,
		marginRight: 24 * alpha,
		marginTop: 12 * alpha,
	},
	voucherView: {
		backgroundColor: "transparent",
		height: 18 * alpha,
		marginLeft: 26 * alpha,
		marginRight: 25 * alpha,
		marginTop: 42 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	voucherDescriptionText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	voucher2View: {
		backgroundColor: "transparent",
		height: 17 * alpha,
		marginLeft: 26 * alpha,
		marginRight: 25 * alpha,
		marginTop: 17 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	totalViewWrapper: {
		backgroundColor: "rgb(245,245,245)",
		flex: 1,
		borderBottomLeftRadius: 14 * alpha,
		borderBottomRightRadius: 14 * alpha,
	},
	totalView: {
		backgroundColor: "transparent",
		height: 21 * alpha,
		marginLeft: 26 * alpha,
		marginRight: 24 * alpha,
		marginTop: 10 * alpha,
		marginBottom: 18 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	totallabelText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		
		textAlign: "center",
	},
	totalText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
	},
	lineThreeView: {
		backgroundColor: "rgb(234, 234, 234)",
		height: 1 * alpha,
		marginLeft: 25 * alpha,
		marginRight: 24 * alpha,
		marginTop: 14 * alpha,
	},
	callrefundText: {
		backgroundColor: "transparent",
		color: "rgb(152, 149, 149)",
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
		alignSelf: "flex-start",
		marginLeft: 26 * alpha,
		marginTop: 13 * alpha,
		marginBottom: 13,
	},
	orderitemsView: {
		backgroundColor: "transparent",
		marginLeft: 24 * alpha,
		marginRight: 24 * alpha,
		flex: 1,
	},
	itemView: {
		backgroundColor: "transparent",
		height: 90 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	nameText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
	},
	descriptionText: {
		backgroundColor: "transparent",
		color: "rgb(146, 146, 146)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		
		textAlign: "left",
	},
	quantityText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		marginRight: 52 * alpha,
		marginTop: 26 * alpha,
	},
	priceText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 26 * alpha,
	},
	itemTwoView: {
		backgroundColor: "transparent",
		height: 90 * alpha,
		marginRight: 1 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	
	item2View: {
		backgroundColor: "transparent",
		height: 46 * alpha,
		marginRight: 1 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	nameThreeText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		width: 190 * alpha,
		textAlign: "left",
		backgroundColor: "transparent",
	},
	quantityThreeText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		marginRight: 56 * alpha,
	},
	priceThreeText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		marginRight: 3 * alpha,
	},

	voucherView: {
		backgroundColor: "transparent",
		height: 18 * alpha,
		marginBottom: 10 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	voucherNameText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 12* fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
	},

	drinksViewWrapper: {
		backgroundColor: "rgb(245,245,245)",
		flex: 1,
	},
	drinksView: {
		backgroundColor: "transparent",
		flex: 1,
		marginTop: 10 * alpha,
	},

	productDetailView: {
		backgroundColor: "transparent",
		flex: 1,
		alignItems: "flex-start",
	},
	productNameText: {
		backgroundColor: "transparent",
		color: "rgb(63, 63, 63)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
		marginBottom: 5 * alpha,
	},
	productVariantText: {
		color: "rgb(164, 164, 164)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 191 * alpha,
		marginBottom: 10 * alpha,
	},
	productQuantityText: {
		color: "rgb(50, 50, 50)",
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginRight: 4 * alpha,
		width: 25 * alpha,
	},
	productPriceText: {
		color: "rgb(50, 50, 50)",
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		width: 50 * alpha,
	},
	productVoucherText: {
		color: "rgb(50, 50, 50)",
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
	},
	spacer: {
		marginBottom: 10 * alpha,
	},
	dottedLineImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		alignSelf: "center",
		position: "absolute",
		bottom: 0,
		width: 291 * alpha,
		height: 2 * alpha,
	},

	receiptSectionSeperator: {
		flex: 1,
		backgroundColor: "transparent",
		alignContent: "center",
		justifyContent: "center",
	}, 

	curve_in: {
		height: 14 * alpha,
		resizeMode: "stretch",
		width: "100%",
		backgroundColor: "transparent",
	},

	sectionSeperatorView: {
		backgroundColor: "rgb(234, 234, 234)",
		position: "absolute",
		alignSelf: "center",
		width: 300 * alpha,
		height: 1 * alpha,
		
	},

})
