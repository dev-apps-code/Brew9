import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {alpha, fontAlpha, windowWidth} from '../Common/size';
import {connect} from 'react-redux';
import {Brew9Loading} from '../Components';
import {createAction} from '../Utils';
import UpdateShippingAddressObjectRequest from '../Requests/update_shipping_address_request_object';
import ShippingAddressRequestObject from '../Requests/get_shipping_address_request_object';
import _ from 'lodash';
import * as commonStyles from '../Common/common_style';
import Brew9Toast from '../Components/Brew9Toast';

const {TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR} = commonStyles;

@connect(({members}) => ({
  currentMember: members.profile,
  members: members,
  shippingAddress: members.shippingAddress,
}))
export default class ShippingAddress extends React.Component {
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
          Delivery Address
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

    const selected_address =
      props.navigation.state.params != null
        ? props.navigation.state.params.selected_address
        : null;
    this.state = {
      delivery_options: 'pickup',
      selected_address: selected_address,
      shippingAddress: [],
      isRefreshing: false,
    };
  }
  onBackPressed = () => {
    this.props.navigation.goBack();
  };

  loadShippingAddress = () => {
    let {dispatch, currentMember} = this.props;
    this.setState({loading: true});
    const callback = (eventObject) => {
      this.setState({
        loading: false,
      });
      if (eventObject.success) {
      } else {
        this.refs.toast.show(eventObject.message, 500);
      }
    };
    const obj = new ShippingAddressRequestObject();
    obj.setUrlId(currentMember.id);
    dispatch(
      createAction('members/loadShippingAddress')({
        object: obj,
        callback,
      }),
    );
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed,
    });
    this.loadShippingAddress();
  }

  componentDidUpdate(prevProps, prevState) {}
  onAddAddress = () => {
    const {navigation} = this.props;
    navigation.navigate('AddShippingAddress', {params: null});
  };
  onEditAddress = (item) => {
    const {navigation} = this.props;
    navigation.navigate('AddShippingAddress', {params: item});
  };
  onRefresh() {
    this.setState({
      isRefreshing: true,
    });
    this.loadShippingAddress(true);
  }
  onItemPress = (item) => {
    const {navigation, dispatch} = this.props;
    if (navigation.state.params.origin == undefined) {
      dispatch(createAction('members/savePrimaryShippingAddress')(item));
      navigation.navigate('Checkout');
      const shippingAddress = {
        member_id: this.props.currentMember.id,
        fullname: item.fullname,
        address: item.address,
        address_details: item.address_details,
        contact_number: item.contact_number,
        city: item.city,
        state: item.state,
        postal_code: item.postal_code,
        country: item.country,
        land_mark: item.land_mark,
        latitude: item.latitude,
        longitude: item.longitude,
        delivery_area: item.delivery_area,
        primary: true,
      };
      console.log(shippingAddress, item.id);
      this.loadUpdateProfile(shippingAddress, item.id);
    }
  };
  loadUpdateProfile(formData, address_id) {
    const {dispatch, currentMember, navigation} = this.props;
    const callback = (eventObject) => {};

    const obj = new UpdateShippingAddressObjectRequest(
      formData,
      currentMember.id,
    );
    obj.setUrlId(address_id);
    dispatch(
      createAction('members/updateShippingAddress')({
        object: obj,
        callback,
      }),
    );
  }

  getAddressIsSelected(item) {
    const {selected_address} = this.state;

    var address_selected = false;

    if (selected_address != null) {
      address_selected = selected_address.id == item.id;
    } else {
      address_selected = item.primary ? true : false;
    }
    return address_selected;
  }

  renderShippingAddress = (item) => {
    let selected = this.getAddressIsSelected(item)
      ? styles.selectTwoView
      : undefined;
    let primary = item.primary ? 'Primary' : '';
    return (
      <TouchableOpacity onPress={() => this.onItemPress(item)}>
        <View style={styles.content}>
          <View style={styles.shippingAddressDetail}>
            <View style={styles.selectView}>
              <View style={selected} />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 15 * alpha,
                paddingTop: 20 * alpha,
              }}>
              <Text style={styles.addressText}>{item.fullname}</Text>
              <Text style={styles.addressText}>{item.address}</Text>
            </View>

            <View style={{flex: 0.25, paddingTop: 10 * alpha}}>
              <Text style={styles.primaryText}>{primary}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.onEditAddress(item)}
            style={styles.editButton}>
            <Text style={styles.editTextButton}>Edit address</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  renderEmpty() {
    return (
      <View style={styles.orderView}>
        <View style={styles.noOrderView}>
          <View style={styles.centerView}>
            <Image
              source={require('./../../assets/images/delivery_icon.png')}
              style={styles.logoImage}
            />
            <View style={styles.messageView}>
              <Text style={styles.youHavenTMakeAnyText}>
                Oops. You haven't add any address yet{' '}
              </Text>
            </View>
            <TouchableOpacity
              onPress={this.onAddAddress}
              style={styles.noOrderAddButton}>
              <Text style={styles.addButtonText}>Add Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const {location, shippingAddress, navigation} = this.props;
    let {loading} = this.state;
    if (loading) {
      return <Brew9Loading />;
    } else {
      return (
        <View style={styles.Container}>
          {shippingAddress.length > 0 ? (
            <View style={{flex: 1}}>
              <ScrollView style={styles.scrollviewScrollView}>
                <Text style={styles.headingStyle}></Text>
                <FlatList
                  data={shippingAddress}
                  renderItem={({item}) => this.renderShippingAddress(item)}
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh.bind(this)}
                  keyExtractor={(item, index) => 'id-' + index}
                />
              </ScrollView>
              <TouchableOpacity onPress={this.onAddAddress}>
                <View style={styles.addButtonView}>
                  {/* <Image
                    source={require('./../../assets/images/add.png')}
                    style={styles.addButtonImage}
                  /> */}
                  <Text style={styles.addAddressText}>Add Address</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            this.renderEmpty()
          )}

          <Brew9Toast ref='toast' />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  navigationBarItem: {},
  Container: {
    flex: 1,
    backgroundColor: 'rgb(243, 243, 243)',
  },
  scrollviewScrollView: {
    paddingHorizontal: 20 * alpha,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    marginLeft: 8 * alpha,
  },
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
  },
  addButtonImage: {
    height: 14 * alpha,
    width: 14 * alpha,
    tintColor: 'white',
  },
  addButtonView: {
    margin: 30 * alpha,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 10 * alpha,
    borderRadius: 4 * alpha,
    height: 47 * alpha,
  },
  noOrderAddButton: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: PRIMARY_COLOR,
    marginTop: 20 * alpha,
    paddingVertical: 10 * alpha,
    paddingHorizontal: 10 * alpha,
    borderRadius: 4 * alpha,
    height: 40 * alpha,
    width: 150 * alpha,
  },
  addAddressText: {
    color: '#ffffff',
    fontSize: 14 * fontAlpha,
    fontFamily: TITLE_FONT,
    marginHorizontal: 10 * alpha,
  },
  selectedButton: {
    width: 18 * alpha,
    height: 18 * alpha,
    // flex: 0.5,
  },
  shippingAddressDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  editTextButton: {
    color: PRIMARY_COLOR,
    fontSize: 12 * fontAlpha,
    fontFamily: TITLE_FONT,
    // marginHorizontal: 10 * alpha
  },
  primaryText: {
    color: 'rgb(130, 130, 130)',
    fontSize: 12 * fontAlpha,
    fontFamily: TITLE_FONT,
    textAlign: 'right',
    flex: 1,
  },
  editButton: {
    alignItems: 'baseline',
    alignItems: 'flex-end',
    flex: 0.5,
    paddingBottom: 5 * alpha,
  },
  content: {
    backgroundColor: 'white',
    marginBottom: 10 * alpha,
    paddingHorizontal: 20 * alpha,
    // paddingVertical:10*alpha,
    borderRadius: 5 * alpha,
    // borderWidth: 0.5,
    // borderColor: LIGHT_GREY
  },
  headingStyle: {
    paddingTop: 5 * alpha,
  },
  addressText: {
    color: 'rgb(130, 130, 130)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    paddingBottom: 5 * alpha,
    // marginTop: 10 * alpha
  },
  selectView: {
    backgroundColor: 'transparent',
    borderRadius: 9 * alpha,
    borderWidth: 1 * alpha,
    borderColor: 'rgb(186, 183, 183)',
    borderStyle: 'solid',
    width: 14 * alpha,
    height: 14 * alpha,
    marginTop: 20 * alpha,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectTwoView: {
    backgroundColor: 'rgb(0, 178, 227)',
    borderRadius: 9 * alpha,
    width: 8 * alpha,
    height: 8 * alpha,
    // marginTop: 20 * alpha
  },
  centerView: {
    backgroundColor: 'transparent',
    width: 181 * alpha,
    height: 140 * alpha,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10 * alpha,
    flex: 1,
  },
  logoImage: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    width: 75 * alpha,
    height: 75 * alpha,
  },
  orderView: {
    backgroundColor: 'rgb(239, 239, 239)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noOrderView: {
    backgroundColor: 'white',
    borderRadius: 13 * alpha,
    height: windowWidth - 60 * alpha,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewView: {
    width: 185 * alpha,
  },
  messageView: {
    backgroundColor: 'transparent',
    width: windowWidth - 40 * alpha,
    height: 35 * alpha,
    alignItems: 'center',
  },
  youHavenTMakeAnyText: {
    color: 'rgb(134, 134, 134)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  orderButton: {
    backgroundColor: 'rgb(0, 178, 227)',
    borderRadius: 5 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 185 * alpha,
    height: 33 * alpha,
    marginBottom: 23 * alpha,
  },
  addButtonText: {
    color: 'rgb(254, 254, 254)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
});
