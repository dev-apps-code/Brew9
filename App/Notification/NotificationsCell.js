//
//  NotificationsCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, StyleSheet, Text, Image, TouchableWithoutFeedback } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";

export default class NotificationsCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onNotificationsCellPress = () => {
	
	}

	render() {

		return <TouchableWithoutFeedback
			onPress={this.onNotificationsCellPress}>
			<View
				navigation={this.props.navigation}
				style={styles.notificationcell}>
				<View
					pointerEvents="box-none"
					style={{
						height: 19 * alpha,
						marginLeft: 20 * alpha,
						marginRight: 20 * alpha,
						marginTop: 20 * alpha,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.titleText}>{this.props.title}</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.timeText}>{this.props.time}</Text>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						height: 16 * alpha,
						marginLeft: 20 * alpha,
						marginRight: 25 * alpha,
						marginTop: 1 * alpha,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.messageText}>{this.props.text}</Text>
					<View
						style={{
							flex: 1,
						}}/>
					{ this.props.id > this.props.last_read && (
					<View
						style={styles.circleView}/>)}
				</View>
				<View
					style={{
						flex: 1,
					}}/>
				<Image
					source={require("./../../assets/images/line-7.png")}
					style={styles.seperatorImage}/>
			</View>
		</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	notificationcell: {
		backgroundColor: "transparent",
		width: "100%",
		height: 81 * alpha,
	},
	titleText: {
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	timeText: {
		color: "black",
		fontFamily: "DINPro-Medium",
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginTop: 2 * alpha,
	},
	messageText: {
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 254 * alpha,
	},
	circleView: {
		backgroundColor: "rgb(247, 66, 75)",
		borderRadius: 3 * alpha,
		width: 6 * alpha,
		height: 6 * alpha,
		marginTop: 5 * alpha,
	},
	seperatorImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: 350 * alpha,
		height: 3 * alpha,
		marginBottom: 1 * alpha,
	},
})
