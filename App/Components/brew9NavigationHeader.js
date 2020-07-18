import React from 'react';
import {
  TITLE_FONT,
  NON_TITLE_FONT,
  BUTTONBOTTOMPADDING,
  DEFAULT_GREY_BACKGROUND,
  PRIMARY_COLOR,
  TOAST_DURATION,
  LIGHT_GREY
} from '../Common/common_style';
import { alpha, fontAlpha, windowHeight } from '../Common/size';
import {
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Linking,
  SafeAreaView
} from 'react-native';

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    marginLeft: 8 * alpha,
    width: 70 * alpha
  },
  navigationBarItem: {
    width: '100%'
  },
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
    tintColor: 'black'
  }
});

export function headerStyle(params) {
  return {
    headerTitle: (
      <Text
        style={{
          textAlign: 'center',
          alignSelf: 'center',
          fontFamily: TITLE_FONT
        }}
      >
        Outlet Selection
      </Text>
    ),
    headerTintColor: 'black',
    headerLeft: (
      <View style={styles.headerLeftContainer}>
        <TouchableOpacity
          onPress={params.onBackPressed ? params.onBackPressed : () => null}
          style={styles.navigationBarItem}
        >
          <Image
            source={require('./../../assets/images/back.png')}
            style={styles.navigationBarItemIcon}
          />
        </TouchableOpacity>
      </View>
    ),
    headerRight: null,
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0
    }
  };
}
