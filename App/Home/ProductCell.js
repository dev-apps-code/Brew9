//
//  ProductCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import React from "react";
import { alpha, fontAlpha } from "../Common/size";
import { TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR, LIGHT_BLUE, LIGHT_BLUE_BACKGROUND, LIGHT_GREY } from "../Common/common_style";
import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from "../Common/config"
import Constants from 'expo-constants';
import { Image as ExpoImage } from "react-native-expo-image-cache";

export default class ProductCell extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  onProductCellPress = () => {

    if (this.props.productHidden != undefined && !this.props.productHidden) {
      this.props.onCellPress(this.props.item, this.props.index);
      const analytics = new Analytics(ANALYTICS_ID)
      analytics.event(new Event('Product', 'Click', this.props.item.name))

    }

  };

  onAddPressed = () => {
    this.props.onChangeQuantity(
      this.props.item,
      this.props.index,
      "add",
      false
    );
  };

  onRemovePressed = () => {
    this.props.onChangeQuantity(
      this.props.item,
      this.props.index,
      "remove",
      false
    );
  };

  onSelectOptionPressed = () => {
    this.props.onCellPress(this.props.item, this.props.index);
  };

  onAddPressed = () => {
    this.props.onChangeQuantity(
      this.props.item,
      this.props.index,
      "add",
      false
    );
  };

  onRemovePressed = () => {
    this.props.onChangeQuantity(
      this.props.item,
      this.props.index,
      "remove",
      false
    );
  };

  onSelectOptionPressed = () => {
    this.props.onCellPress(this.props.item, this.props.index);
  };

  render() {

    var ingredients = null;
    if (this.props.productingredient !== undefined) {
      ingredients = this.props.productingredient.map((item, key) => {

        var highlight = false

        if (item.highlight == true) {
          hightlight = true
        }

        return (
          <View style={item.highlight ? styles.ingredientHighlightView : styles.ingredientView} key={key}>
            <Text numberOfLines={1} style={item.highlight ? styles.ingredientHighlightText : styles.ingredientText}>{item.name}</Text>
          </View>
        );
      });
    }


    var hasPrice = this.props.productprice > 0.00 && this.props.productprice ? true : false
    const uri = this.props.productimage
    return (
      <TouchableWithoutFeedback onPress={this.onProductCellPress}>

        <View navigation={this.props.navigation} style={styles.productcell}>
          <View
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >

            {this.props.productHidden ? <Image
              source={{ uri: this.props.productimage }}
              style={styles.productblurimageImage}
              blurRadius={10}
            /> : <ExpoImage
                {...{ uri }}
                style={styles.productimageImage}

              />}


            {this.props.productstatus != null && this.props.productstatus.length > 0 ?
              <View style={styles.soldView}>
                <Text style={styles.soldtextText}>{this.props.productstatus}</Text>
              </View>
              : null}

          </View>
          {this.props.productHidden ? <View style={styles.blurView}>
            <Image
              source={require("./../../assets/images/blur.png")}
              style={styles.detailBlurImage} />
          </View> : <View style={styles.detailsView}>
              <Text numberOfLines={2} style={styles.titleText}>
                {this.props.productname}
                {this.props.recommended && (
                  <Image
                    source={require("./../../assets/images/star_icon.png")}
                    style={styles.recommendedStarImage} />
                )}
              </Text>
              <View
                pointerEvents="box-none"
                style={{
                  marginTop: 2 * alpha,
                  marginBottom: 2 * alpha,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {ingredients}
              </View>

              <Text numberOfLines={hasPrice ? 2 : 3} style={styles.descriptionText}>
                {this.props.productsummary}
              </Text>
              <View
                style={{
                  flex: 1
                }}
              />
              {hasPrice && <View style={{ flexDirection: 'row' }}>
                <Text style={styles.priceText}>
                  {hasPrice ? `$${parseFloat(this.props.productprice).toFixed(2)}` : ""}
                </Text>
                {/* <Text style={styles.discountPriceText}>
                  {hasPrice ? `$${parseFloat(this.props.productprice).toFixed(2)}` : ""}
                </Text> */}
              </View>}
            </View>
          }

          {/* { this.props.productHidden && (<BlurView tint="light" intensity={85} blurRadius={100} style={styles.blurView}></BlurView>)} */}

          {this.props.productHidden && (<Text
            style={styles.toBeUnvieiledText}>To Be Unveiled</Text>)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  promoBox: {
    backgroundColor: '#e5efe5',
    padding: 2 * alpha,
    marginVertical: 2 * alpha,
    alignSelf: 'flex-start'
  },
  promoBoxText: {
    color: '#006400',
    fontFamily: TITLE_FONT,
    fontSize: 10 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: 'left',

  },
  blurView: {
    flex: 1,
    width: "100%",
    // height: 143 * alpha,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  notBlurred: {
    ...StyleSheet.absoluteFill,
    top: Constants.statusBarHeight,
  },
  productcell: {
    backgroundColor: "white",
    width: "100%",
    // height: 143 * alpha,
    flex: 1,
    flexDirection: "row",
    paddingBottom: 10 * alpha
  },
  productimageImage: {
    backgroundColor: "transparent",
    resizeMode: "cover",
    width: 74 * alpha,
    height: 74 * alpha,
    marginLeft: 5 * alpha
  },
  blurView: {
    backgroundColor: "transparent",
    width: "100%",
    flex: 1,
    height: 113 * alpha,
    marginRight: 10 * alpha,
    marginBottom: 20 * alpha,
  },
  detailBlurImage: {
    backgroundColor: "transparent",
    resizeMode: "contain",
    width: 200 * alpha,
    height: "100%",
  },
  productblurimageImage: {
    backgroundColor: "transparent",
    resizeMode: "cover",
    width: 74 * alpha,
    height: 74 * alpha,
    marginLeft: 5 * alpha
  },

  // soldtextText: {
  //   backgroundColor: "transparent",
  //   color: "white",
  //   fontFamily: NON_TITLE_FONT,
  //   fontSize: 13 * fontAlpha,
  //   fontStyle: "normal",
  //   fontWeight: "normal",
  //   textAlign: "center"
  // },
  soldView: {
    backgroundColor: "transparent",
    // position: "absolute",
    width: 74 * alpha,
    // top: 75 * alpha,
    // left: 5 * alpha,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  soldtextText: {
    backgroundColor: PRIMARY_COLOR,
    color: "white",
    fontFamily: TITLE_FONT,
    fontSize: 10 * fontAlpha,
    textAlign: "center",
    paddingLeft: 5 * alpha,
    paddingRight: 5 * alpha,
    paddingTop: 2 * alpha,
    paddingBottom: 2 * alpha,
  },
  detailsView: {
    backgroundColor: "transparent",
    width: "100%",
    flex: 1,
    marginLeft: 10 * alpha,
    marginRight: 10 * alpha,
  },
  titleText: {
    color: "rgb(54, 54, 54)",
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent"
  },
  descriptionText: {
    backgroundColor: "transparent",
    color: "rgb(100, 100, 100)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    width: "100%"
  },
  discountPriceText: {
    marginLeft: 5 * alpha,
    backgroundColor: "transparent",
    color: "rgb(130, 130, 130)",
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    marginTop: 5 * alpha,
    marginBottom: 30 * alpha,
    fontStyle: "normal",
    textAlign: "left",
    textDecorationLine: 'line-through'
  },
  priceText: {
    backgroundColor: "transparent",
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 18 * fontAlpha,
    marginTop: 5 * alpha,
    // marginBottom: 30 * alpha,
    fontStyle: "normal",
    textAlign: "left"
  },
  addButton: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    position: "absolute",
    right: 7 * alpha,
    width: 20 * alpha,
    bottom: 1 * alpha,
    height: 20 * alpha
  },
  addButtonText: {
    color: "black",
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left"
  },
  addButtonImage: {
    resizeMode: "contain"
  },
  selectoptionView: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 0 * alpha,
    width: 61 * alpha,
    bottom: 0 * alpha,
    height: 28 * alpha
  },
  optionButton: {
    backgroundColor: "rgb(0, 178, 227)",
    borderRadius: 10 * alpha,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    position: "absolute",
    right: 6 * alpha,
    width: 55 * alpha,
    bottom: 0 * alpha,
    height: 20 * alpha
  },
  optionButtonText: {
    color: "white",
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left"
  },
  optionButtonImage: {
    resizeMode: "contain",
    marginRight: 10 * alpha
  },
  badgeView: {
    backgroundColor: "rgb(0, 178, 227)",
    borderRadius: 7 * alpha,
    borderWidth: 1 * alpha,
    borderColor: "white",
    borderStyle: "solid",
    position: "absolute",
    right: 0 * alpha,
    width: 14 * alpha,
    bottom: 13 * alpha,
    height: 15 * alpha,
    justifyContent: "center",
    alignItems: "center"
  },
  numberofitemText: {
    color: "rgb(255, 251, 251)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha,
    fontStyle: "normal",
    textAlign: "center",
    backgroundColor: "transparent"
  },

  ingredientView: {
    backgroundColor: "rgb(245, 245, 245)",
    justifyContent: "center",
    marginRight: 5 * alpha,
    marginBottom: 3 * alpha,
  },
  ingredientHighlightView: {
    backgroundColor: LIGHT_BLUE_BACKGROUND,
    justifyContent: "center",
    marginRight: 5 * alpha,
    marginBottom: 3 * alpha,
  },
  ingredientText: {
    backgroundColor: "transparent",
    color: "rgb(130, 130, 130)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    marginRight: 4 * alpha,
    marginLeft: 4 * alpha,
    marginTop: 4 * alpha,
    marginBottom: 4 * alpha
  },
  ingredientHighlightText: {
    backgroundColor: "transparent",
    color: PRIMARY_COLOR,
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    marginRight: 4 * alpha,
    marginLeft: 4 * alpha,
    marginTop: 4 * alpha,
    marginBottom: 4 * alpha
  },
  recommendedStarImage: {
    resizeMode: "contain",
    // height: 10 * alpha,
    // width: 10 * alpha,
    marginLeft: 3 * alpha,
    width: 14 * alpha,
    height: 14 * alpha,
    marginLeft: 6 * alpha,
    marginRight: -4 * alpha,
    backgroundColor: "transparent",
  },
  toBeUnvieiledText: {
    color: "white",
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: PRIMARY_COLOR,
    position: "absolute",
    paddingTop: 3 * alpha,
    paddingBottom: 3 * alpha,
    paddingRight: 5 * alpha,
    paddingLeft: 5 * alpha,
    right: 0,
    top: 0,
  },
})
