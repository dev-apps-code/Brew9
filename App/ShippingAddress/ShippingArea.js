//
//  MemberVoucher
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowWidth } from "../Common/size";
import { createAction } from '../Utils'
import { connect } from "react-redux";

import ShopAreaRequestObject from "../Requests/shop_area_request_object";

import { KURL_INFO } from "../Utils/server";
import { TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR, DISABLED_COLOR, commonStyles, TOAST_DURATION, LIGHT_GREY, BUTTONBOTTOMPADDING } from "../Common/common_style";
import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from "../Common/config"
import { getMemberIdForApi } from '../Services/members_helper'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import SwitchSelector from "react-native-switch-selector"

@connect(({ members, shops }) => ({
    currentMember: members.profile,
    selectedShop: shops.selectedShop,
    company_id: members.company_id,
}))
export default class ShippingArea extends React.Component {

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
            name: '',
            gender_options: [
                { label: 'Male', value: 0 },
                { label: 'Female', value: 1 }
            ],
            contactNo: "",
            address: "",
            unitNo: "",
            gender: "",
            genderIndex: 0,
            tag: "",
            defaultAddress: 1,
            data: [{
                name: 'kulim'
            },
            {
                name: 'kulim'
            },
            {
                name: 'kulim'
            },
            {
                name: 'kulim'
            }, {
                name: 'kulim'
            }, {
                name: 'kulim'
            }]




        }
    }
    loadArea = () => {
        let { dispatch, selectedShop } = this.props
        console.log('selectedShop', selectedShop)
        const callback = eventObject => {
            console.log('eventObject', eventObject)

            if (eventObject.success) {
                this.setState({
                    loading: false,
                    data: eventObject.result,
                })
            }

        }
        const obj = new ShopAreaRequestObject(selectedShop.id)
        console.log('obj', obj)
        obj.setUrlId(members.company_id)
        dispatch(
            createAction('companies/loadShopArea')({
                object: obj,
                callback,
            })
        )
    }





    componentDidMount() {
        this.props.navigation.setParams({
            onBackPressed: this.onBackPressed,
        })
        this.loadArea()
    }

    onBackPressed = () => {
        this.props.navigation.goBack()
    }
    onSelectArea = () => {
        const { navigation } = this.props
        navigation.navigate("MapShippingAddress")
    }
    onChangeDefaultAddress = (value) => {
        this.setState({ defaultAddress: value })
    }
    renderPlaces = (item) => {
        console.log('item', item)
        return (
            <TouchableOpacity style={styles.placesButton} onPress={this.onSelectArea}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    }






    render() {

        return <View
            style={styles.container}>
            <Text style={styles.mainTitle}>Delivery Address</Text>
            <View style={styles.addAddressForm}>
                <Text style={styles.header}>Please Select your area</Text>
                <View style={styles.placesWrapperView}>
                    <FlatList
                        renderItem={({ item }) => this.renderPlaces(item)}
                        data={this.state.data}
                        // style={styles.placesWrapperView}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        key={'THREE COLUMN'} />
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
        backgroundColor: "rgb(243, 243, 243)",

        // justifyContent: 'space-between'
    },
    addAddressForm: {
        backgroundColor: "white",
        paddingVertical: 10 * alpha,
        paddingHorizontal: 10 * alpha,
        marginHorizontal: 10 * alpha,
        borderRadius: 10 * alpha,
        paddingBottom: 10 * alpha,
    },
    textInput: {
        backgroundColor: "transparent",
        padding: 0,
        color: "black",
        fontFamily: NON_TITLE_FONT,
        fontSize: 14 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        // width: 193 * alpha,
        // height: 30 * alpha,
        flex: 1,
    },
    formDetail: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingVertical: 10 * alpha
        // flex: 1
    },
    mainTitle: {
        backgroundColor: "transparent",
        color: "rgb(54, 54, 54)",
        fontFamily: TITLE_FONT,
        fontSize: 16 * fontAlpha,
        fontStyle: "normal",
        textAlign: "left",
        paddingVertical: 15 * alpha,
        paddingHorizontal: 15 * alpha,

    },
    title: {
        backgroundColor: "transparent",
        color: "rgb(54, 54, 54)",
        fontFamily: TITLE_FONT,
        fontSize: 13 * fontAlpha,
        fontStyle: "normal",
        width: 110 * alpha,
        textAlign: "left",
    },
    header: {
        backgroundColor: "transparent",
        color: "rgb(54, 54, 54)",
        fontFamily: TITLE_FONT,
        fontSize: 14 * fontAlpha,
        fontStyle: "normal",
        textAlign: "center",
    },
    seperatorImage: {
        backgroundColor: "transparent",
        resizeMode: "cover",
        height: 3 * alpha,
    },
    selectedradioView: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
    },
    defaultAddressOption: {
        borderRadius: 10 * alpha,
        width: 65 * alpha,
        // height: 10 * alpha,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black'
    },
    optionText: {
        fontFamily: NON_TITLE_FONT,
        fontSize: 10 * fontAlpha,
    },
    defaultAddressView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red',
        paddingVertical: 10 * alpha
    },

    placesButton: {
        width: 90 * alpha,
        paddingVertical: 5 * alpha,
        paddingHorizontal: 10 * alpha,
        backgroundColor: 'lightgray',
        borderRadius: 5 * alpha,
        // borderWidth: 1,
        // borderColor: PRIMARY_COLOR,
        margin: 5 * alpha,
        alignItems: 'center'
    },
    placesWrapperView: {
        backgroundColor: 'transparent',
        marginVertical: 20 * alpha,
        // width: windowWidth / 2,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }



})
