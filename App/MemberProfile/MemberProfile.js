//
//  MemberProfile
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";

export default class MemberProfile extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Personal Info",
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
	}

	componentDidMount() {
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	onUpdatePressed = () => {
	
	}

	onSavePressed = () => {
	
	}

	render() {

		return <View
			style={styles.memberProfileView}>
			<View
				style={styles.profileView}>
				<View
					style={styles.profilepicView}>
					<Image
						source={require("./../../assets/images/profile-pic-copy-2.png")}
						style={styles.avatarImage}/>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.nameText}>Nobody</Text>
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
							left: 0,
							top: 0,
							bottom: 0,
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
								placeholder="Nobody"
								style={styles.usernameTextInput}/>
						</View>
					</View>
				</View>
				<View
					style={styles.phoneNumberView}>
					<View
						style={styles.seperatorView}/>
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
								height: 25 * alpha,
								marginLeft: 22 * alpha,
								marginRight: 22 * alpha,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Text
								style={styles.phoneNumberText}>Phone Number</Text>
							<TextInput
								autoCorrect={false}
								placeholder="186****0231"
								style={styles.textInputTextInput}/>
							<View
								style={{
									flex: 1,
								}}/>
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
						style={styles.seperatorTwoImage}/>
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
									<Image
										source={require("./../../assets/images/tick.png")}
										style={styles.selectedImage}/>
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
									<View
										style={styles.tickView}>
										<Image
											source={require("./../../assets/images/tick.png")}
											style={styles.tickImage}/>
									</View>
								</View>
							</View>
							<Text
								style={styles.maleText}>Male</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								style={styles.radioView}/>
							<Text
								style={styles.femaleText}>Female</Text>
						</View>
					</View>
				</View>
				<View
					style={styles.birthdayView}>
					<Text
						style={styles.birthdayText}>Birthday</Text>
					<TextInput
						autoCorrect={false}
						placeholder="1973-11-10"
						style={styles.birthdayTextInput}/>
				</View>
			</View>
			<TouchableOpacity
				onPress={this.onSavePressed}
				style={styles.saveButton}>
				<Text
					style={styles.saveButtonText}>SAVE</Text>
			</TouchableOpacity>
		</View>
	}
}

const styles = StyleSheet.create({
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
	},
	navigationBarItem: {

	},
	navigationBarItemTitle: {
		color: "black",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
	},
	navigationBarItemIcon: {
		tintColor: "black",
	},
	memberProfileView: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	profileView: {
		backgroundColor: "white",
		height: 161 * alpha,
		alignItems: "center",
	},
	profilepicView: {
		backgroundColor: "transparent",
		width: 81 * alpha,
		height: 110 * alpha,
		marginTop: 27 * alpha,
	},
	avatarImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 80 * alpha,
	},
	nameText: {
		backgroundColor: "transparent",
		color: "rgb(10, 10, 10)",
		fontFamily: "Helvetica-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 15 * alpha,
		marginRight: 17 * alpha,
	},
	personalInfoView: {
		backgroundColor: "white",
		height: 200 * alpha,
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
		fontFamily: "Helvetica-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	usernameTextInput: {
		backgroundColor: "transparent",
		padding: 0,
		color: "rgb(58, 58, 58)",
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
		fontFamily: "Helvetica-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	textInputTextInput: {
		color: "rgb(58, 58, 58)",
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
		fontFamily: "Helvetica-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	selectedradioView: {
		backgroundColor: "transparent",
		width: 12 * alpha,
		height: 12 * alpha,
		marginLeft: 69 * alpha,
	},
	selectedImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 7 * alpha,
		marginLeft: 3 * alpha,
		marginRight: 1 * alpha,
	},
	tickView: {
		backgroundColor: "rgb(112, 110, 110)",
		borderRadius: 6 * alpha,
		width: 12 * alpha,
		height: 12 * alpha,
		justifyContent: "center",
	},
	tickImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 7 * alpha,
		marginLeft: 3 * alpha,
		marginRight: 1 * alpha,
	},
	maleText: {
		backgroundColor: "transparent",
		color: "rgb(58, 58, 58)",
		fontFamily: "Helvetica-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 8 * alpha,
	},
	radioView: {
		backgroundColor: "rgb(238, 234, 234)",
		borderRadius: 6 * alpha,
		borderWidth: 1,
		borderColor: "rgb(226, 226, 226)",
		borderStyle: "solid",
		width: 12 * alpha,
		height: 12 * alpha,
		marginRight: 5 * alpha,
	},
	femaleText: {
		color: "rgb(58, 58, 58)",
		fontFamily: "Helvetica-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		opacity: 0.59,
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
		fontFamily: "Helvetica-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 22 * alpha,
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
		fontFamily: "Helvetica-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	saveButton: {
		backgroundColor: "rgb(164, 163, 163)",
		borderRadius: 4 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "center",
		width: 330 * alpha,
		height: 40 * alpha,
		marginTop: 39 * alpha,
	},
	saveButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
})
