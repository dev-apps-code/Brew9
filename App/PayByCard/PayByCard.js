//
//  Transaction
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { StyleSheet, Image, TouchableOpacity, Text, View, TextInput } from "react-native"
import { alpha, fontAlpha } from "../Common/size";
import {connect} from "react-redux";
import {TITLE_FONT, NON_TITLE_FONT} from "../Common/common_style";
import Toast, {DURATION} from 'react-native-easy-toast'
import HudLoading from "../Components/HudLoading.js"
import {createAction, Storage} from "../Utils"
import PaymentSessionRequestObject from '../Requests/payment_session_request_object.js'
import UpdatePaymentSessionRequestObject from '../Requests/update_payment_session_request_object'
import Brew9Modal from "../Components/Brew9Modal"

@connect(({ members }) => ({
	members: members.profile
}))
export default class PayByCard extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Payment",
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
			card_name: "",
			card_number: "",
			card_expiry: "",
			cart_csv: "",
			modal_visible: false,
			modal_description: "",
			modal_title: "Brew9",
			modal_cancelable: false,
			modal_ok_text: null,
			modal_ok_action: ()=> {this.setState({modal_visible:false})},
			modal_cancel_action: ()=> {this.setState({modal_visible:false})},
		}
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

	componentDidMount() {
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
		this.loadGetSession()
		
	}

	loadGetSession(){
		const { dispatch } = this.props
		this.setState({ loading: true })
		
		const callback = eventObject => {
			this.loadUpdateSessionWithCardDetails()
		}
		const obj = new PaymentSessionRequestObject()
		dispatch(
			createAction('payments/loadGetSession')({
				object:obj,
				callback,
			})
		)
	}

	loadUpdateSessionWithCardDetails(){
		const { dispatch } = this.props
		let name = "Voon Sze Ching"		
		let card_number = "4842810339276319"		
		let security_code = '906'
		let month = '11'
		let year = '23'
		const callback = eventObject => {
			this.setState({ loading: false }) 				
		}

		const obj = new UpdatePaymentSessionRequestObject(name,card_number,security_code,month,year)

		dispatch(
			createAction('payments/loadSetCreditCardSession')({
				object:obj,
				callback,
			})
		)
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

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	onPayNowPressed = () => {
		validate = this.checkForm()
	}

	checkForm = () => {
		if (this.state.card_name === "") {
			this.setState({
				modal_visible:true,
				modal_description: "Please select the name on your card",
			})
			return false
		} else if (this.state.card_number.length != 8) {
			this.setState({
				modal_visible:true,
				modal_description: "Please select a correct card number",
			})
			return false
		}
		else if (this.state.card_expiry === "") {
			this.setState({
				modal_visible:true,
				modal_description: "Please select enter the expiry date",
			})
			return false
		}
		else if (this.state.card_csv.length != 3) {
			this.setState({
				modal_visible:true,
				modal_description: "Please select a correct csv",
			})
			return false
		}
		else {
			return true
		}
	}

	render() {

		let cart_total = this.props.navigation.getParam("cart_total",0.00)
		return <View
				style={styles.payByCardView}>
				<View
					style={styles.totalAmountView}>
					<Text
						style={styles.headerlabelText}>{this.props.navigation.getParam("transaction_name","Payment")}</Text>
					<Text
						style={styles.carttotalText}>${parseFloat(cart_total).toFixed(2)}</Text>
				</View>
				<View
					style={styles.payeeView}>
					<Text
						style={styles.payeeText}>Payee</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.brew9Text}>Brew9</Text>
				</View>
				<View
					style={styles.paymentMethodView}>
					<Text
						style={styles.paymentMethodText}>Card Detail</Text>
				</View>
				<View
					style={styles.addBankToPayView}>
					<View
						style={styles.nameView}>
						<TextInput
							autoCorrect={false}
							placeholder="Name On Card"
							style={styles.nameinputTextInput}
							onChangeText={(card_name) => this.setState({card_name})}/>
					</View>
					<View
						style={styles.cardnumberView}>
						<TextInput
							autoCorrect={false}
							placeholder="Card Number"
							keyboardType={"number-pad"}
							style={styles.cardinputTextInput}
							onChangeText={(card_number) => this.setState({card_number})}/>
					</View>
					<View
						style={styles.expirydateView}>
						<TextInput
							autoCorrect={false}
							placeholder="Expiration (MM/YY)"
							keyboardType={"number-pad"}
							style={styles.dateinputTextInput}
							onChangeText={(card_expiry) => this.setState({card_expiry})}/>
						<TextInput
							autoCorrect={false}
							placeholder="CSV"
							keyboardType={"number-pad"}
							style={styles.csvnputTextInput}
							onChangeText={(cart_csv) => this.setState({cart_csv})}/>
					</View>
					<TouchableOpacity
						onPress={this.onPayNowPressed}
						style={styles.payNowButton}>
						<Text
							style={styles.payNowButtonText}>Pay Now</Text>
					</TouchableOpacity>
				</View>
				<Toast ref="toast"
            position="center"/>
			{this.renderPopupModal()}
			<HudLoading isLoading={this.state.loading}/>
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
	payByCardView: {
		backgroundColor: "rgb(240, 240, 240)",
		flex: 1,
	},
	totalAmountView: {
		backgroundColor: "rgb(240, 240, 240)",
		height: 113,
		alignItems: "center",
	},
	headerlabelText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "ClanPro-News",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 22,
	},
	carttotalText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "ClanPro-Book",
		fontSize: 35,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 11,
	},
	payeeView: {
		backgroundColor: "white",
		shadowColor: "rgb(230, 230, 230)",
		shadowRadius: 2,
		shadowOpacity: 1,
		height: 49,
		flexDirection: "row",
		alignItems: "center",
	},
	payeeText: {
		backgroundColor: "transparent",
		color: "rgb(165, 165, 165)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 14,
	},
	brew9Text: {
		backgroundColor: "transparent",
		color: "rgb(78, 78, 78)",
		fontFamily: "ClanPro-Book",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 15,
	},
	paymentMethodView: {
		backgroundColor: "rgb(240, 240, 240)",
		height: 41,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	paymentMethodText: {
		color: "rgb(165, 165, 165)",
		fontFamily: "ClanPro-Book",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 14,
	},
	addBankToPayView: {
		backgroundColor: "transparent",
		flex: 1,
	},
	nameView: {
		backgroundColor: "white",
		height: 51,
		marginBottom: 1,
		justifyContent: "center",
	},
	nameinputTextInput: {
		color: "black",
		fontFamily: "ClanPro-Book",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		padding: 0,
		height: 30,
		marginLeft: 16,
		marginRight: 16,
	},
	cardnumberView: {
		backgroundColor: "white",
		height: 51,
		marginBottom: 1,
		justifyContent: "center",
	},
	cardinputTextInput: {
		backgroundColor: "transparent",
		padding: 0,
		color: "black",
		fontFamily: "ClanPro-Book",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		height: 30,
		marginLeft: 16,
		marginRight: 16,
	},
	expirydateView: {
		backgroundColor: "white",
		height: 51,
		marginBottom: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	dateinputTextInput: {
		color: "black",
		fontFamily: "ClanPro-Book",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		padding: 0,
		flex: 1,
		height: 30,
		marginLeft: 16,
		marginRight: 26,
	},
	csvnputTextInput: {
		backgroundColor: "transparent",
		padding: 0,
		color: "black",
		fontFamily: "ClanPro-Book",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		flex: 1,
		height: 30,
		marginLeft: 26,
		marginRight: 25,
	},
	payNowButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 4,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 38,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 20,
	},
	payNowButtonImage: {
		resizeMode: "contain",
		marginRight: 10,
	},
	payNowButtonText: {
		color: "white",
		fontFamily: "ClanPro-Book",
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
})
