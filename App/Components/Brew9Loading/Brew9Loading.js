import React, {memo} from 'react';
import {View, StyleSheet, Platform, Image} from 'react-native';
import {alpha} from '../Common/size.js';
import FastImage from 'react-native-fast-image';

export const Brew9Loading = memo(({containerStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.onboarding_container}>
        <View style={styles.onboarding}>
          {Platform.OS == 'ios' ? (
            <FastImage
              style={styles.onboarding_logo}
              source={require('./../../assets/images/Loading.gif')}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <Image
              style={styles.onboarding_logo}
              source={require('./../../assets/images/Loading.gif')}
            />
          )}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboarding_logo: {
    width: 150 * alpha,
    height: 150 * alpha,
  },
  spinner: {
    position: 'absolute',
    top: 50 * alpha,
  },
  onboarding: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120 * alpha,
    height: 120 * alpha,
    backgroundColor: 'transparent',
    borderRadius: 12 * alpha,
  },
  onboarding_container: {
    width: 120 * alpha,
    height: 240 * alpha,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
