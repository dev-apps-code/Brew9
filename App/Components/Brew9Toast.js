import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-easy-toast';
import { windowHeight } from '../Common/size';
import { NON_TITLE_FONT, TOAST_DURATION } from '../Common/common_style';

class Brew9Toast extends Component {
  renderMessage = (message) => (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );

  show = (message, duration, callback) => {
    if (typeof duration === 'undefined') {
      duration = TOAST_DURATION;
    }

    if (typeof callback === 'undefined') {
      callback = () => {};
    }

    this.refs.toast.show(this.renderMessage(message), duration, callback);
  };

  render() {
    return <Toast ref="toast" />;
  }
}

const styles = StyleSheet.create({
  toastContainer: {
    bottom: windowHeight / 2 - 40,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  toastText: {
    fontFamily: NON_TITLE_FONT,
    textAlign: 'center',
    color: 'white'
  }
});

export default Brew9Toast;
