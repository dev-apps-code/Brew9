import React, { useState } from 'react';
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import ScrollPicker from 'rn-scrollable-picker';
import { alpha, windowWidth } from '../Common/size';
import {
  NON_TITLE_FONT,
  LIGHT_GREY,
  DEFAULT_GREY_BACKGROUND,
  LIGHT_BLUE,
  PRIMARY_COLOR
} from '../Common/common_style';
import { month } from '../Utils/date';

const closeButtonImage = require('./../../assets/images/x-3.png');

const DelieryTimeSelector = ({
  styles,
  state,
  animation,
  toggleDelivery,
  props
}) => {
  let { minute_range, hour_range } = state;
  const [isToday, setIsToday] = useState(true);
  let today = new Date();
  let tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  console.log('today ', today);
  console.log('tomorrow ', tomorrow);

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
          <DayCard
            cardStyle={componentStyle.todayCard}
            isActive={isToday}
            dayText="Today"
            dateText={`${month(today.getMonth())} ${today.getDate()}`}
            press={() => setIsToday(true)}
          />
          <DayCard
            cardStyle={componentStyle.tomorrowCard}
            isActive={!isToday}
            dayText="Tomorrow"
            dateText={`${month(tomorrow.getMonth())} ${tomorrow.getDate()}`}
            press={() => setIsToday(false)}
          />
        </View>
        <View style={styles.menuRowLine2View} />
        <View style={[styles.popOutTimePickerView, { height: 150 * alpha }]}>
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

        {/* <View style={{ paddingVertical: 20, height: 10 * alpha }}>
          <TouchableOpacity
            onPress={() => this.onConfirmTimePicker()}
            style={{ justifyContent: 'center' }}
          >
            <Text style={styles.pickupConfirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </Animated.View>
  );
};

const DayCard = ({
  cardStyle,
  textStyle,
  dayText,
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
            color: isActive ? '#fff' : '#333'
          }
        ]}
      >
        {dayText}
      </Text>
      <Text
        style={[
          componentStyle.cardTextStyle,
          {
            color: isActive ? '#fff' : '#333'
          }
        ]}
      >
        {dateText}
      </Text>
    </TouchableOpacity>
  );
};

const componentStyle = StyleSheet.create({
  card: {
    borderRadius: 10,
    height: 80 * alpha,
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
    textAlign: 'center'
  }
});

export default DelieryTimeSelector;
