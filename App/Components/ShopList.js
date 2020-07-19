import React, { Component } from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView
} from 'react-native';
import {
  TITLE_FONT,
  NON_TITLE_FONT,
  BUTTONBOTTOMPADDING,
  DEFAULT_GREY_BACKGROUND,
  PRIMARY_COLOR,
  TOAST_DURATION,
  LIGHT_GREY
} from '../Common/common_style';
import { alpha, fontAlpha, windowHeight } from '../Common/size';
import ShopDetails from './ShopDetails';

export default class ShopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentlyPlayed: [],
      featuredArtist: []
    };
  }

  componentDidMount() {}

  renderShopDetails(shopList) {
    const items = shopList.map((value, value_key) => {
      return <ShopDetails key={value_key} details={value} />;
    });
    return items;
  }

  render() {
    let { shopList } = this.props;
    return (
      <View style={styles.mainView}>
        <View style={styles.shopDetailView}>
          <ScrollView>{this.renderShopDetails(shopList)}</ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: DEFAULT_GREY_BACKGROUND,
    // borderWidth: 3,
    // borderColor: 'yellow',
    padding: alpha * 10
  }
});
