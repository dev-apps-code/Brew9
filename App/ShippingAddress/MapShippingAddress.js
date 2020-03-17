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
    Platform
} from "react-native";
import React from "react";
import { alpha, fontAlpha } from "../Common/size";
import openMap from "react-native-open-maps";
import { TITLE_FONT, NON_TITLE_FONT } from "../Common/common_style";
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
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position)
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

    renderMap = () => {
        console.log("renderMap");
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
    GooglePlacesInput = () => {
        return (
            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}

                getDefaultValue={() => ''}

                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyD0Gq1MLRFylAy8TV9rzH9UgZ3koEWDf8k',
                    language: 'en', // language of the results
                    types: '(cities)' // default: 'geocode'
                }}

                styles={{
                    textInputContainer: {
                        width: '100%'
                    },
                    description: {
                        fontWeight: 'bold'
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb'
                    }
                }}

                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    type: 'cafe'
                }}

                GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                    fields: 'formatted_address',
                }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                predefinedPlaces={[homePlace, workPlace]}

                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                renderLeftButton={() => <Image source={require("./../../assets/images/back.png")} />}
                renderRightButton={() => <Text>Custom text after the input</Text>}
            />
        );
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? null : this.renderMap()}
                {this.GooglePlacesInput()}
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
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },

});