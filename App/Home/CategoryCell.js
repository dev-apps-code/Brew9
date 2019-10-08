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

		const {categoryImage, categoryname } = this.props

		return <TouchableWithoutFeedback
				onPress={this.onCategoryCellPress}>
				<View
					navigation={this.props.navigation}
					style={this.props.selected ? styles.categorycell_selected :styles.categorycell}>
					{this.props.selected ? <View
						style={styles.selectbarView}/> : null}
						{ categoryImage && (
							<Image
								style={styles.imageImage}
							source={{uri: categoryImage}}/>
						)}
					<Text
						style={
							this.props.selected && categoryImage ? styles.labelImageText_selected 
							: !this.props.selected && categoryImage ? styles.labelImageText
							: this.props.selected ? styles.labelText_selected
							: styles.labelText
						}>{categoryname}</Text>
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
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		flex: 1,
		marginLeft: 14 * alpha,
		marginRight: 7 * alpha,
		flexWrap: 'wrap'
	},
	labelImageText: {
		backgroundColor: "transparent",
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		flex: 1,
		marginLeft: 2 * alpha,
		marginRight: 7 * alpha,
		flexWrap: 'wrap'
	},
	labelText_selected: {
		backgroundColor: "transparent",
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		flex: 1,
		marginLeft: 14 * alpha,
		marginRight: 7 *  alpha,
		flexWrap: 'wrap'
	},
	labelImageText_selected: {
		backgroundColor: "transparent",
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		flex: 1,
		marginLeft: 2 * alpha,
		marginRight: 7 *  alpha,
		flexWrap: 'wrap'
	},
	imageImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 20 * alpha,
		height: 20 * alpha,
		marginLeft: 7 * alpha,
	},
})
