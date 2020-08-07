import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import {
  TITLE_FONT,
  NON_TITLE_FONT,
  LIGHT_GREY,
  DEFAULT_BORDER_RADIUS,
  TINT_COLOR,
  DISABLED_COLOR
} from '../Common/common_style';
import { alpha, fontAlpha } from '../Common/size';
import openMap from 'react-native-open-maps';

@connect(({ members, shops, config }) => ({
  currentUser: members.profile,
  shop: shops.selectedShop,
  responses: config.responses
}))
export default class ShopDetails extends Component {
  constructor(props) {
    super(props);
  }

  renderFavoriteButton = (disabled) => {
    const { currentUser, details, onPressFavourite } = this.props;
    if (currentUser !== null) {
      let likeImage = require('./../../assets/images/like.png');

      if (details.favourite) {
        likeImage = require('./../../assets/images/likeActive.png');
      }

      return (
        <TouchableOpacity
          onPress={() => onPressFavourite(details.id, details.favourite)}
          style={styles.favoriteButton}
          {...{ disabled }}
        >
          <Image source={likeImage} style={styles.favoriteImage} />
        </TouchableOpacity>
      );
    }
  };

  onPressCall(phoneNumber) {
    Linking.openURL(`tel:${phoneNumber}`);
  }

  onPressDirection(lat, long) {
    let latitude = lat ? parseFloat(lat) : 4.8886091;
    let longitude = long ? parseFloat(long) : 114.8976136;
    let location = latitude + ',' + longitude;

    openMap({ query: location });
  }

  renderAvailablity = (availability) => {
    const backgroundColor = availability ? '#00B2E3' : DISABLED_COLOR;
    const viewStyle = {
      ...styles.availabilityView,
      ...{ backgroundColor, borderColor: backgroundColor }
    };
    const textStyle = {
      ...styles.availabilityText,
      ...{ color: 'white' }
    };
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{availability ? 'Open' : 'Closed'}</Text>
      </View>
    );
  };

  getStatusText = (status, isOpened) => {
    if (status === 'in_operation') {
      return isOpened ? 'Open' : 'Closed';
    }
    return this.props.responses.get(status);
  };

  render() {
    const { details, onPressOrderNow, shop } = this.props;
    const itemStyle = shop && shop.id === details.id ? styles.highlighted : {};
    const minutes = Math.round(details.minute_drive);
    const { start_time, end_time } = details?.opening_hour || {
      start_time: null,
      end_time: null
    };
    let hoursText = null;

    if (start_time && end_time) {
      hoursText = `${start_time} - ${end_time}`;
    }

    const { status } = details;
    const statusText = this.getStatusText(status, details.open);
    const disabled = status !== 'in_operation';
    const disabledStyle = disabled ? { opacity: 0.5 } : {};
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.shopDetailView, itemStyle, disabledStyle]}
        onPress={() => onPressOrderNow(details.id)}
        {...{ disabled }}
      >
        <View style={styles.detailsView}>
          <View style={styles.detailView}>
            <Text style={styles.shopName}>{details.name}</Text>
            {this.renderAvailablity(details.open)}
          </View>
          <View style={styles.detailView}>
            <Text style={styles.serviceInfoDetails}>
              {'Delivery | ' +
                details.kilometer_distance +
                ' km ' +
                minutes +
                ' mins'}
            </Text>
          </View>
          <View style={styles.detailTextContainer}>
            <Image
              source={require('./../../assets/images/Fill.png')}
              style={styles.pinImage}
            />
            <Text numberOfLines={2} style={styles.detailText}>
              {details.short_address}
            </Text>
          </View>
          <View style={styles.detailTextContainer}>
            <Image
              source={require('./../../assets/images/Group.png')}
              style={styles.clockImage}
            />
            <Text numberOfLines={2} style={styles.detailText}>
              {hoursText}
            </Text>
          </View>
        </View>
        <View style={styles.orderNowView}>
          <View style={styles.orderButton}>
            <Text style={styles.orderNowText}>{statusText}</Text>
          </View>
          <View style={styles.accessView}>
            <TouchableOpacity
              onPress={() => this.onPressCall(details.phone_no)}
              style={styles.accessButton}
              {...{ disabled }}
            >
              <Image source={require('./../../assets/images/phone-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.onPressDirection(details.latitude, details.longitude)
              }
              style={styles.accessButton}
              {...{ disabled }}
            >
              <Image
                source={require('./../../assets/images/direction-icon-ss.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {this.renderFavoriteButton(disabled)}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  highlighted: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#00B2E3'
  },
  shopDetailView: {
    height: alpha * 130,
    backgroundColor: 'white',
    marginBottom: alpha * 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: alpha * 10,
    borderRadius: DEFAULT_BORDER_RADIUS
  },
  availabilityView: {
    height: alpha * 16,
    width: alpha * 45,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2 * alpha
  },
  detailsView: {
    // backgroundColor: 'yellow',
    flex: 4,
    flexWrap: 'wrap'
  },
  orderNowView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  detailView: {
    flexDirection: 'row'
  },
  detailTextContainer: {
    flexDirection: 'row',
    paddingRight: 10,
    height: alpha * 30,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  orderButton: {
    width: '100%',
    height: alpha * 30,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue'
  },
  favoriteButton: {
    height: alpha * 30,
    width: alpha * 40,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  accessButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  accessView: {
    flexDirection: 'row',
    paddingHorizontal: alpha * 10
  },
  //text
  availabilityText: {
    fontSize: fontAlpha * 10,
    color: '#00B2E3',
    fontFamily: TITLE_FONT
  },
  shopName: {
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    marginRight: 10 * alpha,
    marginTop: 2 * alpha
  },
  serviceInfoDetails: {
    fontSize: 10 * fontAlpha,
    fontFamily: NON_TITLE_FONT,
    marginBottom: 10 * alpha,
    marginTop: 4 * alpha,
    color: '#363636'
  },
  detailText: {
    color: LIGHT_GREY,
    fontSize: 12 * fontAlpha,
    fontFamily: NON_TITLE_FONT,
    width: '95%'
  },
  orderNowText: {
    color: TINT_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha
  },
  pinImage: {
    tintColor: LIGHT_GREY,
    marginRight: alpha * 7
  },
  clockImage: {
    tintColor: LIGHT_GREY,
    width: 10 * alpha,
    height: 10 * alpha,
    marginRight: alpha * 8
  },
  favoriteImage: {
    width: 13 * alpha,
    height: 11 * alpha
  }
});
