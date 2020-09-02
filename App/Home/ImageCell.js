import React, { memo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { alpha } from '../Common/size';

const ImageCell = memo(({ containerStyle, product }) => {
  const { gallery, image } = product;

  if (gallery && Array.isArray(gallery) && gallery.length > 0) {
    return (
      <View style={[styles.imageblockView, containerStyle]}>
        <Swiper
          showsPagination={true}
          autoplay={true}
          paginationStyle={{ bottom: -5 }}
        >
          {gallery.map((item, index) => {
            return (
              <Image
                key={index}
                source={{ uri: item }}
                style={styles.productimageImage}
              />
            );
          })}
        </Swiper>
      </View>
    );
  } else if (image) {
    return (
      <View style={styles.imageblockView}>
        <Image source={{ uri: image.url }} style={styles.productimageImage} />
      </View>
    );
  }

  return <View />;
});

const styles = StyleSheet.create({
  imageblockView: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 21 * alpha,
    height: 150 * alpha,
    alignItems: 'center',
    justifyContent: 'center'
    // flex: 1
  },
  productimageImage: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    width: 150 * alpha,
    height: 150 * alpha,
    // marginLeft: 5 * alpha,
    alignSelf: 'center'
  }
});

export default ImageCell;
