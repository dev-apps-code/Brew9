//
//  ExpiredcouponTwo
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from "react-native"


export default class ExpiredcouponTwo extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onExpiredcouponTwoPress = () => {
	
	}

	render() {
	
		return <TouchableWithoutFeedback
				onPress={this.onExpiredcouponTwoPress}>
				<View
					navigation={this.props.navigation}
					style={styles.expiredcoupon}>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							alignSelf: "center",
							top: 0,
							bottom: 0,
							justifyContent: "center",
						}}>
						<Image
							source={require("./../../assets/images/group-5-2.png")}
							style={styles.backgroundImage}/>
					</View>
					<View
						style={styles.cellcontentView}>
						<Text
							style={styles.freeDrinkForUpgraText}>FREE drink for upgrade member</Text>
						<View
							pointerEvents="box-none"
							style={{
								flex: 1,
								alignSelf: "stretch",
								marginTop: 1,
							}}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0,
									width: 121,
									top: 0,
									bottom: 11,
									alignItems: "flex-start",
								}}>
								<Text
									style={styles.oneDrinkAtAnyBraText}>one drink at any branch</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.textText}>2019.06.21-2019.07.21</Text>
							</View>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0,
									right: 0,
									top: 4,
									bottom: 0,
								}}>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										left: 0,
										right: 16,
										top: 23,
										bottom: 11,
									}}>
									<View
										style={styles.lineView}/>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.termsConditionsText}>Terms & Conditions</Text>
								</View>
								<View
									style={styles.stampView}>
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
											source={require("./../../assets/images/mask-5.png")}
											style={styles.maskImage}/>
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
										<Text
											style={styles.expiredText}>EXPIRED</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	expiredcoupon: {
		backgroundColor: "transparent",
		width: "100%",
		height: 114,
	},
	backgroundImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		shadowColor: "rgba(224, 222, 222, 0.5)",
		shadowRadius: 2,
		shadowOpacity: 1,
		width: 342,
		height: 94,
	},
	cellcontentView: {
		backgroundColor: "transparent",
		position: "absolute",
		alignSelf: "center",
		width: 311,
		top: 0,
		height: 64,
		alignItems: "flex-start",
	},
	freeDrinkForUpgraText: {
		color: "rgb(68, 68, 68)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		opacity: 0.41,
		marginLeft: 6,
	},
	oneDrinkAtAnyBraText: {
		backgroundColor: "transparent",
		opacity: 0.41,
		color: "rgb(117, 117, 117)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 6,
	},
	textText: {
		backgroundColor: "transparent",
		opacity: 0.41,
		color: "rgb(68, 68, 68)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	lineView: {
		backgroundColor: "rgb(213, 212, 212)",
		opacity: 0.41,
		height: 0,
		marginRight: 1,
	},
	termsConditionsText: {
		color: "rgb(68, 68, 68)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		opacity: 0.59,
		alignSelf: "flex-end",
	},
	stampView: {
		backgroundColor: "transparent",
		position: "absolute",
		right: 0,
		width: 48,
		top: 0,
		height: 55,
	},
	maskImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 55,
	},
	expiredText: {
		color: "rgb(68, 68, 68)",
		fontFamily: "Helvetica",
		fontSize: 4,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		opacity: 0.3,
		marginLeft: 20,
		marginRight: 10,
	},
})
