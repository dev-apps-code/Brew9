import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {
  alpha,
  fontAlpha,
  TINT_COLOR,
  TABBAR_INACTIVE_TINT,
  TITLE_FONT,
  TAB_STYLE,
  LIGHT_GREY_BACKGROUND,
  NON_TITLE_FONT,
} from '@common';
import {ShopList} from '@components';
import {
  FavoriteShopsRequestObject,
  DeleteFavoriteRequestObject,
  SelectShopRequestObject,
} from '@requests';
import {createAction} from '@utils';

@connect(({members, shops, orders, config}) => ({
  token: members.userAuthToken,
  favoriteShops: shops.favoriteShops,
  responses: config.responses,
}))
class Favourite extends React.Component {
  constructor(props) {
    super(props);
    this._didFocus = this._didFocus.bind(this);

    this.state = this._getState();
  }

  _getState = () => ({
    showMap: true,
    isNeedLoggined: false,
    isLoading: false,
  });

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', this._didFocus);
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _didFocus = () => {
    this.loadFavoriteShops();
  };

  loadFavoriteShops = () => {
    this.setState({isLoading: true});
    const {companyId, dispatch} = this.props;

    const object = new FavoriteShopsRequestObject();
    object.setUrlId(companyId);

    const callback = this.updateShopsList.bind(this);
    const params = {object, callback};
    const action = createAction('shops/loadFavoriteShops')(params);
    dispatch(action);
  };

  updateShopsList = (eventObject) => {
    this.setState({isLoading: false});
  };

  toggleMap = () => {
    this.setState({
      showMap: !this.state.showMap,
    });
  };

  onPressFavourite = (id) => {
    this.setState({isLoading: true});
    const {companyId, dispatch} = this.props;

    const callback = this._onPressFavouriteCallback;
    const object = new DeleteFavoriteRequestObject(id);
    object.setUrlId(companyId);

    const params = {object, callback};
    const action = createAction('shops/loadUnfavoriteShop')(params);
    dispatch(action);
  };

  _onPressFavouriteCallback = (eventObject) => {
    this.setState({isLoading: false});
    this.loadFavoriteShops();
  };

  onPressOrderNow = (id) => {
    const object = new SelectShopRequestObject();
    object.setUrlId(this.props.companyId);
    object.setShopId(id);

    const callback = this.onPressOrderNowCallback.bind(this);
    const params = {object, callback};
    const action = createAction('shops/selectShop')(params);

    this.props.dispatch(action);
  };

  onPressOrderNowCallback = (eventObject) => {
    if (eventObject.success) {
      this.props.navigation.navigate('Home');
    }
  };

  render() {
    const {favoriteShops, token, responses} = this.props;
    let needLoginText =
      responses.get('Favourite Login Required') ||
      'Login to view your favourite shops.';
    return (
      <View style={styles.mainView}>
        {token === '' ? (
          <Text style={styles.needLoginText}>{needLoginText}</Text>
        ) : (
          <ShopList
            onPressFavourite={this.onPressFavourite}
            onPressOrderNow={this.onPressOrderNow}
            onRefresh={() => this.loadFavoriteShops()}
            refreshing={this.state.isLoading}
            shops={favoriteShops}
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
      // backgroundColor: 'yellow'
    },
    indicatorStyle: {
      backgroundColor: TINT_COLOR,
      width: '10%',
      left: '20%',
    },
    tabStyle: TAB_STYLE,
    upperCaseLabel: false,
  },
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: LIGHT_GREY_BACKGROUND,
    height: '100%',
    width: '100%',
  },
  needLoginText: {
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    paddingVertical: 20,
    textAlign: 'center',
  },
});

export default Favourite;
