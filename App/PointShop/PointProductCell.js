//
//  PointProductCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {TouchableWithoutFeedback, TouchableOpacity, Image, StyleSheet, View, Text, ScrollView} from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";

export default class PointProductCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onPointProductCellPress = (item_id, item_name) => {
		const { navigate } = this.props.navigation
		navigate("PointShopItem", {
			item_id: item_id,
			item_name: item_name,
		})
	}

	onViewMorePressed = (plan_id, title) => {
		const { navigate } = this.props.navigation
		navigate("PointShopFullList", {
			plan_id: plan_id,
			title: title,
		})
	}

	render() {

		const { sectionId, sectionHeader, products } = this.props

		const items = products.map((item, key) =>
			<TouchableWithoutFeedback
				onPress={() => this.onPointProductCellPress(item.id, item.name)}
				key={key}>
				<View
					style={styles.itemView}>
					<Image
						source={require("./../../assets/images/bg-03.png")}
						style={styles.imageImage}/>
					<View
						style={styles.viewView}>
						<Text
							style={styles.titleText}>{item.name}</Text>
						<View
							pointerEvents="box-none"
							style={{
								width: 78 * alpha,
								height: 22 * alpha,
								marginLeft: 13 * alpha,
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							<Text
								style={styles.valueText}>{item.points}</Text>
							<Text
								style={styles.pointsText}>Points</Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		)


		return <View>
			<View
				navigation={this.props.navigation}
				style={styles.pointproductcell}>
				<View
					pointerEvents="box-none"
					style={{
						flex: 1,
					}}>
					<View
						style={styles.headerView}>
						<Text
							style={styles.sectionheadertitleText}>{sectionHeader}</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<TouchableOpacity
							onPress={() => this.onViewMorePressed(sectionId, sectionHeader)}
							style={styles.viewmoreButton}>
							<Text
								style={styles.viewmoreButtonText}>View More</Text>
							<Image
								source={require("./../../assets/images/group-2.png")}
								style={styles.viewmoreButtonImage}/>
						</TouchableOpacity>
					</View>
					<View
						style={ products.count > 2 ? styles.itemBlockView : styles.itemBlockView2}>
						{items}
					</View>
				</View>
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	pointproductcell: {
		backgroundColor: "transparent",
		width: "100%",
	},
	headerView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		right: 0 * alpha,
		top: 0 * alpha,
		height: 40 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	itemBlockView: {
		backgroundColor: "transparent",
		flex: 1,
		height: 250 * alpha,
		top: 40 * alpha,
		flexWrap: 'wrap'
	},
	itemBlockView2: {
		backgroundColor: "transparent",
		flex: 1,
		height: 500 * alpha,
		marginTop: 40 * alpha,
		flexWrap: 'wrap'
	},
	sectionheadertitleText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
		marginLeft: 13 * alpha,
	},
	viewmoreButtonText: {
		color: "rgb(164, 164, 164)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	viewmoreButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		alignSelf: "flex-start",
		width: 95 * alpha,
		height: 40 * alpha,
	},
	viewmoreButtonImage: {
		resizeMode: "contain",
		marginLeft: 10 * alpha,
	},
	itemView: {
		backgroundColor: "transparent",
		width: "50%",
		alignItems: "center",
	},
	imageImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: 170 * alpha,
		height: 170 * alpha,
	},
	viewView: {
		backgroundColor: "transparent",
		width: 187 * alpha,
		height: 80 * alpha,
		alignItems: "flex-start",
	},
	titleText: {
		backgroundColor: "transparent",
		color: "black",
		fontFamily: "DINPro-Medium",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 13 * alpha,
		marginTop: 10 * alpha,
	},
	valueText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	pointsText: {
		backgroundColor: "transparent",
		color: "black",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 3 * alpha,
		marginTop: 2 * alpha,
	},
})
