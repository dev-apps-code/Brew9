//
//  Map
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Image, Text, StyleSheet, TouchableOpacity, Platform } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import MapView from 'react-native-maps';
import openMap from 'react-native-open-maps';

export default class DirectionMap extends React.Component {

	static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
			title: "Location",
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
			shop: this.props.navigation.getParam("shop", null),
		}
	}

	componentDidMount() {
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
		})
	}

	onBackPressed = () => {

		this.props.navigation.goBack()
	}

	onDirectionPressed() {

		const { shop } = this.state

		let latitude = shop ? parseFloat(shop.latitude) : 0.0
		let longitude = shop ? parseFloat(shop.longitude) : 0.0

		openMap({ latitude: latitude, longitude: longitude });
	}

	

	render() {
	
		const {shop} = this.state

		return <View
				style={styles.mapView}>
				<MapView
					style={styles.mapImage}
					initialRegion={{
						latitude: shop ? parseFloat(shop.latitude) : 0.0,
						longitude: shop ? parseFloat(shop.longitude) : 0.0,
						latitudeDelta:0.1,
						longitudeDelta:0.1,
					  }}					
					  onMapReady={() => this.marker && this.marker.showCallout && this.marker.showCallout()}			  
					  >
						     <MapView.Marker
								ref={marker => (this.marker = marker)}
								coordinate={{
									latitude: shop ? parseFloat(shop.latitude) : 0.0,
									longitude: shop ? parseFloat(shop.longitude) : 0.0,
								}
								}
								title={shop.name}
								description={shop.location}
								/>
						  </MapView>
				<View
					style={styles.branchView}>
					<View
						style={styles.addressView}>
						<Text
							style={styles.nameText}>{shop.name}</Text>
						<Text
							style={styles.addressText}>{shop.address}</Text>
					</View>
					<View
						style={{
							flex: 1,
						}}/>
					<TouchableOpacity
						onPress={() => this.onDirectionPressed()}
						style={styles.directionButton}>
						<Image
							source={require("./../../assets/images/direction-arrow.png")}
							style={styles.directionButtonImage}/>
					</TouchableOpacity>
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
	mapView: {
		backgroundColor: "white",
		flex: 1,
	},
	mapImage: {
		backgroundColor: "transparent",
		flex: 1,
		width: null,
	},
	branchView: {
		backgroundColor: "transparent",
		height: 68 * alpha,
		marginBottom: 33 * alpha,
		flexDirection: "row",
		alignItems: "center",
	},
	addressView: {
		backgroundColor: "transparent",
		width: 292 * alpha,
		height: 38 * alpha,
		marginLeft: 10 * alpha,
		alignItems: "flex-start",
	},
	nameText: {
		color: "black",
		fontFamily: "Helvetica",
		fontSize: 18 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	addressText: {
		color: "rgb(151, 151, 151)",
		fontFamily: "Helvetica",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginTop: 2 * alpha,
	},
	directionButtonImage: {
		resizeMode: "contain",
		width: 50 * alpha,
		height: 50 * alpha,
	},
	directionButton: {
		backgroundColor: "transparent",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 50 * alpha,
		height: 50 * alpha,
		marginRight: 10 * alpha,
	},
	directionButtonText: {
		color: "black",
		fontFamily: ".SFNSText",
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
})
