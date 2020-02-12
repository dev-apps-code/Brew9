//
//  MemberWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Image, View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, AppState } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowHeight } from "../Common/size";
import MissionRequestObject from '../Requests/mission_request_object'
import GetMissionStatementRequestObject from "../Requests/get_mission_statement_request_object"
import { connect } from 'react-redux'
import { createAction, dispatch } from '../Utils/index'
import MissionCell from "./MissionCell"
import MissionCategoryCell from "./MissionCategoryCell"
import _ from 'lodash'
import MissionRewardClaimRequestObject from "../Requests/mission_reward_claim_request_object";
import MissionLoginRequestObject from "../Requests/mission_login_request_object"
import Toast, { DURATION } from 'react-native-easy-toast'
import { TITLE_FONT, NON_TITLE_FONT, TABBAR_INACTIVE_TINT_CROWN, TABBAR_ACTIVE_TINT, PRIMARY_COLOR, RED, LIGHT_BLUE_BACKGROUND, TOAST_DURATION } from "../Common/common_style";
import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from "../Common/config"
import MissionBadgeIcon from "./MissionBadgeIcon"

@connect(({ members }) => ({
    currentMember: members.profile,
    company_id: members.company_id,
    location: members.location,
}))
export default class MissionCenter extends React.Component {

    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state
        return {
            headerTitle: <Text style={{ textAlign: 'center', alignSelf: "center", fontFamily: TITLE_FONT }}>Rewards</Text>,
            headerTintColor: "black",
            headerLeft: <View
                style={styles.headerLeftContainer}>

            </View>,
            headerRight: null,
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0
            },
        }
    }

    static tabBarItemOptions = (navigation, store) => {

        return {
            tabBarLabel: "Rewards",
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                const analytics = new Analytics(ANALYTICS_ID)
                analytics.event(new Event('Profile', 'Click', "Mission Center"))
                store.dispatch(createAction("config/setToggleShopLocation")(false))
                store.dispatch(createAction("config/setTab")("mission"))
                defaultHandler()
            },
            tabBarIcon: ({ iconTintColor, focused }) => {
                const image = focused
                    ? require('./../../assets/images/reward_selected_tab.png')
                    : require('./../../assets/images/reward_tab.png')

                return <View style={styles.tabIconWrapper}>

                    <MissionBadgeIcon image={image} focused={focused} />

                </View>
            },
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            missions: [],
            mission_statements: [],
            updated: false,
            isRefreshing: false,
            timestamp: undefined,
            appState: AppState.currentState,
        }
    }

    componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
    }
    
    _handleAppStateChange = nextAppState => {
		const { currentMember } = this.props
		if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
			if (currentMember != null) {
				this.loadMissionStatements()
			}
		}
		this.setState({ appState: nextAppState });
    };
    
    componentDidMount() {
        this.props.navigation.setParams({
            onBackPressed: this.onBackPressed,
        })
        this.props.navigation.addListener('didFocus', this.refreshMission.bind(this))
        this.loadMissions(true)
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    refreshMission() {
        this.loadMissions(false)
    }

    onBackPressed = () => {
        const { navigation, dispatch } = this.props
        const { routeName, key } = navigation.getParam('returnToRoute')
        navigation.navigate({
            routeName, key,
            params: {
                updated: this.state.updated,
            }
        })
    }


    loadMissions(manualLoading) {

        if (!manualLoading) {
            const { timestamp } = this.state

            if (timestamp != undefined) {
                const date = new Date()
                const diff = date.getTime() - timestamp
                if (diff < 10000) {
                    this.setState({
                        isRefreshing: false
                    })
                    return false;
                }
            }
        }
        const date = new Date()
        this.setState({ timestamp: date.getTime() })

        const { dispatch, currentMember, company_id } = this.props

        const callback = eventObject => {
            if (eventObject.success) {

                var mission_categories = eventObject.result
                var missions = []
                for (var index in mission_categories) {
                    missions = missions.concat(mission_categories[index])
                    missions = missions.concat(mission_categories[index].missions)
                }

                this.setState({
                    missions: missions,
                }, function () {
                    if (currentMember != null) {
                        this.loadMissionStatements()
                    }
                })
            }
            this.setState({ loading: false, isRefreshing: false })
        }
        const obj = new MissionRequestObject()
        obj.setUrlId(company_id)
        dispatch(
            createAction('shops/loadMissions')({
                object: obj,
                callback,
            })
        )
    }

    loadMissionStatements() {
        const { dispatch, currentMember } = this.props


        this.setState({ loading_list: true })
        const callback = eventObject => {
            if (eventObject.success) {
                this.setState({
                    mission_statements: eventObject.result,
                }, function () {
                    this.update_mission()
                })
            }
            this.setState({
                loading: false,
                refreshing: false
            })
        }
        const obj = new GetMissionStatementRequestObject()

        if (currentMember != null) {
            obj.setUrlId(currentMember.id)
        }

        dispatch(
            createAction('members/loadMissionStatements')({
                object: obj,
                callback,
            })
        )
    }

    missionLogin = () => {
        const { dispatch, currentMember, navigation } = this.props
        const { navigate } = this.props.navigation
        if (currentMember == null) {
            navigate("VerifyUser", {
                returnToRoute: navigation.state,
            })
            return
        }

        this.setState({ loading: true })
        const callback = eventObject => {
            this.refs.toast.show(eventObject.message, TOAST_DURATION)
            this.setState({
                loading: false,
                mission_statements: eventObject.result,
                updated: true,
            }, function () {
                this.loadMissionStatements()
            })
        }
        const obj = new MissionLoginRequestObject()
        obj.setUrlId(currentMember.id);
        dispatch(
            createAction('members/missionLogin')({
                object: obj,
                callback,
            })
        )
    }

    missionRewardClaim = (statement_id) => {

        const { currentMember, navigation } = this.props
        const { navigate } = this.props.navigation
        const analytics = new Analytics(ANALYTICS_ID)
        analytics.event(new Event('Mission Center', 'Click', "Claim Reward"))

        if (currentMember == null) {
            navigate("VerifyUser", {
                returnToRoute: navigation.state,
            })
            return
        }


        if (statement_id != undefined) {
            const { dispatch } = this.props

            this.setState({ loading: true })
            const callback = eventObject => {
                this.refs.toast.show(eventObject.message, TOAST_DURATION)
                this.setState({
                    updated: true,
                    loading: false,
                    mission_statements: eventObject.result,
                }, function () {
                    this.loadMissionStatements()
                })
            }
            const obj = new MissionRewardClaimRequestObject()
            obj.setUrlId(statement_id)
            dispatch(
                createAction('members/missionRewardClaim')({
                    object: obj,
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


    }

    update_mission() {

        let missions = [...this.state.missions]
        statements = this.state.mission_statements

        for (var index in missions) {
            var found_mission = _.find(statements, { mission_id: missions[index].id })

            if (found_mission != undefined) {

                missions[index].statement_id = found_mission.id
                missions[index].progress = found_mission.task_progress
                missions[index].status = found_mission.status
            } else {
                missions[index].status = "Pending"
            }
        }
        this.setState({
            missions
        })
    }

    renderMissionlistFlatListCell = ({ item }) => {

        const { currentMember } = this.props
        if (item.clazz == "mission") {
            return <MissionCell
                item={item}
                title={item.name}
                point={item.points}
                status={item.status}
                login={currentMember != null}
                progress={item.progress}
                mission_type={item.mission_type}
                statement_id={item.statement_id}
                onStatusPressed={item.mission_type == "Login" ? this.missionLogin : this.missionRewardClaim}
                mission_task_count={item.mission_task_count}
                vouchers={item.mission_vouchers}
                navigation={this.props.navigation} />
        } else if (item.clazz == "mission_category") {
            return <MissionCategoryCell
                item={item}
                title={item.name}
                description={item.description}
                navigation={this.props.navigation} />
        }

    }

    onRefresh() {

        this.setState({
            isRefreshing: true,
        })

        this.loadMissions(true)
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
                        refreshing={this.state.isRefreshing}
                        style={styles.missionlistFlatList}
                        onRefresh={this.onRefresh.bind(this)}
                        keyExtractor={(item, index) => index.toString()} />
                </View>
            }
            <Toast ref="toast" style={{ bottom: (windowHeight / 2) - 40 }} textStyle={{ fontFamily: TITLE_FONT, color: "#ffffff" }} />
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
