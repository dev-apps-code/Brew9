//
//  Card
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, Image, View, TouchableWithoutFeedback, StyleSheet } from "react-native"
import React from "react"
import {alpha, fontAlpha} from "../Common/size";


export default class Card extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			selected: null,
		}
	}

	componentDidMount() {

	}

	onCardPress = () => {
		this.props.onPressItem(this.props.price,this.props.index);
		this.setState({
			selected: this.props.selected
		})
	}

	render() {

		return <TouchableWithoutFeedback
				onPress={this.onCardPress}>
				<View
					navigation={this.props.navigation}
					style={styles.cardcell}>
					<Image
						source={{uri: this.props.image}}
						style={styles.cardImage}/>
					<View
						style={styles.infoView}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0,
								right: 0,
								top: 0,
								bottom: 0,
								justifyContent: "center",
							}}>
							<Image
								source={require("./../../assets/images/fill-1-4.png")}
								style={styles.backgroundImage}/>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0,
								right: 0,
								top: 0,
								bottom: 0,
								justifyContent: "center",
							}}>
							<View
								pointerEvents="box-none"
								style={{
									height: 22 * alpha,
									marginLeft: 15 * alpha,
									marginRight: 15 * alpha,
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Text
									style={styles.valueText}>{this.props.currency}{this.props.price}</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={ this.props.selected === this.props.index ? styles.selectView_selected : styles.selectView }/>
							</View>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	cardcell: {
		backgroundColor: "transparent",
		width: "100%",
		height: 244 * alpha,
	},
	cardImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		position: "absolute",
		alignSelf: "center",
		width: 339 * alpha,
		top: 15 * alpha,
		height: 191 * alpha,
	},
	infoView: {
		backgroundColor: "transparent",
		position: "absolute",
		alignSelf: "center",
		width: 339 * alpha,
		top: 190 * alpha,
		height: 39 * alpha,
	},
	backgroundImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: null,
		height: 39 * alpha,
	},
	valueText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "DINPro-Medium",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	selectView: {
		backgroundColor: "transparent",
		borderRadius: 8.5 * alpha,
		borderWidth: 1,
		borderColor: "rgb(219, 219, 219)",
		borderStyle: "solid",
		width: 17 * alpha,
		height: 17 * alpha,
	},
	selectView_selected: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 8.5 * alpha,
		borderWidth: 1,
		borderColor: "rgb(219, 219, 219)",
		borderStyle: "solid",
		width: 17 * alpha,
		height: 17 * alpha,
	},
})
