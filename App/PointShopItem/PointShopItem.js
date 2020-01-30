//
//  PointShopItem
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import React from "react"
import { commonStyles, TOAST_DURATION } from "../Common/common_style"
import { alpha, fontAlpha, windowWidth, windowHeight } from "../Common/size";
import PointProductsItemRequestObject from "../Requests/point_products_item_request_object"
import { createAction, toTitleCase } from "../Utils";
import { connect } from "react-redux";
import Toast, { DURATION } from 'react-native-easy-toast'
import HudLoading from "../Components/HudLoading"
import RedeemRequestObject from "../Requests/redeem_request_object"
import { TITLE_FONT, NON_TITLE_FONT } from '../Common/common_style';

@connect(({ members, shops }) => ({
	members: members.profile,
	selectedShop: shops.selectedShop
}))

export default class PointShopItem extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			headerTitle: <Text style={{ textAlign: 'center', alignSelf: "center", fontFamily: TITLE_FONT }}>{navigation.getParam("item_name", "")}</Text>,
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
			loading: false,
			data: [],
		}
	}

	componentDidMount() {
		this.loadPointsProducts()
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
	}


	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	loadPointsProducts() {
		const { dispatch } = this.props
		// this.setState({ loading: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					loading: false,
					data: eventObject.result
				})
			}
		}
		const obj = new PointProductsItemRequestObject()
		obj.setUrlId(this.props.navigation.getParam("item_id", ""))
		dispatch(
			createAction('point_products/loadPointProduct')({
				object: obj,
				callback,
			})
		)
	}

	loadRedeem() {
		const { dispatch, selectedShop } = this.props
		const { data } = this.state

		this.setState({ loading: true })
		const callback = eventObject => {
			this.setState({
				loading: false,
			})

			if (eventObject.success) {
				this.refs.toast.show(eventObject.message, TOAST_DURATION)
			} else {
				this.refs.toast.show(eventObject.message, TOAST_DURATION)
			}
		}
		const obj = new RedeemRequestObject(selectedShop.id)
		obj.setUrlId(data.id)
		dispatch(
			createAction('point_products/loadRedeem')({
				object: obj,
				callback,
			})
		)
	}

	render() {

		const { data } = this.state

		return <View
			style={styles.pointItemView}>
			<Image
				source={{ uri: data.image }}
				style={styles.productimageImage} />
			<View
				pointerEvents="box-none"
				style={{
					marginLeft: 13 * alpha,
					marginTop: 5 * alpha
				}}>

				<View
					pointerEvents="box-none"
					style={{

					}}>
					<Text
						style={styles.titleText}>{data.name} </Text>
					<Text
						style={styles.valueText}>{data.points}
						<Text
							style={styles.pointsText}> Points</Text></Text>
				</View>

				<View
					style={styles.viewThreeView}>
					<Text
						style={styles.titleTwoText}>Product Type</Text>
					<Text
						style={styles.pointsText}> - {toTitleCase(`${data.product_type}`)}</Text>
				</View>
				<View
					style={styles.viewFourView}>
					<Text
						style={styles.titleThreeText}>Valid Date</Text>
					<Text
						style={styles.pointsText}> - {data.expired_in} {data.expired_in_type} from date of purchase</Text>
				</View>
				<View
					style={styles.viewFiveView}>
					<Text
						style={styles.titleFourText}>Time of use</Text>
					<Text
						style={styles.pointsText}> - {toTitleCase(`${data.can_use_time}`)}</Text>
				</View>

			</View>

			<TouchableOpacity
				disabled={!data.can_purchase}
				onPress={() => this.loadRedeem()}
				style={data.can_purchase ? [styles.purchaseButton, commonStyles.normal] : [styles.purchaseButton, commonStyles.disabled]}
			>
				<Text
					style={styles.purchaseButtonText}>Purchase</Text>
			</TouchableOpacity>
			<Toast ref="toast" style={{ bottom: (windowHeight / 2) - 40 }} textStyle={{ fontFamily: TITLE_FONT, color: "#ffffff" }} />
			<HudLoading isLoading={this.state.loading} />
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
		fontFamily: TITLE_FONT,
		fontSize: 16 * fontAlpha,
	},
	navigationBarItemIcon: {
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
	pointItemView: {
		backgroundColor: "white",
		flex: 1,
	},
	productimageImage: {
		backgroundColor: "#f6f4f5",
		resizeMode: "contain",
		width: windowWidth,
		height: 250 * alpha,
	},
	viewView: {
		backgroundColor: "white",
		position: "absolute",
		left: 0,
		width: 375 * alpha,
		top: 0,
		height: 40 * alpha,
	},
	viewTwoView: {
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 50 * alpha,
	},
	titleText: {
		color: "black",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	valueText: {
		color: "rgb(0, 178, 227)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	pointsText: {
		color: "rgb(142, 142, 142)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",

	},
	viewThreeView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
		alignItems: "flex-start",
	},
	titleTwoText: {
		color: "black",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 5 * alpha,
	},
	pointsTwoText: {
		color: "black",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 1 * alpha,
	},
	viewFourView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
		alignItems: "flex-start",
	},
	titleThreeText: {
		color: "black",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 5 * alpha,
	},
	pointsThreeText: {
		color: "black",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 324 * alpha,
		height: 19 * alpha,
	},
	viewFiveView: {
		backgroundColor: "transparent",
		height: 50 * alpha,
		alignItems: "flex-start",
	},
	titleFourText: {
		color: "black",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 5 * alpha,
	},
	pointsFourText: {
		color: "black",
		fontFamily: NON_TITLE_FONT,
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 324 * alpha,
	},
	purchaseButton: {
		position: "absolute",
		bottom: 40 * alpha,
		left: 0,
		width: windowWidth,
		borderWidth: 0.5,
		borderColor: "rgb(215, 215, 215)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		height: 51 * alpha,
	},
	purchaseButtonText: {
		color: "white",
		fontFamily: NON_TITLE_FONT,
		fontSize: 15 * fontAlpha,
		fontStyle: "normal",

		textAlign: "right",
	},
	purchaseButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
})
