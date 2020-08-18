//
//  OrderReview
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, TextInput, ImageBackground } from "react-native"
import { alpha, fontAlpha, windowWidth, windowHeight, navbarHeight } from "../Common/size";
import { TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR, LIGHT_GREY, TOAST_DURATION } from "../Common/common_style";
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import MakeOrderReviewObj from "../Requests/make_order_review_request_object"
import { createAction, Storage } from "../Utils"
import { connect } from "react-redux";
import Toast, { DURATION } from 'react-native-easy-toast'
import Brew9Toast from '../Components/Brew9Toast';


@connect(({ shops }) => ({

}))
export default class OrderReview extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			headerTitle: <Text style={{ textAlign: 'center', alignSelf: "center", fontFamily: TITLE_FONT }}>Review</Text>,
			headerTintColor: "black",
			headerLeft: <View
				style={styles.headerLeftContainer}>
				<TouchableOpacity
					onPress={params.onBackPressed ? params.onBackPressed : () => null}
					style={styles.navigationBarItem}>
					<Image
						source={require("./../../assets/images/back.png")}
						style={styles.navigationBarItemIcon} />
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
			order: this.props.navigation.getParam("order"),
			satisfactionLevel: '',
			showComment: false,
			commentSelected: false,
			comment: '',
			rating: null,
			imageReview: [],
			rateLevel: [
				{
					name: 'Terrible',
					index: 1,
					selected: false
				},
				{
					name: 'Bad',
					index: 2,
					selected: false

				},
				{
					name: 'Okay',
					index: 3,
					selected: false

				},
				{
					name: 'Good',
					index: 4,
					selected: false

				},
				{
					name: 'Excellent',
					index: 5,
					selected: false

				},
			],
			commentList: [
				{
					name: 'Cleanlines',
					selected: false
				},
				{
					name: 'Quality',
					selected: false
				},
				{
					name: 'Staff',
					selected: false
				},
				{
					name: 'Services',
					selected: false
				},

			]
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

	onRate = (rate) => {
		let { rateLevel } = this.state
		let tempRateLevel = rateLevel.map(item => {
			if (item.index <= rate.index) {
				item.selected = true
			} else {
				item.selected = false
			}
			return item
		})
		this.setState({
			rateLevel: tempRateLevel,
			satisfactionLevel: rate.name,
			rating: rate.index,
			showComment: true
		})
	}
	onChangeText = (text) => {
		this.setState({ comment: text })
	}
	getPermissionAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		if (status !== 'granted') {
			return false
		}
		return true

	}
	_pickImage = async () => {
		let image = this.state.imageReview
		var get_permission = await this.getPermissionAsync()

		if (get_permission) {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
			});

			if (!result.cancelled) {

				let data = {
					uri: result.uri,
					name: Math.random().toString(36).substr(2, 5) + 'avatar.jpg',
					type: 'image/jpg'
				}
				image.push(data)

				this.setState({
					imageReview: image
				})
			}
		} else {
			this.refs.toast.show("Please enable camera roll permission in settings.", TOAST_DURATION)
		}
	}
	onDeleteImage = (index) => {
		let { imageReview } = this.state
		imageReview.splice(index, 1)
		this.setState({ imageReview })
	}
	onSelectComment = (comment) => {
		let { commentList } = this.state
		let temCommentList = commentList.map(item => {
			if (item.name == comment.name) {
				item.selected = !item.selected
			}
			return item
		})
		this.setState({
			commentList: temCommentList,
			commentSelected: true
		})
	}
	onSubmitReview = () => {
		const { dispatch } = this.props
		let { comment, rating, commentList, imageReview, order } = this.state

		let selectedTopic = []
		commentList.forEach(item => {
			if (item.selected == true) {
				selectedTopic.push(item.name)
			}
		})
		let order_id = order.id
		let remark = comment
		let topic = selectedTopic.toString()
		let image = []
		const callback = eventObject => {
			if (eventObject.success) {
				this.refs.toast.show("Successfully add review!", TOAST_DURATION)

			} else {
				this.refs.toast.show(eventObject.message, TOAST_DURATION)
			}

		}
		const obj = new MakeOrderReviewObj(order_id, rating, remark, topic, image)
		dispatch(
			createAction('shops/loadReview')({
				object: obj,
				callback,
			})
		)
	}

	renderCommentSection = () => {
		let { commentList } = this.state
		let commentSelected = commentList.filter(item => { return item.selected == true })
		return (
			<View>
				<View style={styles.commentSection}>
					<FlatList
						keyExtractor={(commentList, index) => `${index}`}
						data={commentList}
						extraData={commentList}
						renderItem={({ item }) => {
							return (
								<TouchableOpacity style={item.selected ? styles.selectedcommentButton : styles.commentButton} onPress={() => this.onSelectComment(item)} >
									<Text style={item.selected ? styles.selectedcommentText : styles.commentText}>{item.name}</Text>
								</TouchableOpacity>
							)
						}

						}
						numColumns={3}
						key={'THREE COLUMN'}
					/>
				</View>

				{commentSelected.length > 0 ? <View style={styles.extraCommentSection}>
					<TextInput
						onChangeText={text => this.onChangeText(text)}
						placeholder="Tell us more"
						maxLength={200}
						numberOfLines={5}
						multiline={true}
						style={{ height: 100 * alpha }}

					/>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
						<View style={{ minHeight: 90 * alpha, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
							{this.state.imageReview.map((item, index) => {
								return (
									// <View >
									<ImageBackground source={{ uri: item.uri }} key={index} style={styles.imageContent} >

										<TouchableOpacity style={styles.closeIconButton} onPress={() => { this.onDeleteImage(index) }}>
											<Image
												source={require("./../../assets/images/x-3.png")}
												style={styles.closeIcon} />
										</TouchableOpacity>
									</ImageBackground >

									// </View>

								)
							})}
						</View>

						{this.state.imageReview.length < 3 ? <TouchableOpacity
							onPress={this._pickImage}
							style={styles.addIconButton}>
							<Image
								source={require("./../../assets/images/camera.png")}
								style={styles.addIcon} />
							<Text style={styles.uploadText}>Upload photo</Text>

						</TouchableOpacity> : undefined}
					</View>

				</View> :
					<TextInput
						onChangeText={text => this.onChangeText(text)}
						placeholder="Tell us more"
						maxLength={200}
						numberOfLines={5}
						multiline={true}
						style={styles.extraCommentSection}

					/>}

			</View>
		)
	}

	render() {
		let { order, satisfactionLevel, showComment } = this.state
		return <View
			style={styles.orderReviewView}>
			<ScrollView
				style={styles.reviewScrollView}>
				<View
					style={styles.satisfactionLevelView}>

					<View style={styles.headerSatisfactionLevelView}>
						<Text
							style={styles.titleText}>{order.shop.name}</Text>
						<Text
							style={styles.titleText1}>{order.payment_time}</Text>
					</View>

					<View
						style={styles.lineView} />

					<View style={styles.bodySatisfactionLevelView}>
						<Text
							style={[styles.rateText, { color: showComment ? PRIMARY_COLOR : LIGHT_GREY }]}>{satisfactionLevel ? satisfactionLevel : "My Satisfaction Level"}</Text>
						<View style={styles.rateView}>
							<FlatList
								data={this.state.rateLevel}
								renderItem={({ item }) => (
									<TouchableOpacity onPress={() => { this.onRate(item) }} style={styles.rateWrapper}>
										<Image
											source={require("./../../assets/images/emoticon1.png")}
											style={item.selected ? styles.selectedRateIcon : styles.rateIcon} />
									</TouchableOpacity>
								)}
								keyExtractor={(item, index) => `${index}`}
								horizontal
							/>

						</View>
					</View>
					{showComment && this.renderCommentSection()}


				</View>


				{/* <View
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
					</View> */}
				{/* </View> */}
				{/* <View
					style={styles.commentView}>
					<View
						style={styles.avatarView} />
					<Text
						style={styles.nameText}>Somebody</Text>
					<View
						style={{
							flex: 1,
						}} />
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
								}} />
							<Text
								style={styles.dateText}>2019-06-21 13:56</Text>
						</View>
						<Text
							style={styles.messageText}>“Lorem ipsum dolor sit amet, consectetuer {"\n"}adipiscing elit, Lorem ipsum dolor sit amet, {"\n"}consectetuer adipiscing elit,  ”</Text>
					</View>
				</View> */}
			</ScrollView>
			<TouchableOpacity
				disabled={!showComment}
				style={[styles.submitButton, showComment ? styles.normal : styles.disabled]}
				onPress={showComment ? this.onSubmitReview : console.log('undefined')}>
				<Text style={styles.submitText}>SUBMIT</Text>
			</TouchableOpacity>
			<Brew9Toast ref="toast" />

		</View>
	}
}

const styles = StyleSheet.create({
	normal: {
		backgroundColor: "rgb(0, 178, 227)",
	},
	disabled: {
		backgroundColor: "rgba(0, 178, 227, 0.3)",
	},
	submitButton: {
		// flex: 1,
		marginBottom: 20 * alpha,
		marginVertical: 10 * alpha,
		marginHorizontal: 20 * alpha,
		paddingVertical: 10 * alpha,
		backgroundColor: PRIMARY_COLOR,
		justifyContent: 'center',
		alignItems: 'center'
	},
	submitText: {
		fontSize: 16 * fontAlpha,
		color: 'white',
		textAlign: 'center',
	},
	imageContent: {
		width: 90 * alpha,
		height: 90 * alpha,
		borderRadius: 20 * alpha,
		borderColor: LIGHT_GREY,
		borderWidth: 1,
		marginHorizontal: 5 * alpha
	},
	closeIconButton: {
		top: 2 * alpha,
		right: 2 * alpha,
		position: 'absolute',
		borderRadius: 10 * alpha,
		borderColor: 'white',
		borderWidth: 1,
		width: 20 * alpha,
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black'
	},
	closeIcon: {
		width: 10 * alpha,
		aspectRatio: 1,
		tintColor: 'white',
	},
	rateView: {
		marginHorizontal: 10 * alpha,
		width: windowWidth - 50 * alpha,
	},
	rateWrapper: {
		backgroundColor: 'transparent',
		width: (windowWidth - 100 * alpha) / 5,
		aspectRatio: 1,
		marginHorizontal: 2 * alpha,
		alignItems: 'center'
	},
	rateIcon: {
		width: 30 * alpha,
		height: 30 * alpha,
		tintColor: LIGHT_GREY,
	},
	selectedRateIcon: {
		width: 30 * alpha,
		height: 30 * alpha,
		tintColor: PRIMARY_COLOR,
	},
	commentSection: {
		// width: windowWidth / 2,
		backgroundColor: 'transparent',
		marginBottom: 20 * alpha,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// marginHorizontal: 10 * alpha
	},
	extraCommentSection: {
		marginHorizontal: 10 * alpha,
		paddingVertical: 10 * alpha,
		paddingHorizontal: 10 * alpha,
		backgroundColor: "#f5f5f5",
		flex: 1
	},
	addIconButton: {
		width: 90 * alpha,
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'red'
		borderRadius: 10 * alpha,
		borderColor: LIGHT_GREY,
		borderWidth: 1
	},
	addIcon: {
		width: 50 * alpha,
		height: 50 * alpha,
		tintColor: LIGHT_GREY,
	},
	uploadText: {
		fontSize: 12 * fontAlpha,
		color: LIGHT_GREY,
		textAlign: 'center'
	},
	commentButton: {
		width: 90 * alpha,
		paddingVertical: 5 * alpha,
		paddingHorizontal: 10 * alpha,
		borderWidth: 0.5,
		borderColor: LIGHT_GREY,
		margin: 5 * alpha,
		alignItems: 'center'
	},
	selectedcommentButton: {
		width: 90 * alpha,
		paddingVertical: 5 * alpha,
		paddingHorizontal: 10 * alpha,
		borderWidth: 1,
		borderColor: PRIMARY_COLOR,
		margin: 5 * alpha,
		alignItems: 'center'

	},
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
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
	},
	navigationBarItemIcon: {
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
	orderReviewView: {
		// backgroundColor: "white",
		flex: 1,
	},
	reviewScrollView: {
		backgroundColor: "rgb(248, 248, 248)",
		// height: 733 * alpha,
	},
	satisfactionLevelView: {
		backgroundColor: "white",
		borderRadius: 5 * alpha,
		// height: 234 * alpha,
		marginLeft: 14 * alpha,
		marginRight: 14 * alpha,
		marginTop: 14 * alpha,
		padding: 10 * alpha
	},
	headerSatisfactionLevelView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10 * alpha,
		paddingHorizontal: 5 * alpha

	},
	bodySatisfactionLevelView: {
		marginVertical: 20 * alpha,
	},
	rateText: {
		backgroundColor: "transparent",
		// color: "rgb(158, 157, 157)",
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		textAlign: "center",
		alignSelf: "center",
		paddingVertical: 10 * alpha
	},
	titleText: {
		backgroundColor: "transparent",
		// color: "rgb(158, 157, 157)",
		fontFamily: TITLE_FONT,
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
		alignSelf: "center",
	},
	titleText1: {
		backgroundColor: "transparent",
		color: "rgb(158, 157, 157)",
		fontFamily: TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		textAlign: "left",
		alignSelf: "center",
	},
	lineView: {
		backgroundColor: "rgb(245, 245, 245)",
		height: 1 * alpha,
		marginLeft: 1 * alpha,
		marginTop: 10 * alpha,
	},
	commentText: {
		backgroundColor: "transparent",
		color: LIGHT_GREY,
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		// marginRight: 18 * alpha,
	},
	selectedcommentText: {
		backgroundColor: "transparent",
		color: PRIMARY_COLOR,
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		// marginRight: 18 * alpha,
	},
	satisfactionText: {
		color: "rgb(158, 157, 157)",
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: NON_TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",

		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 15 * alpha,
		marginTop: 24 * alpha,
	},
	levelText: {
		color: "rgb(158, 157, 157)",
		fontFamily: NON_TITLE_FONT,
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
		fontFamily: NON_TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",

		textAlign: "left",
	},
	dateText: {
		backgroundColor: "transparent",
		color: "rgb(200, 200, 200)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 2 * alpha,
	},
	messageText: {
		backgroundColor: "transparent",
		color: "rgb(158, 157, 157)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 1 * alpha,
		marginRight: 14 * alpha,
		marginTop: 18 * alpha,
	},
})
