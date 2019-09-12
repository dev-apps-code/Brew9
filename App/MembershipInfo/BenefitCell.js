//
//  BenefitCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { StyleSheet, TouchableWithoutFeedback, Text, View, Image } from "react-native"
import React from "react"


export default class BenefitCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onBemefitCellPress = () => {
	
	}

	render() {
	
		return <TouchableWithoutFeedback
				onPress={this.onBemefitCellPress}>
				<View
					navigation={this.props.navigation}
					style={styles.benefitcell}>
					<Image
						source={require("./../../assets/images/group-8-7.png")}
						style={styles.iconImage}/>
					<Text
						style={styles.descriptionText}>10% off for Specific Drinks</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.amountText}>x1</Text>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	benefitcell: {
		backgroundColor: "transparent",
		width: "100%",
		height: 70,
		flexDirection: "row",
		alignItems: "center",
	},
	iconImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 27,
		height: 27,
		marginLeft: 24,
	},
	descriptionText: {
		backgroundColor: "transparent",
		color: "rgb(68, 67, 67)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 34,
	},
	amountText: {
		backgroundColor: "transparent",
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 24,
	},
})
