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

const TOTAL_HEIGHT = 220 * alpha;
const BAR_HEIGHT = 50 * alpha;
const ITEM_HEIGHT = 35 * alpha;
const WRAPPER_HEIGHT = ITEM_HEIGHT * 3;

export default class OrderForSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState.call(this);
  }

  getInitialState = () => ({
    time_options_today: [
      'NOW',
      '9:00-9:15',
      '9:15-9:30',
      '9:30-9:45',
      '10:15-10:30',
      '11:45-12:00'
    ],
    time_options_tomorrow: [
      '9:00-9:15',
      '9:15-9:30',
      '9:30-9:45',
      '10:15-10:30',
      '11:45-12:00'
    ],
    selected_day_index: 0,
    selected_time_index: 0,
    day_options: this.props.delivery ? ['Today', 'tomorrow'] : ['Today']
  });

  componentDidMount() {
    // initialize time options
    // this._setTimeOptions(this.state.selected_day_index);
  }

  _setTimeOptions = (selected_day_index) => {
    let _time_options = [];
    let selected_day = this.state.day_options[selected_day_index];
    let day_time = Moment(new Date(), 'h:mm');

    let { start_time, end_time } = this.props.selectedShop.opening_hour;

    if (this.props.delivery) {
      const { today, tomorrow } = this.props.selectedShop.delivery_hour;

      if (selected_day === 'Tomorrow') {
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

    let _hours_options = _.range(0, 24);

    // show only available time starting from opening time
    _hours_options = _.filter(
      _hours_options,
      (hr) =>
        parseInt(hr) >= opening_time.hours() &&
        hr <= closing_time.hours() &&
        hr >= day_time.hours()
    );

    let _minutes_arraay = ['00', '15', '30', '45'];

    _hours_options.forEach((hr, index) => {
      let _minutes_options = _.filter(_minutes_arraay, (min) => {
        min = parseInt(min);
        if (hr == day_time.hours()) {
          return min > day_time.minutes();
        } else if (hr == closing_time.hours()) {
          return min <= closing_time.minutes();
        } else {
          return true;
        }
      });

      // create the time options

      _minutes_options.forEach((min) => _time_options.push(hr + ':' + min));
    });

    let time_options_today = [];
    _time_options.forEach((_time_option, idx) => {
      if (idx + 1 < _time_options.length) {
        time_options_today.push(_time_option + ' - ' + _time_options[idx + 1]);
      }
    });

    // Add NOW time option
    if (
      day_time.isBetween(opening_time, closing_time) &&
      selected_day === 'Today'
    ) {
      time_options_today.unshift('NOW');
    }

    this.setState(
      { time_options_today },

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
        _t = _t.split(' - ');

        if (_.length > 0) {
          _t = _t[0];
        }

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
      _t = _t.split(' - ');

      if (_.length > 0) {
        _t = _t[0];
      }

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
        // this._setTimeOptions(index);
      }
    );
  };

  _onTimeValueChange = (index) => {
    this.setState({
      selected_time_index: index
    });
    this.sp.scrollToIndex(index);
  };

  render() {
    const {
      time_options_today,
      time_options_tomorrow,
      isTomorrowSelected
    } = this.state;
    const { animation, delivery } = this.props;
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
              style={defaultStyles.closeButton}
            >
              <Image
                source={closeButtonImage}
                style={{ resizeMode: 'contain' }}
              />
            </TouchableOpacity>
            <Text style={defaultStyles.title}>{TITLE}</Text>
            <TouchableOpacity
              onPress={() => {
                this._confirm();
              }}
              style={defaultStyles.pickupConfirmButton}
            >
              <Text style={[defaultStyles.confirmText]}>Confirm</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
              }
            ]}
          >
            <ScrollPicker
              rotationEnabled={false}
              dataSource={this.state.day_options}
              selectedIndex={0}
              itemHeight={ITEM_HEIGHT}
              fixedHeight={true}
              wrapperHeight={WRAPPER_HEIGHT}
              wrapperStyle={{ flex: 1 }}
              renderItem={(data, index, isSelected) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'flex-end',
                      paddingEnd: 20
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
              wrapperHeight={WRAPPER_HEIGHT}
              wrapperStyle={{ flex: 1 }}
              renderItem={(data, index, isSelected) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'flex-start',
                      paddingStart: 20
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
                this._onTimeValueChange(selectedIndex);
              }}
            />

            <Line style={{ top: ITEM_HEIGHT }} />
            <Line style={{ top: WRAPPER_HEIGHT - ITEM_HEIGHT }} />
          </View>
        </View>
      </Animated.View>
    );
  }
}

const Line = (props) => (
  <View
    style={[
      props.style,
      {
        position: 'absolute',
        backgroundColor: 'rgb(245, 245, 245)',
        alignSelf: 'center',
        width: windowWidth,
        height: 1 * alpha
      }
    ]}
  />
);

const defaultStyles = {
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0 * alpha,
    width: windowWidth,
    height: TOTAL_HEIGHT
  },
  closeButton: {
    backgroundColor: 'white',
    borderRadius: 10.5 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    left: 12 * alpha,
    width: 21 * alpha,
    top: 19 * alpha,
    height: 21 * alpha
  },
  title: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 17 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    position: 'absolute',
    alignSelf: 'center',
    top: 19 * alpha
  },
  pickupConfirmButton: {
    backgroundColor: 'white',
    borderRadius: 10.5 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    right: 12 * alpha,
    top: 19 * alpha,
    // paddingVertical: 10 * alpha,
    height: 21 * alpha
  },
  confirmText: {
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 15 * fontAlpha,
    textAlign: 'center'
  },
  selected: {
    color: 'rgb(54, 54, 54)',
    fontSize: 17 * fontAlpha,
    fontFamily: NON_TITLE_FONT,
    fontWeight: 'bold'
  },
  notSelected: {
    color: 'rgb(82, 82, 82)',
    fontSize: 15 * fontAlpha,
    fontFamily: NON_TITLE_FONT
  }
};
