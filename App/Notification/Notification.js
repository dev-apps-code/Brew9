//
//  MemberWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {Image, View, Text, StyleSheet, TouchableOpacity, FlatList} from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../common/size";
import {connect} from "react-redux";
import {createAction} from "../Utils";
import NotificationsRequestObject from "../Requests/notifications_request_object"
import NotificationsCell from "./NotificationsCell"
import * as SecureStore from 'expo-secure-store';

@connect(({ members }) => ({
    members: members
}))
export default class Notification extends React.Component {

    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state
        return {
            title: "Notification",
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
            data: [],
            unread: 0,
            last_read: 0,
        }
    }

    componentDidMount() {
        this.loadLocalStore()
        this.loadNotifications()
        this.props.navigation.setParams({
            onBackPressed: this.onBackPressed,
            onItemPressed: this.onItemPressed,
        })
    }

    loadNotifications(){
        const { dispatch, members } = this.props
        this.setState({ loading: true })
        const callback = eventObject => {
            if (eventObject.success) {
                this.setState({
                    loading: false,
                    data: eventObject.result
                }, function(){
                    const maxValue = Math.max(...this.state.data.map(o => o.id), 0);
                     this.setState({
                        last_read: maxValue
                    })

                    this.count_unread()
                })
            }
        }
        const obj = new NotificationsRequestObject()
        obj.setUrlId(members.member_id)
        dispatch(
            createAction('members/loadNotifications')({
                object:obj,
                callback,
            })
        )
    }

    loadLocalStore() {
        SecureStore.getItemAsync("notification_key").then((result)=>{
            if (isNaN(result)) {
                this.setState({
                    last_read: 0
                })
            }
            else {
                this.setState({
                    last_read: result
                })
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    count_unread() {

        results = this.state.data
        var count = 0
        for(var index in results) {
            result = results[index]
            if(result.id > this.state.last_read) {
                count++
            }
        }
        this.setState({
            unread: count
        })
    }

    onBackPressed = () => {

        this.props.navigation.goBack()
    }

    renderPointhistoryFlatListCell = ({ item }) => {

        return <NotificationsCell
            navigation={this.props.navigation}
            id={item.id}
            title={item.title}
            text={item.text}
            time={item.created_at}
            last_read={this.state.last_read}
        />
    }

    onReadAllPressed = () => {

        SecureStore.setItemAsync("notification_key", `${this.state.last_read}`).catch((error)=>{
            console.log(error)
        })
    }

    render() {

        return <View
            style={styles.notificationView}>
            <View
                style={styles.contentView}>
                <View
                    style={styles.noticeView}>
                    <Text
                        style={styles.noticeText}>You have {this.state.unread} unread notifications</Text>
                    <View
                        style={{
                            flex: 1,
                        }}/>
                    <TouchableOpacity
                        onPress={this.onReadAllPressed}
                        style={styles.readallButton}>
                        <Text
                            style={styles.readallButtonText}>Read All</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.pointhistoryFlatListViewWrapper}>
                    <FlatList
                        renderItem={this.renderPointhistoryFlatListCell}
                        data={this.state.data}
                        style={styles.pointhistoryFlatList}
                        keyExtractor={(item, index) => index.toString()}/>
                </View>
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
        tintColor: "black",
    },
    notificationView: {
        backgroundColor: "white",
        flex: 1,
    },
    contentView: {
        backgroundColor: "transparent",
        flex: 1,
        alignItems: "flex-start",
    },
    noticeView: {
        backgroundColor: "rgb(245, 247, 246)",
        width: 375 * alpha,
        height: 51 * alpha,
        flexDirection: "row",
        alignItems: "center",
    },
    noticeText: {
        backgroundColor: "transparent",
        color: "rgb(107, 109, 108)",
        fontFamily: "Helvetica",
        fontSize: 13 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        marginLeft: 20 * alpha,
    },
    readallButton: {
        backgroundColor: "white",
        borderRadius: 13 * alpha,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        width: 90 * alpha,
        height: 26 * alpha,
        marginRight: 20 * alpha,
    },
    readallButtonText: {
        color: "rgb(107, 109, 108)",
        fontFamily: "Helvetica",
        fontSize: 13 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
    },
    readallButtonImage: {
        resizeMode: "contain",
        marginRight: 10 * alpha,
    },
    pointhistoryFlatList: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    },
    pointhistoryFlatListViewWrapper: {
        flex: 1,
        alignSelf: "stretch",
        marginRight: 1,
    },
})
