import React from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import ScrollPicker from 'rn-scrollable-picker';
import { alpha, fontAlpha, windowWidth } from '../Common/size';

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
    day_options: this.props.delivery ? ['Today', 'Tomorrow'] : ['Today']
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

      if (selected_day === 'Tommorow') {
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

    let _hours_options = _.range(day_time.hours(), closing_time.hours() - 1);

    console.log(_hours_options);

    // show only available time starting from opening time
    _hours_options = _.filter(
      _hours_options,
      (hr) => parseInt(hr) >= opening_time.hours()
    );

    let _minutes_arraay = ['00', '15', '30', '45'];

    _hours_options.forEach((hr) => {
      let _minutes_options = _.filter(_minutes_arraay, (min) => {
        console.log('hour is %s closing hr is %s', hr, closing_time.hours());
        min = parseInt(min);
        if (hr == day_time.hours()) {
          return min > day_time.minutes();
        } else if (hr == closing_time.hours()) {
          console.log('hr == closing time hr %s min %s', hr, min);
          return min < closing_time.minutes();
        } else {
          return true;
        }
      });

      // create the time options
      _minutes_options.forEach((min) => _time_options.push(hr + ':' + min));
    });

    // Add NOW time option
    if (
      day_time.isBetween(opening_time, closing_time) &&
      selected_day === 'Today'
    ) {
      _time_options.unshift('NOW');
    }

    this.setState(
      { time_options_today: _time_options },

      // go back to first available time
      this.sp.scrollToIndex(0)
    );
  };

  _confirm = () => {
    let hour = null;
    let mins = null;
    let option = null;
    let selected = this.state.day_options[this.state.selected_day_index];

    if (selected == 'Today') {
      let _t = this.state.time_options_today[this.state.selected_time_index];

      if (_t !== 'NOW') {
        option = 'Later';
        _t = _t.split(':');
        hour = _t[0];
        mins = _t[1];
      } else {
        option = 'Now';
        let time_now = Moment(new Date(), 'h:mm');
        hour = time_now.hours();
        mins = time_now.minutes();
      }
    } else {
      option = 'Tomorrow';
      let _t = this.state.time_options_today[this.state.selected_time_index];
      _t = _t.split(':');

      hour = _t[0];
      mins = _t[1];
    }

    // confirm
    this.props.onConfirm(option, hour, mins);
  };

  _onDayChange = (data, index) => {
    this.setState(
      {
        selected_day_index: index,
        selected_time_index: 0
      },
      () => {
        this._setTimeOptions(index);
      }
    );
  };

  _onTimeValueChange = (index) => {
    this.setState({
      selected_time_index: index
    });
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
        <View style={[defaultStyles.container]}>
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
                this._confirm();
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
            <ScrollPicker
              dataSource={this.state.day_options}
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
                this._onTimeValueChange(selectedIndex);
              }}
            />
          </View>
        </View>
      </Animated.View>
    );
  }
}

const defaultStyles = {
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0 * alpha,
    width: windowWidth,
    height: TOTAL_HEIGHT
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
