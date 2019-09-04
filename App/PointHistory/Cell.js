//
//  Cell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, Image, StyleSheet, View, TouchableWithoutFeedback } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";


export default class Cell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onCellPress = () => {
	
	}

	render() {
	
		return <TouchableWithoutFeedback
				onPress={this.onCellPress}>
				<View
					navigation={this.props.navigation}
					style={styles.pointscell}>
					<View
						style={styles.seperatorView}/>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 13,
							width: 350,
							top: 0,
							bottom: 0,
						}}>

						<View
							style={styles.leftdetailsView}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0,
									top: 0,
									bottom: 0,
									justifyContent: "center",
								}}>
								<Text
									style={styles.locationText}>Setia Alam Branch</Text>
							</View>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0,
									width: 96,
									top: 14,
									bottom: 16,
									alignItems: "flex-start",
								}}>
								<Text
									style={styles.titleText}>Spend RM 70.00</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.timeText}>2019-06-23  14:03:26</Text>
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
							pointerEvents="box-none"
							style={{
								width: 63,
								height: 17,
								marginRight: 22,
								flexDirection: "row",
								justifyContent: "flex-end",
								alignItems: "center",
							}}>
							<Text
								style={styles.pointsText}>+70</Text>
							<Image
								source={require("./../../assets/images/group-2.png")}
								style={styles.arrowImage}/>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	pointscell: {
		backgroundColor: "transparent",
		width: "100%",
		height: 75 * alpha,
	},
	seperatorView: {
		backgroundColor: "rgb(245, 245, 245)",
		position: "absolute",
		left: 15 * alpha,
		width: "100%",
		bottom: 0,
		height: 2 * alpha,
	},
	leftdetailsView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		width: 164 * alpha,
		top: 0,
		bottom: 0,
	},
	locationText: {
		backgroundColor: "transparent",
		color: "rgb(151, 151, 151)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 164 * alpha,
	},
	titleText: {
		color: "rgb(61, 61, 61)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 164 * alpha,
	},
	timeText: {
		color: "rgb(151, 151, 151)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 164 * alpha,
	},
	pointsText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica-Bold",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "right",
		width: 47 * alpha,
		marginRight: 7 * alpha,
	},
	arrowImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 9 * alpha,
		height: 10 * alpha,
	},
})
