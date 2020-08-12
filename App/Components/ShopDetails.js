import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Linking,
  Platform
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
          <Image resizeMode="contain" source={likeImage} />
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
    const url = Platform.select({
      ios:
        'https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=' +
        location,
      android: 'https://www.google.com/maps/dir/?api=1&destination=' + location
    });

    Linking.openURL(url);
  }

  renderAvailablity = (availability, status) => {
    const backgroundColor = availability && status === 'in_operation' ? '#00B2E3' : DISABLED_COLOR;
    const viewStyle = {
      ...styles.availabilityView,
      ...{ backgroundColor, borderColor: backgroundColor, marginTop: 10 * alpha }
    };
    const textStyle = {
      ...styles.availabilityText,
      ...{ color: 'white' }
    };
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{availability && status === 'in_operation' ? 'Open' : 'Closed'}</Text>
      </View>
    );
  };

  getStatusText = (status, isOpened) => {
    if (status === 'in_operation') {
      let orderNowText = this.props.responses.get('Order Now Button') || 'Order Now'
      let viewMoreText = this.props.responses.get('View More Button') || 'View More'
      return isOpened ? orderNowText : viewMoreText;
    }
    return this.props.responses.get(status);
  };

  render() {
    const { details, onPressOrderNow, shop, locationPermission } = this.props;
    const itemStyle = shop && shop.id === details.id ? styles.highlighted : {};
    const minutes = Math.round(details.minute_drive);
    const { start_time, end_time } = details?.opening_hour || {
      start_time: null,
      end_time: null
    };
    let hoursText = null;
    let serviceInfoText = "";
    serviceInfoText += details.delivery_option == true ? "Delivery" : "No Delivery"
    serviceInfoText += locationPermission == true ? " | " + details.kilometer_distance + ' km ' + minutes : ""
    if (locationPermission == true) {
      serviceInfoText += minutes != null && minutes > 0 ? " mins" : " min"
    }

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
            {this.renderAvailablity(details.open, status)}
          </View>
          <View style={styles.detailView}>
            <Text style={styles.serviceInfoDetails}>
              {serviceInfoText}
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
          <View style={[styles.detailTextContainer, { marginTop: 0, marginBottom: 10 * alpha }]}>
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
    height: alpha * 115,
    backgroundColor: 'white',
    marginBottom: alpha * 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // paddingTop: alpha * 10,
    paddingLeft: alpha * 10,
    paddingRight: alpha * 10,
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
    // backgroundColor: 'red',
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 10 * alpha,
  },
  detailView: {
    flexDirection: 'row'
  },
  detailTextContainer: {
    flexDirection: 'row',
    paddingRight: 10,
    marginBottom: alpha * 3,
    marginTop: alpha * 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  orderButton: {
    width: '100%',
    height: alpha * 30,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 14 * fontAlpha,
    marginRight: 10 * alpha,
    marginTop: 12 * alpha
  },
  serviceInfoDetails: {
    fontSize: 12 * fontAlpha,
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
  }
});
