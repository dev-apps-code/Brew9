import React from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import ScrollPicker from 'rn-scrollable-picker';
import { alpha, windowWidth } from '../Common/size';
import {
  NON_TITLE_FONT,
  LIGHT_GREY,
  DEFAULT_GREY_BACKGROUND
} from '../Common/common_style';

const closeButtonImage = require('./../../assets/images/x-3.png');

const DelieryTimeSelector = ({
  styles,
  state,
  animation,
  toggleDelivery,
  props
}) => {
  let { minute_range, hour_range } = state;
  return (
    <Animated.View style={animation.getLayout()}>
      <View style={styles.popOutPickupView}>
        <View style={styles.paymentMethodTwoView}>
          <TouchableOpacity
            onPress={() => toggleDelivery()}
            style={styles.closeButton}
          >
            <Image source={closeButtonImage} style={styles.closeButtonImage} />
          </TouchableOpacity>
          <Text style={styles.paymentMethodTwoText}>Delivery</Text>
        </View>
        <View
          style={{
            backgroundColor: DEFAULT_GREY_BACKGROUND,
            height: 120 * alpha,
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              width: windowWidth / 2 - 40,
              height: 80 * alpha,
              backgroundColor: 'white',
              margin: 20,
              marginRight: 10,
              marginLeft: 30
            }}
          >
            <Text>Test</Text>
          </View>
          <View
            style={{
              width: windowWidth / 2 - 40,
              height: 80 * alpha,
              backgroundColor: 'white',
              margin: 20,
              marginLeft: 10,
              marginRight: 30
            }}
          >
            <Text>Test</Text>
          </View>
        </View>
        {/* <View style={styles.menuRowLine2View} /> */}
        <View style={[styles.popOutTimePickerView, { height: 100 * alpha }]}>
          <View style={styles.timepickerTopBar} />
          <ScrollPicker
            ref={(sphour) => {
              this.sphour = sphour;
            }}
            dataSource={hour_range}
            selectedIndex={0}
            itemHeight={50 * alpha}
            wrapperHeight={130 * alpha}
            wrapperStyle={{
              backgroundColor: 'transparent',
              flex: 1
            }}
            renderItem={(data, index, isSelected) => {
              return (
                <TouchableOpacity
                  onPress={console.log()}
                  style={styles.timePickerRow}
                >
                  <Text
                    style={
                      isSelected
                        ? styles.timePickerSelected
                        : styles.timePickerUnselected
                    }
                  >
                    {data}
                  </Text>
                </TouchableOpacity>
              );
            }}
            onValueChange={(data, selectedIndex) => {
              this.onHourValueChange(hour_range[selectedIndex], selectedIndex);
            }}
          />
          <ScrollPicker
            ref={(spminute) => {
              this.spminute = spminute;
            }}
            dataSource={minute_range}
            selectedIndex={0}
            itemHeight={50 * alpha}
            wrapperHeight={130 * alpha}
            wrapperStyle={{
              backgroundColor: 'transparent',
              flex: 1
            }}
            renderItem={(data, index, isSelected) => {
              return (
                <TouchableOpacity
                  onPress={console.log()}
                  style={{
                    height: 50 * alpha,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text
                    style={
                      isSelected
                        ? styles.timePickerSelected
                        : styles.timePickerUnselected
                    }
                  >
                    {data}
                  </Text>
                </TouchableOpacity>
              );
            }}
            onValueChange={(data, selectedIndex) => {
              this.onMinuteValueChange(
                minute_range[selectedIndex],
                selectedIndex
              );
            }}
          />
        </View>
        <View style={styles.timepickerBottomBar} />
      </View>
      <View style={{backgroundColor: 'red'}}>
        <Text>Hello</Text>
        <TouchableOpacity
          onPress={() => this.onConfirmTimePicker()}
          style={styles.pickupConfirmButton}
        >
          <Text style={styles.pickupConfirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default DelieryTimeSelector;
