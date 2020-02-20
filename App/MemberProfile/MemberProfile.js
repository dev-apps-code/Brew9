//
//  MemberProfile
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowHeight } from "../Common/size"
import { createAction, validateEmail } from "../Utils"
import { getAppVersion, getBuildVersion } from "../Utils/server";
import UpdateProfileRequestObject from "../Requests/update_profile_request_object"
import UpdateAvatarRequestObject from "../Requests/update_avatar_request_object"
import UpdatePhoneNumberRequestObject from "../Requests/update_phone_number_request_object"
import VerifyPhoneNumberUpdateRequestObject from "../Requests/verify_phone_number_update_request_object"
import * as SecureStore from "expo-secure-store"
import Modal from "react-native-modal"
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { connect } from "react-redux"
import PhoneInput from 'react-native-phone-input'
import * as ImagePicker from "expo-image-picker"
import Constants from "expo-constants"
import * as Permissions from "expo-permissions"
import DatePicker from 'react-native-datepicker'
import Toast, { DURATION } from 'react-native-easy-toast'
import HudLoading from "../Components/HudLoading"
import { Image as ExpoImage } from "react-native-expo-image-cache";
import { TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR, DISABLED_COLOR, commonStyles, TOAST_DURATION, LIGHT_GREY } from "../Common/common_style";
import moment from 'moment';
import { getMemberIdForApi } from '../Services/members_helper'
import Brew9Modal from '../Components/Brew9Modal'

@connect(({ members }) => ({
	members: members.profile
}))
export default class MemberProfile extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			headerTitle: <Text style={{ textAlign: 'center', alignSelf: "center", fontFamily: TITLE_FONT }}>Personal Info</Text>,
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
		this.state = {
			country_code: "673",
			country: "bn",
			members: [],
			modalVisible: false,
			member_phone_number: "",
			dob: "",
			nickname: "",
			email: "",
			image: {
				uri: null
			},
			phone_no: "",
			gender_options: [
				{ label: 'Male', value: 0 },
				{ label: 'Female', value: 1 }
			],
			verification_code: "",
			gender: 2,
			genderIndex: 0,
			selected_image: null,
			has_send_code: false,
			member_have_dob: false,
			birthdayAlert: false
		}
	}

	componentDidMount() {
		this.loadMember()
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

	loadUpdateProfile(formData) {
		const { dispatch } = this.props


		this.setState({ loading: true })
		const callback = eventObject => {
			console.log('eventobject', eventObject)
			if (eventObject.success) {
				this.refs.toast.show("Profile updated successfully", TOAST_DURATION)

			} else {
				this.refs.toast.show(eventObject.message, TOAST_DURATION)
			}
			this.setState({
				loading: false,
			})
		}
		const obj = new UpdateProfileRequestObject(formData.dob, formData.nickname, formData.gender, formData.email)
		obj.setUrlId(getMemberIdForApi(this.state.members))
		dispatch(
			createAction('members/loadUpdateProfile')({
				object: obj,
				callback,
			})
		)
	}

	loadUpdateAvatar(formData) {
		const { dispatch } = this.props

		this.setState({ loading: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.refs.toast.show("Avatar updated successfully", TOAST_DURATION)

			} else {
				this.refs.toast.show(eventObject.message, TOAST_DURATION)
			}
			this.setState({
				loading: false,
			})
		}
		const obj = new UpdateAvatarRequestObject(formData.image)
		obj.setUrlId(getMemberIdForApi(this.state.members))
		dispatch(
			createAction('members/loadUpdateAvatar')({
				object: obj,
				callback,
			})
		)
	}

	loadUpdatePhoneNumber(formData) {
		const { dispatch } = this.props
		this.setState({ loading: true })
		const callback = eventObject => {
			if (eventObject.message) {
				this.refs.toast.show(eventObject.message, TOAST_DURATION)
			}
			this.setState({
				loading: false,
				has_send_code: true
			})
		}
		const obj = new UpdatePhoneNumberRequestObject(formData.phone_no, formData.country_code)
		obj.setUrlId(getMemberIdForApi(this.state.members))
		dispatch(
			createAction('members/loadUpdatePhoneNumber')({
				object: obj,
				callback,
			})
		)
	}

	loadVerifyPhoneNumberUpdate(formData) {
		const { dispatch } = this.props
		this.setState({ loading: true })
		const callback = eventObject => {

			if (eventObject.success) {
				this.setState({
					member_phone_number: this.state.phone_no,
					modalVisible: false,
				})
			} else {
				this.refs.toast.show(eventObject.message, TOAST_DURATION)
			}
			this.setState({
				loading: false,
			})
		}
		const obj = new VerifyPhoneNumberUpdateRequestObject(formData.code, formData.phone_no, formData.country_code)
		obj.setUrlId(getMemberIdForApi(this.state.members))
		dispatch(
			createAction('members/loadVerifyPhoneNumberUpdate')({
				object: obj,
				callback,
			})
		)
	}

	loadMember() {
		const { members } = this.props
		this.setState({
			members: members,
			image: {
				uri: members.image
			},
			dob: members.dob,
			nickname: members.nickname,
			gender: members.gender,
			email: members.email,
			member_phone_number: members.phone_no
		})

		if (members.dob != undefined) {
			this.setState({
				member_have_dob: true
			})
		}
	}

	_pickImage = async () => {

		var get_permission = await this.getPermissionAsync()
		if (get_permission) {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
			});

			if (!result.cancelled) {

				let data = {
					uri: result.uri,
					name: Math.random().toString(36).substr(2, 5) + 'avatar.jpg',
					type: 'image/jpg'
				}
				this.setState({
					image: data
				}, function () {
					this.uploadAvatar()
				})
			}
		} else {
			this.refs.toast.show("Please enable camera roll permission in settings.", TOAST_DURATION)
		}
	}

	checkForm = () => {
		if (this.state.gender == null) {
			this.refs.toast.show("Please select your gender", 500)
			return false
		} else if (!this.state.nickname) {
			this.refs.toast.show("Please select a nickname", 500)
			return false
		}
		else if (!this.state.dob) {
			this.refs.toast.show("Please select your birthday", 500)
			return false
		}
		else if (this.state.email != null && this.state.email.length > 0) {
			if (!validateEmail(this.state.email)) {
				this.refs.toast.show("Please enter a valid email", 500)
				return false
			}
		}

		return true

	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	onUpdatePressed = () => {
		this.setState({ modalVisible: true })
	}

	onClosePressed = () => {
		Keyboard.dismiss()
		this.setState({ modalVisible: false, phone_no: '', has_send_code: false })
	}

	onUpdateCode(iso2) {
		var country_code = this.phone.getCountryCode()
		this.setState({
			country: iso2,
			country_code: country_code,
		})
	}

	onSendCodePressed = () => {
		const { country_code, phone_no } = this.state

		if (country_code == '' || country_code == undefined || phone_no == '' || phone_no == undefined) {
			this.refs.toast.show("Please fill in phone number", TOAST_DURATION)
			return
		}

		this.setState({
			loading: true,
		})
		const phoneFormData = {
			// phone_no: this.state.phone_no,
			phone_no,
			country_code
		}

		this.loadUpdatePhoneNumber(phoneFormData)
	}

	onConfirmButtonPressed = () => {

		const { verification_code, has_send_code } = this.state

		if (!has_send_code) {
			return
		}
		if (verification_code == '' || verification_code == undefined) {
			this.refs.toast.show("Please fill in sms code", TOAST_DURATION)
			return
		}
		this.setState({
			loading: true,
		})
		const phoneFormData = {
			code: this.state.verification_code,
			// phone_no: this.state.phone_no,
			phone_no: this.state.phone_no,
			// country_code: this.state.country_code,
			country_code: this.state.country_code,
		}

		this.loadVerifyPhoneNumberUpdate(phoneFormData)
	}

	uploadAvatar = () => {
		const profileFormData = {
			image: this.state.image,
		}
		this.loadUpdateAvatar(profileFormData)
	}

	onSavePressed = () => {

		let formcheck = this.checkForm()

		if (formcheck) {
			const profileFormData = {
				dob: this.state.dob,
				nickname: this.state.nickname,
				image: this.state.image,
				gender: this.state.gender,
				email: this.state.email,
			}
			this.loadUpdateProfile(profileFormData)
		}
	}
	onChangeBirthdate = (dob) => {
		this.setState({ dob: dob, birthdayAlert: true })

	}

	renderModalContent = () => (
		<View
			style={styles.popOutView}>
			<View
				pointerEvents="box-none"
				style={{
					position: "absolute",
					width: "100%",
					top: 15 * alpha,
					height: "100%",
				}}>
				<View
					pointerEvents="box-none"
					style={{
						height: 81 * alpha,
						marginLeft: 6 * alpha,
					}}>
					<TouchableOpacity
						onPress={this.onClosePressed}
						style={styles.closeButton}>
						<Text
							style={styles.closeButtonText}>X</Text>
					</TouchableOpacity>
					<View
						style={styles.headerView}>
						<Text
							style={styles.titleText}>Tips</Text>
						<Text
							style={styles.contentText}>To ensure undisrupted use of Brew9 App, please ensure the new phone number is not in used.</Text>
					</View>
				</View>
				<View
					style={styles.formView}>
					<View
						pointerEvents="box-none"
						style={{
							width: "100%",
							height: 30 * alpha,
							flexDirection: "row",
							alignItems: "flex-start",
						}}>
						<View
							pointerEvents="box-none"
							style={{
								width: 106 * alpha,
								height: 30 * alpha,
								alignItems: "center",
								justifyContent: "center",
							}}>
							<TouchableOpacity
								style={styles.countrycodeButton}>
								<Text
									style={styles.countrycodeButtonText}>+673</Text>
							</TouchableOpacity>
							{/* <PhoneInput
								ref={(ref) => { this.phone = ref }}
								initialCountry={this.state.country}
								textStyle={styles.phoneCountryCodeText}
								disabled={true}
								textProps={{keyboardType:"number-pad", editable:false}}
								onSelectCountry={(iso2) => this.onUpdateCode(iso2)}
								offset={10}

							/> */}
							<View
								style={styles.lineView} />
						</View>
						<TextInput
							keyboardType="number-pad"
							clearButtonMode="always"
							autoCorrect={false}
							placeholder="Phone Number"
							onChangeText={(phone_no) => this.setState({ phone_no })}
							style={styles.phoneNumberTextInput} />
					</View>
					<View
						style={styles.lineTwoView} />
					<View
						pointerEvents="box-none"
						style={{
							width: "100%",
							height: 30 * alpha,
							marginTop: 4 * alpha,
							flexDirection: "row",
							alignItems: "flex-start",
						}}>
						<TextInput
							autoCorrect={false}
							placeholder="SMS Code"
							keyboardType="number-pad"
							onChangeText={(verification_code) => this.setState({ verification_code })}
							style={styles.codeTextInput} />
						<View style={{ flex: 1 }} />
						<TouchableOpacity
							onPress={() => this.onSendCodePressed()}
							style={styles.verificationcodeButton}>
							<Text
								style={styles.verificationcodeButtonText}>Send Code</Text>
						</TouchableOpacity>
					</View>
					<View
						style={styles.lineThreeView} />
					<View
						style={{
							flex: 1,
						}} />
					<TouchableOpacity
						onPress={this.onConfirmButtonPressed}
						style={this.state.has_send_code ? styles.confirmButton : styles.confirmDisabledButton}>
						<Text
							style={styles.confirmButtonText}>Confirm</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)

	render() {

		const { members, image, dob, nickname, gender, member_phone_number, email, selected_image } = this.state;
		const preview = { uri: require("./../../assets/images/user.png") };
		const uri = image.uri
		let maxDate = new Date(moment().subtract(10, 'years').calendar())
		let maxYear = maxDate.getFullYear()
		return <KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : null}
			keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
			style={{ flex: 1 }}
			enabled><View
				style={styles.memberProfileView}>
				<View
					style={styles.profileView}>
					<View
						style={styles.profilepicView}>
						<View
							pointerEvents="box-none"
						>
							<View style={styles.avatarImageContainer}>
								{image.uri != null ? <ExpoImage style={styles.avatarImage} {...{ uri, uri }} /> : <Image
									source={require("./../../assets/images/user.png")}
									style={styles.avatarImage} />}
							</View>
							<TouchableOpacity
								onPress={this._pickImage}
								style={styles.imagebuttonButton}>
							</TouchableOpacity>
							{image.uri == null && (<Text
								style={styles.avatarUploadText}>Upload Photo</Text>)}
						</View>
						<Text
							style={styles.nameText}>{members.nickname}</Text>
					</View>
				</View>
				<View
					style={styles.personalInfoView}>
					<View
						style={styles.nicknameView}>
						<Image
							source={require("./../../assets/images/line-17.png")}
							style={styles.seperatorImage} />
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
									returnKeyType={'done'}
									onChangeText={(nickname) => this.setState({ nickname })}
									defaultValue={nickname}
								/>
							</View>
						</View>
					</View>
					<View
						style={styles.emailView}>
						<Image
							source={require("./../../assets/images/line-17.png")}
							style={styles.seperatorImage} />
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
									style={styles.emailText}>Email</Text>
								<TextInput
									autoCorrect={false}
									placeholder="Email (optional)"
									style={styles.emailTextInput}
									returnKeyType={'done'}
									onChangeText={(email) => this.setState({ email })}
									defaultValue={email}
								/>
							</View>
						</View>
					</View>
					<View
						style={styles.phoneNumberView}>
						<View
							style={styles.seperatorView} />
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
									height: 25 * alpha,
									marginLeft: 22 * alpha,
									marginRight: 22 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Text
									style={styles.phoneNumberText}>Phone Number</Text>
								<Text
									style={styles.textInputTextInput}>{member_phone_number}</Text>
								<View
									style={{
										flex: 1,
									}} />
								<TouchableOpacity
									onPress={this.onUpdatePressed}
									style={styles.updateButton}>
									<Text
										style={styles.updateButtonText}>update</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View
						style={styles.genderView}>
						<Image
							source={require("./../../assets/images/line-3-copy.png")}
							style={styles.seperatorTwoImage} />
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
														buttonInnerColor={PRIMARY_COLOR}
														buttonOuterColor={this.state.genderIndex === i ? '#00B2E3' : PRIMARY_COLOR}
														selectedButtonColor={'#00B2E3'}
														buttonSize={5 * alpha}
														buttonStyle={{ backgroundColor: "rgb(200, 200, 200)", borderWidth: 0, marginRight: 5 * alpha, marginTop: 2 * alpha }}
													/>
													<RadioButtonLabel
														obj={obj}
														index={i}
														onPress={onPress}
														labelStyle={{ color: "rgb(135, 135, 135)", fontSize: 13 * fontAlpha, marginRight: 10 * alpha, fontFamily: NON_TITLE_FONT }}
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
							placeholder="Birthday"
							format="DD-MM-YYYY"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							showIcon={false}
							maxDate={"31-12-" + maxYear}
							style={styles.birthdayDatePicker}
							disabled={this.state.member_have_dob}
							customStyles={{
								dateText: {
									fontFamily: NON_TITLE_FONT,
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
							onDateChange={(dob) => { this.onChangeBirthdate(dob) }}
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
					onPress={() => this.onSavePressed()}
					style={styles.saveButton}>
					<Text
						style={styles.saveButtonText}>SAVE</Text>
				</TouchableOpacity>

				<Modal isVisible={this.state.modalVisible}
					coverScreen={false}
					avoidKeyboard={true}>
					{this.renderModalContent()}
				</Modal>
				<Brew9Modal visible={this.state.birthdayAlert}
					cancelable={true}
					title={"Birthday alert "}
					description={"Once you enter your birthday date, you can not update it again. Please make sure your birthday is correct!"}
					okayButtonAction={() => { this.setState({ birthdayAlert: false }) }}
					cancelButtonAction={() => this.setState({ birthdayAlert: false, dob: "" })} />

			</View>
			<Toast ref="toast" style={{ bottom: (windowHeight / 2) - 40 }} textStyle={{ fontFamily: TITLE_FONT, color: "#ffffff" }} />
			<HudLoading isLoading={this.state.loading} />
			<Text
				style={styles.versionText}>Version {getAppVersion()} (Build {getBuildVersion()})</Text>
		</KeyboardAvoidingView>

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
	memberProfileView: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	profileView: {
		backgroundColor: "white",
		alignItems: "center",
	},
	profilepicView: {
		backgroundColor: "transparent",
		marginTop: 27 * alpha,
		alignItems: "center",
	},
	avatarImageContainer: {
		backgroundColor: "gray",
		borderRadius: 40 * alpha,
		resizeMode: "contain",
		alignSelf: "center",
		width: 80 * alpha,
		height: 80 * alpha,
	},
	avatarImage: {
		backgroundColor: "transparent",
		borderRadius: 40 * alpha,
		resizeMode: "contain",
		alignSelf: "center",
		width: 80 * alpha,
		position: "absolute",
		left: 0,
		top: 0,
		height: 80 * alpha,
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
	avatarUploadText: {
		backgroundColor: "transparent",
		color: LIGHT_GREY,
		fontFamily: TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
		marginTop: 4 * alpha,
	},
	nameText: {
		backgroundColor: "transparent",
		color: "rgb(10, 10, 10)",
		fontFamily: TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
		marginTop: 10 * alpha,
		marginBottom: 10 * alpha,
	},
	personalInfoView: {
		backgroundColor: "white",
		height: 270 * alpha,
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
		fontFamily: TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		width: 110 * alpha,
		textAlign: "left",
	},
	usernameTextInput: {
		backgroundColor: "transparent",
		padding: 0,
		color: "rgb(135, 135, 135)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 200 * alpha,
		height: 16 * alpha,
	},
	emailView: {
		backgroundColor: "transparent",
		height: 53 * alpha,
	},
	emailText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		width: 110 * alpha,
		textAlign: "left",
	},
	emailTextInput: {
		backgroundColor: "transparent",
		padding: 0,
		color: "rgb(135, 135, 135)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 200 * alpha,
		height: 16 * alpha,
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
		fontFamily: TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		width: 110 * alpha,
		textAlign: "left",
		backgroundColor: "transparent",
	},
	textInputTextInput: {
		color: "rgb(135, 135, 135)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		padding: 0,
		width: 142 * alpha,
		height: 18 * alpha,
	},
	updateButton: {
		backgroundColor: "transparent",
		borderRadius: 1 * alpha,
		borderWidth: 1,
		borderColor: "rgb(187, 186, 186)",
		// borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 56 * alpha,
		height: 25 * alpha,
	},
	updateButtonText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		width: 110 * alpha,
		textAlign: "left",
		backgroundColor: "transparent",
	},
	selectedradioView: {
		flex: 1,
		height: 53 * alpha,
		backgroundColor: "transparent",
		justifyContent: "center",
	},
	birthdayView: {
		backgroundColor: "transparent",
		height: 53 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	versionText: {
		backgroundColor: "rgb(243, 243, 243)",
		color: "rgb(135, 135, 135)",
		fontFamily: TITLE_FONT,
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
		paddingBottom: 15 * alpha
		// paddingLeft: 22 * alpha,
	},
	birthdayText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
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
		fontFamily: NON_TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
		width: 200 * alpha,
		height: 18 * alpha,
		marginLeft: 61 * alpha,
	},
	saveButtonText: {
		color: "white",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
	},
	saveButton: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 4 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "center",
		width: 330 * alpha,
		height: 40 * alpha,
		marginTop: 30 * alpha,
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
	closeButtonText: {
		color: "rgb(113, 113, 113)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	closeButton: {
		backgroundColor: "transparent",
		borderRadius: 12.5 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		right: 0 * alpha,
		width: 25 * alpha,
		top: 0 * alpha,
		height: 25 * alpha,
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
		fontFamily: NON_TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	contentText: {
		backgroundColor: "transparent",
		opacity: 0.39,
		color: "rgb(78, 77, 77)",
		fontFamily: NON_TITLE_FONT,
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
		marginTop: 29 * alpha,
		alignItems: "flex-start",
	},
	countrycodeButtonText: {
		color: "rgb(0, 178, 227)",
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 193 * alpha,
		height: 30 * alpha,
		marginLeft: 0 * alpha,
	},
	lineTwoView: {
		width: "100%",
		backgroundColor: "rgb(151, 151, 151)",
		opacity: 0.29,
		height: 1 * alpha,
		marginTop: 5 * alpha,
	},
	codeTextInput: {
		backgroundColor: "transparent",
		padding: 0,
		color: "black",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 193 * alpha,
		height: 30 * alpha,
	},
	verificationcodeButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	verificationcodeButton: {
		backgroundColor: PRIMARY_COLOR,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		borderRadius: 4 * alpha,
		width: 100 * alpha,
		height: 30 * alpha,
	},
	verificationcodeButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	lineThreeView: {
		backgroundColor: "rgb(151, 151, 151)",
		opacity: 0.29,
		width: 193 * alpha,
		height: 1 * alpha,
		marginTop: 1 * alpha,
	},
	confirmButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	confirmButton: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 4 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "stretch",
		height: 37 * alpha,
		marginBottom: 7 * alpha,
	},
	confirmDisabledButton: {
		backgroundColor: DISABLED_COLOR,
		borderRadius: 4 * alpha,
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

})