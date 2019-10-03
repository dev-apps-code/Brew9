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
} from "react-native"
import React from "react"
import Modal from "react-native-modal"
import PushRequestObject from '../Requests/push_request_object'
import { connect } from 'react-redux'
import { createAction } from '../Utils/index'
import ProductCell from "./ProductCell"
import CategoryCell from "./CategoryCell"
import BannerCell from "./BannerCell"
import CartCell from "./CartCell"
import { alpha, fontAlpha, windowHeight, windowWidth } from "../common/size"
import ProductRequestObject from "../Requests/product_request_object"
import NearestShopRequestObject from "../Requests/nearest_shop_request_object"
import SwitchSelector from "react-native-switch-selector"
import Toast, {DURATION} from 'react-native-easy-toast'
import _ from 'lodash'

@connect(({ members }) => ({
	members: members.profile,
	company_id: members.company_id
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
		}
	}

	static tabBarItemOptions = ({ navigation }) => {
	
		return {
				tabBarLabel: "Order",
				tabBarIcon: ({ iconTintColor, focused }) => {
					const image = focused 
					? require('./../../assets/images/menu_selected.png') 
					: require('./../../assets/images/menu.png')
	
					return <Image
						source={image}
						style={{resizeMode: "contain", width: 30 * alpha, height: 30 * alpha}}/>
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
			banners: [],
			product_view_height: 0 * alpha,
			modalVisible: false,
			selected_index: null,
			select_quantity: 1,
			shop: null,
		}
		this.moveAnimation = new Animated.ValueXY({ x: 0, y: windowHeight })
	}

	componentWillMount() {
		// const { dispatch } = this.props
		// dispatch(createAction('members/loadCurrentUserFromCache')({}))
	}

	componentDidMount() {
		this.loadShops()
		// this.loadStorePushToken()
	}

	loadStorePushToken() {
		const { dispatch, members } = this.props
		const callback = eventObject => {
		  if (eventObject.success) {
			
		  }
		}

		if (members != null){
			const obj = new PushRequestObject('device_key', 'device_type', 'push_identifier', "os")
			obj.setUrlId(members.id)
			dispatch(
				createAction('members/loadStorePushToken')({
				object:obj,
				callback,
				})
			)
		}
		
	
	}

	loadShops(){
		const { dispatch,company_id } = this.props

		this.setState({ loading: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					shop: eventObject.result,
					products: this.state.products.concat(eventObject.result.menu_banners)
				}, function () {

					this.loadStoreProducts()
				})
			}
		}
		//Hardcoded
		var latitude = 11.0
		var longitude = 11.0
	
		const obj = new NearestShopRequestObject(latitude, longitude)
		obj.setUrlId(company_id)
		dispatch(
			createAction('shops/loadShops')({
				object:obj,
				callback,
			}
		))
		
	}

	loadStoreProducts() {

		const { dispatch, company_id } = this.props
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					data: this.state.data.concat(eventObject.result),
					total: eventObject.total,
					page: this.state.page + 1,
				},function () {
					var items = []
					var index_length = this.state.products.length
					for(var index in this.state.data) {

						this.state.data[index].selected = index == 0 ? true : false
						this.state.data[index].scroll_index = index_length
						items = items.concat(this.state.data[index].products)
						index_length = index_length + this.state.data[index].products.length
					}
					this.setState({
						products: this.state.products.concat(items)

					}, function () {
					})
				}.bind(this))
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
		this.loadShops()
	}

	onCheckoutPressed = () => {
		const { navigate } = this.props.navigation
		navigate("Checkout", {
			cart: this.state.cart,
			cart_total_quantity: this.state.cart_total_quantity,
			cart_total: this.state.cart_total,
			shop: this.state.shop,
		})
	}

	onBannerPressed = (item,index) => {
		const { navigate } = this.props.navigation

		navigate("BannerView", {
			image_url: item.banner_detail_image
		})
	}

	_toggleDelivery = (value) => {
		this.setState({
			delivery_options: 0
		})
		if (value) {
			this.refs.toast.show("Delivery Option Coming Soon");
		}
	}

	onSelectCategory = (scoll_index, selected_index) => {
		this.flatListRef.scrollToIndex({animated: true, index: scoll_index})
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
			if ( data[index].scroll_index >= first_index && data[index].scroll_index <= last_index ) {
				data[index].selected = true
				break
			}
		}
		this.setState( { data })

	}

	_toggleCart = (isUpdate) => {

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
	}

	renderCategorylistFlatListCell = ({ item, index }) => {
		return <CategoryCell
			navigation={this.props.navigation}
			categoryname={item.name}
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
					currency={"BND"}
					index={index}
					item={item}
					productname={item.name}
					productprice={item.price}
					productimage={item.image.thumb.url}
					productquantity={item.quantity}
					productdescription={item.description}
					productvariant={item.variants}
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
					onPressItem={this.onBannerPressed}
				/>
			}
		}
	}

	onCellPress = (item, index) => {
		if (this.state.isCartToggle) {
			this._toggleCart(false)
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
					this.setState({ cart }, function(){this._toggleCart(true)})
				} else {
					this.setState({
						cart: this.state.cart.concat(cartItem)
					}, function(){
						this._toggleCart(true)
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
				this.setState({ cart }, function(){this._toggleCart(true)})
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
					this.setState({ cart }, function(){this._toggleCart(true)})
				} else {
					this.setState({
						cart: this.state.cart.concat(cartItem)
					}, function(){
						this._toggleCart(true)
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
				this.setState({ cart }, function(){this._toggleCart(true)})
				this.state.cart_total_quantity = (parseInt(this.state.cart_total_quantity) - 1)
				this.state.cart_total = (parseFloat(this.state.cart_total) - parseFloat(item.price)).toFixed(2)
			}

			this.forceUpdate()
		}

	}

	onAddToCartPressed = (product) => {

		let cart = [...this.state.cart]

		this.setState({
			modalVisible: false,
		})

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

		product.total_quantity = parseInt(product.total_quantity) + parseInt(this.state.select_quantity)

		let total_price = product.calculated_price * this.state.select_quantity

		if (search_cart) {
			search_cart.quantity = parseInt(search_cart.quantity) + parseInt(this.state.select_quantity)
			this.setState({ cart, select_quantity: 1 })
		} else {
			this.setState({
				cart: this.state.cart.concat(cartItem),
				products: this.state.products,
				select_quantity: 1,
			}, function(){
				this._toggleCart(true)
			})
		}
		this.state.cart_total_quantity = (parseInt(this.state.cart_total_quantity) + parseInt(this.state.select_quantity))
		this.state.cart_total = (parseFloat(this.state.cart_total) + parseFloat(total_price)).toFixed(2)
	}

	onClosePressed = () => {
		this.setState({ modalVisible: false })
	}

	onClearPress = () => {
		if (this.state.isCartToggle) {
			this._toggleCart(false)
		}
		this.state.cart = []
		for (var index in this.state.products) {
			this.state.products[index].quantity = null
			this.state.products[index].total_quantity = 0
		}
	}

	get_product(index) {

		if (index) {
			let product = this.state.products[index]
			if (product.quantity == null) product.quantity = 1
			if (product.calculated_price == null) product.calculated_price = product.price
			if (product.selected_quantity == null) product.selected_quantity = 1
			if (product.total_quantity == null) product.total_quantity = 0
			if (product.variants) {
				if (product.selected_variants == null) {
					var selected = []
					for (var index in product.variants) {
						var variant = product.variants[index]
						var value = variant.required ? variant.variant_values[0] : null
						selected.push(value)
					}
					product.selected_variants = selected
				}
			}
			return product
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

	renderModalContent = (selected_product) => {

		let select_quantity = this.state.select_quantity

		let filtered = selected_product.selected_variants.filter(function(el) { return el })
		let variant_array = filtered.map(a => a.value)

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
								style={ selected ? styles.selectedButton : styles.choiceFourButton}>
								<Text
									style={selected ? styles.selectedButtonText : styles.choiceFourButtonText}>{value.value} { value.price > 0 && (`$${value.price}`)}</Text>
							</TouchableOpacity>
						})
					}
				</View>
			</View>
		})

		return <View
			style={styles.popOutView}>
			<View
				style={styles.imageblockView}>
				<Image
					source={{uri : selected_product.image.url}}
					style={styles.productimageImage}/>
			</View>
			<View
				pointerEvents="box-none"
				style={{
					position: "absolute",
					left: 0 * alpha,
					right: 0 * alpha,
					top: 13 * alpha,
					bottom: 0 * alpha,
				}}>
				<View
					style={styles.topbuttonView}>
					{/*<TouchableOpacity*/}
					{/*	onPress={this.onFavouritePressed}*/}
					{/*	style={styles.favouriteButton}>*/}
					{/*	<Image*/}
					{/*		source={require("./../../assets/images/group-9-11.png")}*/}
					{/*		style={styles.favouriteButtonImage}/>*/}
					{/*</TouchableOpacity>*/}
					<TouchableOpacity
						onPress={this.onClosePressed}
						style={styles.closeButton}>
						<Text
							style={styles.closeButtonText}>X</Text>
					</TouchableOpacity>

				</View>
				<ScrollView
					style={styles.contentScrollView}>
					<View
						style={styles.productView}>
						<Text
							style={styles.nameText}>{selected_product.name}</Text>
						<View
							style={{
								flex: 1,
							}}/>
						{/*<View*/}
						{/*	pointerEvents="box-none"*/}
						{/*	style={{*/}
						{/*		alignSelf: "flex-start",*/}
						{/*		width: 76 * alpha,*/}
						{/*		height: 14 * alpha,*/}
						{/*		marginLeft: 1 * alpha,*/}
						{/*		flexDirection: "row",*/}
						{/*		alignItems: "flex-end",*/}
						{/*	}}>*/}
						{/*	<View*/}
						{/*		style={styles.ingredientView}>*/}
						{/*		<Text*/}
						{/*			style={styles.alcoholText}>Alcohol</Text>*/}
						{/*	</View>*/}
						{/*	<View*/}
						{/*		style={styles.ingredientTwoView}>*/}
						{/*		<Text*/}
						{/*			style={styles.milkText}>Milk</Text>*/}
						{/*	</View>*/}
						{/*</View>*/}
					</View>
					{variants}
				</ScrollView>
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
								alignItems: "center",
							}}>
							<Text
								style={styles.priceText}>${selected_product.calculated_price}</Text>
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
										onPress={() => { this.setState({select_quantity: select_quantity += 1}) }}
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
						onPress={() => this.onAddToCartPressed(selected_product)}
						style={styles.addToCartButton}>
						<Text
							style={styles.addToCartButtonText}>Add to Cart</Text>
					</TouchableOpacity>
				</View>
			</View>


		</View>
	}

	render() {

		let selected_product = this.get_product(this.state.selected_index)
		let {shop,cart} = this.state

		return <View
			style={styles.page1View}>
			<View
			style={styles.topsectionView}>
			<View
				pointerEvents="box-none"
				style={{
					height: 31 * alpha,
					marginLeft: 10 * alpha,
					marginRight: 10 * alpha,
					marginTop: 8 * alpha,
					flexDirection: "row",
					alignItems: "flex-start",
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
						textColor={"#4E4D4D"}
						selectedColor={"#FFFFFF"}
						buttonColor={"#2A2929"}
						borderColor={"#979797"}
						backgroundColor={"#D8D8D8"}
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
						marginLeft: 14 * alpha,
						marginRight: 19 * alpha,
						marginTop: 7 * alpha,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					{/* <Text
						style={styles.distance1kmText}>Distance 1km</Text> */}
					{/* <View
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
					</View> */}
				</View>
			</View>
			<View
				style={styles.productsectionView}
				onLayout={(event) => this.measureView(event)}>
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
					{this.state.loading ?
						<View style={[styles.container, styles.horizontal]}>
							<ActivityIndicator size="large" />
						</View>
						:
					<FlatList
						renderItem={this.renderProductlistFlatListCell}
						data={this.state.products}
						ref={(ref) => { this.flatListRef = ref }}
						style={styles.productlistFlatList}
						refreshing={this.state.isRefreshing}
						onRefresh={this.onRefresh.bind(this)}
						onViewableItemsChanged={this.reachProductIndex}
						keyExtractor={(item, index) => index.toString()}/>
					}
				</View>
			</View>

			<Animated.View
				style={[styles.cartsummaryviewView,this.moveAnimation.getLayout()]}
			>
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
			{this.renderBottomBar(shop,cart)}			
			
			{ selected_product ? <Modal isVisible={this.state.modalVisible} >
				{this.renderModalContent(selected_product)}
			</Modal> : null }
		</View>
	}

	renderBottomBar(shop,cart){
		// if (shop !== null && shop.is_opened === false)  {
		// return (
		// 	<View style={styles.bottomAlertView}>
		// 		<Text style={styles.alertViewText}>{shop.alert_message}</Text>
		// 	</View>)
		// }
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
								left: 38 * alpha,
								right: 13 * alpha,
								top: 5 * alpha,
								height: 45 * alpha,
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							<View
								style={styles.shopppingCartView}>
								<TouchableOpacity
									onPress={() => this._toggleCart(false)}
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
											<View
												pointerEvents="box-none"
												style={{
													position: "absolute",
													left: 0 * alpha,
													top: 0 * alpha,
													bottom: 0 * alpha,
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
													left: 3 * alpha,
													width: 9 * alpha,
													top: 0 * alpha,
													bottom: 2 * alpha,
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
				<TouchableOpacity
					onPress={this.onCheckoutPressed}
					style={styles.checkoutButton}>
					<Text
						style={styles.checkoutButtonText}>Checkout</Text>
				</TouchableOpacity>
			</View>)
		}
		return undefined
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
		left: 0 * alpha,
		right: 0 * alpha,
		// height: 67 * alpha,
		height: 50 * alpha,
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
		marginRight: 10 * alpha,
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
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
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
		left: 0 * alpha,
		right: 0 * alpha,
		top: 50 * alpha,
		// top: 0 * alpha,
		bottom: 0 * alpha,
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
		left: 0 * alpha,
		right: 0 * alpha,
		bottom: 0 * alpha,
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
		left: 0 * alpha,
		right: 0 * alpha,
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
		fontFamily: "Helvetica-Bold",
		fontSize: 11 * alpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginLeft: 10 * alpha,
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
		borderRadius: 10 * alpha,
		borderWidth: 1,
		borderColor: "white",
		borderStyle: "solid",
		position: "absolute",
		left: 123 * alpha,
		right: 137 * alpha,
		top: 0 * alpha,
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
		right: 0 * alpha,
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
	cartsummaryviewView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		bottom: 51 * alpha,
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
		fontFamily: "Helvetica",
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
		height: "70%",
	},
	topbuttonView: {
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 67 * alpha,
		height: 28 * alpha,
		marginRight: 14 * alpha,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "flex-start",
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
		backgroundColor: "rgb(193, 191, 191)",
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
		backgroundColor: "rgb(193, 191, 191)",
		borderRadius: 14 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 28 * alpha,
		height: 28 * alpha,
	},
	closeButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	closeButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	contentScrollView: {
		backgroundColor: "transparent",
		flex: 1,
		marginTop: 130 * alpha,
	},
	productView: {
		backgroundColor: "transparent",
		width: "100%",
		height: 22 * alpha,
		marginLeft: 19 * alpha,
		marginTop: 25 * alpha,
	},
	nameText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 28 * alpha,
	},
	ingredientView: {
		backgroundColor: "rgb(245, 245, 245)",
		width: 39 * alpha,
		height: 14 * alpha,
		justifyContent: "center",
	},
	alcoholText: {
		backgroundColor: "transparent",
		color: "rgb(167, 167, 167)",
		fontFamily: "Helvetica",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 5 * alpha,
		marginRight: 4 * alpha,
	},
	ingredientTwoView: {
		backgroundColor: "rgb(245, 245, 245)",
		width: 27 * alpha,
		height: 14 * alpha,
		marginLeft: 10 * alpha,
		justifyContent: "center",
	},
	milkText: {
		color: "rgb(167, 167, 167)",
		fontFamily: "Helvetica",
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
		width: 334 * alpha,
		flex: 1,
		marginTop: 10 * alpha,
		alignItems: "flex-start",
	},
	optiontitleTwoText: {
		color: "rgb(141, 141, 141)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 20 * alpha,
	},
	optionchoiceView: {
		backgroundColor: "transparent",
		alignSelf: "stretch",
		flex: 1,
		flexWrap: 'wrap',
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
		marginTop: 7 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	choiceFourButton: {
		backgroundColor: "rgb(238, 238, 238)",
		borderRadius: 2 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		flex: 1,
		height: 28 * alpha,
		marginRight: 9 * alpha,
		marginBottom: 4 * alpha,
		marginTop: 1 * alpha,
	},
	choiceFourButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	choiceFourButtonText: {
		color: "rgb(82, 80, 80)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	selectedButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 2 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		flex: 1,
		height: 28 * alpha,
		marginRight: 9 * alpha,
		marginBottom: 4 * alpha,
		marginTop: 1 * alpha,
	},
	selectedButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	selectedButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
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
		fontFamily: "Helvetica",
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
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 85 * alpha,
		height: 28 * alpha,
	},
	recommendedButtonText: {
		color: "white",
		fontFamily: "Helvetica",
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
		fontFamily: "Helvetica",
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
		fontFamily: "Helvetica",
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
		width: 84 * alpha,
		height: 27 * alpha,
	},
	choiceTwoButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	choiceTwoButtonText: {
		color: "rgb(82, 80, 80)",
		fontFamily: "Helvetica",
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
		fontFamily: "Helvetica",
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
		fontFamily: "Helvetica",
		fontSize: 18 * fontAlpha,
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
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
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
		fontFamily: "Helvetica-Oblique",
		fontSize: 8 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "flex-start",
		marginLeft: 1 * alpha,
	},
	addToCartButton: {
		backgroundColor: "rgb(0, 178, 227)",
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
		fontFamily: "Helvetica",
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
		position: "absolute",
		width: "100%",
		top: 21 * alpha,
		height: 150 * alpha,
		alignItems: "center",
	},
	bottomAlertView:{
		backgroundColor: "rgb(0, 178, 227)",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		bottom: 0 * alpha,	
		width:windowWidth
	},
	alertViewText:{
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		paddingTop: 10*alpha,
		paddingBottom: 10*alpha,
		alignSelf: "center",
	}
})