//
//  MemberWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {Image, View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator} from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import MissionRequestObject from '../Requests/mission_request_object'
import GetMissionStatementRequestObject from "../Requests/get_mission_statement_request_object"
import { connect } from 'react-redux'
import { createAction, dispatch } from '../Utils/index'
import MissionCell from "./MissionCell"
import MissionCategoryCell from "./MissionCategoryCell"
import _ from 'lodash'
import MissionRewardClaimRequestObject from "../Requests/mission_reward_claim_request_object";
import Toast, {DURATION} from 'react-native-easy-toast'
import { PRIMARY_COLOR, NON_TITLE_FONT, TITLE_FONT, TOAST_DURATION } from "../Common/common_style"

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

    loadProfile(){
		const { dispatch, currentMember } = this.props

		const callback = eventObject => {

		}
		const obj = new ProfileRequestObject()
		if (currentMember != null){
			obj.setUrlId(currentMember.id)
		}
		
		dispatch(
			createAction('members/loadProfile')({
				object:obj,
				callback,
			})
		)
    }
    
    loadMissions(){
        const { dispatch, selectedShop, company_id } = this.props
        this.setState({ loading: true })
        const callback = eventObject => {
            console.log(eventObject)
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

            // this.setState({
            //     loading: false,
            // })  
        }
        const obj = new MissionRequestObject()
        obj.setUrlId(company_id)
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

    missionRewardClaim = (statement_id) => {

        if (statement_id != undefined) {
            const { dispatch } = this.props
        
            this.setState({ loading: true })
            const callback = eventObject => {
                console.log(eventObject)
                this.refs.toast.show(eventObject.message, TOAST_DURATION)
                this.setState({
                    loading: false,
                    mission_statements: eventObject.result,
                }, function(){
                    this.loadMissionStatements()
                })
            }
            const obj = new MissionRewardClaimRequestObject()
            obj.setUrlId(statement_id)
            dispatch(
                createAction('members/missionRewardClaim')({
                    object:obj,
                    callback,
                })
            )
        }
    }

    update_claim(mission_statement) {

        if (mission_statement.clazz == "mission_statement") {
            let missions = [...this.state.missions]
            for (var index in missions) {
                
                if (mission_statement.mission_id == missions[index].id) {
                    missions[index].statement_id = mission_statement.id
                    missions[index].progress = mission_statement.task_progress
                    missions[index].status = mission_statement.status   
                }
            }
            this.setState({
                missions
            })
        }

        // this.loadProfile()
    }

    update_mission() {

        let missions = [...this.state.missions]
        statements = this.state.mission_statements

        for (var index in missions) {
            var found_mission = _.find(statements, {mission_id:missions[index].id})
            
            if (found_mission != undefined) {
                missions[index].statement_id = found_mission.id
                missions[index].progress = found_mission.task_progress
                missions[index].status = found_mission.status
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
                status={item.status}
                progress={item.progress}
                mission_type={item.mission_type}
                statement_id={item.statement_id}
                onStatusPressed={this.missionRewardClaim}
                mission_task_count={item.mission_task_count}
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
                {this.state.loading ? <View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" />
				</View> :
                <View
					style={styles.missionlistFlatListViewWrapper}>
					<FlatList
						renderItem={this.renderMissionlistFlatListCell}
						data={this.state.missions}
						style={styles.missionlistFlatList}
                        keyExtractor={(item, index) => index.toString()}/>
				</View>
                }
                <Toast ref="toast" position="center"/>
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
    container: {
		flex: 1,
		justifyContent: 'center',
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10 * alpha,
	},
    missionCenterView: {
        backgroundColor: "rgb(243, 243, 243)",
        flex: 1,
    },
})
