//
//  TopUpWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, TouchableOpacity, View, StyleSheet, Image, FlatList, ActivityIndicator } from "react-native"
import Card from "./Card"
import React from "react"
import {alpha, fontAlpha } from "../Common/size";
import TopUpProductsRequestObject from "../Requests/top_up_products_request_object";
import TopUpOrderRequestObject from "../Requests/top_up_order_request_object";
import {createAction} from "../Utils";
import {connect} from "react-redux";
import { TITLE_FONT, NON_TITLE_FONT, BUTTONBOTTOMPADDING } from "../Common/common_style";
import HudLoading from "../Components/HudLoading.js"
import Toast, {DURATION} from 'react-native-easy-toast'
import Brew9Modal from "../Components/Brew9Modal"

@connect(({ members,shops }) => ({
	members: members.profile,
	selectedShop: shops.selectedShop
}))
export default class TopUpWallet extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Top Up Wallet",
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
			loading_list: false,
			data: [],
			selectedTopUpProduct: null,
			selected: 0,
			order:null,
			modal_visible: false,
			modal_description: "",
			modal_title: "Brew9",
			modal_cancelable: false,
			modal_ok_text: null,
			modal_ok_action: ()=> {this.setState({modal_visible:false})},
			modal_cancel_action: ()=> {this.setState({modal_visible:false})},
		}
	}

	loadTopUpProducts(){
		const { dispatch, members } = this.props

		this.setState({ loading_list: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					data: eventObject.result,
				},function () {
					if (eventObject.result.length > 0) {
						this.setState({
							selectedTopUpProduct: eventObject.result[0]
						})
					}
				}.bind(this))
			}
			this.setState({
				loading_list: false,
			})
		}
		const obj = new TopUpProductsRequestObject()
		obj.setUrlId(members.company_id)
		dispatch(
			createAction('companies/loadTopUpProducts')({
				object:obj,
				callback,
			})
		)
	}

	componentDidMount() {
		this.loadTopUpProducts()
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	onTopUpPressed = () => {

		const {selectedTopUpProduct} = this.state
		
		this.loadMakeOrder(selectedTopUpProduct.id)
	}

	renderPopupModal() {
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

	loadMakeOrder(topUpProductId){
		const { navigate } = this.props.navigation
		const { dispatch, selectedShop } = this.props
		const {selectedTopUpProduct} = this.state

		this.setState({ loading: true })
		const callback = eventObject => {
			this.setState({
				loading: false,
			})       
			if (eventObject.success) {

				const order = eventObject.result
				this.setState({order:order})
				navigate("PaymentsWebview", {
					name: `Top Up - ${selectedTopUpProduct.price}`,
					order_id: order.receipt_no,
					session_id:order.session_id,
					amount: order.total,
					type:'top_up',
				})
			}else{
				this.setState({
					modal_visible:true,
					modal_description: eventObject.message,
				})
			}
		}
		const obj = new TopUpOrderRequestObject(selectedShop.id)
		obj.setUrlId(topUpProductId) 
		dispatch(
			createAction('top_up/loadMakeOrder')({
				object:obj,
				callback,
			})
		)
	}
	

	onTopUpCardPressed = (topUpProduct,index) => {

		this.setState({
			selectedTopUpProduct: topUpProduct,
			selected: index,
		})
	}

	renderTopuplistFlatListCell = ({ item, index }) => {
	
		return <Card
			navigation={this.props.navigation}
			image={item.image}
			price={item.price}
			index={index}
			item={item}
			currency={this.props.members.currency}
			selected={this.state.selected}
			onPressItem={this.onTopUpCardPressed}
		/>
	}

	render() {

		return <View
			style={styles.topUpWalletView}>
			{/*<View*/}
			{/*	style={styles.noticeView}>*/}
			{/*	<Text*/}
			{/*		style={styles.messageText}>Please contact customer service for top up receipt, orders will no longer be issued.</Text>*/}
			{/*</View>*/}
			{ this.state.loading_list && (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" />
				</View>
			)}
			<View
				style={styles.topuplistFlatListViewWrapper}>
				<FlatList
					renderItem={this.renderTopuplistFlatListCell}
					// contentContainerStyle={styles.topuplistcontainer}
					data={this.state.data}
					numColumns={2}
					style={styles.topuplistFlatList}
					selected={this.state.selected}
					keyExtractor={(item, index) => index.toString()}/>
			</View>
			<View
				style={styles.topUpView}>
				<Text
					style={styles.selectedValueText}>${this.state.selectedTopUpProduct ? this.state.selectedTopUpProduct.price : '' }</Text>
				<View
					style={{
						flex: 1,
					}}/>
				<TouchableOpacity
					onPress={this.onTopUpPressed}
					style={styles.topupButton}>
					<Text
						style={styles.topupButtonText}>Top Up</Text>
				</TouchableOpacity>
			</View>
			<Toast ref="toast"
            position="center"/>
			<HudLoading isLoading={this.state.loading}/>
			{this.renderPopupModal()}
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
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10 * alpha,
	},
	topUpWalletView: {
		backgroundColor: "rgb(248, 248, 248)",
		flex: 1,
	},
	noticeView: {
		backgroundColor: "rgba(141, 230, 255, 0.4)",
		height: 34 * alpha,
		justifyContent: "center",
		alignItems: "flex-end",
	},
	messageText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 20 * alpha,
	},
	topuplistFlatList: {
		width: "100%",
		height: "100%",
	},
	topuplistFlatListViewWrapper: {
		flex: 1,
	},
	topuplistcontainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: 'space-between',
		padding: 10 * alpha,
	},
	topUpView: {

		height: 52 * alpha ,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: BUTTONBOTTOMPADDING
	},
	selectedValueText: {
		color: "rgb(59, 59, 59)",
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 21 * alpha,
	},
	topupButton: {
		backgroundColor: "rgb(0, 178, 227)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 129 * alpha,
		height: 52 * alpha,
	},
	topupButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		
		textAlign: "left",
	},
	topupButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
})
