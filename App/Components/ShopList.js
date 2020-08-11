import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { LIGHT_GREY_BACKGROUND } from '../Common/common_style';
import { alpha } from '../Common/size';
import ShopDetails from './ShopDetails';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: LIGHT_GREY_BACKGROUND,
    padding: alpha * 15
  }
});

const renderItem = (item, index, { onPressFavourite, onPressOrderNow }) => (
  <ShopDetails
    details={item}
    index={index}
    key={index}
    onPressFavourite={onPressFavourite}
    onPressOrderNow={onPressOrderNow}
  />
);

const ShopList = (props) => {
  const { shops, onRefresh, refreshing, hasSearched } = props;
  return (
    <View style={styles.mainView}>
      <View style={styles.shopDetailView}>
        {hasSearched && shops.length === 0 && (
          <Text
            style={{
              color: 'rgb(54, 54, 54)'
            }}
          >
            No results found.
          </Text>
        )}
        <FlatList
          data={shops}
          extraData={props}
          renderItem={({ item, index }) => renderItem(item, index, props)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}-${item.id}`}
          refreshing={refreshing}
          onRefresh={onRefresh}
          paddingBottom={200}
        />
      </View>
    </View>
  );
};

export default ShopList;
