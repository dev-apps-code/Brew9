import React, { Component } from 'react';
import { alpha, fontAlpha, windowWidth } from '../Common/size';
import Modal, {
  ModalContent,
  ModalButton,
  ModalFooter,
  SlideAnimation
} from 'react-native-modals';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Button
} from 'react-native';
import { TITLE_FONT, NON_TITLE_FONT } from '../Common/common_style';

class Brew9SlideUp extends Component {
  render() {
      let { visible } = this.props
    return (
      <Modal.BottomModal

        visible={visible}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom'
          })
        }
      >
        <ModalContent>
          <View style={styles.modalView}>

          </View>
        </ModalContent>
      </Modal.BottomModal>
    );
  }
}

const styles = StyleSheet.create({
  customStyle: {
    backgroundColor: 'transparent'
  },
  modalView: {
    backgroundColor:'white',
    width: '100%',
    height: alpha * 150
  }
});
export default Brew9SlideUp;
