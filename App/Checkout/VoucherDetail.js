//
//  Page1Copy8
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size"
import { connect } from "react-redux";
import {KURL_INFO} from "../Utils/server";
@connect(({ members }) => ({
	currentMember: members.profile,
	members:members,
	company_id: members.company_id,
}))
export default class VoucherDetail extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Voucher Detail",
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
			item: this.props.navigation.getParam("item",null),
			valid : this.props.navigation.getParam("valid", false) 
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

	onTermsPressed = () => {
		const { navigate } = this.props.navigation
		const { company_id } = this.props

		navigate("WebCommon", {
			title: 'Terms & Condition',
			web_url: KURL_INFO + '?page=voucher_terms&id=' + company_id,
		})
	}

	onUsePessed = () => {
		const addVoucherAction = this.props.navigation.getParam("addVoucherAction", false) 		
		this.props.navigation.pop(2)		
		addVoucherAction(this.state.item)
	}

	renderPrice(){

		const { members } = this.props
		const {item} = this.state
		const display_value = item.voucher.display_value
		const discount_type = item.voucher.discount_type
		const discount_price = item.voucher.discount_price
		if (display_value != null  && display_value !==''){

			return (
				<View
				style={styles.valueView}>
					<Text
						style={styles.currencyText}>{members.currency}</Text> 			
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
						<Text
							style={styles.valueText}>{display_value}</Text>
					</View>
				</View>
			)
		}else if (discount_type != null && discount_type != '' && discount_price != null && discount_price != ''){
			if (discount_type == 'fixed'){
				return (
					<View
					style={styles.valueView}>
						<Text
							style={styles.currencyText}>{members.currency}</Text> 			
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
							<Text
								style={styles.valueText}>{discount_price}</Text>
						</View>
					</View>
				)
			}else {

				return (
					<View
					style={styles.valueView}>
					 			
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
							<Text
								style={styles.percentvalueText}>{discount_price}</Text>
							<Text
								style={styles.percentText}>%</Text> 
						</View>
					</View>
				)
			}
		}
	}

	render() {

		const { members } = this.props
		const {item} = this.state
		return <View
				style={styles.voucherDetailView}>
				<ScrollView
					style={styles.scrollviewScrollView}>
					<View
						style={styles.voucherView}>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0 * alpha,
								right: 0 * alpha,
								top: 0 * alpha,
								bottom: 0 * alpha,
								justifyContent: "center",
							}}>
							<View
								style={styles.cellcontentView}>
								<Image
									source={require("./../../assets/images/group-5-3.png")}
									style={styles.backgroundImage}/>
								<View
									pointerEvents="box-none"
									style={{
										position: "absolute",
										left: 30 * alpha,
										right: 31 * alpha,
										top: 23 * alpha,
										bottom: 11 * alpha,
									}}>
									<View
										pointerEvents="box-none"
										style={{
											height: 31 * alpha,
											marginRight: 1 * alpha,
											flexDirection: "row",
											alignItems: "flex-start",
										}}>
										<Text
											style={styles.titleText}>{item.voucher.name}</Text>
										<View
											style={{
												flex: 1,
											}}/>
											{this.renderPrice()}
									</View>
									<Text
										style={styles.descriptionText}>{item.voucher.description}</Text>
									<Image
										source={require("./../../assets/images/line-16-copy-5.png")}
										style={styles.lineImage}/>
									<View
										style={{
											flex: 1,
										}}/>
									<View
										pointerEvents="box-none"
										style={{
											height: 14 * alpha,
											flexDirection: "row",
											alignItems: "flex-end",
										}}>
										<Text
											style={styles.dateText}>{item.available_date}</Text>
										<View
											style={{
												flex: 1,
											}}/>
										<View
											style={styles.termsView}>
											<TouchableOpacity
												onPress={this.onTermsPressed}
												style={styles.termsButton}>
												<Text
													style={styles.termsButtonText}>Terms & Conditions</Text>
											</TouchableOpacity>
											<Image
												source={require("./../../assets/images/group-18.png")}
												style={styles.arrowImage}/>
										</View>
									</View>
								</View>
							</View>
						</View>
						{/* <View
							style={styles.rm10Copy2View}>
							<Text
								style={styles.textText}>%</Text>
							<View
								pointerEvents="box-none"
								style={{
									position: "absolute",
									left: 0 * alpha,
									right: 0 * alpha,
									top: 0 * alpha,
									bottom: 0 * alpha,
									justifyContent: "center",
								}}>
								<Text
									style={styles.textTwoText}>10</Text>
							</View>
						</View> */}
					</View>
					<View
						style={styles.detailsView}>
						<View
							style={styles.conditionsView}>
							<Text
								style={styles.titleTwoText}>Voucher Limitation</Text>
							{/* <Text
								style={styles.usableshopText}>Shop</Text>
							<Text
								style={styles.usableshopcontentText}>- Usable on all Brew9 Shop in Brunei</Text> */}
							<Text
								style={styles.usabletimeText}>Time</Text>
							<Text
								style={styles.usabletimecontentText}>- {item.voucher.when_use}</Text>
							{/* <Text
								style={styles.usableitemText}>Applicable Items</Text>
							<Text
								style={styles.usableitemcontentText}>- All Hot Drinks</Text> */}
							{ (item.voucher.how_to_use != null && item.voucher.how_to_use != '') ? 
							<View> 
								<Text style={styles.usablescenarioText}>How to Use</Text>
								<Text style={styles.usablescenariocontentText}> 
									{item.voucher.how_to_use}
								</Text>
								</View>
							: undefined}	
							{ (item.voucher.terms != null && item.voucher.terms != '') ?
								<View> 
									<Text style={styles.usablescenarioText}>
										Terms and Conditions
									</Text>
									<Text style={styles.usablescenariocontentText}>
										{item.voucher.terms}
									</Text>
								</View>
							: undefined}								
						</View>
					</View>
				</ScrollView>
				{ this.state.valid ? 
					<TouchableOpacity
					onPress={this.onUsePessed}
					style={styles.useButton}>
					<Text
						style={styles.useButtonText}>Apply Voucher</Text>
				</TouchableOpacity>
				: undefined}
			
			</View>
	}
}


const styles = StyleSheet.create({
	headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
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
		resizeMode: "contain",
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
	currencyText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "ClanPro-Thin",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		top: 6 * alpha,
	},
	valueText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 24 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 16 * alpha,
	},
	percentText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "ClanPro-Thin",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		right: 0,
		top: 16 * alpha,
	},
	percentvalueText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 24 * alpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 15 * alpha,
	},
	voucherDetailView: {
		backgroundColor: "white",
		flex: 1,
	},
	scrollviewScrollView: {
		backgroundColor: "white",
		flex: 1,
		marginBottom: 68 * alpha,
	},
	voucherView: {
		backgroundColor: "rgb(243, 243, 243)",
		height: 143 * alpha,
	},
	cellcontentView: {
		backgroundColor: "transparent",
		height: 125 * alpha,
	},
	backgroundImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		shadowColor: "rgba(224, 222, 222, 0.5)",
		shadowRadius: 2,
		width: 348 * alpha,
		shadowOpacity: 1,
		position: "absolute",
		left: 14 * alpha,
		right: 14 * alpha,
		top: 0 * alpha,
		bottom: 0 * alpha,
	},
	titleText: {
		color: "rgb(68, 68, 68)",
		fontFamily: "ClanPro-Thin",
		fontSize: 16 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 1 * alpha,
	},
	valueView: {
		backgroundColor: "transparent",
		width: 40 * alpha,
		height: 31 * alpha,
	},
	currenrcyText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "ClanPro-Book",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0 * alpha,
		top: 6 * alpha,
	},
	valueText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 24 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginLeft: 14 * alpha,
	},
	descriptionText: {
		color: "rgb(124, 124, 124)",
		fontFamily: "ClanPro-Book",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
	},
	lineImage: {
		resizeMode: "cover",
		backgroundColor: "transparent",
		width: null,
		height: 2 * alpha,
		marginTop: 20 * alpha,
	},
	dateText: {
		color: "rgb(149, 148, 148)",
		fontFamily: "DINPro-Medium",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginBottom: 1 * alpha,
	},
	termsView: {
		backgroundColor: "transparent",
		width: 118 * alpha,
		height: 13 * alpha,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	termsButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 95 * alpha,
		height: 12 * alpha,
		marginRight: 4 * alpha,
	},
	termsButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	termsButtonText: {
		color: "rgb(136, 133, 133)",
		fontFamily: "ClanPro-Thin",
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	arrowImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		flex: 1,
		alignSelf: "flex-end",
		height: 7 * alpha,
		marginLeft: 4 * alpha,
		marginBottom: 2 * alpha,
	},
	rm10Copy2View: {
		backgroundColor: "transparent",
		position: "absolute",
		right: 59 * alpha,
		width: 35 * alpha,
		top: 4 * alpha,
		height: 31 * alpha,
	},
	textText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "ClanPro-Book",
		fontSize: 9 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		position: "absolute",
		right: 0 * alpha,
		top: 16 * alpha,
	},
	textTwoText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "DINPro-Medium",
		fontSize: 24 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 9 * alpha,
	},
	detailsView: {
		backgroundColor: "transparent",
		flex: 1,
		height: "100%",
	},
	conditionsView: {
		backgroundColor: "transparent",
		flex: 1,
		marginLeft: 20 * alpha,
		marginRight: 23 * alpha,
		marginTop: 25 * alpha,
		alignItems: "flex-start",
	},
	titleTwoText: {
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Medium",
		fontSize: 14 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	usableshopText: {
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 13 * alpha,
	},
	usableshopcontentText: {
		backgroundColor: "transparent",
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	usabletimeText: {
		backgroundColor: "transparent",
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 328 * alpha,
		marginTop: 18 * alpha,
	},
	usabletimecontentText: {
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 332 * alpha,
	},
	usableitemText: {
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 332 * alpha,
		marginTop: 14 * alpha,
	},
	usableitemcontentText: {
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 332 * alpha,
		marginTop: 1 * alpha,
	},
	usablescenarioText: {
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 332 * alpha,
		marginTop: 16 * alpha,
	},
	usablescenariocontentText: {
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		width: 328 * alpha,
	},
	usableconditionText: {
		backgroundColor: "transparent",
		color: "rgb(61, 61, 61)",
		fontFamily: "DINPro-Medium",
		fontSize: 13 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginTop: 21 * alpha,
	},
	usableconditioncontentText: {
		backgroundColor: "transparent",
		color: "rgb(151, 151, 151)",
		fontFamily: "DINPro-Medium",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		width: 328 * alpha,
		marginTop: 1 * alpha,
	},
	useButton: {
		backgroundColor: "rgb(0, 178, 227)",
		borderRadius: 4,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		position: "absolute",
		alignSelf: "center",
		width: 321 * alpha,
		bottom: 30 * alpha,
		height: 41 * alpha,
	},
	useButtonImage: {
		resizeMode: "contain",
		marginRight: 10 * alpha,
	},
	useButtonText: {
		color: "white",
		fontFamily: "ClanPro-Book",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
})