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
  TINT_COLOR
} from '../Common/common_style';
import { alpha, fontAlpha } from '../Common/size';
import openMap from 'react-native-open-maps';

@connect(({ shops }) => ({
  shop: shops.selectedShop
}))
export default class ShopDetails extends Component {
  constructor(props) {
    super(props);
  }

  renderFavoriteButton = () => {
    const { details, onPressFavourite } = this.props;
    let likeImage = require('./../../assets/images/like.png');

    if (details.favourite) {
      likeImage = require('./../../assets/images/likeActive.png');
    }

    return (
      <TouchableOpacity
        onPress={() => onPressFavourite(details.id, details.favourite)}
        style={styles.favoriteButton}
      >
        <Image source={likeImage} style={styles.favoriteImage} />
      </TouchableOpacity>
    );
  };

  onPressCall(phoneNumber) {
    Linking.openURL(`tel:${phoneNumber}`);
  }

  onPressDirection(lat,long) {
    let latitude = lat ? parseFloat(lat) : 0.0;
    let longitude = long ? parseFloat(long) : 0.0;
    

    openMap({ latitude: latitude, longitude: longitude });
  }

  render() {
    const { details, onPressOrderNow, shop } = this.props;
    const itemStyle = shop && shop.id == details.id ? styles.highlighted : {};
    const { start_time, end_time } = details.opening_hour;
    let hoursText = null;

    if (start_time && end_time) {
      hoursText = `${start_time} - ${end_time}`;
    }

    return (
      <View style={[styles.shopDetailView, itemStyle]}>
        <View style={styles.detailsView}>
          <View style={styles.detailView}>
            <Text style={styles.shopName}>{details.name}</Text>
            <View style={styles.openView}>
              <Text style={styles.openText}>
                {details.open ? 'Open' : 'Closed'}
              </Text>
            </View>
          </View>
          <View style={styles.detailView}>
            <Text style={styles.serviceInfoDetails}>
              Delivery | 3.5 km 26 mins
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
          <TouchableOpacity
            onPress={() => onPressOrderNow(details.id)}
            style={styles.orderButton}
          >
            <Text style={styles.orderNowText}>Order Now</Text>
          </TouchableOpacity>
          <View style={styles.accessView}>
            <TouchableOpacity
              onPress={() => this.onPressCall(details.phone_no)}
              style={styles.accessButton}
            >
              <Image source={require('./../../assets/images/call.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onPressDirection(details.latitude, details.longitude)}
              style={styles.accessButton}
            >
              <Image source={require('./../../assets/images/direction.png')} />
            </TouchableOpacity>
          </View>
        </View>
        {this.renderFavoriteButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  highlighted: {
    borderWidth: 1,
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
  openView: {
    height: alpha * 16,
    width: alpha * 45,
    borderWidth: 1,
    borderColor: '#00B2E3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailsView: {
    flex: 4,
    flexWrap: 'wrap'
  },
  orderNowView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
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
    justifyContent: 'center'
  },
  favoriteButton: {
    height: alpha * 15,
    width: alpha * 15,
    position: 'absolute',
    right: alpha * 4,
    bottom: alpha * 4
  },
  accessButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  accessView: {
    flexDirection: 'row',
    paddingHorizontal: alpha * 20
  },
  //text
  openText: {
    fontSize: fontAlpha * 9,
    color: '#00B2E3',
    fontFamily: NON_TITLE_FONT
  },
  shopName: {
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    marginRight: 10 * alpha,
    marginTop: 2 * alpha
  },
  serviceInfoDetails: {
    fontSize: 9 * fontAlpha,
    fontFamily: NON_TITLE_FONT,
    marginBottom: 10 * alpha,
    marginTop: 4 * alpha,
    color: '#363636'
  },
  detailText: {
    color: LIGHT_GREY,
    // flexWrap: 'wrap',
    fontSize: 11 * fontAlpha,
    fontFamily: NON_TITLE_FONT,
    width: '95%'
  },
  orderNowText: {
    color: TINT_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha
  },

  //image
  pinImage: {
    tintColor: LIGHT_GREY,
    // width: 8 * alpha,
    // height: 11 * alpha,
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
    // position: 'absolute',
    // right: 0,
    // bottom: 1
  }
});
