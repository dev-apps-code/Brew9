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
import { connect } from "react-redux";
import {TITLE_FONT, NON_TITLE_FONT} from "../Common/common_style";

@connect(({ members }) => ({
	company_id: members.company_id,
	members:members
}))
export default class ValidVoucher extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onVoucherPress = () => {
		const { navigate } = this.props.navigation
		navigate("VoucherDetail",{item:this.props.item})
	}

	onTermsPressed = () => {
		const { navigate } = this.props.navigation
		const { company_id } = this.props

		navigate("WebCommon", {
			title: 'Terms & Condition',
			web_url: KURL_INFO + '?page=voucher_terms&id=' + company_id,
		})
	}

	renderPrice(){

		const {item,members} = this.props
		const display_value = item.voucher.display_value
		const discount_type = item.voucher.discount_type
		const discount_price = item.voucher.discount_price
		if (display_value != null  && display_value !==''){

			return (
				<View
				style={styles.valueView}>
					<Text
						style={styles.currencyText}>{members.currency}</Text> 			
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
							style={styles.valueText}>{display_value}</Text>
					</View>
				</View>
			)
		}else if (discount_type != null && discount_type != '' && discount_price != null && discount_price != ''){
			if (discount_type == 'fixed'){
				return (
					<View
					style={styles.valueView}>
						<Text
							style={styles.currencyText}>{members.currency}</Text> 			
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
								style={styles.valueText}>{discount_price != undefined ? parseFloat(discount_price).toFixed(2): discount_price}</Text>
						</View>
					</View>
				)
			}else {

				return (
					<View
					style={styles.valueView}>
					 			
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
								style={styles.percentvalueText}>{discount_price != null ? parseInt(discount_price) : discount_price}</Text>
							<Text
								style={styles.percentText}>%</Text> 
						</View>
					</View>
				)
			}
		}
	}

	render() {
		return <TouchableWithoutFeedback
				onPress={this.onVoucherPress}>
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
								{this.renderPrice()}
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
									style={styles.dateText}>{this.props.item.available_date}</Text>
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
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 1 * alpha,
	},
	valueView: {
		backgroundColor: "transparent",
		width: 90 * alpha,
		height: 31 * alpha,
	},
	currencyText: {
		color: "rgb(0, 178, 227)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		top: 3 * alpha,
	},
	valueText: {
		color: "rgb(0, 178, 227)",
		fontFamily: TITLE_FONT,
		fontSize: 24 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 16 * alpha,
	},
	percentText: {
		color: "rgb(0, 178, 227)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		right: 0,
		top: 10 * alpha,
	},
	percentvalueText: {
		color: "rgb(0, 178, 227)",
		fontFamily: TITLE_FONT,
		fontSize: 24 * alpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginRight: 15 * alpha,
	},
	descriptionText: {
		color: "rgb(124, 124, 124)",
		fontFamily: NON_TITLE_FONT,
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
		marginTop: 5 * alpha,
	},
	dateText: {
		color: "rgb(149, 148, 148)",
		fontFamily: TITLE_FONT,
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
		fontFamily: TITLE_FONT,
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		
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
