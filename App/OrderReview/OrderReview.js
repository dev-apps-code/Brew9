//
//  OrderReview
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from "react-native"
import {alpha, fontAlpha} from "../Common/size";


export default class OrderReview extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Review",
			headerTintColor: "black",
			headerLeft: <View
				style={styles.headerLeftContainer}>
				<TouchableOpacity
					onPress={params.onBackPressed ? params.onBackPressed : () => null}
					style={styles.navigationBarItem}>
					<Image
						source={require("./../../assets/images/back.png")}
						style={styles.navigationBarItemIcon}/>
				</TouchableOpacity>
			</View>,
			headerRight: null,
			headerStyle: {
				elevation: 0,
				shadowOpacity: 0
			},
		}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	render() {
	
		return <View
				style={styles.orderReviewView}>
				<ScrollView
					style={styles.reviewScrollView}>
					<View
						style={styles.satisfactionLevelView}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 11 * alpha,
								right: 11 * alpha,
								top: 19 * alpha,
								bottom: 19 * alpha,
							}}>
							<Text
								style={styles.titleText}>My Satisfaction Level</Text>
							<View
								style={styles.lineView}/>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.commentText}>“Lorem ipsum dolor sit amet, consectetuer {"\n"}adipiscing elit, Lorem ipsum dolor sit amet, {"\n"}consectetuer adipiscing elit,  ”</Text>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0 * alpha,
								top: 0 * alpha,
								bottom: 0 * alpha,
								justifyContent: "center",
							}}>
							<Text
								style={styles.satisfactionText}>“Very Good”</Text>
						</View>
					</View>
					<View
						style={styles.commentView}>
						<View
							style={styles.avatarView}/>
						<Text
							style={styles.nameText}>Somebody</Text>
						<View
							style={{
								flex: 1,
							}}/>
						<Text
							style={styles.levelText}>good</Text>
					</View>
					<View
						style={styles.replyView}>
						<View
							style={styles.replyTwoView}>
							<View
								pointerEvents="box-none"
								style={{
									height: 18 * alpha,
									flexDirection: "row",
									alignItems: "flex-start",
								}}>
								<Text
									style={styles.fromText}>Brew9 replied:</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.dateText}>2019-06-21 13:56</Text>
							</View>
							<Text
								style={styles.messageText}>“Lorem ipsum dolor sit amet, consectetuer {"\n"}adipiscing elit, Lorem ipsum dolor sit amet, {"\n"}consectetuer adipiscing elit,  ”</Text>
						</View>
					</View>
				</ScrollView>
			</View>
	}
}

const styles = StyleSheet.create({
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
		width: 70 * alpha,
	},
	navigationBarItem: {
		width: "100%",
	},
	navigationBarItemTitle: {
		color: "black",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
	},
	navigationBarItemIcon: {
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
	orderReviewView: {
		backgroundColor: "white",
		flex: 1,
	},
	reviewScrollView: {
		backgroundColor: "rgb(248, 248, 248)",
		height: 733 * alpha,
	},
	satisfactionLevelView: {
		backgroundColor: "white",
		borderRadius: 5 * alpha,
		height: 234 * alpha,
		marginLeft: 14 * alpha,
		marginRight: 14 * alpha,
		marginTop: 14 * alpha,
	},
	titleText: {
		backgroundColor: "transparent",
		color: "rgb(158, 157, 157)",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		alignSelf: "center",
	},
	lineView: {
		backgroundColor: "rgb(245, 245, 245)",
		height: 1 * alpha,
		marginLeft: 1 * alpha,
		marginTop: 100 * alpha,
	},
	commentText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 18 * alpha,
	},
	satisfactionText: {
		color: "rgb(158, 157, 157)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 12 * alpha,
	},
	commentView: {
		backgroundColor: "white",
		borderRadius: 6 * alpha,
		height: 81 * alpha,
		marginLeft: 14 * alpha,
		marginRight: 14 * alpha,
		marginTop: 9 * alpha,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	avatarView: {
		backgroundColor: "transparent",
		borderRadius: 16 * alpha,
		borderWidth: 1,
		borderColor: "rgb(213, 212, 212)",
		borderStyle: "solid",
		width: 32 * alpha,
		height: 32 * alpha,
		marginLeft: 11 * alpha,
		marginTop: 17 * alpha,
	},
	nameText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 15 * alpha,
		marginTop: 24 * alpha,
	},
	levelText: {
		color: "rgb(158, 157, 157)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 11 * alpha,
		marginTop: 24 * alpha,
	},
	replyView: {
		backgroundColor: "white",
		borderRadius: 6 * alpha,
		height: 120 * alpha,
		marginLeft: 14 * alpha,
		marginRight: 14 * alpha,
		marginTop: 13 * alpha,
	},
	replyTwoView: {
		backgroundColor: "transparent",
		height: 93 * alpha,
		marginLeft: 12 * alpha,
		marginRight: 13 * alpha,
		marginTop: 11 * alpha,
	},
	fromText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "SFProText-Medium",
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	dateText: {
		backgroundColor: "transparent",
		color: "rgb(200, 200, 200)",
		fontFamily: "Helvetica",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 2 * alpha,
	},
	messageText: {
		backgroundColor: "transparent",
		color: "rgb(158, 157, 157)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 1 * alpha,
		marginRight: 14 * alpha,
		marginTop: 18 * alpha,
	},
})
