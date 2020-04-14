import React, { createRef } from 'react';
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import ScrollPicker from 'rn-scrollable-picker';
import { alpha, windowWidth } from '../Common/size';
import {
  DEFAULT_GREY_BACKGROUND,
  PRIMARY_COLOR,
  TITLE_FONT
} from '../Common/common_style';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const closeButtonImage = require('./../../assets/images/x-3.png');

const TOTAL_HEIGHT = 350 * alpha;
const BAR_HEIGHT = 80 * alpha;
const ITEM_HEIGHT = 60 * alpha;
const WRAPPER_HEIGHT = TOTAL_HEIGHT - BAR_HEIGHT - 44;
const PICKER_WRAPPER_HEIGHT = WRAPPER_HEIGHT - 50 * alpha;
const OPTION_WIDTH_PICKUP = ((windowWidth - 20) / 2 - 40) * alpha;
const OPTION_WIDTH_DELIVERY = ((windowWidth - 20) / 3) * alpha;
const DELIVERY_OPTIONS = ['Today', 'Tomorrow'];

export default class OrderForSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleClick = (a, j, s) => {};

  render() {
    const {
      styles,
      state,
      animation,
      toggleDelivery,
      onConfirmDeliverySchedule,
      delivery
    } = this.props;

    const optionScroll = createRef();
    const sphour = createRef();
    const spminute = createRef();
    const { minute_range, hour_range, selected_hour, selected_minute } = state;
    const title = delivery ? 'Delivery' : 'Pickup';

    return (
      <Animated.View style={animation.getLayout()}>
        <View
          style={[styles.popOutPickupView, { flex: 1, height: TOTAL_HEIGHT }]}
        >
          <View
            style={[
              styles.paymentMethodTwoView,
              { justifyContent: 'space-evenly' }
            ]}
          >
            <TouchableOpacity
              onPress={() => toggleDelivery()}
              style={styles.closeButton}
            >
              <Image
                source={closeButtonImage}
                style={styles.closeButtonImage}
              />
            </TouchableOpacity>
            <Text style={styles.paymentMethodTwoText}>{title}</Text>
            <TouchableOpacity
              onPress={() => {
                console.log('selected %s %s', selected_hour, selected_minute);
                onConfirmDeliverySchedule(
                  selected,
                  selected_hour,
                  selected_minute
                );
              }}
              style={styles.pickupConfirmButton}
            >
              <Text style={[defaultStyles.confirmText]}>Confirm</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.popOutTimePickerView,
              {
                height: WRAPPER_HEIGHT,
                flexDirection: 'column'
              }
            ]}
          >
            <View>
              <View style={{ flexDirection: 'row', flex: 1, paddingTop: '3%' }}>
                {delivery ? (
                  <ScrollPicker
                    dataSource={DELIVERY_OPTIONS}
                    rotationEnabled={false}
                    selectedIndex={0}
                    itemHeight={ITEM_HEIGHT}
                    wrapperHeight={PICKER_WRAPPER_HEIGHT}
                    wrapperStyle={{
                      flex: 1,
                      backgroundColor: 'red'
                    }}
                    renderItem={(data, index, isSelected) => {
                      return (
                        <TouchableOpacity
                          onPress={this._handleClick()}
                          style={[
                            styles.timePickerRow,
                            { height: ITEM_HEIGHT }
                          ]}
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
                      // onHourValueChange(data, selectedIndex);
                      // onValueChange(OPTIONS[selectedIndex]);
                    }}
                  />
                ) : (
                  <Text>Today</Text>
                )}
                <ScrollPicker
                  ref={spminute}
                  dataSource={minute_range}
                  selectedIndex={0}
                  itemHeight={ITEM_HEIGHT}
                  wrapperHeight={PICKER_WRAPPER_HEIGHT}
                  wrapperStyle={{
                    flex: 1
                  }}
                  renderItem={(data, index, isSelected) => {
                    return (
                      <TouchableOpacity
                        onPress={console.log()}
                        style={[styles.timePickerRow]}
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
                    // onMinuteValueChange(data, selectedIndex);
                  }}
                />
              </View>
              {/* <View style={styles.timepickerBottomBar}></View> */}
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }
}

const defaultStyles = {
  card: {
    borderRadius: 5 * alpha,
    height: 40 * alpha,
    justifyContent: 'center',
    marginRight: 20
  },
  cardTextStyle: {
    textAlign: 'center',
    fontFamily: TITLE_FONT,
    fontSize: 12 * alpha,
    fontWeight: '900'
  },
  confirmText: {
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 15 * alpha,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  selected: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 34,
    height: 50,
    fontWeight: 'bold'
  },
  notSelected: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    height: 50,
    fontWeight: '300'
  }
};
