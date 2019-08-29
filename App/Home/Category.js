//
//  Category
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { TouchableWithoutFeedback, StyleSheet, Text, View } from "react-native"
import React from "react"


export default class Category extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onCategoryPress = () => {
	
	}

	render() {
	
		return <TouchableWithoutFeedback
				onPress={this.onCategoryPress}>
				<View
					navigation={this.props.navigation}
					style={styles.category}>
					<Text
						style={styles.itemText}>Best Seller</Text>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	category: {
		backgroundColor: "rgb(216, 216, 216)",
		width: "100%",
		height: 44.93,
		justifyContent: "center",
		alignItems: "center",
	},
	itemText: {
		color: "rgb(144, 141, 141)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
})
