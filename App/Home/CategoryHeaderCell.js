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
import { TITLE_FONT } from "../Common/common_style";
  
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
            <Text style={styles.headerText}>{this.props.categoryName}</Text>
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
      justifyContent: "center",
    },
    headerText: {
      backgroundColor: "transparent",
      color: "rgb(135, 135, 135)",
      fontFamily: TITLE_FONT,
      fontSize: 14 * fontAlpha,
      fontStyle: "normal",
      fontWeight: "normal",
      textAlign: "left",
      marginBottom: 20 * alpha,
      flex: 1,
      marginLeft: 7 * alpha,
      flexWrap: "wrap",
    },
    
  });
  