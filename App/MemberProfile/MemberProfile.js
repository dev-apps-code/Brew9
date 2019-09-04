//
//  MemberProfile
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, Image, View, StyleSheet } from "react-native"
import React from "react"


export default class MemberProfile extends React.Component {

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
	}

	componentDidMount() {
	
	}

	render() {
	
		return <View
				style={styles.iphone8Copy17View}>
				<View
					style={styles.navigationView}>
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
							style={styles.logoView}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									right: 0,
									top: 0,
									bottom: 0,
									justifyContent: "center",
								}}>
								<View
									style={styles.rightCircleView}>
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
											source={require("./../../assets/images/right-10.png")}
											style={styles.rightImage}/>
									</View>
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
											source={require("./../../assets/images/circle.png")}
											style={styles.circleImage}/>
									</View>
								</View>
							</View>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									right: 0,
									top: 0,
									bottom: 0,
									justifyContent: "center",
								}}>
								<View
									style={styles.leftDotView}>
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
											source={require("./../../assets/images/left-10.png")}
											style={styles.leftImage}/>
									</View>
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
											source={require("./../../assets/images/dot.png")}
											style={styles.dotImage}/>
									</View>
								</View>
							</View>
						</View>
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
							pointerEvents="box-none"
							style={{
								width: 100,
								height: 14,
								marginLeft: 21,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Image
								source={require("./../../assets/images/group-4-3.png")}
								style={styles.group4Image}/>
							<Text
								style={styles.personalInfoText}>Personal Info</Text>
						</View>
					</View>
				</View>
				<View
					style={styles.contentView}>
					<View
						style={styles.profilePicView}>
						<Image
							source={require("./../../assets/images/profile-pic-copy.png")}
							style={styles.profilePicCopyImage}/>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.nobodyText}>Nobody</Text>
					</View>
					<View
						style={styles.infoView}>
						<View
							pointerEvents="box-none"
							style={{
								height: 84,
							}}>
							<View
								style={styles.phoneNumberView}>
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
											height: 17,
											marginLeft: 33,
											marginRight: 31,
											flexDirection: "row",
											alignItems: "center",
										}}>
										<Text
											style={styles.phoneNumberText}>Phone Number</Text>
										<Text
											style={styles.textTwoText}>186****0231</Text>
										<View
											style={{
												flex: 1,
											}}/>
										<View
											style={styles.updateView}>
											<Text
												style={styles.updateText}>update</Text>
										</View>
									</View>
								</View>
								<View
									style={styles.line17View}/>
							</View>
							<View
								style={styles.nicknameView}>
								<Text
									style={styles.nicknameText}>Nickname</Text>
								<Text
									style={styles.nobodyTwoText}>Nobody</Text>
							</View>
						</View>
						<View
							style={styles.genderView}>
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
										height: 14,
										marginLeft: 33,
										marginRight: 81,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={styles.genderText}>Gender</Text>
									<View
										style={styles.tickView}>
										<Image
											source={require("./../../assets/images/tick.png")}
											style={styles.tickImage}/>
									</View>
									<Text
										style={styles.maleText}>male</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<View
										style={styles.ovalCopy3View}/>
									<Text
										style={styles.femaleText}>female</Text>
								</View>
							</View>
							<View
								style={styles.line3View}/>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.birthdayView}>
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
										width: 175,
										height: 14,
										marginLeft: 33,
										flexDirection: "row",
										alignItems: "center",
									}}>
									<Text
										style={styles.birthdayText}>Birthday</Text>
									<Text
										style={styles.textText}>1973-11-10</Text>
								</View>
							</View>
							<View
								style={styles.line3CopyView}/>
						</View>
						<View
							style={styles.saveView}>
							<Text
								style={styles.saveText}>SAVE</Text>
						</View>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	iphone8Copy17View: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	navigationView: {
		backgroundColor: "transparent",
		height: 52,
		marginTop: 20,
	},
	logoView: {
		backgroundColor: "white",
		height: 52,
	},
	rightCircleView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
		marginRight: 9,
	},
	rightImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		opacity: 0.6,
		width: null,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	circleImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 16,
		marginLeft: 12,
		marginRight: 17,
	},
	leftDotView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
		marginRight: 47,
	},
	leftImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		opacity: 0.61,
		width: null,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	dotImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 6,
		marginLeft: 13,
		marginRight: 12,
	},
	group4Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 13,
		height: 12,
	},
	personalInfoText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 10,
	},
	contentView: {
		backgroundColor: "transparent",
		height: 595,
	},
	profilePicView: {
		backgroundColor: "white",
		height: 153,
		alignItems: "center",
	},
	profilePicCopyImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 90,
		height: 89,
		marginTop: 17,
	},
	nobodyText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginBottom: 16,
	},
	infoView: {
		backgroundColor: "white",
		height: 168,
		marginTop: 10,
	},
	phoneNumberView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 41,
		height: 43,
	},
	phoneNumberText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	textTwoText: {
		color: "rgb(58, 58, 58)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 33,
	},
	updateView: {
		backgroundColor: "transparent",
		borderRadius: 1,
		borderWidth: 1,
		borderColor: "rgb(216, 215, 215)",
		borderStyle: "solid",
		width: 49,
		height: 16,
		justifyContent: "center",
	},
	updateText: {
		color: "rgb(127, 127, 127)",
		fontFamily: "Helvetica",
		fontSize: 8,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 12,
		marginRight: 12,
	},
	line17View: {
		backgroundColor: "rgb(244, 244, 244)",
		position: "absolute",
		alignSelf: "center",
		width: 311,
		top: 0,
		height: 1,
	},
	nicknameView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 42,
		flexDirection: "row",
		alignItems: "center",
	},
	nicknameText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 33,
	},
	nobodyTwoText: {
		backgroundColor: "transparent",
		color: "rgb(58, 58, 58)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 62,
	},
	genderView: {
		backgroundColor: "transparent",
		height: 42,
	},
	genderText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	tickView: {
		backgroundColor: "rgb(112, 110, 110)",
		borderRadius: 6,
		width: 12,
		height: 12,
		marginLeft: 76,
		justifyContent: "center",
	},
	tickImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 7,
		marginLeft: 3,
		marginRight: 1,
	},
	maleText: {
		color: "rgb(58, 58, 58)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 9,
	},
	ovalCopy3View: {
		backgroundColor: "rgb(233, 233, 233)",
		borderRadius: 6,
		width: 12,
		height: 12,
		marginRight: 9,
	},
	femaleText: {
		color: "rgb(58, 58, 58)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		opacity: 0.59,
	},
	line3View: {
		backgroundColor: "rgb(244, 244, 244)",
		position: "absolute",
		right: 30,
		width: 310,
		top: 0,
		height: 1,
	},
	birthdayView: {
		backgroundColor: "transparent",
		height: 42,
		marginBottom: 20,
	},
	birthdayText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	textText: {
		color: "rgb(135, 135, 135)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 70,
	},
	line3CopyView: {
		backgroundColor: "rgb(244, 244, 244)",
		position: "absolute",
		right: 29,
		width: 310,
		top: 0,
		height: 1,
	},
	saveView: {
		backgroundColor: "rgb(164, 163, 163)",
		borderRadius: 4,
		alignSelf: "center",
		width: 236,
		height: 40,
		marginTop: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	saveText: {
		color: "white",
		fontFamily: "Helvetica-Bold",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
})
