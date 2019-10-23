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
import GetMissionStatementRequestObject from "../Requests/get_mission_statement_request_object"
import { connect } from 'react-redux'
import { createAction, dispatch } from '../Utils/index'
import MissionCell from "./MissionCell"
import MissionCategoryCell from "./MissionCategoryCell"
import _ from 'lodash'

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
            mission_statements: [],
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

                var mission_categories = eventObject.result
                var missions = []
                for(var index in mission_categories) {
                    missions = missions.concat(mission_categories[index])
                    missions = missions.concat(mission_categories[index].missions)
                }

                this.setState({
                    missions: missions,
                }, function() {
                    this.loadMissionStatements()
                })     
            }

            this.setState({
                loading: false,
            })  
        }
        const obj = new MissionRequestObject()
        obj.setUrlId(1)
        dispatch(
            createAction('shops/loadMissions')({
                object:obj,
                callback,
            })
        )
    }

    loadMissionStatements(){
        const { dispatch } = this.props
        this.setState({ loading_list: true })
        const callback = eventObject => {
            console.log("MissionStatement", eventObject.result)
            if (eventObject.success) {
                this.setState({
                    mission_statements: eventObject.result,
                }, function(){
                    this.update_mission()
                })        
            }
            this.setState({
                loading: false,
            })
        }
        const obj = new GetMissionStatementRequestObject()
        dispatch(
            createAction('members/loadMissionStatements')({
                object:obj,
                callback,
            })
        )
    }

    update_mission() {

        console.log("Update Mission")
        let missions = [...this.state.missions]
        statements = this.state.mission_statements

        for (var index in missions) {
            console.log("mission ID", missions[index].id)
            var found_mission = _.find(statements, {mission_id:missions[index].id})
            console.log("Found",found_mission)
            if (found_mission != undefined) {
                missions[index].completed = true
            } else {
                missions[index].completed = false
            }
        }
        this.setState({
            missions
        })
    }

	renderMissionlistFlatListCell = ({ item }) => {
    
        if (item.clazz == "mission") {
            return <MissionCell
                item={item}
                title={item.name}
                point={item.points}
                completed={item.completed}
                vouchers={item.mission_vouchers}
                navigation={this.props.navigation}/>
        } else if (item.clazz == "mission_category") {
            return <MissionCategoryCell
                item={item}
                title={item.name}
                description={item.description}
                navigation={this.props.navigation}/>
        }
		
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
