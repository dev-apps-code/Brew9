import { StyleSheet, View } from 'react-native';
import React from 'react';
import { alpha, fontAlpha, windowHeight } from '../Common/size';
import { connect } from 'react-redux';
import {
  TINT_COLOR,
  TABBAR_INACTIVE_TINT,
  TITLE_FONT
} from '../Common/common_style';
import ShopList from '../Components/ShopList';
@connect(({ members, shops, orders }) => ({}))
export default class Favourite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: true,
      shopList: [
        {
          id: 3,
          name: 'Bunny Good',
          short_address: '404 Ward Street',
          longitude: '114.89',
          latitude: '4.8',
          district: 'Brunei-Muara',
          area: 'Area A',
          proximity_meters: null,
          open: true
        },
        {
          id: 1,
          name: 'ブルー九 Flagship Store',
          short_address: 'The Walk, Beribi',
          longitude: '114.897994',
          latitude: '4.888659',
          district: 'No district',
          area: 'No area',
          proximity_meters: null,
          open: true
        },
        {
          id: 1,
          name: 'ブルー九 Flagship Store',
          short_address: 'The Walk, Beribi',
          longitude: '114.897994',
          latitude: '4.888659',
          district: 'No district',
          area: 'No area',
          proximity_meters: null,
          open: true
        },
        {
          id: 1,
          name: 'ブルー九 Flagship Store',
          short_address: 'The Walk, Beribi',
          longitude: '114.897994',
          latitude: '4.888659',
          district: 'No district',
          area: 'No area',
          proximity_meters: null,
          open: true
        },
        {
          id: 1,
          name: 'ブルー九 Flagship Store',
          short_address: 'The Walk, Beribi',
          longitude: '114.897994',
          latitude: '4.888659',
          district: 'No district',
          area: 'No area',
          proximity_meters: null,
          open: true
        }
      ]
    };
  }
  render() {
    return (
      <View style={styles.mainView}>
        <ShopList shopList={this.state.shopList} />
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
    tabStyle: {},
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
    width: '100%'
  },
  headerLeftContainer: {},
  navigationBarItem: {},
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
    tintColor: 'black',
    marginLeft: 12 * alpha
  }
});
