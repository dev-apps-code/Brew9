//
//  CategoryCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { TouchableWithoutFeedback, StyleSheet, Text, View, Image } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";

export default class CategoryCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onCategoryCellPress = () => {
		this.props.onSelectCategory(this.props.scrollIndex, this.props.index)
	}

	render() {

		return <TouchableWithoutFeedback
				onPress={this.onCategoryCellPress}>
				<View
					navigation={this.props.navigation}
					style={this.props.selected ? styles.categorycell_selected :styles.categorycell}>
					{this.props.selected ? <View
						style={styles.selectbarView}/> : null}
					<Image
						style={styles.imageImage}/>
					<Text
						style={this.props.selected ? styles.labelText_selected : styles.labelText}>{this.props.categoryname}</Text>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	categorycell: {
		backgroundColor: "transparent",
		width: "100%",
		height: 54 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	categorycell_selected: {
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
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		flex: 1,
		marginLeft: 7 * alpha,
		marginRight: 14 * alpha,
	},
	labelText_selected: {
		backgroundColor: "transparent",
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		flex: 1,
		marginLeft: 7 * alpha,
		marginRight: 14*  alpha,
	},
	imageImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 20 * alpha,
		height: 20 * alpha,
		marginLeft: 6 * alpha,
	},
})
