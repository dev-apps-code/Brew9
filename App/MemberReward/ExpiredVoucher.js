//
//  ExpiredVoucher
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Image, Text } from "react-native"
import React from "react"
import {alpha, fontAlpha} from "../common/size";


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
							source={require("./../../assets/images/group-5-3.png")}
							style={styles.backgroundImage}/>
						<Text
							style={styles.titleText}>{this.props.title}</Text>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 30 * alpha,
								right: 14 * alpha,
								top: 40 * alpha,
								height: 88 * alpha,
							}}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0,
									right: 17 * alpha,
									top: 10 * alpha,
									height: 56 * alpha,
									alignItems: "flex-end",
								}}>
								<Text
									style={styles.descriptionText}>{this.props.description}</Text>
								<View
									style={styles.termsView}>
									<TouchableOpacity
										onPress={this.onTermsThreePressed}
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

							<Image
								source={require("./../../assets/images/line-16-copy-5.png")}
								style={styles.lineImage}/>
						</View>
						<Text
							style={styles.dateText}>{this.props.expiry_date}</Text>
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
		backgroundColor: "transparent",
		flex: 1,
		marginTop: 8 * alpha,
		marginBottom: 8 * alpha,
	},
	titleText: {
		color: "rgb(68, 68, 68)",
		fontFamily: "Helvetica-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		left: 30 * alpha,
		top: 24 * alpha,
	},
	descriptionText: {
		color: "rgb(124, 124, 124)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
	},
	termsView: {
		backgroundColor: "transparent",
		width: 118 * alpha,
		height: 13 * alpha,
		marginTop: 29 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	termsButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 95 * alpha,
		height: 12 * alpha,
		marginLeft: 13 * alpha,
	},
	termsButtonText: {
		color: "rgb(136, 133, 133)",
		fontFamily: "Helvetica-Bold",
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
	lineImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		position: "absolute",
		left: 0,
		right: 16 * alpha,
		top: 37 * alpha,
		height: 2 * alpha,
	},
	dateText: {
		backgroundColor: "transparent",
		color: "rgb(149, 148, 148)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		position: "absolute",
		left: 30 * alpha,
		bottom: 12 * alpha,
	},
})