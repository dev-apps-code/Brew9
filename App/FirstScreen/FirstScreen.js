//
//  SplashScreen
//  Project
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Image, Text, StyleSheet } from "react-native"
import React from "react"
import {connect} from "react-redux"
import {createAction, Storage} from "../Utils"
import {createStackNavigator, NavigationActions, StackActions} from 'react-navigation'
import ProfileRequestObject from "../Requests/profile_request_object"
import Login from "../Login/Login"
import Home from "../Home/Home";

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
        }
    }

    componentWillMount() {
        const { dispatch } = this.props
        dispatch(createAction('members/loadCurrentUserFromCache')({}))
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        this.checkLoginStatus()
    }

    checkLoginStatus() {
        const { members } = this.props
        if (typeof members === 'undefined'|| members === null) {
            this.props.navigation.navigate("AuthenticationStack")
        }
        else {
            this.props.navigation.navigate("TabGroupOne")
            this.loadProfile()
        }
    }

    loadProfile(){
        const { dispatch, members } = this.props
        this.setState({ loading: true })
        const callback = eventObject => {
            if (eventObject.success) {
                this.setState({
                    loading: false,
                })
            }
        }
        const obj = new ProfileRequestObject()
        
        if(members.id) {
            obj.setUrlId(members.id)
            dispatch(
                createAction('members/loadProfile')({
                    object:obj,
                    callback,
                })
            )
        }
    }

    render() {
        return <View></View>
    }
}

const styles = StyleSheet.create({
    firstView: {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
    },
})
