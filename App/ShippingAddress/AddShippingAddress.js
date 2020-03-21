//
//  MemberVoucher
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, TextInput } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import { createAction } from '../Utils'
import { connect } from "react-redux";
import SaveShippingAddressObjectRequest from "../Requests/save_shipping_address_request_object";
import UpdateShippingAddressObjectRequest from "../Requests/update_shipping_address_request_object"
import Toast, { DURATION } from 'react-native-easy-toast'
import { KURL_INFO } from "../Utils/server";
import { TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR, DISABLED_COLOR, commonStyles, TOAST_DURATION, LIGHT_GREY, BUTTONBOTTOMPADDING, windowHeight } from "../Common/common_style";
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
export default class AddShippingAddress extends React.Component {

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
        if (this.address != null) {
            this.state = {
                fullname: this.address.fullname ? this.address.fullname : '',
                address: this.address.address ? this.address.address : '',
                contact_number: this.address.contact_number ? this.address.contact_number : '',
                city: this.address.city ? this.address.city : '',
                state: this.address.state ? this.address.state : '',
                postal_code: this.address.postal_code ? this.address.postal_code : '',
                country: this.address.country ? this.address.country : '',
                land_mark: this.address.land_mark ? this.address.land_mark : '',
                latitude: this.address.latitude ? this.address.latitude : '',
                longitude: this.address.longitude ? this.address.longitude : '',
                delivery_area: this.address.delivery_area ? this.address.delivery_area : '',
                primary: this.address.primary == true ? 1 : 0
            }
        } else {
            this.state = {
                fullname: '',
                address: '',
                contact_number: '',
                city: '',
                state: '',
                postal_code: '',
                country: '',
                land_mark: '',
                latitude: '',
                longitude: '',
                delivery_area: '',
                primary: true
            }
        }

    }
    onChangeName = (fullname) => {
        this.setState({ fullname })
    }
    onChangeContactNo = (contact_number) => {
        this.setState({ contact_number })
    }
    onChangeAddress = (address) => {
        this.setState({ address })
    }

    onChangeTag = (land_mark) => {
        this.setState({ land_mark })
    }
    onSavePressed = () => {
        let formcheck = this.checkForm()
        let primary = this.state.default == 1 ? true : false
        if (formcheck) {
            const shippingAddress = {
                member_id: this.props.currentMember.id,
                fullname: this.state.fullname,
                address: this.state.address,
                contact_number: this.state.contactNo,
                city: this.state.city,
                state: this.state.state,
                postal_code: this.state.postal_code,
                country: this.state.country,
                land_mark: this.state.land_mark,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                delivery_area: this.state.delivery_area,
                primary: primary
            }
            this.loadUpdateProfile(shippingAddress)
        }



    }
    loadUpdateProfile(formData) {
        const { dispatch, currentMember, navigation } = this.props
        const callback = eventObject => {
            if (eventObject.success) {
                navigation.navigate('ShippingAddress')


            }
        }
        if (this.address == null) {
            const obj = new SaveShippingAddressObjectRequest(formData, currentMember.id)
            console.log('obj', obj)
            obj.setUrlId(currentMember.id)
            dispatch(
                createAction('members/saveShippingAddress')({
                    object: obj,
                    callback,
                })
            )
        } else {
            const obj = new UpdateShippingAddressObjectRequest(formData, currentMember.id)
            console.log('UpdateShippingAddressObjectRequest obj', obj)
            obj.setUrlId(this.address.id)
            dispatch(
                createAction('members/updateShippingAddress')({
                    object: obj,
                    callback,
                })
            )
        }


    }
    checkForm = () => {
        let { fullname, address, contact_number, city, state, postal_code, country, land_mark, latitude, longitude, delivery_area } = this.state
        if (!fullname) {
            this.refs.toast.show("Please select a fullname", 500)
            return false
        }
        else if (!address) {
            this.refs.toast.show("Please select your address", 500)
            return false
        }
        else if (!contact_number) {
            this.refs.toast.show("Please select your contact number", 500)
            return false

        }
        // else if (!this.state.tag) {
        //     this.refs.toast.show("Please select your tag", 500)
        //     return false

        // }
        return true

    }


    componentDidMount() {
        this.props.navigation.setParams({
            onBackPressed: this.onBackPressed,
        })
    }

    returnData(info) {
        console.log(info)
        this.setState({
            address: info.address,
            city: info.city,
            state: info.state,
            postal_code: info.postal_code,
            country: info.country,
            latitude: info.latitude,
            longitude: info.longitude,
            delivery_area: info.delivery_area
        })
    }

    onBackPressed = () => {
        this.props.navigation.goBack()
    }
    onChangeDefaultAddress = (value) => {
        this.setState({ primary: value })
    }
    onSelectAddress = () => {
        const { navigate } = this.props.navigation
        navigate("ShippingArea", {
            returnToRoute: this.props.navigation.state,
            returnData: this.returnData.bind(this)
        })
    }
    renderFormDetail = (title, value, placeholder, onChangeText, edit) => {
        return (
            <View>
                <View style={styles.formDetail}>
                    <Text style={styles.title}>{title}</Text>
                    {title != "Address" ? edit ? <TextInput
                        defaultValue={value}
                        keyboardType="default"
                        clearButtonMode="always"
                        autoCorrect={false}
                        placeholder={placeholder}
                        onChangeText={(text) => onChangeText(text)}
                        style={styles.textInput}
                        editable={edit} /> : <Text>{value}</Text> :
                        <TouchableOpacity style={{ flexDirection: 'row', flex: 1, marginRight: 10 * alpha, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.onSelectAddress()}>
                            <Text style={[styles.textInput]}>{value}</Text>
                            <Image
                                source={require("./../../assets/images/next.png")}
                                style={styles.navigationBarItemIcon} />
                        </TouchableOpacity>}
                </View>
                <Image
                    source={require("./../../assets/images/line-17.png")}
                    style={styles.seperatorImage} />
            </View>
        )
    }




    render() {
        let current_address = this.state.address ? this.state.address : "Select shipping Address"
        let { fullname, address, contact_number, city, state, postal_code, country, land_mark, latitude, longitude, delivery_area } = this.state
        return <View
            style={styles.container}>

            <ScrollView>
                <View style={styles.addAddressForm}>
                    {this.renderFormDetail("First Name", fullname, "Fill up receiver's first name", (text) => this.onChangeName(text), true)}
                    {this.renderFormDetail("Contac No.", contact_number, "Fill up receiver's contact", (text) => this.onChangeContactNo(text), true)}
                    {this.renderFormDetail("Address", current_address, "", (text) => this.onChangeAddress(text), true)}
                    {this.renderFormDetail("City", city, "", (text) => console.log(text), false)}
                    {this.renderFormDetail("State", state, "", (text) => console.log(text), false)}
                    {this.renderFormDetail("Poscode", postal_code, "", (text) => console.log(text), false)}
                    {this.renderFormDetail("Country", country, "", (text) => console.log(text), false)}
                    {this.renderFormDetail("Tag", land_mark, "", (text) => this.onChangeTag(text), true)}
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
                            onPress={(value) => this.onChangeDefaultAddress(value)}
                        />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => this.onSavePressed()}
                style={styles.saveButton}>
                <Text
                    style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
            <Toast ref="toast" textStyle={{ fontFamily: TITLE_FONT, color: "#ffffff" }} />


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
