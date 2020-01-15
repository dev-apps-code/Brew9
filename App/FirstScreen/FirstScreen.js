//
//  SplashScreen
//  Project
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Image, Text, TextInput, StyleSheet, AppState, Linking } from "react-native"
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
import { TOAST_DURATION, TITLE_FONT } from "../Common/common_style";
import { alpha, fontAlpha, windowHeight, windowWidth } from "../Common/size"

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
        const { dispatch } = this.props
        dispatch(createAction('members/loadCurrentUserFromCache')({}))
        AppState.addEventListener('change', this._handleAppStateChange);
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

        if (members != null) {
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
                    // this.checkLoginStatus()
                }
            }
            AsyncStorage.getItem("notification_key", (err, result) => {
                var last_note = 0
                if (result != null) {
                    last_note = result
                }
                const obj = new CurrentStatusRequestObject(last_note)
                obj.setUrlId(members.id)
                dispatch(
                    createAction('members/loadCurrentStatus')({
                        object: obj,
                        callback,
                    })
                )
            })
        } else {
            this.checkLoginStatus()
        }

    }

    render() {

        return <View>
            <Brew9Modal visible={this.state.popUpVisible} cancelable={false} title={this.state.title} description={this.state.description} okayButtonAction={() => {
                if (this.state.url != null && this.state.url != '') {
                    Linking.openURL(this.state.url)
                }
            }} />
            <Toast ref="toast" style={{ bottom: (windowHeight / 2) - 40 }} textStyle={{ fontFamily: TITLE_FONT, color: "#ffffff" }} /></View>
    }
}

const styles = StyleSheet.create({
    firstView: {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
    },
})
