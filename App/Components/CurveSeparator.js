import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { alpha } from '../Common/size';
import { DEFAULT_GREY_BACKGROUND } from '../Common/common_style';

const CurveSeparator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.left} />
      <View style={styles.right} />
    </View>
  );
};

const TINT_COLOR = 'rgb(245, 245, 245)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: 14 * alpha,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(245, 245, 245)'
  },
  separatorImage: {
    tintColor: TINT_COLOR,
    height: 14 * alpha,
    resizeMode: 'stretch',
    width: '100%'
  },
  line: {
    alignSelf: 'center',
    backgroundColor: DEFAULT_GREY_BACKGROUND,
    height: 1 * alpha,
    position: 'absolute',
    width: 300 * alpha
  },
  left: {
    width: 14 * alpha,
    height: 14 * alpha,
    backgroundColor: DEFAULT_GREY_BACKGROUND,
    position: 'absolute',
    left: -7 * alpha,
    borderRadius: 7 * alpha
  },
  right: {
    width: 14 * alpha,
    height: 14 * alpha,
    backgroundColor: DEFAULT_GREY_BACKGROUND,
    position: 'absolute',
    right: -7 * alpha,
    borderRadius: 7 * alpha
  }
});

export default CurveSeparator;
