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
import { PRIMARY_COLOR, NON_TITLE_FONT, TITLE_FONT } from "../Common/common_style"


export default class MissionCategoryCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onCellFourPress = () => {
	
	}

	render(){

		return <TouchableWithoutFeedback
				onPress={this.onCellFourPress}>
				<View
					navigation={this.props.navigation}
					style={styles.cell}>
					<View
						style={styles.viewView}>
						<Text
							style={styles.titleText}>{this.props.title}</Text>
						<Text
							style={styles.descriptionText}>{this.props.description ? this.props.description : ""}</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	cell: {
		backgroundColor: "transparent",
		width: "100%",
		height: 44 * alpha,
	},
	viewView: {
		backgroundColor: "white",
		flex: 1,
		marginTop: 8 * alpha,
		flexDirection: "row",
		alignItems: "center"
	},
	titleText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 10 * alpha,
	},
	descriptionText: {
		backgroundColor: "transparent",
		color: "rgb(135, 135, 135)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 10 * alpha,
	},
})