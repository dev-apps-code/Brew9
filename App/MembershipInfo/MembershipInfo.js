//
//  MembershipInfo
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"


export default class MembershipInfo extends React.Component {

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
				style={styles.iphone8Copy22View}>
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
											source={require("./../../assets/images/right-14.png")}
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
											source={require("./../../assets/images/left-14.png")}
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
								width: 60,
								height: 14,
								marginLeft: 21,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Image
								source={require("./../../assets/images/group-4-3.png")}
								style={styles.group4Image}/>
							<Text
								style={styles.brew9Text}>Brew9</Text>
						</View>
					</View>
				</View>
				<View
					style={styles.infoviewView}>
					<View
						style={styles.cardlistView}>
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
								style={styles.rectangleView}/>
						</View>
						<View
							style={styles.memberRightsView}>
							<Text
								style={styles.memberRightsText}>Member Rights</Text>
							<View
								pointerEvents="box-none"
								style={{
									alignSelf: "stretch",
									height: 159,
									marginTop: 8,
									flexDirection: "row",
									alignItems: "flex-start",
								}}>
								<View
									style={styles.group2View}>
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
											source={require("./../../assets/images/brew9-doodle-06.png")}
											style={styles.brew9Doodle06Image}/>
									</View>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											left: 19,
											width: 78,
											top: 16,
											bottom: 15,
											alignItems: "flex-start",
										}}>
										<Text
											style={styles.silverMemberText}>Silver Member</Text>
										<View
											style={{
												flex: 1,
											}}/>
										<View
											style={styles.group27View}>
											<Text
												style={styles.textText}>0</Text>
											<Image
												source={require("./../../assets/images/group-25.png")}
												style={styles.group25Image}/>
											<Text
												style={styles.expText}>exp</Text>
											<View
												style={{
													flex: 1,
												}}/>
											<Image
												source={require("./../../assets/images/group-26-4.png")}
												style={styles.group26Image}/>
											<Text
												style={styles.textTwoText}>501</Text>
										</View>
									</View>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<Image
									source={require("./../../assets/images/brew9-doodle-08-copy.png")}
									style={styles.brew9Doodle08CopyImage}/>
							</View>
						</View>
					</View>
					<View
						style={styles.benefitView}>
						<Text
							style={styles.benefitsText}>Benefits </Text>
						<View
							style={styles.viewView}>
							<View
								style={styles.group13View}>
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
										source={require("./../../assets/images/group-11-2.png")}
										style={styles.group11Image}/>
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
										style={styles.stroke12View}/>
								</View>
							</View>
							<Text
								style={styles.offForSpecificText}>10% off for Specific Drinks</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.x1Text}>x1</Text>
						</View>
						<View
							style={styles.activationDayView}>
							<Text
								style={styles.freeDrinkForMembeText}>Free drink for membership activation day</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.x1CopyText}>x1</Text>
						</View>
						<View
							style={styles.viewTwoView}>
							<View
								style={styles.group7View}>
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
										source={require("./../../assets/images/group-6-5.png")}
										style={styles.group6Image}/>
								</View>
								<Text
									style={styles.textThreeText}>28</Text>
							</View>
							<Text
								style={styles.freeDrinkOn528MText}>Free drink on 5.28 Membership Day</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.x1Copy2Text}>x1</Text>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.birthdayView}>
							<Image
								source={require("./../../assets/images/group-17.png")}
								style={styles.groupImage}/>
							<Text
								style={styles.birthdayFreeDrinkText}>Birthday Free Drink</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.onlyAvailableOnYText}>(only available on your birthday)</Text>
							<Text
								style={styles.x1Copy3Text}>x1</Text>
						</View>
						<View
							style={styles.rm5OffView}>
							<Text
								style={styles.rm5OffWithRm150SText}>RM5 off with RM150 spend</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.x2Text}>x2</Text>
						</View>
					</View>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	iphone8Copy22View: {
		backgroundColor: "white",
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
	brew9Text: {
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 10,
	},
	infoviewView: {
		backgroundColor: "transparent",
		height: 581,
	},
	cardlistView: {
		backgroundColor: "transparent",
		height: 231,
	},
	rectangleView: {
		backgroundColor: "transparent",
		width: 375,
		height: 231,
	},
	memberRightsView: {
		backgroundColor: "transparent",
		position: "absolute",
		right: 0,
		width: 659,
		top: 14,
		height: 187,
		alignItems: "flex-start",
	},
	memberRightsText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica",
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	group2View: {
		backgroundColor: "transparent",
		width: 322,
		height: 159,
	},
	brew9Doodle06Image: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: null,
		height: 159,
		marginRight: 1,
	},
	silverMemberText: {
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	group27View: {
		backgroundColor: "transparent",
		width: 66,
		height: 14,
		marginLeft: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	textText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	group25Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 7,
		height: 8,
		marginLeft: 3,
	},
	expText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 3,
	},
	group26Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 7,
		height: 7,
		marginRight: 2,
	},
	textTwoText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	brew9Doodle08CopyImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: 322,
		height: 159,
	},
	benefitView: {
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 322,
		height: 326,
		marginTop: 24,
	},
	benefitsText: {
		backgroundColor: "transparent",
		color: "rgb(95, 95, 95)",
		fontFamily: "Helvetica",
		fontSize: 13,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "flex-start",
	},
	viewView: {
		backgroundColor: "transparent",
		height: 21,
		marginTop: 37,
		flexDirection: "row",
		alignItems: "center",
	},
	group13View: {
		backgroundColor: "transparent",
		width: 27,
		height: 21,
	},
	group11Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 20,
	},
	stroke12View: {
		backgroundColor: "rgb(62, 62, 63)",
		width: 2,
		height: 10,
		marginRight: 5,
	},
	offForSpecificText: {
		color: "rgb(68, 67, 67)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 31,
	},
	x1Text: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	activationDayView: {
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 264,
		height: 14,
		marginTop: 50,
		flexDirection: "row",
		alignItems: "center",
	},
	freeDrinkForMembeText: {
		color: "rgb(68, 67, 67)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	x1CopyText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	viewTwoView: {
		backgroundColor: "transparent",
		height: 20,
		marginTop: 39,
		flexDirection: "row",
		alignItems: "center",
	},
	group7View: {
		backgroundColor: "transparent",
		width: 23,
		height: 20,
	},
	group6Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 20,
	},
	textThreeText: {
		backgroundColor: "transparent",
		color: "rgb(62, 62, 63)",
		fontSize: 6.86,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		position: "absolute",
		left: 8,
		right: 7,
		top: 9,
	},
	freeDrinkOn528MText: {
		backgroundColor: "transparent",
		color: "rgb(68, 67, 67)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 35,
	},
	x1Copy2Text: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	birthdayView: {
		backgroundColor: "transparent",
		height: 23,
		marginBottom: 44,
		flexDirection: "row",
		alignItems: "center",
	},
	groupImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 29,
		height: 23,
	},
	birthdayFreeDrinkText: {
		backgroundColor: "transparent",
		color: "rgb(68, 67, 67)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 30,
	},
	onlyAvailableOnYText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 8,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 44,
	},
	x1Copy3Text: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	rm5OffView: {
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 264,
		height: 14,
		flexDirection: "row",
		alignItems: "center",
	},
	rm5OffWithRm150SText: {
		backgroundColor: "transparent",
		color: "rgb(68, 67, 67)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	x2Text: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
})
