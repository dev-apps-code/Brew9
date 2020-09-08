import React, {memo} from 'react';
import {StyleSheet, Image} from 'react-native';
import {windowWidth, alpha} from '../Common/size';

const defaultBanner = Image.resolveAssetSource(
  require('../../assets/images/B9_APP_Profile.png'),
);

export const ProfileBanner = memo(({url}) => {
  const source = url !== null ? {uri: url} : defaultBanner;
  const height = url ? 285 * alpha : 353 * alpha;

  return <Image {...{source}} style={[viewStyles.shopImage, height]} />;
});

const viewStyles = StyleSheet.create({
  shopImage: {
    resizeMode: 'cover',
    backgroundColor: 'transparent',
    position: 'absolute',
    width: windowWidth,
    left: 0 * alpha,
    right: 0 * alpha,
    top: 0 * alpha,
  },
});
