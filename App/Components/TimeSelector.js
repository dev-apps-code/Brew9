import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScrollPicker from 'rn-scrollable-picker';
import {alpha, fontAlpha, windowWidth} from '../Common/size';
import {
  PRIMARY_COLOR,
  TITLE_FONT,
  NON_TITLE_FONT,
} from '../Common/common_style';
import Moment from 'moment';

const closeButtonImage = Image.resolveAssetSource(
  require('./../../assets/images/x-3.png'),
);

const TOTAL_HEIGHT = 220 * alpha;
const BAR_HEIGHT = 50 * alpha;
const ITEM_HEIGHT = 35 * alpha;
const WRAPPER_HEIGHT = ITEM_HEIGHT * 3;

class OrderForSelector extends React.Component {
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
    if (selected.toLowerCase() === 'today') {
      range = _t;
      if (_t.toLowerCase() !== 'now') {
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
      range = _t;

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
          <View style={defaultStyles.titleContainer}>
            <TouchableOpacity
              onPress={() => this.props.toggleDelivery()}
              style={defaultStyles.closeButton}>
              <Image source={closeButtonImage} />
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

          <View style={defaultStyles.pickerContainer}>
            <ScrollPicker
              dataSource={this.state.day_options}
              fixedHeight={true}
              itemHeight={ITEM_HEIGHT}
              onValueChange={(data, selectedIndex) => {
                this._onDayChange(data, selectedIndex);
              }}
              renderItem={(data, index, isSelected) => {
                return (
                  <View style={[defaultStyles.picker, defaultStyles.dayPicker]}>
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
              wrapperStyle={defaultStyles.wrapperStyle}
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
                    style={[defaultStyles.picker, defaultStyles.timePicker]}>
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
              wrapperStyle={defaultStyles.wrapperStyle}
            />

            <Line style={{top: ITEM_HEIGHT}} />
            <Line style={{top: WRAPPER_HEIGHT - ITEM_HEIGHT}} />
          </View>
        </View>
      </Animated.View>
    );
  }
}

const Line = (props) => <View style={[props.style, defaultStyles.line]} />;

const defaultStyles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10.5 * alpha,
    flexDirection: 'row',
    height: 21 * alpha,
    justifyContent: 'center',
    left: 12 * alpha,
    padding: 0,
    position: 'absolute',
    top: 19 * alpha,
    width: 21 * alpha,
  },
  confirmText: {
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 15 * fontAlpha,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#fff',
    bottom: 0 * alpha,
    flex: 1,
    height: TOTAL_HEIGHT,
    position: 'absolute',
    width: windowWidth,
  },
  dayPicker: {
    alignItems: 'flex-end',
    paddingEnd: 20,
  },
  line: {
    alignSelf: 'center',
    backgroundColor: 'rgb(245, 245, 245)',
    height: 1 * alpha,
    position: 'absolute',
    width: windowWidth,
  },
  notSelected: {
    color: 'rgb(82, 82, 82)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 19 * fontAlpha,
  },
  picker: {
    width: '100%',
  },
  pickerContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pickupConfirmButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10.5 * alpha,
    flexDirection: 'row',
    height: 21 * alpha,
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    right: 12 * alpha,
    top: 19 * alpha,
  },
  selected: {
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 20 * fontAlpha,
    fontWeight: 'bold',
  },
  timePicker: {
    alignItems: 'flex-start',
    paddingStart: 20,
  },
  title: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 17 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    position: 'absolute',
    textAlign: 'left',
    top: 19 * alpha,
  },
  titleContainer: {
    height: BAR_HEIGHT,
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  wrapperStyle: {
    flex: 1,
  },
});

export default OrderForSelector;
