//
//  NotificationsCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//
import { View, StyleSheet, Text, Image, TouchableWithoutFeedback } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import { TITLE_FONT, NON_TITLE_FONT } from "../Common/common_style";
import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from "../Common/config"

export default class NotificationsCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	}

	onNotificationsCellPress = (item, type) => {
		if (type == "promo") {
			const { navigate } = this.props.navigation
			const analytics = new Analytics(ANALYTICS_ID)
			analytics.event(new Event('Inbox', 'Click', `Promotion ${item.title}`))
			navigate("PromotionDetail", {
				details: item,
			})
		}
		else if (type == "voucher") {
			const { navigate } = this.props.navigation
			const analytics = new Analytics(ANALYTICS_ID)
			analytics.event(new Event('Inbox', 'Click', `Voucher`))
			navigate("MemberVoucher")
		}
		this.props.onNotificationsCellPress(item, type)
	}

	render() {

		return <TouchableWithoutFeedback
			onPress={() => this.onNotificationsCellPress(this.props.item, this.props.type)}>
			<View
				navigation={this.props.navigation}
				style={styles.notificationcell}>
				<View style={styles.notificationDetailSection}>
					<View style={styles.notificationTop}>
						<View
							pointerEvents="box-none"
							style={{
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							<Text
								style={styles.titleText}>{this.props.title}</Text>
							<View
								style={{
									flex: 1,
								}} />
							<Text
								style={styles.timeText}>{this.props.time}</Text>
{/* <View
								style={{
									flex: 1,
								}} /> */}

						</View>
					</View>
					<View style={styles.notificationBottom}>
						<View
							pointerEvents="box-none"
							style={{
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							<Text
								// numberOfLines={2}
								textAlign='justify'
								style={styles.messageText}>{this.props.text}</Text>
							
							
						</View>
					</View>
				</View>
				<View style={styles.arrowView}>
					{(this.props.type == "promo" || this.props.type == "voucher") && (
						<Image
							source={require("./../../assets/images/next.png")}
							style={styles.arrowImage} />
					)}
				</View>
				{!this.props.read && (
								<View
									style={styles.circleView} />)}
				<Image
					source={require("./../../assets/images/line-7.png")}
					style={styles.seperatorImage} />
			</View>
		</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	notificationcell: {
		backgroundColor: "transparent",
		width: "100%",
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	notificationDetailSection: {
		paddingLeft: 20 * alpha,
		paddingRight: 10 * alpha,
		flex: 1,
	},
	notificationTop: {
		marginTop: 20 * alpha,
		flex: 1,
	},
	notificationBottom: {
		marginTop: 5 * alpha,
		marginBottom: 20 * alpha,
		flex: 1,
	},
	titleText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	timeText: {
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginTop: 2 * alpha,
	},
	messageText: {
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 13 * fontAlpha,
		width: 320 * alpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	circleView: {
		backgroundColor: "rgb(247, 66, 75)",
		position: "absolute",
		borderRadius: 3 * alpha,
		width: 6 * alpha,
		height: 6 * alpha,
		top: 23 * alpha,
		right: 13 * alpha,
	},
	seperatorImage: {
		resizeMode: "cover",
		position: "absolute",
		bottom: 0,
		left: 20 * alpha,
		backgroundColor: "transparent",
		width: "100%",
		height: 3 * alpha,
		marginBottom: 1 * alpha,
	},
	arrowView: {
		width: 10 * alpha,
		marginLeft: 10 * alpha,
		marginRight: 10 * alpha,
	},
	arrowImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 10 * alpha,
	},
})
