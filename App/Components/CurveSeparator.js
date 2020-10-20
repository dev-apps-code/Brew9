import React from 'react';
import {StyleSheet, View} from 'react-native';
import {alpha, DEFAULT_GREY_BACKGROUND} from '@common';

const CurveSeparator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.left} />
      <View style={styles.right} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    backgroundColor: 'rgb(245, 245, 245)',
    flex: 1,
    height: 14 * alpha,
    justifyContent: 'center',
    position: 'relative',
  },
  left: {
    backgroundColor: DEFAULT_GREY_BACKGROUND,
    borderRadius: 7 * alpha,
    height: 14 * alpha,
    left: -7 * alpha,
    position: 'absolute',
    width: 14 * alpha,
  },
  line: {
    alignSelf: 'center',
    backgroundColor: DEFAULT_GREY_BACKGROUND,
    height: 1 * alpha,
    position: 'absolute',
    width: 300 * alpha,
  },
  right: {
    backgroundColor: DEFAULT_GREY_BACKGROUND,
    borderRadius: 7 * alpha,
    height: 14 * alpha,
    position: 'absolute',
    right: -7 * alpha,
    width: 14 * alpha,
  },
});

export default CurveSeparator;
