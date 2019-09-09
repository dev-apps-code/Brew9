//
//  CategoryCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { TouchableWithoutFeedback, StyleSheet, Text, View } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";

export default class CategoryCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onCategoryCellPress = () => {
	
	}

	render() {
	
		return <TouchableWithoutFeedback
				onPress={this.onCategoryCellPress}>
				<View
					navigation={this.props.navigation}
					style={styles.categorycell}>
					<View
						style={styles.selectbarView}/>
					<Text
						style={styles.labelText}>Best Seller</Text>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	categorycell: {
		backgroundColor: "white",
		width: "100%",
		height: 54 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	selectbarView: {
		backgroundColor: "rgb(0, 178, 227)",
		width: 3 * alpha,
		height: 54 * alpha,
	},
	labelText: {
		backgroundColor: "transparent",
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		flex: 1,
		marginLeft: 10 * alpha,
		marginRight: 14 * alpha,
	},
})
