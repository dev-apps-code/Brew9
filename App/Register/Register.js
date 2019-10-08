//
//  MemberProfile
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from "react-native"
import React from "react"
import { alpha, fontAlpha} from "../Common/size"
import { createAction } from "../Utils"
import UpdateProfileRequestObject from "../Requests/update_profile_request_object"
import UpdatePhoneNumberRequestObject from "../Requests/update_phone_number_request_object"
import VerifyPhoneNumberUpdateRequestObject from "../Requests/verify_phone_number_update_request_object"
import * as SecureStore from "expo-secure-store"
import Modal from "react-native-modal"
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import {connect} from "react-redux"
import PhoneInput from 'react-native-phone-input'
import * as ImagePicker from "expo-image-picker"
// import Constants from "expo-constants"
import * as Permissions from "expo-permissions"
import DatePicker from 'react-native-datepicker'
import Toast, {DURATION} from 'react-native-easy-toast'
import HudLoading from "../Components/HudLoading"

@connect(({ members }) => ({
	members: members.profile
}))
export default class Register extends React.Component {

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
			country_code: "673",
			country: "bn",
			dob: "",
			nickname: "",
			phone_no:  "",
			gender_options: [
				{label: 'Male', value: 0 },
				{label: 'Female', value: 1 }
			],
			gender: -1,
			genderIndex: 0,
		}
	}

	componentDidMount() {
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
	}

	getPermissionAsync = async () => {
		// if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				return false
			}
			return true
		// }
	}

	loadUpdateProfile(formData){
		const { dispatch } = this.props

		this.setState({ loading: true })
		const callback = eventObject => {
			if (eventObject.success) {
				
			} else {
				this.refs.toast.show(eventObject.message);
			}
			this.setState({
				loading: false,
			})
		}
		const obj = new UpdateProfileRequestObject(formData.dob, formData.nickname, formData.image, formData.gender)
		obj.setUrlId(this.props.members.id)
		dispatch(
			createAction('members/loadUpdateProfile')({
				object:obj,
				callback,
			})
		)
	}
	
	checkForm = () => {
		if (this.state.gender === -1) {
			this.refs.toast.show("Please select your gender")
			return false
		} else if (!this.state.nickname) {
			this.refs.toast.show("Please select a nickname")
			return false
		}
		else if (!this.state.dob) {
			this.refs.toast.show("Please select enter your birthdate")
			return false
		}
		else {
			return true
		}
	}

	onBackPressed = () => {
		console.log("back")
		this.props.navigation.goBack()
	}

	onUpdatePressed = () => {
		this.setState({ modalVisible: true })
	}

	onClosePressed = () => {
		const { navigate } = this.props.navigation
		navigate('TabGroupOne')
	}

	onUpdateCode(iso2){
		var country_code = this.phone.getCountryCode()
		this.setState({
			country: iso2,
			country_code: country_code,
		})
	}

	onSendCodePressed = () => {
		const phoneFormData = {
			// phone_no: this.state.phone_no,
			phone_no: this.state.phone_no,
			// country_code: this.state.country_code,
			country_code: this.state.country_code,
		}

		this.loadUpdatePhoneNumber(phoneFormData)
	}

	onConfirmButtonPressed = () => {
		const phoneFormData = {
			code: this.state.country_code,
			// phone_no: this.state.phone_no,
			phone_no: this.state.phone_no,
			// country_code: this.state.country_code,
			country_code: this.state.country_code,
		}

		this.loadVerifyPhoneNumberUpdate(phoneFormData)
	}

	onSavePressed = () => {

		let formcheck = this.checkForm()

		if (formcheck) {
			const profileFormData = {
				dob: this.state.dob,
				nickname: this.state.nickname,
				image: this.state.image,
				gender: this.state.gender,
			}
			this.loadUpdateProfile(profileFormData)
		}
	}

	render() {


		const { members, image, dob, nickname, gender } = this.state;
		const { params = {} } = this.props.navigation.state

		return <KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : null}
			style={{ flex: 1 }}
		><View
			style={styles.memberProfileView}>
				
			<View
				style={styles.profileView}>
				<View
					style={styles.profilepicView}>
					<View
						pointerEvents="box-none"
						style={{
							width: 80 * alpha,
							height: 80 * alpha,
						}}>
						<Image
							source={require("./../../assets/images/logo.png")}
							style={styles.avatarImage}/>
						<TouchableOpacity
							onPress={this._pickImage}
							style={styles.imagebuttonButton}>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View
				style={styles.personalInfoView}>
				<View
					style={styles.nicknameView}>
					<Image
						source={require("./../../assets/images/line-17.png")}
						style={styles.seperatorImage}/>
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
							pointerEvents="box-none"
							style={{
								width: 315 * alpha,
								height: 16 * alpha,
								marginLeft: 22 * alpha,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Text
								style={styles.nicknameText}>Nickname</Text>
							<TextInput
								autoCorrect={false}
								placeholder="Nickname"
								style={styles.usernameTextInput}
								onChangeText={(nickname) => this.setState({nickname})}
								defaultValue={nickname}
							/>
						</View>
					</View>
				</View>
				<View
					style={styles.genderView}>
					<Image
						source={require("./../../assets/images/line-3-copy.png")}
						style={styles.seperatorTwoImage}/>
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
								height: 16 * alpha,
								marginLeft: 22 * alpha,
								marginRight: 86 * alpha,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Text
								style={styles.genderText}>Gender</Text>
							<View
								style={styles.selectedradioView}>
								<RadioForm formHorizontal={true} animation={true} >
									{this.state.gender_options.map((obj, i) => {
										var onPress = (value, index) => {
											console.log("Gender",value)
											this.setState({
												gender: value,
												genderIndex: index
											})
										}
										return (
											<RadioButton labelHorizontal={true} key={i} >
												{/*  You can set RadioButtonLabel before RadioButtonInput */}
												<RadioButtonInput
													obj={obj}
													index={i}
													isSelected={this.state.gender === i}
													onPress={onPress}
													buttonInnerColor={'#EEEAEA'}
													buttonOuterColor={this.state.genderIndex === i ? '#00B2E3' : '#EEEAEA'}
													selectedButtonColor={'#00B2E3'}
													buttonSize={9 * alpha}
													buttonStyle={{backgroundColor: "rgb(58, 58, 58)", borderWidth: 0, marginRight: 10 * alpha}}
												/>
												<RadioButtonLabel
													obj={obj}
													index={i}
													onPress={onPress}
													labelStyle={{fontSize: 13 * alpha, marginRight: 10 * alpha}}
													labelWrapStyle={{}}
												/>
											</RadioButton>
										)
									})}
								</RadioForm>
								{/*<RadioForm*/}
								{/*	formHorizontal={true}*/}
								{/*	radio_props={radio_props}*/}
								{/*	initial={members.gender}*/}
								{/*	style={{backgroundColor: "blue", justifyContent: "center", alignItems: "center"}}*/}
								{/*	buttonStyle={{backgroundColor: "black", position: "absolute", top: 20}}*/}
								{/*	borderWidth={0}*/}
								{/*	buttonSize={13 * alpha}*/}
								{/*	buttonOuterSize={13 * alpha}*/}
								{/*	buttonInnerColor={'#EEEAEA'}*/}
								{/*	selectedButtonColor={'#00B2E3'}*/}
								{/*	buttonColor={'#EEEAEA'}*/}
								{/*	labelStyle={{backgroundColor:"red",fontSize: 13 * alpha, marginRight: 10 * alpha, alignSelf: 'center'}}*/}
								{/*	onPress={(value) => {this.setState({gender:value})}}*/}
								{/*/>*/}
								{/*<View*/}
								{/*	pointerEvents="box-none"*/}
								{/*	style={{*/}
								{/*		position: "absolute",*/}
								{/*		left: 0 * alpha,*/}
								{/*		right: 0 * alpha,*/}
								{/*		top: 0 * alpha,*/}
								{/*		bottom: 0 * alpha,*/}
								{/*		justifyContent: "center",*/}
								{/*	}}>*/}
								{/*	<Image*/}
								{/*		source={require("./../../assets/images/tick.png")}*/}
								{/*		style={styles.selectedImage}/>*/}
								{/*</View>*/}
								{/*<View*/}
								{/*	pointerEvents="box-none"*/}
								{/*	style={{*/}
								{/*		position: "absolute",*/}
								{/*		left: 0 * alpha,*/}
								{/*		top: 0 * alpha,*/}
								{/*		bottom: 0 * alpha,*/}
								{/*		justifyContent: "center",*/}
								{/*	}}>*/}
								{/*	<View*/}
								{/*		style={styles.tickView}>*/}
								{/*		<Image*/}
								{/*			source={require("./../../assets/images/tick.png")}*/}
								{/*			style={styles.tickImage}/>*/}
								{/*	</View>*/}
								{/*</View>*/}
							</View>
							{/*<Text*/}
							{/*	style={styles.maleText}>Male</Text>*/}
							{/*<View*/}
							{/*	style={{*/}
							{/*		flex: 1,*/}
							{/*	}}/>*/}
							{/*<View*/}
							{/*	style={styles.radioView}/>*/}
							{/*<Text*/}
							{/*	style={styles.femaleText}>Female</Text>*/}
						</View>
					</View>
				</View>
				<View
					style={styles.birthdayView}>
					<Text
						style={styles.birthdayText}>Birthday</Text>
					<DatePicker
						date={this.state.dob}
						mode="date"
						placeholder="Select BirthDate"
						format="YYYY-MM-DD"
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						showIcon={false}
						style={styles.birthdayDatePicker}
						disabled={this.state.dob ? true : false}
						customStyles={{
							dateText: {
								fontFamily: "DINPro-Medium",
								fontSize: 13 * fontAlpha,
								color: "rgb(135, 135, 135)",
							},
							dateInput: {
								height: 18 * alpha,
								borderWidth: 0,
								position: "absolute",
								top: 0,
								left: 61 * alpha,
							},
							disabled: {
								backgroundColor: "transparent"
							}

						}}
						onDateChange={(dob) => {this.setState({dob: dob})}}
					/>
					{/*<TextInput*/}
					{/*	autoCorrect={false}*/}
					{/*	placeholder="1973-11-10"*/}
					{/*	style={styles.birthdayTextInput}*/}
					{/*	defaultValue={"1973-11-10"}*/}
					{/*/>*/}

				</View>
			</View>
			<TouchableOpacity
				onPress={this.onSavePressed}
				style={styles.saveButton}>
				<Text
					style={styles.saveButtonText}>SAVE</Text>
			</TouchableOpacity>
			<TouchableOpacity
					onPress={this.onClosePressed}
					style={styles.closeButton}>
					<Text style={styles.closeButtonText}>X</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={params.onBackPressed ? params.onBackPressed : () => null}
					style={styles.navigationBarItem}>
					<Image
						source={require("./../../assets/images/back.png")}
						style={styles.navigationBarItemIcon}/>
				</TouchableOpacity>
		</View>
		<Toast ref="toast"
            position="center"/>
			<HudLoading isLoading={this.state.loading}/>
		</KeyboardAvoidingView>

	}
}

const styles = StyleSheet.create({
	
	memberProfileView: {
		// backgroundColor: "rgb(243, 243, 243)",
		backgroundColor: "white",
		flex: 1,
	},
	profileView: {
		backgroundColor: "transparent",
		height: 200 * alpha,
		alignItems: "center",
	},
	profilepicView: {
		backgroundColor: "white",
		width: 100 * alpha,
		height: 100 * alpha,
		alignItems: "center",
	},
	avatarImage: {
		backgroundColor: "transparent",
		resizeMode: "contain",
		position: "absolute",
		alignSelf: "center",
		width: 100 * alpha,
		top: 100 * alpha,
		height: 100 * alpha,
	},
	imagebuttonButtonImage: {
		resizeMode: "contain",
	},
	imagebuttonButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		alignSelf: "center",
		width: 80 * alpha,
		top: 0,
		height: 80 * alpha,
	},
	nameText: {
		backgroundColor: "transparent",
		color: "rgb(10, 10, 10)",
		fontFamily: "SFProText-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 14 * alpha,
	},
	personalInfoView: {
		backgroundColor: "transparent",
		height: 172 * alpha,
		marginTop: 10 * alpha,
	},
	nicknameView: {
		backgroundColor: "transparent",
		height: 53 * alpha,
	},
	seperatorImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		position: "absolute",
		left: 22 * alpha,
		right: 22 * alpha,
		top: 50 * alpha,
		height: 3 * alpha,
	},
	nicknameText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	usernameTextInput: {
		backgroundColor: "transparent",
		padding: 0,
		color: "rgb(135, 135, 135)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 200 * alpha,
		height: 16 * alpha,
		marginLeft: 53 * alpha,
	},
	phoneNumberView: {
		backgroundColor: "transparent",
		height: 53 * alpha,
	},
	seperatorView: {
		backgroundColor: "rgb(244, 244, 244)",
		position: "absolute",
		left: 22 * alpha,
		right: 22 * alpha,
		top: 50 * alpha,
		height: 1 * alpha,
	},
	phoneNumberText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	textInputTextInput: {
		color: "rgb(135, 135, 135)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		padding: 0,
		width: 142 * alpha,
		height: 18 * alpha,
		marginLeft: 21 * alpha,
	},
	updateButton: {
		backgroundColor: "transparent",
		borderRadius: 1 * alpha,
		borderWidth: 1,
		borderColor: "rgb(187, 186, 186)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 56 * alpha,
		height: 25 * alpha,
	},
	updateButtonText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	updateButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	genderView: {
		backgroundColor: "transparent",
		height: 53 * alpha,
	},
	seperatorTwoImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		position: "absolute",
		left: 22 * alpha,
		right: 22 * alpha,
		top: 50 * alpha,
		height: 3 * alpha,
	},
	genderText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	selectedradioView: {
		flex: 1,
		height: 53 * alpha,
		backgroundColor: "transparent",
		marginLeft: 69 * alpha,
		alignItems: "center",
		justifyContent: "center",
	},
	birthdayView: {
		backgroundColor: "transparent",
		height: 53 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	birthdayText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 22 * alpha,
	},
	birthdayDatePicker: {
		width: 200 * alpha,
		height: 18 * alpha,
	},
	birthdayTextInput: {
		backgroundColor: "transparent",
		padding: 0,
		color: "rgb(135, 135, 135)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 200 * alpha,
		height: 18 * alpha,
		marginLeft: 61 * alpha,
	},
	saveButtonText: {
		color: "white",
		fontFamily: "SFProText-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	saveButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 4 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "center",
		width: 330 * alpha,
		height: 40 * alpha,
		marginTop: 9 * alpha,
	},
	saveButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	popOutView: {
		backgroundColor: 'white',
		padding: 22 * alpha,
		width: "100%",
		height: 300 * alpha,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	
	headerView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 13 * alpha,
		top: 10 * alpha,
		height: 81 * alpha,
		alignItems: "center",
	},
	titleText: {
		backgroundColor: "transparent",
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	contentText: {
		backgroundColor: "transparent",
		opacity: 0.39,
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 272 * alpha,
		marginTop: 11 * alpha,
	},
	formView: {
		backgroundColor: "transparent",
		height: 152 * alpha,
		marginRight: 9 * alpha,
		marginTop: 29 * alpha,
		alignItems: "flex-start",
	},
	countrycodeButtonText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	countrycodeButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0 * alpha,
		width: 56 * alpha,
		top: 0 * alpha,
		height: 30 * alpha,
	},
	countrycodeButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	lineView: {
		backgroundColor: "rgb(151, 151, 151)",
		opacity: 0.29,
		position: "absolute",
		left: 95 * alpha,
		width: 1 * alpha,
		top: 3 * alpha,
		height: 25 * alpha,
	},
	phoneNumberTextInput: {
		backgroundColor: "transparent",
		padding: 0,
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 193 * alpha,
		height: 30 * alpha,
		marginLeft: 0 * alpha,
	},
	lineTwoView: {
		backgroundColor: "rgb(151, 151, 151)",
		opacity: 0.29,
		alignSelf: "stretch",
		height: 1 * alpha,
		marginRight: 7 * alpha,
		marginTop: 5 * alpha,
	},
	codeTextInput: {
		backgroundColor: "transparent",
		padding: 0,
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 153 * alpha,
		height: 30 * alpha,
	},
	verificationcodeButtonText: {
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	verificationcodeButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 125 * alpha,
		height: 30 * alpha,
		marginLeft: 3 * alpha,
	},
	verificationcodeButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	lineThreeView: {
		backgroundColor: "rgb(151, 151, 151)",
		opacity: 0.29,
		width: 145 * alpha,
		height: 1 * alpha,
		marginTop: 1 * alpha,
	},
	confirmButtonText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	confirmButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 4,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "stretch",
		height: 37 * alpha,
		marginBottom: 7 * alpha,
	},
	confirmButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},

	closeButton: {
		backgroundColor: "transparent",
		borderRadius: 12.5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		width: 25 * alpha,
		height: 25 * alpha,
		top: 51 * alpha,
		right: 23 * alpha,
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
	navigationBarItem: {
		width: 100 * alpha,
		position: "absolute",
		top: 55 * alpha,
		left: 23 * alpha,
	},
	navigationBarItemIcon: {
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
})