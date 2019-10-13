//
//  CellTwo
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size"


export default class MissionCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onCellTwoPress = () => {
	
	}

	render() {
	

		return <TouchableWithoutFeedback
				onPress={this.onCellTwoPress}>
				<View
					navigation={this.props.navigation}
					style={styles.missioncell}>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 20 * alpha,
							width: 335 * alpha,
							top: 18 * alpha,
							bottom: 1 * alpha,
							alignItems: "flex-start",
						}}>
						<Text
							style={styles.titleText}>{this.props.title}</Text>
						<Text
							style={styles.descriptionText}>+{this.props.point} points</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.lineView}/>
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
							style={styles.statusView}>
							<Text
								style={styles.completeText}>Complete</Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	missioncell: {
		backgroundColor: "white",
		width: "100%",
		height: 66 * alpha,
	},
	titleText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	descriptionText: {
		backgroundColor: "transparent",
		opacity: 0.39,
		color: "black",
		fontFamily: "SFProText-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 2,
	},
	lineView: {
		backgroundColor: "rgb(241, 241, 241)",
		alignSelf: "center",
		width: 334 * alpha,
		height: 1 * alpha,
	},
	statusView: {
		backgroundColor: "rgb(89, 89, 89)",
		borderRadius: 9.5 * alpha,
		width: 70 * alpha,
		height: 19 * alpha,
		marginRight: 20 * alpha,
		justifyContent: "center",
		alignItems: "center",
	},
	statusCompleteView: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 9.5 * alpha,
		width: 70 * alpha,
		height: 19 * alpha,
		marginRight: 20 * alpha,
		justifyContent: "center",
		alignItems: "center",
	},
	completeText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "SFProText-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
})
