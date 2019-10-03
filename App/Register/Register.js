//
//  Register
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, StyleSheet, TextInput, View, TouchableOpacity, Image, TouchableHighlight } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";
import {connect} from "react-redux";
import PhoneInput from 'react-native-phone-input'
import Toast, {DURATION} from 'react-native-easy-toast'
import HudLoading from "../Components/HudLoading"
import ActivateAccountRequestObject from '../Requests/activate_account_request_object'
import LoginWithSmsRequestObject from "../Requests/login_with_sms_request_object"
import {createAction, Storage} from "../Utils"
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import DatePicker from 'react-native-datepicker'

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
			dob: "",
			nickname: "",
			gender_options: [
				{label: 'Male', value: 0 },
				{label: 'Female', value: 1 }
			],
			gender: 0,
			genderIndex: 0,
		}
	}

	componentDidMount() {
	
	}

	onContinuePressed = () => {
	
	}

	onClosePressed = () => {
		this.props.navigation.goBack()
	}


	render() {
	
		return <View
				style={styles.registerView}>
				<View
					style={styles.modalView}>
					<TouchableOpacity
						onPress={this.onClosePressed}
						style={styles.closeButton}>
						<Text
							style={styles.closeButtonText}>X</Text>
					</TouchableOpacity>
					<View
						style={styles.nameView}>
						<TextInput
							autoCorrect={false}
							placeholder="Name"
							style={styles.nameTextInput}/>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.seperatorView}/>
					</View>
					<View
						style={styles.genderView}>
						<View
							style={styles.seperatorThreeView}/>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0,
								right: 0,
								top: 0,
								bottom: 0,
								justifyContent: "center",
							}}>
							<View
								pointerEvents="box-none"
								style={{
									height: 23 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								{/* <View
									style={styles.ovalView}/>
								<Text
									style={styles.maleText}>Male</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.viewView}>
									<View
										style={styles.ovalCopy3View}/>
									<Text
										style={styles.femaleText}>Female</Text>
								</View> */}
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
							</View>
						</View>
					</View>
					<View
						style={styles.birthdayView}>
						<View
							style={styles.seperatorTwoView}/>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0,
								right: 0,
								top: 0,
								bottom: 0,
								justifyContent: "center",
							}}>
							{/* <TextInput
								autoCorrect={false}
								placeholder="Birthday"
								style={styles.birthdayTextInput}/> */}
								<DatePicker
									date={this.state.dob}
									mode="date"
									placeholder="Select BirthDate"
									format="YYYY-MM-DD"
									confirmBtnText="Confirm"
									cancelBtnText="Cancel"
									showIcon={false}
									style={styles.birthdayTextInput}
									disabled={this.state.dob ? true : false}
									customStyles={{
										dateText: {
											color: "rgb(93, 93, 93)",
											fontFamily: "Helvetica-Oblique",
											fontSize: 18 * fontAlpha,
											fontStyle: "normal",
											fontWeight: "normal",
											textAlign: "center",
											backgroundColor: "transparent",
											padding: 0,
											
											// fontFamily: "DINPro-Medium",
											// fontSize: 13 * fontAlpha,
											// color: "rgb(135, 135, 135)",
										},
										dateInput: {
											height: 18 * alpha,
											borderWidth: 0,
											position: "absolute",
											top: 0,
										},
										disabled: {
											backgroundColor: "transparent"
										}

									}}
									onDateChange={(dob) => {this.setState({dob: dob})}}
								/>
						</View>
					</View>
					<TouchableOpacity
						onPress={this.onContinuePressed}
						style={styles.continueButton}>
						<Text
							style={styles.continueButtonText}>Continue</Text>
					</TouchableOpacity>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	registerView: {
		backgroundColor: "white",
		flex: 1,
	},
	modalView: {
		backgroundColor: "white",
		flex: 1,
		marginTop: 27 * alpha,
		alignItems: "center",
	},
	closeButton: {
		backgroundColor: "transparent",
		borderRadius: 12.5,
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
	closeButtonText: {
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 20 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	closeButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	nameView: {
		backgroundColor: "transparent",
		width: 281 * alpha,
		height: 41 * alpha,
		marginTop: 197 * alpha,
	},
	nameTextInput: {
		color: "rgb(93, 93, 93)",
		fontFamily: "Helvetica-Oblique",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		padding: 0,
		height: 22 * alpha,
		marginTop: 4 * alpha,
	},
	seperatorView: {
		backgroundColor: "rgb(213, 213, 213)",
		height: 1 * alpha,
		marginBottom: 1,
	},
	genderView: {
		backgroundColor: "transparent",
		width: 282 * alpha,
		height: 41 * alpha,
	},
	seperatorThreeView: {
		backgroundColor: "rgb(213, 213, 213)",
		position: "absolute",
		left: 1,
		right: 1,
		bottom: 1,
		height: 1 * alpha,
	},
	ovalView: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 7.5,
		width: 15 * alpha,
		height: 15 * alpha,
	},
	maleText: {
		backgroundColor: "transparent",
		color: "rgb(58, 58, 58)",
		fontFamily: "Helvetica-Oblique",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 9 * alpha,
	},
	viewView: {
		backgroundColor: "transparent",
		width: 84 * alpha,
		height: 23 * alpha,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	ovalCopy3View: {
		backgroundColor: "rgb(238, 234, 234)",
		borderRadius: 7.5,
		borderWidth: 1 * alpha,
		borderColor: "rgb(226, 226, 226)",
		borderStyle: "solid",
		width: 15 * alpha,
		height: 15 * alpha,
		marginRight: 8 * alpha,
	},
	femaleText: {
		color: "rgb(58, 58, 58)",
		fontFamily: "Helvetica-Oblique",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		opacity: 0.59,
	},
	birthdayView: {
		backgroundColor: "transparent",
		width: 282 * alpha,
		height: 41 * alpha,
	},
	seperatorTwoView: {
		backgroundColor: "rgb(213, 213, 213)",
		position: "absolute",
		left: 1,
		right: 1,
		bottom: 1,
		height: 1 * alpha,
	},
	birthdayTextInput: {
		textAlign: "center",
		backgroundColor: "transparent",
		padding: 0,
		width: 283 * alpha,
		height: 23 * alpha,
		marginTop: 9 * alpha,
	},
	continueButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 4,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 280 * alpha,
		height: 38 * alpha,
		marginTop: 95 * alpha,
	},
	continueButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	continueButtonText: {
		color: "white",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
	selectedradioView: {
		flex: 1,
		height: 53 * alpha,
		backgroundColor: "transparent",
		marginLeft: 69 * alpha,
		alignItems: "center",
		justifyContent: "center",
	},
})
