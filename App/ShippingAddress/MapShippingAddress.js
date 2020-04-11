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
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import React from 'react';
import { alpha, fontAlpha, windowHeight } from '../Common/size';
import openMap from 'react-native-open-maps';
import {
  TITLE_FONT,
  NON_TITLE_FONT,
  PRIMARY_COLOR,
  DISABLED_COLOR,
  commonStyles,
  TOAST_DURATION,
  LIGHT_GREY,
  BUTTONBOTTOMPADDING,
  DEFAULT_GREY_BACKGROUND
} from '../Common/common_style';
import MapView, { Marker } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import Toast, { DURATION } from 'react-native-easy-toast';
import { Header } from 'react-navigation-stack';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { createAction, dispatch, toRad } from '../Utils/index';

@connect(({ members, shops, config, orders }) => ({
  location: members.location
}))
export default class MapShippingAddress extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: TITLE_FONT
          }}
        >
          Delivery Address
        </Text>
      ),
      headerTintColor: 'black',
      headerLeft: (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={params.onBackPressed ? params.onBackPressed : () => null}
            style={styles.navigationBarItem}
          >
            <Image
              source={require('./../../assets/images/back.png')}
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
      latitude: 0,
      longitude: 0,
      error: null,
      address: '',
      address_detail: '',
      name: '',
      address_form: false
    };
  }

  getLocationAsync = async () => {
    const { dispatch } = this.props;
    try {
      const value = await AsyncStorage.getItem('location permission');
      if (value != 'denied') {
        this.getLocation();
      } else {
        return;
      }
    } catch (error) {
      console.log('error', error);

      // Error retrieving data
    }
  };
  getLocation = async () => {
    const { dispatch } = this.props;
    try {
      const response = await Permissions.getAsync(Permissions.LOCATION);
      if (response.status !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
      } else {
        Location.watchPositionAsync(
          {
            distanceInterval: 100,
            timeInterval: 10000
          },
          (newLocation) => {
            dispatch(createAction('members/setLocation')(newLocation));
          },
          (error) => console.log(error)
        );

        let location = await Location.getCurrentPositionAsync({});

        dispatch(createAction('members/setLocation')(location));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  handlePress(e) {
    this.setState({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude
    });

    //get the user identified coordinates here
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed
    });
    this.getLocationAsync();
  }
  onBackPressed = () => {
    this.props.navigation.goBack();
  };

  renderForm = (title, placeholder, text, onChangeText, description) => {
    return (
      <View style={{ height: 50 * alpha, marginBottom: 5 * alpha }}>
        <Text style={styles.title}>{title}</Text>
        {text ? (
          <Text style={styles.textInput}>{description}</Text>
        ) : (
          <TextInput
            keyboardType="default"
            clearButtonMode="always"
            autoCorrect={false}
            placeholder={placeholder}
            onChangeText={onChangeText}
            style={styles.textInput}
          />
        )}
      </View>
    );
  };

  renderMap = () => {
    let { latitude, longitude } = this.state;
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

  onChangeAddress = (address) => {
    this.setState({
      address
    });
  };
  onChangeName = (name) => {
    this.setState({
      name
    });
  };
  onChangeAddressDetail = (address_detail) => {
    this.setState({
      address_detail
    });
  };
  // onChangeCountry = (country) => {
  //   this.setState({
  //     country
  //   });
  // };
  // onChangeState = (state) => {
  //   this.setState({
  //     state
  //   });
  // };

  checkForm = () => {
    let { address, address_detail, name } = this.state;
    if (!address) {
      this.refs.toast.show('Please fill in your address', 500);
      return false;
    }
    return true;
  };
  getAddressDetails = (data, details) => {
    var address_detail = details.formatted_address.split(',');
    var address = address_detail[0];
    var poscode_city = address_detail[1].split(' ');
    var postal_code = poscode_city[1];
    var city = poscode_city[2];
    var state = address_detail[2];
    var country = address_detail[3];
    console.log('address_detail', details);
    this.setState(
      {
        address,
        postal_code,
        city,
        state,
        country,
        address_form: true,
        address1: data.structured_formatting.main_text,
        address2: data.structured_formatting.secondary_text
      },
      () => console.log(this.state)
    );
  };

  onSavePressed = () => {
    const { navigation } = this.props;
    let {
      name,
      address_detail,
      address,
      postal_code,
      city,
      state,
      country,
      latitude,
      longitude,
      delivery_area
    } = this.state;
    let formcheck = true;
    if (formcheck) {
      const shippingAddress = {
        address_detail,
        address,
        postal_code,
        city,
        state,
        country,
        latitude,
        longitude,
        delivery_area
      };
      navigation.state.params.returnAddress(shippingAddress);
      navigation.navigate('AddShippingAddress');
    }
  };
  renderAddressForm = () => {
    let {
      address,
      postal_code,
      city,
      state,
      country,
      address1,
      address2
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: DEFAULT_GREY_BACKGROUND }}>
        <TouchableOpacity style={styles.clearView}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
        <View
          style={{
            // marginTop: 20 * alpha,
            marginHorizontal: 10 * alpha,
            borderRadius: 5 * alpha,
            backgroundColor: 'white'
          }}
        >
          <View
            style={{
              paddingVertical: 20 * alpha,
              flexDirection: 'row',
              paddingHorizontal: 20 * alpha,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{address1}</Text>
              <Text style={styles.text}>{address2}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({ address_form: false });
              }}
            >
              <Image
                source={require('./../../assets/images/next.png')}
                style={styles.navigationBarItemIcon}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={require('./../../assets/images/line-17.png')}
            style={styles.seperatorImage}
          />
          <View
            style={{
              paddingVertical: 10 * alpha,
              paddingHorizontal: 20 * alpha,
              marginTop: 10 * alpha
            }}
          >
            <Text style={styles.title}>Address Details</Text>
            <View style={{ height: 50 * alpha, marginBottom: 5 * alpha }}>
              <TextInput
                keyboardType="default"
                clearButtonMode="always"
                autoCorrect={false}
                placeholder={'6C Block C'}
                onChangeText={(address_detail) => {
                  this.setState({ address_detail });
                }}
                style={styles.textInput}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.onSavePressed()}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    let { location } = this.props;
    let { address_form } = this.state;

    let currentLocation =
      location.coords.latitude + ',' + location.coords.longitude;
    return !address_form ? (
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={(row) => row.description} // custom description render
        renderLeftButton={() => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10 * alpha,
              width: 22 * alpha
            }}
          >
            <Image
              source={require('./../../assets/images/location.png')}
              style={styles.locationIcon}
            />
          </View>
        )}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          this.getAddressDetails(data, details);
          console.log('fetchDetails', data, details);
        }}
        getDefaultValue={() => ''}
        query={{
          key: 'AIzaSyDa5Vq60SYn3ZbOdcrBAunf7jJk2msB6_A',
          language: 'en', // language of the results
          // location: '7.2539601,125.1708828',
          types: 'geocode',
          location: currentLocation,
          radius: '1000'
        }}
        styles={{
          container: { backgroundColor: DEFAULT_GREY_BACKGROUND },
          textInputContainer: {
            marginHorizontal: 15 * alpha,
            backgroundColor: 'white',
            marginVertical: 10 * alpha,
            borderRadius: 5 * alpha,
            borderTopWidth: 0,
            borderBottomWidth: 0
          },
          textInput: {
            marginLeft: 0
          },
          row: {
            backgroundColor: 'white'
          },

          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        GooglePlacesDetailsQuery={{
          fields: 'formatted_address'
        }}
        // filterReverseGeocodingByTypes={[
        //   'locality',
        //   'administrative_area_level_3'
        // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        // predefinedPlaces={[homePlace, workPlace]}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    ) : (
      this.renderAddressForm()
    );
  }
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    marginLeft: 8 * alpha,
    width: 70 * alpha
  },
  navigationBarItem: {
    width: '100%'
  },
  navigationBarItemTitle: {
    color: 'black',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha
  },
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
    tintColor: 'black'
  },
  locationIcon: {
    width: 14 * alpha,
    height: 20 * alpha
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  map: {
    height: 300 * alpha,
    width: '100%'
  },
  title: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'left'
  },
  text: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left'
  },
  textInput: {
    backgroundColor: 'transparent',
    padding: 0,
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  formView: {
    paddingHorizontal: 20 * alpha,
    marginTop: 20 * alpha,
    flex: 1
  },
  saveButton: {
    borderRadius: 4 * alpha,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: PRIMARY_COLOR,
    position: 'absolute',
    left: 0 * alpha,
    right: 0 * alpha,
    marginHorizontal: 20 * alpha,
    bottom: BUTTONBOTTOMPADDING + 20 * alpha,
    height: 47 * alpha,
    flexDirection: 'row',
    alignItems: 'center'
  },
  saveButtonText: {
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
    flex: 1
  },
  headerTitle: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
    paddingVertical: 15 * alpha,
    paddingHorizontal: 15 * alpha
  },
  seperatorImage: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    height: 3 * alpha
  },
  clearText: {
    color: PRIMARY_COLOR,
    fontSize: 15 * fontAlpha,
    fontFamily: TITLE_FONT
  },
  clearView: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20 * alpha,
    marginRight: 15 * alpha,
    marginBottom: 10 * alpha
  }
});
