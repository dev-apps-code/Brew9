import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';
import { LIGHT_GREY_BACKGROUND } from '../Common/common_style';
import { alpha } from '../Common/size';
import ShopDetails from './ShopDetails';
import { FlatList } from 'react-native-gesture-handler';

export default class ShopList extends Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);

    this.state = this._getState();
  }

  _getState = () => ({});

  componentDidMount() {}

  renderItem = ({ item, index }) => {
    return (
      <ShopDetails
        details={item}
        key={index}
        onPressFavourite={this.props.onPressFavourite}
        onPressOrderNow={this.props.onPressOrderNow}
        index={index}
      />
    );
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
            keyExtractor={(item, index) => index.toString()}
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
    padding: alpha * 5
  }
});
