import React, { Component } from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
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
            refreshControl={
              <RefreshControl
                colors={['#9Bd35A', '#689F38']}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
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
