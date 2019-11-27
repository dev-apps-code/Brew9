//
//  CellTwo
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { StyleSheet, TouchableWithoutFeedback, View, Text } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size"
import { PRIMARY_COLOR, NON_TITLE_FONT, TITLE_FONT } from "../Common/common_style"
import { TouchableOpacity } from "react-native-gesture-handler"


export default class MissionCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onStatusPressed = (statement_id) => {
		
		if (this.props.status != undefined && this.props.status != "") {
			if (this.props.status == "Completed") {
				this.props.onStatusPressed(statement_id)
			}
		}
		if (this.props.mission_type == "Login" && this.props.status != "Claimed") {
			this.props.onStatusPressed()
		}
	}

	render() {
	
		var status_string = ""
		var voucher_length = this.props.vouchers.length

		if (this.props.status == "Pending" && this.props.mission_type == "Login") {
			status_string = "Check In"
		} else {
			status_string = this.props.status
		}
		
		const vouchers = this.props.vouchers.map((item, key) => {
			return <Text key={key}>{item.voucher.name} x <Text style={styles.highlight}>{item.quantity}</Text>{key < voucher_length - 1 ? ", " : ""}</Text>
		})

		progress = this.props.progress != undefined ? this.props.progress : 0
		mission_progress_text = (this.props.mission_task_count != null && this.props.mission_task_count != "") ?`(${progress}/${this.props.mission_task_count})` : ""

		return <TouchableWithoutFeedback
				onPress={this.onCellTwoPress}>
				<View
					navigation={this.props.navigation}
					style={styles.missioncell}>
					<View
						pointerEvents="box-none"
						style={{
							marginLeft: 20 * alpha,
							width: 335 * alpha,
							flex: 1,
							marginTop: 18 * alpha,
							bottom: 1 * alpha,
							alignItems: "flex-start",
						}}>
						<Text
							style={styles.titleText}>{this.props.title} {mission_progress_text}</Text>
						
							{/* <Text
								style={styles.descriptionText}>{reward_string}</Text> */}
							{this.props.point != null && (<Text
								style={styles.descriptionText}><Text style={styles.highlight}>+{this.props.point}</Text> points</Text>)}
							{this.props.vouchers.length > 0 && (<Text
								style={styles.voucherText}>{vouchers}</Text>)}
							<View style={styles.spacer} />
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.lineView}/>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							right: 0,
							top: 0,
							bottom: 0,
							justifyContent: "center",
						}}>
						<TouchableOpacity
							onPress={() => this.onStatusPressed(this.props.statement_id)}
						>
						<View
							style={this.props.status != "Pending" ? styles.statusCompleteView : styles.statusView}>
							<Text
								style={styles.completeText}>{status_string}</Text>
						</View>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	missioncell: {
		backgroundColor: "white",
		width: "100%",
		flex: 1,
	},
	titleText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	descriptionText: {
		width: 250 * alpha,
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 2 * alpha,
	},
	voucherText: {
		width: 250 * alpha,
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 2 * alpha,
	},
	lineView: {
		backgroundColor: "rgb(241, 241, 241)",
		alignSelf: "center",
		width: 334 * alpha,
		height: 1 * alpha,
	},
	statusView: {
		backgroundColor: "rgb(89, 89, 89)",
		borderRadius: 9.5 * alpha,
		width: 70 * alpha,
		height: 19 * alpha,
		marginRight: 20 * alpha,
		justifyContent: "center",
		alignItems: "center",
	},
	statusCompleteView: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 11 * alpha,
		width: 80 * alpha,
		height: 22 * alpha,
		marginRight: 20 * alpha,
		justifyContent: "center",
		alignItems: "center",
	},
	completeText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	highlight: {
		color: PRIMARY_COLOR,
	},
	spacer: {
		marginBottom: 18 * alpha,
	}
})
