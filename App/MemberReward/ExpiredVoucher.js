//
//  ExpiredVoucher
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Image, Text } from "react-native"
import React from "react"
import {alpha, fontAlpha} from "../Common/size";


export default class ExpiredVoucher extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {

	}

	onExpiredVoucherPress = () => {

	}

	render() {

		return <TouchableWithoutFeedback
			onPress={this.onExpiredVoucherPress}>
			<View
				navigation={this.props.navigation}
				style={styles.expiredvoucher}>
				<View
					style={styles.cellcontentView}>
					<Image
						source={require("./../../assets/images/group-5-copy-3-2.png")}
						style={styles.backgroundImage}/>

					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 30 * alpha,
							width: 247 * alpha,
							top: 24 * alpha,
							bottom: 12 * alpha,
							alignItems: "flex-start",
						}}>
						<Text
							style={styles.titleText}>{this.props.title}</Text>
						<Text
							style={styles.descriptionText}>{this.props.description}</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.dateText}>{this.props.available_date}</Text>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 30 * alpha,
							right: 14 * alpha,
							top: 41 * alpha,
							height: 86 * alpha,
						}}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0,
								right: 16 * alpha,
								top: 43 * alpha,
								height: 29 * alpha,
							}}>
							<Image
								source={require("./../../assets/images/line-16-copy-5.png")}
								style={styles.lineImage}/>
							<View
								style={styles.termsView}>
								<TouchableOpacity
									onPress={this.onTermsTwoPressed}
									style={styles.termsButton}>
									<Text
										style={styles.termsButtonText}>Terms & Conditions</Text>
								</TouchableOpacity>
								<Image
									source={require("./../../assets/images/group-18.png")}
									style={styles.arrowImage}/>
							</View>
						</View>
						<Image
							source={require("./../../assets/images/bitmap-9.png")}
							style={styles.expiredImage}/>

					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	expiredvoucher: {
		backgroundColor: "transparent",
		width: "100%",
		height: 140 * alpha,
	},
	backgroundImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		shadowColor: "rgba(224, 222, 222, 0.5)",
		shadowRadius: 2 * alpha,
		shadowOpacity: 1 * alpha,
		position: "absolute",
		width: 348 * alpha,
		height: 126 * alpha,
		left: 14 * alpha,
		right: 14 * alpha,
	},
	cellcontentView: {
		opacity: 0.41,
		backgroundColor: "transparent",
		flex: 1,
		marginTop: 8 * alpha,
		marginBottom: 8 * alpha,
	},
	titleText: {
		backgroundColor: "transparent",
		color: "rgb(68, 68, 68)",
		fontFamily: "SFProText-Medium",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	descriptionText: {
		color: "rgb(124, 124, 124)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 7 * alpha,
	},
	dateText: {
		color: "rgb(132, 132, 132)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	lineImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: null,
		height: 2 * alpha,
	},
	termsView: {
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 118 * alpha,
		height: 13 * alpha,
		marginRight: 1 * alpha,
		marginTop: 14 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	termsButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0 * alpha,
		width: 95 * alpha,
		height: 12 * alpha,
		marginLeft: 13 * alpha,
	},
	termsButtonText: {
		color: "rgb(136, 133, 133)",
		fontFamily: "SFProText-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	termsButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	arrowImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		flex: 1,
		alignSelf: "flex-end",
		height: 7 * alpha,
		marginLeft: 4 * alpha,
		marginBottom: 2 * alpha,
	},
	expiredImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		position: "absolute",
		right: 0,
		width: 75 * alpha,
		top: 0,
		height: 86 * alpha,
	},

})
