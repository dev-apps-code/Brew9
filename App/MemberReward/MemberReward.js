//
//  MemberReward
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, StyleSheet, FlatList, Image } from "react-native"
import ExpiredcouponTwo from "./ExpiredcouponTwo"
import React from "react"
import UsedVoucherTwo from "./UsedVoucherTwo"
import NewVoucherTwo from "./NewVoucherTwo"


export default class MemberReward extends React.Component {

	static navigationOptions = ({ navigation }) => {
	
		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
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
	
		return <View
				style={styles.iphone8Copy11View}>
				<View
					style={styles.navigationView}>
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
						<View
							style={styles.logoView}>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									right: 0,
									top: 0,
									bottom: 0,
									justifyContent: "center",
								}}>
								<View
									style={styles.rightCircleView}>
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
										<Image
											source={require("./../../assets/images/right-10.png")}
											style={styles.rightImage}/>
									</View>
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
										<Image
											source={require("./../../assets/images/circle.png")}
											style={styles.circleImage}/>
									</View>
								</View>
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
								<View
									style={styles.leftDotView}>
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
										<Image
											source={require("./../../assets/images/left-10.png")}
											style={styles.leftImage}/>
									</View>
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
										<Image
											source={require("./../../assets/images/dot.png")}
											style={styles.dotImage}/>
									</View>
								</View>
							</View>
						</View>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 0,
							top: 0,
							bottom: 0,
							justifyContent: "center",
						}}>
						<View
							pointerEvents="box-none"
							style={{
								width: 74,
								height: 14,
								marginLeft: 21,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<Image
								source={require("./../../assets/images/group-4-3.png")}
								style={styles.group4Image}/>
							<Text
								style={styles.rewardsText}>Rewards</Text>
						</View>
					</View>
				</View>
				<View
					style={styles.rewardtabView}>
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
						<View
							pointerEvents="box-none"
							style={{
								height: 38,
								marginRight: 42,
								flexDirection: "row",
								alignItems: "center",
							}}>
							<View
								style={styles.availableView}>
								<View
									style={styles.choosingView}/>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										alignSelf: "center",
										top: 0,
										bottom: 0,
										justifyContent: "center",
									}}>
									<Text
										style={styles.availableText}>Available</Text>
								</View>
							</View>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.expiredText}>Expired</Text>
						</View>
					</View>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							alignSelf: "center",
							top: 0,
							bottom: 0,
							justifyContent: "center",
						}}>
						<Text
							style={styles.usedText}>Used</Text>
					</View>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						height: 503,
					}}>
					<View
						style={styles.novoucherviewView}>
						<Image
							source={require("./../../assets/images/brew9-doodle-03.png")}
							style={styles.storeimageImage}/>
						<Text
							style={styles.noRewardAvailableText}>No reward available</Text>
					</View>
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
	iphone8Copy11View: {
		backgroundColor: "rgb(243, 243, 243)",
		flex: 1,
	},
	navigationView: {
		backgroundColor: "transparent",
		height: 52,
		marginTop: 20,
	},
	logoView: {
		backgroundColor: "white",
		height: 52,
	},
	rightCircleView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
		marginRight: 9,
	},
	rightImage: {
		backgroundColor: "transparent",
		opacity: 0.6,
		resizeMode: "center",
		width: null,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	circleImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 16,
		marginLeft: 12,
		marginRight: 17,
	},
	leftDotView: {
		backgroundColor: "transparent",
		width: 44,
		height: 32,
		marginRight: 47,
	},
	leftImage: {
		backgroundColor: "transparent",
		opacity: 0.61,
		resizeMode: "center",
		width: null,
		height: 30,
		marginLeft: 3,
		marginRight: 2,
	},
	dotImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 6,
		marginLeft: 13,
		marginRight: 12,
	},
	group4Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 13,
		height: 12,
	},
	rewardsText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginLeft: 10,
	},
	rewardtabView: {
		backgroundColor: "white",
		height: 38,
	},
	availableView: {
		backgroundColor: "transparent",
		width: 125,
		height: 38,
	},
	choosingView: {
		backgroundColor: "rgb(216, 216, 216)",
		position: "absolute",
		alignSelf: "center",
		width: 49,
		bottom: 0,
		height: 2,
	},
	availableText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	expiredText: {
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	usedText: {
		backgroundColor: "transparent",
		color: "rgb(99, 97, 97)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	novoucherviewView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 503,
		alignItems: "center",
	},
	storeimageImage: {
		backgroundColor: "transparent",
		resizeMode: "contain",
		alignSelf: "flex-start",
		width: 375,
		height: 91,
		marginTop: 181,
	},
	noRewardAvailableText: {
		color: "rgb(190, 190, 190)",
		fontFamily: "Helvetica",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 14,
	},
	voucherviewView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 503,
		alignItems: "flex-start",
	},
	howToUseView: {
		backgroundColor: "transparent",
		width: 375,
		height: 21,
		alignItems: "flex-end",
	},
	howToUseText: {
		color: "rgb(151, 151, 151)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "right",
		backgroundColor: "transparent",
		marginRight: 13,
	},
	vouchertableFlatList: {
		backgroundColor: "transparent",
		width: "100%",
		height: "100%",
	},
	vouchertableFlatListViewWrapper: {
		alignSelf: "stretch",
		height: 482,
	},
	redeemRewardView: {
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "white",
		borderStyle: "solid",
		height: 54,
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
