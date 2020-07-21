import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { alpha, fontAlpha } from '../Common/size';
import { connect } from 'react-redux';
import { createAction } from '../Utils/index';
import {
  TINT_COLOR,
  TABBAR_INACTIVE_TINT,
  TITLE_FONT,
  DEFAULT_GREY_BACKGROUND,
  LIGHT_GREY,
  LIGHT_GREY_BACKGROUND,
  NON_TITLE_FONT
} from '../Common/common_style';
import ShopList from '../Components/ShopList';
import FavoriteShopsRequestObject from '../Requests/favorite_shops_request_object';

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

    const callback = this.updateShopsList;
    const params = { object, callback };
    const action = createAction('shops/loadFavoriteShops')(params);
    dispatch(action);
  };

  updateShopsList = (eventObject) => {
    this.setState({ isLoading: false });
  };

  onPressFavourite = (id) => {
    //returns favorite ID

    console.log(id);
  };

  onPressOrderNow = (id) => {
    //returns favorite ID

    console.log(id);
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
