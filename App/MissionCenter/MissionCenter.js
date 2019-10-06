//
//  MemberWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {Image, View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import {connect} from "react-redux";
import {KURL_INFO} from "../Utils/server";

@connect(({ members }) => ({
    members: members.profile
}))
export default class MissionCenter extends React.Component {

    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state
        return {
            title: "Mission Center",
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

    render() {

        return <View
            style={styles.missionCenterView}>
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
    missionCenterView: {
        backgroundColor: "rgb(243, 243, 243)",
        flex: 1,
    },
})
