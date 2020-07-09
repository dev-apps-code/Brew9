import React, { Component } from 'react';
import {
  alpha,
  fontAlpha,
  windowWidth,
  windowHeight,
  LIGHT_GREY
} from '../Common/size';
import { View, Text, StyleSheet } from 'react-native';
import { TITLE_FONT, NON_TITLE_FONT } from '../Common/common_style';
import Toast from 'react-native-easy-toast';

class Brew9Toast extends Component {
  show(message, duration, onClose) {
    this.refs.toast.show(
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{message}</Text>
        </View>,
        duration,
        () => {
            onClose()
        }
      );
  }

  render() {
    return (
      <Toast
        ref="toast"
      />
    );
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
