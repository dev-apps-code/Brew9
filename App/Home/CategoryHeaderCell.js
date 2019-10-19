//
//  CategoryCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import React from "react";
import { alpha, fontAlpha } from "../Common/size";
import { TITLE_FONT, NON_TITLE_FONT } from "../Common/common_style";

export default class CategoryHeaderCell extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onCategoryCellPress = () => {
    
  };

  render() {
    const { categoryImage, categoryname } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onCategoryCellPress}>
        <View style={styles.categorycell}>
        <View
            pointerEvents="box-none"
            style={{
              backgroundColor: "transparent",
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              justifyContent: "center",
            }}>
            <View
              style={styles.lineView}/>
          </View>
          <View
            style={styles.textblockView}>
            <Text
              style={styles.headerText}>{this.props.categoryName}</Text>
              {this.props.categoryDescription && (
                  <Text
                  style={styles.descriptionText}>{this.props.categoryDescription}</Text>
              )}
          </View>
          
        </View>
        
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  categorycell: {
    backgroundColor: "transparent",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textblockView: {
    paddingTop: 10 * alpha, 
    paddingBottom: 10 * alpha,
    backgroundColor: "white",
    height: "100%",
    flexDirection: "column",
  },
  headerText: {
    color: "black",
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "rgb(135,135,135)",
    textAlign: "left",
    marginLeft: 10 * alpha,
    marginRight: 10 * alpha,
    backgroundColor: "transparent",
  },
  descriptionText: {
    color: "black",
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    color: "rgb(167, 167, 167)",
    width: 180 * alpha,
    marginLeft: 10 * alpha,
    marginRight: 10 * alpha,
    backgroundColor: "transparent",
  },
  lineView: {
    marginLeft: 10 * alpha,
    backgroundColor: "rgb(229, 227, 227)",
    height: 1,
  },
});
