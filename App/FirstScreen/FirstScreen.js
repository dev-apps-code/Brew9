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

import ProfileRequestObject from "../Requests/profile_request_object"

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


    componentDidMount() {
        const { dispatch } = this.props
        dispatch(createAction('members/loadCurrentUserFromCache')({}))
    }

    componentDidUpdate() {
        
        this.checkLoginStatus()
    }

    checkLoginStatus() {
<<<<<<< HEAD
        const { members } = this.props
        console.log("Members", members)
        if (typeof members === 'undefined'|| members === null) {
            this.props.navigation.navigate("VerifyStack")
        }
        else {
            this.props.navigation.navigate("TabGroupOne")
            // this.loadProfile()
        }
        // this.props.navigation.navigate("VerifyStack")
    }

    loadProfile(){
        const { dispatch, members } = this.props
        this.setState({ loading: true })
        const callback = eventObject => {
            if (eventObject.success) {
              
=======
        const { members,isReady } = this.props
        if (isReady){
            if (typeof members === 'undefined'|| members === null) {
                this.props.navigation.navigate("VerifyStack")
            }
            else {
                this.props.navigation.navigate("TabGroupOne")
>>>>>>> d18c7ce2d721d417b8a9fb577792f9adb11d03f3
            }
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
