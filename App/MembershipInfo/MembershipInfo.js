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
import {alpha, fontAlpha} from "../Common/size";
import MembershipRequestObject from "../Requests/membership_request_object.js";
import {createAction} from "../Utils";
import {connect} from "react-redux";
import Carousel, {Pagination} from 'react-native-snap-carousel'

@connect(({ members }) => ({
	members: members.profile
}))
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
		this.state = {
			page: 1,
			total: 0,
			data: [],
			membership_levels:[],
			default_image: "",
			awards:[],
			loading: true,
			isRefreshing: true,
			activeSlide: 0,
		}
	}

	componentDidMount() {
		this.loadMembershipPlans()
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	loadMembershipPlans() {

		const { dispatch } = this.props
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					isRefreshing: false,
					loading: false,
					data: eventObject.result,
				},function () {
					this.setState({
						default_image: this.state.data[1].plan_image.url,
						membership_levels: this.state.data[1].membership_levels,
						awards: this.state.data[1].membership_levels[1].awards,
					})
				}.bind(this))
			}
		}

		const obj = new MembershipRequestObject()
		obj.setUrlId(1)
		dispatch(
			createAction('memberships/loadMembershipPlans')({
				object: obj,
				callback
			})
		)
	}

	renderBenefitlistFlatListCell = ({ item }) => {

		return <BenefitCell
			navigation={this.props.navigation}
			name={item.voucher.name}
			image={item.voucher.icon_image.url}
			quantity={item.quantity}
		/>
	}

	_renderItem ({item, index}) {

		const { default_image } = this.state

		return (
			<View
				style={styles.cardviewView}>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						alignSelf: "center",
						top: 0,
						bottom: 0,
						justifyContent: "center",
					}}>
					<Image
						source={{uri: item.level_image.url ? item.level_image.url : default_image}}
						style={styles.membercardImage}/>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						position: "absolute",
						left: 20 * alpha,
						width: 128 * alpha,
						top: 18 * alpha,
						bottom: 10 * alpha,
						alignItems: "flex-start",
					}}>
					<Text
						style={styles.membershiptitleText}>{item.name}</Text>
					<View
						style={{
							flex: 1,
						}}/>
					<Text
						style={styles.exprangeText}>{item.experience_needed} {"<"} exp {"<"} {item.maximum_experience}</Text>
				</View>
			</View>
		);
	}

	get pagination () {
		const { activeSlide } = this.state;
		return (
			<Pagination
				dotsLength={this.state.membership_levels.length}
				activeDotIndex={activeSlide}
				containerStyle={{
					position: 'absolute',
					marginRight: 0 * alpha,
					marginLeft: 0 * alpha,
					marginTop: 135 * alpha,
				}}
				dotContainerStyle={{
					height: 3 * alpha,
					marginRight: 2 * alpha,
					marginLeft: 2 * alpha,
				}}
				dotStyle={{
					width: 12 * alpha,
					height: 1 * alpha,
					backgroundColor: 'rgba(129, 127, 127, 1)'
				}}
				inactiveDotStyle={{
					width: 4 * alpha,
					height: 1 * alpha,
					backgroundColor: 'rgba(219, 219, 219, 1)'
				}}
				inactiveDotOpacity={1}
				inactiveDotScale={1}
			/>
		);
	}

	render() {

		const { activeSlide } = this.state;

		return <View
			style={styles.membershipInfoView}>
			<View
				style={styles.headerView}>
				<Text
					style={styles.memberRightsText}>Member Benefits</Text>
			</View>
			<View
				style={styles.membercardcarouselView}>
				<Carousel
					ref={(c) => { this._carousel = c; }}
					data={this.state.membership_levels}
					renderItem={this._renderItem.bind(this)}
					inactiveSlideScale={1}
					inactiveSlideOpacity={1}
					sliderWidth={375 * alpha}
					itemWidth={340 * alpha}
					onSnapToItem={(index) => this.setState({
						activeSlide: index,
						awards: this.state.membership_levels[index].awards
					}) }
				/>
				{ this.pagination }

			</View>

			<View
				style={styles.benefitView}>
				<Text
					style={styles.benefitsText}>Benefits</Text>
				<View
					style={styles.benefitlistFlatListViewWrapper}>
					<FlatList
						renderItem={this.renderBenefitlistFlatListCell}
						data={this.state.awards}
						style={styles.benefitlistFlatList}
						keyExtractor={(item, index) => index.toString()}/>
				</View>
			</View>
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
	membershipInfoView: {
		backgroundColor: "white",
		flex: 1,
	},
	headerView: {
		backgroundColor: "white",
		height: 40 * alpha,
		justifyContent: "center",
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
		marginLeft: 28 * alpha,
	},
	membercardcarouselView: {
		backgroundColor: "transparent",
		height: 180 * alpha,
		alignItems: "center",
	},
	cardviewView: {
		backgroundColor: "transparent",
		width: 340 * alpha,
		height: 152 * alpha,
	},
	membercardImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: 320 * alpha,
		height: 152 * alpha,
	},
	membershiptitleText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	exprangeText: {
		backgroundColor: "transparent",
		color: "white",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 1,
	},
	benefitView: {
		backgroundColor: "transparent",
		flex: 1,
	},
	benefitsText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
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
		marginTop: 13 * alpha,
		marginBottom: 53 * alpha,
	},
	slideImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: "100%",
		height: 3 * alpha,
		marginBottom: 15 * alpha,
	},
})
