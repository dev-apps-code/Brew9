//
//  SplashScreen
//  Project
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Image, Text, TextInput, StyleSheet, AppState, Linking, Modal, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
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
    onPressOk = () => {

        if (this.state.url != null && this.state.url != '') {
            Linking.openURL(this.state.url)
        }
    }
    renderForceUpdate = () => {
        let { popUpVisible, title, description } = this.state
        return <Modal
            animationType="fade"
            transparent={true}
            visible={popUpVisible}
        >
            <TouchableWithoutFeedback >
                <View style={[styles.popUpBackground]}>
                    <View style={[styles.popUpContent]}>
                        <Text style={styles.titleText}>{title}</Text>
                        <View style={{ marginBottom: 10 }}>
                            <View style={styles.popUpInput1}>
                                <Text style={styles.descriptionText}>{description}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={this.onPressOk}
                            style={styles.popUpInput3}>
                            <Text
                                style={styles.orderButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

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
