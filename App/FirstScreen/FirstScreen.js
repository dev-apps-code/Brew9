//
//  SplashScreen
//  Project
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Image, Text, TextInput, StyleSheet, AppState, Linking, Modal, TouchableWithoutFeedback, TouchableOpacity, Platform } from "react-native"
if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;
import React from "react"
import { connect } from "react-redux"
import { createAction, Storage } from "../Utils"
import CurrentStatusRequestObject from "../Requests/current_status_request_object"
import { AsyncStorage } from 'react-native'
import Brew9Modal from '../Components/Brew9Modal'
import Toast, { DURATION } from 'react-native-easy-toast'
import { TITLE_FONT, NON_TITLE_FONT, TABBAR_INACTIVE_TINT, TABBAR_ACTIVE_TINT, PRIMARY_COLOR, LIGHT_BLUE } from "../Common/common_style";
import { alpha, fontAlpha, windowHeight, windowWidth } from "../Common/size"
import KochavaTracker from 'react-native-kochava-tracker';
import { getMemberIdForApi } from '../Services/members_helper'
import { getAppVersion, getBuildVersion } from "../Utils/server";
import Brew9PopUp from "../Components/Brew9PopUp"
import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from "../Common/config"

@connect(({ members }) => ({
    members: members.profile,
    isReady: members.isReady
}))
export default class FirstScreen extends React.Component {

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
            isSignedIn: false,
            appState: AppState.currentState,
            checked: false,
            popUpVisible: false
        }
    }


    componentDidMount() {
        let platform = Platform.OS
        const { dispatch } = this.props
        const analytics = new Analytics(ANALYTICS_ID)
        analytics.event(new Event('FirstScreen', 'Launch', platform, getAppVersion()))

        dispatch(createAction('members/loadCurrentUserFromCache')({}))
        AppState.addEventListener('change', this._handleAppStateChange);
        var configMapObject = {}
        if (__DEV__) {
            configMapObject[KochavaTracker.PARAM_LOG_LEVEL_ENUM_KEY] = KochavaTracker.LOG_LEVEL_ENUM_TRACE_VALUE;
        } else {
            configMapObject[KochavaTracker.PARAM_LOG_LEVEL_ENUM_KEY] = KochavaTracker.LOG_LEVEL_ENUM_INFO_VALUE;
        }
        configMapObject[KochavaTracker.PARAM_ANDROID_APP_GUID_STRING_KEY] = "kobrew9-npv3ph2ns";
        configMapObject[KochavaTracker.PARAM_IOS_APP_GUID_STRING_KEY] = "kobrew9-82rqs2pdf";
        KochavaTracker.configure(configMapObject);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    componentDidUpdate(prevProps, prevState) {
        const { checked } = this.state
        if (checked == false) {
            this.setState({
                checked: true
            }, function () {
                this.loadCurrentStatus()
            })
        }
        if (prevProps.members != this.props.members) {
            this.checkLoginStatus()
        }
    }

    checkLoginStatus() {
        const { members, isReady } = this.props
        if (isReady) {
            if (typeof members === 'undefined' || members === null) {
                this.props.navigation.navigate("VerifyUserStack")
            }
            else {
                this.props.navigation.navigate("TabGroupOne")
            }
        }

    }

    _handleAppStateChange = nextAppState => {
        const { members } = this.props
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            if (members != null) {
                this.loadCurrentStatus()
            }
        }
        this.setState({ appState: nextAppState });
    };

    loadCurrentStatus() {
        const { dispatch, members } = this.props

        this.setState({ loading: true })
        const callback = eventObject => {
            this.setState({
                loading: false,
            })
            if (eventObject.result.force_upgrade) {
                this.setState({ popUpVisible: true, title: eventObject.result.title, description: eventObject.result.description, url: eventObject.result.url })
            } else if (eventObject.result.maintenance) {
                this.setState({ popUpVisible: true, title: eventObject.result.title, description: eventObject.result.description, url: '' })
            } else {
                this.checkLoginStatus()
            }
        }
        AsyncStorage.getItem("notification_key", (err, result) => {
            var last_note = 0
            if (result != null) {
                last_note = result
            }
            const obj = new CurrentStatusRequestObject(last_note)
            obj.setUrlId(getMemberIdForApi(members))
            dispatch(
                createAction('members/loadCurrentStatus')({
                    object: obj,
                    callback,
                })
            )
        })


    }
    onPressOk = () => {

        if (this.state.url != null && this.state.url != '') {
            Linking.openURL(this.state.url)
        }
    }
    renderForceUpdate = () => {
        let { popUpVisible, title, description } = this.state
        return <Brew9PopUp
            popUpVisible={popUpVisible}
            title={title}
            description={description}
            onPressOk={this.onPressOk}
            onBackgroundPress={() => console.log('close')}
        />

    }

    render() {

        return <View>
            {/* <Brew9Modal visible={this.state.popUpVisible} cancelable={false} title={this.state.title} description={this.state.description} okayButtonAction={() => {
                if (this.state.url != null && this.state.url != '') {
                    Linking.openURL(this.state.url)
                }
            }} /> */}
            {this.renderForceUpdate()}
            <Toast ref="toast" style={{ bottom: (windowHeight / 2) - 40 }} textStyle={{ fontFamily: TITLE_FONT, color: "#ffffff" }} /></View>
    }
}

const styles = StyleSheet.create({
    firstView: {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
    },
    popUpBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    popUpContent: {
        backgroundColor: 'white',
        minHeight: windowHeight / 5,
        // aspectRatio: 1,
        maxHeight: windowHeight / 2,
        paddingVertical: 20 * alpha,
        marginHorizontal: 50 * alpha,
        paddingHorizontal: 20 * alpha,
        justifyContent: 'space-between',
        borderRadius: 5 * alpha,

    },
    popUpInput1: {
        // backgroundColor: '#fff5ee',
        paddingHorizontal: 10 * alpha,
        paddingVertical: 10 * alpha,
        borderRadius: 5 * alpha,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
        flexDirection: 'row'
    },
    popUpInput3: {
        backgroundColor: 'rgb(0, 178, 227)',
        paddingHorizontal: 10 * alpha,
        paddingVertical: 10 * alpha,
        borderRadius: 5 * alpha,
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1,
        marginTop: 5
    },
    orderButtonText: {
        color: "rgb(254, 254, 254)",
        fontFamily: NON_TITLE_FONT,
        fontSize: 14 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
    },
    titleText: {
        paddingBottom: 5,
        textAlign: 'center',
        fontFamily: TITLE_FONT,

    },
    descriptionText: {
        color: 'rgb(135, 135, 135)',
        fontFamily: TITLE_FONT,
        textAlign: 'center'
    },
})
