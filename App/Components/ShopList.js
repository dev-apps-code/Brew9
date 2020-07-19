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
  LIGHT_GREY,
  LIGHT_GREY_BACKGROUND
} from '../Common/common_style';
import { alpha, fontAlpha, windowHeight } from '../Common/size';
import ShopDetails from './ShopDetails';
import { FlatList } from 'react-native-gesture-handler';

export default class ShopList extends Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);

    this.state = this._getState();
  }

  _getState = () => ({
    recentlyPlayed: [],
    featuredArtist: []
  });

  componentDidMount() {}

  renderItem = ({ item, index }) => {
    return <ShopDetails details={item} />;
  };

  render() {
    let { shopList } = this.props;
    return (
      <View style={styles.mainView}>
        <View style={styles.shopDetailView}>
          <FlatList
            data={shopList}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
            style={styles.shopItems}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: LIGHT_GREY_BACKGROUND,
    padding: alpha * 10
  },
  shopItems: {
    padding: 5
  }
});
