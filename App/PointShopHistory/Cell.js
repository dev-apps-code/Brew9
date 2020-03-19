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
  TouchableWithoutFeedback
} from "react-native";
import React from "react";
import { alpha, fontAlpha } from "../Common/size";
import { TITLE_FONT, NON_TITLE_FONT } from "../Common/common_style";

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onCellPress = () => {};

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPointItemCellPress}>
        <View navigation={this.props.navigation} style={styles.pointitemcell}>
          <View
            pointerEvents="box-none"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              justifyContent: "center"
            }}
          >
            <Image source={{ uri: this.props.product_image || null }} style={styles.imageImage} />
            
          </View>
          <View
            pointerEvents="box-none"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 15 * alpha,
              bottom: 0,
              alignItems: "flex-start"
            }}
          >
            <View
              pointerEvents="box-none"
              style={{
                alignSelf: "stretch",
                height: 17 * alpha,
                marginLeft: 118 * alpha,
                marginRight: 16 * alpha,
                flexDirection: "row",
                alignItems: "flex-start"
              }}
            >
              <Text style={styles.nameText}>{this.props.redeem_name}</Text>
              <View
                style={{
                  flex: 1
                }}
              />
              <Text style={styles.pointsText}>
                {this.props.redeem_points} Points
              </Text>
            </View>
            <Text style={styles.dateText}>
              {this.props.updated_at} - {this.props.updated_at}{" "}
            </Text>
            <Text style={styles.redeemTimeText}>
              Redeem Date: {this.props.redeem_at}
            </Text>
            <View
              pointerEvents="box-none"
              style={{
                width: 175 * alpha,
                height: 14 * alpha,
                marginLeft: 119 * alpha,
                marginTop: 5 * alpha,
                flexDirection: "row",
                alignItems: "flex-start"
              }}
            >
              <Text style={styles.redeemText}>Redeemed at</Text>
              <Text style={styles.shopText}>{this.props.redeem_shop}</Text>
            </View>
            <View
              style={{
                flex: 1
              }}
            />
            <View style={styles.lineView} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  pointitemcell: {
    backgroundColor: "transparent",
    width: "100%",
    height: 120 * alpha
  },
  imageImage: {
    // backgroundColor: "rgb(246, 246, 246)",
    resizeMode: "contain",
    width: 90 * alpha,
    height: 90 * alpha,
    marginLeft: 15 * alpha
  },
  nameText: {
    backgroundColor: "transparent",
    color: "rgb(54, 54, 54)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left"
  },
  pointsText: {
    backgroundColor: "transparent",
    color: "rgb(148, 148, 148)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left"
  },
  dateText: {
    backgroundColor: "transparent",
    color: "rgb(148, 148, 148)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    width: 169 * alpha,
    marginLeft: 119 * alpha,
    marginTop: 5 * alpha
  },
  redeemTimeText: {
    color: "rgb(189, 186, 186)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent",
    width: 206 * alpha,
    marginLeft: 119 * alpha,
    marginTop: 18 * alpha
  },
  redeemText: {
    color: "rgb(189, 186, 186)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent"
  },
  shopText: {
    color: "rgb(0, 178, 227)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent",
    marginLeft: 5 * alpha
  },
  lineView: {
    backgroundColor: "rgb(233, 233, 233)",
    alignSelf: "stretch",
    height: 1 * alpha
  }
});
