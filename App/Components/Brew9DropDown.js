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
  Button,
  FlatList
} from 'react-native';


import { TITLE_FONT, NON_TITLE_FONT, TINT_COLOR, DEFAULT_BORDER_RADIUS } from '../Common/common_style';

class Brew9DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    currentTab: 0,
    tabs: ['District', 'Town', 'All'],
    chosenTown: ''
  });

  renderItem = ({ item, index }) => {
    let { onPressResult } = this.props
    return (
      <Text style={styles.resultsText} onPress={()=>onPressResult(item)}>{item.address}</Text>
    );
  };

  render() {
    let { results } = this.props;
    return (
        <View style={ results.length > 0 ? styles.mainView : null}>
            <FlatList
            data={results}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}-${item.id}`}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
      width: alpha * 300,
    //   height: alpha * 20,
      backgroundColor:'white',
      position: 'absolute',
      right: alpha * 10,
      top: alpha * 40,
      borderWidth:1,
      borderColor: TINT_COLOR,
      borderRadius: DEFAULT_BORDER_RADIUS
  },

  resultsText: {
      fontSize: fontAlpha * 14,
      fontFamily: NON_TITLE_FONT
  }
});
export default Brew9DropDown;
