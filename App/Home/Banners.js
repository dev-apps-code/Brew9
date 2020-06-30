import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import BannerCell from './BannerCell';
import { alpha, fontAlpha } from '../Common/size';

export default class Banners extends React.PureComponent {
  render() {
    let { banner, onBannerPressed, containerStyle } = this.props;
    return banner ? (
      <View style={[styles.container, containerStyle]}>
        <Swiper
          showsPagination={true}
          autoplay={false}
          paginationStyle={{ bottom: 5 }}
        >
          {banner.map((item, index) => (
            <BannerCell
              key={index}
              index={index}
              item={item}
              navigation={this.props.navigation}
              onPressItem={onBannerPressed}
            />
          ))}
        </Swiper>
      </View>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 150 * 2 * alpha,
    height: 150 * alpha,
    flex: 1,
    backgroundColor: 'white'
  }
});
