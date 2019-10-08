//
//  ValidVoucher
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, View, Text } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import {KURL_INFO} from "../Utils/server";

export default class ValidVoucher extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onValidVoucherPress = () => {
		const { navigate } = this.props.navigation
		navigate("VoucherDetail",{voucher:this.props.item})
		console.log("done");
	}

	onTermsPressed = () => {
		const { navigate } = this.props.navigation
		const { company_id } = this.props

		navigate("WebCommon", {
			title: 'Terms & Condition',
			web_url: KURL_INFO + '?page=voucher_terms&id=' + company_id,
		})
	}

	render() {
		return <TouchableWithoutFeedback
				onPress={this.onValidVoucherPress}>
				<View
					navigation={this.props.navigation}
					style={styles.validvoucher}>
					<View
						style={styles.cellcontentView}>
						<Image
							source={require("./../../assets/images/group-5-3.png")}
							style={styles.backgroundImage}/>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 30 * alpha,
								right: 31 * alpha,
								top: 23 * alpha,
								bottom: 11 * alpha,
							}}>
							<View
								pointerEvents="box-none"
								style={{
									height: 31 * alpha,
									marginRight: 1,
									flexDirection: "row",
									alignItems: "flex-start",
								}}>
								<Text
									style={styles.titleText}>{this.props.title}</Text>
								<View
									style={{
										flex: 1,
									}}/>
								{ this.props.display_value ?
								<View
									style={styles.valueView}>
									{ this.props.discount_type == 'fixed' ?
										<Text
											style={styles.currencyText}>$</Text> : null
									}
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
										<Text
											style={this.props.discount_type == 'fixed' ? styles.valueText : styles.percentvalueText}>{this.props.display_value}</Text>
									</View>
									{ this.props.discount_type == 'percent' ?
										<Text
											style={styles.percentText}>%</Text> : null
									}

								</View> : null
								}
							</View>
							<Text
								style={styles.descriptionText}>{this.props.description}</Text>
							<Image
								source={require("./../../assets/images/line-16-copy-5.png")}
								style={styles.lineImage}/>
							<View
								style={{
									flex: 1,
								}}/>
							<View
								pointerEvents="box-none"
								style={{
									height: 14 * alpha,
									flexDirection: "row",
									alignItems: "flex-end",
								}}>
								<Text
									style={styles.dateText}>{this.props.available_date}</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.termsView}>
									<TouchableOpacity
										onPress={this.onTermsPressed}
										style={styles.termsButton}>
										<Text
											style={styles.termsButtonText}>Terms & Conditions</Text>
									</TouchableOpacity>
									<Image
										source={require("./../../assets/images/group-18.png")}
										style={styles.arrowImage}/>
								</View>
							</View>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	validvoucher: {
		backgroundColor: "transparent",
		width: "100%",
		height: 140 * alpha,
	},
	cellcontentView: {
		backgroundColor: "transparent",
		flex: 1,
		marginTop: 8 * alpha,
		marginBottom: 8 * alpha,
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
	titleText: {
		color: "rgb(68, 68, 68)",
		fontFamily: "SFProText-Medium",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 1 * alpha,
	},
	valueView: {
		backgroundColor: "transparent",
		width: 40 * alpha,
		height: 31 * alpha,
	},
	currencyText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		top: 6 * alpha,
	},
	valueText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 24 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 14 * alpha,
	},
	percentText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		right: 0,
		top: 16 * alpha,
	},
	percentvalueText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 24 * alpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 5 * alpha,
		marginRight: 9 * alpha,
	},
	descriptionText: {
		color: "rgb(124, 124, 124)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
	},
	lineImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: null,
		height: 2 * alpha,
		marginTop: 20 * alpha,
	},
	dateText: {
		color: "rgb(149, 148, 148)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginBottom: 1,
	},
	termsView: {
		backgroundColor: "transparent",
		width: 115 * alpha,
		height: 13 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	termsButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 13 * alpha,
		width: 95 * alpha,
		marginRight: 4 * alpha,
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
		resizeMode: "center",
		backgroundColor: "transparent",
		flex: 1,
		alignSelf: "flex-end",
		height: 7 * alpha,
		marginLeft: 4 * alpha,
		marginBottom: 2 * alpha,
	},
})
