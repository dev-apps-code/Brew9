//
//  Checkout
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { Animated, StyleSheet, View, TouchableOpacity, Image, Text, ScrollView, Linking, TextInput } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowHeight } from "../Common/size";
import { connect } from "react-redux";
import Toast, { DURATION } from 'react-native-easy-toast'
import HudLoading from "../Components/HudLoading"
import { createAction, Storage } from "../Utils"
import MakeOrderRequestObj from '../Requests/make_order_request_obj.js'
import ValidVouchersRequestObject from '../Requests/valid_voucher_request_object.js'
import _ from 'lodash'
import { TITLE_FONT, NON_TITLE_FONT, BUTTONBOTTOMPADDING, DEFAULT_GREY_BACKGROUND, PRIMARY_COLOR, TOAST_DURATION, LIGHT_GREY } from "../Common/common_style";
import Moment from 'moment';
import ScrollPicker from 'rn-scrollable-picker';
import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from "../Common/config"
import openMap from "react-native-open-maps";

@connect(({ members, shops, orders }) => ({
	currentMember: members.profile,
	members: members,
	selectedShop: shops.selectedShop,
	cart_total_quantity: orders.cart_total_quantity,
	promotion_trigger_count: orders.promotion_trigger_count,
	cart: orders.cart,
	cart_order_id: orders.cart_order_id,
	promotions: orders.promotions,
	promotion_ids: orders.promotion_ids,
	cart_total: orders.cart_total,
	discount_cart_total: orders.discount_cart_total,
	location: members.location,
}))
export default class Checkout extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			headerTitle: <Text style={{ textAlign: 'center', alignSelf: "center", fontFamily: TITLE_FONT }}>Checkout</Text>,
			headerTintColor: "black",
			headerLeft: <View
				style={styles.headerLeftContainer}>
				<TouchableOpacity
					onPress={params.onBackPressed ? params.onBackPressed : () => null}
					style={styles.navigationBarItem}>
					<Image
						source={require("./../../assets/images/back.png")}
						style={styles.navigationBarItemIcon} />
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
		_.throttle(
			this.onPayNowPressed.bind(this),
			500, // no new clicks within 500ms time window
		);
		const { discount_cart_total } = props
		this.state = {
			delivery_options: 'pickup',
			vouchers_to_use: [],
			voucher: '',
			valid_vouchers: [],
			discount: 0,
			isPaymentToggle: false,
			payment_view_height: 0 * alpha,
			selected_payment: '',
			pick_up_time: null,
			pick_up_status: null,
			selected_hour: "00",
			selected_minute: "00",
			hour_range: [],
			minute_range: [],
			isPickupToogle: false,
			pickup_view_height: 150 * alpha,
			selected_hour_index: 0,
			selected_minute_index: 0,
			paynow_clicked: false,
			final_price: discount_cart_total,
			visible: false
		}
		this.movePickAnimation = new Animated.ValueXY({ x: 0, y: windowHeight })
		this.moveAnimation = new Animated.ValueXY({ x: 0, y: windowHeight })

	}

	componentDidMount() {
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})

		const { dispatch } = this.props
		this.setTimePickerDefault()
		this.setState({
			valid_vouchers: [],
		}, function () {
			this.loadValidVouchers()
		})
		dispatch(createAction("orders/noClearCart")());
		this.check_promotion_trigger()
	}

	componentDidUpdate(prevProps, prevState) {

		if (prevProps.promotion_trigger_count != this.props.promotion_trigger_count) {
			this.check_promotion_trigger()
		}
	}

	setTimePickerDefault() {

		const { selectedShop } = this.props
		var opening = Moment(selectedShop.opening_hour.order_start_time, 'h:mm')
		var closing = Moment(selectedShop.opening_hour.order_stop_time, 'h:mm')

		var time_now = Moment(new Date(), 'h:mm')

		var hour = time_now.hours();
		var min = time_now.minutes();
		var minute_array = ["00", "15", "30", "45"]

		var first_hour = hour > opening.hours() && min > 45 ? hour + 1 : hour > opening.hours() ? hour : opening.hours()
		var last_hour = closing.hours()

		var hour_array = _.range(first_hour, last_hour + 1);

		var selected_minute = ""
		if (hour >= opening.hours() && min < 45) {

			minute_array = _.filter(["00", "15", "30", "45"], function (o) {
				return parseInt(o) > min;
			})
		}
		if (hour >= closing.hours()) {

			minute_array = _.filter(["00", "15", "30", "45"], function (o) {
				return parseInt(o) <= closing.minutes();
			})
		}
		if (hour)
			selected_minute = minute_array[0]

		if (minute_array.length < 3) {
			minute_array.length = 3
		}

		selected_minute = minute_array[0]


		var first_hour = hour >= opening.hours() && min > 45 ? hour + 1 : hour > opening.hours() ? hour : opening.hours()
		var last_hour = closing.hours()

		var hour_array = _.range(first_hour, last_hour + 1);
		if (hour_array.length < 3) {
			hour_array.length = 3
		}
		// console.log('hour_array', hour_array)
		// console.log('minute_array', minute_array)

		this.setState({
			selected_hour: first_hour,
			selected_minute: selected_minute,
			minute_range: minute_array,
			hour_range: hour_array
		})
	}

	checkAvailableMinute(option) {
		const { selectedShop } = this.props

		var closing = Moment(selectedShop.opening_hour.order_stop_time, 'h:mm')

		// console.log('check available minutes')
		var minute_array = ["00", "15", "30", "45"]
		var time_now = Moment(new Date(), 'h:mm')

		var hour = time_now.hours();
		var min = time_now.minutes();

		if (hour == option) {
			minute_array = _.filter(["00", "15", "30", "45"], function (o) {
				let minOption = parseInt(o)
				return (minOption > min)
			})
			if (minute_array.length < 3) {
				minute_array.length = 3
			}

			this.setState({
				minute_range: minute_array,
			})
		} else {
			var closing = Moment(selectedShop.opening_hour.order_stop_time, 'h:mm')

			if (option == closing.hours()) {
				minute_array = _.filter(["00", "15", "30", "45"], function (o) {
					let minOption = parseInt(o)
					return (minOption <= closing.minutes())
				})
			}
			if (minute_array.length < 3) {
				minute_array.length = 3
			}

			this.setState({
				minute_range: minute_array,
				selected_minute: minute_array[0],
			})
		}

	}

	onHourValueChange = (option, index) => {

		if (option == "") {
			this.setState({
				selected_hour_index: index - 1,
			}, function () {
				this.sphour.scrollToIndex(this.state.selected_hour_index)
			})
		} else {
			this.checkAvailableMinute(option)
			this.setState({
				selected_hour: option,
				selected_hour_index: index,
			})
		}

	}

	onMinuteValueChange = (option, index) => {

		const { selected_hour_index, selected_hour, hour_range } = this.state
		if (option != "") {
			var time_now = Moment(new Date(), 'h:mm')

			var hour = time_now.hours();
			var min = time_now.minutes();

			if (hour == selected_hour && min > 15 && option == "00") {
				this.sphour.scrollToIndex(selected_hour_index + 1)
				this.setState({
					minute_range: ["00", "15", "30", "45"],
					selected_hour: hour_range[selected_hour_index + 1]
				}, function () {
					this.spminute.scrollToIndex(0)
				})
			}
			this.setState({
				selected_minute: option
			})
		} else {
			this.spminute.scrollToIndex(index - 1)
		}

	}


	loadValidVouchers() {
		const { dispatch, currentMember, selectedShop, cart, promotions, cart_order_id } = this.props
		if (currentMember != null) {
			const callback = eventObject => {
				if (eventObject.success) {
					this.setState({
						valid_vouchers: eventObject.result
					})
				}
			}

			filtered_cart = _.filter(cart, { clazz: 'product' });
			const obj = new ValidVouchersRequestObject(selectedShop.id, filtered_cart, promotions, cart_order_id)
			obj.setUrlId(currentMember.id)
			dispatch(
				createAction('vouchers/loadVouchersForCart')({
					object: obj,
					callback,
				})
			)
		}
	}

	onBackPressed = () => {

		const { navigation } = this.props
		const { routeName, key } = navigation.getParam('returnToRoute')

		navigation.navigate({ routeName, key, })
	}


	onConfirmTimePicker() {
		const { selected_hour, selected_minute, pick_up_status } = this.state
		var now = new Moment().format("HH:mm");
		var selectorTime = `${selected_hour}:${selected_minute}`
		if (pick_up_status == "Order Now") {
			this.setState({
				pick_up_time: `${now}`,
			}, function () {
				this.tooglePickup()
			});
		} else if (pick_up_status == "Pick Later") {
			if (now < selectorTime) {
				this.setState({
					pick_up_time: `${selected_hour}:${selected_minute}`,
				}, function () {
					this.tooglePickup()
				});
			} else {
				this.refs.toast.show("Pick up time is not available", TOAST_DURATION)
			}
		}

	}

	onSelectPickLater() {
		this.setState({
			pick_up_status: `Pick Later`,
		})
	}

	onSelectOrderNow() {
		this.setState({
			pick_up_status: `Order Now`,
		})
	}

	onBranchButtonPressed = () => {

	}

	onLocationButtonPressed = () => {
		const { navigate } = this.props.navigation

		navigate("DirectionMap", {
			shop: this.props.selectedShop
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

	onAutoFillPressed = () => { }

	onVoucherButtonPressed = () => {
		const { navigate } = this.props.navigation
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Checkout', 'Click', "Select Voucher"))
		navigate("CheckoutVoucher", { valid_vouchers: this.state.valid_vouchers, cart: this.props.cart, addVoucherAction: this.addVoucherItemsToCart })
	}

	onCancelVoucher = (item) => {
		let new_voucher_list = [...this.state.vouchers_to_use]
		const search_voucher_index = new_voucher_list.findIndex(element => element.id == item.id)

		new_voucher_list.splice(search_voucher_index, 1)
		this.setState({
			vouchers_to_use: new_voucher_list
		}, function () {
			this.calculateVoucherDiscount(new_voucher_list)
		})
	}

	addVoucherItemsToCart = (voucher_item) => {

		const { vouchers_to_use } = this.state

		if (vouchers_to_use.length == 0) {
			this.setState({ vouchers_to_use: [voucher_item] })
			this.calculateVoucherDiscount([voucher_item])
		} else {
			let array = []

			for (var index in vouchers_to_use) {
				var v = vouchers_to_use[index]
				if (voucher_item.voucher_type == "SkipQueue" && v.voucher.voucher_type !== "SkipQueue") {
					array.push(v)
					continue
				}
				if (voucher_item.voucher_type !== "SkipQueue" && v.voucher.voucher_type == "SkipQueue") {
					array.push(v)
					continue
				}
			}
			array.push(voucher_item)

			this.setState({ vouchers_to_use: array })
			this.calculateVoucherDiscount(array)
		}
	}

	check_promotion_trigger = () => {

		const { currentMember, dispatch, promotions, cart_total, selectedShop } = this.props
		let shop = selectedShop
		let newcart = [...this.props.cart]
		let finalCart = []

		var promotions_item = []
		var final_cart_value = cart_total
		var final_promo_text = ''

		// reset cart promotions
		for (var index in newcart) {
			item = newcart[index]
			if (item.clazz == "product") {
				finalCart.push(item)
			}
		}
		if (shop.all_promotions != null && shop.all_promotions.length > 0) {

			for (var index in shop.all_promotions) {

				var promotion = shop.all_promotions[index]

				// console.log(`trigger price ${promotion.trigger_price} - ${promotion.has_triggered}`)
				if (currentMember != null) {

					if (promotion.trigger_price != null) {
						var price = 0

						var trigger_price = parseFloat(promotion.trigger_price)
						var remaining = trigger_price - cart_total

						if (remaining <= 0) {

							shop.all_promotions[index].has_triggered = true

							if (promotion.reward_type != null && promotion.reward_type == "Discount") {

								if (promotion.value_type != null && promotion.value_type == "percent") {
									var discount_value = promotion.value ? promotion.value : 0
									price = cart_total * discount_value / 100

									if (promotion.maximum_discount_allow != null && price > promotion.maximum_discount_allow) {
										price = promotion.maximum_discount_allow
									}
									final_cart_value = cart_total - price

								} else if (promotion.value_type != null && promotion.value_type == "fixed") {
									var discount_value = promotion.value ? promotion.value : 0
									final_cart_value = cart_total - discount_value
								}
							}

							let cartItem = {
								clazz: "promotion",
								id: promotion.id,
								name: promotion.cart_text,
								description: "",
								price: price,
								type: promotion.reward_type
							}

							promotions_item.push(cartItem)

						} else {
							var display_text = promotion.display_text
							final_promo_text = display_text.replace("$remaining", `$${parseFloat(remaining).toFixed(2)}`);

							break;
						}
					}
				}
			}
		}

		if (this.props.cart.length == 0) {
			final_promo_text = ''
			this.setState({ isCartToggle: false }, function () {
				Animated.spring(this.moveAnimation, {
					toValue: { x: 0, y: windowHeight },
				}).start()
			})
		} else {

		}

		dispatch(createAction("orders/updatePromotionText")({
			promotionText: final_promo_text
		}));
		dispatch(createAction("orders/updatePromotions")({
			promotions: promotions_item
		}));

		dispatch(createAction("orders/updateDiscountCartTotal")({
			discount_cart_total: final_cart_value
		}));
	}

	calculateVoucherDiscount(vouchers_to_use) {
		const { discount_cart_total, cart_total } = this.props
		var discount = 0
		for (var index in vouchers_to_use) {
			var item = vouchers_to_use[index]
			let voucher = item.voucher
			if (voucher.voucher_type == "Cash Voucher") {
				discount = voucher.discount_price
			} else {
				if (voucher.discount_type != null && voucher.discount_type != '' && voucher.discount_price != null && voucher.discount_price != 0) {
					if (voucher.discount_type.toLowerCase() == "fixed") {
						discount = voucher.discount_price
					} else if (voucher.discount_type.toLowerCase() == "percent") {
						discount = discount_cart_total * voucher.discount_price / 100.0
					}
				}
			}
		}
		const f_price = discount_cart_total - discount
		this.setState({ discount: discount, final_price: f_price.toFixed(2) })
	}

	onPaymentButtonPressed = () => {
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Checkout', 'Click', "Select Payment"))
		this.tooglePayment()
	}

	removeItemFromCart(products, description) {
		const { dispatch } = this.props
		let newcart = [...this.props.cart]
		let product_ids = products.map(item => item.id)
		for (item of newcart) {
			if (product_ids.includes(item.id)) {
				item.cannot_order = true
			}
		}
		dispatch(createAction("orders/updateCart")({
			cart: newcart
		}));
	}

	onRemoveItem(item) {
		const { dispatch } = this.props
		let new_cart = [...this.props.cart]
		const search_product_index = new_cart.findIndex(element => element.id == item.id)

		new_cart.splice(search_product_index, 1)

		dispatch(createAction("orders/updateCart")({
			cart: new_cart
		}));
	}


	// removeItemFromCart(products,description) {

	// 	console.log("remove", products)
	// 	let cart = [...this.state.cart]

	// 	let newCart = [];
	// 	let product_ids = products.map(item => item.id);

	// 	let cart_total = 0
	// 	let cart_total_quantity = 0
	// 	for (x of cart) {
	// 		if (!product_ids.includes(x.id)){
	// 			newCart.push(x)
	// 			cart_total_quantity = cart_total_quantity + cartItem.quantity
	// 			cart_total = (parseFloat(cart_total) + parseFloat(x.price)).toFixed(2)
	// 		}
	// 	}

	// 	let removed_item_name = `${description} \n\n`

	// 	for (var index in products) {
	// 		let product = products[index];
	// 		removed_item_name = removed_item_name.concat(product.name)
	// 		if (index > 0) {
	// 			removed_item_name = removed_item_name.concat("\n")
	// 		}
	// 	}

	// 	this.refs.toast.show(removed_item_name, TOAST_DURATION)
	// 	if (newCart.length == 0){
	// 		this.props.navigation.goBack()
	// 	}
	// }

	loadMakeOrder() {
		const { cart, dispatch, selectedShop, promotion_ids, cart_order_id, navigation, location } = this.props
		const { navigate } = this.props.navigation
		const { vouchers_to_use, selected_payment, pick_up_status, pick_up_time } = this.state
		this.setState({ loading: true })
		const callback = eventObject => {

			if (eventObject.success) {

				if (selected_payment == 'credits') {
					setTimeout(function () {
						this.clearCart()
						this.setState({
							loading: false,
						})
					}.bind(this), 500);
				}
				else if (selected_payment == 'counter') {
					setTimeout(function () {
						this.clearCart()
						this.setState({
							loading: false,
						})
					}.bind(this), 500);
				} else {
					this.setState({
						loading: false,
					})
					const order = eventObject.result

					navigate("PaymentsWebview", {
						name: `Brew9 Order`,
						order_id: order.receipt_no,
						session_id: order.session_id,
						amount: order.total,
						type: 'order',
						returnToRoute: navigation.state,
						clearCart: () => this.clearCart()
					})
				}
			}
			else {
				console.log("Error", eventObject.message)
				this.refs.toast.show(eventObject.message, TOAST_DURATION)
				this.setState({
					loading: false,
				})
				if (Array.isArray(eventObject.result)) {
					if (eventObject.result.length > 0) {
						let item = eventObject.result[0]
						if (item.clazz = "product") {
							this.removeItemFromCart(eventObject.result, eventObject.message)
							return
						}
					}
				}
			}

		}
		var latitude = null
		var longitude = null

		if (location != null) {
			latitude = location.coords.latitude
			longitude = location.coords.longitude
		}

		filtered_cart = _.filter(cart, { clazz: 'product' });
		const voucher_item_ids = vouchers_to_use.map(item => item.id)
		console.log("Order_Id", cart_order_id, voucher_item_ids)
		const obj = new MakeOrderRequestObj(filtered_cart, voucher_item_ids, this.state.selected_payment, promotion_ids, pick_up_status, pick_up_time, cart_order_id, latitude, longitude)
		obj.setUrlId(selectedShop.id)
		dispatch(
			createAction('shops/loadMakeOrder')({
				object: obj,
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
	onCounterButtonPressed = () => {
		this.setState({
			selected_payment: "counter"
		})
		this.tooglePayment()
	}

	clearCart = () => {
		const { navigation, dispatch } = this.props
		dispatch(createAction("orders/resetCart")({}));
		const { routeName, key } = navigation.getParam('returnToRoute')
		console.log('clearcart')
		navigation.navigate({
			routeName, key,
		})
	}

	onPayNowPressed = () => {
		const { navigate } = this.props.navigation
		const { selected_payment, pick_up_status, final_price, pick_up_time } = this.state
		const { currentMember, selectedShop } = this.props
		const analytics = new Analytics(ANALYTICS_ID)

		analytics.event(new Event('Checkout', 'Click', "Pay Now"))
		if (currentMember != undefined) {
			if (selected_payment == "") {
				this.tooglePayment()
				return
			}

			if (selected_payment == "credits") {
				if (parseFloat(final_price) > parseFloat(currentMember.credits).toFixed(2)) {
					this.refs.toast.show(<View style={{ justifyContent: "center" }}><Text style={{ color: "white", alignSelf: "center" }}>Oops, insufficient credit.</Text><Text style={{ color: "white", alignSelf: "center" }}>Please select other payment option.</Text></View>, TOAST_DURATION + 1000,
						// () => {
						// 	navigate("MemberWallet")
						// }
					)
					return
				}
			}

			if (pick_up_status == null) {
				this.tooglePickup()
				return
			} else {
				if (selectedShop != null) {
					var opening = Moment(selectedShop.opening_hour.start_time, 'h:mm')
					var closing = Moment(selectedShop.opening_hour.end_time, 'h:mm')
					var pickup = Moment(pick_up_time, 'h:mm')
					var now = Moment(new Date(), 'HH:mm')

					if (pickup < now && pick_up_status == "Pick Later") {
						this.refs.toast.show("Pick up time is not available", TOAST_DURATION)
						return
					}
					else if (pickup < opening) {
						this.refs.toast.show("Shop is not open at this time", TOAST_DURATION)
						return
					} else if (pickup > closing) {
						this.refs.toast.show("We are closed at this time.", TOAST_DURATION)
						return
					}
				}
			}


			this.loadMakeOrder()
			return

		} else {
			navigate("VerifyUser", {
				returnToRoute: this.props.navigation.state
			})
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
	}

	onDirectionPressed(shop) {
		let latitude = shop ? parseFloat(shop.latitude) : 0.0
		let longitude = shop ? parseFloat(shop.longitude) : 0.0

		openMap({ latitude: latitude, longitude: longitude });
	}


	onCallPressed = (phone_no) => {
		Linking.openURL(`tel:${phone_no}`)
	}

	tooglePickup = () => {
		const { isPickupToogle, pickup_view_height } = this.state

		var product_checkout_height = pickup_view_height
		var content = 247 * alpha
		var finalheight = pickup_view_height - content - BUTTONBOTTOMPADDING

		if (isPickupToogle) {
			this.setState({ isPickupToogle: false }, function () {
				Animated.spring(this.movePickAnimation, {
					toValue: { x: 0, y: windowHeight },
				}).start()
			})
		} else {
			this.setState({ isPickupToogle: true }, function () {
				Animated.spring(this.movePickAnimation, {
					toValue: { x: 0, y: 52 * alpha },
				}).start()
			})
		}
	}

	tooglePayment = () => {

		const { isPaymentToggle, payment_view_height } = this.state

		var product_checkout_height = payment_view_height
		var content = 247 * alpha

		if (isPaymentToggle) {
			this.setState({ isPaymentToggle: false }, function () {
				Animated.spring(this.moveAnimation, {
					toValue: { x: 0, y: windowHeight },
				}).start()
			})
		} else {
			this.setState({ isPaymentToggle: true }, function () {
				Animated.spring(this.moveAnimation, {
					toValue: { x: 0, y: 52 * alpha },
				}).start()
			})
		}
	}

	onApplyVoucher = () => {
		console.log('onApplyVoucher')
	}
	onChangeVoucher = (text) => {
		this.setState({
			voucher: text
		})
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
							style={styles.closeButtonImage} />
					</TouchableOpacity>
					<Text
						style={styles.paymentMethodTwoText}>Payment Method</Text>
				</View>
				<View
					pointerEvents="box-none"
					style={{ height: 150 * alpha }}>
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
											style={this.state.selected_payment == "credits" ? styles.brew9WalletSelectedText : styles.brew9WalletText}>Wallet</Text>
										<View
											style={{
												flex: 1,
											}} />
										<Text
											style={styles.balanceText}>${credits}</Text>
									</View>
									<View
										style={{
											flex: 1,
										}} />
									{
										this.state.selected_payment == "credits" ?
											<View
												style={styles.selectTwoView} />
											: <View
												style={styles.selectView} />
									}
								</View>
							</View>

							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 17 * alpha,
									right: 0 * alpha,
									bottom: 0 * alpha,
									height: 52 * alpha,
								}}>
								<View
									style={styles.walleticonView}>

									<Image
										source={require("./../../assets/images/wallet_center.png")}
										style={this.state.selected_payment == "credits" ? styles.walletSelectImage : styles.walletImage} />
								</View>
							</View>
							<View
								style={{
									flex: 1,
								}} />
							<View
								style={styles.menuRowLineView} />
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
									left: 17 * alpha,
									right: 0 * alpha,
									bottom: 0 * alpha,
									height: 52 * alpha,
								}}>
								<View
									style={styles.walleticonView}>

									<Image
										source={require("./../../assets/images/credit_card.png")}
										style={this.state.selected_payment == "credit_card" ? styles.walletSelectImage : styles.walletImage} />
								</View>
							</View>

							{/* <View
								pointerEvents="box-none"
								style={{
									flex: 1,
									alignSelf: "stretch",
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
											source={require("./../../assets/images/credit_card.png")}
											style={this.state.selected_payment == "credit_card" ? styles.creditCardSelectImage : styles.creditCardImage} />
									</View>
								</View>
							</View> */}

							<View
								style={{
									flex: 1,
								}} />
							<View
								style={styles.menuRowLineView} />
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
										}} />
									{
										this.state.selected_payment == "credit_card" ?
											<View
												style={styles.selectTwoView} />
											: <View
												style={styles.selectView} />
									}

								</View>
							</View>
						</TouchableOpacity>

					</View>
					<View
						style={styles.creditCardView}>
						<TouchableOpacity
							onPress={() => this.onCounterButtonPressed()}
							style={styles.creditbuttonButton}>

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
										left: 17 * alpha,
										right: 0 * alpha,
										bottom: 0 * alpha,
										height: 52 * alpha,
									}}>
									<View
										style={styles.walleticonView}>

										<Image
											source={require("./../../assets/images/cash.png")}
											style={this.state.selected_payment == "counter" ? styles.walletSelectImage : styles.walletImage} />
									</View>
								</View>
							</View>

							<View
								style={{
									flex: 1,
								}} />
							<View
								style={styles.menuRowLineView} />
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
										style={this.state.selected_payment == "counter" ? styles.creditCardSelectedText : styles.creditCardText}>Pay In Store</Text>
									<View
										style={{
											flex: 1,
										}} />
									{
										this.state.selected_payment == "counter" ?
											<View
												style={styles.selectTwoView} />
											: <View
												style={styles.selectView} />
									}

								</View>
							</View>
						</TouchableOpacity>

					</View>

				</View>
			</View>
		</Animated.View>
	}

	renderVoucherSection(vouchers) {
		const { cart_total, discount_cart_total } = this.props
		const voucher_items = vouchers.map((item, key) => {

			var discount_value = null

			if (item.voucher.discount_price) {
				if (item.voucher.discount_type == "fixed") {
					discount_value = item.voucher.discount_price
				} else if (item.voucher.discount_type == "percent") {
					discount_value = discount_cart_total * item.voucher.discount_price / 100.0
				}
			}

			return <View
				style={styles.drinksView}
				key={key}>
				<View
					pointerEvents="box-none"
					style={{
						justifyContent: "center",
						backgroundColor: "transparent",
						flex: 1,
						flexDirection: "row"
					}}>
					<View
						style={styles.productDetailView}>
						<View style={styles.voucherDetailView}>
							<Text
								style={styles.productNameText}>{item.voucher.name}</Text>
							<View
								style={styles.voucherButtonView}>
								<Text
									style={styles.voucherButtonText}>Voucher</Text>
							</View>
						</View>
						<View style={styles.spacer} />

					</View>
					<Text
						style={styles.productQuantityText}></Text>
					<Text
						style={styles.productPriceText}>{discount_value ? `-$${parseFloat(discount_value).toFixed(2)}` : ""}</Text>
					<TouchableOpacity onPress={() => this.onCancelVoucher(item)} style={styles.cancelVoucherButton}>
						<Image
							source={require("./../../assets/images/cancel.png")}
							style={styles.cancelImage} />
					</TouchableOpacity>

					<Image
						source={require("./../../assets/images/group-109-copy.png")}
						style={styles.dottedLineImage} />
				</View>
			</View>

		})

		
		var valid_voucher_counts = _.filter(this.state.valid_vouchers, function(o) { if (o.is_valid == true) return o }).length;

		return <View style={styles.drinksViewWrapper}>
			<View style={styles.orderitemsView}>
				<TouchableOpacity
					onPress={this.state.valid_vouchers != null && this.state.valid_vouchers.length > 0 ? () => this.onVoucherButtonPressed() : () => null}
					style={styles.voucherButton}>
					<View
						style={styles.drinksView}>
						<View
							pointerEvents="box-none"
							style={{
								justifyContent: "center",
								backgroundColor: "transparent",
								flex: 1,
								flexDirection: "row",
							}}>
							<View
								style={styles.productDetailView}>
								<Text
									style={styles.productNameText}>Brew9 Vouchers</Text>
								<View style={styles.spacer} />
							</View>
							<Text
								style={this.state.valid_vouchers != null && this.state.valid_vouchers.length > 0 ? styles.productVoucherText : styles.productVoucherDisableText}>{this.state.valid_vouchers != null ? valid_voucher_counts : '-'} usable</Text>
							<Image
								source={require("./../../assets/images/next.png")}
								style={styles.menuRowArrowImage} />
						</View>
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.orderitemsView}>
				{voucher_items}
			</View>
			{/* <View style={styles.couponContent}>
				<TextInput
					style={styles.voucherInput}
					onChangeText={text => this.onChangeVoucher(text)}
					value={this.state.voucher} />
				<TouchableOpacity style={styles.applyButton} onPress={this.onApplyVoucher}>
					<Text style={styles.applyText}>Apply</Text>
				</TouchableOpacity>
			</View> */}
		</View>
	}

	renderPaymentSection() {

		const { currentMember } = this.props
		const { selected_payment } = this.state

		const credits = currentMember != undefined ? parseFloat(currentMember.credits).toFixed(2) : 0

		return <View style={styles.drinksViewWrapper}>
			<View style={styles.orderitemsView}>
				<TouchableOpacity
					// onPress={() => this.showDateTimePicker()}
					onPress={() => this.onPaymentButtonPressed()}
					style={styles.voucherButton}>
					<View
						style={styles.drinksView}>
						<View
							pointerEvents="box-none"
							style={{
								justifyContent: "center",
								backgroundColor: "transparent",
								flex: 1,
								flexDirection: "row"
							}}>
							<View
								style={styles.productDetailView}>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<View style={selected_payment != "" ? styles.greenCircle : styles.redCircle} />
									<Text
										style={styles.productNameText}>Payment</Text>

								</View>
								<View style={styles.spacer} />
							</View>
							<Text
								style={styles.productVoucherText}>{this.state.selected_payment == '' ? "Please select" : this.state.selected_payment == "credits" ?
									`Wallet ${this.props.members.currency}${credits}` : (this.state.selected_payment == "counter" ? "Pay In Store " : "Credit Card")}</Text>
							<Image
								source={require("./../../assets/images/next.png")}
								style={styles.menuRowArrowImage} />
						</View>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	}

	renderPickupTime() {
		const { pick_up_status } = this.state
		return <View style={styles.drinksViewWrapper}>
			<View style={styles.orderitemsView}>
				<TouchableOpacity
					// onPress={() => this.showDateTimePicker()}
					onPress={() => this.tooglePickup()}
					style={styles.voucherButton}>
					<View
						style={styles.drinksView}>
						<View
							pointerEvents="box-none"
							style={{
								justifyContent: "center",
								backgroundColor: "transparent",
								flex: 1,
								flexDirection: "row"
							}}>
							<View
								style={styles.productDetailView}>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<View style={pick_up_status != null ? styles.greenCircle : styles.redCircle} />
									<Text
										style={styles.productNameText}>Pick Up Time</Text>

								</View>
							</View>
							<Text
								style={styles.productVoucherText}>{this.state.pick_up_time != null ? Moment(this.state.pick_up_time, "HH:mm").format('LT') : 'Please select'}</Text>
							<Image
								source={require("./../../assets/images/next.png")}
								style={styles.menuRowArrowImage} />
						</View>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	}

	renderOrderItems(items, promotions) {
		let fullList = [...items, ...promotions]
		let last_item = fullList[fullList.length - 1]

		const order_items = fullList.map((item, key) => {
			var price_string = item.price != undefined && item.price > 0 && item.clazz == "product" ? `$${parseFloat(item.price).toFixed(2)}`
				: item.price != undefined && item.price > 0 && item.clazz == "promotion" ? `-$${parseFloat(item.price).toFixed(2)}`
					: item.type != undefined && item.type == "Free Items and vouchers" ? "Free" : ""
			let filtered = item.selected_variants != null ? item.selected_variants.filter(function (el) { return el }) : []

			let variant_array = filtered.map(a => a.value)
			return <View
				style={styles.drinksView}
				key={key}>
				<View
					pointerEvents="box-none"
					style={{
						justifyContent: "center",
						backgroundColor: "transparent",
						flex: 1,
						flexDirection: "row"
					}}>
					<View
						style={styles.productDetailView}>
						<Text
							style={item.cannot_order != undefined && item.cannot_order == true ? styles.productNameDisabledText : styles.productNameText}>{item.name}</Text>
						{(variant_array.length > 0) ?
							<Text
								style={styles.productVariantText}>{variant_array.join(", ")}</Text> :
							<View style={styles.spacer} />
						}
					</View>
					<Text
						style={styles.productQuantityText}>{item.quantity != null && item.quantity > 0 && (`x${item.quantity}`)}</Text>
					<Text
						style={styles.productPriceText}>{price_string}</Text>
					{item.cannot_order != undefined && item.cannot_order == true && (
						<TouchableOpacity onPress={() => this.onRemoveItem(item)} style={styles.cancelVoucherButton}>
							<Image
								source={require("./../../assets/images/cancel.png")}
								style={styles.cancelImage} />
						</TouchableOpacity>
					)}
					{item.id != last_item.id && (<Image
						source={require("./../../assets/images/group-109-copy.png")}
						style={styles.dottedLineImage} />)}

				</View>
			</View>

		})

		return <View style={styles.drinksViewWrapper}><View style={styles.orderitemsView}>
			{order_items}
		</View>
		</View>
	}

	renderPickupTimeScroll() {
		let { vouchers_to_use, discount, minute_range, hour_range } = this.state
		let { currentMember, selectedShop, cart_total_quantity, cart_total, cart } = this.props

		return <Animated.View style={this.movePickAnimation.getLayout()}>
			<View
				style={styles.popOutPickupView}>
				<View
					style={styles.paymentMethodTwoView}>
					<TouchableOpacity
						onPress={() => this.tooglePickup()}
						style={styles.closeButton}>
						<Image
							source={require("./../../assets/images/x-3.png")}
							style={styles.closeButtonImage} />
					</TouchableOpacity>
					<Text
						style={styles.paymentMethodTwoText}></Text>
					<TouchableOpacity
						onPress={() => this.onConfirmTimePicker()}
						style={styles.pickupConfirmButton}>
						<Text style={styles.pickupConfirmButtonText}>Confirm</Text>
					</TouchableOpacity>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						height: 160 * alpha,
					}}>
					<View
						style={styles.pickupNowView}>
						<TouchableOpacity
							onPress={() => this.onSelectOrderNow()}
							style={styles.pickupNowbuttonButton}>
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
										// height: 18 * alpha,
										marginLeft: 61 * alpha,
										marginRight: 17 * alpha,
										flexDirection: "row",
										alignItems: "center",
									}}>

									<Text
										style={this.state.pick_up_status == "Order Now" ? styles.pickupNowSelectedText : styles.pickupNowText}>Pick Up Now</Text>

									<View
										style={{
											flex: 1,
										}} />
									{
										this.state.pick_up_status == "Order Now" ?
											<View
												style={styles.selectTwoView} />
											: <View
												style={styles.selectView} />
									}
								</View>
							</View>

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
											source={require("./../../assets/images/pickup_now.png")}
											style={this.state.pick_up_status == "Order Now" ? styles.walletSelectImage : styles.walletImage} />
									</View>
								</View>

							</View>

							<View
								style={{
									flex: 1,
								}} />
							<View
								style={styles.menuRowLineView} />
						</TouchableOpacity>
					</View>
					<View
						style={styles.pickLaterView}>
						<TouchableOpacity
							onPress={() => this.onSelectPickLater()}
							style={styles.pickupNowbuttonButton}>
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
										style={this.state.pick_up_status == "Pick Later" ? styles.pickupNowSelectedText : styles.pickupNowText}>Pick Up Later</Text>

									<View
										style={{
											flex: 1,
										}} />
									{
										this.state.pick_up_status == "Pick Later" ?
											<View
												style={styles.selectTwoView} />
											: <View
												style={styles.selectView} />
									}

								</View>


							</View>

						</TouchableOpacity>

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
										source={require("./../../assets/images/pickup_later.png")}
										style={this.state.pick_up_status == "Pick Later" ? styles.walletSelectImage : styles.walletImage} />
								</View>
							</View>


						</View>
					</View>
				</View>
				<View style={styles.menuRowLine2View} />
				<View style={styles.popOutTimePickerView}>
					<View style={styles.timepickerTopBar} />
					<ScrollPicker
						ref={(sphour) => { this.sphour = sphour }}
						dataSource={hour_range}
						selectedIndex={0}
						itemHeight={50 * alpha}
						wrapperHeight={150 * alpha}
						wrapperStyle={{
							backgroundColor: 'transparent',
							flex: 1,
						}}
						renderItem={(data, index, isSelected) => {
							return (
								<TouchableOpacity onPress={console.log()}
									style={styles.timePickerRow}>
									<Text style={isSelected ?
										styles.timePickerSelected
										:
										styles.timePickerUnselected
									}
									>
										{data}
									</Text>
								</TouchableOpacity>
							)
						}}
						onValueChange={(data, selectedIndex) => {

							this.onHourValueChange(hour_range[selectedIndex], selectedIndex);
						}}
					/>
					<ScrollPicker
						ref={(spminute) => { this.spminute = spminute }}
						dataSource={minute_range}
						selectedIndex={0}
						itemHeight={50 * alpha}
						wrapperHeight={150 * alpha}
						wrapperStyle={{
							backgroundColor: 'transparent',
							flex: 1,
						}}
						renderItem={(data, index, isSelected) => {
							return (
								<TouchableOpacity onPress={console.log()}
									style={{
										height: 50 * alpha, alignItems: "center",
										justifyContent: "center",
									}}>
									<Text style={isSelected ?
										styles.timePickerSelected
										:
										styles.timePickerUnselected
									}
									>
										{data}
									</Text>
								</TouchableOpacity>
							)
						}}
						onValueChange={(data, selectedIndex) => {
							this.onMinuteValueChange(minute_range[selectedIndex], selectedIndex);
						}}
					/>
				</View>
				<View style={styles.timepickerBottomBar} />
			</View>

		</Animated.View>
	}

	renderCheckoutReceipt() {
		const { vouchers_to_use, final_price } = this.state
		let { currentMember, selectedShop, cart, promotions } = this.props

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
								style={styles.logoImage} />
							<Text
								style={styles.completedOrderText}>Order Information</Text>
						</View>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							flex: 1,
						}}>

						<View style={styles.locationWrapperView}>
							<View
								style={styles.locationView}>
								<View
									style={styles.branchView}>
									<Text
										style={styles.shopBranchText}>{selectedShop.name}</Text>
									<Text
										numberOfLines={3}
										style={styles.shopBranchAddressText}>{selectedShop.short_address}</Text>
								</View>
								<View
									style={{
										flex: 1,
									}} />
								<View
									style={styles.callView}>
									<TouchableOpacity
										onPress={() => this.onCallPressed(selectedShop.phone_no)}
										style={styles.callIconButton}>
										<Image
											source={require("./../../assets/images/group-3-23.png")}
											style={styles.callIconButtonImage} />
									</TouchableOpacity>
									<View
										style={{
											flex: 1,
										}} />
									<Text
										style={styles.callText}>Call</Text>
								</View>
								<View
									style={styles.directionView}>
									<TouchableOpacity
										onPress={() => this.onDirectionPressed(selectedShop)}
										style={styles.directionIconButton}>
										<Image
											source={require("./../../assets/images/group-3-17.png")}
											style={styles.directionIconButtonImage} />
									</TouchableOpacity>
									<View
										style={{
											flex: 1,
										}} />
									<Text
										style={styles.directionText}>Direction</Text>
								</View>
							</View>
						</View>
						<View style={styles.receiptSectionSeperator}>
							<Image
								source={require("./../../assets/images/curve_in_background.png")}
								style={styles.curve_in} />
							<View
								style={styles.sectionSeperatorView} />
						</View>

						{this.renderOrderItems(cart, promotions)}
						<View style={styles.receiptSectionSeperator}>
							<Image
								source={require("./../../assets/images/curve_in_background.png")}
								style={styles.curve_in} />
							<View
								style={styles.sectionSeperatorView} />
						</View>
						{this.renderVoucherSection(vouchers_to_use)}
						{this.renderPaymentSection()}
						{this.renderPickupTime()}
						<View style={styles.receiptSectionSeperator}>
							<Image
								source={require("./../../assets/images/curve_in_background.png")}
								style={styles.curve_in} />
							<View
								style={styles.sectionSeperatorView} />
						</View>
						<View style={styles.totalViewWrapper}>
							<View
								style={styles.totalView}>
								<Text
									style={styles.totallabelText}>TOTAL</Text>
								<View
									style={{
										flex: 1,
									}} />
								<Text
									style={styles.totalText}>${final_price}</Text>
							</View>

						</View>
					</View>

				</View>
			</ScrollView>
		</View>
	}

	renderPayNow(final_price) {

		return <View
			style={styles.totalPayNowView}>

			<View style={styles.paymentButton}><Text
				style={styles.paymentButtonText}>${final_price}</Text></View>
			<TouchableOpacity
				onPress={() => this.onPayNowPressed()}
				style={styles.payNowButton}>
				<Text
					style={styles.payNowButtonText}>{this.state.selected_payment == "counter" ? 'Order Now' : 'Pay Now'}</Text>
			</TouchableOpacity>
		</View>

	}

	render() {

		let { isPaymentToggle, discount, isPickupToogle, final_price } = this.state
		let { cart_total } = this.props

		return <View
			style={styles.checkoutViewPadding}>
			<ScrollView
				style={styles.scrollviewScrollView}
				onLayout={(event) => this.measureView(event)}>

				<View
					style={styles.ordersummaryView}>
					{this.renderCheckoutReceipt()}
				</View>

			</ScrollView>

			{(isPaymentToggle == true || isPickupToogle == true) && (
				<View style={styles.checkoutViewOverlay} />)}
			{this.renderPayNow(final_price)}
			{this.renderPaymentMethod()}
			{this.renderPickupTimeScroll()}
			<HudLoading isLoading={this.state.loading} />
			<Toast ref="toast" style={{ bottom: (windowHeight / 2) - 40 }}  textStyle={{fontFamily: TITLE_FONT, color: "#ffffff"}} />

			{/* <TimePicker
				ref={ref => {
					this.TimePicker = ref;
				}}
				onCancel={() => this.onCancelTimePicker()}
				maxHour={20}
				minuteInterval={30}
				selectedHour={this.state.selected_hour}
				selectedMinute={this.state.selected_minute}
				onConfirm={(hour, minute) => this.onConfirmTimePicker(hour, minute)}
			/> */}


		</View>
	}
}

const styles = StyleSheet.create({
	couponContent: {
		flexDirection: 'row',
		flex: 1,
		backgroundColor: 'transparent',
		marginHorizontal: 20 * alpha
	},
	voucherInput: {
		flex: 1,
		paddingVertical: 2 * alpha,
		borderTopLeftRadius: 5 * alpha,
		borderBottomLeftRadius: 5 * alpha,
		paddingHorizontal: 5 * alpha,
		backgroundColor: 'white',
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
	},
	applyButton: {
		flex: 0.5,
		borderTopRightRadius: 5 * alpha,
		borderBottomRightRadius: 5 * alpha,
		paddingVertical: 5 * alpha,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: PRIMARY_COLOR
	},
	applyText: {
		// backgroundColor: "transparent",
		color: "white",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",

		// marginBottom: 5 * alpha,
	},
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
		// paddingBottom: (47 + BUTTONBOTTOMPADDING) * alpha,
		flex: 1,
	},
	checkoutViewOverlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		flex: 1,
		position: "absolute",
		top: 0,
		right: 0,
		left: 0,
		bottom: 0
	},
	checkoutViewPadding: {
		backgroundColor: DEFAULT_GREY_BACKGROUND,
		paddingBottom: (47 + BUTTONBOTTOMPADDING) * alpha,
		flex: 1,
	},
	scrollviewScrollView: {
		backgroundColor: "transparent",
		flex: 1,
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
		tintColor: "rgb(70, 76, 84)"
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
		padding: 5 * alpha,
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
		flex: 1,
	},
	paymentButtonText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		marginLeft: 20 * alpha,
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
		fontFamily: TITLE_FONT,
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
		// bottom: (47 + BUTTONBOTTOMPADDING) * alpha,
		bottom: 0 * alpha,
		height: 265 * alpha,
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
		top: 0 * alpha,
		height: 80 * alpha,
	},
	creditCardView: {
		backgroundColor: "transparent",
		// position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 70 * alpha,
		height: 71 * alpha,
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
		fontFamily: TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	balanceText: {
		color: "rgb(0, 178, 227)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 13 * fontAlpha,
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
		width: 40 * alpha,
		height: 40 * alpha,
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
	cardiconView: {
		backgroundColor: "transparent",
		width: 40 * alpha,
		height: 40 * alpha,
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
		fontFamily: TITLE_FONT,
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
		justifyContent: "center",
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
		fontSize: 12 * fontAlpha,
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
	voucherDetailView: {
		backgroundColor: "transparent",
		flex: 1,
		alignItems: "center",
		flexDirection: "row"
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
	productNameDisabledText: {
		backgroundColor: "transparent",
		color: LIGHT_GREY,
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
		fontSize: 13 * fontAlpha,
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
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		width: 55 * alpha,
	},
	productVoucherText: {
		color: "rgb(50, 50, 50)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
	},
	productVoucherDisableText: {
		color: "rgb(163, 163, 163)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
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
		height: 14 * alpha,
		marginTop: -1 * alpha,
		marginBottom: -1 * alpha,
		alignContent: "center",
		justifyContent: "center",
	},

	curve_in: {
		height: 14 * alpha,
		resizeMode: "cover",
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

	menuRowLineView: {
		backgroundColor: "rgb(245, 245, 245)",
		alignSelf: "flex-end",
		width: 375 * alpha,
		// top: 57 * alpha,
		height: 1 * alpha,
		left: 20 * alpha,
	},
	menuRowLine2View: {
		backgroundColor: "rgb(245, 245, 245)",
		width: 375 * alpha,
		height: 1 * alpha,
		left: 20 * alpha,
		position: "absolute",
		alignSelf: "center",
		bottom: 200 * alpha,
	},

	menuRowArrowImage: {
		width: 10 * alpha,
		height: 10 * alpha,
		marginLeft: 5 * alpha,
		marginTop: 4 * alpha,
		tintColor: "rgb(50, 50, 50)",
		resizeMode: "contain",
	},

	voucherButtonView: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 10 * alpha,
		width: 60 * alpha,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 5 * alpha,
		marginLeft: 5 * alpha
	},
	voucherButtonText: {
		color: "white",
		fontFamily: TITLE_FONT,
		fontSize: 10 * alpha,
		textAlign: "center",
		paddingLeft: 5 * alpha,
		paddingRight: 5 * alpha,
	},

	popOutTimePickerView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		bottom: 50 * alpha,
		height: 150 * alpha,
		flexDirection: "row",
	},
	popOutTimePickerViewDone: {
		fontFamily: TITLE_FONT,
		color: PRIMARY_COLOR,
		marginRight: 30 * alpha,
		fontSize: 16 * alpha,
	},
	popOutTimePickerViewCancel: {
		fontFamily: TITLE_FONT,
		color: "rgb(50, 50, 50)",
		marginLeft: 30 * alpha,
		fontSize: 16 * alpha,
	},
	popOutTimePickerOrderNowButton: {
		backgroundColor: PRIMARY_COLOR,
		alignItems: "center",
		justifyContent: "center",
		height: 35 * alpha,
		borderRadius: 10 * alpha,
	},
	popOutTimePickerOrderNow: {
		fontFamily: TITLE_FONT,
		color: "white",
		fontSize: 16 * alpha,
		marginLeft: 10 * alpha,
		marginRight: 10 * alpha,
	},
	timePickerSelected: {
		color: "rgb(54, 54, 54)",
		textAlign: 'center',
		fontSize: 24 * fontAlpha,
		fontFamily: TITLE_FONT,
	},
	timePickerUnselected: {
		color: "rgb(54, 54, 54)",
		textAlign: 'center',
		fontFamily: NON_TITLE_FONT,
		fontSize: 18 * fontAlpha,
	},
	timePickerRow: {
		height: 50 * alpha,
		alignItems: "center",
		justifyContent: "center",
	},
	timepickerTopBar: {
		backgroundColor: "rgb(230, 230, 230)",
		position: "absolute",
		alignSelf: "center",
		flex: 1,
		bottom: 50 * alpha,
		left: 20 * alpha,
		right: 20 * alpha,
		height: 1 * alpha,
	},
	timepickerBottomBar: {
		backgroundColor: "rgb(230, 230, 230)",
		position: "absolute",
		alignSelf: "center",
		flex: 1,
		bottom: 150 * alpha,
		left: 20 * alpha,
		right: 20 * alpha,
		height: 1 * alpha,
	},
	popOutPickupView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		// bottom: (47 + BUTTONBOTTOMPADDING) * alpha,
		bottom: 0 * alpha,
		height: 400 * alpha,
	},

	pickupConfirmButton: {
		backgroundColor: "white",
		borderRadius: 10.5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		right: 12 * alpha,
		top: 19 * alpha,
		// paddingVertical: 10 * alpha
		height: 21 * alpha,
	},
	pickupConfirmButtonText: {
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 15 * alpha,
	},

	pickupNowView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 80 * alpha,
	},
	nowView: {
		backgroundColor: "transparent",
		width: 200 * alpha,
		height: 30 * alpha,

	},
	pickupNowText: {
		backgroundColor: "transparent",
		color: "rgb(186, 183, 183)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	pickupNowSelectedText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
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
	walletImage: {
		resizeMode: "contain",
		tintColor: "rgb(186, 183, 183)",
		backgroundColor: "transparent",
		width: null,
		height: 30 * alpha,
	},
	walletSelectImage: {
		resizeMode: "contain",
		tintColor: PRIMARY_COLOR,
		backgroundColor: "transparent",
		width: null,
		height: 30 * alpha,
	},
	lineImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		alignSelf: "flex-end",
		width: 316 * alpha,
		height: 3 * alpha,
	},
	pickupNowbuttonButton: {
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
	pickLaterView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 80 * alpha,
		height: 80 * alpha,
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
	creditCardSelectImage: {
		resizeMode: "contain",
		tintColor: PRIMARY_COLOR,
		backgroundColor: "transparent",
		width: null,
		height: 30 * alpha,
	},
	creditCardImage: {
		resizeMode: "contain",
		tintColor: "rgb(186, 183, 183)",
		backgroundColor: "transparent",
		width: null,
		height: 30 * alpha,
	},
	creditbuttonButtonImage: {
		resizeMode: "contain",
	},
	pickLaterbuttonButton: {
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
	redCircle: {
		backgroundColor: "red",
		width: 10 * alpha,
		height: 10 * alpha,
		borderRadius: 5 * alpha,
		marginRight: 5 * alpha,
		marginBottom: 5 * alpha,
	},
	greenCircle: {
		backgroundColor: "green",
		width: 10 * alpha,
		height: 10 * alpha,
		borderRadius: 5 * alpha,
		marginRight: 5 * alpha,
		marginBottom: 5 * alpha,
	},
	cancelVoucherButton: {
		width: 15 * alpha,
		height: 15 * alpha,
		marginLeft: 5 * alpha,
	},
	cancelImage: {
		width: 15 * alpha,
		height: 15 * alpha,
		resizeMode: "contain"
	}
})
