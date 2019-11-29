//
//  UsedVoucher
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  View,
  Text
} from "react-native";
import React from "react";
import { alpha, fontAlpha } from "../Common/size";
import { connect } from "react-redux";
import { KURL_INFO } from "../Utils/server";
import { TITLE_FONT, NON_TITLE_FONT } from "../Common/common_style";
@connect(({ members }) => ({
  company_id: members.company_id
}))
export default class UsedVoucher extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onVoucherPress = () => {
    const { navigate } = this.props.navigation;
    navigate("VoucherDetail", { item: this.props.item });
  };

  onTermsPressed = () => {
    const { navigate } = this.props.navigation;
    const { company_id } = this.props;

    navigate("WebCommon", {
      title: "Terms & Condition",
      web_url: KURL_INFO + "?page=voucher_terms&id=" + company_id
    });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onVoucherPress}>
        <View navigation={this.props.navigation} style={styles.usedvoucher}>
          <View style={styles.cellcontentView}>
            <Image
              source={require("./../../assets/images/group-5-copy-3-2.png")}
              style={styles.backgroundImage}
            />
            <View
              pointerEvents="box-none"
              style={{
                position: "absolute",
                left: 30 * alpha,
                width: 247 * alpha,
                top: 24 * alpha,
                bottom: 12 * alpha,
                alignItems: "flex-start"
              }}
            >
              <Text style={styles.titleText}>{this.props.title}</Text>
              <Text style={styles.descriptionText}>
                {this.props.description}
              </Text>
              <View
                style={{
                  flex: 1
                }}
              />
              <Text style={styles.dateText}>{this.props.used_date}</Text>
            </View>
            <View
              pointerEvents="box-none"
              style={{
                position: "absolute",
                left: 30 * alpha,
                right: 14 * alpha,
                top: 41 * alpha,
                height: 86 * alpha
              }}
            >
              <View
                pointerEvents="box-none"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 16 * alpha,
                  top: 43 * alpha,
                  height: 29 * alpha
                }}
              >
                <Image
                  source={require("./../../assets/images/line-16-copy-5.png")}
                  style={styles.lineImage}
                />
                <View style={styles.termsView}>
                  <TouchableOpacity
                    onPress={this.onTermsPressed}
                    style={styles.termsButton}
                  >
                    <Text style={styles.termsButtonText}>
                      Terms & Conditions
                    </Text>
                  </TouchableOpacity>
                  <Image
                    source={require("./../../assets/images/next.png")}
                    style={styles.arrowImage}
                  />
                </View>
              </View>
              <Image
                source={require("./../../assets/images/bitmap-8.png")}
                style={styles.usedImage}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  usedvoucher: {
    backgroundColor: "transparent",
    width: "100%",
    height: 140 * alpha
  },
  backgroundImage: {
    resizeMode: "cover",
    backgroundColor: "transparent",
    shadowColor: "rgba(224, 222, 222, 0.5)",
    shadowRadius: 2 * alpha,
    shadowOpacity: 1 * alpha,
    position: "absolute",
    width: 348 * alpha,
    height: 126 * alpha,
    left: 14 * alpha,
    right: 14 * alpha
  },
  cellcontentView: {
    opacity: 0.41,
    backgroundColor: "transparent",
    flex: 1,
    marginTop: 8 * alpha,
    marginBottom: 8 * alpha
  },
  titleText: {
    backgroundColor: "transparent",
    color: "rgb(68, 68, 68)",
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: "normal",

    textAlign: "left"
  },
  descriptionText: {
    color: "rgb(124, 124, 124)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent",
    marginTop: 7 * alpha
  },
  dateText: {
    color: "rgb(132, 132, 132)",
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent"
  },
  lineImage: {
    resizeMode: "cover",
    backgroundColor: "transparent",
    width: null,
    height: 2 * alpha
  },
  termsView: {
    backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 140 * alpha,
		height: 13 * alpha,
		marginRight: 1 * alpha,
		marginTop: 14 * alpha,
		flexDirection: "row",
		alignItems: "center",
  },
  termsButton: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 0 * alpha,
    height: 13 * alpha,
		width: 120 * alpha,
    marginRight: 4 * alpha
  },
  termsButtonText: {
    color: "rgb(136, 133, 133)",
		fontFamily: TITLE_FONT,
		fontSize: 10 * fontAlpha,
		fontStyle: "normal",
		width: 120 * alpha,
		textAlign: "right",
  },
  termsButtonImage: {
    resizeMode: "contain",
    marginRight: 10 * alpha
  },
  arrowImage: {
    resizeMode: "contain",
		backgroundColor: "transparent",
		flex: 1,
		alignSelf: "flex-end",
		height: 8 * alpha,
		marginLeft: 4 * alpha,
		marginBottom: 3 * alpha,
  },
  usedImage: {
    backgroundColor: "transparent",
    resizeMode: "contain",
    position: "absolute",
    width: 75 * alpha,
    right: 0,
    top: 0,
    height: 88 * alpha
  }
});
