import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { alpha, fontAlpha } from '../Common/size';
import { connect } from 'react-redux';
import ShopList from '../Components/ShopList';
import {
  TINT_COLOR,
  TABBAR_INACTIVE_TINT,
  TITLE_FONT,
  LIGHT_GREY_BACKGROUND
} from '../Common/common_style';
import MapView from 'react-native-maps';
import { createAction } from '../Utils';
import AllShopsRequestObject from '../Requests/all_shops_request_object';
import {
  FavoriteShopsRequestObject,
  DeleteFavoriteRequestObject
} from '../Requests/favorite_shops_request_object';
@connect(({ members, shops, orders }) => ({
  allShops: shops.allShops,
  companyId: members.company_id,
  nearByShops: shops.nearByShops
}))
export default class Outlet extends React.Component {
  constructor(props) {
    super(props);
    this._didFocus = this._didFocus.bind(this);
    this.updateShopsList = this.updateShopsList.bind(this);
    this.state = this._getState();
  }

  _getState = () => ({
    showMap: true,
    isLoading: true
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

  loadAllShops = (onFinishLoading) => {
    console.log('loadAllShops');
    this.setState({ isLoading: true });
    const { companyId, dispatch } = this.props;

    const object = new AllShopsRequestObject();
    object.setUrlId(companyId);

    let callback = this.updateShopsList.bind(this);
    if (typeof onFinishLoading === 'function') {
      callback = onFinishLoading;
    }
    const params = { object, callback };
    const action = createAction('shops/loadAllShops')(params);
    dispatch(action);
  };

  updateShopsList = (eventObject) => {
    this.setState({ isLoading: false });
  };

  toggleMap = () => {
    this.setState({
      showMap: !this.state.showMap
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
    //returns favorite ID

    console.log(id);
  };

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
              source={require('./../../assets/images/search.png')}
              style={styles.searchImage}
            />
            <Text style={styles.text_2}>search</Text>
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
                ? require('./../../assets/images/arrowUp.png')
                : require('./../../assets/images/arrowDown.png')
            }
            style={styles.mapToggleImage}
          />
        </TouchableOpacity>
        <ShopList
          shops={this.props.allShops}
          onPressFavourite={this.onPressFavourite}
          onPressOrderNow={this.onPressOrderNow}
          onRefresh={() => this.loadAllShops()}
          refreshing={this.state.isLoading}
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
    justifyContent: 'center',
    height: alpha * 33,
    width: alpha * 80
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

  //txt1
  text_1: {
    marginRight: alpha * 7,
    fontSize: fontAlpha * 12,
    fontFamily: TITLE_FONT,
    color: '#363636'
  },
  text_2: {
    color: '#868686',
    fontSize: fontAlpha * 12,
    fontFamily: TITLE_FONT
  },
  text_3: {
    fontSize: fontAlpha * 12,
    color: '#BDBDBD',
    marginRight: alpha * 4,
    fontFamily: TITLE_FONT
  }
});
