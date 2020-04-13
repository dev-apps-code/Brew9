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
import { alpha, fontAlpha, windowHeight } from '../Common/size';
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
      address_detail: '',
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
      address_detail: navigation.state.params.addressInfo.address_detail
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
    let { address } = this.state;
    if (!address) {
      this.refs.toast.show('Please fill in your address', 500);
      return false;
    }
    return true;
  };
  getAddressDetails = (data, details) => {
    if (details.formatted_address != null) {
      var address_detail = details.formatted_address.split(',');
      var address = details.formatted_address;
      var poscode_city = address_detail[1].split(' ');
      var postal_code = poscode_city[1];
      var city = poscode_city[2];
      var state = address_detail[2];
      var country = address_detail[3];
      // console.log('address_detail', details);
      this.setState(
        {
          address,
          postal_code,
          city,
          state,
          country,
          address_detail: ''
        },
        () => console.log(this.state)
      );
    }
  };

  onSavePressed = () => {
    const { navigation } = this.props;
    let {
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

  renderAddAddressMode = () => {
    let address = '';
    let address_detail = '';
    return (
      <Animated.View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: DEFAULT_GREY_BACKGROUND }}>
          <TouchableOpacity
            style={styles.clearView}
            onPress={() => {
              this.setState({ address: '' });
            }}
          >
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
      </Animated.View>
    );
  };

  renderAddressForm = () => {
    let {
      address,
      address_detail,
      postal_code,
      city,
      state,
      country
    } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
        <View style={{ flex: 1, backgroundColor: DEFAULT_GREY_BACKGROUND }}>
          <TouchableOpacity
            style={styles.clearView}
            onPress={() => {
              this.setState({ address: '' });
            }}
          >
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
      </TouchableWithoutFeedback>
    );
  };

  renderSearchForm = () => (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2}
      autoFocus={false}
      enablePoweredByContainer={false}
      autoCorrect={false}
      returnKeyType={'search'}
      keyboardAppearance={'light'}
      listViewDisplayed="auto"
      fetchDetails={true}
      renderDescription={(row) => row.description}
      textInputProps={{ clearButtonMode: 'never' }}
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
      debounce={200} 
    />
  );

  render() {
    if (this.state.address && this.state.address.length > 0) {
      return this.renderAddressForm();
    }

    if (this.state.isAddAddressMode) {
      return this.renderAddAddressMode();
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
