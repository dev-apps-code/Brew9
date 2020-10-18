import React, {memo} from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import {alpha} from '../Common/size';

const {width} = Dimensions.get('window');
const SWIPER_WIDTH = width - 80;

const ImageCell = memo(({containerStyle, product}) => {
  const {gallery, image} = product;

  if (gallery && Array.isArray(gallery) && gallery.length > 0) {
    return (
      <View style={[styles.imageblockView, containerStyle]}>
        <Swiper
          autoplay={true}
          paginationStyle={{bottom: -15}}
          showsPagination={true}
          width={SWIPER_WIDTH}>
          {gallery.map((item, index) => (
            <Image
              key={index}
              source={{uri: item, cache: 'force-cache'}}
              style={styles.productimageImage}
            />
          ))}
        </Swiper>
      </View>
    );
  } else if (image) {
    return (
      <View style={[styles.imageblockView, containerStyle]}>
        <Image
          source={{uri: image.url, cache: 'force-cache'}}
          style={styles.productimageImage}
        />
      </View>
    );
  }

  return <View />;
});

const styles = StyleSheet.create({
  galleryImageStyle: {
    backgroundColor: 'cyan',
  },
  imageblockView: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 150 * alpha,
    justifyContent: 'center',
    marginTop: 21 * alpha,
    width: '100%',
  },
  productimageImage: {
    alignSelf: 'center',
    height: 150 * alpha,
    resizeMode: 'cover',
    width: 150 * alpha,
  },
});

export default ImageCell;
