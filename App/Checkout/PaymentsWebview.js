//
//  WebCommon
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator
} from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import ProfileRequestObject from '../Requests/profile_request_object';
import { createAction } from '../Utils';
import { alpha, fontAlpha, windowHeight } from '../Common/size';
import { WebView } from 'react-native-webview';
import {
  TITLE_FONT,
  NON_TITLE_FONT,
  TOAST_DURATION
} from '../Common/common_style';
import Toast, { DURATION } from 'react-native-easy-toast';
import { KPAYMENTYURL } from '../Utils/server.js';
@connect(({ members }) => ({
  currentMember: members.profile
}))
export default class PaymentsWebview extends React.Component {
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
          Payment
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

    const amount = this.props.navigation.getParam('amount', 0);
    const order_id = this.props.navigation.getParam('order_id', '');
    const name = this.props.navigation.getParam('name', '');
    const type = this.props.navigation.getParam('type', '');
    const session_id = this.props.navigation.getParam('session_id', '');

    this.state = {
      amount,
      order_id,
      name,
      type,
      session_id,
      payment_url: ''
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed,
      onItemPressed: this.onItemPressed
    });

    // set Payment URL
    this._getPaymentURL();
  }

  async _getPaymentURL() {
    const payment_url = await KPAYMENTYURL();
    this.setState({ payment_url });
  }

  onBackPressed = () => {
    this.props.navigation.goBack();
  };

  onClosePressed = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {
      name,
      amount,
      order_id,
      type,
      session_id,
      payment_url
    } = this.state;

    console.log('payment url ', payment_url);
    return (
      <View style={styles.mainView}>
        {payment_url !== null ? (
          <WebView
            useWebKit={true}
            javaScriptEnable={true}
            onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            style={styles.webviewWebView}
            source={{
              uri: `${payment_url}?name=${name}&amount=${amount}&order_id=${order_id}&type=${type}&session_id=${session_id}`
            }}
          />
        ) : (
          <ActivityIndicator size="large" />
        )}
        <Toast
          ref="toast"
          style={{ bottom: windowHeight / 2 - 40 }}
          textStyle={{ fontFamily: TITLE_FONT, color: '#ffffff' }}
        />
      </View>
    );
  }

  loadProfile() {
    const { dispatch, currentMember } = this.props;

    const callback = (eventObject) => {};
    const obj = new ProfileRequestObject();
    if (currentMember != null) {
      obj.setUrlId(currentMember.id);
    }

    dispatch(
      createAction('members/loadProfile')({
        object: obj,
        callback
      })
    );
  }

  _onNavigationStateChange(webViewState) {
    const url = webViewState.url;
    if (url.includes('hc-action-cancel')) {
      this.props.navigation.goBack();
    } else if (url.includes('returnzz')) {
      var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
      while ((match = regex.exec(url))) {
        params[match[1]] = match[2];
      }

      if (params.success == 'true') {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.clearCart();
        this.loadProfile();
      } else {
        this.setState({
          modal_title: 'Brew9',
          modal_description: decodeURIComponent(params.message),
          modal_ok_text: null,
          modal_ok_action: () => {
            this.setState({ modal_visible: false });
            this.props.navigation.goBack();
          },
          modal_visible: true
        });
      }
    } else if (url.includes('receipt')) {
    }
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
  mainView: {
    flex: 1,
    backgroundColor: 'white'
  },
  commonWebView: {
    backgroundColor: 'white',
    flex: 1
  },
  webviewWebView: {
    backgroundColor: 'transparent',
    flex: 1
  },
  closeButton: {
    backgroundColor: 'transparent',
    borderRadius: 12.5 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    width: 25 * alpha,
    height: 25 * alpha,
    top: 51 * alpha,
    right: 13 * alpha
  },
  closeButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  closeButtonText: {
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 18 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  }
});
