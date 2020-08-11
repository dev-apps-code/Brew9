import {
  Animated,
  Easing,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { toLower } from 'lodash';
import { alpha, fontAlpha, windowWidth } from '../Common/size';
import ShopList from '../Components/ShopList';
import {
  TINT_COLOR,
  TABBAR_INACTIVE_TINT,
  TITLE_FONT,
  TAB_STYLE,
  LIGHT_GREY_BACKGROUND,
  NON_TITLE_FONT,
  TEXT_COLOR,
  DISABLED_COLOR,
  DEFAULT_BORDER_RADIUS
} from '../Common/common_style';
import { createAction } from '../Utils';
import AllShopsRequestObject from '../Requests/all_shops_request_object';
import {
  FavoriteShopsRequestObject,
  DeleteFavoriteRequestObject
} from '../Requests/favorite_shops_request_object';
import SelectShopRequestObject from '../Requests/select_shop_request_object';
import FilterView from './FilterShops';
import NearestShopRequestObject from '../Requests/nearest_shop_request_object';

const SEARCH_WIDTH = 80 * alpha;
const CANCEL_WIDTH = 60 * alpha;
const MAX_SEARCH_WIDTH = windowWidth - CANCEL_WIDTH - 20;
const FILTER_FIELD_WIDTH = 100;
const MAP_HEIGHT = 160 * alpha;

@connect(({ members, shops, orders }) => ({
  allShops: shops.allShops,
  companyId: members.company_id,
  nearbyShops: shops.nearbyShops,
  location: members.location,
  selectedShop: shops.selectedShop
}))
export default class Outlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
    this.filterView = new Animated.Value(100);
    this.searchWidth = new Animated.Value(SEARCH_WIDTH);
    this.mapHeight = new Animated.Value(MAP_HEIGHT);
  }

  _getState = () => ({
    isLoading: true,
    displayShopList: [],
    isSearching: false,
    searchResults: [],
    selectedArea: null,
    selectedAreaText: 'All',
    selectedDistrict: null,
    showAreaView: false,
    showMap: true,
    selectedShop: null,
    hasSearched: false
  });

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', this._didFocus);
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.keyboardWillHideListener.remove();
    this.keyboardWillShowListener.remove();
  }

  _didFocus = async () => {
    this.loadAllShops();
  };

  keyboardWillHide = () => {
    // this.resetSearchFieldWidth();
  };

  keyboardWillShow = () => {
    this.setState({ showMap: false });
  };

  async loadAllShops() {
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

    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (latitude !== null && longitude !== null && status === 'granted') {
      this.setState({ isLoading: true });

      // now load nearby shops
      dispatch(
        createAction('shops/loadNearbyShops')({
          object: nearbyShopsObject,
          callback: this.updateShopsList
        })
      );
    } else {
      dispatch(createAction('shops/clearNearbyShops')());
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

  getLiveLocation = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status === 'granted') {
      Location.watchPositionAsync(
        {
          distanceInterval: 1000,
          timeInterval: 10000
        },
        (location) => {
          this.props.dispatch(createAction('members/setLocation')(location));
        }
      );
    }
  };

  onPressOrderNow = async (id) => {
    const { location } = this.props;
    const latitude = location != null ? location.coords.latitude : null;
    const longitude = location != null ? location.coords.longitude : null;

    if (latitude !== null && longitude !== null) {
      const object = new SelectShopRequestObject(latitude, longitude);

      object.setUrlId(this.props.companyId);
      object.setShopId(id);

      const callback = this.onPressOrderNowCallback;
      const params = { object, callback };
      const action = createAction('shops/selectShop')(params);
      this.props.dispatch(action);
    } else {
      const object = new SelectShopRequestObject();
      object.setUrlId(this.props.companyId);
      object.setShopId(id);

      const callback = this.onPressOrderNowCallback;
      const params = { object, callback };
      const action = createAction('shops/selectShop')(params);
      this.props.dispatch(action);
    }
  };

  onPressShop = (data) => {
    this.setState({
      selectedShop: data
    });
  };

  onPressOrderNowCallback = (eventObject) => {
    const {
      dispatch,
      navigation: { navigate }
    } = this.props;

    if (eventObject.success) {
      dispatch(createAction('orders/resetCart')());
      navigate('Home');
    }
  };

  onAreaChosen = (area, district) => {
    if (area == 'All') {
      let selectedAreaText = district + ' > ' + area;
      let { allShops } = this.props;
      var newArray = allShops.filter(function (obj) {
        return obj.district == district;
      });
      this.setState({
        selectedDistrict: district,
        selectedArea: area,
        selectedAreaText,
        displayShopList: newArray,
        selectedShop: newArray[0]
      });
    } else if (area == null) {
      this.setState({
        displayShopList: [],
        selectedDistrict: null,
        selectedArea: null,
        selectedAreaText: 'All'
      });
    } else {
      let selectedAreaText = district + ' > ' + area;
      let { allShops } = this.props;
      var newArray = allShops.filter(function (obj) {
        return obj.area == area;
      });
      this.setState({
        selectedArea: area,
        selectedAreaText,
        selectedDistrict: district,
        displayShopList: newArray,
        selectedShop: newArray[0]
      });
    }
  };

  searchFilter = (str) => {
    const shops = this.props.allShops.filter(
      ({ area, district, name, short_address }) =>
        toLower(name).includes(str) ||
        toLower(area).includes(str) ||
        toLower(short_address).includes(str) ||
        toLower(district).includes(str)
    );

    this.setState({
      isSearching: true,
      hasSearched: true,
      searchResults: shops
    });
  };

  onPressCancel = () => {
    Keyboard.dismiss();
    this.refs.searchInput.clear();
    this.resetSearchFieldWidth();
    this.setState({
      isSearching: false,
      hasSearched: false,
      searchResults: []
    });
  };

  onFocusSearchField = () => {
    const animation = Animated.timing(this.searchWidth, {
      toValue: MAX_SEARCH_WIDTH,
      duration: 300,
      easing: Easing.linear
    }).start();

    this.setState({ isSearching: true, hasSearched: false }, animation);
  };

  resetSearchFieldWidth = () => {
    Animated.timing(this.searchWidth, {
      toValue: alpha * 80,
      duration: 500,
      easing: Easing.linear
    }).start();
  };

  renderFilterButton() {
    const maxRangeWidth = MAX_SEARCH_WIDTH - FILTER_FIELD_WIDTH;
    const newLeft = this.searchWidth.interpolate({
      inputRange: [
        0,
        maxRangeWidth * 0.25,
        maxRangeWidth * 0.5,
        maxRangeWidth * 0.75,
        maxRangeWidth
      ],
      outputRange: [100, 100, 100, 100, -100]
    });

    Animated.timing(this.filterView, {
      toValue: newLeft,
      duration: 120,
      easing: Easing.linear
    }).start();

    return (
      <Animated.View
        style={{
          left: this.filterView,
          justifyContent: 'center'
          // maxWidth: FILTER_FIELD_WIDTH
        }}
      >
        <TouchableOpacity
          style={styles.filterButton}
          onPress={this.toggleAreaView}
        >
          <Text style={styles.filterAreaText}>
            {this.state.selectedAreaText}
          </Text>
          <Image
            source={require('./../../assets/images/next.png')}
            style={styles.rightArrowImage}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  moveSelectionToTop(shops) {
    const list = [...shops];
    const { selectedShop } = this.props;
    if (selectedShop !== null) {
      const { id } = selectedShop;
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          var a = list.splice(i, 1); // removes the item
          list.unshift(a[0]); // adds it back to the beginning
          break;
        }
      }
    }
    return list;
  }

  renderMap(shops) {
    let { selectedShop } = this.state;
    let { allShops } = this.props;
    let latitude,
      longitude,
      shopName = null;
    let recentShop = shops[0];

    if (selectedShop) {
      latitude = parseFloat(selectedShop.latitude);
      longitude = parseFloat(selectedShop.longitude);
      shopName = selectedShop.name;
    } else if (recentShop) {
      latitude = parseFloat(recentShop.latitude);
      longitude = parseFloat(recentShop.longitude);
      shopName = recentShop.name;
    } else {
      return null;
    }

    if (this.state.showMap) {
      return (
        <Animated.View style={styles.mapView}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004
            }}
            onMapReady={() =>
              this.marker &&
              this.marker.showCallout &&
              this.marker.showCallout()
            }
          >
            {/* <MapView.Marker
              ref={(shopName) => (this.marker = shopName)}
              coordinate={{
                latitude: latitude,
                longitude: longitude
              }}
              title={shopName}
            /> */}
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude
              }}
              style={{ alignItems: 'center' }}
            >
              <View style={styles.areaBubble}>
                <Text style={styles.areaText}>{shopName}</Text>
              </View>
              <Image
                source={require('./../../assets/images/location.png')}
                style={styles.pinImage}
                resizeMode="contain"
              />
            </Marker>
          </MapView>
        </Animated.View>
      );
    }
  }

  renderSearchField() {
    const opacity = this.searchWidth.interpolate({
      inputRange: [SEARCH_WIDTH, MAX_SEARCH_WIDTH],
      outputRange: [0, 1]
    });
    const right = this.searchWidth.interpolate({
      inputRange: [SEARCH_WIDTH, MAX_SEARCH_WIDTH],
      outputRange: [0, CANCEL_WIDTH]
    });
    return (
      <Animated.View
        style={[styles.searchView, { width: this.searchWidth, right }]}
      >
        <View style={styles.searchField}>
          <Image
            source={require('./../../assets/images/search.png')}
            style={styles.searchImage}
          />
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
              // pointerEvents="none"
              ref="searchInput"
              placeholder="Search"
              onFocus={this.onFocusSearchField}
              onChangeText={(text) => this.searchFilter(text)}
              placeholderTextColor={DISABLED_COLOR}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        </View>
        <Animated.View style={[styles.cancelSearchContainer, { opacity }]}>
          <TouchableOpacity
            onPress={this.onPressCancel}
            style={[styles.cancelSearchButton]}
          >
            <Animated.Text style={styles.cancelSearchText}>
              Cancel
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }

  getShopsList = () => {
    const { allShops, nearbyShops } = this.props;
    const {
      displayShopList,
      isSearching,
      hasSearched,
      searchResults
    } = this.state;

    if (isSearching && hasSearched) return searchResults;
    if (displayShopList.length > 0) return displayShopList;
    if (nearbyShops.length > 0) return nearbyShops;
    return allShops;
  };

  render() {
    const shops = this.moveSelectionToTop(this.getShopsList());
    const { isSearching, hasSearched } = this.state;
    return (
      <View style={styles.mainView}>
        <View style={styles.subHeaderView}>
          {this.renderFilterButton()}
          {this.renderSearchField()}
        </View>
        {this.renderMap(shops)}
        {/* <Brew9DropDown
          results={this.state.searchResults}
          onPressResult={this.onS}
        /> */}
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
            resizeMode="contain"
            style={styles.mapToggleImage}
          />
        </TouchableOpacity>
        <ShopList
          {...{ shops, isSearching, hasSearched }}
          onPressFavourite={this.onPressFavourite}
          onPressOrderNow={this.onPressOrderNow}
          onRefresh={() => this.loadAllShops()}
          onPressShop={this.onPressShop}
          refreshing={this.state.isLoading}
        />
        <FilterView
          locationList={this.props.allShops}
          visible={this.state.showAreaView}
          cancelable={true}
          title={'Exit App '}
          description={'exit the  application?'}
          okayButtonAction={() => {
            BackHandler.exitApp();
          }}
          selectedArea={this.state.selectedArea}
          selectedDistrict={this.state.selectedDistrict}
          onAreaChosen={this.onAreaChosen}
          toggleAreaView={this.toggleAreaView}
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
      backgroundColor: 'white',
      padding: 0
    },
    labelStyle: {
      fontSize: 16 * fontAlpha,
      fontFamily: TITLE_FONT,
      margin:0
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
  subHeaderView: {
    flexDirection: 'row',
    paddingVertical: alpha * 7,
    paddingHorizontal: alpha * 10,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: windowWidth + 100,
    position: 'relative',
    left: -100,
    right: 0,
    zIndex: 1
  },
  mapView: {
    height: alpha * 160
  },
  searchView: {
    borderRadius: alpha * 21,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: alpha * 6,
    height: alpha * 33,
    position: 'relative',
    right: 0
  },
  searchField: {
    backgroundColor: '#F5F5F5',
    borderRadius: alpha * 21,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: alpha * 6,
    height: alpha * 33,
    position: 'absolute',
    left: 0,
    right: 0
  },
  cancelSearchContainer: {
    borderRadius: alpha * 21,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: alpha * 6,
    height: alpha * 33,
    width: CANCEL_WIDTH,
    position: 'absolute',
    right: -CANCEL_WIDTH
  },
  cancelSearchButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6 * alpha,
    justifyContent: 'center'
  },
  cancelSearchText: {
    color: '#363636',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    textAlign: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  view_2: {
    flex: 1,
    width: '100%',
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
  filterButton: {
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
  filterAreaText: {
    marginRight: alpha * 7,
    fontSize: fontAlpha * 12,
    fontFamily: TITLE_FONT,
    color: '#363636',
    flexWrap: 'wrap'
  },

  text_2: {
    fontSize: fontAlpha * 12,
    color: '#BDBDBD',
    marginRight: alpha * 4,
    fontFamily: TITLE_FONT
  },
  areaBubble: {
    backgroundColor: 'white',
    borderRadius: DEFAULT_BORDER_RADIUS,
    marginBottom: alpha * 2,
    borderWidth: 1,
    borderColor: '#00B2E3'
  },
  areaText: {
    fontFamily: TITLE_FONT,
    fontSize: fontAlpha * 14,
    margin: alpha * 5
  },
  pinImage: {
    width: 20 * alpha,
    height: 20 * alpha,
    tintColor: '#00B2E3'
  }
});
