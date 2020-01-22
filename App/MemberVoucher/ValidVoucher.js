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
import { KURL_INFO } from "../Utils/server";
import { connect } from "react-redux";
import { TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR } from "../Common/common_style";

import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from "../Common/config"

@connect(({ members }) => ({
	company_id: members.company_id,
	members: members
}))
export default class ValidVoucher extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {

	}

	onVoucherPress = () => {
		const { navigate } = this.props.navigation
		const analytics = new Analytics(ANALYTICS_ID)
		analytics.event(new Event('Voucher', 'Click', this.props.title))

		navigate("VoucherDetail", { item: this.props.item })
	}

	onTermsPressed = () => {
		const { navigate } = this.props.navigation
		const { company_id } = this.props

		navigate("WebCommon", {
			title: 'Terms & Condition',
			web_url: KURL_INFO + '?page=voucher_terms&id=' + company_id,
		})
	}

	renderPrice() {

		const { item, members } = this.props
		const display_value = item.voucher.display_value
		const discount_type = item.voucher.discount_type
		const discount_price = item.voucher.discount_price
		if (discount_type != null && discount_type != '' && discount_price != null && discount_price != '') {
			if (discount_type == 'fixed') {
				return (
					<View
						style={styles.valueView}>

						<View
							pointerEvents="box-none"
							style={{
								justifyContent: "center",
							}}>
							<Text
								style={styles.valueText}>${discount_price != null ? parseFloat(discount_price).toFixed(2) : discount_price}</Text>

						</View>
					</View>
				)
			} else {
				return (
					<View
						style={styles.valueView}>

						<View
							pointerEvents="box-none"
							style={{
								justifyContent: "center",
							}}>

							<Text
								style={styles.valueText}>{discount_price != null ? parseInt(discount_price) : discount_price}%</Text>

						</View>
					</View>
				)
			}
		} else if (display_value != null && display_value !== '') {
			return (
				<View
					style={styles.valueView}>

					<View
						pointerEvents="box-none"
						style={{
							justifyContent: "center",
						}}>
						<Text
							style={styles.valueText}>{display_value}</Text>
						<Text
							style={styles.currencyText}>{members.currency}</Text>
					</View>
				</View>
			)
		}
	}

	render() {
		let { item } = this.props
		let lastDate = item.expiry_date.split("-")
		var date = lastDate[2].toString() + '-' + lastDate[1].toString() + '-' + lastDate[0].toString()
		var msDiff = new Date(date).getTime() - new Date().getTime();    //Future date - current date
		var days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
		return <TouchableWithoutFeedback
			onPress={this.onVoucherPress}>
			<View
				navigation={this.props.navigation}
				style={[styles.validvoucher,]}>
				<View
					style={[styles.cellcontentView,]}>
					<Image
						source={require("./../../assets/images/group-5-3.png")}
						style={styles.backgroundImage} />
					<Image
						source={require("./../../assets/images/voucher_new.png")}
						style={styles.newImage}
					/>

					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 30 * alpha,
							right: 30 * alpha,
							top: parseInt(days) <= 3 ? 33 * alpha : 23 * alpha,
							bottom: 10 * alpha,
						}}>

						<View
							pointerEvents="box-none"
							style={{
								height: 25 * alpha,
								flexDirection: "row",
							}}>

							<Text
								style={styles.titleText}>{this.props.title}</Text>
							<View
								style={{
									flex: 1,
								}} />
							{this.renderPrice()}
						</View>
						<Text
							style={styles.descriptionText}>{this.props.description}</Text>
						<Image
							source={require("./../../assets/images/line-16-copy-5.png")}
							style={styles.lineImage} />
						<View
							style={{
								flex: 1,
							}} />
						<View
							pointerEvents="box-none"
							style={{
								height: 14 * alpha,
								flexDirection: "row",
								alignItems: "flex-end",
							}}>
							<Text
								style={styles.dateText}>Validity: <Text style={styles.highlight}>{this.props.available_date}</Text></Text>
							{/* <View
								style={{
									flex: 1,
								}} /> */}
							{parseInt(days) <= 3 ?
								<View style={styles.expiringView}>
									<Text style={styles.expiredText}>expire soon</Text>

								</View> :
								undefined}
						</View>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	expiredText: {
		fontFamily: TITLE_FONT,
		color: "white",
		fontSize: 10 * fontAlpha,
		textAlign: 'center'
	},
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
	},
	valueView: {
		flex: 1,
		backgroundColor: "transparent",
		height: 31 * alpha,
	},
	expiringView: {
		backgroundColor: "rgb(255,100,100)",
		// backgroundColor: 'rgb(245,222,222)',
		borderRadius: 7 * alpha,
		// borderTopLeftRadius: 5 * alpha,
		// borderBottomLeftRadius: 5 * alpha,
		paddingHorizontal: 5 * alpha,
		marginLeft: 10 * alpha,
		height: 14 * alpha,
		justifyContent: "center",
		alignItems: 'center'
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
		textAlign: "right",
		backgroundColor: "transparent",
	},
	percentvalueText: {
		color: "rgb(0, 178, 227)",
		fontFamily: TITLE_FONT,
		fontSize: 24 * alpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
	},
	descriptionText: {
		color: "rgb(124, 124, 124)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 40 * alpha,
		backgroundColor: "transparent",
		alignSelf: "flex-start",
	},
	lineImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: null,
		height: 2 * alpha,
		marginTop: 18 * alpha,
	},
	dateText: {
		color: "rgb(68, 68, 68)",
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	termsView: {
		backgroundColor: "transparent",
		width: 140 * alpha,
		height: 13 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	termsButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		// justifyContent: "center",
		padding: 0,
		height: 13 * alpha,
		width: 120 * alpha,
		marginRight: 4 * alpha,
	},
	termsButtonText: {
		color: "rgb(136, 133, 133)",
		fontFamily: TITLE_FONT,
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		width: 120 * alpha,
		textAlign: "right",
	},
	termsButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	arrowImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		flex: 1,
		alignSelf: "flex-end",
		height: 8 * alpha,
		marginLeft: 4 * alpha,
		marginBottom: 3 * alpha,
	},
	highlight: {
		color: PRIMARY_COLOR
	},
	newImage: {
		backgroundColor: "transparent",
		resizeMode: "contain",
		position: "absolute",
		right: 12 * alpha,
		width: 75 * alpha,
		bottom: 0 * alpha,
		height: 80 * alpha
	}
})
