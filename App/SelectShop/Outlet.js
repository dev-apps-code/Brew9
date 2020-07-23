import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import React from 'react';
import { alpha, fontAlpha } from '../Common/size';
import { connect } from 'react-redux';
import ShopList from '../Components/ShopList';
import {
  TINT_COLOR,
  TABBAR_INACTIVE_TINT,
  TITLE_FONT,
  TAB_STYLE,
  LIGHT_GREY_BACKGROUND
} from '../Common/common_style';
import MapView from 'react-native-maps';
import { createAction } from '../Utils';
import AllShopsRequestObject from '../Requests/all_shops_request_object';
import {
  FavoriteShopsRequestObject,
  DeleteFavoriteRequestObject
} from '../Requests/favorite_shops_request_object';
import SelectShopRequestObject from '../Requests/select_shop_request_object';
import Brew9SlideUp from '../Components/Brew9SlideUp';
import NearestShopRequestObject from '../Requests/nearest_shop_request_object';

@connect(({ members, shops, orders }) => ({
  allShops: shops.allShops,
  companyId: members.company_id,
  nearbyShops: shops.nearbyShops,
  location: members.location
}))
export default class Outlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    isLoading: true,
    selectedArea: 'Brunei',
    showAreaView: false,
    showMap: true,
    list: [
      {
        district: 'Brunei-Muara',
        areas: ['Beribi', 'Gadong']
      },
      {
        district: 'davao',
        areas: ['Beribi', 'Gadong']
      },
      {
        district: 'cebu',
        areas: ['Beribi', 'Gadong']
      },
      {
        district: 'manila',
        areas: ['Beribi', 'Gadong']
      }
    ]
  });

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', this._didFocus);
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _didFocus = async () => {
    this.loadAllShops();
  };

  loadAllShops() {
    this.setState({ isLoading: true });
    const { companyId, dispatch, location } = this.props;

    const latitude = location != null ? location.coords.latitude : null;
    const longitude = location != null ? location.coords.longitude : null;

    const allShopsObject = new AllShopsRequestObject();
    allShopsObject.setUrlId(companyId);

    const nearbyShopsObject = new NearestShopRequestObject(latitude, longitude);
    nearbyShopsObject.setUrlId(companyId);

    // load all shops always
    dispatch(
      createAction('shops/loadAllShops')({
        object: allShopsObject,
        callback: this.updateShopsList
      })
    );

    if (latitude !== null && longitude !== null) {
      this.setState({ isLoading: true });

      // now load nearby shops
      dispatch(
        createAction('shops/loadNearbyShops')({
          object: nearbyShopsObject,
          callback: this.updateShopsList
        })
      );
    }
  }

  updateShopsList = (eventObject) => {
    this.setState({ isLoading: false });
  };

  toggleMap = () => {
    this.setState({
      showMap: !this.state.showMap
    });
  };

  toggleAreaView = () => {
    let { showAreaView } = this.state;
    this.setState({
      showAreaView: !showAreaView
    });
  };

  onPressFavourite = (id, isFavorite) => {
    this.setState({ isLoading: true });
    const { companyId, dispatch } = this.props;

    let object = null;
    let action = null;
    let params = null;

    const callback = this._onPressFavouriteCallback;

    if (!isFavorite) {
      object = new FavoriteShopsRequestObject(id);
      object.setUrlId(companyId);

      params = { object, callback };
      action = createAction('shops/loadMakeFavoriteShop')(params);
      dispatch(action);
    } else {
      object = new DeleteFavoriteRequestObject(id);
      object.setUrlId(companyId);

      params = { object, callback };
      action = createAction('shops/loadUnfavoriteShop')(params);
      dispatch(action);
    }
  };

  _onPressFavouriteCallback = (eventObject) => {
    this.setState({ isLoading: false });
    this.loadAllShops();
  };

  onPressOrderNow = (id) => {
    const object = new SelectShopRequestObject();
    object.setUrlId(this.props.companyId);
    object.setShopId(id);

    const callback = this.onPressOrderNowCallback;
    const params = { object, callback };
    const action = createAction('shops/selectShop')(params);

    this.props.dispatch(action);
  };

  onPressOrderNowCallback = (eventObject) => {
    if (eventObject.success) {
      this.props.navigation.navigate('Home');
    }
  };

  onAreaChosen = (area) => {
    if (area !== null) {
      this.setState({
        showAreaView: !this.state.showAreaView,
        selectedArea: area
      });
    } else {
      this.toggleAreaView();
    }
    //receive area here
  };

  searchFilter = (str) => {
    arr = [
      {
        id: 1,
        name: 'ブルー九 Flagship Store',
        short_address: 'The Walk, Beribi',
        longitude: '114.897994',
        latitude: '4.888659',
        phone_no: '242-6986',
        delivery_option: true,
        opening_hour: {
          start_time: '11:00',
          end_time: '23:00',
          order_start_time: '07:00',
          order_stop_time: '23:00'
        },
        district: 'Brunei-Muara',
        area: 'Beribi',
        proximity_meters: 886,
        open: true,
        favourite: true,
        kilometer_distance: 14.7,
        minute_drive: 18
      },
      {
        id: 2,
        name: 'ブルー九 Flagship Store',
        short_address: 'davao',
        longitude: '114.897994',
        latitude: '4.888659',
        phone_no: '242-6986',
        delivery_option: true,
        opening_hour: {
          start_time: '11:00',
          end_time: '23:00',
          order_start_time: '07:00',
          order_stop_time: '23:00'
        },
        district: 'Brunei-Muara',
        area: 'Beribi',
        proximity_meters: 886,
        open: true,
        favourite: true,
        kilometer_distance: 14.7,
        minute_drive: 18
      }
    ];
    let re = new RegExp(str, 'i');
    let r = [];

    for (let k in arr) {
      let flag =
        arr[k].short_address.match(re) ||
        arr[k].district.match(re) ||
        arr[k].area.match(re);

      if (flag) {
        r.push({
          id: arr[k].id,
          address:
            arr[k].short_address + ' ' + arr[k].district + ' ' + arr[k].area,
          area: arr[k].area
        });
      }
    }
    console.log(r);
    //r.area = area
    // return r;
  };

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.view_1}>
          <TouchableOpacity
            style={styles.button_1}
            onPress={this.toggleAreaView}
          >
            <Text style={styles.text_1}> {this.state.selectedArea} </Text>
            <Image
              source={require('./../../assets/images/next.png')}
              style={styles.rightArrowImage}
            />
          </TouchableOpacity>
          <View style={styles.searchView}>
            <Image
              source={require('./../../assets/images/search.png')}
              style={styles.searchImage}
            />
            {/* <Text style={styles.text_2}>search</Text>
             */}
            <TouchableOpacity onPress={() => console.log('Pressed')}>
              <TextInput
                pointerEvents="none"
                style={styles.searchInput}
                placeholder="search"
                onChangeText={(searchString) => this.searchFilter(searchString)}
                underlineColorAndroid="transparent"
              />
            </TouchableOpacity>
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
          <Text style={styles.text_2}>
            {this.state.showMap ? 'Hide Map' : 'Show map'}
          </Text>
          <Image
            source={
              this.state.showMap
                ? require('./../../assets/images/arrowUp.png')
                : require('./../../assets/images/arrowDown.png')
            }
            style={styles.mapToggleImage}
          />
        </TouchableOpacity>
        <ShopList
          shops={
            this.props.nearbyShops.length > 0
              ? this.props.nearbyShops
              : this.props.allShops
          }
          onPressFavourite={this.onPressFavourite}
          onPressOrderNow={this.onPressOrderNow}
          onRefresh={() => this.loadAllShops()}
          refreshing={this.state.isLoading}
        />
        <Brew9SlideUp
          locationList={this.state.list}
          visible={this.state.showAreaView}
          cancelable={true}
          title={'Exit App '}
          description={'exit the  application?'}
          okayButtonAction={() => {
            BackHandler.exitApp();
          }}
          onAreaChosen={this.onAreaChosen}
        />
      </View>
    );
  }
}

Outlet.navigationOptions = {
  tabBarOptions: {
    activeTintColor: TINT_COLOR,
    inactiveTintColor: TABBAR_INACTIVE_TINT,
    style: {
      backgroundColor: 'white'
    },
    labelStyle: {
      fontSize: 14 * fontAlpha,
      fontFamily: TITLE_FONT
    },
    tabStyle: TAB_STYLE,
    indicatorStyle: {
      backgroundColor: TINT_COLOR,
      width: '10%',
      left: '20%'
    },
    upperCaseLabel: false
  }
};

const styles = StyleSheet.create({
  //view
  mainView: {
    height: '100%',
    width: '100%',
    backgroundColor: LIGHT_GREY_BACKGROUND
  },
  view_1: {
    flexDirection: 'row',
    paddingVertical: alpha * 7,
    paddingHorizontal: alpha * 10,
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  mapView: {
    height: alpha * 160
  },
  searchView: {
    backgroundColor: '#F5F5F5',
    borderRadius: alpha * 21,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: alpha * 6,
    height: alpha * 33
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
    tintColor: '#C5C5C5'
  },

  searchImage: {
    width: 12 * alpha,
    height: 12 * alpha,
    tintColor: '#868686',
    marginRight: alpha * 6
  },
  mapToggleImage: {
    width: 10 * alpha,
    height: 5 * alpha,
    tintColor: '#BDBDBD',
    marginRight: alpha * 6
  },

  //button
  button_1: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  button_3: {
    height: alpha * 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },

  //txt
  text_1: {
    marginRight: alpha * 7,
    fontSize: fontAlpha * 12,
    fontFamily: TITLE_FONT,
    color: '#363636'
  },

  text_2: {
    fontSize: fontAlpha * 12,
    color: '#BDBDBD',
    marginRight: alpha * 4,
    fontFamily: TITLE_FONT
  },
  searchInput: {
    width: alpha * 50
  }
});
