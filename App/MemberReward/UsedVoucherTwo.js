//
//  UsedVoucherTwo
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { Image, View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native"


export default class UsedVoucherTwo extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onUsedVoucherTwoPress = () => {
	
	}

	render() {
	
		return <TouchableWithoutFeedback
				onPress={this.onUsedVoucherTwoPress}>
				<View
					navigation={this.props.navigation}
					style={styles.usedvoucher}>
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
						pointerEvents="box-none"
						style={{
							position: "absolute",
							alignSelf: "center",
							top: 0,
							bottom: 0,
							justifyContent: "center",
						}}>
						<View
							style={styles.cellcontentView}>
							<Text
								style={styles.priorityVoucherText}>Priority Voucher</Text>
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
										width: 268,
										top: 0,
										bottom: 11,
										alignItems: "flex-start",
									}}>
									<Text
										style={styles.priorToYourOrderText}>prior to your order, first 3 days opening not supported.</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.textText}>2019.06.19-2019.07.19</Text>
								</View>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										right: 0,
										width: 325,
										top: 4,
										bottom: 0,
									}}>
									<View
										pointerEvents="box-none"
										style={{
											position: "absolute",
											right: 16,
											width: 309,
											top: 23,
											bottom: 11,
											alignItems: "center",
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
												style={styles.usedText}>USED</Text>
										</View>
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
	usedvoucher: {
		backgroundColor: "transparent",
		width: "100%",
		height: 114,
	},
	backgroundImage: {
		backgroundColor: "transparent",
		shadowColor: "rgba(224, 222, 222, 0.5)",
		shadowRadius: 2,
		shadowOpacity: 1,
		resizeMode: "cover",
		width: 342,
		height: 94,
	},
	cellcontentView: {
		backgroundColor: "transparent",
		width: 311,
		height: 64,
		alignItems: "flex-start",
	},
	priorityVoucherText: {
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
	priorToYourOrderText: {
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
		width: 308,
		height: 0,
	},
	termsConditionsText: {
		backgroundColor: "transparent",
		opacity: 0.59,
		color: "rgb(68, 68, 68)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
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
		backgroundColor: "transparent",
		resizeMode: "center",
		width: null,
		height: 55,
	},
	usedText: {
		backgroundColor: "transparent",
		opacity: 0.3,
		color: "rgb(68, 68, 68)",
		fontFamily: "Helvetica",
		fontSize: 6,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 20,
		marginRight: 11,
	},
})
