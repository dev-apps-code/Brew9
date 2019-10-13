//
//  MemberWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {Image, View, Text, StyleSheet, TouchableOpacity, FlatList} from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import MissionRequestObject from '../Requests/mission_request_object'
import { connect } from 'react-redux'
import { createAction, dispatch } from '../Utils/index'
import MissionCell from "./MissionCell"

@connect(({ members }) => ({
    currentMember: members.profile,
	company_id: members.company_id,
	location: members.location,
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
        this.state = {
            loading: false,
            missions: [],
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onBackPressed: this.onBackPressed,
        })
        this.loadMissions()
    }

    onBackPressed = () => {

        this.props.navigation.goBack()
    }

    loadMissions(){
        const { dispatch, selectedShop } = this.props
        this.setState({ loading: true })
        const callback = eventObject => {
            if (eventObject.success) {
                this.setState({
                    missions: eventObject.result,
                })     
            }
            this.setState({
                loading: false,
            })  
        }
        const obj = new MissionRequestObject(1)
        obj.setUrlId(1)
        dispatch(
            createAction('shops/loadMissions')({
                object:obj,
                callback,
            })
        )
    }

	renderMissionlistFlatListCell = ({ item }) => {
	
		return <MissionCell
            item={item}
            title={item.name}
            point={item.points}
				navigation={this.props.navigation}/>
    }
    
    render() {

        return <View
            style={styles.missionCenterView}>
                <View
					style={styles.missionlistFlatListViewWrapper}>
					<FlatList
						renderItem={this.renderMissionlistFlatListCell}
						data={this.state.missions}
						style={styles.missionlistFlatList}
                        keyExtractor={(item, index) => index.toString()}/>
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
    missionCenterView: {
        backgroundColor: "rgb(243, 243, 243)",
        flex: 1,
    },
})
