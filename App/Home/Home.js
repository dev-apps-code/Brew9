//
//  Home
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {
	Text,
	StyleSheet,
	FlatList,
	Image,
	TouchableOpacity,
	View,
	Animated,
	TouchableHighlight,
	TextInput,
	ScrollView, 
	TouchableWithoutFeedback,
	ActivityIndicator,
	Platform,
	Alert,
	Linking,
	AppState,
	Keyboard	
} from "react-native"
import React from "react"
import Modal from "react-native-modal"
import PushRequestObject from '../Requests/push_request_object'
import { connect } from 'react-redux'
import { createAction, dispatch } from '../Utils/index'
import ProductCell from "./ProductCell"
import CategoryCell from "./CategoryCell"
import BannerCell from "./BannerCell"
import CartCell from "./CartCell"
import CartPromoCell from "./CartPromoCell"
import { alpha, fontAlpha, windowHeight, windowWidth } from "../Common/size"
import ProductRequestObject from "../Requests/product_request_object"
import NearestShopRequestObject from "../Requests/nearest_shop_request_object"
import LogoutRequestObject from "../Requests/logout_request_object.js"
import SwitchSelector from "react-native-switch-selector"
import Toast, {DURATION} from 'react-native-easy-toast'
import ImageViewer from 'react-native-image-zoom-viewer'
import _ from 'lodash'
import AutoHeightImage from 'react-native-auto-height-image'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import MapView from 'react-native-maps';
import openMap from 'react-native-open-maps';
import Brew9Modal from "../Components/Brew9Modal";
import {Notifications} from 'expo';
import CategoryHeaderCell from "./CategoryHeaderCell"
import {TITLE_FONT, NON_TITLE_FONT, TABBAR_INACTIVE_TINT, TABBAR_ACTIVE_TINT, PRIMARY_COLOR, RED, LIGHT_BLUE_BACKGROUND} from "../Common/common_style";
import { select } from "redux-saga/effects"
import { Analytics, PageHit } from 'expo-analytics';
import ProfileRequestObject from '../Requests/profile_request_object'

@connect(({ members, shops, config }) => ({
	currentMember: members.profile,
	company_id: members.company_id,
	location: members.location,
	selectedShop: shops.selectedShop,
	isToggleShopLocation: config.isToggleShopLocation
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
			headerRight: <View
				style={styles.headerRightContainer}>
				<TouchableOpacity
					onPress={params.onQrScanPressed ? params.onQrScanPressed : () => null}
					style={styles.navigationBarItem}>
					<Image
						source={require("./../../assets/images/scan_qr_button.png")}
						style={styles.navigationBarRightItemIcon}/>
				</TouchableOpacity>
			</View>,
		}
	}

	static tabBarItemOptions = ( navigation,store ) => {
	
		return {
			tabBarLabel: "Order",
			tabBarOnPress: ({ navigation, defaultHandler }) => {

				store.dispatch(createAction("config/setToggleShopLocation")(false))
				store.dispatch(createAction("config/setTab")("home"))
				defaultHandler()
			  },
			tabBarIcon: ({ iconTintColor, focused }) => {
				const image = focused 
				? require('./../../assets/images/order_selected_tab.png') 
				: require('./../../assets/images/order_tab.png')

				return <Image
					source={image}
					style={{resizeMode: "contain", width: 30, height: 30 * alpha, tintColor: focused ? TABBAR_ACTIVE_TINT : TABBAR_INACTIVE_TINT }}/>
			},
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			isCartToggle: false,
			page: 1,
			data: [],
			cart: [],
			cart_total: 0,
			cart_total_quantity: 0,
			product_category:[],
			products:[],
			loading: true,
			isRefreshing: false,
			selected_category: 0,
			profile: [],
			menu_banners: [],
			product_view_height: 0 * alpha,
			modalVisible: false,
			selected_index: null,
			select_quantity: 1,
			shop: null,
			delivery:1,
			modalGalleryVisible: true,
			selected_promotion: "",
			isPromoToggle: false,
			ignoreVersion: false,
			appState: AppState.currentState,
			modal_visible: false,
			modal_description: "",
			modal_title: "",
			modal_cancelable: false,
			modal_ok_action: ()=> {this.setState({modal_visible:false})},
			modal_cancel_action: ()=> {this.setState({modal_visible:false})},
			image_isHorizontal: false,
			image_check: false,
			app_url: '',
			first_time_buy: false
		}
		this.moveAnimation = new Animated.ValueXY({ x: 0, y: windowHeight })

	}

	onQrScanPressed = () => {
		const { navigate } = this.props.navigation
		const {currentMember} = this.props

		if (currentMember != null){
			navigate("ScanQr")
		}else{			
			this.setState({
				modal_visible: true, 
				modal_title: "Brew9",
				modal_description: "You need to login before you can topup" , 
				modal_ok_action: ()=> {
					this.setState({modal_visible:false})
					this.props.navigation.navigate("VerifyUserStack")
				},				
			})	
		}
	}

	registerForPushNotificationsAsync = async() => {
		const { status: existingStatus } = await Permissions.getAsync(
		  Permissions.NOTIFICATIONS
		);
		let finalStatus = existingStatus;
	  
		// only ask if permissions have not already been determined, because
		// iOS won't necessarily prompt the user a second time.
		if (existingStatus !== 'granted') {
		  // Android remote notification permissions are granted during the app
		  // install, so this will only ask on iOS
		  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		  finalStatus = status;
		}
	  
		// Stop here if the user did not grant permissions
		if (finalStatus !== 'granted') {
		  return;
		}
	  
		// Get the token that uniquely identifies this device
		let token = await Notifications.getExpoPushTokenAsync();
	  
		// POST the token to your backend server from where you can retrieve it to send push notifications.
		this.loadStorePushToken(token)
	  }

	getLocationAsync = async () => {

		const {dispatch} = this.props

		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			 this.refs.toast.show('Permission to access location was denied')
		}
	
		let location = await Location.getCurrentPositionAsync({});

		dispatch(createAction("members/setLocation")(location));
	  };
	
	  componentDidUpdate(prevProps, prevState) {

		if (prevProps.location != this.props.location && prevProps.location != null) {
		  this.loadShops(false)
		}
	  }

	componentWillMount() {
		if (Platform.OS === 'android') {
			this.setState({
			  errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
			});
		  } else {
			this.getLocationAsync();
		  }
		const { dispatch } = this.props
		
		dispatch(createAction('members/loadCurrentUserFromCache')({}))
	}

	async componentDidMount() {
		Keyboard.dismiss()
		this.props.navigation.setParams({
			onQrScanPressed: this.onQrScanPressed,
		})
		this.loadShops(true)
		AppState.addEventListener('change', this._handleAppStateChange);	
		await this.registerForPushNotificationsAsync()

	}

	componentWillUnmount() {
		this.removeNavigationListener()
		AppState.removeEventListener('change', this._handleAppStateChange);
	}

	_handleAppStateChange = nextAppState => {
		if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
			this.getLocationAsync();
		}
		this.setState({ appState: nextAppState });
	  };


	loadProfile(){
		const { dispatch, currentMember } = this.props
		this.setState({ loading: true })
		const callback = eventObject => {
			console.log("Profile", eventObject)
			if (eventObject.success) {
				this.setState({
					loading: false,
				})
			}
		}
		const obj = new ProfileRequestObject()
		if (currentMember != null){
			obj.setUrlId(currentMember.id)
		}
		
		dispatch(
			createAction('members/loadProfile')({
				object:obj,
				callback,
			})
		)
	}

	loadStorePushToken(token) {
		const { dispatch, currentMember } = this.props
		const callback = eventObject => {
		  if (eventObject.success) {
			
		  }
		}

		if (currentMember != null){
			const obj = new PushRequestObject('device_key', 'device_type', token, Platform.OS)
			obj.setUrlId(currentMember.id)
			dispatch(
				createAction('members/loadStorePushToken')({
				object:obj,
				callback,
				})
			)
		}
	}
	loadShops(loadProducts){

		// console.log("Status", loadProducts)
		const { dispatch,company_id,location } = this.props

		this.setState({ loading: true })
		const callback = eventObject => {
			this.setState({ loading: false })
			if (eventObject.success) {			
					this.setState({
						shop: eventObject.result,
						menu_banners: eventObject.result.menu_banners
					}, function () {
						if (loadProducts){
							this.loadStoreProducts()
						}					
					})		
			}
		}

		var latitude = location != null ? location.coords.latitude : null
		var longitude = location != null ? location.coords.longitude  : null
	
		const obj = new NearestShopRequestObject(latitude, longitude)
		obj.setUrlId(company_id)
		dispatch(
			createAction('shops/loadShops')({
				object:obj,
				callback,
			}
		))
		
	}

	renderPopup(){
		return <Brew9Modal
			title={this.state.modal_title}
			description={this.state.modal_description}
			visible={this.state.modal_visible}
			cancelable={this.state.modal_cancelable}
			okayButtonAction={this.state.modal_ok_action}
			cancelButtonAction={this.state.modal_cancel_action}
		/>
	}

	loadStoreProducts() {

		const { dispatch, company_id } = this.props
		const { menu_banners } =  this.state

		const callback = eventObject => {
			if (eventObject.success) {
				if (eventObject.result.force_upgrade) {

					this.setState({
						modal_visible: true, 
						modal_title: "Brew9",
						modal_description: eventObject.message, 
						modal_cancelable: eventObject.result.force_upgrade, 
						modal_ok_action: ()=> {
							this.setState({modal_visible:false})
							Linking.openURL(this.state.app_url)
						},
						modal_cancel_action: ()=> {
							this.setState({modal_visible:false})
							this.loadStoreProducts()
						},
						app_url:eventObject.result.url
					})								
				} else {
				this.setState({
					data: eventObject.result,
					total: eventObject.total,
					page: this.state.page + 1,
				},function () {
					let data = [...this.state.data]
					// console.log("Data",data)
					var items = []
					var index_length = menu_banners.length
					for(var index in data) {
						data[index].selected = index == 0 ? true : false
						data[index].scroll_index = index_length
						// console.log("Index",data[index])
						items = items.concat(data[index])
						index_length = index_length + 1
						items = items.concat(data[index].products)						
						index_length = index_length + data[index].products.length
					}
					this.setState({
						products: menu_banners.concat(items),
						data: data
					}, function () {
						
					})
				}.bind(this))
			}
			}
			this.setState({
				isRefreshing: false,
				loading: false,
			})
		}
		
			const obj = new ProductRequestObject()
			obj.setUrlId(company_id)
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
		this.loadShops(true)
	}

	onCheckoutPressed = () => {
		const { navigate } = this.props.navigation
		const { navigation } = this.props
		this.navigationListener = navigation.addListener('willFocus', payload => {
			this.removeNavigationListener()
			const { state } = payload
    		const { params } = state
			const { clearCart } = params
			
			if (clearCart) {
				this.onClearPress()
				this.loadProfile()
			}
		})

		navigate("Checkout", {
			cart: this.state.cart,
			cart_total_quantity: this.state.cart_total_quantity,
			cart_total: this.state.cart_total,
			shop: this.state.shop,
			returnToRoute: navigation.state,
			clearCart: false
		})
	}

	removeNavigationListener() {
		if (this.navigationListener) {
		  this.navigationListener.remove()
		  this.navigationListener = null
		}
	}

	onBannerPressed = (item,index) => {
		const { navigate } = this.props.navigation

		this.setState({
			selected_promotion: item.banner_detail_image
		}, function(){
			// console.log(item.banner_detail_image)
			this.setState({
				isPromoToggle: true
			})
		})
	}

	_toggleDelivery = (value) => {
		
		if (value == 1) {
			this.setState({
				modal_visible: true, 
				modal_title: "Brew9",
				modal_description: "Delivery Option Coming Soon", 
				modal_cancelable: false, 
				delivery: value,
				modal_ok_action: ()=> {
					this.setState({
						delivery: 0
					}, function () {
						this.setState({modal_visible:false})
					})
				}
			})
		}
		
	}

	onSelectCategory = (scroll_index, selected_index) => {
		// console.log("Scroll Index", selected_index, scroll_index)

		let data = [...this.state.data]

		this.setState( { data, selected_category: selected_index })
		if (scroll_index < this.state.products.length){
			this.flatListRef.scrollToIndex({animated: true, index: scroll_index})
		}		
	}

	reachProductIndex = ( viewableItems, changed ) => {

		let viewable = viewableItems.viewableItems
		let data = [...this.state.data]

		var first_index = viewable[0].index
		var last_index = viewable[viewable.length-1].index

		for (var index in data) {
			data[index].selected = false
		}

		for (var index in data) {
			var next_index = parseInt(index) + 1
			var second_index = parseInt(first_index) + 1
			if (first_index < data[index].scroll_index && index == 0) {
				data[index].selected = true
				break
			}
			else if (data[parseInt(next_index)]) {
				// console.log("First", first_index, "Previous",data[index].scroll_index)
				if ( second_index >= data[index].scroll_index && second_index < (data[parseInt(next_index)].scroll_index) ) {
					data[index].selected = true
					break
				}
			} else {
				data[data.length-1].selected = true
				break
			}
			
		}
		this.setState( { data })

	}

	onMorePressed = () => {

		const {isToggleShopLocation, dispatch} = this.props

		if (isToggleShopLocation) {
			dispatch(createAction("config/setToggleShopLocation")(false))
		} else {
			dispatch(createAction("config/setToggleShopLocation")(true))
		}
		
	}

	toogleCart = (isUpdate) => {

		const { isCartToggle, product_view_height } = this.state

		var product_checkout_height = product_view_height
		var headerHeight = 31 * alpha
		var height = (this.state.cart.length * 71) * alpha
		var checkoutHeight = 51 * alpha
		var content = headerHeight + height + checkoutHeight
		var finalheight = product_checkout_height - content
		var height_cap = product_view_height * 0.4

		if (finalheight < height_cap) {
			finalheight = height_cap
		}

		if (isUpdate) {
			if(isCartToggle) {
				Animated.spring(this.moveAnimation, {
					toValue: {x: 0, y: this.state.cart.length == 0 ? windowHeight : finalheight},
				}).start()
			}
		} else {
			if (isCartToggle) {
				this.setState({ isCartToggle: false }, function(){
					Animated.spring(this.moveAnimation, {
						toValue: {x: 0, y: windowHeight},
					}).start()
				})
			} else {
				this.setState({ isCartToggle: true }, function(){
					Animated.spring(this.moveAnimation, {
						toValue: {x: 0, y: finalheight},
					}).start()
				})
			}
		}

	}

	measureView(event) {
		this.setState({
			product_view_height: event.nativeEvent.layout.height
		})
	}

	renderPopOutCartFlatListCell = ({ item, index }) => {

		if (item.clazz == "product") {
			return <CartCell
				navigation={this.props.navigation}
				id={item.id}
				name={item.name}
				index={index}
				item={item}
				quantity={item.quantity}
				variations={item.selected_variants}
				// currency={this.props.members.currency}
				onChangeQuantity={this.onChangeQuantityPress}
				price={item.price}
			/>
		} else if (item.clazz == "promotion") {
			return <CartPromoCell
				navigation={this.props.navigation}
				name={item.name}
			/>
		}
		
	}

	renderCategorylistFlatListCell = ({ item, index }) => {
		return <CategoryCell
			navigation={this.props.navigation}
			categoryname={item.name}
			categoryImage={item.image.url}
			categoryDescription={item.description}
			index={index}
			scrollIndex={item.scroll_index}
			onSelectCategory={this.onSelectCategory}
			selected={item.selected}
		/>
	}

	renderProductlistFlatListCell = ({ item, index }) => {

		if (item) {
			if (item.clazz == "product") {
				return <ProductCell
					navigation={this.props.navigation}
					currency={"$"}
					index={index}
					item={item}
					productname={item.name}
					productprice={item.price}
					productimage={item.middle}
					productquantity={item.quantity}
					productsummary={item.summary}
					productvariant={item.variants}
					productenable={item.enabled}
					productstatus={item.status}
					recommended={item.recommended}
					daily_limit={item.product_settings[0].daily_limit}
					productingredient={item.ingredients}
					producttotalquantity={item.total_quantity}
					onChangeQuantity={this.onChangeQuantityPress}
					onCellPress={this.onCellPress}
				/>
			} else if (item.clazz == "menu_banner") {
				return <BannerCell
					index={index}
					item={item}
					navigation={this.props.navigation}
					bannerImage={item.image}
					detailImage={item.banner_detail_image}
					onPressItem={this.onBannerPressed}
				/>
			} else if (item.clazz == "product_category") {
				return <CategoryHeaderCell
					index={index}
					item={item}
					navigation={this.props.navigation}
					categoryName={item.name}
					categoryDescription={item.description}
				/>
			}
		}
	}

	onCellPress = (item, index) => {
		if (this.state.isCartToggle) {
			this.toogleCart(false)
		}
		this.setState({ modalVisible: true, selected_index: index })
	}


	onChangeQuantityPress = (item,index,operation,isCart) => {

		let cart = [...this.state.cart]

		if (isCart) {

			var product_index = this.state.products.findIndex(element => element.id == item.id && element.clazz == 'product')
			var item = this.state.products[product_index]

			var selected_cart = cart[index]

			var cartItem = {
				clazz: item.clazz,
				id: item.id,
				name: item.name,
				description: item.description,
				image: item.image,
				price: selected_cart.price,
				selected_variants: selected_cart.selected_variants,
				quantity: selected_cart.quantity,
			}

			if (operation === "add") {
				if (cartItem.quantity) {
					item.quantity = item.quantity + 1
					cartItem.quantity = cartItem.quantity + 1
					item.total_quantity = item.total_quantity + 1
				} else {
					item.quantity = 1
					cartItem.quantity = 1
				}

				this.state.products[product_index] = item

				if (index >= 0) {
					cart[index] = cartItem
					this.setState({ cart }, function(){
						this.toogleCart(true)
						this.check_promotion_trigger()
					})
				} else {
					this.setState({
						cart: this.state.cart.concat(cartItem)
					}, function(){
						this.toogleCart(true)
						this.check_promotion_trigger()
					})
				}

				this.state.cart_total_quantity = (parseInt(this.state.cart_total_quantity) + 1)
				this.state.cart_total = (parseFloat(this.state.cart_total) + parseFloat(cartItem.price)).toFixed(2)
			} else {

				if (cartItem.quantity > 1) {
					if (item.quantity > 0) item.quantity = item.quantity - 1
					cartItem.quantity = cartItem.quantity - 1
					item.total_quantity = item.total_quantity - 1
				} else {
					item.quantity = null
					cartItem.quantity = null
					item.total_quantity = 0
				}

				this.state.products[product_index] = item

				if (index >= 0) {
					cart[index] = cartItem
					// this.state.cart.splice(cart_index, 1, cartItem)
				}
				if (cartItem.quantity === null) {
					cart.splice(index, 1)
				}
				this.setState({ cart }, function(){
					this.toogleCart(true)
					this.check_promotion_trigger()
				})
				this.state.cart_total_quantity = (parseInt(this.state.cart_total_quantity) - 1)
				this.state.cart_total = (parseFloat(this.state.cart_total) - parseFloat(cartItem.price)).toFixed(2)
			}
			this.forceUpdate()
			
		} else {

			var item = this.state.products[index]

			var cartItem = {
				clazz: item.clazz,
				id: item.id,
				name: item.name,
				description: item.description,
				image: item.image,
				price: item.price,
				quantity: item.quantity,
			}

			var cart_index = cart.findIndex(element => element.id == item.id)

			if (operation === "add") {
				if (item.quantity) {
					item.quantity = item.quantity + 1
					cartItem.quantity = cartItem.quantity + 1
				} else {
					item.quantity = 1
					cartItem.quantity = 1
				}

				this.state.products[index] = item

				if (cart_index >= 0) {
					cart[cart_index] = cartItem
					this.setState({ cart }, function(){this.toogleCart(true)})
				} else {
					this.setState({
						cart: this.state.cart.concat(cartItem)
					}, function(){
						this.toogleCart(true)
					})
				}
				this.state.cart_total_quantity = (parseInt(this.state.cart_total_quantity) + 1)
				this.state.cart_total = (parseFloat(this.state.cart_total) + parseFloat(item.price)).toFixed(2)
			} else {
				if (item.quantity > 1) {
					item.quantity = item.quantity - 1
					cartItem.quantity = cartItem.quantity - 1
				} else {
					item.quantity = null
					cartItem.quantity = null
				}

				this.state.products[index] = item

				if (cart_index >= 0) {
					cart[cart_index] = cartItem
					// this.state.cart.splice(cart_index, 1, cartItem)
				}
				if (item.quantity === null) {
					cart.splice(cart_index, 1)
				}
				this.setState({ cart }, function(){this.toogleCart(true)})
				this.state.cart_total_quantity = (parseInt(this.state.cart_total_quantity) - 1)
				this.state.cart_total = (parseFloat(this.state.cart_total) - parseFloat(item.price)).toFixed(2)
			}

			this.forceUpdate()
		}

	}

	check_promotion_trigger = () => {

		const { shop, cart_total } = this.state

		const { currentMember } = this.props

		let newcart = [...this.state.cart]

		var promotions_item = []

		if (shop.all_promotions != undefined && shop.all_promotions.length > 0) {
			
			for (var index in shop.all_promotions) {

				var promotion = shop.all_promotions[index]

				if (currentMember != null && currentMember.first_time_buyer == false) {

					if (promotion.event_type == "TRIGGER") {
						if (promotion.trigger_price != undefined && promotion.trigger_price > 0) {
							var trigger_price = parseFloat(promotion.trigger_price)
							var remaining = trigger_price - cart_total
			
							const search_cart_promo_index = newcart.findIndex(element => element.name == promotion.cart_text)
			
							if (remaining < 0 && search_cart_promo_index < 0) {
			
								shop.all_promotions[index].has_triggered = true
								let cartItem = {
									clazz: "promotion",
									id: promotion.id,
									name: promotion.cart_text,
									description:  "",
									price: 0.00,
								}
								promotions_item.push(cartItem)
								// console.log("Add", cartItem.name)
								// console.log("Items", promotions_item)
								// // this.setState({
								// // 	cart: newcart.concat(cartItem),
								// // })
							} else if (remaining > 0 && search_cart_promo_index > 0){
								newcart.splice(search_cart_promo_index, 1)
								this.setState({
									cart: newcart
								})
							}
						}
					}
				} else if (currentMember != null && currentMember.first_time_buyer == true) {

					console.log("First Time Promo")
					if (promotion.event_type == "NEVER PURCHASE") {
						if (promotion.trigger_price != undefined && promotion.trigger_price > 0) {
							var trigger_price = parseFloat(promotion.trigger_price)
							var remaining = trigger_price - cart_total
			
							const search_cart_promo_index = newcart.findIndex(element => element.name == promotion.cart_text)
			
							if (remaining < 0 && search_cart_promo_index < 0) {
			
								shop.all_promotions[index].has_triggered = true
								let cartItem = {
									clazz: "promotion",
									id: promotion.id,
									name: promotion.cart_text,
									description:  "",
									price: 0.00,
								}
								promotions_item.push(cartItem)
								// console.log("Add", cartItem.name)
								// console.log("Items", promotions_item)
								// // this.setState({
								// // 	cart: newcart.concat(cartItem),
								// // })
							} else if (remaining > 0 && search_cart_promo_index > 0){
								newcart.splice(search_cart_promo_index, 1)
								this.setState({
									cart: newcart
								})
							}
						}
					}
				}
			}
		}
		// console.log("Items", promotions_item)
		this.setState({
			cart: newcart.concat(promotions_item),
		})
	}

	onAddToCartPressed = (product) => {

		const { shop } = this.state
		let cart = [...this.state.cart]

		const clone_variants = _.cloneDeep(product.selected_variants)
		const search_cart_index = cart.findIndex(element => element.id == product.id && _.isEqual(product.selected_variants, element.selected_variants))

		var search_cart = this.state.cart[search_cart_index]

		let cartItem = {
			clazz: product.clazz,
			id: product.id,
			name: product.name,
			description: product.description,
			image: product.image,
			price: product.calculated_price,
			quantity: this.state.select_quantity,
			selected_variants: clone_variants
		}

		console.log("cart", cartItem)
		

		product.total_quantity = parseInt(product.total_quantity) + parseInt(this.state.select_quantity)

		let total_price = product.calculated_price * this.state.select_quantity

		if (search_cart) {
			search_cart.quantity = parseInt(search_cart.quantity) + parseInt(this.state.select_quantity)
			this.setState({ cart, select_quantity: 1 }, function(){
				this.check_promotion_trigger()
			})
		} else {
			this.setState({
				cart: this.state.cart.concat(cartItem),
				products: this.state.products,
				select_quantity: 1,
			}, function(){
				this.toogleCart(true)
				this.check_promotion_trigger()
			})
		}

		this.setState({
			modalVisible: false,
			cart_total_quantity: (parseInt(this.state.cart_total_quantity) + parseInt(this.state.select_quantity)),
			cart_total: (parseFloat(this.state.cart_total) + parseFloat(total_price)).toFixed(2)
		})
		
	}

	onClosePressed = () => {
		this.setState({ modalVisible: false , isPromoToggle: false, image_check: false})
	}

	onClearPress = () => {
		if (this.state.isCartToggle) {
			this.toogleCart(false)
		}

		this.setState({
			cart_total_quantity: 0,
			cart_total: 0,
			cart:[]
		})
		for (var index in this.state.products) {
			this.state.products[index].quantity = null
			this.state.products[index].total_quantity = 0
		}
		
	}

	onFeaturedPromotionPressed (item) {
		const { navigate } = this.props.navigation

		navigate("FeaturedPromotionDetail", {
			details: item,
		})
	}

	get_product(index) {

		if (index) {
			let product = this.state.products[index]
			if (product) {
				if (product.quantity == null) product.quantity = 1
				if (product.calculated_price == null) product.calculated_price = product.price
				if (product.selected_quantity == null) product.selected_quantity = 1
				if (product.total_quantity == null) product.total_quantity = 0
				if (product.variants) {
					if (product.selected_variants == null) {
						var selected = []
						for (var index in product.variants) {
							var variant = product.variants[index]
							var hasRecommended = false
							var value = null
							for (var index in variant.variant_values) {
								if (hasRecommended == false) {
									value = variant.variant_values[index]
									hasRecommended = variant.variant_values[index].recommended
								}
							}
							if (hasRecommended == false) {
								value = variant.variant_values[0]
							}
							product.calculated_price = (parseFloat(product.calculated_price) + parseFloat(value.price ? value.price : 0.00)).toFixed(2)
							selected.push(value)
						}
						product.selected_variants = selected
					}
				}
				return product
			}
			
		}
		return null

	}

	onVariantPressed = (selected_product, selected_variants, key, selected_value, required) => {

		let selected_item = selected_value
		if (!required && selected_variants[key] === selected_value) {
			selected_item = null
		}
		selected_variants[key] = selected_item
		let filtered = selected_variants.filter(function(el) { return el })
		let total = filtered.reduce((a, b) => +a + +b.price, 0)
		selected_product.calculated_price = (parseFloat(selected_product.price) + parseFloat(total)).toFixed(2)
		this.setState({
			products: this.state.products
		})
	}

	dismissProduct() {
		this.setState({ modalVisible: false})
	}
	
	renderModalContent = (selected_product, shop) => {

		let select_quantity = this.state.select_quantity

		let filtered = selected_product.selected_variants.filter(function(el) { return el })
		let variant_array = filtered.map(a => a.value)	
		
		let order_limit = 100

		if (selected_product.product_settings[0].order_limit) {
			order_limit = selected_product.product_settings[0].order_limit
		}

		var enabled = selected_product.enabled


		if (!shop.is_opened) {
			enabled = false
		}
		
		const ingredients = selected_product.ingredients.map((item, key) => {
			return <View
				style={item.highlight ? styles.ingredientHighlightView : styles.ingredientView}
				key={key}>
				<Text
					style={item.highlight ? styles.ingredientHighlightText : styles.ingredientText}>{item.name}</Text>
			</View>
		})

		const variants = selected_product.variants.map((item, key) => {

			let selected_variants = selected_product.selected_variants
			let required_variant = item.required

			return <View
				style={styles.optionsTwoView}
				key={key}>
				<Text
					style={styles.optiontitleTwoText}>{item.display_name}</Text>
				<View
					style={styles.optionchoiceView}>
					{
						item.variant_values.map((value, value_key) => {

							var selected = selected_variants.includes(value)

							return <TouchableOpacity
								key={value_key}
								onPress={() => this.onVariantPressed(selected_product,selected_variants, key, value, required_variant)}
								style={ selected ? styles.selectedButton : styles.unselectedButton}>
								{ value.recommended && (<Image
									source={require("./../../assets/images/star.png")}
									style={styles.recommendedStarImage}/>)}
								<Text
									style={selected ? styles.selectedButtonText : styles.unselectedButtonText}>{value.value} { value.price > 0 && (`$${value.price}`)}</Text>
							</TouchableOpacity>
						})
					}
				</View>
			</View>
		})

		return <View
			style={styles.popOutView}>
				<View
					style={styles.topbuttonView}>
					{/* <TouchableOpacity
						onPress={this.onFavouritePressed}
						style={styles.favouriteButton}>
						<Image
							source={require("./../../assets/images/group-9-11.png")}
							style={styles.favouriteButtonImage}/>
					</TouchableOpacity> */}
					<TouchableOpacity
						onPress={this.onClosePressed}
						style={styles.closeButton}>
						<Text
							style={styles.closeButtonText}>X</Text>
					</TouchableOpacity>

				</View>
			<View
				style={styles.imageblockView}>
				<Image
					source={{uri : selected_product.image.url}}
					style={styles.productimageImage}/>
			</View>
			<View
				pointerEvents="box-none">				
				<ScrollView
					style={styles.contentScrollView}>
					<View style={styles.productView}>
						<Text
							style={styles.nameText}>{selected_product.name}</Text>
						<View
							style={{
								flex: 1,
							}}/>
							{
								selected_product.ingredients && (
									<View
										pointerEvents="box-none"
										style={{
											alignSelf: "flex-start",
											flex: 1,
											marginLeft: 1 * alpha,
											flexDirection: "row",
											flexWrap: "wrap"
										}}>
										{ingredients}
									</View>
								)
							}
							
							{ (selected_product.description!=null && selected_product.description != '') && (
								<Text style={styles.descriptionText}>{selected_product.description}</Text>
							)}
						</View>
					{variants}
				</ScrollView>
				{
					(selected_product.price > 0.00 && selected_product.price) ?
					<View
						style={styles.bottomView}>
						<View
							style={styles.lineView}/>
						<View
							style={styles.summaryView}>
							<View
								pointerEvents="box-none"
								style={{
									height: 32 * alpha,
									flexDirection: "row",
									// alignItems: "center",
								}}>
								<Text
									style={styles.priceText}>${selected_product.calculated_price ? parseFloat(selected_product.calculated_price).toFixed(2) : 0.00}</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.controlView}>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											alignSelf: "center",
											top: 0 * alpha,
											bottom: 0 * alpha,
											justifyContent: "center",
										}}>
										<Text
											style={styles.quantityText}>{select_quantity}</Text>
									</View>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											left: 0 * alpha,
											right: 0 * alpha,
											top: 0 * alpha,
											height: 23 * alpha,
											flexDirection: "row",
											alignItems: "flex-start",
										}}>
										<TouchableOpacity
											onPress={() => { if (select_quantity > 1) this.setState({select_quantity: select_quantity -= 1}) }}
											style={styles.removeButton}>
											<Image
												source={require("./../../assets/images/button-4.png")}
												style={styles.removeButtonImage}/>
										</TouchableOpacity>
										<View
											style={{
												flex: 1,
											}}/>
										<TouchableOpacity
											onPress={() => { if (select_quantity < order_limit) this.setState({select_quantity: select_quantity += 1}) }}
											style={styles.addButton}>
											<Image
												source={require("./../../assets/images/add-18.png")}
												style={styles.addButtonImage}/>
										</TouchableOpacity>
									</View>
								</View>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.optionsText}>{variant_array.join(", ")}</Text>
						</View>
						<TouchableOpacity
							disabled={!enabled}
							onPress={() => this.onAddToCartPressed(selected_product)}
							style={enabled ? [styles.addToCartButton,styles.normal] : [styles.addToCartButton,styles.disabled] }>
							<Text
								style={styles.addToCartButtonText}>Add to Cart</Text>
						</TouchableOpacity>
					</View>
					: <View style={{height: 10 * alpha}}></View>
				}
				
			</View>


		</View>
	}

	render() {

		let selected_product = this.get_product(this.state.selected_index)
		let {shop,cart,delivery} = this.state
		let {isToggleShopLocation} = this.props
		let categoryBottomSpacer = undefined

		if (shop !== null ){
			if (shop.is_opened == false || shop.shop_busy_template_message != null){
				if (shop.featured_promotion !== null) {
					categoryBottomSpacer = styles.categoryListPosition3
				} else {
					categoryBottomSpacer = styles.categoryListPosition4
				}
			} else {
				if (shop.featured_promotion !== null && cart.length > 0) { //Have Feature Have Cart
					categoryBottomSpacer = styles.categoryListPosition3
				} else if (shop.featured_promotion !== null && cart.length == 0) { //Have Feature No Cart
					categoryBottomSpacer = styles.categoryListPosition2
				} else if (shop.featured_promotion == null && cart.length > 0) { //No Feature Have Cart
					
					categoryBottomSpacer = styles.categoryListPosition2
				} else { //All no
					categoryBottomSpacer = styles.categoryListPosition1
				}
			}
		} else {
			categoryBottomSpacer = styles.categoryListPosition1
		}

		return <View style={styles.page1View}>	
			
			
			<View style={styles.topsectionView}>
				
				<View
					pointerEvents="box-none"
					style={{
						height: 31 * alpha,
						marginLeft: 10 * alpha,
						marginRight: 10 * alpha,
						marginTop: 8 * alpha,
						flexDirection: "row",
					}}>
						
					<View
						style={styles.branchView}>
						{/* <TouchableOpacity
							onPress={this.onBranchPressed}
							style={styles.branchButton}> */}
							<Text
								style={styles.branchButtonText}>{shop ? shop.name : ""}</Text>
							{/* <Image
							source={require("./../../assets/images/group-22.png")}
							style={styles.branchButtonImage}/> */}
						{/* </TouchableOpacity> */}
					</View>
					
					<View
						style={{
							flex: 1,
						}}/>
						<SwitchSelector
							options={[
								{ label: "PickUp", value: 0 },
								{ label: "Delivery", value: 1 }]}
							initial={0}
							value={delivery}
							textColor={"#4E4D4D"}
							selectedColor={"#FFFFFF"}
							buttonColor={"#2A2929"}
							borderColor={"#979797"}
							backgroundColor={"rgb(240,240,240)"}
							style={styles.pickUpDeliveryView}
							textStyle={styles.optionText}
							fontSize={10 * alpha}
							height={32 * alpha}
							onPress={(value) => this._toggleDelivery(value)}
						/>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							height: 14 * alpha,
							marginLeft: 10 * alpha,
							marginRight: 19 * alpha,
							marginTop: 7 * alpha,
							flexDirection: "row",
							alignItems: "flex-start",
						}}>
						<Text
							style={styles.distance1kmText}>Distance {shop ? shop.distance : "0"}km</Text>
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
									style={styles.moreButtonText}>{isToggleShopLocation ? "Hide" : "More"}</Text>
							</TouchableOpacity>
							{ isToggleShopLocation ? 
								<Image
									source={require("./../../assets/images/bitmap-15.png")}
									style={styles.bitmapImage}/> :
								<Image
									source={require("./../../assets/images/bitmap-14.png")}
									style={styles.bitmapImage}/>
							}
							
						</View>
					</View>
					
				</View>
				{this.renderPromotionTopBar(shop, cart)}
				{this.state.loading ? <View style={[styles.loadingIndicator]}><ActivityIndicator size="large" /></View>
					:
					<View
						style={styles.productsectionView}
						onLayout={(event) => this.measureView(event)}>
						<View
							style={[styles.categorylistFlatListViewWrapper]}>
							<FlatList
								renderItem={this.renderCategorylistFlatListCell}
								data={this.state.data}
								style={styles.categorylistFlatList}
								keyExtractor={(item, index) => index.toString()}/>

								<View style={categoryBottomSpacer}/>
								{this.renderFeaturedPromo(shop,cart)}
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.productlistFlatListViewWrapper}>
							{this.state.loading ?
								undefined
								:
							<FlatList
								renderItem={this.renderProductlistFlatListCell}
								data={this.state.products}
								onScrollToIndexFailed={(info) => { /* handle error here /*/ }}
								ref={(ref) => { this.flatListRef = ref }}
								style={styles.productlistFlatList}
								refreshing={this.state.isRefreshing}
								onRefresh={this.onRefresh.bind(this)}
								onViewableItemsChanged={this.reachProductIndex}
								keyExtractor={(item, index) => index.toString()}/>
							}
						</View>						
					</View>
				}
				{ this.props.isToggleShopLocation && (
					<View
					style={styles.showLocationView}>
						
						<MapView
						style={styles.mapImage}
						initialRegion={{
							latitude: shop ? parseFloat(shop.latitude) : 0.0,
							longitude: shop ? parseFloat(shop.longitude) : 0.0,
							latitudeDelta:0.1,
							longitudeDelta:0.1,
						}}					
						onMapReady={() => this.marker && this.marker.showCallout && this.marker.showCallout()}			  
						>
								<MapView.Marker
									ref={marker => (this.marker = marker)}
									coordinate={{
										latitude: shop ? parseFloat(shop.latitude) : 0.0,
										longitude: shop ? parseFloat(shop.longitude) : 0.0,
									}
									}
									title={shop.name}
									description={shop.location}
									/>
							</MapView>
					{/* <View
						style={styles.deliveryView}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0,
								right: 0,
								top: 0,
								bottom: 0,
								alignItems: "flex-start",
							}}>
							<Text
								style={styles.deliveryTwoText}>Delivery</Text>
							<Text
								style={styles.freeWithRm40SpendText}>Free with RM40 spend</Text>
							<Text
								style={styles.deliveredByBrew9Text}>Delivered by Brew9, deliver within 3000m from branch</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.deliverAreaAffectText}>(Deliver area affected by location, weather and other factors,{"\n"}based on the actual distance)</Text>
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
							<Text
								style={styles.deliveryRm5ExtraText}>Delivery RM5 (Extra charge delivery after 21:14)</Text>
						</View>
					</View> */}
					<View
						style={styles.branchInfoView}>
						<Text
							style={styles.branchInfoText}>Branch Info</Text>
						<Text
							style={styles.branchAddress}>Address: {shop ? shop.address : ""}</Text>
						<Text
							style={styles.branchContact}>Contact: {shop ? shop.phone_no : ""}</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.businessHour1000Text}>Business Hour: {shop ? shop.opening_hour.start_time : ""} - {shop ? shop.opening_hour.end_time : ""}</Text>
					</View>
				</View>
				)}
				
				<Animated.View
					style={[styles.cartsummaryviewView,this.moveAnimation.getLayout()]} >
					<View
						style={styles.clearAllView}>
						<TouchableOpacity
							onPress={this.onClearPress}
							style={styles.clearButton}>
							<Image
								source={require("./../../assets/images/group-14-13.png")}
								style={styles.clearButtonImage}/>
							<Text
								style={styles.clearButtonText}>Clear</Text>
						</TouchableOpacity>
					</View>
					<View
						style={styles.popOutCartFlatListViewWrapper}>
						<FlatList							
							renderItem={this.renderPopOutCartFlatListCell}
							data={this.state.cart}
							style={styles.popOutCartFlatList}
							keyExtractor={(item, index) => index.toString()}/>
					</View>
				</Animated.View>
				{this.renderPopup()}
				
			
			<View style={styles.bottomAlertView}>
				{this.renderAlertBar(cart,shop)}
				{this.renderBottomBar(cart,shop)}	
						
			</View>

			
			
			<Toast ref="toast"
				position="center"/>
				{ selected_product ? <Modal isVisible={this.state.modalVisible} onBackdropPress={() => this.dismissProduct()} hideModalContentWhileAnimating={true}>
					{this.renderModalContent(selected_product, shop)}
				</Modal> : null }
			
			{this.renderGallery()}
			
		</View>
	}

	renderAlertBar(cart,shop){	

		const style =  (cart.length > 0)  ? styles.alertViewCart : styles.alertView
		if (shop !== null)  {
			if ( shop.is_opened === false){
				return (
					<View style={style}>
						<Text style={styles.alertViewText}>{shop.alert_message}</Text>
					</View>)
			}

			if (shop.shop_busy_template_message != null){
				const template = shop.shop_busy_template_message.template

				return (
					<View style={style}>
						<Text style={styles.alertViewText}>{template}</Text>
					</View>)
			}
		}
		
		return undefined
	}

	renderFeaturedPromo(shop, cart) {
		let style = undefined

		if (shop !== null ){
			if (shop.is_opened == false || shop.shop_busy_template_message != null){
				if (cart.length > 0 ){
					style = styles.featuredpromoButtonPosition3
				}else{
					style = styles.featuredpromoButtonPosition2
				}
			}else{
				if (cart.length > 0 ){
					style = styles.featuredpromoButtonPosition2
				}else{
					style = styles.featuredpromoButtonPosition1
				}
			}
		}else{
			if (cart.length > 0 ){
				style = styles.featuredpromoButtonPosition2
			}else{
				style = styles.featuredpromoButtonPosition1
			}
		}

		if (shop !== null && shop.featured_promotion !== null) {
			
			return <TouchableOpacity
					onPress={() => this.onFeaturedPromotionPressed(shop.featured_promotion)}
					style={[style,styles.featuredpromoButton]}>
					<Image
						source={{uri: shop.featured_promotion.icon.url}}
						style={styles.featuredpromoButtonImage}/>
				</TouchableOpacity>
		}
		
		return undefined
	}

	renderPromotionTopBar(shop, cart) {

		const {cart_total} = this.state
		const {currentMember} = this.props

		if (cart.length > 0) {
			if (shop.all_promotions != undefined && shop.all_promotions.length > 0) {
				
				var has_promo = false

				const promos = shop.all_promotions.map((item, key) => {

					if (currentMember != null && currentMember.first_time_buyer == false) {
						if (item.event_type == "TRIGGER") {
							var trigger_price = item.trigger_price ? parseFloat(item.trigger_price) : 0.00
							var remaining = trigger_price - cart_total
		
							if (remaining < 0) {
								has_promo = false
								return
							}
		
							var display_text = item.display_text
							var final_text = display_text.replace("$remaining", `$${parseFloat(remaining).toFixed(2)}`);
		
							if (!has_promo) {
								has_promo = true
								return <View style={styles.promotionBarView}
								key={key}>
								<Text
									numberOfLines={2}
									style={styles.promotionTopBarText}>
									{final_text}
								</Text>
							</View>
							}
							return
						}
					} else if (currentMember != null && currentMember.first_time_buyer == true) {

						console.log("First Time Promo")
						if (item.event_type == "NEVER PURCHASE") {
							var trigger_price = item.trigger_price ? parseFloat(item.trigger_price) : 0.00
							var remaining = trigger_price - cart_total
		
							if (remaining < 0) {
								has_promo = false
								return
							}
		
							var display_text = item.display_text
							var final_text = display_text.replace("$remaining", `$${parseFloat(remaining).toFixed(2)}`);
		
							if (!has_promo) {
								has_promo = true
								return <View style={styles.promotionBarView}
								key={key}>
								<Text
									numberOfLines={2}
									style={styles.promotionTopBarText}>
									{final_text}
								</Text>
							</View>
							}
							return
						}
					}
					
				})

				return <View style={styles.promotionTopBarView}>
					{promos}
				</View>
				
			}
		}
		return
	}

	renderBottomBar(cart,shop){
		
		if (cart.length > 0) 
		{
			return(<View
				style={styles.cartView}>
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
						style={styles.totalAmountView}>
						<View
							style={styles.rectangleView}/>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 28 * alpha,
								right: 13 * alpha,
								top: 7 * alpha,
								height: 45 * alpha,
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							<View
								style={styles.shopppingCartView}>
								<TouchableOpacity
									onPress={() => this.toogleCart(false)}
									style={styles.shopppingCartButton}>
									<View
										style={styles.group5View}>
										<View
											pointerEvents="box-none"
											style={{
												width: 15 * alpha,
												marginTop: 1 * alpha,
												marginBottom: 4 * alpha,
											}}>
											<Image
													source={require("./../../assets/images/shopping-bag.png")}
													style={styles.cartImage}/>
										</View>
										<View
											style={{
												flex: 1,
											}}/>
										<Text
											style={styles.shoppingCartText}>Cart</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.totalpriceText}>${this.state.cart_total}</Text>
						</View>
						<View
							style={styles.badgeView}>
							<Text
								style={styles.numberofitemText}>{this.state.cart_total_quantity}</Text>
						</View>
					</View>
				</View>
				<TouchableHighlight
					onPress={this.onCheckoutPressed}
					style={styles.checkoutButton}
					underlayColor='cyan'
					>
					<Text
						style={styles.checkoutButtonText}>Check Out</Text>
				</TouchableHighlight>
			</View>)
		}
		return undefined
	}

	renderGallery() {
		const images = [{
			url: this.state.selected_promotion,
		}]	 
		
		if (this.state.selected_promotion) {
			let image_width = 0
			let image_height = 0
		
			if (this.state.isPromoToggle &&  !this.state.image_check) {
				Image.getSize(this.state.selected_promotion, (width, height) => {
					image_width = width, image_height = height
				
					if (image_width > image_height) {
						this.setState({image_isHorizontal:true, image_check: true})
					} else {
						this.setState({image_isHorizontal:false, image_check: true})
					}
					
				});
			}
			

			return <Modal visible={this.state.isPromoToggle} style={{margin: 0, flex:1, backgroundColor: "rgba(0, 0, 0, 0.8)"}}>		
				{/* <ImageViewer backgroundColor={""} imageUrls={images}/> */}
				<View style={styles.loading}>
					<ActivityIndicator size="large" color="white" />
					</View>
				<ScrollView
            		style={{ horizontal: true, flex: 1}}>
					<View style={this.state.image_isHorizontal ? styles.bannerContainImage : styles.bannerImage} >
						<AutoHeightImage
							source={{uri: this.state.selected_promotion}}
							width={windowWidth}/>
				    </View>         
				</ScrollView>		
				<TouchableOpacity
					onPress={this.onClosePressed}
					style={styles.closeGalleryButton}>
					<Text style={styles.closeGalleryButtonText}>X</Text>
				</TouchableOpacity>
				</Modal>
		}
		
		
	}
			
}

const styles = StyleSheet.create({
	navigationBarItem: {
	},
	loadingIndicator:{
		marginTop: 100 * alpha,
	},
	loading: {
		position: "absolute",
		width: "100%",
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	navigationBarItemIcon: {
		tintColor: "rgb(0, 194, 236)",
	},
	navigationBarRightItemIcon: {
		resizeMode: "contain",
		tintColor: TABBAR_INACTIVE_TINT,
	},
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
	},
	headerRightContainer: {
		flexDirection: "row",
		marginRight: 8 * alpha,
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
		left: 0 * alpha,
		right: 0 * alpha,
		height: 67 * alpha,
		// height: 50 * alpha,
	},
	branchView: {
		backgroundColor: "transparent",
		width: 200 * alpha,
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
		width: 190 * alpha,
		height: 19 * alpha,
		marginTop: 6 * alpha,
	},
	branchButtonText: {
		color: "rgb(99, 97, 97)",
		fontFamily:  TITLE_FONT,
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
		borderRadius: 16 * alpha,
		width: 96 * alpha,
		height: 32 * alpha,
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
	optionText: {
		fontFamily:  NON_TITLE_FONT,
		fontSize: 10 * fontAlpha,
	},
	pickUpText: {
		color: "rgb(253, 253, 253)",
		fontFamily:  NON_TITLE_FONT,
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
		fontFamily:  NON_TITLE_FONT,
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	distance1kmText: {
		backgroundColor: "transparent",
		color: "rgb(188, 181, 181)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
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
		fontFamily:  NON_TITLE_FONT,
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
		flex: 1,
		flexDirection: "row",
	},
	categorylistFlatList: {
		backgroundColor: "transparent",
		width: "100%",
		height: "100%",
	},
	
	categorylistFlatListViewWrapper: {
		width: 85 * alpha,
	},
	categoryListPosition1: {
		height: 0 * alpha
	},
	categoryListPosition2: {
		height: 40 * alpha
	},
	categoryListPosition3: {
		height: 80 * alpha
	},
	categoryListPosition4: {
		height: 30 * alpha
	},
	productlistFlatList: {
		backgroundColor: "white",
		width: "100%",
		height: "100%",
	},
	productlistFlatListViewWrapper: {
		width: 290 * alpha,
		marginBottom: 1 * alpha,
	},
	cartView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		bottom: 0 * alpha,
		height: 60 * alpha,
	},
	bannerImage:{
		flex: 1,
	},
	bannerContainImage: {
		height: windowHeight,
		alignItems: "center",
		justifyContent: "center"
	},
	totalAmountView: {
		backgroundColor: "transparent",
		width: 280 * alpha,
		height: 51 * alpha,
	},
	rectangleView: {
		backgroundColor: "rgb(231, 230, 230)",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 20 * alpha,
		height: 41 * alpha,
	},
	shopppingCartView: {
		backgroundColor: "white",
		borderRadius: 22.5 * alpha,
		width: 102 * alpha,
		height: 35 * alpha,
		justifyContent: "center",
	},
	shopppingCartButton: {
		backgroundColor: "transparent",
		borderRadius: 22.5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		width: 102 * alpha,
		height: 45 * alpha,
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
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * alpha,
		fontStyle: "normal",
		textAlign: "center",
		marginLeft: 10 * alpha,
		backgroundColor: "transparent",
		alignSelf: "center",
	},
	cartImage: {
		resizeMode: "contain",
		width: 20 * alpha,
		height: 20 * alpha,
	},
	totalpriceText: {
		color: "rgb(57, 57, 57)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 18 * alpha,
		fontStyle: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 20 * alpha,
	},
	badgeView: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 10 * alpha,
		borderWidth: 1,
		borderColor: "white",
		borderStyle: "solid",
		position: "absolute",
		left: 113 * alpha,
		top: 0 * alpha,
		height: 20 * alpha,
		flex: 1,
		justifyContent: "center",
	},
	numberofitemText: {
		color: "rgb(255, 251, 251)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
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
		right: 0 * alpha,
		width: 95 * alpha,
		top: 25 * alpha,
		height: 36 * alpha,
	},
	checkoutButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		
		textAlign: "left",
	},
	checkoutButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	cartsummaryviewView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		bottom: 41 * alpha,
		flex: 1,
	},
	clearAllView: {
		backgroundColor: "rgb(245, 245, 245)",
		height: 31 * alpha,
		marginLeft: 1 * alpha,
		marginRight: 1 * alpha,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	clearButtonText: {
		color: "rgb(144, 141, 141)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	clearButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 55 * alpha,
		height: 18 * alpha,
		marginLeft: 15 * alpha,
	},
	clearButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	popOutCartFlatList: {
		backgroundColor: "white",
		width: "100%",
		flex: 1
	},
	popOutCartFlatListViewWrapper: {
		flex: 1,
	},
	popOutView: {
		backgroundColor: "white",
		borderRadius: 11 * alpha,
		position: "absolute",
		width: "100%",
		flex: 1,
	},
	topbuttonView: {
		backgroundColor: "transparent",
		position: 'absolute',
		width: 67 * alpha,
		height: 28 * alpha,
		top: 14 * alpha,
		right: 14 * alpha,
		alignItems: "flex-end",
		zIndex: 999
	},
	favouriteButtonImage: {
		resizeMode: "contain",
	},
	favouriteButtonText: {
		color: "black",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	favouriteButton: {
		backgroundColor: "rgb(191, 191, 191)",
		borderRadius: 14 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 28 * alpha,
		height: 28 * alpha,
		marginRight: 11 * alpha,
	},
	closeButton: {
		backgroundColor: "rgb(191, 191, 191)",
		borderRadius: 12.5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 25 * alpha,
		height: 25 * alpha,
	},
	closeButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	closeButtonText: {
		color: "white",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	closeGalleryButton: {
		backgroundColor: "black",
		borderRadius: 20 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		width: 40 * alpha,
		height: 40 * alpha,
		top: 30 * alpha,
		right: 10 * alpha,
	},
	closeGalleryButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	closeGalleryButtonText: {
		color: "white",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	contentScrollView: {
		backgroundColor: "transparent",
		flex: 1,
		marginTop: 5 * alpha,
		maxHeight: 250 * alpha,
	},
	productView: {
		backgroundColor: "transparent",
		width: "100%",
		flex: 1,
		marginLeft: 19 * alpha,
		marginTop: 20 * alpha,
	},
	nameText: {
		color: "rgb(54, 54, 54)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 17 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 28 * alpha,
	},
	descriptionHeaderText: {
		color: "rgb(167, 167, 167)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 28 * alpha,
		marginTop: 10 * alpha,
	},
	descriptionText: {
		color: "rgb(130, 130, 130)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 28 * alpha,
		marginTop: 5 * alpha,
		marginBottom: 5 * alpha
	},
	ingredientView: {
		backgroundColor: "rgb(245, 245, 245)",
		justifyContent: "center",
		marginRight: 5 * alpha,
		marginTop: 3 * alpha,
	},
	ingredientText: {
		backgroundColor: "transparent",
		color: "rgb(130, 130, 130)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 4 * alpha,
		marginLeft: 4 * alpha,
		marginTop: 4 * alpha,
		marginBottom: 4 * alpha
	  },
	  ingredientHighlightView: {
		backgroundColor: LIGHT_BLUE_BACKGROUND,
		justifyContent: "center",
		marginRight: 5 * alpha,
		marginTop: 3 * alpha,
	},
	ingredientHighlightText: {
		backgroundColor: "transparent",
		color: PRIMARY_COLOR,
		fontFamily: NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 4 * alpha,
		marginLeft: 4 * alpha,
		marginTop: 4 * alpha,
		marginBottom: 4 * alpha
	  },
	
	milkText: {
		color: "rgb(167, 167, 167)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 6 * alpha,
		marginRight: 5 * alpha,
	},
	optionsTwoView: {
		backgroundColor: "transparent",
		marginTop: 5 * alpha,
		marginBottom: 5 * alpha,
		alignItems: "flex-start",
		borderRadius:7.0,
		overflow: "hidden",
	},
	optiontitleTwoText: {
		color: "rgb(141, 141, 141)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 20 * alpha,
	},
	optionchoiceView: {
		backgroundColor: "transparent",
		flexWrap: 'wrap',
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
		marginTop: 2 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	unselectedButton: {
		backgroundColor: "rgb(238, 238, 238)",
		borderRadius: 2 * alpha,
		overflow: "hidden",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		marginBottom: 4 * alpha,
		marginRight: 4 * alpha,
	},
	recommendedStarImage: {
		resizeMode: "contain",
		marginLeft: 4 * alpha,
		marginRight: -4 * alpha,
	},
	unselectedButtonText: {
		color: "rgb(82, 80, 80)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginRight: 4 * alpha,
		marginLeft: 4 * alpha,
		marginTop: 4 * alpha,
		marginBottom: 4 * alpha,
	},
	selectedButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 2 * alpha,
		overflow: "hidden",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		marginBottom: 4 * alpha,
		marginRight: 4 * alpha,
	},
	selectedButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	selectedButtonText: {
		color: "white",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginRight: 4 * alpha,
		marginLeft: 4 * alpha,
		marginTop: 4 * alpha,
		marginBottom: 4 * alpha,
	},
	optionsView: {
		backgroundColor: "transparent",
		width: 270 * alpha,
		height: 87 * alpha,
		marginLeft: 20 * alpha,
		marginTop: 10 * alpha,
		alignItems: "flex-start",
	},
	optiontitleText: {
		color: "rgb(141, 141, 141)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	recommendedButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	recommendedButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 2 * alpha,
		overflow: "hidden",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 85 * alpha,
		height: 28 * alpha,
	},
	recommendedButtonText: {
		color: "white",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	unavailableButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	unavailableButtonText: {
		color: "rgb(201, 201, 201)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	unavailableButton: {
		backgroundColor: "rgba(238, 238, 238, 0.62)",
		borderRadius: 2 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 67 * alpha,
		height: 28 * alpha,
		marginLeft: 12 * alpha,
	},
	choiceThreeButton: {
		backgroundColor: "rgb(238, 238, 238)",
		borderRadius: 2 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 94 * alpha,
		height: 28 * alpha,
	},
	choiceThreeButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	choiceThreeButtonText: {
		color: "rgb(82, 80, 80)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	choiceTwoButton: {
		backgroundColor: "rgb(238, 238, 238)",
		borderRadius: 2 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		marginRight: 10 * alpha,
		marginLeft: 10 * alpha,
		height: 27 * alpha,
	},
	choiceTwoButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	choiceTwoButtonText: {
		color: "rgb(82, 80, 80)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	choiceButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	choiceButton: {
		backgroundColor: "rgb(238, 238, 238)",
		borderRadius: 2 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 66 * alpha,
		height: 27 * alpha,
		marginLeft: 13 * alpha,
	},
	choiceButtonText: {
		color: "rgb(82, 80, 80)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	bottomView: {
		backgroundColor: "transparent",
		height: 113 * alpha,
		justifyContent: "flex-end",
	},
	lineView: {
		backgroundColor: "rgb(151, 151, 151)",
		opacity: 0.29,
		height: 1 * alpha,
		marginBottom: 12 * alpha,
	},
	summaryView: {
		backgroundColor: "transparent",
		height: 37 * alpha,
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
		marginBottom: 12 * alpha,
	},
	priceText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily:  TITLE_FONT,
		fontSize: 21 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "flex-start",
	},
	controlView: {
		backgroundColor: "transparent",
		width: 74 * alpha,
		height: 23 * alpha,
	},
	quantityText: {
		backgroundColor: "transparent",
		color: "rgb(85, 83, 81)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 21 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	removeButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 23 * alpha,
		height: 23 * alpha,
	},
	removeButtonImage: {
		resizeMode: "contain",
	},
	removeButtonText: {
		color: "black",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	addButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "center",
		width: 23 * alpha,
		height: 23 * alpha,
	},
	addButtonText: {
		color: "black",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	addButtonImage: {
		resizeMode: "contain",
	},
	optionsText: {
		backgroundColor: "transparent",
		color: "rgb(141, 141, 141)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "flex-start",
		marginLeft: 1 * alpha,
	},
	normal:{
		backgroundColor: "rgb(0, 178, 227)",
	},
	disabled:{
		backgroundColor: "rgba(0, 178, 227, 0.3)",
	},
	addToCartButton: {
		
		borderRadius: 4 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 36 * alpha,
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
		marginBottom: 15 * alpha,
	},
	addToCartButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	addToCartButtonText: {
		color: "white",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	productimageImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 150 * alpha,
		height: 150 * alpha,
	},
	imageblockView: {
		backgroundColor: "white",
		width: "100%",
		marginTop: 21 * alpha,
		height: 150 * alpha,
		alignItems: "center",
	},
	bottomAlertView:{
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		bottom: 0 * alpha,
		flex: 1,
		width: windowWidth
	},
	alertViewCart:{
		backgroundColor: "darkgray",
		marginBottom:35 * alpha,
		paddingBottom: 10 * alpha,
		// position: "absolute",
		// left: 0 * alpha,
		// right: 0 * alpha,
		// bottom: 60 * alpha,		
	},
	alertView:{
		backgroundColor: "darkgray",
	},
	alertViewTitle:{
		color: "white",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		paddingTop: 10*alpha,
		paddingBottom: 5*alpha,
		alignSelf: "center",
	},
	alertViewText:{
		color: "white",
		fontFamily:  TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		paddingTop: 7 * alpha,
		paddingLeft: 7 * alpha,
		paddingRight: 7 * alpha,
		paddingBottom: 7* alpha,
		alignSelf: "center",
	},
	container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10 * alpha,
	},
	showLocationView: {
		backgroundColor: "white",
		width: "100%",
		height: "100%",
		position: "absolute",
		marginTop: 67 * alpha,
		alignItems: "flex-start",
	},
	deliveryView: {
		backgroundColor: "transparent",
		width: 322 * alpha,
		height: 105 * alpha,
		marginLeft: 14 * alpha,
		marginTop: 7 * alpha,
	},
	deliveryTwoText: {
		backgroundColor: "transparent",
		color: "rgb(55, 55, 55)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	freeWithRm40SpendText: {
		backgroundColor: "transparent",
		color: "rgb(160, 160, 160)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 9 * alpha,
	},
	deliveredByBrew9Text: {
		backgroundColor: "transparent",
		color: "rgb(160, 160, 160)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 19 * alpha,
	},
	deliverAreaAffectText: {
		backgroundColor: "transparent",
		color: "rgb(160, 160, 160)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "stretch",
	},
	deliveryRm5ExtraText: {
		backgroundColor: "transparent",
		color: "rgb(160, 160, 160)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	branchInfoView: {
		backgroundColor: "transparent",
		width: windowWidth - 100 *alpha,
		height: 76 * alpha,
		marginLeft: 10 * alpha,
		marginTop: 25 * alpha,
		alignItems: "flex-start",
	},
	branchInfoText: {
		backgroundColor: "transparent",
		color: "rgb(55, 55, 55)",
		fontFamily:  TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	branchAddress: {
		backgroundColor: "transparent",
		color: "rgb(160, 160, 160)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		lineHeight: 16*alpha,
		marginTop: 9 * alpha,
	},
	branchContact: {
		backgroundColor: "transparent",
		color: "rgb(160, 160, 160)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 3 * alpha,
	},
	businessHour1000Text: {
		backgroundColor: "transparent",
		color: "rgb(160, 160, 160)",
		fontFamily:  NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "stretch",
	},
	featuredpromoButton:{
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		width: 60 * alpha,
		height: 30 * alpha,
		left: 10 * alpha,
	},
	featuredpromoButtonPosition1: {	
		bottom: 10 * alpha,
	},
	featuredpromoButtonPosition2: {	
		bottom: 50 * alpha,	
	},
	featuredpromoButtonPosition3: {
		bottom: 100 * alpha,
	},
	featuredpromoButtonImage: {
		resizeMode: "cover",
		width: "100%",
		height: "100%"
	},
	mapImage: {
		backgroundColor: "blue",
		height: 200 * alpha,
		width: "100%",
	},
	promotionTopBarView: {
		backgroundColor: "transparent"
	},
	promotionBarView: {
		width: "100%",
		height: 32 * alpha,
		backgroundColor: RED,
		justifyContent: "center",
		alignItems: "center",
	},
	promotionTopBarText: {
		fontFamily: TITLE_FONT,
		color: "white",
		fontSize: 10 * alpha,
		alignSelf: "center",
		paddingLeft: 10 * alpha,
		paddingRight: 10 * alpha,
	}
})