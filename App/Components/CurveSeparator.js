import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { alpha } from '../Common/size';
import { DEFAULT_GREY_BACKGROUND } from '../Common/common_style';

export default class CurveSeparator extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./../../assets/images/curve_in_background.png')}
          style={styles.separatorImage}
        />
        <View style={styles.line} />
      </View>
    );
  }
}

const TINT_COLOR = 'rgb(245, 245, 245)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: DEFAULT_GREY_BACKGROUND
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
    width: 300 * alpha,
  }
});
