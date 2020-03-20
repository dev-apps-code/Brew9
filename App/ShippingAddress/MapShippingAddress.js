//
//  Map
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TextInput
} from "react-native";
import React from "react";
import { alpha, fontAlpha, windowHeight } from "../Common/size";
import openMap from "react-native-open-maps";
import { TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR, DISABLED_COLOR, commonStyles, TOAST_DURATION, LIGHT_GREY, BUTTONBOTTOMPADDING } from "../Common/common_style";
import MapView, {
    Marker,
} from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";

export default class MapShippingAddress extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTitle: <Text style={{ textAlign: 'center', alignSelf: "center", fontFamily: TITLE_FONT }}>Location</Text>,
            headerTintColor: "black",
            headerLeft: (
                <View style={styles.headerLeftContainer}>
                    <TouchableOpacity
                        onPress={params.onBackPressed ? params.onBackPressed : () => null}
                        style={styles.navigationBarItem}
                    >
                        <Image
                            source={require("./../../assets/images/back.png")}
                            style={styles.navigationBarItemIcon}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: null,
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0
            }
        };
    };


    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
        this.state = {
            latitude: parseFloat(this.props.navigation.state.params.area.latitude),
            longitude: parseFloat(this.props.navigation.state.params.area.longitude),
            error: null,
            deliveryArea: this.props.navigation.state.params.area.area
        };
    }

    handlePress(e) {
        console.log(e.nativeEvent.coordinate)
        this.setState({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
        });

        //get the user identified coordinates here
    }


    componentDidMount() {
        this.props.navigation.setParams({
            onBackPressed: this.onBackPressed,
        })

    }
    onBackPressed = () => {

        this.props.navigation.goBack()
    }

    renderForm = (title, placeholder, text, onChangeText, description) => {
        console.log('description', description)
        return (
            <View style={{ height: 50 * alpha, marginBottom: 5 * alpha }}>
                <Text style={styles.title}>{title}</Text>
                {text ? <Text style={styles.textInput}>{description}</Text> : <TextInput
                    keyboardType="default"
                    clearButtonMode="always"
                    autoCorrect={false}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    style={styles.textInput} />}
            </View>
        )
    }

    renderMap = () => {
        let { latitude, longitude } = this.state
        return (
            <MapView
                style={styles.container}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                onPress={this.handlePress}
            >
                <Marker coordinate={this.state} />
            </MapView>
        );
    };
    onChangeUnitNo = (unitNo) => {
        this.setState({
            unitNo
        })
    }
    onChangeStreet1 = (Street1) => {
        this.setState({
            Street1
        })
    }
    onChangeStreet2 = (Street2) => {
        this.setState({
            Street2
        })
    }
    onChangeCity = (city) => {
        this.setState({
            city
        })
    }
    onChangePoscode = (poscode) => {
        this.setState({
            poscode
        })
    }
    onChangeCountry = (country) => {
        this.setState({
            country
        })
    }
    onChangeState = (state) => {
        this.setState({
            state
        })
    }

    onSavePressed = () => {
        console.log(this.state)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerTitle}>{this.state.deliveryArea}</Text>
                {this.renderMap()}
                <ScrollView style={{ height: windowHeight / 4 }}>
                    <View style={styles.formView}>
                        {this.renderForm("Unit no", "e.g. Gym/School", false, (text) => this.onChangeUnitNo(text))}
                        {this.renderForm("Street1", "e.g. Gym/School", false, (text) => this.onChangeStreet1(text))}
                        {this.renderForm("Street2", "e.g. Gym/School", false, (text) => this.onChangeStreet2(text))}
                        {this.renderForm("State", "Exp:Block B", false, (text) => this.onChangeState(text))}
                        {this.renderForm("Poscode", "Exp:Block B", false, (text) => this.onChangePoscode(text))}
                        {this.renderForm("City", "Exp:Block B", false, (text) => this.onChangeCity(text))}
                        {this.renderForm("Country", "Exp:Block B", false, (text) => this.onChangeCountry(text))}

                        <TouchableOpacity
                            onPress={() => this.onSavePressed()}
                            style={styles.saveButton}>
                            <Text
                                style={styles.saveButtonText}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerLeftContainer: {
        flexDirection: "row",
        marginLeft: 8 * alpha,
        width: 70 * alpha
    },
    navigationBarItem: {
        width: "100%"
    },
    navigationBarItemTitle: {
        color: "black",
        fontFamily: TITLE_FONT,
        fontSize: 16 * fontAlpha
    },
    navigationBarItemIcon: {
        width: 18 * alpha,
        height: 18 * alpha,
        tintColor: "black"
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    map: {
        height: 300 * alpha,
        width: "100%",

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
    formView: {
        paddingHorizontal: 20 * alpha,
        marginTop: 20 * alpha
    },
    saveButton: {
        borderRadius: 4 * alpha,
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: PRIMARY_COLOR,
        // position: "absolute",
        // left: 0 * alpha,
        // right: 0 * alpha,
        marginHorizontal: 20 * alpha,
        // bottom: BUTTONBOTTOMPADDING,
        height: 47 * alpha,
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    saveButtonText: {
        color: "white",
        fontFamily: TITLE_FONT,
        fontSize: 14 * fontAlpha,
        fontStyle: "normal",
        textAlign: "left",
    },
    headerTitle: {
        backgroundColor: "transparent",
        color: "rgb(54, 54, 54)",
        fontFamily: TITLE_FONT,
        fontSize: 16 * fontAlpha,
        fontStyle: "normal",
        textAlign: "left",
        paddingVertical: 15 * alpha,
        paddingHorizontal: 15 * alpha,
    }

});