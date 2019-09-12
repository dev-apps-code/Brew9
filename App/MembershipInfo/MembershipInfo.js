//
//  MembershipInfo
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {Image, FlatList, ScrollView, Text, View, StyleSheet, TouchableOpacity} from "react-native"
import React from "react"
import BenefitCell from "./BenefitCell"
import {alpha, fontAlpha} from "../common/size";


export default class MembershipInfo extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Brew9",
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

	benefitlistFlatListMockData = [{
		key: "1",
	}, {
		key: "2",
	}, {
		key: "3",
	}, {
		key: "4",
	}, {
		key: "5",
	}]

	renderBenefitlistFlatListCell = ({ item }) => {
	
		return <BenefitCell
				navigation={this.props.navigation}/>
	}

	render() {

		return <View
			style={styles.membershipInfoView}>
			<ScrollView
				style={styles.scrollviewScrollView}>
				<View
					style={styles.memberRightsView}>
					<Text
						style={styles.memberRightsText}>Member Rights</Text>
					<View
						pointerEvents="box-none"
						style={{
							height: 153 * alpha,
							marginLeft: 27 * alpha,
							marginRight: 1 * alpha,
							marginTop: 11 * alpha,
							flexDirection: "row",
							alignItems: "flex-start",
						}}>
						<View
							style={styles.cardView}>
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
									source={require("./../../assets/images/brew9-doodle-06-2.png")}
									style={styles.backgroundImage}/>
							</View>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 19 * alpha,
									width: 91 * alpha,
									top: 13 * alpha,
									bottom: 12 * alpha,
									alignItems: "flex-start",
								}}>
								<Text
									style={styles.membershipnameText}>Silver Member</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<View
									style={styles.group27View}>
									<Text
										style={styles.textText}>0</Text>
									<Image
										source={require("./../../assets/images/group-25-4.png")}
										style={styles.group25Image}/>
									<Text
										style={styles.expText}>exp</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Image
										source={require("./../../assets/images/group-26-5.png")}
										style={styles.group26Image}/>
									<Text
										style={styles.textTwoText}>501</Text>
								</View>
							</View>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<Image
							source={require("./../../assets/images/brew9-doodle-08-copy-2.png")}
							style={styles.nextcardImage}/>
					</View>
					<Image
						source={require("./../../assets/images/slide-left-2.png")}
						style={styles.slideLeftImage}/>
				</View>
				<View
					style={styles.benefitView}>
					<Text
						style={styles.benefitsText}>Benefits </Text>
					<View
						style={styles.benefitlistFlatListViewWrapper}>
						<FlatList
							renderItem={this.renderBenefitlistFlatListCell}
							data={this.benefitlistFlatListMockData}
							style={styles.benefitlistFlatList}/>
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
	},
	navigationBarItem: {

	},
	navigationBarItemTitle: {
		color: "black",
		fontFamily: "DINPro-Bold",
		fontSize: 16 * fontAlpha,
	},
	navigationBarItemIcon: {
		tintColor: "black",
	},
	membershipInfoView: {
		backgroundColor: "white",
		flex: 1,
	},
	scrollviewScrollView: {
		backgroundColor: "transparent",
		flex: 1,
		marginLeft: 1 * alpha,
		marginTop: 20 * alpha,
		marginBottom: 1 * alpha,
	},
	memberRightsView: {
		backgroundColor: "transparent",
		height: 223 * alpha,
		alignItems: "flex-end",
	},
	memberRightsTwoView: {
		backgroundColor: "transparent",
		width: 349 * alpha,
		height: 186 * alpha,
		marginTop: 9 * alpha,
		alignItems: "flex-start",
	},
	memberRightsText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "flex-start",
		marginLeft: 27 * alpha,
		marginTop: 9 * alpha,
	},
	cardView: {
		backgroundColor: "transparent",
		width: 320 * alpha,
		height: 153 * alpha,
	},
	backgroundImage: {
		backgroundColor: "transparent",
		resizeMode: "cover",
		width: null,
		height: 151 * alpha,
	},
	membershipnameText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	group27View: {
		backgroundColor: "transparent",
		width: 71 * alpha,
		height: 18 * alpha,
		marginLeft: 1 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	textText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	group25Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 7 * alpha,
		height: 8 * alpha,
		marginLeft: 3 * alpha,
	},
	expText: {
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 2 * alpha,
	},
	group26Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		alignSelf: "flex-start",
		width: 7 * alpha,
		height: 7 * alpha,
		marginRight: 2 * alpha,
		marginTop: 8 * alpha,
	},
	textTwoText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	nextcardImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 12 * alpha,
		height: 151 * alpha,
		marginTop: 1 * alpha,
	},
	slideLeftImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		alignSelf: "center",
		width: 43 * alpha,
		height: 3 * alpha,
		marginTop: 11 * alpha,
	},
	benefitView: {
		backgroundColor: "transparent",
		flex: 1,
	},
	benefitsText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		alignSelf: "flex-start",
		marginLeft: 27 * alpha,
	},
	benefitlistFlatList: {
		backgroundColor: "transparent",
		width: "100%",
		height: "100%",
	},
	benefitlistFlatListViewWrapper: {
		flex: 1,
		marginRight: 1 * alpha,
		marginTop: 13 * alpha,
	},
})
