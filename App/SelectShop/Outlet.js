import {
  Animated,
  BackHandler,
  Easing,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {connect} from 'react-redux';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {toLower} from 'lodash';
import FilterView from './FilterShops';
import {
  alpha,
  fontAlpha,
  windowWidth,
  TINT_COLOR,
  TABBAR_INACTIVE_TINT,
  TITLE_FONT,
  TAB_STYLE,
  LIGHT_GREY_BACKGROUND,
  NON_TITLE_FONT,
  DISABLED_COLOR,
  DEFAULT_BORDER_RADIUS,
} from '@common';
import {ShopList} from '@components';
import {createAction} from '@utils';
import {
  AllShopsRequestObject,
  FavoriteShopsRequestObject,
  DeleteFavoriteRequestObject,
  SelectShopRequestObject,
  NearestShopRequestObject,
} from '@requests';

const SEARCH_WIDTH = 80 * alpha;
const CANCEL_WIDTH = 60 * alpha;
const MAX_SEARCH_WIDTH = windowWidth - CANCEL_WIDTH - 20;
const FILTER_FIELD_WIDTH = 100;
const MAP_HEIGHT = 160 * alpha;

@connect(({members, shops, orders}) => ({
  allShops: shops.allShops,
  companyId: members.company_id,
  nearbyShops: shops.nearbyShops,
  location: members.location,
  selectedShop: shops.selectedShop,
}))
class Outlet extends React.Component {
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
    hasSearched: false,
    locationPermissionStatus: false,
  });

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', this._didFocus);
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
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
    this.setState({showMap: false});
  };

  async loadAllShops() {
    this.setState({isLoading: true});
    const {companyId, dispatch, location} = this.props;

    const latitude = location !== null ? location.coords.latitude : null;
    const longitude = location !== null ? location.coords.longitude : null;

    const allShopsObject = new AllShopsRequestObject();
    allShopsObject.setUrlId(companyId);

    const nearbyShopsObject = new NearestShopRequestObject(latitude, longitude);
    nearbyShopsObject.setUrlId(companyId);

    // load all shops always
    dispatch(
      createAction('shops/loadAllShops')({
        object: allShopsObject,
        callback: this.updateShopsList,
      }),
    );

    const {status} = await Permissions.getAsync(Permissions.LOCATION);
    if (latitude !== null && longitude !== null && status === 'granted') {
      this.setState({isLoading: true, locationPermissionStatus: true});

      // now load nearby shops
      dispatch(
        createAction('shops/loadNearbyShops')({
          object: nearbyShopsObject,
          callback: this.updateShopsList,
        }),
      );
    } else {
      this.setState({locationPermissionStatus: false});
      dispatch(createAction('shops/clearNearbyShops')());
    }
  }

  updateShopsList = (eventObject) => {
    this.setState({isLoading: false});
  };

  toggleMap = () => {
    this.setState({
      showMap: !this.state.showMap,
    });
  };

  toggleAreaView = () => {
    let {showAreaView} = this.state;
    this.setState({
      showAreaView: !showAreaView,
    });
  };

  onPressFavourite = (id, isFavorite) => {
    this.setState({isLoading: true});
    const {companyId, dispatch} = this.props;

    let object = null;
    let action = null;
    let params = null;

    const callback = this._onPressFavouriteCallback;

    if (!isFavorite) {
      object = new FavoriteShopsRequestObject(id);
      object.setUrlId(companyId);

      params = {object, callback};
      action = createAction('shops/loadMakeFavoriteShop')(params);
      dispatch(action);
    } else {
      object = new DeleteFavoriteRequestObject(id);
      object.setUrlId(companyId);

      params = {object, callback};
      action = createAction('shops/loadUnfavoriteShop')(params);
      dispatch(action);
    }
  };

  _onPressFavouriteCallback = (eventObject) => {
    this.setState({isLoading: false});
    this.loadAllShops();
  };

  getLiveLocation = async () => {
    const {status} = await Permissions.getAsync(Permissions.LOCATION);

    if (status === 'granted') {
      Location.watchPositionAsync(
        {
          distanceInterval: 1000,
          timeInterval: 10000,
        },
        (location) => {
          this.props.dispatch(createAction('members/setLocation')(location));
        },
      );
    }
  };

  onPressOrderNow = async (id) => {
    const {location} = this.props;
    const latitude = location !== null ? location.coords.latitude : null;
    const longitude = location !== null ? location.coords.longitude : null;

    if (latitude !== null && longitude !== null) {
      const object = new SelectShopRequestObject(latitude, longitude);

      object.setUrlId(this.props.companyId);
      object.setShopId(id);

      const callback = this.onPressOrderNowCallback;
      const params = {object, callback};
      const action = createAction('shops/selectShop')(params);
      this.props.dispatch(action);
    } else {
      const object = new SelectShopRequestObject();
      object.setUrlId(this.props.companyId);
      object.setShopId(id);

      const callback = this.onPressOrderNowCallback;
      const params = {object, callback};
      const action = createAction('shops/selectShop')(params);
      this.props.dispatch(action);
    }
  };

  onPressShop = (data) => {
    this.setState({
      selectedShop: data,
    });
  };

  onPressOrderNowCallback = (eventObject) => {
    const {
      dispatch,
      navigation: {navigate},
    } = this.props;

    if (eventObject.success) {
      dispatch(createAction('orders/resetCart')());
      navigate('Home');
    }
  };

  onAreaChosen = (area, district) => {
    if (area === 'All') {
      let selectedAreaText = district + ' > ' + area;
      let {allShops} = this.props;
      var newArray = allShops.filter(function (obj) {
        return obj.district === district;
      });
      this.setState({
        selectedDistrict: district,
        selectedArea: area,
        selectedAreaText,
        displayShopList: newArray,
        selectedShop: newArray[0],
      });
    } else if (area === null) {
      this.setState({
        displayShopList: [],
        selectedDistrict: null,
        selectedArea: null,
        selectedAreaText: 'All',
      });
    } else {
      let selectedAreaText = district + ' > ' + area;
      let {allShops} = this.props;
      var newArray = allShops.filter(function (obj) {
        return obj.area === area;
      });
      this.setState({
        selectedArea: area,
        selectedAreaText,
        selectedDistrict: district,
        displayShopList: newArray,
        selectedShop: newArray[0],
      });
    }
  };

  searchFilter = (str) => {
    const shops = this.props.allShops.filter(
      ({area, district, name, short_address}) =>
        toLower(name).includes(str) ||
        toLower(area).includes(str) ||
        toLower(short_address).includes(str) ||
        toLower(district).includes(str),
    );

    this.setState({
      isSearching: true,
      hasSearched: true,
      searchResults: shops,
    });
  };

  onPressCancel = () => {
    Keyboard.dismiss();
    this.searchInput.clear();
    this.resetSearchFieldWidth();
    this.setState({
      isSearching: false,
      hasSearched: false,
      searchResults: [],
    });
  };

  onFocusSearchField = () => {
    const animation = Animated.timing(this.searchWidth, {
      toValue: MAX_SEARCH_WIDTH,
      duration: 300,
      easing: Easing.linear,
    }).start();

    this.setState({isSearching: true, hasSearched: false}, animation);
  };

  resetSearchFieldWidth = () => {
    Animated.timing(this.searchWidth, {
      toValue: alpha * 80,
      duration: 500,
      easing: Easing.linear,
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
        maxRangeWidth,
      ],
      outputRange: [100, 100, 100, 100, -100],
    });

    Animated.timing(this.filterView, {
      toValue: newLeft,
      duration: 120,
      easing: Easing.linear,
    }).start();

    return (
      <Animated.View style={styles.filterButtonContainer}>
        <TouchableOpacity
          onPress={this.toggleAreaView}
          style={styles.filterButton}>
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
    const {selectedShop} = this.props;
    if (selectedShop !== null) {
      const {id} = selectedShop;
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
    let {selectedShop} = this.state;

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
            onMapReady={() =>
              this.marker &&
              this.marker.showCallout &&
              this.marker.showCallout()
            }
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004,
            }}
            style={styles.map}>
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              style={styles.center}>
              <View style={styles.areaBubble}>
                <Text style={styles.areaText}>{shopName}</Text>
              </View>
              <Image
                resizeMode="contain"
                source={require('./../../assets/images/location.png')}
                style={styles.pinImage}
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
      outputRange: [0, 1],
    });
    const right = this.searchWidth.interpolate({
      inputRange: [SEARCH_WIDTH, MAX_SEARCH_WIDTH],
      outputRange: [0, CANCEL_WIDTH],
    });
    return (
      <Animated.View
        style={[styles.searchView, {width: this.searchWidth, right}]}>
        <View style={styles.searchField}>
          <Image
            source={require('./../../assets/images/search.png')}
            style={styles.searchImage}
          />
          <View style={styles.searchInputContainer}>
            <TextInput
              // pointerEvents="none"
              autoCapitalize="none"
              onChangeText={(text) => this.searchFilter(text)}
              onFocus={this.onFocusSearchField}
              placeholder="Search"
              placeholderTextColor={DISABLED_COLOR}
              ref={(ref) => (this.searchInput = ref)}
              style={styles.searchFieldInput}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        <Animated.View style={[styles.cancelSearchContainer, {opacity}]}>
          <TouchableOpacity
            onPress={this.onPressCancel}
            style={[styles.cancelSearchButton]}>
            <Animated.Text style={styles.cancelSearchText}>
              Cancel
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }

  getShopsList = () => {
    const {allShops, nearbyShops} = this.props;
    const {
      displayShopList,
      isSearching,
      hasSearched,
      searchResults,
    } = this.state;

    if (isSearching && hasSearched) {
      return searchResults;
    }
    if (displayShopList.length > 0) {
      return displayShopList;
    }
    if (nearbyShops.length > 0) {
      return nearbyShops;
    }
    return allShops;
  };

  render() {
    const shops = this.moveSelectionToTop(this.getShopsList());
    const {isSearching, hasSearched, locationPermissionStatus} = this.state;
    return (
      <View style={styles.mainView}>
        <View style={styles.subHeaderView}>
          {this.renderFilterButton()}
          {this.renderSearchField()}
        </View>
        {this.renderMap(shops)}
        <TouchableOpacity onPress={this.toggleMap} style={styles.button_3}>
          <Text style={styles.text_2}>
            {this.state.showMap ? 'Hide Map' : 'Show map'}
          </Text>
          <Image
            resizeMode="contain"
            source={
              this.state.showMap
                ? require('./../../assets/images/arrowUp.png')
                : require('./../../assets/images/arrowDown.png')
            }
            style={styles.mapToggleImage}
          />
        </TouchableOpacity>
        <ShopList
          {...{shops, isSearching, hasSearched, locationPermissionStatus}}
          onPressFavourite={this.onPressFavourite}
          onPressOrderNow={this.onPressOrderNow}
          onPressShop={this.onPressShop}
          onRefresh={() => this.loadAllShops()}
          refreshing={this.state.isLoading}
        />
        <FilterView
          cancelable={true}
          description={'exit the  application?'}
          locationList={this.props.allShops}
          okayButtonAction={() => BackHandler.exitApp()}
          onAreaChosen={this.onAreaChosen}
          selectedArea={this.state.selectedArea}
          selectedDistrict={this.state.selectedDistrict}
          title={'Exit App '}
          toggleAreaView={this.toggleAreaView}
          visible={this.state.showAreaView}
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
      padding: 0,
      height: 30 * alpha,
    },
    labelStyle: {
      fontSize: 17 * fontAlpha,
      fontFamily: TITLE_FONT,
      paddingTop: 3 * alpha,
      height: 20 * alpha,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabStyle: TAB_STYLE,
    indicatorStyle: {
      backgroundColor: TINT_COLOR,
      width: '10%',
      left: '20%',
    },
    upperCaseLabel: false,
  },
};

const styles = StyleSheet.create({
  areaBubble: {
    backgroundColor: 'white',
    borderColor: '#00B2E3',
    borderRadius: DEFAULT_BORDER_RADIUS,
    borderWidth: 1,
    marginBottom: alpha * 2,
  },
  areaText: {
    fontFamily: TITLE_FONT,
    fontSize: fontAlpha * 14,
    margin: alpha * 5,
  },
  button_3: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: alpha * 25,
    justifyContent: 'center',
    width: '100%',
  },
  cancelSearchButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 6 * alpha,
  },
  cancelSearchContainer: {
    alignItems: 'center',
    borderRadius: alpha * 21,
    flexDirection: 'row',
    height: alpha * 33,
    paddingHorizontal: alpha * 6,
    position: 'absolute',
    right: -CANCEL_WIDTH,
    width: CANCEL_WIDTH,
  },
  cancelSearchText: {
    color: '#363636',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    textAlign: 'center',
  },
  center: {alignItems: 'center'},
  filterAreaText: {
    color: '#363636',
    flexWrap: 'wrap',
    fontFamily: TITLE_FONT,
    fontSize: fontAlpha * 13,
    marginRight: alpha * 7,
  },
  filterButton: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  filterButtonContainer: {
    justifyContent: 'center',
    left: this.filterView,
  },
  mainView: {
    backgroundColor: LIGHT_GREY_BACKGROUND,
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapToggleImage: {
    height: 5 * alpha,
    marginRight: alpha * 6,
    tintColor: '#BDBDBD',
    width: 10 * alpha,
  },
  mapView: {
    height: alpha * 160,
  },
  pinImage: {
    height: 20 * alpha,
    tintColor: '#00B2E3',
    width: 20 * alpha,
  },
  rightArrowImage: {
    height: 9 * alpha,
    tintColor: '#C5C5C5',
    width: 9 * alpha,
  },
  searchField: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: alpha * 21,
    flexDirection: 'row',
    height: alpha * 28,
    left: 0,
    paddingHorizontal: alpha * 8,
    position: 'absolute',
    right: 0,
  },
  searchFieldInput: {
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
  },
  searchImage: {
    height: 12 * alpha,
    marginRight: alpha * 6,
    tintColor: '#868686',
    width: 12 * alpha,
  },
  searchInputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  searchView: {
    alignItems: 'center',
    borderRadius: alpha * 21,
    flexDirection: 'row',
    height: alpha * 28,
    paddingHorizontal: alpha * 6,
    position: 'relative',
    right: 0,
  },
  subHeaderView: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: -100,
    paddingHorizontal: alpha * 10,
    paddingVertical: alpha * 7,
    position: 'relative',
    right: 0,
    width: windowWidth + 100,
    zIndex: 1,
  },
  text_2: {
    color: '#BDBDBD',
    fontFamily: TITLE_FONT,
    fontSize: fontAlpha * 12,
    marginRight: alpha * 4,
  },
});

export default Outlet;
