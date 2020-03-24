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
  LIGHT_GREY,
  TITLE_FONT,
  NON_TITLE_FONT
} from '../Common/common_style';
import { month } from '../Utils/date';

const closeButtonImage = require('./../../assets/images/x-3.png');

const DelieryTimeSelector = ({
  styles,
  state,
  animation,
  toggleDelivery,
  props,
  onSelectOrderNow,
  onSelectOrderLater,
  onHourValueChange,
  onMinuteValueChange
}) => {
  let { minute_range, hour_range } = state;
  const [isToday, setIsToday] = useState(true);
  const [selected, setSelected] = useState(0);
  let today = new Date();
  let tomorrow = new Date();

  return (
    <Animated.View style={animation.getLayout()}>
      <View style={[styles.popOutPickupView, { flex: 1, height: 350 * alpha }]}>
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

            <CustomCard
              cardStyle={componentStyle.tomorrowCard}
              isActive={selected == 2}
              text="Tomorrow"
              press={() => setSelected(2)}
            />
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
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <ScrollPicker
              ref={(sphour) => {
                this.sphour = sphour;
              }}
              dataSource={hour_range}
              selectedIndex={0}
              itemHeight={50 * alpha}
              wrapperHeight={80 * alpha}
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
                onHourValueChange(hour_range[selectedIndex], selectedIndex);
              }}
            />
            <ScrollPicker
              ref={(spminute) => {
                this.spminute = spminute;
              }}
              dataSource={minute_range}
              selectedIndex={0}
              itemHeight={50 * alpha}
              wrapperHeight={80 * alpha}
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
                onMinuteValueChange(minute_range[selectedIndex], selectedIndex);
              }}
            />
          </View>
          <View style={styles.timepickerBottomBar} />
          <View style={{ height: 30 * alpha, marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => onConfirmDeliverySchedule()}
              style={{ justifyContent: 'center' }}
            >
              <Text
                style={[componentStyle.confirmText, { paddingVertical: 10 }]}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

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

export default DelieryTimeSelector;
