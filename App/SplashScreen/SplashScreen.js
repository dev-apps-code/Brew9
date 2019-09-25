//
//  SplashScreen
//  Project
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Image, Text, StyleSheet } from "react-native"
import React from "react"
import {connect} from "react-redux"
import {createAction, Storage} from "../Utils"
import { NavigationActions, StackActions } from 'react-navigation'
import ProfileRequestObject from "../Requests/profile_request_object"

@connect(({ members }) => ({
	members: members
}))
export default class SplashScreen extends React.Component {

	timer = null

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
		this.state = {
			loading: false,
			members: []
		}
	}

	componentDidMount() {
		this.checkLoginStatus()
	}

	checkLoginStatus() {
		var members = Storage.secureGet("members")
		if (typeof members === 'undefined'|| members === null) {
			this.timer = setInterval(()=> this.loginPage(), 1000)
		}
		else {
			this.timer = setInterval(()=> this.mainPage(), 1000)
		}

		this.setState({
			members: members
		})
	}

	loginPage() {
		const resetAction = StackActions.reset({
			index: 0,
			key: null,
			actions: [NavigationActions.navigate({ routeName: 'TabGroupOne' })],
		});
		this.props.navigation.dispatch(resetAction);

	}

	// mainPage() {
	// 	const resetAction = StackActions.reset({
	// 		index: 0,
	// 		key: null,
	// 		actions: [NavigationActions.navigate({ routeName: 'TabGroupOne' })],
	// 	});
	// 	this.props.navigation.dispatch(resetAction);
	// }

	loadProfile(){
		const { dispatch, members } = this.props
		this.setState({ loading: true })
		const callback = eventObject => {
			if (eventObject.success) {
				this.setState({
					loading: false,
				})
			}
		}
		const obj = new ProfileRequestObject()
		obj.setUrlId(members.member_id)
		dispatch(
			createAction('members/loadProfile')({
				object:obj,
				callback,
			})
		)
	}

	render() {
	
		return <View
				style={styles.iphone8Copy13View}>
				<Text
					style={styles.welcomeToText}>Welcome to</Text>
				<View
					style={styles.groupView}>
					<Image
						source={require("./../../assets/images/group-3.png")}
						style={styles.group3Image}/>
					<View
						style={{
							flex: 1,
						}}/>
					<Image
						source={require("./../../assets/images/group-26.png")}
						style={styles.group26Image}/>
				</View>
				<View
					pointerEvents="box-none"
					style={{
						width: 268,
						height: 125,
						marginTop: 42,
					}}>
					<View
						style={styles.rectangleView}/>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							alignSelf: "center",
							width: 204,
							top: 12,
							height: 104,
							alignItems: "center",
						}}>
						<View
							style={styles.descriptionView}>
							<Text
								style={styles.grabYourDrinksWitText}>Grab your drinks{"\n"}with the tab of a button.</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.loremIpsumDolorSiText}>Lorem ipsum dolor sit amet, consecte{"\n"}tuer adipiscing elit sit amet, consecte.</Text>
						</View>
						<Image
							source={require("./../../assets/images/slide.png")}
							style={styles.slideImage}/>
					</View>
				</View>
				<View
					style={{
						flex: 1,
					}}/>
				<View
					style={styles.getStartedView}>
					<Text
						style={styles.getStartedText}>Get Started.</Text>
				</View>
				<View
					style={styles.logInView}>
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
							style={styles.iAlreadyHaveAnAcText}>I already have an account. </Text>
					</View>
					<View
						style={styles.lineView}/>
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	firstView: {
		backgroundColor: "white",
		flex: 1,
		alignItems: "center",
	},
	welcomeToText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica-Bold",
		fontSize: 30,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		marginLeft: 99,
		marginTop: 122,
	},
	groupView: {
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 50,
		height: 132,
		marginLeft: 160,
		marginTop: 18,
	},
	group3Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 98,
	},
	group26Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 23,
		marginLeft: 1,
		marginRight: 2,
	},
	rectangleView: {
		backgroundColor: "white",
		borderRadius: 4,
		shadowColor: "rgba(140, 140, 140, 0.5)",
		shadowRadius: 4,
		shadowOpacity: 1,
		position: "absolute",
		alignSelf: "center",
		width: 268,
		top: 0,
		height: 125,
	},
	descriptionView: {
		backgroundColor: "transparent",
		width: 204,
		height: 81,
	},
	grabYourDrinksWitText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica-Bold",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		marginRight: 1,
	},
	loremIpsumDolorSiText: {
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica-Light",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginBottom: 2,
	},
	slideImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 21,
		height: 5,
		marginTop: 18,
	},
	getStartedView: {
		backgroundColor: "transparent",
		borderRadius: 22,
		borderWidth: 1,
		borderColor: "rgba(0, 178, 227, 0.8)",
		borderStyle: "solid",
		width: 134,
		height: 44,
		marginBottom: 68,
		justifyContent: "center",
		alignItems: "center",
	},
	getStartedText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica-Bold",
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	logInView: {
		backgroundColor: "transparent",
		width: 163,
		height: 15,
		marginBottom: 32,
	},
	iAlreadyHaveAnAcText: {
		backgroundColor: "transparent",
		color: "rgb(54, 54, 54)",
		fontFamily: "Helvetica",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	lineView: {
		backgroundColor: "rgb(0, 178, 227)",
		position: "absolute",
		right: 1,
		width: 31,
		bottom: 1,
		height: 1,
	},
})
