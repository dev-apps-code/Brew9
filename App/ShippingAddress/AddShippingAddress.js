//
//  MemberVoucher
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native';
import React from 'react';
import { alpha, fontAlpha, windowHeight } from '../Common/size';
import { createAction } from '../Utils';
import { connect } from 'react-redux';
import SaveShippingAddressObjectRequest from '../Requests/save_shipping_address_request_object';
import UpdateShippingAddressObjectRequest from '../Requests/update_shipping_address_request_object';
import CurrentStatusRequestObject from '../Requests/current_status_request_object';
import Toast, { DURATION } from 'react-native-easy-toast';
import { KURL_INFO } from '../Utils/server';
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
import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from '../Common/config';
import { getMemberIdForApi } from '../Services/members_helper';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import SwitchSelector from 'react-native-switch-selector';

@connect(({ members, shops }) => ({
  currentMember: members.profile,
  selectedShop: shops.selectedShop,
  company_id: members.company_id,
  location: members.location
}))
export default class AddShippingAddress extends React.Component {
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
          Add Address
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
    this.address = this.props.navigation.state.params.params;

    if (this.address != null) {
      this.state = {
        address_detail: '',
        fullname: this.address.fullname ? this.address.fullname : '',
        address: this.address.address ? this.address.address : '',
        address_detail: this.address.address_details ? this.address.address_details : '',
        contact_number: this.address.contact_number
          ? this.address.contact_number
          : '',
        city: this.address.city ? this.address.city : '',
        state: this.address.state ? this.address.state : '',
        postal_code: this.address.postal_code ? this.address.postal_code : '',
        country: this.address.country ? this.address.country : '',
        land_mark: this.address.land_mark ? this.address.land_mark : '',
        latitude: this.address.latitude ? this.address.latitude : '',
        longitude: this.address.longitude ? this.address.longitude : '',
        gender_options: [
          { label: 'Male', value: 0 },
          { label: 'Female', value: 1 }
        ],
        verification_code: '',
        gender: 2,
        genderIndex: 0,
        delivery_area: this.address.delivery_area
          ? this.address.delivery_area
          : '',
        primary: this.address.primary == true ? 1 : 0,
        tag: this.props.selectedShop.address_tags
      };
    } else {
      this.state = {
        address_detail: '',
        fullname: this.props.currentMember.nickname,
        address: '',
        contact_number: this.props.currentMember.phone_no,
        city: '',
        state: '',
        postal_code: '',
        country: '',
        land_mark: '',
        latitude: '',
        longitude: '',
        delivery_area: '',
        primary: 1,
        gender_options: [
          { label: 'Male', value: 0 },
          { label: 'Female', value: 1 }
        ],
        verification_code: '',
        gender: 2,
        genderIndex: 0,
        tag: this.props.selectedShop.address_tags
      };
    }
  }
  onChangeName = (fullname) => {
    this.setState({ fullname });
  };
  onChangeContactNo = (contact_number) => {
    this.setState({ contact_number });
  };

  onSavePressed = () => {
    let formcheck = this.checkForm();
    let primary = this.state.primary == 1 ? true : false;
    if (formcheck) {
      const shippingAddress = {
        member_id: this.props.currentMember.id,
        fullname: this.state.fullname,
        address:  this.state.address,
        address_detail: this.state.address_detail,
        contact_number: this.state.contact_number,
        city: this.state.city,
        state: this.state.state,
        postal_code: this.state.postal_code,
        country: this.state.country,
        land_mark: this.state.land_mark,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        delivery_area: this.state.delivery_area,
        primary: primary
      };
      console.log('shippingAddress', shippingAddress);
      this.loadUpdateProfile(shippingAddress);
    }
  };
  loadUpdateProfile(formData) {
    const { dispatch, currentMember, navigation } = this.props;
    const callback = (eventObject) => {
      if (eventObject.success) {
        navigation.navigate('ShippingAddress');
      } else {
        this.refs.toast.show(eventObject.message, 500);
      }
    };
    if (this.address == null) {
      const obj = new SaveShippingAddressObjectRequest(
        formData,
        currentMember.id
      );
      obj.setUrlId(currentMember.id);
      dispatch(
        createAction('members/saveShippingAddress')({
          object: obj,
          callback
        })
      );
    } else {
      const obj = new UpdateShippingAddressObjectRequest(
        formData,
        currentMember.id
      );
      obj.setUrlId(this.address.id);
      dispatch(
        createAction('members/updateShippingAddress')({
          object: obj,
          callback
        })
      );
    }
  }
  checkForm = () => {
    let {
      fullname,
      address,
      contact_number,
      city,
      state,
      postal_code,
      country,
      land_mark,
      latitude,
      longitude,
      delivery_area
    } = this.state;
    if (!fullname) {
      this.refs.toast.show('Please select a fullname', 500);
      return false;
    } else if (!address) {
      this.refs.toast.show('Please select your address', 500);
      return false;
    } else if (!contact_number) {
      this.refs.toast.show('Please enter your contact number', 500);
      return false;
    }

    
    // else if (!this.state.tag) {
    //     this.refs.toast.show("Please select your tag", 500)
    //     return false

    // }
    return true;
  };

  componentDidMount() {
    console.log(this.props.currentMember)
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed
    });
    this.loadTag();
  }

  loadTag = () => {
    if (this.state.tag != undefined) {
      let current_tag = this.state.tag.map((item) => {
        if (item.name == this.state.land_mark) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      });
      this.setState({ tag: current_tag });
    }
  };

  returnData(info) {
    this.setState({
      delivery_area: info.area
    });
  }
  returnAddress(info) {

    const latitude = this.props.location ? this.props.location.coords.latitude : null
    const longitude = this.props.location ? this.props.location.coords.longitude : null
    this.setState({
      address_detail: info.address_detail,
      address: info.address,
      city: info.city,
      state: info.state,
      postal_code: info.postal_code,
      country: info.country,
      latitude,
      longitude
    });
  }

  onBackPressed = () => {
    this.props.navigation.goBack();
  };
  onChangeDefaultAddress = (value) => {
    this.setState({ primary: value });
  };
  onSelectShippingArea = () => {
    const { navigate } = this.props.navigation;
    navigate('ShippingArea', {
      returnToRoute: this.props.navigation.state,
      returnData: this.returnData.bind(this)
    });
  };
  onSelectAddress = () => {
    const { navigate } = this.props.navigation;
    let { address, address_detail , delivery_area } = this.state;

    if (delivery_area) {
      navigate('MapShippingAddress', {
        returnToRoute: this.props.navigation.state,
        returnAddress: this.returnAddress.bind(this),
        addressInfo: {address, address_detail}
      });
    } else {
      this.refs.toast.show('Please select your area first', 500);
    }
  };
  onSelectTag = (item) => {
    const tag = this.state.tag
    let selectedTag = tag.map((tag) => {
      if (tag.name == item.name) {
        tag.selected = true;
      } else {
        tag.selected = false;
      }
      return tag;
    });
    this.setState({ tag: selectedTag, land_mark: item.name });
  };
  renderFormDetail = (
    title,
    value,
    placeholder,
    onChangeText,
    edit,
    selected,
    onPress
  ) => {
    let current_value = value == '' ? false : true;
    return (
      <View>
        <View style={styles.formDetail}>
          <Text style={styles.title}>{title}</Text>
          {!selected ? (
            edit ? (
              <TextInput
                defaultValue={value}
                keyboardType="default"
                clearButtonMode="always"
                autoCorrect={false}
                placeholder={placeholder}
                onChangeText={(text) => onChangeText(text)}
                value = {value}
                style={styles.textInput}
                editable={edit}
              />
            ) : (
              <Text>{current_value}</Text>
            )
          ) : (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                flex: 1,
                marginRight: 10 * alpha,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={onPress}
            >
              {current_value ? (
                <Text style={[styles.textInput]}>{value}</Text>
              ) : (
                <Text style={[styles.textInput, { color: LIGHT_GREY }]}>
                  {placeholder}
                </Text>
              )}
              <Image
                source={require('./../../assets/images/next.png')}
                style={styles.menuRowArrowImage}
              />
            </TouchableOpacity>
          )}
        </View>
        <Image
          source={require('./../../assets/images/line-17.png')}
          style={styles.seperatorImage}
        />
      </View>
    );
  };

  renderAddressForm = () => {
    let { address, address_detail } = this.state;
    return (
      <View>
        <View>
          <View style={styles.formDetail}>
            <Text style={styles.title}>Address</Text>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                flex: 1,
                marginRight: 10 * alpha,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={this.onSelectAddress}
            >
              {address ? (
                <Text style={[styles.textInput]}>{address}</Text>
              ) : (
                <Text style={[styles.textInput, { color: LIGHT_GREY }]}>
                  {'Line 1'}
                </Text>
              )}
              <Image
                source={require('./../../assets/images/next.png')}
                style={styles.menuRowArrowImage}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={require('./../../assets/images/line-17.png')}
            style={styles.seperatorImage}
          />
        </View>
        <View>
          <View style={styles.formDetail}>
            <Text style={styles.title}></Text>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                flex: 1,
                marginRight: 10 * alpha,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {address ? (
                <Text style={[styles.textInput]}>{address_detail}</Text>
              ) : (
                <Text style={[styles.textInput, { color: LIGHT_GREY }]}>
                  {'Line 2'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <Image
            source={require('./../../assets/images/line-17.png')}
            style={styles.seperatorImage}
          />
        </View>
      </View>
    );
  };
  renderPlaces = (item) => {
    let button_selected = item.selected ? PRIMARY_COLOR : 'lightgray';
    let text_selected = item.selected ? 'white' : 'black';
    return (
      <TouchableOpacity
        style={[styles.tagButton, { backgroundColor: button_selected }]}
        onPress={() => this.onSelectTag(item)}
      >
        <Text style={[styles.tagText, { color: text_selected }]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  renderTag = () => {
    return (
      <View>
        <View style={[styles.formDetail]}>
          <Text style={styles.title}>{'Tag'}</Text>

          <View style={styles.placesWrapperView}>
            <FlatList
              renderItem={({ item }) => this.renderPlaces(item)}
              data={this.state.tag}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              key={'THREE COLUMN'}
            />
          </View>
        </View>
        <Image
          source={require('./../../assets/images/line-17.png')}
          style={styles.seperatorImage}
        />
      </View>
    );
  };

  renderRadioForm = () => {
    return (
      <View>
        <View style={styles.formDetail}>
          <Text style={styles.title}>{'Gender'}</Text>

          <View style={styles.selectedradioView}>
            <RadioForm formHorizontal={true} animation={true}>
              {this.state.gender_options.map((obj, i) => {
                var onPress = (value, index) => {
                  this.setState({
                    gender: value,
                    genderIndex: index
                  });
                };
                return (
                  <RadioButton labelHorizontal={true} key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={this.state.gender === i}
                      onPress={onPress}
                      buttonInnerColor={PRIMARY_COLOR}
                      buttonOuterColor={
                        this.state.genderIndex === i ? '#00B2E3' : PRIMARY_COLOR
                      }
                      selectedButtonColor={'#00B2E3'}
                      buttonSize={5 * alpha}
                      buttonStyle={{
                        backgroundColor: 'rgb(200, 200, 200)',
                        borderWidth: 0,
                        marginRight: 5 * alpha,
                        marginTop: 2 * alpha
                      }}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      onPress={onPress}
                      labelStyle={{
                        color: 'rgb(135, 135, 135)',
                        fontSize: 13 * fontAlpha,
                        marginRight: 10 * alpha,
                        fontFamily: NON_TITLE_FONT
                      }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                );
              })}
            </RadioForm>
          </View>
        </View>
        <Image
          source={require('./../../assets/images/line-17.png')}
          style={styles.seperatorImage}
        />
      </View>
    );
  };

  render() {
    let current_area = this.state.delivery_area;
    let { fullname, contact_number } = this.state;
    let primary =
      this.state.primary == 0 ? DEFAULT_GREY_BACKGROUND : PRIMARY_COLOR;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.addAddressForm}>
            {this.renderFormDetail(
              'Receiver',
              fullname,
              '',
              (text) => this.onChangeName(text),
              true
            )}
            {/* {this.renderRadioForm()} */}
            {this.renderFormDetail(
              'Phone No.',
              contact_number,
              '01191291',
              (text) => this.onChangeContactNo(text),
              true
            )}
            {this.renderFormDetail(
              'Area',
              current_area,
              'Select area',
              (text) => this.onChangeAddress(text),
              true,
              true,
              () => this.onSelectShippingArea()
            )}
            {this.renderAddressForm()}
            {this.renderTag()}

            <View style={[styles.defaultAddressView]}>
              <Text style={[styles.title, { width: 100 * alpha }]}>
                Default address
              </Text>
              <SwitchSelector
                options={[
                  { label: '', value: 0 },
                  { label: '', value: 1 }
                ]}
                initial={this.state.primary}
                value={0}
                textColor={'#4E4D4D'}
                selectedColor={'#FFFFFF'}
                buttonColor={primary}
                borderColor={DEFAULT_GREY_BACKGROUND}
                hasPadding={true}
                backgroundColor={'#FFFFFF'}
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
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
        <Toast
          ref="toast"
          style={{ bottom: windowHeight / 2 }}
          textStyle={{ fontFamily: TITLE_FONT, color: '#ffffff' }}
        />
      </View>
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
  container: {
    flex: 1,
    backgroundColor: 'rgb(243, 243, 243)'
  },
  addAddressForm: {
    backgroundColor: 'white',
    paddingVertical: 10 * alpha,
    paddingHorizontal: 10 * alpha,
    marginHorizontal: 10 * alpha,
    marginTop: 20 * alpha,
    borderRadius: 10 * alpha,
    paddingBottom: 10 * alpha
  },
  textInput: {
    backgroundColor: 'transparent',
    padding: 0,
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    width: 193 * alpha,
    // height: 30 * alpha,
    flex: 1
  },
  formDetail: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10 * alpha,
    flex: 1
  },
  title: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    width: 75 * alpha,
    textAlign: 'left'
  },
  tagText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center'
  },
  seperatorImage: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    height: 3 * alpha
  },
  selectedradioView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  defaultAddressOption: {
    borderRadius: 10 * alpha,
    width: 50 * alpha,
    // height: 10 * alpha,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionText: {
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha
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
    textAlign: 'left'
  },
  placesWrapperView: {
    backgroundColor: 'transparent',
    // marginVertical: 10 * alpha,
    // width: windowWidth / 2,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  tagButton: {
    // width: 75 * alpha,
    paddingVertical: 5 * alpha,
    paddingHorizontal: 10 * alpha,
    backgroundColor: 'lightgray',
    borderRadius: 5 * alpha,
    // borderWidth: 1,
    // borderColor: PRIMARY_COLOR,
    marginRight: 5 * alpha,
    marginTop: 5 * alpha,
    alignItems: 'center'
  },
  menuRowArrowImage: {
    width: 10 * alpha,
    tintColor: 'rgb(195, 195, 195)',
    resizeMode: 'contain'
  }
});
