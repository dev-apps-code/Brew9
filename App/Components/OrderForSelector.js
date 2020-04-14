import React, { createRef } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import ScrollPicker from 'rn-scrollable-picker';
import { alpha, fontAlpha } from '../Common/size';

import {
  PRIMARY_COLOR,
  TITLE_FONT,
  NON_TITLE_FONT
} from '../Common/common_style';
import Moment from 'moment';
import _ from 'lodash';

const closeButtonImage = require('./../../assets/images/x-3.png');

const TOTAL_HEIGHT = 300 * alpha;
const BAR_HEIGHT = 50 * alpha;
const ITEM_HEIGHT = 60 * alpha;
const WRAPPER_HEIGHT = 200 * alpha;
const DELIVERY_OPTIONS = ['Today', 'Tomorrow'];

export default class OrderForSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState.call(this);
  }

  getInitialState = () => ({
    time_options_today: [],
    time_options_tomorrow: [],
    selected_day_index: 0,
    selected_time_index: 0,
    day_options: ['Today', 'Tomorrow']
  });

  componentDidMount() {
    // initialize time options
    this._setTimeOptions(this.state.selected_day_index);
  }

  _setTimeOptions = (selected_day_index) => {
    let _time_options = [];
    let selected_day = this.state.day_options[selected_day_index];
    let day_time = Moment(new Date(), 'h:mm');

    let { start_time, end_time } = this.props.selectedShop.opening_hour;

    if (this.props.delivery) {
      const { today, tomorrow } = this.props.selectedShop.delivery_hour;

      if (selected_day = 'Tommorow') {
        console.log('woop');
        day_time = Moment(tomorrow.start_time, 'h:mm');
        start_time = tomorrow.start_time;
        end_time = tomorrow.end_time;
      } else {
        start_time = today.start_time;
        end_time = today.end_time;
      }
    }

    let opening_time = Moment(start_time, 'h:mm');
    let closing_time = Moment(end_time, 'h:mm');

    let _hours_options = _.range(day_time.hours(), closing_time.hours());

    // show only available hours starting from opening time
    _hours_options = _.filter(
      _hours_options,
      (hr) => parseInt(hr) >= opening_time.hours()
    );

    let _minutes_arraay = ['00', '15', '30', '45'];
    _hours_options.forEach((hr) => {
      let _minutes_options = _.filter(
        _minutes_arraay,
        (min) => parseInt(min) > day_time.minutes()
      );

      _minutes_options.forEach((min) => _time_options.push(hr + ':' + min));
    });

    this.setState(
      { time_options_today: _time_options },

      // go back to first available time
      this.sp.scrollToIndex(0)
    );
  };

  _onDayChange = (data, index) => {
    this.setState(
      {
        selected_day_index: index
      },
      () => {
        this._setTimeOptions(index);
      }
    );
  };

  render() {
    const {
      time_options_today,
      time_options_tomorrow,
      isTomorrowSelected
    } = this.state;
    const { animation, delivery, selectedShop, styles } = this.props;
    const TITLE = delivery ? 'Delivery' : 'Pickup';

    return (
      <Animated.View style={animation.getLayout()}>
        <View
          style={[styles.popOutPickupView, { flex: 1, height: TOTAL_HEIGHT }]}
        >
          <View
            style={[
              {
                justifyContent: 'space-evenly',
                height: BAR_HEIGHT,
                paddingHorizontal: 10
              }
            ]}
          >
            <TouchableOpacity
              onPress={() => this.props.toggleDelivery()}
              style={styles.closeButton}
            >
              <Image
                source={closeButtonImage}
                style={styles.closeButtonImage}
              />
            </TouchableOpacity>
            <Text style={styles.paymentMethodTwoText}>{TITLE}</Text>
            <TouchableOpacity
              onPress={() => {
                console.log('selected %s %s', selected_hour, selected_minute);
                this.props.onConfirmDeliverySchedule(
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
              {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-start'
              }
            ]}
          >
            {delivery ? (
              <ScrollPicker
                dataSource={DELIVERY_OPTIONS}
                rotationEnabled={false}
                selectedIndex={0}
                itemHeight={ITEM_HEIGHT}
                fixedHeight={true}
                wrapperHeight={ITEM_HEIGHT * 3}
                wrapperStyle={{ flex: 1 }}
                renderItem={(data, index, isSelected) => {
                  return (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: ITEM_HEIGHT
                      }}
                    >
                      <Text
                        style={
                          isSelected
                            ? defaultStyles.selected
                            : defaultStyles.notSelected
                        }
                      >
                        {data}
                      </Text>
                    </View>
                  );
                }}
                onValueChange={(data, selectedIndex) => {
                  this._onDayChange(data, selectedIndex);
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: WRAPPER_HEIGHT
                }}
              >
                <View
                  style={{
                    height: ITEM_HEIGHT
                  }}
                >
                  <Text style={defaultStyles.selected}>Today</Text>
                </View>
              </View>
            )}
            {/* Time picker */}
            <ScrollPicker
              ref={(sp) => (this.sp = sp)}
              dataSource={
                delivery && isTomorrowSelected
                  ? time_options_tomorrow
                  : time_options_today
              }
              rotationEnabled={false}
              selectedIndex={0}
              itemHeight={ITEM_HEIGHT}
              fixedHeight={true}
              wrapperHeight={ITEM_HEIGHT * 3}
              wrapperStyle={{ flex: 1 }}
              renderItem={(data, index, isSelected) => {
                return (
                  <View
                    onPress={console.log()}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text
                      style={
                        isSelected
                          ? defaultStyles.selected
                          : defaultStyles.notSelecteds
                      }
                    >
                      {data}
                    </Text>
                  </View>
                );
              }}
              onValueChange={(data, selectedIndex) => {
                // onMinuteValueChange(data, selectedIndex);
              }}
            />
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
    fontSize: 12 * fontAlpha,
    fontWeight: '900'
  },
  confirmText: {
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 15 * fontAlpha,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  selected: {
    color: 'rgb(54, 54, 54)',
    textAlign: 'center',
    fontSize: 20 * fontAlpha,
    fontFamily: TITLE_FONT,
    fontWeight: 'bold'
  },
  notSelected: {
    color: 'rgb(54, 54, 54)',
    textAlign: 'center',
    fontSize: 15 * fontAlpha,
    fontFamily: NON_TITLE_FONT,
    fontWeight: '300'
  }
};
