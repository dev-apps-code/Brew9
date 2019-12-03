//
//  SplashScreen
//  Project
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Image, Text, StyleSheet, AppState } from "react-native"
import React from "react"
import {connect} from "react-redux"
import {createAction, Storage} from "../Utils"
import CurrentStatusRequestObject from "../Requests/current_status_request_object"
import { AsyncStorage } from 'react-native'

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
    
    componentDidUpdate() {
        this.checkLoginStatus()
    }

    checkLoginStatus() {
        const { members,isReady } = this.props
        if (isReady){
            if (typeof members === 'undefined'|| members === null) {
                this.props.navigation.navigate("VerifyUserStack")
            }
            else {
                this.props.navigation.navigate("TabGroupOne")
            }
        }
        
    }

    _handleAppStateChange = nextAppState => {
		const {members} = this.props
		if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
			if (members != null) {
				this.loadCurrentStatus()
			  }
		}
		this.setState({ appState: nextAppState });
      };
      
    loadCurrentStatus(){
       
        const { dispatch, members } = this.props
        if (members != null){
            this.setState({ loading: true })
            const callback = eventObject => {
                this.setState({
                    loading: false,
                })
                if (eventObject.result.force_upgrade) {
					Linking.openURL(eventObject.result.url)	
				} else if (eventObject.result.maintenance) {

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
                        object:obj,
                        callback,
                    })
                )
              })
            
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
