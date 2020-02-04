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
import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from "../Common/config"
import { getMemberIdForApi } from '../Services/members_helper'
import { connect } from 'react-redux'

@connect(({ members }) => ({
  currentMember: members.profile,
  members: members,
}))
export default class CategoryCell extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  onCategoryCellPress = () => {
    const analytics = new Analytics(ANALYTICS_ID)
    analytics.event(new Event('Category', getMemberIdForApi(this.props.currentMember), this.props.categoryname))
    this.props.onSelectCategory(this.props.scrollIndex, this.props.index);
  };

  render() {
    const { categoryImage, categoryname, label } = this.props;
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
          <View style={{ flex: 1, paddingLeft: 7 * alpha, paddingTop: 5 * alpha }}>

            <View style={{ paddingBottom: 7 * alpha }}>
              {/* <Text style={styles.textWrapper}> */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {categoryImage && (
                  <Image
                    style={styles.categoryIconImage}
                    source={{ uri: categoryImage }}
                  />
                )}
                {label && <View style={styles.promoBox}>
                  <Text style={styles.promoBoxText}>{label}</Text>
                </View>}
              </View>

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
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  promoBox: {
    backgroundColor: '#e5efe5',
    borderTopLeftRadius: 5 * alpha,
    borderBottomLeftRadius: 5 * alpha,
    paddingHorizontal: 5 * alpha,
    paddingVertical: 2.5 * alpha,
    alignSelf: 'flex-end'
  },
  promoBoxText: {
    color: '#2e8b57',
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: 'right',

  },
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
    color: "rgb(135, 135, 135)",
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    width: "100%",
    flex: 1,
    marginRight: 7 * alpha,
    flexWrap: "wrap"
  },
  labelImageText: {
    backgroundColor: "transparent",
    color: "rgb(135, 135, 135)",
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
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
    color: "rgb(54, 54, 54)",
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    flex: 1,
    marginRight: 7 * alpha,
    flexWrap: "wrap"
  },
  labelImageText_selected: {
    backgroundColor: "transparent",
    color: "rgb(54, 54, 54)",
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    flex: 1,
    marginLeft: 2 * alpha,
    marginRight: 7 * alpha,
    flexWrap: "wrap"
  },
  categoryIconImage: {
    resizeMode: "contain",
    backgroundColor: "transparent",
    width: 18 * alpha,
    height: 18 * alpha
  }
});