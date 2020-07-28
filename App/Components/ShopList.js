import React, { Component } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { LIGHT_GREY_BACKGROUND } from '../Common/common_style';
import { alpha } from '../Common/size';
import ShopDetails from './ShopDetails';

export default class ShopList extends Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);

    this.state = this._getState();
  }

  _getState = () => ({
    refreshing: false
  });

  renderItem = ({ item, index }) => {
    return (
      <ShopDetails
        details={item}
        index={index}
        key={index}
        onPressFavourite={this.props.onPressFavourite}
        onPressOrderNow={this.props.onPressOrderNow}
      />
    );
  };

  render() {
    let { shops, onRefresh, refreshing } = this.props;
    return (
      <View style={styles.mainView}>
        <View style={styles.shopDetailView}>
          <FlatList
            data={shops}
            extraData={this.props}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
            style={styles.shopItems}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            refreshing={refreshing}
            onRefresh={onRefresh}
            paddingBottom={200}
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
