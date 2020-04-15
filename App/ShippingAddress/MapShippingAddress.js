import {
  Animated,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import React from 'react';
import { alpha, fontAlpha, windowHeight, windowWidth } from '../Common/size';
import openMap from 'react-native-open-maps';
import {
  TITLE_FONT,
  NON_TITLE_FONT,
  PRIMARY_COLOR,
  BUTTONBOTTOMPADDING,
  DEFAULT_GREY_BACKGROUND,
  TINT_COLOR
} from '../Common/common_style';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/Ionicons';

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
      isAddAddressMode: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed
    });
    console.log(navigation.state.params.addressInfo);

    this.setState({
      address: navigation.state.params.addressInfo.address,
      address_details: navigation.state.params.addressInfo.address_details
    });
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
    if (details.formatted_address != null) {
      var address_details = details.formatted_address.split(',');
      var address = details.formatted_address;
      var poscode_city = address_details[1].split(' ');
      var postal_code = poscode_city[1];
      var city = poscode_city[2];
      var state = address_details[2];
      var country = address_details[3];

      this.setState(
        {
          address,
          postal_code,
          city,
          state,
          country,
          address_details: ''
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
      console.log(shippingAddress);
      navigation.state.params.returnAddress(shippingAddress);
      navigation.navigate('AddShippingAddress');
    }
  };

  renderAddAddressMode = () => {
    let address = this.state.address;
    let address_details = '';
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true} >
      <Animated.View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: DEFAULT_GREY_BACKGROUND }}>
          <TouchableOpacity
            style={styles.clearView}
            onPress={() => {
              this.setState({  isAddAddressMode:false,address: '' });
            }}
          >
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
          <View style={styles.whiteContent}>
            <View style={styles.bodyContent}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start'
                }}
              >
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
            <View style={styles.sectionSeperatorView} />

            <View style={styles.bodyContent}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start'
                }}
              >
                <Text style={styles.title}>Address Line 2</Text>
                <TextInput
                  keyboardType="default"
                  clearButtonMode="always"
                  autoCorrect={false}
                  value={address_details}
                  placeholder={'Unit # / Floor / Block '}
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
      </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  renderAddressForm = () => {
    let {
      address,
      address_details,
      postal_code,
      city,
      state,
      country
    } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true} >
        <View style={{ flex: 1, backgroundColor: DEFAULT_GREY_BACKGROUND }}>
          <TouchableOpacity
            style={styles.clearView}
            onPress={() => {
              this.setState({  isAddAddressMode:false,address: '' });
            }}
          >
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
          <View style={styles.whiteContent}>
            <View style={styles.bodyContent}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start'
                }}
              >
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
            <View style={styles.sectionSeperatorView} />

            <View style={styles.bodyContent}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start'
                }}
              >
                <Text style={styles.title}>Address Line 2</Text>
                <TextInput
                  keyboardType="default"
                  clearButtonMode="always"
                  autoCorrect={false}
                  value={address_details}
                  placeholder={'Unit # / Floor / Block'}
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
      </TouchableWithoutFeedback>
    );
  };

  renderSearchForm = () => (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2}
      autoFocus={true}
      enablePoweredByContainer={false}
      autoCorrect={false}
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Use My Location"
      returnKeyType={'search'}
      keyboardAppearance={'light'}
      listViewDisplayed="auto"
      fetchDetails={true}
      renderDescription={(row) =>
        row.description || row.formatted_address || row.name
      }
      textInputProps={{ clearButtonMode: 'never' }}
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      // nearbyPlacesAPI="GoogleReverseGeocoding" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
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
      renderRightButton={() => (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10 * alpha,
            width: 22 * alpha
          }}
          onPress={() => this.setState({ isAddAddressMode: true })}
        >
          <Icon name="ios-add" size={20 * fontAlpha} color={TINT_COLOR} />
        </TouchableOpacity>
      )}
      onPress={(data, details = null) => {
        this.getAddressDetails(data, details);
        console.log('fetchDetails', data, details);
      }}
      getDefaultValue={() => ''}
      query={{
        key: 'AIzaSyDa5Vq60SYn3ZbOdcrBAunf7jJk2msB6_A',
        components: 'country:bn'
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
      debounce={200}
    />
  );

  render() {
    if (this.state.isAddAddressMode) {
      console.log('is addres')
      return this.renderAddAddressMode();
    }

    
    if (this.state.address && this.state.address.length > 0) {
      console.log('addres')
      return this.renderAddressForm();
    }

  
    return this.renderSearchForm();
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
    paddingBottom: 2 * alpha,
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
    color: 'rgb(128,128,128)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
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
    height: 3 * alpha,
    width: windowWidth - 40 * alpha,
    tintColor: 'rgb(54, 54, 54)'
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
  },
  whiteContent: {
    marginHorizontal: 10 * alpha,
    // paddingVertical: 10 * alpha,
    borderRadius: 5 * alpha,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyContent: {
    paddingVertical: 10 * alpha,
    flexDirection: 'row',
    paddingHorizontal: 20 * alpha,
    justifyContent: 'space-between'
    // alignItems: 'center'
    // flex: 1
  },
  sectionSeperatorView: {
    backgroundColor: 'rgb(234, 234, 234)',
    position: 'absolute',
    alignSelf: 'center',
    width: windowWidth - 60 * alpha,
    height: 1 * alpha,
    marginLeft: 10 * alpha
  }
});
