//
//  ProductCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";

export default class ProductCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onProductCellPress = () => {
	
	}

	render() {

		return <TouchableWithoutFeedback
				onPress={this.onProductCellPress}>
				<View
					navigation={this.props.navigation}
					style={styles.productcell}>
					<Image
						source={{uri: this.props.productimage}}
						style={styles.productimageImage}/>
					<View
						style={{
							flex: 1,
						}}/>
					<View
						style={styles.detailsView}>
						<Text
							style={styles.titleText}>{this.props.productname}</Text>
						<Text
							style={styles.descriptionText}>{this.props.productdescription}</Text>
						<View
							pointerEvents="box-none"
							style={{
								alignSelf: "stretch",
								height: 22 * alpha,
								marginRight: 8 * alpha,
								marginTop: 12 * alpha,
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							<Text
								style={styles.priceText}>{this.props.currency}{this.props.productprice}</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Image
								source={require("./../../assets/images/add-5.png")}
								style={styles.addImage}/>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	productcell: {
		backgroundColor: "transparent",
		width: "100%",
		height: 123 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	productimageImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: 86 * alpha,
		height: 84 * alpha,
		marginLeft: 4 * alpha,
		marginTop: 4 * alpha,
	},
	detailsView: {
		backgroundColor: "transparent",
		width: 174 * alpha,
		height: 89 * alpha,
		marginRight: 11 * alpha,
		alignItems: "flex-start",
	},
	titleText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 1 * alpha,
	},
	descriptionText: {
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		opacity: 0.39,
		marginLeft: 1 * alpha,
		marginTop: 11 * alpha,
	},
	priceText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica-Bold",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	addImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 20 * alpha,
		height: 20 * alpha,
		marginTop: 2 * alpha,
	},
})
