//
//  VerifyUser
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import React from "react"
import { alpha, fontAlpha,windowWidth } from "../Common/size";
import {connect} from "react-redux";
import PhoneInput from 'react-native-phone-input'
import Toast, {DURATION} from 'react-native-easy-toast'
import HudLoading from "../Components/HudLoading"
import ActivateAccountRequestObject from '../Requests/activate_account_request_object'
import LoginWithSmsRequestObject from "../Requests/login_with_sms_request_object"
import {createAction, Storage} from "../Utils"
import CountDown from 'react-native-countdown-component'
import {KURL_INFO, KURL_TERMS_OF_SERVICE, KURL_PRIVACY_POLICY, KURL_EULA} from "../Utils/server"
import Hyperlink from 'react-native-hyperlink'

@connect(({ members }) => ({
	members: members.profile,
	company_id: members.company_id
}))
export default class VerifyUser extends React.Component {

	static navigationOptions = ({ navigation }) => {
	
		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}
	}

	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			phone_no: null,
			country_code: "673",
			country: "bn",
			login_success: false,
			code: "",
			code_from_server:"",
			is_counting: false,
		}

	}

	componentDidMount() {
	
	}

	onTermsAndConditionsPressed = (url) => {
		const { navigate } = this.props.navigation
		navigate("WebCommonModal", {
            title: 'Terms and Conditions',
            web_url: url + '&id=' + this.props.company_id,
        })
	}

	onClosePressed = () => {
		this.props.navigation.navigate('TabGroupOne')
	}

	onSendPressed = () => {
		this.loadLogin()
	}

	onUpdateCode(iso2){
		var country_code = this.phone.getCountryCode()
		this.setState({
			country: iso2,
			country_code: country_code,
		})
	}

	loadLogin(){
		const { dispatch } = this.props
		const {phone_no, country_code} = this.state

		if (phone_no == null || phone_no == ''){
			this.refs.toast.show('Please ensure you have enter your phone number!')
			return
		}

		if (phone_no.length < 7){
			this.refs.toast.show('Your phone number is too short')
			return
		}

		if (country_code == null || country_code == ''){
			this.refs.toast.show('Please ensure you have enter a country code!')
			return
		}

		this.setState({ loading: true })
		const callback = eventObject => {
			console.log("callbakc done")
			if (eventObject.success) {
				console.log("callbakc done set state")
				this.setState({
					login_success: true,
					is_counting: true,
					code_from_server: eventObject.result.code,
					code:eventObject.result.code
				})
			}
			this.setState({
				loading: false,
			})
		}
		const obj = new LoginWithSmsRequestObject(phone_no, country_code)
		dispatch(
			createAction('members/loadLogin')({
				object:obj,
				callback,
			})
		)
	}

	onVerifyPressed = () => {
		this.loadActivateAccount()
	}

	loadActivateAccount(){
        const { dispatch } = this.props
        this.setState({ loading: true })
        const callback = eventObject => {

            if (eventObject.success) {

				var obj = eventObject.result
				if (obj.name == "" || obj.name == null) {
					const { navigate } = this.props.navigation
					navigate("Register")
				} else {
					const { navigate } = this.props.navigation
					navigate('TabGroupOne')
				}                
            }else{
				this.refs.toast.show(eventObject.message)
            }
            this.setState({
                loading: false,
            })
        }
        const obj = new ActivateAccountRequestObject(this.state.phone_no, this.state.country_code, this.referral_code, this.state.code)
        dispatch(
            createAction('members/loadActivateAccount')({
                object:obj,
                callback,
            })
        )
	}

	render() {
		return <View
			style={styles.verifyuserView}>
			<View
				style={styles.modalView}>
				<TouchableOpacity
					onPress={this.onClosePressed}
					style={styles.closeButton}>
					<Text style={styles.closeButtonText}>X</Text>
				</TouchableOpacity>
				<Image
					source={require("./../../assets/images/group-24-4.png")}
					style={styles.logoImage}/>
				<Text
					style={styles.welcomeText}>Welcome!</Text>
				<Text
					style={styles.messageText}>Enter your mobile number to continue.</Text>
				<View
					style={styles.formView}>
					<View
						pointerEvents="box-none"
						style={{
							height: 42 * alpha,
							flexDirection: "row",
							alignItems: "flex-start",
						}}>
						<View
							style={styles.countryCodeView}>
								<PhoneInput
							ref={(ref) => { this.phone = ref }}
							initialCountry={this.state.country}
							style={{marginLeft: 10 * alpha}}
							onPressFlag={() => {}}
							textStyle={styles.phoneCountryCodeText}
							textProps={{keyboardType:"number-pad", editable:false}}
							onSelectCountry={(iso2) => this.onUpdateCode(iso2)}
							offset={10}/>
							</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.numberView}>
							<TextInput
								autoCorrect={false}
								keyboardType="phone-pad"
								placeholder="123456789"								
								style={styles.textInputTextInput}
								onChangeText={(phone_no) => this.setState({phone_no})}/>
							<View
								style={{
									flex: 1,
								}}/>
							{ !this.state.login_success && !this.state.is_counting ? <TouchableOpacity
								onPress={this.onSendPressed}
								style={styles.sendButton}>
								<Text
									style={styles.sendButtonText}>Send</Text>
							</TouchableOpacity> : <CountDown
								until={120}
								onFinish={() => this.setState({is_counting: false})}
								style={styles.sendCountdown}
								size={7}
								digitStyle={{backgroundColor: 'transparent', padding: 0, width: 20 * alpha, height: 20 * alpha}}
								digitTxtStyle={styles.countdownText}
								separatorStyle={{color: '#000000'}}
								timeToShow={['M', 'S']}
								timeLabels={{m: null, s: null}}
								showSeparator
							/>}
						</View>
					</View>
					{ this.state.login_success ? <View
						style={styles.activationView}>
						<TextInput
							autoCorrect={false}
							placeholder="Activation Code"
							keyboardType="phone-pad"
							value={this.state.code}
							style={styles.activationCodeTextInput}
							onChangeText={(code) => this.setState({code: code})}/>
						<View
							style={{
								flex: 1,
							}}/>
						<TouchableOpacity
							onPress={this.onVerifyPressed}
							style={styles.verifyButton}>
							<Text
								style={styles.verifyButtonText}>Verify</Text>
						</TouchableOpacity>
					</View> : null }
				</View>
				{this.state.loading ?
					<View style={[styles.container, styles.horizontal]}>
						<ActivityIndicator size="large" color="#FFFFFF"/>
					</View>
					: null }
				<View
					style={{
						flex: 1,
					}}/>
					
					{/* <TouchableOpacity
						onPress={this.onTermsAndConditionsPressed}
						style={styles.termsAndConditionsButton}>
						<Text
							style={styles.termsAndConditionsButtonText}>Terms and Conditions</Text>
					</TouchableOpacity> */}
					<Hyperlink
						onPress={url => this.onTermsAndConditionsPressed(url)}
						linkStyle={[{ color: '#0000EE' }, styles.description_text]}
						linkText={url =>
							url === KURL_TERMS_OF_SERVICE
							? 'Terms of Service'
							: url === KURL_PRIVACY_POLICY
								? 'Privacy Policy'
								: url === KURL_EULA ? 'End User License Agreement' : url
						}
						>
						<Text style={styles.description_text}
						numberOfLines={2}>
							By using this app, you agree to our{' '}							
							<Text style={{ textDecorationLine: 'underline' }}>
							{KURL_TERMS_OF_SERVICE}
							</Text>,{' '}
							<Text style={{ textDecorationLine: 'underline' }}>
							{KURL_PRIVACY_POLICY}
							</Text>{' '}
							and{' '}
							<Text style={{ textDecorationLine: 'underline' }}>
							{KURL_EULA}
							</Text>.
						</Text>
						</Hyperlink>
			</View>
			<Toast ref="toast" position="center"/>
		</View>
	}
}

const styles = StyleSheet.create({
	verifyuserView: {
		backgroundColor: "white", 
		flex: 1,
	},
	modalView: {
		backgroundColor: "transparent",
		flex: 1,
		marginTop: 40 * alpha,
	},
	bitmapImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 28 * alpha,
		height: 16 * alpha,
		marginLeft: 34 * alpha,
	},
	closeButton: {
		backgroundColor: "transparent",
		borderRadius: 12.5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "flex-end",
		width: 25 * alpha,
		height: 25 * alpha,
		marginRight: 11 * alpha,
		marginTop: 11 * alpha,
	},
	closeButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	closeButtonText: {
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	logoImage: {
		resizeMode: "center",
		tintColor: "rgb(0, 178, 227)",
		backgroundColor: "transparent",
		width: 110 * alpha,
		height: 54 * alpha,
		marginLeft: 23 * alpha,
	},
	welcomeText: {
		color: "black",
		fontFamily: "SFProText-Medium",
		fontSize: 25 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 83 * alpha,
		marginLeft: 23 * alpha,
	},
	messageText: {
		color: "black", 
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 8 * alpha,
		marginLeft: 23 * alpha,
	},
	formView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 329 * alpha,
		height: 100 * alpha,
		marginTop: 16 * alpha,
	},
	countryCodeView: {
		backgroundColor: "white",
		borderRadius: 7 * alpha,
		borderColor: "rgb(140, 140, 140)",
		borderWidth: 0.5,
		shadowRadius: 10,
		shadowOpacity: 10,
		width: 102 * alpha,
		height: 41 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},

	numberView: {
		backgroundColor: "white", 
		borderRadius: 7 * alpha,
		borderColor: "rgb(140, 140, 140)",
		borderWidth: 0.5,
		shadowRadius: 1,
		shadowOpacity: 1,
		width: 214 * alpha,
		height: 42 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	textInputTextInput: {
		color: "rgb(46, 46, 46)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		padding: 0,
		width: 114 * alpha,
		height: 25 * alpha,
		marginLeft: 15 * alpha,
	},
	sendButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 4,
		shadowColor: "rgba(140, 140, 140, 0.5)",
		shadowRadius: 1,
		shadowOpacity: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 72 * alpha,
		height: 26 * alpha,
		marginRight: 8 * alpha,
	},
	sendButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	sendButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	sendCountdown: {
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 72 * alpha,
		height: 26 * alpha,
		marginRight: 8 * alpha,
	},
	countdownText: {
        color: "rgb(98, 97, 97)",
        fontFamily: "Helvetica",
        fontSize: 12 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
    },
	activationView: {
		backgroundColor: "white",
		borderRadius: 7,
		shadowColor: "rgba(140, 140, 140, 0.5)",
		shadowRadius: 1,
		shadowOpacity: 1,
		height: 41 * alpha,
		marginTop: 17 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	activationCodeTextInput: {

		color: "rgb(46, 46, 46)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		padding: 0,
		width: 221 * alpha,
		height: 25 * alpha,
		marginLeft: 14 * alpha,
	},
	verifyButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 4 * alpha,
		shadowColor: "rgba(140, 140, 140, 0.5)",
		shadowRadius: 1,
		shadowOpacity: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 72 * alpha,
		height: 26 * alpha,
		marginRight: 8 * alpha,
	},
	verifyButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	verifyButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	termsAndConditionsButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "center",
		width: 210 * alpha,
		height: 16 * alpha,
		marginBottom: 40 * alpha,
	},
	termsAndConditionsButtonText: {
		color: "white",
		fontFamily: "SFProText-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	termsAndConditionsButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	description_text: {
		width: windowWidth,
		marginBottom: 40 * alpha,
		color: "rgb(90, 90, 90)", 
		fontFamily: "SFProText-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
		paddingLeft: 15 * alpha,
		paddingRight: 15 * alpha,
	},
	phoneCountryCodeText: {
		marginLeft: 0 * alpha,
		fontFamily: "SFProText-Medium",
		fontSize: 14 * fontAlpha,
		color: "black",
	},
	errorMessageText: {
		color: "white",
		fontSize: 12 * fontAlpha,
		fontFamily: "Helvetica",
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginTop: 48 * alpha,
	},
	container: {
		justifyContent: 'center',
		backgroundColor: "transparent",
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10 * alpha,
	},
	reSendButtonImage: {
        resizeMode: "contain",
        marginRight: 10 * alpha,
    },
})
