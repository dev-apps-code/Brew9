import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { alpha, fontAlpha } from '../Common/size';
import { TITLE_FONT, NON_TITLE_FONT, LIGHT_GREY } from '../Common/common_style';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10 * alpha,
    flex: 1
  },
  title: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    width: 75 * alpha,
    textAlign: 'left'
  },
  textInput: {
    backgroundColor: 'transparent',
    padding: 0,
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    width: 193 * alpha,
    flex: 1
  },
  menuRowArrowImage: {
    width: 10 * alpha,
    tintColor: 'rgb(195, 195, 195)',
    resizeMode: 'contain'
  },
  sectionSeperatorView2: {
    backgroundColor: 'rgb(244, 244, 244)',
    height: 1 * alpha
  },
  selectedStyle: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 10 * alpha,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const ShippingDetail = ({
  title,
  value,
  placeholder,
  onChangeText,
  edit,
  selected,
  onPress,
  keyboardType
}) => {
  const current_value = value == '' ? false : true;

  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>{title}</Text>
        {!selected ? (
          edit ? (
            <TextInput
              defaultValue={value}
              keyboardType="default"
              clearButtonMode="always"
              autoCorrect={false}
              placeholder={placeholder}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              style={styles.textInput}
              editable={edit}
              keyboardType={keyboardType}
            />
          ) : (
            <Text>{current_value}</Text>
          )
        ) : (
          <TouchableOpacity style={styles.selectedStyle} onPress={onPress}>
            {current_value ? (
              <Text style={[styles.textInput]}>{value}</Text>
            ) : (
              <Text style={[styles.textInput, { color: LIGHT_GREY }]}>
                {placeholder}
              </Text>
            )}
            <Image
              source={require('./../../assets/images/next.png')}
              style={styles.menuRowArrowImage}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.sectionSeperatorView2} />
    </>
  );
};

ShippingDetail.defaultProps = {
  keyboardType: 'default'
};

export default ShippingDetail;
