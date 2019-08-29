//
//  Product
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, View, Image, TouchableWithoutFeedback, StyleSheet } from "react-native"
import React from "react"


export default class Product extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onProductPress = () => {
	
	}

	render() {
	
		return <TouchableWithoutFeedback
				onPress={this.onProductPress}>
				<View
					navigation={this.props.navigation}
					style={styles.product}>
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
							style={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</Text>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 0,
							right: 18,
							top: 5,
							bottom: 5,
							flexDirection: "row",
							alignItems: "flex-end",
						}}>
						<Image
							source={require("./../../assets/images/bitmap-4.png")}
							style={styles.productimageImage}/>
						<View
							pointerEvents="box-none"
							style={{
								alignSelf: "stretch",
								width: 59,
								marginTop: 8,
								marginBottom: 9,
								alignItems: "flex-start",
							}}>
							<Text
								style={styles.titleText}>Espresso</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.priceText}>RM10</Text>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<Image
							source={require("./../../assets/images/add-4.png")}
							style={styles.addImage}/>
					</View>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	product: {
		backgroundColor: "transparent",
		width: "100%",
		height: 101,
	},
	descriptionText: {
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		opacity: 0.39,
		width: 137,
		marginLeft: 111,
	},
	productimageImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		alignSelf: "center",
		width: 111,
		height: 91,
	},
	titleText: {
		backgroundColor: "transparent",
		color: "rgb(78, 77, 77)",
		fontFamily: "Helvetica",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	priceText: {
		backgroundColor: "transparent",
		color: "rgb(62, 61, 61)",
		fontFamily: "Helvetica-Bold",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	addImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 19,
		height: 21,
		marginBottom: 10,
	},
})
