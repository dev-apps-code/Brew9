import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { alpha, fontAlpha } from '../Common/size';
import { connect } from 'react-redux';
import { createAction } from '../Utils/index';
import {
  TINT_COLOR,
  TABBAR_INACTIVE_TINT,
  TITLE_FONT,
  TAB_STYLE,
  LIGHT_GREY_BACKGROUND,
  NON_TITLE_FONT
} from '../Common/common_style';
import ShopList from '../Components/ShopList';
import {
  FavoriteShopsRequestObject,
  DeleteFavoriteRequestObject
} from '../Requests/favorite_shops_request_object';
import SelectShopRequestObject from '../Requests/select_shop_request_object';

@connect(({ members, shops, orders }) => ({
  token: members.userAuthToken,
  favoriteShops: shops.favoriteShops
}))
export default class Favourite extends React.Component {
  constructor(props) {
    super(props);
    this._didFocus = this._didFocus.bind(this);

    this.state = this._getState();
  }

  _getState = () => ({
    showMap: true,
    isNeedLoggined: false,
    isLoading: false
  });

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', this._didFocus);
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _didFocus = () => {
    this.loadFavoriteShops();
  };

  loadFavoriteShops = () => {
    this.setState({ isLoading: true });
    const { companyId, dispatch } = this.props;

    const object = new FavoriteShopsRequestObject();
    object.setUrlId(companyId);

    const callback = this.updateShopsList.bind(this);
    const params = { object, callback };
    const action = createAction('shops/loadFavoriteShops')(params);
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

  onPressFavourite = (id) => {
    this.setState({ isLoading: true });
    const { companyId, dispatch } = this.props;

    const callback = this._onPressFavouriteCallback;
    const object = new DeleteFavoriteRequestObject(id);
    object.setUrlId(companyId);

    const params = { object, callback };
    const action = createAction('shops/loadUnfavoriteShop')(params);
    dispatch(action);
  };

  _onPressFavouriteCallback = (eventObject) => {
    this.setState({ isLoading: false });
    this.loadFavoriteShops();
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

  render() {
    const { favoriteShops, token } = this.props;
    return (
      <View style={styles.mainView}>
        {token === '' ? (
          <Text style={styles.needLoginText}>
            Login to view your favourite shops.
          </Text>
        ) : (
          <ShopList
            shops={favoriteShops}
            onPressFavourite={this.onPressFavourite}
            onPressOrderNow={this.onPressOrderNow}
            onRefresh={() => this.loadFavoriteShops()}
            refreshing={this.state.isLoading}
          />
        )}
      </View>
    );
  }
}
Platform.OS === 'ios' ? 200 : 100;
Favourite.navigationOptions = {
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
    tabStyle: TAB_STYLE,
    upperCaseLabel: false
  }
};

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    backgroundColor: LIGHT_GREY_BACKGROUND
  },
  headerLeftContainer: {},
  navigationBarItem: {},
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
    tintColor: 'black',
    marginLeft: 12 * alpha
  },
  needLoginText: {
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    paddingVertical: 20,
    textAlign: 'center'
  }
});
