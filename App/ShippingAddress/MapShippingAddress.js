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
import { alpha, fontAlpha } from "../Common/size";
import openMap from "react-native-open-maps";
import { TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR, DISABLED_COLOR, commonStyles, TOAST_DURATION, LIGHT_GREY, BUTTONBOTTOMPADDING } from "../Common/common_style";
import MapView, {
    Marker,
    PROVIDER_GOOGLE
} from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };

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

        this.state = {
            latitude: 0,
            longitude: 0,
            error: null,
            loading: true
        };
    }


    componentDidMount() {
        this.props.navigation.setParams({
            onBackPressed: this.onBackPressed,
        })
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    loading: false
                });
                console.log("finished");
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }
    onBackPressed = () => {

        this.props.navigation.goBack()
    }
    onChangeName = (address) => {
        this.setState({ address })
    }
    onChangeName = (address) => {
        this.setState({ address })
    }
    onChangeName = (address) => {
        this.setState({ address })
    }
    renderForm = (title, placeholder, onChangeText) => {

        return (
            <View style={{ height: 50 * alpha, marginBottom: 5 * alpha }}>
                <Text style={styles.title}>{title}</Text>
                <TextInput
                    keyboardType="default"
                    clearButtonMode="always"
                    autoCorrect={false}
                    placeholder={placeholder}
                    onChangeText={(text) => onChangeText(text)}
                    style={styles.textInput} />
            </View>
        )
    }

    renderMap = () => {
        return (
            <MapView
                showsUserLocation={true}
                style={styles.map}
                region={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.009
                }}
            >
                <Marker coordinate={this.state} />
            </MapView>
        );
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Area</Text>
                {this.state.loading ? null : this.renderMap()}
                <View style={styles.formView}>
                    {this.renderForm("Name", "e.g. Gym/School", this.onChangeName)}
                    {this.renderForm("Address", "e.g. Gym/School", this.onChangeName)}
                    {this.renderForm("Address Detail's", "e.g. Gym/School", this.onChangeName)}
                    <TouchableOpacity
                        onPress={() => this.onSavePressed()}
                        style={styles.saveButton}>
                        <Text
                            style={styles.saveButtonText}>SAVE</Text>
                    </TouchableOpacity>
                </View>


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