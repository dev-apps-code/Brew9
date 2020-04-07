//
//  WebCommon
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, StyleSheet, TouchableOpacity, Image, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { alpha, fontAlpha } from '../Common/size';
import { WebView } from 'react-native-webview';
import { TITLE_FONT, NON_TITLE_FONT } from '../Common/common_style';
import { loadServer } from '../Utils/server';
import { changeServerIndex } from '../Utils/storage';
import {KSERVERURLLIST} from '../Utils/server'

export default class WebCommon extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: TITLE_FONT
          }}
        >
          {navigation.getParam('title', '')}
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
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed,
      onItemPressed: this.onItemPressed
    });
  }

  lastTap = null;
  handleDoubleTap = async () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && now - this.lastTap < DOUBLE_PRESS_DELAY) {
      await changeServerIndex(KSERVERURLLIST.length);
      await loadServer();
      // this.onBackPressed()
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    } else {
      this.lastTap = now;
    }
  };

  onBackPressed = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.handleDoubleTap()}>
        <WebView
          useWebKit={true}
          source={{ uri: this.props.navigation.getParam('web_url', '') }}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    marginLeft: 8 * alpha,
    width: 70 * alpha
  },
  navigationBarItem: {
    width: '100%'
  },
  navigationBarItemTitle: {
    color: 'black',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha
  },
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
    tintColor: 'black'
  },
  commonWebView: {
    backgroundColor: 'white',
    flex: 1
  },
  webviewWebView: {
    backgroundColor: 'transparent',
    flex: 1
  }
});
