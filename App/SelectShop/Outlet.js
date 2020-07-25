import {
  Animated,
  Easing,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import Brew9DropDown from '../Components/Brew9DropDown';

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
    this.searchWidth = new Animated.Value(alpha * 80);
  }

  _getState = () => ({
    isLoading: true,
    displayShopList: [],
    searchResults: [],
    selectedArea: 'Brunei',
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
    this.resetSearchField();
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

  onAreaChosen = (area) => {
    if (area !== null) {
      let { allShops } = this.props;
      var newArray = allShops.filter(function (obj) {
        return obj.area == area;
      });
      this.setState({
        showAreaView: !this.state.showAreaView,
        selectedArea: area,
        displayShopList: newArray
      });
    } else {
      this.setState({
        showAreaView: !this.state.showAreaView,
        displayShopList: [],
        selectedArea: 'Brunei'
      });
    }
    //receive area here
  };

  searchFilter = (str) => {
    if (str == '') {
      this.setState({
        searchResults: []
      });
      return;
    }

    let { allShops } = this.props;
    let re = new RegExp(str, 'i');
    let r = [];

    for (let k in allShops) {
      let flag =
        allShops[k].short_address.match(re) ||
        allShops[k].district.match(re) ||
        allShops[k].area.match(re);

      if (flag) {
        r.push({
          id: allShops[k].id,
          address:
            allShops[k].short_address +
            ' ' +
            allShops[k].district +
            ' ' +
            allShops[k].area,
          area: allShops[k].area
        });
      }
    }
    this.setState({
      searchResults: r
    });
  };

  onFocusSearchField = () => {
    Animated.spring(this.filterView, {
      toValue: -100
    }).start();

    Animated.timing(this.searchWidth, {
      toValue: windowWidth - 20,
      duration: 200,
      easing: Easing.linear
    }).start();
  };

  onPressResult = (item) => {
    let { allShops } = this.props;
    console.log(item);
    this.textInput.clear();

    var newArray = allShops.filter(function (obj) {
      return obj.id == item.id;
    });

    console.log('-----------');
    console.log(newArray);
    this.setState({
      searchResults: [],
      selectedArea: item.area,
      displayShopList: newArray
    });
  };

  resetSearchField = () => {
    Animated.spring(this.filterView, {
      toValue: 100
    }).start();

    Animated.timing(this.searchWidth, {
      toValue: alpha * 80,
      duration: 500,
      easing: Easing.linear
    }).start();
  };

  renderFilterButton() {
    return (
      <Animated.View
        style={{ left: this.filterView, justifyContent: 'center' }}
      >
        <TouchableOpacity style={styles.button_1} onPress={this.toggleAreaView}>
          <Text style={styles.text_1}> {this.state.selectedArea} </Text>
          <Image
            source={require('./../../assets/images/next.png')}
            style={styles.rightArrowImage}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  renderMap() {
    if (this.state.showMap) {
      return (
        <Animated.View style={styles.mapView}>
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
    }
  }

  renderSearchField() {
    return (
      <Animated.View
        style={[styles.searchView, { width: this.searchWidth }]}
        onPress={this.onPressSearchField}
      >
        <Image
          source={require('./../../assets/images/search.png')}
          style={styles.searchImage}
        />
        <View>
          <TextInput
            // pointerEvents="none"
            ref={(input) => {
              this.textInput = input;
            }}
            placeholder="search"
            onFocus={this.onFocusSearchField}
            onChangeText={this.searchFilter}
            underlineColorAndroid="transparent"
          />
        </View>
      </Animated.View>
    );
  }

  render() {
    const { displayShopList } = this.state;
    const { allShops, nearbyShops } = this.props;
    let shops = nearbyShops.length > 0 ? nearbyShops : allShops;
    shops = displayShopList.length > 0 ? displayShopList : shops;
    return (
      <View style={styles.mainView}>
        <View style={styles.subHeaderView}>
          {this.renderFilterButton()}
          {this.renderSearchField()}
        </View>
        {this.renderMap()}
        <Brew9DropDown
          results={this.state.searchResults}
          onPressResult={this.onPressResult}
        />
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
        <Brew9SlideUp
          locationList={allShops}
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
    backgroundColor: '#F5F5F5',
    borderRadius: alpha * 21,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: alpha * 6,
    height: alpha * 33,
    // marginRight: 100,
    position: 'relative',
    right: 0
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
  }
});
