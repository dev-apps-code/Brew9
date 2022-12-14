import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import SwitchSelector from 'react-native-switch-selector';
import {alpha, fontAlpha, windowHeight, windowWidth} from '../Common/size';
import {createAction} from '../Utils';
import SaveShippingAddressObjectRequest from '../Requests/save_shipping_address_request_object';
import UpdateShippingAddressObjectRequest from '../Requests/update_shipping_address_request_object';
import ShopTownRequestObject from '../Requests/shop_town_request_object';
import {
  TITLE_FONT,
  NON_TITLE_FONT,
  PRIMARY_COLOR,
  LIGHT_GREY,
  BUTTONBOTTOMPADDING,
  DEFAULT_GREY_BACKGROUND,
} from '../Common/common_style';
import ShippingDetail from './ShippingDetail';
import Brew9Toast from '../Components/Brew9Toast';

@connect(({members, shops}) => ({
  currentMember: members.profile,
  selectedShop: shops.selectedShop,
  company_id: members.company_id,
  location: members.location,
}))
class AddShippingAddress extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: (
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: TITLE_FONT,
          }}>
          Add Address
        </Text>
      ),
      headerTintColor: 'black',
      headerLeft: (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={params.onBackPressed ? params.onBackPressed : () => null}
            style={styles.navigationBarItem}>
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
        shadowOpacity: 0,
      },
    };
  };

  constructor(props) {
    super(props);
    this.address = this.props.navigation.state.params.params;

    if (this.address != null) {
      this.state = {
        fullname: this.address.fullname ? this.address.fullname : '',
        address: this.address.address ? this.address.address : '',
        address_details: this.address.address_details
          ? this.address.address_details
          : '',
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
          {label: 'Male', value: 0},
          {label: 'Female', value: 1},
        ],
        verification_code: '',
        gender: 2,
        genderIndex: 0,
        delivery_area: this.address.delivery_area
          ? this.address.delivery_area
          : '',
        primary: this.address.primary === true ? 1 : 0,
        tag: this.props.selectedShop.address_tags,
        showArea: false,
        tabTitles: ['District', 'Area'],
        defTab: 0,
        animation: new Animated.Value(0),
        populateTowns: false,
        populateAreas: false,
        chosenTown: 0,
        chosenArea: 0,
        isSaveDisabled: false,
      };
    } else {
      this.state = {
        address_details: '',
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
          {label: 'Male', value: 0},
          {label: 'Female', value: 1},
        ],
        verification_code: '',
        gender: 2,
        genderIndex: 0,
        tag: this.props.selectedShop.address_tags,
        showArea: false,
        tabTitles: ['District', 'Area'],
        defTab: 0,
        animation: new Animated.Value(0),
        populateTowns: false,
        populateAreas: false,
        chosenTown: 0,
        chosenArea: 0,
        isSaveDisabled: false,
      };
    }
  }

  //editing here

  handleOpen = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  handleClose = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    this.setState({
      showArea: false,
      populateTowns: true,
      populateAreas: false,
      defTab: 0,
    });
  };

  renderRow(record) {
    return (
      <View>
        <TouchableHighlight onPress={() => this._pressRow()}>
          <View>
            <Text>{record.nom}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  selectTown(index) {
    this.setState({
      chosenTown: index,
      showArea: true,
      populateTowns: false,
      populateAreas: true,
      defTab: 1,
    });
  }

  selectArea(index) {
    this.setState({
      chosenArea: index,
      delivery_area: this.state.town[this.state.chosenTown].areas[index].area,
    });
    this.handleClose();
  }

  //editing here
  onChangeName = (fullname) => {
    this.setState({fullname});
  };

  onChangeContactNo = (contact_number) => {
    this.setState({contact_number});
  };

  onSavePressed = () => {
    this.setState({
      isSaveDisabled: true,
    });
    const formcheck = this.checkForm();
    const primary = this.state.primary === 1 ? true : false;
    if (formcheck) {
      const shippingAddress = {
        member_id: this.props.currentMember.id,
        fullname: this.state.fullname,
        address: this.state.address,
        address_details: this.state.address_details,
        contact_number: this.state.contact_number,
        city: this.state.city,
        state: this.state.state,
        postal_code: this.state.postal_code,
        country: this.state.country,
        land_mark: this.state.land_mark,
        tag: this.state.land_mark,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        delivery_area: this.state.delivery_area,
        primary: primary,
      };
      console.log('onSavePressed ', shippingAddress);
      this.loadUpdateProfile(shippingAddress);
    }
  };

  loadUpdateProfile(formData) {
    const {dispatch, currentMember, navigation} = this.props;
    const isInitialAddress = this.props.navigation.state.params.initialAddress;
    const callback = (eventObject) => {
      this.setState({
        isSaveDisabled: false,
      });
      if (eventObject.success) {
        isInitialAddress
          ? navigation.navigate('Checkout')
          : navigation.navigate('ShippingAddress');
      } else {
        this.refs.toast.show(eventObject.message, 500);
      }
    };
    if (this.address == null) {
      const obj = new SaveShippingAddressObjectRequest(
        formData,
        currentMember.id,
      );
      obj.setUrlId(currentMember.id);
      dispatch(
        createAction('members/saveShippingAddress')({
          object: obj,
          callback,
        }),
      );
    } else {
      const obj = new UpdateShippingAddressObjectRequest(
        formData,
        currentMember.id,
      );
      obj.setUrlId(this.address.id);
      dispatch(
        createAction('members/updateShippingAddress')({
          object: obj,
          callback,
        }),
      );
    }
  }

  checkForm = () => {
    let {fullname, address, contact_number} = this.state;
    if (!fullname) {
      this.refs.toast.show('Please enter receiver name', 500);
      return false;
    } else if (!address) {
      this.refs.toast.show('Please enter your address', 500);
      return false;
    } else if (!contact_number) {
      this.refs.toast.show('Please enter contact number of the receiver', 500);
      return false;
    }

    // else if (!this.state.tag) {
    //     this.refs.toast.show("Please select your tag", 500)
    //     return false

    // }
    return true;
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed,
    });
    this.loadTag();
    this.loadShopTown();
  }

  loadShopTown = () => {
    let {dispatch, selectedShop} = this.props;
    this.setState({loading: true});
    const callback = (eventObject) => {
      if (eventObject.success) {
        this.setState({
          town: eventObject.result,
          populateTowns: true,
        });
      }
    };
    const obj = new ShopTownRequestObject();
    // obj.setUrlId(members.company_id);
    dispatch(
      createAction('shops/loadShopTown')({
        object: obj,
        callback,
      }),
    );
  };

  defaultTown = () => {
    this.setState({
      populateTowns: true,
      showArea: false,
      chosenTown: 0,
      populateAreas: false,
      defTab: 0,
    });
  };

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
      this.setState({tag: current_tag});
    }
  };

  returnData(info) {
    this.setState({
      delivery_area: info.area,
    });
  }

  returnAddress(info) {
    const latitude = this.props.location
      ? this.props.location.coords.latitude
      : null;
    const longitude = this.props.location
      ? this.props.location.coords.longitude
      : null;
    this.setState({
      address_details: info.address_details,
      address: info.address,
      city: info.city,
      state: info.state,
      postal_code: info.postal_code,
      country: info.country,
      latitude,
      longitude,
    });
  }

  onBackPressed = () => {
    this.props.navigation.goBack();
  };

  onChangeDefaultAddress = (value) => {
    this.setState({primary: value});
  };

  onSelectShippingArea = () => {
    const {navigate} = this.props.navigation;
    navigate('ShippingArea', {
      returnToRoute: this.props.navigation.state,
      returnData: this.returnData.bind(this),
    });
  };

  onSelectAddress = () => {
    const {navigate} = this.props.navigation;
    let {address, address_details, delivery_area} = this.state;

    if (delivery_area) {
      navigate('MapShippingAddress', {
        returnToRoute: this.props.navigation.state,
        returnAddress: this.returnAddress.bind(this),
        addressInfo: {address, address_details},
      });
    } else {
      this.refs.toast.show('Please select your area first', 500);
    }
  };

  onSelectTag = (item) => {
    const tag = this.state.tag;
    let selectedTag = tag.map((tag) => {
      if (tag.name == item.name) {
        tag.selected = true;
      } else {
        tag.selected = false;
      }
      return tag;
    });
    this.setState({tag: selectedTag, land_mark: item.name});
  };

  renderFormDetail = (
    title,
    value,
    placeholder,
    onChangeText,
    edit,
    selected,
    onPress,
    keyboardType,
  ) => (
    <ShippingDetail
      {...{
        title,
        value,
        placeholder,
        onChangeText,
        edit,
        selected,
        onPress,
        keyboardType,
      }}
    />
  );

  renderAddressForm = () => {
    let {address, address_details} = this.state;
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
                justifyContent: 'center',
              }}
              onPress={this.onSelectAddress}>
              {address ? (
                <Text style={[styles.textInput]}>{address}</Text>
              ) : (
                <Text style={[styles.textInput, {color: LIGHT_GREY}]}>
                  {'Select address'}
                </Text>
              )}
              <Image
                source={require('./../../assets/images/next.png')}
                style={styles.menuRowArrowImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.sectionSeperatorView2} />
        </View>
        {address_details ? (
          <View>
            <View style={styles.formDetail}>
              <Text style={styles.title}></Text>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  marginRight: 10 * alpha,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* {address_details ? ( */}
                <Text style={[styles.textInput]}>{address_details}</Text>
                {/* ) : null} */}
              </TouchableOpacity>
            </View>

            <View style={styles.sectionSeperatorView2} />
          </View>
        ) : null}
      </View>
    );
  };
  renderPlaces = ({item, index}) => {
    const button_selected = item.selected ? PRIMARY_COLOR : 'lightgray';
    const text_selected = item.selected ? 'white' : 'black';
    return (
      <TouchableOpacity
        style={[styles.tagButton, {backgroundColor: button_selected}]}
        onPress={() => this.onSelectTag(item)}>
        <Text style={[styles.tagText, {color: text_selected}]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  renderTags = () => {
    return (
      <View>
        <View style={[styles.formDetail]}>
          <Text style={styles.title}>{'Tag'}</Text>
          <View style={styles.placesWrapperView}>
            <FlatList
              renderItem={this.renderPlaces}
              data={this.state.tag}
              keyExtractor={(item, index) => `${item.name}`}
              numColumns={3}
            />
          </View>
        </View>

        <View style={styles.sectionSeperatorView2} />
      </View>
    );
  };

  toogleDeliveryArea = () => {
    const screenHeight = Dimensions.get('window').height;

    const backdrop = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 0.01],
            outputRange: [screenHeight, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
      opacity: this.state.animation.interpolate({
        inputRange: [0.01, 0.5],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    };

    const slideUp = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0.01, 1],
            outputRange: [0, -1 * screenHeight],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
    return (
      <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
        <SafeAreaView style={[styles.sheet]}>
          <Animated.View style={[styles.popup, slideUp]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10 * alpha,
              }}>
              <Text style={styles.PleaseSelectText}>Please select</Text>
              <TouchableOpacity
                onPress={this.handleClose}
                style={styles.cancelVoucherButton}>
                <Image
                  source={require('./../../assets/images/cancel.png')}
                  style={styles.cancelImage}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10 * alpha,
              }}>
              <View style={styles.sectionSeperatorView2} />
              {this.state.showArea == true ? (
                <TouchableOpacity
                  onPress={this.defaultTown}
                  style={styles.areaView}>
                  <Text style={[styles.townText]}>
                    {this.state.town[this.state.chosenTown].name}
                  </Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={styles.townView}
                onPress={this.defaultTown}>
                <Text style={[styles.townText, {color: PRIMARY_COLOR}]}>
                  {this.state.tabTitles[this.state.defTab]}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <ScrollView scrollsToTop={false}> */}
            <SafeAreaView style={{flex: 1}}>
              <ScrollView>
                {this.state.populateTowns
                  ? this.state.town.map((item, key) => {
                      return (
                        <View {...{key}} style={styles.itemView} key={key}>
                          <TouchableOpacity
                            onPress={() => this.selectTown(key)}>
                            <Text style={styles.itemText}>{item.name}</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })
                  : null}

                {this.state.populateAreas
                  ? this.state.town[this.state.chosenTown].areas.map(
                      (item, key) => {
                        return (
                          <View style={styles.itemView} key={key}>
                            <TouchableOpacity
                              onPress={() => this.selectArea(key)}>
                              <Text style={styles.itemText}>{item.area}</Text>
                            </TouchableOpacity>
                          </View>
                        );
                      },
                    )
                  : null}
              </ScrollView>
            </SafeAreaView>
            {/* </ScrollView> */}
          </Animated.View>
        </SafeAreaView>
      </Animated.View>
    );
  };

  render() {
    let current_area = this.state.delivery_area;
    let {fullname, contact_number} = this.state;
    let primary =
      this.state.primary == 0 ? DEFAULT_GREY_BACKGROUND : PRIMARY_COLOR;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.addAddressForm}>
            {this.renderFormDetail(
              'Receiver',
              fullname,
              'Name',
              (text) => this.onChangeName(text),
              true,
            )}

            {this.renderFormDetail(
              'Receiver No.',
              contact_number,
              '8851234',
              (text) => this.onChangeContactNo(text),
              true,
              false,
              () => {},
              'number-pad',
            )}

            {this.renderFormDetail(
              'Area',
              current_area,
              'Select area',
              (text) => console.log(text),
              true,
              true,
              () => this.handleOpen(),
            )}

            {this.renderAddressForm()}

            {this.renderTags()}

            <View style={[styles.defaultAddressView]}>
              <Text style={[styles.title, {width: 100 * alpha}]}>
                Primary address
              </Text>
              <SwitchSelector
                options={[
                  {label: '', value: 0},
                  {label: '', value: 1},
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
          disabled={this.state.isSaveDisabled}
          onPress={() => this.onSavePressed()}
          style={styles.saveButton}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
        {this.toogleDeliveryArea()}

        <Brew9Toast ref="toast" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    marginLeft: 8 * alpha,
    width: 70 * alpha,
  },
  cover: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  sheet: {
    position: 'absolute',
    top: Dimensions.get('window').height,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
  },
  popup: {
    backgroundColor: '#FFF',

    minHeight: windowHeight / 3,
    maxHeight: windowHeight / 2,
    padding: '3%',
  },
  cancelImage: {
    width: 18 * alpha,
    height: 18 * alpha,
    resizeMode: 'contain',
    tintColor: DEFAULT_GREY_BACKGROUND,
  },
  navigationBarItem: {
    width: '100%',
  },
  navigationBarItemTitle: {
    color: 'black',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
  },
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
    tintColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(243, 243, 243)',
  },
  addAddressForm: {
    backgroundColor: 'white',
    paddingVertical: 10 * alpha,
    paddingHorizontal: 10 * alpha,
    marginHorizontal: 10 * alpha,
    marginTop: 20 * alpha,
    borderRadius: 10 * alpha,
    paddingBottom: 10 * alpha,
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
    flex: 1,
  },
  formDetail: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10 * alpha,
    flex: 1,
  },
  areasDistrictsText: {
    fontSize: 14 * fontAlpha,
  },
  title: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    width: 75 * alpha,
    textAlign: 'left',
  },
  tagText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
  },
  seperatorImage: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    height: 3 * alpha,
  },
  selectedradioView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  defaultAddressOption: {
    borderRadius: 10 * alpha,
    width: 50 * alpha,
    // height: 10 * alpha,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha,
  },
  defaultAddressView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10 * alpha,
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
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
  },
  placesWrapperView: {
    backgroundColor: 'transparent',
    // marginVertical: 10 * alpha,
    // width: windowWidth / 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
    alignItems: 'center',
  },
  menuRowArrowImage: {
    width: 10 * alpha,
    tintColor: 'rgb(195, 195, 195)',
    resizeMode: 'contain',
  },
  PleaseSelectText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  townText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 15 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    paddingBottom: 10 * alpha,
  },
  townView: {
    borderBottomWidth: 1,
    marginRight: 10 * alpha,
    borderBottomColor: PRIMARY_COLOR,
  },
  areaView: {
    marginRight: 10 * alpha,
  },
  sectionSeperatorView: {
    backgroundColor: 'rgb(244, 244, 244)',
    position: 'absolute',
    alignSelf: 'flex-end',
    width: windowWidth - 40 * alpha,
    height: 1 * alpha,
    marginLeft: 10 * alpha,
  },
  sectionSeperatorView2: {
    backgroundColor: 'rgb(244, 244, 244)',
    // position: 'absolute',
    // alignSelf: 'flex-end',
    // width: windowWidth - 40 * alpha,
    height: 1 * alpha,
    // marginLeft: 10 * alpha
  },
  itemView: {
    paddingHorizontal: 10 * alpha,
  },
  itemText: {
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    paddingVertical: 5 * alpha,
  },
});

export default AddShippingAddress;
