//
//  PointsCell
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { Image, Text, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";

export default class PointsCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {

	}

	onPointsCellPress = () => {
		if (this.props.shop) {
			const { navigate } = this.props.navigation

			navigate("OrderReceipt")
		}
	}

	render() {

		return <TouchableWithoutFeedback
			onPress={this.onPointsCellPress}>
			<View
				navigation={this.props.navigation}
				style={styles.pointscell}>
				<Image
					source={require("./../../assets/images/line-7.png")}
					style={styles.seperatorImage}/>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 0 * alpha,
						right: 0 * alpha,
						top: 0 * alpha,
						bottom: 0 * alpha,
						justifyContent: "center",
					}}>
					<View
						pointerEvents="box-none"
						style={{
							height: 57 * alpha,
							marginLeft: 26 * alpha,
							marginRight: 20 * alpha,
							flexDirection: "row",
							alignItems: "center",
						}}>
						<View
							style={this.props.shop ? styles.leftblockView : styles.leftblockView2}>
							{this.props.shop ?
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
										style={styles.locationText}>{this.props.shop.name}</Text>

								</View> : null
							}
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0,
									width: 178 * alpha,
									top: 0,
									bottom: 0,
									alignItems: "flex-start",
								}}>
								<Text
									style={this.props.shop ? styles.titleText : styles.titleText2 }>{this.props.description}</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={this.props.shop ? styles.timeText : styles.timeText2 }>{this.props.created_at}</Text>
							</View>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={this.props.shop ? styles.pointsText : styles.pointsText2 }>{this.props.value}</Text>
						{this.props.shop ?
							<Image
								source={require("./../../assets/images/group-2.png")}
								style={styles.arrowImage}/> : null
						}
					</View>
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
	seperatorImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		position: "absolute",
		left: 26 * alpha,
		right: 0 * alpha,
		bottom: 0 * alpha,
		height: 3 * alpha,
	},
	leftblockView: {
		backgroundColor: "transparent",
		width: 196 * alpha,
		height: 57 * alpha,
	},
	leftblockView2: {
		backgroundColor: "transparent",
		width: 196 * alpha,
		height: 57 * alpha,
		alignItems: "flex-start",
	},
	locationText: {
		backgroundColor: "transparent",
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	titleText: {
		backgroundColor: "transparent",
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	titleText2: {
		backgroundColor: "transparent",
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Bold",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginTop: 9 * alpha,
	},
	timeText: {
		backgroundColor: "transparent",
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	timeText2: {
		backgroundColor: "transparent",
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginBottom: 11 * alpha,
	},
	pointsText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 14 * alpha,
	},
	pointsText2: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 23 * alpha,
	},
	arrowImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 9 * alpha,
		height: 10 * alpha,
	},
})


