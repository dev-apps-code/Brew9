//
//  NewVoucherTwo
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { Image, StyleSheet, TouchableWithoutFeedback, Text, View } from "react-native"


export default class NewVoucherTwo extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onNewVoucherTwoPress = () => {
	
	}

	render() {
	
		return <TouchableWithoutFeedback
				onPress={this.onNewVoucherTwoPress}>
				<View
					navigation={this.props.navigation}
					style={styles.newvoucher}>
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
							<View
								pointerEvents="box-none"
								style={{
									height: 36,
									marginLeft: 6,
									marginRight: 7,
									flexDirection: "row",
									alignItems: "flex-start",
								}}>
								<Text
									style={styles.titleText}>RM10 off</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.valueView}>
									<Text
										style={styles.currencyText}>RM</Text>
									<Text
										style={styles.valueText}>10</Text>
								</View>
							</View>
							<Text
								style={styles.descriptionText}>with RM150 spend</Text>
							<View
								style={styles.lineView}/>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								pointerEvents="box-none"
								style={{
									height: 12,
									marginRight: 1,
									marginBottom: 1,
									flexDirection: "row",
									alignItems: "flex-end",
								}}>
								<Text
									style={styles.dateText}>2019.07.19-2019.08.19</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.termsConditionsText}>Terms & Conditions</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	newvoucher: {
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
		height: 72,
	},
	titleText: {
		color: "rgb(68, 68, 68)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 8,
	},
	valueView: {
		backgroundColor: "transparent",
		width: 50,
		height: 36,
		flexDirection: "row",
		alignItems: "center",
	},
	currencyText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "flex-start",
		marginTop: 6,
	},
	valueText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 30,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		flex: 1,
		marginLeft: 2,
	},
	descriptionText: {
		backgroundColor: "transparent",
		color: "rgb(117, 117, 117)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "flex-start",
		marginLeft: 6,
	},
	lineView: {
		backgroundColor: "rgb(213, 212, 212)",
		alignSelf: "center",
		width: 308,
		height: 0,
		marginTop: 14,
	},
	dateText: {
		color: "rgb(68, 68, 68)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	termsConditionsText: {
		color: "rgb(68, 68, 68)",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
})
