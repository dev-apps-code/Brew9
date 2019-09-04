//
//  MemberReward
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from "react-native"
import ExpiredcouponTwo from "./ExpiredcouponTwo"
import React from "react"
import UsedVoucherTwo from "./UsedVoucherTwo"
import NewVoucherTwo from "./NewVoucherTwo"
import { alpha, fontAlpha } from "../common/size";

export default class MemberReward extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "",
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
				<TouchableOpacity
					onPress={params.onItemPressed ? params.onItemPressed : () => null}
					style={styles.navigationBarItem}>
					<Text
						style={styles.navigationBarItemTitle}>Rewards</Text>
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
		this.state = {
			has_reward: true,
		}
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

	onItemPressed = () => {

	}

	vouchertableFlatListMockData = [{
		key: "1",
	}, {
		key: "2",
	}, {
		key: "3",
	}, {
		key: "4",
	}, {
		key: "5",
	}, {
		key: "6",
	}, {
		key: "7",
	}, {
		key: "8",
	}, {
		key: "9",
	}, {
		key: "10",
	}]

	renderVouchertableFlatListCell = ({ item }) => {
	
		return <NewVoucherTwo
				navigation={this.props.navigation}/>
	}

	render() {
		const {
			has_reward,
		} = this.state
		return <View
			style={styles.memberRewardView}>
			<View
				style={styles.rewardtabView}>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						height: 38 * alpha,
						flexDirection: "row",
						alignItems: "flex-start",
					}}>
					<View
						style={styles.availableView}>
						<View
							style={styles.availableselectedView}/>
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
							<TouchableOpacity
								onPress={this.onAvailablePressed}
								style={styles.availableButton}>
								<Text
									style={styles.availableButtonText}>Available</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<View
						style={styles.expiredView}>
						<View
							style={styles.expiredselectedView}/>
						<TouchableOpacity
							onPress={this.onExpiredPressed}
							style={styles.expiredButton}>
							<Text
								style={styles.expiredButtonText}>Expired</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View
					style={styles.usedView}>
					<View
						style={styles.usedselectedView}/>
					<TouchableOpacity
						onPress={this.onUsedPressed}
						style={styles.usedButton}>
						<Text
							style={styles.usedButtonText}>Used</Text>
					</TouchableOpacity>
				</View>
			</View>
				<View
					pointerEvents="box-none"
					style={{
						height: 503 * alpha,
					}}>
					{(has_reward ? (
						<View
							style={styles.voucherviewView}>
							<View
								style={styles.howToUseView}>
								<Text
									style={styles.howToUseText}>How to use</Text>
							</View>
							<View
								style={styles.vouchertableFlatListViewWrapper}>
								<FlatList
									renderItem={this.renderVouchertableFlatListCell}
									data={this.vouchertableFlatListMockData}
									style={styles.vouchertableFlatList}/>
							</View>
						</View>
					) : (
						<View
							style={styles.novoucherviewView}>
							<Image
								source={require("./../../assets/images/brew9-doodle-03.png")}
								style={styles.storeimageImage}/>
							<Text
								style={styles.noRewardAvailableText}>No reward available</Text>
						</View>
					))}

				</View>
				<View
					style={{
						flex: 1,
					}}/>
				<View
					style={styles.redeemRewardView}>
					<Text
						style={styles.redeemRewardText}>Redeem Reward</Text>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	navigationBarItem: {
	},
	navigationBarItemTitle: {
		color: "black",
		marginLeft: 10 * alpha,
	},
	navigationBarItemIcon: {
		tintColor: "black",
	},
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
	},
	memberRewardView: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	rewardtabView: {
		backgroundColor: "white",
		height: 38 * alpha,
	},
	availableView: {
		backgroundColor: "transparent",
		width: 125 * alpha,
		height: 38 * alpha,
	},
	availableselectedView: {
		backgroundColor: "rgb(216, 216, 216)",
		position: "absolute",
		alignSelf: "center",
		width: 49 * alpha,
		bottom: 0,
		height: 2 * alpha,
	},
	availableButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 38 * alpha,
	},
	availableButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	availableButtonText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
	},
	expiredView: {
		backgroundColor: "transparent",
		width: 125 * alpha,
		height: 38 * alpha,
	},
	expiredselectedView: {
		backgroundColor: "rgb(216, 216, 216)",
		position: "absolute",
		alignSelf: "center",
		width: 49 * alpha,
		bottom: 0,
		height: 2 * alpha,
	},
	expiredButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	expiredButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	expiredButtonText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	usedView: {
		backgroundColor: "transparent",
		position: "absolute",
		alignSelf: "center",
		width: 125 * alpha,
		top: 0,
		height: 38 * alpha,
	},
	usedselectedView: {
		backgroundColor: "rgb(216, 216, 216)",
		position: "absolute",
		alignSelf: "center",
		width: 49 * alpha,
		bottom: 0,
		height: 2 * alpha,
	},
	usedButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	usedButtonText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	usedButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	novoucherviewView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 503 * alpha,
		alignItems: "flex-start",
	},
	storeimageImage: {
		resizeMode: "contain",
		backgroundColor: "transparent",
		width: 375 * alpha,
		height: 91 * alpha,
		marginTop: 181 * alpha,
	},
	noRewardAvailableText: {
		color: "rgb(190, 190, 190)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "center",
		marginTop: 14,
	},
	voucherviewView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 503 * alpha,
		alignItems: "flex-start",
	},
	howToUseView: {
		backgroundColor: "transparent",
		width: 375 * alpha,
		height: 21 * alpha,
		alignItems: "flex-end",
	},
	howToUseText: {
		color: "rgb(151, 151, 151)",
		fontFamily: "Helvetica",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginRight: 13 * alpha,
		marginTop: 5 * alpha,
	},
	vouchertableFlatList: {
		backgroundColor: "transparent",
		width: "100%",
		height: "100%",
	},
	vouchertableFlatListViewWrapper: {
		alignSelf: "stretch",
		height: 482 * alpha,
	},
	redeemRewardView: {
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "white",
		borderStyle: "solid",
		height: 54 * alpha,
		justifyContent: "center",
		alignItems: "center",
	},
	redeemRewardText: {
		color: "rgb(65, 64, 64)",
		fontFamily: "Helvetica",
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
})