//
//  Checkout
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { Animated, StyleSheet, View, TouchableOpacity, Image, Text, ScrollView, Linking, TextInput } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowHeight } from "../Common/size";
import { connect } from "react-redux";
import Toast, { DURATION } from 'react-native-easy-toast'
import HudLoading from "../Components/HudLoading"
import { createAction, Storage } from "../Utils"
import MakeOrderRequestObj from '../Requests/make_order_request_obj.js'
import ValidVouchersRequestObject from '../Requests/valid_voucher_request_object.js'
import _ from 'lodash'
import { TITLE_FONT, NON_TITLE_FONT, BUTTONBOTTOMPADDING, DEFAULT_GREY_BACKGROUND, PRIMARY_COLOR, TOAST_DURATION, LIGHT_GREY } from "../Common/common_style";
import Moment from 'moment';
import ScrollPicker from 'rn-scrollable-picker';
import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from "../Common/config"
import openMap from "react-native-open-maps";
import { getMemberIdForApi } from '../Services/members_helper'

@connect(({ members, shops, orders }) => ({
    currentMember: members.profile,
    members: members,
    selectedShop: shops.selectedShop,
    cart_total_quantity: orders.cart_total_quantity,
    promotion_trigger_count: orders.promotion_trigger_count,
    cart: orders.cart,
    cart_order_id: orders.cart_order_id,
    promotions: orders.promotions,
    promotion_ids: orders.promotion_ids,
    cart_total: orders.cart_total,
    discount_cart_total: orders.discount_cart_total,
    location: members.location,
}))
export default class ShippingAddress extends React.Component {

    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state
        console.log('params', params)
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

        }

    }
    onBackPressed = () => {

        const { navigation } = this.props
        const { routeName, key } = navigation.getParam('returnToRoute')

        navigation.navigate({ routeName, key, })
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onBackPressed: this.onBackPressed,
        })
    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const { location } = this.props
        console.log('location', location)
        return <View
            style={styles.Container}>
            <ScrollView
                style={styles.scrollviewScrollView}>



            </ScrollView>
            <View style={styles.addButtonView}>
                <Image
                    source={require("./../../assets/images/add.png")}
                    style={styles.addButtonImage} />
                <Text style={styles.addAddressText}>Add Address</Text>

            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    navigationBarItem: {
    },
    Container: {
        flex: 1
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
    }

})
