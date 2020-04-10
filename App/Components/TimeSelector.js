import React, { useState } from 'react';
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

const closeButtonImage = require('./../../assets/images/x-3.png');

const TimeSelector = ({
  styles,
  state,
  animation,
  toggleDelivery,
  selectedShop,
  onSelectOrderNow,
  onSelectOrderLater,
  onSelectOrderTomorrow,
  onHourValueChange,
  onMinuteValueChange,
  onConfirmDeliverySchedule,
  delivery
}) => {
  const { minute_range, hour_range } = state;
  const [selected, setSelected] = useState(null);
  const [option, setOption] = useState(null); // Now, Later, Tomorrow
  const [selectedHour, setSelectedHour] = useState(null); // selected hour
  const [selectedMinute, setSelectedMinute] = useState(null); // selected minute
  const { opening_hour, delivery_hour } = selectedShop;
  const title = delivery ? 'Delivery' : 'Pick Up';

  const setTimeOptions = () => {
    var curr_time = Moment(new Date(), 'h:mm');
    var hours = curr_time.hours();
    var minutes = curr_time.minutes();

    var start_time = opening_hour.start_time;
    var end_time = opening_hour.end_time;

    var order_start_time = Moment(start_time, 'h:mm');
    var order_end_time = Moment(end_time, 'h:mm');

    if (delivery) {
      const { today, tomorrow } = delivery_hour;
      start_time = today.start_time;
      end_time = today.end_time;

      // today delivery hours
      order_start_time = Moment(start_time, 'h:mm');
      order_end_time = Moment(end_time, 'h:mm');
      hours = order_start_time.hours();
      minutes = order_start_time.minutes();

      if (option === 'Tomorrow') {
        // Tomorrow option
        start_time = tomorrow.start_time;
        end_time = tomorrow.end_time;

        order_start_time = Moment(start_time, 'h:mm');
        order_end_time = Moment(end_time, 'h:mm');

        // start hour of selection start of tom delivery start time
        hours = order_start_time.hours();

        // start minute of selection start of tom delivery start time
        minutes = order_start_time.minutes();
    } // end delivery 

    var minutes_array  = ['00', '15', '30', '45'];
    var available_minutes = [];

    // get available minutes based on hour now and order start time hours
    if (hours >= order_start_time.hours() & minutes < 45) {
      available_minutes = _.filter(minutes_array, (min) => parseInt(min) > minutes);
    }

    // get available minutes if hour now is >= order_end_time hours
    if (hours >= order_end_time.hours()) {
      available_minutes = _.filter(minutes_array, (min) => parseInt(min) < order_end_time.minutes())
    }

    
    
  };

  return (
    <Animated.View style={animation.getLayout()}>
      <View style={[styles.popOutPickupView, { flex: 1, height: 350 * alpha }]}>
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
            <Image source={closeButtonImage} style={styles.closeButtonImage} />
          </TouchableOpacity>
          <Text style={styles.paymentMethodTwoText}>{title}</Text>
          <TouchableOpacity
            onPress={() => onConfirmDeliverySchedule()}
            style={styles.pickupConfirmButton}
          >
            <Text style={[componentStyle.confirmText]}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: DEFAULT_GREY_BACKGROUND,
            height: 80 * alpha,
            flexDirection: 'row'
          }}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <CustomCard
              cardStyle={componentStyle.todayCard}
              isActive={selected == 0}
              text="Now"
              press={() => {
                setSelected(0);
                onSelectOrderNow();
              }}
            />
            <CustomCard
              cardStyle={componentStyle.tomorrowCard}
              isActive={selected == 1}
              text="Later"
              press={() => {
                setSelected(1);
                onSelectOrderLater();
              }}
            />

            {delivery && (
              <CustomCard
                cardStyle={componentStyle.tomorrowCard}
                isActive={selected == 2}
                text="Tomorrow"
                press={() => {
                  setSelected(2);
                  onSelectOrderTomorrow();
                }}
              />
            )}
          </ScrollView>
        </View>
        {/* <View style={styles.menuRowLine2View} /> */}
        <View
          style={[
            styles.popOutTimePickerView,
            {
              height: 100 * alpha,
              flexDirection: 'column',
              bottom: 80 * alpha
            }
          ]}
        >
          {selected != 0 && selected != null && (
            <View>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <ScrollPicker
                  ref={(sphour) => {
                    this.sphour = sphour;
                  }}
                  dataSource={hour_range}
                  selectedIndex={0}
                  itemHeight={50 * alpha}
                  wrapperHeight={50 * alpha}
                  wrapperStyle={{
                    backgroundColor: 'transparent',
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
                    onHourValueChange(data, selectedIndex);
                  }}
                />
                <ScrollPicker
                  ref={(spminute) => {
                    this.spminute = spminute;
                  }}
                  dataSource={minute_range}
                  selectedIndex={0}
                  itemHeight={50 * alpha}
                  wrapperHeight={50 * alpha}
                  wrapperStyle={{
                    backgroundColor: 'transparent',
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
                    onMinuteValueChange(data, selectedIndex);
                  }}
                />
              </View>
              {/* <View style={styles.timepickerBottomBar}></View> */}
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
};
``;

const CustomCard = ({
  cardStyle,
  textStyle,
  text,
  dateText,
  isActive,
  press
}) => {
  return (
    <TouchableOpacity
      style={[
        componentStyle.card,
        cardStyle,
        {
          backgroundColor: isActive ? PRIMARY_COLOR : '#fff'
        }
      ]}
      onPress={() => press()}
    >
      <Text
        style={[
          componentStyle.cardTextStyle,
          {
            color: isActive ? '#fff' : '#ccc'
          }
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const componentStyle = StyleSheet.create({
  card: {
    borderRadius: 5 * alpha,
    height: 40 * alpha,
    justifyContent: 'center',
    margin: 20,
    width: windowWidth / 2 - 40
  },
  todayCard: {
    marginLeft: 30,
    marginRight: 10
  },
  tomorrowCard: {
    marginLeft: 10,
    marginRight: 30
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
  }
});

export default TimeSelector;
