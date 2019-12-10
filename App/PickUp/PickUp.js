//
//  PickUp
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { StyleSheet, View, Image, TouchableOpacity, Text, Linking, ActivityIndicator, RefreshControl, AppState, Modal, TouchableWithoutFeedback } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowWidth, windowHeight } from "../Common/size";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from 'react-redux'
import GetCurrentOrderRequestObject from '../Requests/get_current_order_request_object'
import ProfileRequestObject from '../Requests/profile_request_object'
import { createAction } from '../Utils/index'
import openMap from 'react-native-open-maps';
import { TITLE_FONT, NON_TITLE_FONT, TABBAR_INACTIVE_TINT, TABBAR_ACTIVE_TINT, PRIMARY_COLOR, LIGHT_BLUE } from "../Common/common_style";
import Moment from 'moment';
import NotificationsRequestObject from "../Requests/notifications_request_object";
import { LinearGradient } from 'expo-linear-gradient';

@connect(({ members, shops, config }) => ({
	currentMember: members.profile,
	company_id: members.company_id,
	location: members.location,
	selectedShop: shops.selectedShop,
	selectedTab: config.selectedTab
}))
export default class PickUp extends React.Component {

	static navigationOptions = ({ navigation }) => {
		// const {dispatch} = this.props
		const { params = {} } = navigation.state
		return {
			title: "Your Order",
			headerTintColor: "black",
			headerLeft: null,
			headerRight: null,
			headerTitleStyle: {
				textAlign: "center",
				flex: 1
			},
		}
	}

	static tabBarItemOptions = (navigation, store) => {

		return {
			tabBarLabel: "Order",
			tabBarOnPress: ({ navigation, defaultHandler }) => {
				store.dispatch(createAction("config/setToggleShopLocation")(false))
				store.dispatch(createAction("config/setTab")("pickup"))
				defaultHandler()
			},
			tabBarIcon: ({ iconTintColor, focused }) => {
				const image = focused
					? require('./../../assets/images/pickup_selected_tab.png')
					: require('./../../assets/images/pickup_tab.png')

				return <Image
					source={image}
					style={{ resizeMode: "contain", width: 30, height: 30 * alpha, tintColor: focused ? TABBAR_ACTIVE_TINT : TABBAR_INACTIVE_TINT }} />
			},
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			current_order: [],
			refreshing: false,
			appState: AppState.currentState,
			popUp: false
		}
	}

	componentDidMount() {
		this.loadCurrentOrder()
		const { currentMember } = this.props
		const { navigation } = this.props
		AppState.addEventListener('change', this._handleAppStateChange);
		this.navigationListener = navigation.addListener('willFocus', payload => {
			if (currentMember != null) {
				this.loadCurrentOrder();
			}
		})
		// this.setState({ popUp: true })

	}

	componentWillUnmount() {
		this.removeNavigationListener()
		AppState.removeEventListener('change', this._handleAppStateChange);
	}

	_handleAppStateChange = nextAppState => {
		const { currentMember } = this.props
		if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {


		}
		this.setState({ appState: nextAppState });
	};


	removeNavigationListener() {
		if (this.navigationListener) {
			this.navigationListener.remove()
			this.navigationListener = null
		}
	}

	componentDidUpdate(prevProps, prevState) {

		if (prevProps.selectedTab != this.props.selectedTab) {
			this.loadCurrentOrder()
		}
	}

	onOrderHistoryPressed = () => {

		const { navigate } = this.props.navigation
		navigate("OrderHistory")

	}

	onCallPressed = (phone_no) => {
		Linking.openURL(`tel:${phone_no}`)
	}

	onOrderPressed = () => {
		const { navigate } = this.props.navigation

		navigate("Home")
	}

	loadCurrentOrder() {
		const { dispatch, currentMember } = this.props

		if (currentMember != null) {
			this.setState({ loading: true })
			const callback = eventObject => {
				if (eventObject.success) {
					this.setState({
						current_order: eventObject.result
					})
				}
				this.setState({
					loading: false,
					refreshing: false,
				})
			}
			const obj = new GetCurrentOrderRequestObject()
			obj.setUrlId(currentMember.id)
			dispatch(
				createAction('members/loadCurrentOrder')({
					object: obj,
					callback,
				})
			)
		}
	}

	renderQueueView(current_order) {
		const queues = current_order.map((item, key) => {

			let cart_total = parseFloat(item.total) + parseFloat(item.discount)
			var progress = item.status == "pending" ? 0.33 : item.status == "processing" ? 0.66 : item.status == "ready" ? 1 : 0

			const order_items = item.order_items.map((item, key) => {

				var price_string = item.total_price != undefined && item.total_price > 0 ? `$${item.total_price}` : item.total_price != undefined && item.total_price == 0 ? "Free" : ""

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
								style={styles.productNameText}>{item.product_name}</Text>
							{(item.variations != null && item.variations != "") ?
								<Text
									style={styles.productVariantText}>{item.variations}</Text> :
								<View style={styles.spacer} />
							}
						</View>
						<Text
							style={styles.productQuantityText}>x{item.quantity}</Text>

						<Text
							style={styles.productPriceText}>{price_string}</Text>
						{item.order_items != null && key < item.order_items.length - 1 && (<Image
							source={require("./../../assets/images/group-109-copy.png")}
							style={styles.dottedLineImage} />)}
					</View>
				</View>


			})

			const voucher_items = item.voucher_items.map((item, key) => {

				var voucher_discount = ''

				if (item.voucher.discount_type == "fixed") {
					voucher_discount = `-$${item.voucher.discount_price}`
				} else if (item.voucher.discount_type == "percent") {
					voucher_discount = `-$${parseFloat(cart_total * (item.voucher.discount_price / 100)).toFixed(2)}`

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
							<Text
								style={styles.productNameText}>{item.voucher.name}</Text>

							<View style={styles.spacer} />

						</View>

						<Text
							style={styles.productPriceText}>{voucher_discount}</Text>
						{item.voucher_items != null && key < item.voucher_items.length - 1 && (<Image
							source={require("./../../assets/images/group-109-copy.png")}
							style={styles.dottedLineImage} />)}
					</View>
				</View>


			})

			return <View
				style={styles.pickUpQueueView}
				key={key}>
				<View
					pointerEvents="box-none"
					style={{
						alignSelf: "flex-start",
						flex: 1,
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
				<View style={styles.queueView}>
					<TouchableOpacity style={styles.updateOrder} onPress={() => { this.onEditOrder(current_order) }}>
						<Text>Update Order</Text>
					</TouchableOpacity>
					<View
						style={[styles.queueView, { alignItems: 'center' }]}>

						<View
							pointerEvents="box-none"
							style={{
								flex: 1,
								marginTop: 19 * alpha,
								flexDirection: "row",
							}}>

							<View style={styles.queueHeaderBlock}>
								<Text
									style={styles.queueheaderText}>Order Number</Text>
								<Text
									style={styles.queuenumberText}>{item.queue_no}</Text>
							</View>
							<View style={styles.queueHeaderBlock}>
								<Text
									style={styles.pickupTimeheaderText}>{item.pickup_status == "Order Now" ? "Order Time" : "Pick Up"}</Text>
								<View style={{ flexDirection: "row" }} >
									<Text
										style={styles.pickupTimeText}>{Moment(item.pickup_time, "HH:mm").format('h:mm')}<Text
											style={styles.pickupTimeAMPMText}>{Moment(item.pickup_time, "HH:mm").format('A')}</Text></Text>

								</View>
							</View>
						</View>
						<View
							style={styles.progressView}>
							<View
								style={styles.orderedView}>
								<Image
									source={require("./../../assets/images/group-9-copy-13.png")}
									style={item.status === "pending" ? styles.orderedSelectedImage : styles.orderedImage} />
								<View
									style={{
										flex: 1,
									}} />
								<Text
									style={item.status === "pending" ? styles.orderedSelectedText : styles.orderedText}>Ordered</Text>
							</View>
							<Image
								source={require("./../../assets/images/group-11-copy-5.png")}
								style={styles.dividerImage} />
							<View
								style={styles.processingView}>
								<Image
									source={require("./../../assets/images/group-13-11.png")}
									style={item.status === "processing" ? styles.processingSelectedImage : styles.processingImage} />
								<View
									style={{
										flex: 1,
									}} />
								<Text
									style={item.status === "processing" ? styles.processingSelectedText : styles.processingText}>Preparing</Text>
							</View>
							<Image
								source={require("./../../assets/images/group-11-copy-5.png")}
								style={styles.dividerImage} />
							<View
								style={styles.pickUpView}>
								<Image
									source={require("./../../assets/images/group-7-copy-8.png")}
									style={item.status === "ready" ? styles.pickupSelectedImage : styles.pickupImage} />
								<View
									style={{
										flex: 1,
									}} />
								<Text
									style={item.status === "ready" ? styles.pickUpSelectedText : styles.pickUpText}>Order Ready</Text>
							</View>
						</View>
						<View
							style={styles.progressbarView}>
							{this.renderProgressBar(progress)}
						</View>
					</View>
				</View>
				<View
					style={styles.orderDetailView}>
					<View style={styles.locationWrapperView}>
						<View
							style={styles.locationView}>
							<View
								style={styles.branchView}>
								<Text
									style={styles.shopBranchText}>{item.shop.name}</Text>
								<Text
									numberOfLines={3}
									style={styles.shopBranchAddressText}>{item.shop.address}</Text>
							</View>
							<View
								style={{
									flex: 1,
								}} />
							<View
								style={styles.callView}>
								<TouchableOpacity
									onPress={() => this.onCallPressed(item.shop.phone_no)}
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
									onPress={() => this.onDirectionPressed(item.shop)}
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
					<View
						style={styles.drinksViewWrapper}>
						{order_items}
						{voucher_items}
					</View>
					<View style={styles.receiptSectionSeperator}>
						<Image
							source={require("./../../assets/images/curve_in_background.png")}
							style={styles.curve_in} />
						<View
							style={styles.sectionSeperatorView} />
					</View>
					<View
						style={styles.totalViewWrapper}>
						<View
							style={styles.orderTotalView}>
							<Text
								style={styles.totallabelText}>TOTAL</Text>
							<View
								style={{
									flex: 1,
								}} />
							<Text
								style={styles.orderTotalText}>${parseFloat(item.total).toFixed(2)}</Text>
						</View>
					</View>
					<View style={styles.receiptSectionSeperator}>
						<Image
							source={require("./../../assets/images/curve_in_background.png")}
							style={styles.curve_in} />
						<View
							style={styles.sectionSeperatorView} />
					</View>
					<View style={styles.remarkViewWrapper}>
						<View
							style={styles.remarkView}>

							<View
								pointerEvents="box-none"
								style={{
									left: 22 * alpha,
									right: 21 * alpha,
									top: 11 * alpha,
									bottom: 11 * alpha,
									alignItems: "flex-start",
								}}>

								{/* <Text
									style={styles.pleaseCallBranchFText}>Please call branch for refund</Text> */}
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
										}} />
									{/* <TouchableOpacity
										onPress={this.onCopyPressed}
										style={styles.copyButton}>
										<Text
											style={styles.copyButtonText}>Copy</Text>
									</TouchableOpacity> */}
								</View>
								<Text
									style={styles.orderNo020028201Text}>Receipt no.: {item.receipt_no}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		})

		return <ScrollView style={{ flex: 1 }}
			refreshControl={
				<RefreshControl
					refreshing={this.state.refreshing}
					onRefresh={this.onRefresh}
				/>
			}>
			{queues}
		</ScrollView>
	}

	onRefresh = () => {
		this.setState({ refreshing: true })
		this.loadCurrentOrder()
	}

	onEditOrder = (current_order) => {
		const { navigate } = this.props.navigation
		navigate("EditOrder", { params: current_order })
	}

	onDirectionPressed(shop) {

		let latitude = shop ? parseFloat(shop.latitude) : 0.0
		let longitude = shop ? parseFloat(shop.longitude) : 0.0

		openMap({ latitude: latitude, longitude: longitude });
	}

	closePopUp = () => {
		this.setState({ popUp: false })
	}

	renderProgressBar(progress) {

		progress_percent = progress * 100
		return (
			<View style={{ flexDirection: "row", height: 10 * alpha, flex: 1 }}>
				<View style={{ flex: 1, borderColor: "#000", borderWidth: 1 * alpha, borderRadius: 5 * alpha }}>
					<View
						style={[StyleSheet.absoluteFill, { backgroundColor: "transparent" }]}
					/>
					<LinearGradient
						colors={[LIGHT_BLUE, PRIMARY_COLOR]}
						start={[0, 0]}
						end={[1, 0]}
						style={{
							position: "absolute",
							left: 0,
							top: 0,
							bottom: 0,
							borderRadius: 4 * alpha,
							width: `${progress_percent}%`,
						}}
					/>
				</View>
			</View>
		)
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
								source={require("./../../assets/images/cup_icon.png")}
								style={styles.logoImage} />
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
								source={require("./../../assets/images/next.png")}
								style={styles.orderHistoryButtonImage} />
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
			{this.state.loading ?
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" />
				</View> :
				current_order.length > 0 ? this.renderQueueView(current_order) :
					this.renderEmpty()}
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.state.popUp}
				onRequestClose={this.closePopUp}>
				<TouchableWithoutFeedback onPress={this.closePopUp}>

					<View style={[styles.popUpBackground]}>
						<View style={[styles.popUpContent]}>
							<Text style={{ paddingBottom: 5, textAlign: 'center' }}>QWERTY</Text>
							<View style={{ marginBottom: 10 }}>
								<View style={styles.popUpInput1}>
									<Text>asasas</Text>
									<Text style={{ color: '#deb887' }}>+3</Text>
								</View>
								<View style={styles.popUpInput2}>
									<Text>asasasasa</Text>
									<Text style={{ color: '#deb887' }}>+1</Text>
								</View>
							</View>
							<TouchableOpacity
								onPress={() => console.log('onpress')}
								style={styles.popUpInput3}>
								<Text
									style={styles.orderButtonText}>Order</Text>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	}
}

const styles = StyleSheet.create({
	updateOrder: {
		borderWidth: 1,
		borderColor: 'lightgray',
		flexDirection: "row-reverse",
		marginTop: 10,
		marginLeft: 10 * alpha
	},

	popUpBackground: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.4)',
		justifyContent: 'center'
	},
	popUpContent: {
		backgroundColor: 'white',
		minHeight: windowHeight / 4,
		maxHeight: windowHeight / 2,
		paddingVertical: 30,
		marginHorizontal: 30,
		paddingHorizontal: 20,
		justifyContent: 'space-between',
		borderRadius: 5 * alpha,

	},
	popUpInput1: {
		backgroundColor: '#fff5ee',
		paddingHorizontal: 10 * alpha,
		paddingVertical: 15 * alpha,
		borderRadius: 5 * alpha,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 10,
		flexDirection: 'row'
	},
	popUpInput2: {
		backgroundColor: '#f5f5f5',
		paddingHorizontal: 10 * alpha,
		paddingVertical: 15 * alpha,
		borderRadius: 5 * alpha,
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 10,
		flexDirection: 'row'

	},
	popUpInput3: {
		backgroundColor: 'rgb(0, 178, 227)',
		paddingHorizontal: 10 * alpha,
		paddingVertical: 10 * alpha,
		borderRadius: 5 * alpha,
		alignItems: 'center',
		justifyContent: 'center',
		// flex: 1,
		marginTop: 10
	},
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
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10 * alpha,
	},
	logoImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 90 * alpha,
		height: 90 * alpha,
	},
	messageView: {
		backgroundColor: "transparent",
		width: windowWidth - 40 * alpha,
		height: 35 * alpha,
		marginTop: 16 * alpha,
		alignItems: "center",
	},
	youHavenTMakeAnyText: {
		color: "rgb(134, 134, 134)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	grabYoursNowText: {
		backgroundColor: "transparent",
		color: "rgb(134, 134, 134)",
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: NON_TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	orderHistoryButtonImage: {
		tintColor: "rgb(176, 176, 176)",
		width: 10 * alpha,
		resizeMode: "contain",
		marginLeft: 5 * alpha,
	},
	loadingIndicator: {
		marginTop: 100 * alpha,
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
		fontFamily: TITLE_FONT,
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
		fontFamily: TITLE_FONT,
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
		backgroundColor: "white",
		borderTopRightRadius: 14 * alpha,
		borderTopLeftRadius: 14 * alpha,
		flex: 1,
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
		marginTop: 16 * alpha,
		// alignItems: "center",
	},

	queuenumberText: {
		backgroundColor: "transparent",
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 35 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginTop: 5 * alpha,
	},
	queueheaderText: {
		color: "rgb(50, 50, 50)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	pickupTimeText: {
		backgroundColor: "transparent",
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 35 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginTop: 5 * alpha,
		alignSelf: "center"
	},
	pickupTimeAMPMText: {
		backgroundColor: "transparent",
		color: PRIMARY_COLOR,
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		alignSelf: "flex-end"
	},
	pickupTimeheaderText: {
		color: "rgb(50, 50, 50)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	progressView: {
		backgroundColor: "transparent",
		width: 300 * alpha,
		height: 53 * alpha,
		marginTop: 20 * alpha,
		marginBottom: 5 * alpha,
		flexDirection: "row",
		justifyContent: "center",
		alignSelf: "center"
	},
	orderedView: {
		backgroundColor: "transparent",
		width: 80 * alpha,
		height: 50 * alpha,
		alignItems: "center",
		flexDirection: "column"
	},
	orderedImage: {
		tintColor: "rgb(205, 207, 208)",
		backgroundColor: "transparent",
		resizeMode: "contain",
		height: 26 * alpha,
		backgroundColor: "transparent",
	},
	orderedSelectedImage: {
		tintColor: "rgb(35, 31, 32)",
		backgroundColor: "transparent",
		resizeMode: "contain",
		height: 26 * alpha,
		backgroundColor: "transparent",
	},
	orderedText: {
		color: "rgb(205, 207, 208)",
		fontFamily: TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	orderedSelectedText: {
		color: "rgb(35, 31, 32)",
		fontFamily: TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	dividerImage: {
		backgroundColor: "transparent",
		resizeMode: "contain",
		height: 4 * alpha,
		marginTop: 15 * alpha,
		marginLeft: -10 * alpha,
		marginRight: -10 * alpha,
	},
	pickUpView: {
		backgroundColor: "transparent",
		width: 80 * alpha,
		height: 50 * alpha,
		alignItems: "center",
		flexDirection: "column"
	},
	pickupImage: {
		tintColor: "rgb(205, 207, 208)",
		resizeMode: "contain",
		backgroundColor: "transparent",
		height: 25 * alpha,
	},
	pickupSelectedImage: {
		tintColor: "rgb(35, 31, 32)",
		resizeMode: "contain",
		backgroundColor: "transparent",
		height: 25 * alpha,
	},
	pickUpText: {
		color: "rgb(205, 207, 208)",
		fontFamily: TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	pickUpSelectedText: {
		color: "rgb(35, 31, 32)",
		fontFamily: TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	processingView: {
		backgroundColor: "transparent",
		width: 80 * alpha,
		height: 50 * alpha,
		alignItems: "center",
		flexDirection: "column"
	},
	processingImage: {
		tintColor: "rgb(205, 207, 208)",
		resizeMode: "contain",
		backgroundColor: "transparent",
		alignSelf: "center",
		height: 26 * alpha,
	},
	processingSelectedImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		alignSelf: "center",
		height: 26 * alpha,
	},
	processingText: {
		color: "rgb(205, 207, 208)",
		fontFamily: TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	processingSelectedText: {
		color: "rgb(35, 31, 32)",
		fontFamily: TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
	dividerTwoImage: {
		resizeMode: "contain",
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
		fontFamily: TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	messageText: {
		color: "rgb(136, 136, 136)",
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginBottom: 20 * alpha,
		marginBottom: 20 * alpha,
	},
	orderDetailView: {
		backgroundColor: "transparent",
		flex: 1,
		marginLeft: 20 * alpha,
		marginRight: 20 * alpha,
		marginTop: 2 * alpha,
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
		width: windowWidth - 40 * alpha,
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 90 * alpha,
	},
	branchAddressView: {
		backgroundColor: "transparent",
		width: 200 * alpha,

	},
	shopNameText: {
		color: "rgb(63, 63, 63)",
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",

		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 35 * alpha,
	},
	addressText: {
		color: "rgb(164, 164, 164)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		flex: 1,
	},
	phoneText: {
		color: "rgb(164, 164, 164)",
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: NON_TITLE_FONT,
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
		width: windowWidth - 80 * alpha,
		marginTop: 10 * alpha,
		alignSelf: "center",
	},
	lineTwoView: {
		backgroundColor: "rgb(231, 231, 231)",
		width: windowWidth - 80 * alpha,
		height: 2 * alpha,
		alignSelf: "center",
	},
	totalViewWrapper: {
		backgroundColor: "rgb(245,245,245)",
		flex: 1,
	},
	orderTotalView: {
		backgroundColor: "transparent",
		height: 21 * alpha,
		marginLeft: 25 * alpha,
		marginRight: 25 * alpha,
		marginTop: 10 * alpha,
		marginBottom: 10 * alpha,
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
	orderTotalText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
	},
	drinksViewWrapper: {
		backgroundColor: "rgb(245,245,245)",
		flex: 1,
	},
	drinksView: {
		backgroundColor: "transparent",
		flex: 1,
		marginLeft: 25 * alpha,
		marginRight: 25 * alpha,
		marginTop: 10 * alpha,
	},

	dottedLineImageTwo: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		position: "absolute",
		bottom: 0,
		width: 280 * alpha,
		height: 2 * alpha,
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
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",

		textAlign: "center",
	},
	remarkViewWrapper: {
		backgroundColor: "rgb(245,245,245)",
		flex: 1,
		borderBottomRightRadius: 14 * alpha,
		borderBottomLeftRadius: 14 * alpha,
	},
	remarkView: {
		backgroundColor: "transparent",
		flex: 1,
		height: 70 * alpha,
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
		fontFamily: TITLE_FONT,
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
		fontFamily: TITLE_FONT,
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
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	orderNo020028201Text: {
		backgroundColor: "transparent",
		color: "rgb(164, 164, 164)",
		fontFamily: TITLE_FONT,
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
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		marginLeft: 3 * alpha,
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
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",

		textAlign: "left",
	},
	descriptionThreeText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
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
		fontSize: 10 * fontAlpha,
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
		width: 45 * alpha,
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

	queueHeaderBlock: {
		backgroundColor: "transparent",
		marginLeft: 10 * alpha,
		marginRight: 10 * alpha,
	},
	progressbarView: {
		backgroundColor: "transparent",
		flex: 1,
		width: 250 * alpha,
		height: 10 * alpha,
		marginBottom: 20 * alpha,
	},

})