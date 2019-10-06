//
//  Home
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Text, StyleSheet, Image, TouchableOpacity, View , ScrollView } from "react-native"
import React from "react"
import { alpha, windowWidth } from "../Common/size"
import AutoHeightImage from 'react-native-auto-height-image'

export default class BannerView extends React.Component {

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

    componentDidUpdate() {

    }

    onBackPressed = () => {

        this.props.navigation.goBack()
    }

    render() {

        var image = this.props.navigation.getParam("image_url", "")

        return <ScrollView
            style={styles.page1View}>
            <AutoHeightImage
                source={{uri: image}}
                width={windowWidth}
                style={styles.bannerImage}/>
        </ScrollView>
    }
}

const styles = StyleSheet.create({
    navigationBarItemIcon: {
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "rgb(0, 194, 236)",
	},
    headerLeftContainer: {
        flexDirection: "row",
        marginLeft: 8 * alpha,
        width: 70 * alpha,
    },
    navigationBarItem: {
        width: "100%"
    },
    page1View: {
        backgroundColor: "rgb(243, 243, 243)",
        flex: 1,
    },
    bannerImage: {
        resizeMode: "contain",
    }
})


