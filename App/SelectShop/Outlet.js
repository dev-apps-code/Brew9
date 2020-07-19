import {
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Linking,
  SafeAreaView
} from 'react-native';
import React from 'react';
import { alpha, fontAlpha, windowHeight } from '../Common/size';
import { connect } from 'react-redux';
import ShopList from '../Components/ShopList';

import {
  TITLE_FONT,
  NON_TITLE_FONT,
  BUTTONBOTTOMPADDING,
  DEFAULT_GREY_BACKGROUND,
  PRIMARY_COLOR,
  TOAST_DURATION,
  LIGHT_GREY
} from '../Common/common_style';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
@connect(({ members, shops, orders }) => ({
  company_id: members.company_id,
  currentMember: members.profile,
  members: members,
  selectedShop: shops.selectedShop,
  cart_total_quantity: orders.cart_total_quantity,
  promotion_trigger_count: orders.promotion_trigger_count,
  cart: orders.cart,
  cart_order_id: orders.cart_order_id,
  promotions: orders.promotions,
  promotion_ids: orders.promotion_ids,
  cart_total: orders.cart_total,
  discount_cart_total: orders.discount_cart_total,
  location: members.location,
  delivery: members.delivery,
  shippingAddress: members.shippingAddress
}))
export default class Outlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: true,
      shopList: [
        {
          id: 3,
          name: 'Bunny Good',
          short_address: '404 Ward Street',
          longitude: '114.89',
          latitude: '4.8',
          district: 'Brunei-Muara',
          area: 'Area A',
          proximity_meters: null,
          open: true
        },
        {
          id: 1,
          name: 'ブルー九 Flagship Store',
          short_address: 'The Walk, Beribi',
          longitude: '114.897994',
          latitude: '4.888659',
          district: 'No district',
          area: 'No area',
          proximity_meters: null,
          open: true
        },
        {
          id: 1,
          name: 'ブルー九 Flagship Store',
          short_address: 'The Walk, Beribi',
          longitude: '114.897994',
          latitude: '4.888659',
          district: 'No district',
          area: 'No area',
          proximity_meters: null,
          open: true
        },
        {
          id: 1,
          name: 'ブルー九 Flagship Store',
          short_address: 'The Walk, Beribi',
          longitude: '114.897994',
          latitude: '4.888659',
          district: 'No district',
          area: 'No area',
          proximity_meters: null,
          open: true
        },
        {
          id: 1,
          name: 'ブルー九 Flagship Store',
          short_address: 'The Walk, Beribi',
          longitude: '114.897994',
          latitude: '4.888659',
          district: 'No district',
          area: 'No area',
          proximity_meters: null,
          open: true
        }
      ]
    };
  }

  toggleMap = () => {
    console.log(this.state.showMap);
    this.setState({
      showMap: !this.state.showMap
    });
  };

  componentDidMount() {}
  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.view_1}>
          <TouchableOpacity style={styles.button_1}>
            <Text style={styles.text_1}> Brunei </Text>
            <Image
              source={require('./../../assets/images/next.png')}
              style={styles.rightArrowImage}
            />
          </TouchableOpacity>
          <View style={styles.searchView}>
            <Image
              source={require('./../../assets/images/next.png')}
              style={styles.searchImage}
            />
            <Text style={styles.text_2}>Search</Text>
          </View>
        </View>
        {this.state.showMap ? (
          <View style={styles.mapView}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
              }}
            />
          </View>
        ) : null}
        <TouchableOpacity style={styles.button_3} onPress={this.toggleMap}>
          <Text style={styles.text_3}>
            {this.state.showMap ? 'Hide Map' : 'Show map'}
          </Text>
          <Image
            source={
              this.state.showMap
                ? require('./../../assets/images/bitmap-15.png')
                : require('./../../assets/images/bitmap-14.png')
            }
            style={styles.searchImage}
          />
        </TouchableOpacity>
        {/* <View style={styles.view_2}>

        </View> */}
        <ShopList shopList={this.state.shopList} />
      </View>
    );
  }
}

Outlet.navigationOptions = {
  tabBarOptions: {
    activeTintColor: 'skyblue',
    inactiveTintColor: 'black',
    style: {
      backgroundColor: 'white'
    },
    tabStyle: {
      height: alpha * 5,
      marginBottom: alpha * 4
    },
    labelStyle: {},
    indicatorStyle: {
      backgroundColor: 'skyblue',
      width: '10%',
      left: '20%'
    }
  }
};

const styles = StyleSheet.create({
  //view
  mainView: {
    height: '100%',
    width: '100%',
    backgroundColor: DEFAULT_GREY_BACKGROUND
  },
  view_1: {
    flexDirection: 'row',
    height: alpha * 40,
    // borderColor: 'black',
    // borderWidth: 1,
    justifyContent: 'space-between',
    paddingVertical: alpha * 5,
    backgroundColor: 'white'
  },
  mapView: {
    height: alpha * 160
    // width: '100%',
    // borderWidth: 1,
    // borderColor: 'black'
  },
  searchView: {
    backgroundColor: 'rgb(240,240,240)',
    width: alpha * 70,
    marginRight: alpha * 10,
    borderRadius: alpha * 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  view_2: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  //image
  rightArrowImage: {
    width: 9 * alpha,
    height: 9 * alpha,
    // tintColor: 'rgb(240,240,240)'
    tintColor: LIGHT_GREY
  },

  searchImage: {
    width: 9 * alpha,
    height: 9 * alpha,
    tintColor: '#4E4D4D',
    marginRight: alpha * 5
  },

  //button
  button_1: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    marginLeft: alpha * 10
  },

  button_3: {
    height: alpha * 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },

  //txt1
  text_1: {
    marginRight: alpha * 5,
    fontSize: alpha * 11
  },
  text_2: {
    color: '#4E4D4D',
    fontSize: alpha * 11
  },
  text_3: {
    fontSize: alpha * 11,
    color: '#4E4D4D',
    marginRight: alpha * 5
  }
});
