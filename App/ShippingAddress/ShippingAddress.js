//
//  Checkout
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { Animated, StyleSheet, View, TouchableOpacity, Image, Text, ScrollView, Linking, TextInput, FlatList } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowHeight } from "../Common/size";
import { connect } from "react-redux";
import Toast, { DURATION } from 'react-native-easy-toast'
import HudLoading from "../Components/HudLoading"
import { createAction, Storage } from "../Utils"
import ShippingAddressRequestObject from '../Requests/get_shipping_address_request_object'
import _ from 'lodash'
import { TITLE_FONT, NON_TITLE_FONT, BUTTONBOTTOMPADDING, DEFAULT_GREY_BACKGROUND, PRIMARY_COLOR, TOAST_DURATION, LIGHT_GREY } from "../Common/common_style";
import Moment from 'moment';
import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from "../Common/config"

@connect(({ members, shops, orders }) => ({
    currentMember: members.profile,
    members: members,
    shppingAddress: members.shippingAddress
}))
export default class ShippingAddress extends React.Component {

    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state
        return {
            headerTitle: <Text style={{ textAlign: 'center', alignSelf: "center", fontFamily: TITLE_FONT }}>Shipping Address</Text>,
            headerTintColor: "black",
            headerLeft: <View
                style={styles.headerLeftContainer}>
                <TouchableOpacity
                    onPress={params.onBackPressed ? params.onBackPressed : () => null}
                    style={styles.navigationBarItem}>
                    <Image
                        source={require("./../../assets/images/back.png")}
                        style={styles.navigationBarItemIcon} />
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
            delivery_options: 'pickup',
            shippingAddress: []

        }

    }
    onBackPressed = () => {
        this.props.navigation.goBack()
    }

    loadShippingAddress = () => {
        let { dispatch, currentMember } = this.props
        const callback = eventObject => {
            console.log('eventObject', eventObject)

            if (eventObject.success) {
                this.setState({
                    loading: false,
                    shippingAddress: eventObject.result

                })
            }

        }
        const obj = new ShippingAddressRequestObject()
        obj.setUrlId(currentMember.id)
        dispatch(
            createAction('members/loadShippingAddress')({
                object: obj,
                callback,
            })
        )
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onBackPressed: this.onBackPressed,
        })
        this.loadShippingAddress()
    }

    componentDidUpdate(prevProps, prevState) {

    }
    onAddAddress = () => {
        const { navigation } = this.props
        navigation.navigate("AddShippingAddress")
    }
    onEditAddress = (item) => {
        const { navigation } = this.props
        navigation.navigate("EditShippingAddress", { params: item })

    }
    renderShippingAddress = (item) => {
        let selected = item.default ? styles.selectTwoView : styles.selectView
        return (
            <View style={styles.content}>
                <View style={styles.shippingAddressDetail}>
                    <View
                        style={selected} />
                    <View style={{ flex: 1, marginLeft: 15 * alpha }}>
                        <Text style={styles.addressText}>{item.unit_no}</Text>
                        <Text style={styles.addressText}>{item.street1}</Text>
                        <Text style={styles.addressText}>{item.street2}</Text>
                        <Text style={styles.addressText}>{item.city}, {item.postal_code},{item.state} {item.country}</Text>
                    </View>
                    <View style={{ flex: 0.25 }} />

                </View>
                <TouchableOpacity onPress={() => this.onEditAddress(item)} style={styles.editButton}>
                    <Text style={styles.editTextButton}>Edit address</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { location, shippingAddress } = this.props
        let { loading } = this.state
        return <View
            style={styles.Container}>
            <ScrollView
                style={styles.scrollviewScrollView}>
                <Text style={styles.headingStyle}>Delivery Address</Text>
                {loading ? <HudLoading isLoading={this.state.loading} />
                    : <FlatList
                        data={this.state.shippingAddress}
                        renderItem={({ item }) => (
                            this.renderShippingAddress(item)
                        )}
                        keyExtractor={item => item.id}
                    />}
            </ScrollView>
            <TouchableOpacity onPress={this.onAddAddress}>
                <View style={styles.addButtonView}>
                    <Image
                        source={require("./../../assets/images/add.png")}
                        style={styles.addButtonImage} />
                    <Text style={styles.addAddressText}>Add Address</Text>

                </View>
            </TouchableOpacity>

        </View>
    }
}

const styles = StyleSheet.create({
    navigationBarItem: {
    },
    Container: {
        flex: 1,
        backgroundColor: "rgb(243, 243, 243)",
    },
    scrollviewScrollView: {
        paddingHorizontal: 20 * alpha,

    },
    headerLeftContainer: {
        flexDirection: "row",
        marginLeft: 8 * alpha,
    },
    navigationBarItemIcon: {
        width: 18 * alpha,
        height: 18 * alpha,
    },
    addButtonImage: {
        height: 18 * alpha,
        width: 18 * alpha,
        tintColor: 'white'
    },
    addButtonView: {
        margin: 30 * alpha,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'black',
        paddingVertical: 10 * alpha

    },
    addAddressText: {
        color: 'white',
        fontSize: 14 * fontAlpha,
        fontFamily: TITLE_FONT,
        marginHorizontal: 10 * alpha
    },
    selectedButton: {
        width: 18 * alpha,
        height: 18 * alpha,
        // flex: 0.5,
    },
    shippingAddressDetail: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'

    },
    editTextButton: {
        color: PRIMARY_COLOR,
        fontSize: 12 * fontAlpha,
        fontFamily: TITLE_FONT,
        // marginHorizontal: 10 * alpha
    },
    editButton: {
        alignItems: 'baseline',
        alignItems: 'flex-end',
        flex: 0.5,
        paddingBottom: 5 * alpha
    },
    content: {
        marginBottom: 10 * alpha,
        paddingTop: 20 * alpha,
        paddingHorizontal: 10 * alpha,
        borderRadius: 5 * alpha,
        borderWidth: 0.5,
        borderColor: LIGHT_GREY
    },
    headingStyle: {
        fontSize: 18 * fontAlpha,
        fontFamily: TITLE_FONT,
        paddingVertical: 10 * alpha,
        marginTop: 10 * alpha,
        color: "#696969",

    },
    addressText: {
        color: "rgb(130, 130, 130)",
        fontFamily: NON_TITLE_FONT,
        fontSize: 16 * fontAlpha,
        paddingBottom: 5 * alpha
        // marginTop: 10 * alpha
    },
    selectView: {
        backgroundColor: "transparent",
        borderRadius: 9 * alpha,
        borderWidth: 1 * alpha,
        borderColor: "rgb(186, 183, 183)",
        borderStyle: "solid",
        width: 18 * alpha,
        height: 18 * alpha,
    },
    selectTwoView: {
        backgroundColor: "rgb(0, 178, 227)",
        borderRadius: 9 * alpha,
        width: 18 * alpha,
        height: 18 * alpha,
    },

})
