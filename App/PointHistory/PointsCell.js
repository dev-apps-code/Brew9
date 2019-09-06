//
//  PointsCell
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { Image, Text, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";

export default class PointsCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {

	}

	onPointsCellPress = () => {

	}

	render() {

		return <TouchableWithoutFeedback
			onPress={this.onPointsCellPress}>
			<View
				navigation={this.props.navigation}
				style={styles.pointscell}>
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
							height: 19 * alpha,
							marginLeft: 26 * alpha,
							marginRight: 20 * alpha,
							flexDirection: "row",
							alignItems: "center",
						}}>
						<Text
							style={styles.locationText}>{this.props.shop}</Text>
						<Text
							style={styles.pointsText}>{this.props.value}</Text>
						<Image
							source={require("./../../assets/images/group-2.png")}
							style={styles.arrowImage}/>
					</View>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 26 * alpha,
						right: 0,
						top: 9 * alpha,
						bottom: 1,
					}}>
					<Text
						style={styles.titleText}>{this.props.description}</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.timeText}>{this.props.created_at}</Text>
					<Image
						source={require("./../../assets/images/line-7.png")}
						style={styles.seperatorImage}/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	pointscell: {
		backgroundColor: "white",
		width: "100%",
		height: 78 * alpha,
	},
	locationText: {
		backgroundColor: "transparent",
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		flex: 1,
	},
	pointsText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 14 * alpha,
	},
	arrowImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 9 * alpha,
		height: 10 * alpha,
	},
	titleText: {
		backgroundColor: "transparent",
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 1 * alpha,
	},
	timeText: {
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginBottom: 8 * alpha,
	},
	seperatorImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: null,
		height: 3 * alpha,
	},
})

