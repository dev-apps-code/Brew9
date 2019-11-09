//
//  CartCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, TouchableWithoutFeedback, View, TouchableOpacity, Image, StyleSheet } from "react-native"
import React from "react"
import {alpha, fontAlpha} from "../Common/size";
import {TITLE_FONT, NON_TITLE_FONT} from "../Common/common_style";


export default class CartPromoCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	render() {

		var filtered = []
		var variants = []

		if (this.props.variations) {
			filtered = this.props.variations.filter(function(el) { return el })
			variants = filtered.map(a => a.value)
		}

		return <TouchableWithoutFeedback
			onPress={this.onCart3Press}>
			<View
				navigation={this.props.navigation}
				style={styles.cart3}>
				<View
					pointerEvents="box-none"
					style={{
						left: 0 * alpha,
						right: 0 * alpha,
						top: 0 * alpha,
						bottom: 0 * alpha,
						justifyContent: "center",
					}}>
					<View
						pointerEvents="box-none"
						style={{
							flex: 1,
							marginLeft: 20 * alpha,
							marginRight: 19 * alpha,
							flexDirection: "row",
							alignItems: "center",
						}}>
						<View
							style={styles.detailsView}>
							<View
								style={styles.infoView}>
								<Text
									style={styles.titleText}>{this.props.name}</Text>
							</View>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.optionsView}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									alignSelf: "center",
									top: 0 * alpha,
									bottom: 0 * alpha,
									justifyContent: "center",
								}}>
								<Text
									style={styles.quantityText}>{this.props.price != 0 ? `-$${parseFloat(this.props.price).toFixed(2)}` : "Free"}</Text>
							</View>
							
						</View>
					</View>
				</View>
				<View
					style={styles.lineView}/>
			</View>
		</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	cart3: {
		backgroundColor: "white",
		flex: 1,
	},
	detailsView: {
		backgroundColor: "transparent",
        width: 250 * alpha,
        flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	infoView: {
        backgroundColor: "transparent",
        width: 250 * alpha,
        flex: 1,
	},
	titleText: {
		width: 250 * alpha,
		flex: 1,
		marginTop: 10 * alpha,
		marginBottom: 10 * alpha,
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	optionsView: {
		backgroundColor: "transparent",
		width: 74 * alpha,
		height: 23 * alpha,
	},
	quantityText: {
		backgroundColor: "transparent",
		color: "rgb(85, 83, 81)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	lineView: {
		backgroundColor: "rgb(229, 227, 227)",
		position: "absolute",
		left: 18 * alpha,
		right: 19 * alpha,
		bottom: 0 * alpha,
		height: 1 * alpha,
	},
})
