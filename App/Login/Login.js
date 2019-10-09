//
//  IPhone8Copy11
//  Project
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowHeight} from "../Common/size"
import PhoneInput from 'react-native-phone-input'
import LoginWithSmsRequestObject from "../Requests/login_with_sms_request_object"
import LoginWithFacebookRequestObject from "../Requests/login_with_facebook_request_object"
import * as Facebook from 'expo-facebook'
import {connect} from "react-redux"
import {createAction, Storage} from "../Utils"
import Toast, {DURATION} from 'react-native-easy-toast'
import HudLoading from "../Components/HudLoading"

@connect(({ members }) => ({
	members: members.profile,
	isReady: members.isReady
}))
export default class Login extends React.Component {

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
			phone_no: null,
			country_code: "673",
			country: "bn",
			facebook_id: null,
			image_url: null,
			name: null,
			isSuccess: false,
		}
	}

	onVerifyLogin = () => {
		const { navigate } = this.props.navigation

		navigate("Confirmation", {
			phone_no: this.state.phone_no,
			country_code: this.state.country_code,
		})
	}

	componentDidMount() {

	}

	componentDidUpdate() {
        if(this.state.isSuccess && this.props.members) {
			this.props.navigation.navigate("TabGroupOne")
		}
	}
	
	loadLogin(){
		const { dispatch } = this.props
		const {phone_no, country_code} = this.state

		if (phone_no == null || phone_no == ''){
			this.refs.toast.show('Please ensure you have enter your phone number!');
			return
		}

		if (phone_no.length < 7){
			this.refs.toast.show('Your phone number is too short');
			return
		}

		if (country_code == null || country_code == ''){
			this.refs.toast.show('Please ensure you have enter a country code!');
			return
		}

		this.setState({ loading: true })
		const callback = eventObject => {
			this.setState({
				loading: false,
			})

			if (eventObject.success) {
				this.onVerifyLogin()
			}			
		}
		const obj = new LoginWithSmsRequestObject(this.state.phone_no, this.state.country_code)
		dispatch(
			createAction('members/loadLogin')({
				object:obj,
				callback,
			})
		)
	}

	loadLoginWithFacebook(facebook_id, image_url, name){
		const { dispatch } = this.props
		this.setState({ loading: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					isSuccess: true,
				})
				// this.props.navigation.navigate("TabGroupOne")
			}
			this.setState({
				loading: false,
			})
		}
		const obj = new LoginWithFacebookRequestObject(facebook_id, image_url, name)
		dispatch(
			createAction('members/loadLoginWithFacebook')({
				object:obj,
				callback,
			})
		)
	}

	onFacebookButtonPressed = () => {
		this.logIn()
	}

	async logIn() {
		try {
			const {
				type,
				token,
				expires,
				permissions,
				declinedPermissions,
			} = await Facebook.logInWithReadPermissionsAsync('448395549353766', {
				permissions: ['public_profile'],
			});
			if (type === 'success') {
				// Get the user's name using Facebook's Graph API
				const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`);
				// login_with_facebook_request_object()
				var obj = await response.json()
				this.loadLoginWithFacebook(obj.id, obj.picture.data.url, obj.name)
				// alert('Logged in!', `Hi ${(await response.json())}!`);
			} else {
				// type === 'cancel'
			}
			this.setState({
				loading: false,
			})
		} catch ({ message }) {
			console.log(`Facebook Login Error: ${message}`)
			// alert(`Facebook Login Error: ${message}`);
		}
	}

	onDoneButtonPressed = () => {
		this.loadLogin()
	}

	onUpdateCode(iso2){
		var country_code = this.phone.getCountryCode()
		this.setState({
			country: iso2,
			country_code: country_code,
		})
	}

	render() {

		return <View
			style={styles.loginView}>
			<View
				pointerEvents="box-none"
				style={{
					flex: 1,
					marginBottom: 24 * alpha,
				}}>
				<View
					style={styles.bluebackgroundView}/>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 0 * alpha,
						right: 0 * alpha,
						top: 64 * alpha,
						bottom: 14 * alpha,
						alignItems: "flex-start",
					}}>
					<Image
						source={require("./../../assets/images/group-24-2.png")}
						style={styles.logoImage}/>
					<Text
						style={styles.welcomeText}>Welcome!</Text>
					<Text
						style={styles.instructionText}>Enter your mobile number to continue.</Text>
					<View
						style={styles.enterphoneView}>
						<View
							style={styles.countryCodeView}>
							{/*<Image*/}
							{/*	source={require("./../../assets/images/bitmap.png")}*/}
							{/*	style={styles.bitmapImage}/>*/}
							<PhoneInput
								ref={(ref) => { this.phone = ref }}
								initialCountry={this.state.country}
								style={{marginLeft: 10 * alpha}}
								onPressFlag={() => {}}
								textStyle={styles.phoneCountryCodeText}
								textProps={{keyboardType:"number-pad", editable:false}}
								onSelectCountry={(iso2) => this.onUpdateCode(iso2)}
								offset={10}

							/>
							{/*<TextInput*/}
							{/*	autoCorrect={false}*/}
							{/*	keyboardType="phone-pad"*/}
							{/*	style={styles.textInputTextInput}*/}
							{/*	onChangeText={(code) => this.setState({code})}/>*/}
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.phonenumberView}>
							<TextInput
								keyboardType="phone-pad"
								autoCorrect={false}
								placeholder="123456789"
								style={styles.textInputTwoTextInput}
								returnKeyType='done'
								onSubmitEditing={() => {this.onDoneButtonPressed()}}
								onChangeText={(phone_no) => this.setState({phone_no})}/>
						</View>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.instructionTwoText}>Or continue with a social account</Text>
				</View>
			</View>
			<View
				style={styles.facebookviewView}>
				<TouchableOpacity
					onPress={this.onFacebookButtonPressed}
					style={styles.facebookbuttonButton}>
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
									height: 28 * alpha,
									marginLeft: 19 * alpha,
									marginRight: 189 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<View
									style={styles.facebookiconView}>
									<Image
										source={require("./../../assets/images/group-3-8.png")}
										style={styles.group3Image}/>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.facebookText}>Facebook</Text>
							</View>
						</View>
				</TouchableOpacity>
			</View>
			<Toast ref="toast"
            position="center"/>
			<HudLoading isLoading={this.state.loading}/>
		</View>
	}
}

const styles = StyleSheet.create({
	loginView: {
		backgroundColor: "white",
		flex: 1,
	},
	bluebackgroundView: {
		backgroundColor: "rgb(0, 178, 227)",
		borderBottomLeftRadius: 40 * alpha,
		borderBottomRightRadius: 40 * alpha,
		shadowColor: "rgba(126, 126, 126, 0.5)",
		shadowRadius: 4 * alpha,
		shadowOpacity: 1,
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: windowHeight - 100,
	},
	logoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		alignSelf: "stretch",
		width: null,
		height: 54 * alpha,
		marginLeft: 23 * alpha,
		marginRight: 242 * alpha,
	},
	welcomeText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "SFProText-Medium",
		fontSize: 25 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 23 * alpha,
		marginTop: 83 * alpha,
	},
	instructionText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 23 * alpha,
		marginTop: 8 * alpha,
	},
	enterphoneView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 375 * alpha,
		height: 41 * alpha,
		marginTop: 47 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	countryCodeView: {
		backgroundColor: "white",
		borderRadius: 7 * alpha,
		shadowColor: "rgba(140, 140, 140, 0.5)",
		shadowRadius: 1 * alpha,
		shadowOpacity: 1,
		width: 102 * alpha,
		height: 41 * alpha,
		marginLeft: 23 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	phoneCountryCodeText: {
		marginLeft: 0 * alpha,
		fontFamily: "SFProText-Medium",
		fontSize: 14 * fontAlpha,
	},
	bitmapImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 28 * alpha,
		height: 16 * alpha,
		marginLeft: 11 * alpha,
	},
	textInputTextInput: {
		backgroundColor: "transparent",
		padding: 0,
		color: "black",
		fontFamily: "SFProText-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		width: 24 * alpha,
		height: 17 * alpha,
		marginLeft: 7 * alpha,
	},
	phonenumberView: {
		backgroundColor: "white",
		borderRadius: 7 * alpha,
		shadowColor: "rgba(140, 140, 140, 0.5)",
		shadowRadius: 1 * alpha,
		shadowOpacity: 1,
		width: 214 * alpha,
		height: 41 * alpha,
		marginRight: 23 * alpha,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	textInputTwoTextInput: {
		backgroundColor: "transparent",
		padding: 0,
		color: "rgb(46, 46, 46)",
		fontFamily: "SFProText-Medium",
		fontSize: 20 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		width: 218 * alpha,
		height: 28 * alpha,
		marginLeft: 8 * alpha,
	},
	instructionTwoText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "SFProText-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 81 * alpha,
	},
	facebookviewView: {
		backgroundColor: "rgb(60, 90, 153)",
		borderRadius: 9 * alpha,
		shadowColor: "rgba(49, 48, 48, 0.5)",
		shadowRadius: 2 * alpha,
		shadowOpacity: 1,
		alignSelf: "center",
		width: 317 * alpha,
		height: 49 * alpha,
		marginBottom: 23 * alpha,
	},
	facebookbuttonButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	facebookbuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0 * alpha,
		width: 317 * alpha,
		top: 0 * alpha,
		height: 49 * alpha,
	},
	facebookbuttonButtonImage: {
		resizeMode: "contain",
	},
	facebookiconView: {
		backgroundColor: "white",
		borderRadius: 3 * alpha,
		width: 27 * alpha,
		height: 28 * alpha,
	},
	group3Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 23 * alpha,
		marginLeft: 10 * alpha,
		marginRight: 5 * alpha,
		marginTop: 5 * alpha,
	},
	facebookText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "SFProText-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
})