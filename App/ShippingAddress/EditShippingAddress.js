//
//  MemberVoucher
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import { createAction } from '../Utils'
import { connect } from "react-redux";
import VoucherRequestObject from "../Requests/voucher_request_object";
import ValidVouchersRequestObject from '../Requests/valid_voucher_request_object.js'
import UsedVoucher from "../Checkout/UsedVoucher"
import ValidVoucher from "../Checkout/ValidVoucher"
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
export default class EditShippingAddress extends React.Component {

    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state
        return {
            headerTitle: <Text style={{ textAlign: 'center', alignSelf: "center", fontFamily: TITLE_FONT }}>Add Address</Text>,
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
        this.address = this.props.navigation.state.params.params
        this.state = {
            name: this.address.name ? this.address.name : '',
            gender_options: [
                { label: 'Male', value: 0 },
                { label: 'Female', value: 1 }
            ],
            contactNo:this.address.contactNo ? this.address.contactNo : "",
            address: this.address.address ? this.address.address : "",
            unitNo: this.address.unitNo ? this.address.unitNo : "",
            gender: this.address.gender ? this.address.gender : "",
            genderIndex: 0,
            tag: this.address.tag ? this.address.tag : "",
            defaultAddress: this.address.defaultAddress ? 1 : 2
        }
    }
    onChangeName = (name) => {
        this.setState({ name })
    }
    onChangeContactNo = (contactNo) => {
        this.setState({ contactNo })
    }
    onChangeAddress = (address) => {
        this.setState({ address })
    }
    onChangeUnitNo = (unitNo) => {
        this.setState({ unitNo })
    }
    onChangeTag = (tag) => {
        this.setState({ tag })

    }


    componentDidMount() {
        this.props.navigation.setParams({
            onBackPressed: this.onBackPressed,
            onItemPressed: this.onItemPressed,
        })
    }

    onBackPressed = () => {

        this.props.navigation.goBack()
    }
    renderFormDetail = (title, placeholder, onChangeText) => {
        return (
            <View>
                <View style={styles.formDetail}>
                    <Text style={styles.title}>{title}</Text>
                    <TextInput
                        keyboardType="default"
                        clearButtonMode="always"
                        autoCorrect={false}
                        placeholder={placeholder}
                        onChangeText={(text) => onChangeText(text)}
                        style={styles.textInput} />
                </View>
                <Image
                    source={require("./../../assets/images/line-17.png")}
                    style={styles.seperatorImage} />
            </View>
        )
    }

    renderRadioButtonForm = () => {
        return (
            <View>
                <View style={styles.formDetail}>
                    <Text
                        style={styles.title}>Gender</Text>
                    <View
                        style={styles.selectedradioView}>
                        <RadioForm formHorizontal={true} animation={true} >
                            {this.state.gender_options.map((obj, i) => {
                                var onPress = (value, index) => {
                                    this.setState({
                                        gender: value,
                                        genderIndex: index
                                    })
                                }
                                return (
                                    <RadioButton labelHorizontal={true} key={i} >
                                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                        <RadioButtonInput
                                            obj={obj}
                                            index={i}
                                            isSelected={this.state.gender === i}
                                            onPress={onPress}
                                            buttonInnerColor={PRIMARY_COLOR}
                                            buttonOuterColor={this.state.genderIndex === i ? '#00B2E3' : PRIMARY_COLOR}
                                            selectedButtonColor={'#00B2E3'}
                                            buttonSize={5 * alpha}
                                            buttonStyle={{ backgroundColor: "rgb(200, 200, 200)", borderWidth: 0, marginRight: 5 * alpha, marginTop: 2 * alpha }}
                                        />
                                        <RadioButtonLabel
                                            obj={obj}
                                            index={i}
                                            onPress={onPress}
                                            labelStyle={{ color: "rgb(135, 135, 135)", fontSize: 13 * fontAlpha, marginRight: 10 * alpha, fontFamily: NON_TITLE_FONT }}
                                            labelWrapStyle={{}}
                                        />
                                    </RadioButton>
                                )
                            })}
                        </RadioForm>
                    </View>
                </View>
                <Image
                    source={require("./../../assets/images/line-17.png")}
                    style={styles.seperatorImage} />
            </View>)
    }


    render() {
        return <View
            style={styles.container}>
            <View style={styles.addAddressForm}>
                {this.renderFormDetail("Name", "Fill up receiver's name", this.onChangeName)}
                {this.renderRadioButtonForm()}
                {this.renderFormDetail("Contac No.", "Fill up receiver's contact", this.onChangeContactNo)}
                {this.renderFormDetail("Address", "Fill up receiver's contact", this.onChangeAddress)}
                {this.renderFormDetail("Unit No.", "Exp:Block B", this.onChangeUnitNo)}
                {this.renderFormDetail("Tag", "", this.onChangeTag)}
                <View style={[styles.defaultAddressView]}>
                    <Text style={styles.title}>Default address</Text>
                    <SwitchSelector
                        options={[
                            { label: "", value: 0 },
                            { label: "", value: 1 }]}
                        initial={this.state.delivery}
                        value={0}
                        textColor={"#4E4D4D"}
                        selectedColor={"#FFFFFF"}
                        buttonColor={"#2A2929"}
                        borderColor={"#979797"}
                        backgroundColor={"rgb(240,240,240)"}
                        style={styles.defaultAddressOption}
                        textStyle={styles.optionText}
                        fontSize={10 * alpha}
                        height={25 * alpha}
                        onPress={(value) => console.log(value)}
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={() => this.onSavePressed()}
                style={styles.saveButton}>
                <Text
                    style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>

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
        justifyContent: 'space-between'
    },
    addAddressForm: {
        backgroundColor: "white",
        paddingVertical: 10 * alpha,
        paddingHorizontal: 10 * alpha,
        marginHorizontal: 10 * alpha,
        borderRadius: 10 * alpha,
        paddingBottom: 10 * alpha
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
        width: 193 * alpha,
        height: 30 * alpha,
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
    title: {
        backgroundColor: "transparent",
        color: "rgb(54, 54, 54)",
        fontFamily: TITLE_FONT,
        fontSize: 13 * fontAlpha,
        fontStyle: "normal",
        width: 110 * alpha,
        textAlign: "left",
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
    saveButton: {
        borderRadius: 4 * alpha,
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: PRIMARY_COLOR,
        position: "absolute",
        left: 0 * alpha,
        right: 0 * alpha,
        marginHorizontal: 20 * alpha,
        bottom: BUTTONBOTTOMPADDING,
        height: 47 * alpha,
        flexDirection: "row",
        alignItems: "center",
    },
    saveButtonText: {
        color: "white",
        fontFamily: TITLE_FONT,
        fontSize: 14 * fontAlpha,
        fontStyle: "normal",
        textAlign: "left",
    },


})
