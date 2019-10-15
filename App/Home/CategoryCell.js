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

export default class CategoryCell extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onCategoryCellPress = () => {
    this.props.onSelectCategory(this.props.scrollIndex, this.props.index);
  };

  render() {
    const { categoryImage, categoryname } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onCategoryCellPress}>
        <View
          navigation={this.props.navigation}
          style={
            this.props.selected
              ? styles.categorycell_selected
              : styles.categorycell
          }
        >
          {this.props.selected ? <View style={styles.selectbarView} /> : null}
          <View style={{ flex: 1, padding: 7 * alpha }}>
            {/* <Text style={styles.textWrapper}> */}
            {categoryImage && (
              <Image
                style={styles.categoryIconImage}
                source={{ uri: categoryImage }}
              />
            )}
            <Text
              style={
                this.props.selected && categoryImage
                  ? styles.labelImageText_selected
                  : !this.props.selected && categoryImage
                  ? styles.labelImageText
                  : this.props.selected
                  ? styles.labelText_selected
                  : styles.labelText
              }
            >
              {categoryname}
            </Text>
            {/* </Text> */}
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
    // height: 54 * alpha,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  categorycell_selected: {
    backgroundColor: "white",
    width: "100%",
    flex: 1,
    // height: 54 * alpha,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  selectbarView: {
    backgroundColor: "rgb(0, 178, 227)",
    width: 3 * alpha,
    height: "100%"
  },
  textWrapper: {
    flex: 1,
    width: "100%"
  },
  labelText: {
    backgroundColor: "transparent",
    color: "rgb(78, 77, 77)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    width: "100%",
    flex: 1,
    marginLeft: 14 * alpha,
    marginRight: 7 * alpha,
    flexWrap: "wrap"
  },
  labelImageText: {
    backgroundColor: "transparent",
    color: "rgb(78, 77, 77)",
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    flex: 1,
    marginLeft: 2 * alpha,
    marginRight: 7 * alpha,
    flexWrap: "wrap"
  },
  labelText_selected: {
    backgroundColor: "transparent",
    color: "rgb(78, 77, 77)",
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    flex: 1,
    marginLeft: 14 * alpha,
    marginRight: 7 * alpha,
    flexWrap: "wrap"
  },
  labelImageText_selected: {
    backgroundColor: "transparent",
    color: "rgb(78, 77, 77)",
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    flex: 1,
    marginLeft: 2 * alpha,
    marginRight: 7 * alpha,
    flexWrap: "wrap"
  },
  categoryIconImage: {
    resizeMode: "center",
    backgroundColor: "transparent",
    width: 18 * alpha,
    height: 18 * alpha
  }
});
