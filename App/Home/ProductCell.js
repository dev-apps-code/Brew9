//
//  ProductCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";

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
	
		return <TouchableWithoutFeedback
				onPress={this.onProductCellPress}>
				<View
					navigation={this.props.navigation}
					style={styles.productcell}>
					<View
						pointerEvents="box-none"
						style={{
							width: 74 * alpha,
							height: 84 * alpha,
							marginLeft: 3 * alpha,
							marginTop: 4 * alpha,
						}}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0,
								top: 0 * alpha,
								bottom: 0 * alpha,
								justifyContent: "center",
							}}>
							<Image
								source={{uri: this.props.productimage}}
								style={styles.productimageImage}/>
						</View>
						{ !this.props.productenable && (<View
							style={styles.soldView}>
							<Text
								style={styles.soldtextText}>Sold Out</Text>
						</View>)}
						
					</View>
					<View
						style={styles.detailsView}>
						<Text
							style={styles.titleText}>{this.props.productname}</Text>
						<Text numberOfLines={2}
              				style={styles.descriptionText}>{this.props.productsummary}</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							pointerEvents="box-none"
							style={{
								alignSelf: "stretch",
								height: 29 * alpha,
								marginRight: 1 * alpha,
								flexDirection: "row",
								alignItems: "flex-end",
							}}>
							<Text
                				style={styles.priceText}>${parseFloat(this.props.productprice).toFixed(2)}</Text>
							<View
								style={{
									flex: 1,
								}}/>
							{/* <View
								pointerEvents="box-none"
								style={{
									width: 61,
									height: 28,
									marginBottom: 2,
								}}>
								<TouchableOpacity
									onPress={this.onAddPressed}
									style={styles.addButton}>
									<Image
										source={require("./../../assets/images/add-5.png")}
										style={styles.addButtonImage}/>
								</TouchableOpacity>
								<View
									style={styles.selectoptionView}>
									<TouchableOpacity
										onPress={this.onButtonPressed}
										style={styles.optionButton}>
										<Text
											style={styles.optionButtonText}>Option</Text>
									</TouchableOpacity>
									<View
										style={styles.badgeView}>
										<Text
											style={styles.numberofitemText}>2</Text>
									</View>
								</View>
							</View> */}
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
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: 74 * alpha,
		height: 84 * alpha,
		marginLeft: 5 * alpha,
	},
	soldView: {
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		position: "absolute",
		left: 5,
		width: 74 * alpha,
		top: 62 * alpha,
		height: 22 * alpha,
		justifyContent: "center",
		alignItems: "center",
	},
	soldtextText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	detailsView: {
		backgroundColor: "transparent",
		width: 180 * alpha,
		height: 89 * alpha,
		marginLeft: 10 * alpha,
		alignItems: "flex-start",
	},
	titleText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 1 * alpha,
	},
	descriptionText: {
		backgroundColor: "transparent",
		opacity: 0.39,
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 180 * alpha,
		marginLeft: 1 * alpha,
		marginTop: 5 * alpha,
	},
	priceText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	addButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		right: 7 * alpha,
		width: 20 * alpha,
		bottom: 1 * alpha,
		height: 20 * alpha,
	},
	addButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	addButtonImage: {
		resizeMode: "contain",
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
		fontFamily: "Helvetica",
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
		right: 0 * alpha,
		width: 14 * alpha,
		bottom: 13 * alpha,
		height: 15 * alpha,
		justifyContent: "center",
		alignItems: "center",
	},
	numberofitemText: {
		color: "rgb(255, 251, 251)",
		fontFamily: "SFProText-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "transparent",
	},
})
