import React, {memo, useState} from 'react';
import {Image, StyleSheet, View, ActivityIndicator} from 'react-native';
import {alpha, Colors} from '@common';
import {Gallery} from '@components';
import {Brew9ProgressiveImage} from '@components';

const ImageCell = memo(({containerStyle, product}) => {
  const {gallery, image} = product;
  const isGallery = gallery && Array.isArray(gallery) && gallery.length > 0;
  const thumb = image.thumb.url;
  return (
    <View style={[styles.imageblockView, containerStyle]}>
      {isGallery ? (
        <Gallery {...{gallery, thumb}} />
      ) : (
        <Brew9ProgressiveImage
          imageSource={{uri: image.url, cache: 'force-cache'}}
          style={styles.productimageImage}
          thumbnailBlurRadius={5}
          thumbnailFadeDuration={100}
          thumbnailSource={{uri: image.thumb.url}}
        />
      )}
    </View>
  );
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
