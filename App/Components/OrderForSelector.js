import React from 'react';
import {Animated, Image, Text, TouchableOpacity, View} from 'react-native';
import ScrollPicker from 'rn-scrollable-picker';
import {alpha, fontAlpha, windowWidth} from '../Common/size';

import {
  PRIMARY_COLOR,
  TITLE_FONT,
  NON_TITLE_FONT,
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
    day_options: [],
    current_time_options: [],
    time_options: [],
    selected_day_index: 0,
    selected_time_index: 0,
  });

  componentDidMount() {
    this._setTimeOptions();
  }

  /**
   * Set the proper time options using data from the API
   */
  _setTimeOptions = () => {
    const {delivery, today, tomorrow} = this.props;

    let day_options = [];
    let time_options = [];

    if (today.length > 0) {
      day_options.push('Today');
      time_options.push(today);
    }

    if (delivery && tomorrow.length > 0) {
      day_options.push('Tomorrow');
      time_options.push(tomorrow);
    }

    let current_time_options = time_options.length > 0 ? time_options[0] : [];

    this.setState({
      day_options,
      current_time_options,
      time_options,
    });
  };

  _confirm = () => {
    let selected = this.state.day_options[this.state.selected_day_index];

    const {option, hour, mins, range} = this.getOptionHourMinsRange(selected);
    // confirm
    this.props.onConfirm(option, hour, mins, range);
  };

  getOptionHourMinsRange(selected) {
    let hour = null;
    let mins = null;
    let option = null;
    let range = '';
    let _t = this.state.current_time_options[this.state.selected_time_index];
    if (selected == 'Today') {
      range = _t;
      if (_t.toLowerCase() !== 'now') {
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
      range = _t;
      _t = _t.split(' - ');

      if (_.length > 0) {
        _t = _t[0];
      }

      _t = _t.split(':');
      hour = _t[0];
      mins = _t[1];
    }
    return {option, hour, mins, range};
  }

  /**
   * Returns true if there are time options available
   * else returns false
   * @public
   */
  hasSchedule = () => this.state.time_options.length;

  _changeTimeOptions = (index) => {
    const current_time_options = this.state.time_options[index];
    this.setState({current_time_options}, () => this.sp.scrollToIndex(0));
  };

  _onDayChange = (data, index) => {
    this.setState(
      {
        selected_day_index: index,
        selected_time_index: 0,
      },
      () => {
        // this._setTimeOptions(index);
        this._changeTimeOptions(index);
      },
    );
  };

  _onTimeValueChange = (index) => {
    this.setState({
      selected_time_index: index,
    });
    this.sp.scrollToIndex(index);
  };

  render() {
    const {animation, delivery} = this.props;
    const TITLE = delivery ? 'Delivery Time' : 'Pick Up Time';

    return (
      <Animated.View style={animation.getLayout()}>
        <View style={[defaultStyles.container]}>
          <View
            style={[
              {
                justifyContent: 'space-evenly',
                height: BAR_HEIGHT,
                paddingHorizontal: 10,
              },
            ]}>
            <TouchableOpacity
              onPress={() => this.props.toggleDelivery()}
              style={defaultStyles.closeButton}>
              <Image
                source={closeButtonImage}
                style={{resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text style={defaultStyles.title}>{TITLE}</Text>
            <TouchableOpacity
              onPress={() => {
                this._confirm();
              }}
              style={defaultStyles.pickupConfirmButton}>
              <Text style={[defaultStyles.confirmText]}>Confirm</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              },
            ]}>
            <ScrollPicker
              dataSource={this.state.day_options}
              fixedHeight={true}
              itemHeight={ITEM_HEIGHT}
              onValueChange={(data, selectedIndex) => {
                this._onDayChange(data, selectedIndex);
              }}
              renderItem={(data, index, isSelected) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'flex-end',
                      paddingEnd: 20,
                    }}>
                    <Text
                      style={
                        isSelected
                          ? defaultStyles.selected
                          : defaultStyles.notSelected
                      }>
                      {data}
                    </Text>
                  </View>
                );
              }}
              rotationEnabled={false}
              selectedIndex={0}
              wrapperHeight={WRAPPER_HEIGHT}
              wrapperStyle={{flex: 1}}
            />

            {/* Time picker */}
            <ScrollPicker
              dataSource={this.state.current_time_options}
              fixedHeight={true}
              itemHeight={ITEM_HEIGHT}
              onValueChange={(data, selectedIndex) => {
                this._onTimeValueChange(selectedIndex);
              }}
              ref={(sp) => (this.sp = sp)}
              renderItem={(data, index, isSelected) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'flex-start',
                      paddingStart: 20,
                    }}>
                    <Text
                      style={
                        isSelected
                          ? defaultStyles.selected
                          : defaultStyles.notSelected
                      }>
                      {data}
                    </Text>
                  </View>
                );
              }}
              rotationEnabled={false}
              selectedIndex={0}
              wrapperHeight={WRAPPER_HEIGHT}
              wrapperStyle={{flex: 1}}
            />

            <Line style={{top: ITEM_HEIGHT}} />
            <Line style={{top: WRAPPER_HEIGHT - ITEM_HEIGHT}} />
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
        height: 1 * alpha,
      },
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
    height: TOTAL_HEIGHT,
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
    height: 21 * alpha,
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
    top: 19 * alpha,
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
    height: 21 * alpha,
  },
  confirmText: {
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 15 * fontAlpha,
    textAlign: 'center',
  },
  selected: {
    color: 'rgb(54, 54, 54)',
    fontSize: 20 * fontAlpha,
    fontFamily: TITLE_FONT,
    fontWeight: 'bold',
  },
  notSelected: {
    color: 'rgb(82, 82, 82)',
    fontSize: 19 * fontAlpha,
    fontFamily: NON_TITLE_FONT,
  },
};
