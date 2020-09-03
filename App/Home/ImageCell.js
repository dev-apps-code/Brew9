import React, { memo } from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { alpha } from '../Common/size';

const { width } = Dimensions.get('window');
const SWIPER_WIDTH = width - 80;

const ImageCell = memo(({ containerStyle, product }) => {
  const { gallery, image } = product;

  if (gallery && Array.isArray(gallery) && gallery.length > 0) {
    return (
      <View style={[styles.imageblockView, containerStyle]}>
        <Swiper
          showsPagination={true}
          autoplay={true}
          paginationStyle={{ bottom: -15 }}
          width={SWIPER_WIDTH}
        >
          {gallery.map((item, index) => (
            <Image
              key={index}
              source={{ uri: item }}
              style={[styles.productimageImage, styles.galleryImageStyle]}
            />
          ))}
        </Swiper>
      </View>
    );
  } else if (image) {
    return (
      <View style={[styles.imageblockView, containerStyle]}>
        <Image source={{ uri: image.url }} style={styles.productimageImage} />
      </View>
    );
  }

  return <View />;
});

const styles = StyleSheet.create({
  imageblockView: {
    backgroundColor: 'white',
    marginTop: 21 * alpha,
    width: '100%',
    height: 150 * alpha,
    alignItems: 'center',
    justifyContent: 'center'
    // flex: 1
  },
  galleryImageStyle: {
    backgroundColor: 'cyan'
  },
  productimageImage: {
    // backgroundColor: 'transparent',
    resizeMode: 'cover',
    width: 150 * alpha,
    height: 150 * alpha,
    // marginLeft: 5 * alpha,
    alignSelf: 'center'
  }
});

export default ImageCell;
