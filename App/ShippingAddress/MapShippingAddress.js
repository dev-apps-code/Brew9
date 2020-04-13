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
    
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      address: '',
      address_details: '',
    };
  }

 

  componentDidMount() {
    const { navigation } = this.props;
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed
    });
    console.log(navigation.state.params.addressInfo)

    this.setState(
      {
        address: navigation.state.params.addressInfo.address,
        address_detail: navigation.state.params.addressInfo.address_detail
      }
    )
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

 
  onChangeAddress = (address) => {
    this.setState({
      address
    });
  };
  
  onChangeAddressDetail = (address_details) => {
    this.setState({
      address_details
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
    let { address } = this.state;
    if (!address) {
      this.refs.toast.show('Please fill in your address', 500);
      return false;
    }
    return true;
  };
  getAddressDetails = (data, details) => {
    if (details.formatted_address != null){
      
      var address_details = details.formatted_address.split(',');
      var address = details.formatted_address
      var poscode_city = address_details[1].split(' ');
      var postal_code = poscode_city[1];
      var city = poscode_city[2];
<<<<<<< HEAD
      var state = address_details[2];
      var country = address_details[3];
      console.log('address_details', details);
=======
      var state = address_detail[2];
      var country = address_detail[3];
      // console.log('address_detail', details);
>>>>>>> f5274fc9e33834b70108560f16ccb104c64cb958
      this.setState(
        {
          address,
          postal_code,
          city,
          state,
          country,
          address_details: '',
        },
        () => console.log(this.state)
      );
    }
    
  };

  onSavePressed = () => {
    const { navigation } = this.props;
    let {
      address_details,
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
        address_details,
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
      address_details,
      postal_code,
      city,
      state,
      country,
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: DEFAULT_GREY_BACKGROUND }}>
        <TouchableOpacity style={styles.clearView}  onPress={() => {
                this.setState({ address: '' });
              }} >
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
              <Text style={styles.title}>Address Line 1</Text>
              <TextInput
                keyboardType="default"
                clearButtonMode="always"
                autoCorrect={false}
                value={address}
                onChangeText={(address) => {
                  this.setState({ address });
                }}
                style={styles.textInput}
              />
            </View>         
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
            <Text style={styles.title}>Address Line 2</Text>
            <View style={{ height: 50 * alpha, marginBottom: 5 * alpha }}>
              <TextInput
                keyboardType="default"
                clearButtonMode="always"
                autoCorrect={false}
                value={address_detail}
                placeholder={'Enter Detailed Location'}
                onChangeText={(address_details) => {
                  this.setState({ address_details });
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
  
    let { address } = this.state;

    return (!address || address.length == 0) ? (
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        enablePoweredByContainer={false}
        autoCorrect={false}
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
          components: "country:bn",
        }}
        currentLocation={true}
        currentLocationLabel="Current location"       
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
