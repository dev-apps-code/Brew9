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
import Brew9DropDown from '../Components/Brew9DropDown';


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
    isLoading: true,
    selectedArea: 'Brunei',
    showAreaView: false,
    showMap: true,
    searchResults: [],
    displayShopList: []
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

    const callback = this.onPressOrderNowCallback.bind(this);
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
      let { allShops } = this.props
      var newArray = allShops.filter(function (obj) {
        return obj.area == area
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
        selectedArea: "Brunei"
      })
    }
    //receive area here
  };

  searchFilter = (str) => {
    if (str  == '') {
      this.setState({
        searchResults: []
      })
      return;
    }
    

    let { allShops } = this.props
    let re = new RegExp(str, 'i');
    let r = [];

    for (let k in allShops) {
        let flag = (
          allShops[k].short_address.match(re) || 
          allShops[k].district.match(re) || 
          allShops[k].area.match(re)
        );

        if (flag) {
            r.push({ 
                id: allShops[k].id, 
                address: allShops[k].short_address + ' ' + allShops[k].district + ' ' + allShops[k].area,
                area: allShops[k].area

            });
        }

       
    }
    this.setState({
      searchResults: r
    })
}

onPressResult = (item) => {
  let { allShops } = this.props
  console.log(item)
  this.textInput.clear()

  var newArray = allShops.filter(function (obj) {
    return obj.id == item.id
  });

  console.log("-----------")
  console.log(newArray)
  this.setState({
    searchResults: [],
    selectedArea: item.area,
    displayShopList: newArray
  })
  
}

  render() {
    const {displayShopList} = this.state;
    const {allShops} = this.props;
    const shops = displayShopList.length > 0 ? displayShopList: allShops;
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
                ref={input => { this.textInput = input }}
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
        <Brew9DropDown results={this.state.searchResults} onPressResult= {this.onPressResult}/>
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
