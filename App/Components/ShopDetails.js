import React, { Component } from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
  Image
} from 'react-native';
import {
  TITLE_FONT,
  NON_TITLE_FONT,
  BUTTONBOTTOMPADDING,
  DEFAULT_GREY_BACKGROUND,
  PRIMARY_COLOR,
  TOAST_DURATION,
  LIGHT_GREY,
  LIGHT_BLUE,
  DEFAULT_BORDER_RADIUS,
  TINT_COLOR
} from '../Common/common_style';
import { alpha, fontAlpha, windowHeight } from '../Common/size';

export default class ShopDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentlyPlayed: [],
      featuredArtist: []
    };
  }

  render() {
    let { details } = this.props;
    return (
      <View style={styles.shopDetailView}>
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
              source={require('./../../assets/images/location.png')}
              style={styles.image}
            />
            <Text numberOfLines={2} style={styles.detailText}>
              complete long random address here, test purpose static only, 2
              lines maxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </Text>
          </View>
          <View style={styles.detailTextContainer}>
            <Image
              source={require('./../../assets/images/location.png')}
              style={styles.image}
            />
            <Text numberOfLines={2} style={styles.detailText}>
              10:00 - 22:30
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.orderNowView}>
          <View style={styles.orderButton}>
            <Text style={styles.orderNowText}>Order Now</Text>
          </View>
          {/* <Image
            source={require('./../../assets/images/star.png')}
            style={styles.favoriteImage}
          /> */}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    height: alpha * 15,
    width: alpha * 40,
    borderWidth: 2,
    borderColor: 'skyblue',
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
    height: alpha * 40,
    borderLeftWidth: 1,
    borderLeftColor: 'rgb(240,240,240)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  //text
  openText: {
    marginRight: alpha * 5,
    fontSize: alpha * 9,
    color: 'skyblue'
  },
  shopName: {
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    marginRight: 5 * alpha
  },
  serviceInfoDetails: {
    fontSize: 10 * fontAlpha,
    marginBottom: 10 * alpha
  },
  detailText: {
    color: LIGHT_GREY,
    flexWrap: 'wrap',
    fontSize: 12 * fontAlpha,
    fontFamily: NON_TITLE_FONT,
    width: '80%'
  },
  orderNowText: {
    color: TINT_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontWeight: 'bold'
  },

  //image
  image: {
    width: 10 * alpha,
    height: 10 * alpha,
    tintColor: LIGHT_GREY,
    marginRight: 10,
    padding: 8 * alpha,
    resizeMode: 'contain'
  },
  favoriteImage: {
    width: 9 * alpha,
    height: 9 * alpha,
    tintColor: TINT_COLOR,
    marginRight: alpha * 5,
    position: 'absolute',
    right: 0,
    bottom: 0
  }
});
