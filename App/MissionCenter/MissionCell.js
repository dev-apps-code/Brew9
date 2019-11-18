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
		
	}

	render() {
	
		var reward_string = ""
		var mission_vouchers = this.props.vouchers
		var status_string = ""

		if (this.props.status == "Claimed" && this.props.mission_type == "Login") {
			status_string = "Checked In"
		} else {
			status_string = this.props.status
		}

		if (this.props.point > 0) {
			reward_string += `+${this.props.point} points `
		}

		if (this.props.vouchers.length > 0) {
			for (var index in mission_vouchers) {
				var voucher = mission_vouchers[index]
				reward_string += (voucher.voucher.name + " x" + voucher.quantity)
				if (index < mission_vouchers.length) {
					reward_string += ", "
				}
			}
		}
		
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
						
							<Text
								style={styles.descriptionText}>{reward_string}</Text>
							{/* <Text
								style={styles.descriptionText}><Text style={styles.highlight}>+{this.props.point}</Text> points</Text> */}
						
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
		color: "black",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 2 * alpha,
		marginBottom: 18 * alpha,
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
	}
})
