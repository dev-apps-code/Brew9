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
import { alpha, fontAlpha, windowWidth } from '../Common/size';
import { connect } from 'react-redux';
import ShopList from '../Components/ShopList';
import {
  TINT_COLOR,
  TABBAR_INACTIVE_TINT,
  TITLE_FONT,
  TAB_STYLE,
  LIGHT_GREY_BACKGROUND,
  NON_TITLE_FONT,
  TEXT_COLOR,
  DISABLED_COLOR
} from '../Common/common_style';
import MapView from 'react-native-maps';
import { createAction } from '../Utils';
import AllShopsRequestObject from '../Requests/all_shops_request_object';
import {
  FavoriteShopsRequestObject,
  DeleteFavoriteRequestObject
} from '../Requests/favorite_shops_request_object';
import SelectShopRequestObject from '../Requests/select_shop_request_object';
import FilterView from './FilterShops';
import NearestShopRequestObject from '../Requests/nearest_shop_request_object';
import { toLower } from 'lodash';

const SEARCH_WIDTH = 80 * alpha;
const CANCEL_WIDTH = 60 * alpha;
const MAX_SEARCH_WIDTH = windowWidth - CANCEL_WIDTH - 20;
const FILTER_FIELD_WIDTH = 100;
const MAP_HEIGHT = 160 * alpha;

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
    showMap: true
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
        displayShopList: newArray
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
        displayShopList: newArray
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

    this.setState({ isSearching: true, searchResults: shops });
  };

  onPressCancel = () => {
    Keyboard.dismiss();
    this.refs.searchInput.clear();
    this.resetSearchFieldWidth();
    this.setState({
      isSearching: false,
      searchResults: []
    });
  };

  onFocusSearchField = () => {
    const animation = Animated.timing(this.searchWidth, {
      toValue: MAX_SEARCH_WIDTH,
      duration: 300,
      easing: Easing.linear
    }).start();
    
    this.setState({ isSearching: true }, animation);
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

  renderMap() {
    // if (this.state.showMap) {
    Animated.timing(this.mapHeight, {
      toValue: MAP_HEIGHT * this.state.showMap,
      duration: 200,
      easing: Easing.linear
    }).start();

    return (
      <Animated.View style={{ height: this.mapHeight }}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004
          }}
        />
      </Animated.View>
    );
    // }
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

  render() {
    const { displayShopList, isSearching, searchResults } = this.state;
    const { allShops, nearbyShops } = this.props;
    let shops = nearbyShops.length > 0 ? nearbyShops : allShops;
    shops = displayShopList.length > 0 ? displayShopList : shops;
    shops = isSearching ? searchResults : shops;
    return (
      <View style={styles.mainView}>
        <View style={styles.subHeaderView}>
          {this.renderFilterButton()}
          {this.renderSearchField()}
        </View>
        {this.renderMap()}
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
          shops={shops}
          onPressFavourite={this.onPressFavourite}
          onPressOrderNow={this.onPressOrderNow}
          onRefresh={() => this.loadAllShops()}
          refreshing={this.state.isLoading}
        />
        <FilterView
          locationList={allShops}
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
  }
});
