//
//  PickUp
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { View, Image, StyleSheet } from "react-native"


export default class PickUp extends React.Component {

	static navigationOptions = ({ navigation }) => {
	
		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}
	}

	static tabBarItemOptions = ({ navigation }) => {
	
		return {
				tabBarLabel: "Pickup",
				tabBarIcon: ({ iconTintColor }) => {
				
					return <Image
							source={require("./../../assets/images/group-41-2.png")}/>
				},
			}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	render() {
	
		return <View
				style={styles.iphone8Copy2View}>
				<View
					style={styles.iphone8Copy2View}/>
			</View>
	}
}

const styles = StyleSheet.create({
	iphone8Copy2View: {
		backgroundColor: "white",
		width: 375,
		height: 667,
	},
})
