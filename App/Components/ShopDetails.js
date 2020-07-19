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
  LIGHT_BLUE
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

  componentDidMount() {}

  renderItems(list, test, horizontal, size) {
    const items = list.map((value, value_key) => {
      return (
        <Item
          test={test}
          key={value_key}
          type={value.type}
          name={value.name}
          image={value.image}
          horizontal={horizontal}
          size={size}
        />
      );
    });
    return items;
  }

  render() {
    let { details } = this.props;
    console.log(details);
    return (
      <View style={styles.shopDetailView}>
        <View style={styles.view_1}>
          <View style={styles.view_3}>
            <Text style={styles.text_2}>{details.name}</Text>
            <View style={styles.openView}>
              <Text style={styles.text_1}>
                {details.open ? 'Open' : 'Close'}
              </Text>
            </View>
          </View>
          <View style={styles.view_3}>
            <Text style={styles.text_3}>Delivery | 3.5 km 26 mins</Text>
          </View>
          <View style={styles.view_4}>
            <Image
              source={require('./../../assets/images/location.png')}
              style={styles.pinImage}
            />
            <Text numberOfLines={2} style={styles.text_4}>
              complete long random address here, test purpose static only, 2
              lines maxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </Text>
          </View>
          <View style={styles.view_4}>
            <Image
              source={require('./../../assets/images/location.png')}
              style={styles.pinImage}
            />
            <Text numberOfLines={2} style={styles.text_4}>
              10:00 - 22:30
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.view_2}>
            <View style={styles.button_1}>
                <Text style={styles.text_5}>Order Now</Text>
            </View>
            <Image
              source={require('./../../assets/images/star.png')}
              style={styles.favoriteImage}
            />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shopDetailView: {
    height: alpha * 130,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: alpha * 10,
    flexDirection: 'row',
    padding: alpha * 10
  },
  openView: {
    height: alpha * 15,
    width: alpha * 40,
    borderWidth: 2,
    borderColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  view_1: {
    // borderWidth: 2,
    // borderColor: 'yellow',
    flex: 4
  },
  view_2: {
    // borderWidth: 2,
    // borderColor: 'yellow',
    flex: 2,
    alignItems:'center',
    justifyContent:'center'
  },
  view_3: {
    flexDirection: 'row',
  },
  view_4: {
    flexDirection: 'row',
    height: alpha * 30,
    alignItems:'center',
    width: alpha * 200
  },
  button_1: {
    width: '100%',
    height: alpha  * 40,
    borderLeftWidth: 1,
    borderLeftColor: 'rgb(240,240,240)',
    alignItems:"center",
    justifyContent:'center'
  },
  //text
  text_1: {
    marginRight: alpha * 5,
    fontSize: alpha * 9,
    color: 'skyblue'
  },
  text_2: {
    marginRight: alpha * 5,
    fontSize: alpha * 12
  },
  text_3: {
    fontSize: alpha * 9,
    marginBottom: alpha * 10
  },
  text_4: {
    fontSize: alpha * 10,
    color: LIGHT_GREY
  },
  text_5 : {
    fontSize: alpha * 12,
    color: 'skyblue'
  },

  //image
  pinImage: {
    width: 9 * alpha,
    height: 9 * alpha,
    // tintColor: 'rgb(240,240,240)'
    tintColor: 'skyblue',
    marginRight: alpha * 5
  },
  favoriteImage: {
    width: 9 * alpha,
    height: 9 * alpha,
    // tintColor: 'rgb(240,240,240)'
    tintColor: 'skyblue',
    marginRight: alpha * 5,
    position:'absolute',
    right:0,
    bottom: 0
  },
});
