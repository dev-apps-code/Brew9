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


export default class CartCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onMinusPressed = () => {
		this.props.onChangeQuantity(this.props.item,this.props.index, "remove", true);
	}

	onAddPressed = () => {
		this.props.onChangeQuantity(this.props.item,this.props.index, "add", true);
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
							height: 47 * alpha,
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
								<Text
									style={styles.descriptionText}>{variants.join(", ")}</Text>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.priceText}>${parseFloat(this.props.price).toFixed(2)}</Text>
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
									style={styles.quantityText}>{this.props.quantity}</Text>
							</View>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									right: 0 * alpha,
									top: 0 * alpha,
									bottom: 0 * alpha,
									justifyContent: "center",
								}}>
								<View
									pointerEvents="box-none"
									style={{
										width: 74 * alpha,
										height: 23 * alpha,
										flexDirection: "row",
										justifyContent: "flex-end",
										alignItems: "center",
									}}>
									<TouchableOpacity
										onPress={this.onMinusPressed}
										style={styles.minusButton}>
										<Image
											source={require("./../../assets/images/button-4.png")}
											style={styles.minusButtonImage}/>
									</TouchableOpacity>
									<View
										style={{
											flex: 1,
										}}/>
									<TouchableOpacity
										onPress={this.onAddPressed}
										style={styles.addButton}>
										<Image
											source={require("./../../assets/images/add-17.png")}
											style={styles.addButtonImage}/>
									</TouchableOpacity>
								</View>
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
		width: "100%",
		height: 70 * alpha,
	},
	detailsView: {
		backgroundColor: "transparent",
		width: 242 * alpha,
		height: 47 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	infoView: {
		backgroundColor: "transparent",
		width: 200 * alpha,
		height: 47 * alpha,
	},
	titleText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	descriptionText: {
		backgroundColor: "transparent",
		color: "rgb(130, 128, 128)",
		fontFamily: "Helvetica-LightOblique",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 4 * alpha,
	},
	priceText: {
		backgroundColor: "transparent",
		color: "rgb(57, 57, 57)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
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
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	minusButtonText: {
		color: "black",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	minusButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 23 * alpha,
		height: 23 * alpha,
	},
	minusButtonImage: {
		resizeMode: "contain",
	},
	addButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 23 * alpha,
		height: 23 * alpha,
	},
	addButtonImage: {
		resizeMode: "contain",
	},
	addButtonText: {
		color: "black",
		fontSize: 12 * fontAlpha,
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
