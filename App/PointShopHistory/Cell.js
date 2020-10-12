//
//  Cell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {alpha, fontAlpha} from '../Common/size';
import {NON_TITLE_FONT} from '../Common/common_style';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onCellPress = () => {};

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPointItemCellPress}>
        <View navigation={this.props.navigation} style={styles.cellContainer}>
          <Image
            source={{uri: this.props.product_image || null}}
            style={styles.imageImage}
          />
          <View style={styles.infoContainer}>
            <View style={styles.firstRowContainer}>
              <Text numberOfLines={1} style={styles.nameText}>
                {this.props.redeem_name}
              </Text>

              <Text style={styles.pointsText}>
                {this.props.redeem_points} Points
              </Text>
            </View>
            <Text style={styles.dateText}>
              {this.props.updated_at} - {this.props.updated_at}{' '}
            </Text>
            <Text style={styles.redeemTimeText}>
              Redeem Date: {this.props.redeem_at}
            </Text>
            <View style={styles.bottomRowContainer}>
              <Text style={styles.redeemText}>Redeemed at</Text>
              <Text style={styles.shopText}>{this.props.redeem_shop}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  bottomRowContainer: {
    flexDirection: 'row',
    marginBottom: alpha * 3,
    paddingRight: alpha * 10,
  },
  cellContainer: {
    alignItems: 'center',
    borderBottomColor: 'rgb(233, 233, 233)',
    borderBottomWidth: alpha * 1,
    flexDirection: 'row',
    height: 120 * alpha,
    paddingTop: alpha * 5,
    width: '100%',
  },
  dateText: {
    backgroundColor: 'transparent',
    color: 'rgb(148, 148, 148)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginTop: 5 * alpha,
    textAlign: 'left',
    width: 169 * alpha,
  },
  firstRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: alpha * 3,
    paddingRight: alpha * 10,
    width: alpha * 260,
  },
  imageImage: {
    // backgroundColor: "rgb(246, 246, 246)",
    height: 90 * alpha,
    marginLeft: 15 * alpha,
    resizeMode: 'contain',
    width: 90 * alpha,
  },
  infoContainer: {
    marginLeft: alpha * 10,
  },
  nameText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    width: alpha * 180,
  },
  pointsText: {
    backgroundColor: 'transparent',
    color: 'rgb(148, 148, 148)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  redeemText: {
    backgroundColor: 'transparent',
    color: 'rgb(189, 186, 186)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  redeemTimeText: {
    backgroundColor: 'transparent',
    color: 'rgb(189, 186, 186)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginBottom: alpha * 5,
    marginTop: 18 * alpha,
    textAlign: 'left',
    width: 206 * alpha,
  },
  shopText: {
    backgroundColor: 'transparent',
    color: 'rgb(0, 178, 227)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
});
