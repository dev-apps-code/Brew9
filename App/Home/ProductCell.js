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

	onSelectOptionPressed = () => {
		this.props.onCellPress(this.props.item,this.props.index);
	}

	render() {

		let noVariant = this.props.productvariant.length == 0 ? true : false

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
								style={styles.priceText}>{this.props.currency}{parseFloat(this.props.productprice).toFixed(2)}</Text>
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
                                    {this.props.productquantity && noVariant ?
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
										{ (this.props.productquantity && noVariant) ? <TouchableOpacity
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
										{
											noVariant ? <TouchableOpacity
												onPress={this.onAddPressed}
												style={styles.addButton}>
												<Image
													source={require("./../../assets/images/add-17.png")}
													style={styles.addButtonImage}/>
											</TouchableOpacity> : <View
												style={styles.selectoptionView}>
												<TouchableOpacity
													onPress={this.onSelectOptionPressed}
													style={styles.optionButton}>
													<Text
														style={styles.optionButtonText}>Option</Text>
												</TouchableOpacity>
												{
													this.props.producttotalquantity ? <View
														style={styles.badgeView}>
														<Text
															style={styles.numberofitemText}>{parseInt(this.props.producttotalquantity)}</Text>
													</View> : null
												}
											</View>
										}

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
	selectoptionView: {
		backgroundColor: "transparent",
		position: "absolute",
		right: 0 * alpha,
		width: 61 * alpha,
		bottom: 0 * alpha,
		height: 28 * alpha,
	},
	optionButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 10 * alpha,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		right: 6 * alpha,
		width: 55 * alpha,
		bottom: 0 * alpha,
		height: 20 * alpha,
	},
	optionButtonText: {
		color: "white",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	optionButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	badgeView: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 7 * alpha,
		borderWidth: 1 * alpha,
		borderColor: "white",
		borderStyle: "solid",
		position: "absolute",
		right: 0,
		width: 14 * alpha,
		bottom: 13 * alpha,
		height: 14 * alpha,
		justifyContent: "center",
		alignItems: "center",
	},
	numberofitemText: {
		backgroundColor: "transparent",
		color: "rgb(255, 251, 251)",
		fontFamily: "Helvetica",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
	},
})
