//
//  Cell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Image, Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native"
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
				style={styles.cell}>
				<Image
					source={require("./../../assets/images/brew9-doodle-02.png")}
					style={styles.imageImage}/>
				<View
					pointerEvents="box-none"
					style={{
						flex: 1,
						height: 62 * alpha,
						marginLeft: 10 * alpha,
						marginRight: 10 * alpha,
						marginTop: 10 * alpha,
						alignItems: "flex-start",
					}}>
					<View
						pointerEvents="box-none"
						style={{
							alignSelf: "stretch",
							height: 30 * alpha,
							flexDirection: "row",
							alignItems: "flex-start",
						}}>
						<View
							pointerEvents="box-none"
							style={{
								width: 213 * alpha,
								height: 30 * alpha,
							}}>
							<Text
								style={styles.nameText}>Voucher A</Text>
							<Text
								style={styles.dateText}>2018.09.01 - 2018.09.01</Text>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.pointsText}>300 Points</Text>
					</View>
					<Text
						style={styles.redeemTimeText}>Redeem Time: 2019.09.01</Text>
					<View
						pointerEvents="box-none"
						style={{
							width: 246 * alpha,
							height: 13 * alpha,
						}}>
						<Text
							style={styles.usedText}>Used</Text>
						<Text
							style={styles.shopText}>Brew9 Kiulap</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	cell: {
		backgroundColor: "transparent",
		width: "100%",
		height: 80 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	imageImage: {
		resizeMode: "center",
		backgroundColor: "rgb(243, 243, 243)",
		width: 60 * alpha,
		height: 60 * alpha,
		marginLeft: 10 * alpha,
		marginTop: 10 * alpha,
	},
	nameText: {
		color: "black",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		top: 0,
	},
	dateText: {
		backgroundColor: "transparent",
		color: "rgb(142, 142, 142)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		position: "absolute",
		left: 0,
		top: 17 * alpha,
	},
	redeemTimeText: {
		color: "rgb(142, 142, 142)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 6 * alpha,
	},
	usedText: {
		color: "rgb(142, 142, 142)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		top: 0,
	},
	shopText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		position: "absolute",
		left: 32 * alpha,
		top: 0,
	},
	pointsText: {
		color: "rgb(142, 142, 142)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		width: 72 * alpha,
	},
})

