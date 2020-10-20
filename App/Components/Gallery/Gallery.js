import {alpha} from '@common';
import React, {memo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import {Brew9Image} from '../Brew9Image';

const {width} = Dimensions.get('window');
const SWIPER_WIDTH = width - 80;

const Gallery = memo(({gallery}) => {
  return (
    <Swiper
      autoplay={true}
      paginationStyle={styles.paginationStyle}
      showsPagination={true}
      width={SWIPER_WIDTH}>
      {gallery.map((item, index) => (
        <Brew9Image imageSource={{uri: item}} key={index} />
      ))}
    </Swiper>
  );
});

const styles = StyleSheet.create({
  paginationStyle: {bottom: -15},
  productimageImage: {
    alignSelf: 'center',
    height: 150 * alpha,
    resizeMode: 'cover',
    width: 150 * alpha,
  },
});

export {Gallery};
