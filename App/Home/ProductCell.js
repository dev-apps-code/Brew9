//
//  ProductCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";

export default class ProductCell extends React.Component {

	constructor(props) {
		super(props)

	}

	componentDidMount() {

	}

	onProductCellPress = () => {
		this.props.onCellPress(this.props.item,this.props.index);
	}

	onAddPressed = () => {
		this.props.onChangeQuantity(this.props.item,this.props.index, "add", false);
	}

	onRemovePressed = () => {
		this.props.onChangeQuantity(this.props.item,this.props.index, "remove", false);
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
                                    {this.props.productquantity ?
                                        <Text
                                            style={styles.quantityText}>{this.props.productquantity ? this.props.productquantity : 1}</Text> : null
                                    }
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
										{ this.props.productquantity ? <TouchableOpacity
											onPress={this.onRemovePressed}
											style={styles.minusButton}>
											<Image
												source={require("./../../assets/images/button-4.png")}
												style={styles.minusButtonImage}/>
										</TouchableOpacity> : null }
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
})
