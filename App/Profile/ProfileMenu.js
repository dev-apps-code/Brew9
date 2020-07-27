import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { alpha, fontAlpha } from '../Common/size';
import { NON_TITLE_FONT, LIGHT_GREY } from '../Common/common_style';

export default class ProfileMenu extends React.PureComponent {
  render() {
    let { onPress, text, icon, subText } = this.props;

    return (
      <View style={styles.menuRowbuttonButton}>
        <TouchableOpacity onPress={onPress} style={styles.menuRowView}>
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 0 * alpha,
              right: 0 * alpha,
              top: 0 * alpha,
              bottom: 0,
              justifyContent: 'center'
            }}
          >
            <View
              pointerEvents="box-none"
              style={{
                height: 24 * alpha,
                marginLeft: 20 * alpha,
                marginRight: 30 * alpha,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              {icon ? <Image source={icon} style={styles.iconImage} /> : null}

              <Text style={styles.menuRowLabelText}>{text}</Text>
              <View
                style={{
                  flex: 1
                }}
              />
              {subText ? (
                <Text style={styles.subText}>{subText}</Text>
              ) : (
                <Image
                  source={require('./../../assets/images/next.png')}
                  style={styles.menuRowArrowImage}
                />
              )}
            </View>
          </View>
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 0 * alpha,
              right: 0 * alpha,
              top: 0 * alpha,
              bottom: 0
            }}
          >
            <Text style={styles.menuRowDescriptionText}></Text>
          </View>
        </TouchableOpacity>
        <View style={styles.menuRowLineView} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuRowView: {
    backgroundColor: 'transparent',
    height: 58 * alpha,
    marginRight: 1 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuRowLabelText: {
    // color: "rgb(54, 54, 54)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  menuRowDisableLabelText: {
    color: 'rgb(188, 188, 188)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  iconImage: {
    resizeMode: 'contain',
    width: 27 * alpha,
    height: 22 * alpha,
    marginRight: 10 * alpha
  },
  menuRowDescriptionText: {
    color: 'rgb(188, 188, 188)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginRight: 23 * alpha
  },
  arrowTwoView: {
    backgroundColor: 'transparent',
    width: 7 * alpha,
    height: 8 * alpha
  },
  menuRowbuttonButton: {
    backgroundColor: 'transparent',
    flex: 1
  },

  menuRowLineView: {
    backgroundColor: 'rgb(245, 245, 245)',
    position: 'absolute',
    alignSelf: 'center',
    width: 375 * alpha,
    top: 57 * alpha,
    height: 1 * alpha,
    left: 20 * alpha
  },
  menuRowArrowImage: {
    width: 10 * alpha,
    tintColor: 'rgb(54, 54, 54)',
    resizeMode: 'contain'
  },
  subText: {
    color: LIGHT_GREY,
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha
  }
});
