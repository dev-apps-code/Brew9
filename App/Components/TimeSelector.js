import React, { useState, createRef } from 'react';
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
import _ from 'lodash';
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
  onSelectOrderNow,
  onSelectOrderLater,
  onSelectOrderTomorrow,
  onHourValueChange,
  onMinuteValueChange,
  onConfirmDeliverySchedule,
  delivery
}) => {
  const sphour = createRef();
  const spminute = createRef();
  const { minute_range, hour_range, selected_hour, selected_minute } = state;
  const [selected, setSelected] = useState(null);
  const title = delivery ? 'Delivery' : 'Pickup';

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
          {selected != null && selected != 0 && (
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
              <Text style={[componentStyle.confirmText]}>Confirm</Text>
            </TouchableOpacity>
          )}
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
              cardStyle={[componentStyle.tomorrowCard, { marginRight: 10 }]}
              isActive={selected == 1}
              text="Later"
              press={() => {
                setSelected(1);
                if (sphour && sphour.current) {
                  sphour.current.scrollToIndex(0);
                }
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
                  if (sphour && sphour.current) {
                    sphour.current.scrollToIndex(0);
                  }
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
                  ref={sphour}
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
                    spminute.current.scrollToIndex(0);
                    onHourValueChange(data, selectedIndex);
                  }}
                />
                <ScrollPicker
                  ref={spminute}
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
