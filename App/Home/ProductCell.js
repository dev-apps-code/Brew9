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
import { TITLE_FONT, NON_TITLE_FONT } from "../Common/common_style";

export default class ProductCell extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onProductCellPress = () => {
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
    const ingredients = this.props.productingredient.map((item, key) => {
      return (
        <View style={styles.ingredientView} key={key}>
          <Text numberOfLines={1} style={styles.ingredientText}>{item.name}</Text>
        </View>
      );
    });

    return (
      <TouchableWithoutFeedback onPress={this.onProductCellPress}>
        <View navigation={this.props.navigation} style={styles.productcell}>
          <View
            pointerEvents="box-none"
            style={{
              width: 74 * alpha,
              height: 74 * alpha,
              marginLeft: 3 * alpha,
              marginTop: 4 * alpha
            }}
          >
            <View
              pointerEvents="box-none"
              style={{
                position: "absolute",
                left: 0,
                top: 0 * alpha,
                bottom: 0 * alpha,
                justifyContent: "center"
              }}
            >
              <Image
                source={{ uri: this.props.productimage }}
                style={styles.productimageImage}
              />
            </View>
            {!this.props.productenable && (
              <View style={styles.soldView}>
                <Text style={styles.soldtextText}>Sold Out</Text>
              </View>
            )}
          </View>
          <View style={styles.detailsView}>
            <Text numberOfLines={2} style={styles.titleText}>
              {this.props.productname}
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

            <Text numberOfLines={2} style={styles.descriptionText}>
              {this.props.productsummary}
            </Text>
            <View
              style={{
                flex: 1
              }}
            />
           
            <Text style={styles.priceText}>
              {this.props.productprice > 0.00 && this.props.productprice ? `$${parseFloat(this.props.productprice).toFixed(2)}` : ""}
            </Text>
            
            

            {/* <View
							pointerEvents="box-none"
							style={{
								alignSelf: "stretch",
								height: 29 * alpha,
								marginRight: 1 * alpha,
								flexDirection: "row",
								alignItems: "flex-end",
							}}>
							<Text
                				style={styles.priceText}>${parseFloat(this.props.productprice).toFixed(2)}</Text>
							<View
								style={{
									flex: 1,
								}}/> */}
            {/* <View
								pointerEvents="box-none"
								style={{
									width: 61,
									height: 28,
									marginBottom: 2,
								}}>
								<TouchableOpacity
									onPress={this.onAddPressed}
									style={styles.addButton}>
									<Image
										source={require("./../../assets/images/add-5.png")}
										style={styles.addButtonImage}/>
								</TouchableOpacity>
								<View
									style={styles.selectoptionView}>
									<TouchableOpacity
										onPress={this.onButtonPressed}
										style={styles.optionButton}>
										<Text
											style={styles.optionButtonText}>Option</Text>
									</TouchableOpacity>
									<View
										style={styles.badgeView}>
										<Text
											style={styles.numberofitemText}>2</Text>
									</View>
								</View>
							</View> */}
            {/* </View> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  productcell: {
    width: "100%",
    // height: 143 * alpha,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  productimageImage: {
    backgroundColor: "transparent",
    resizeMode: "cover",
    width: 74 * alpha,
    height: 74 * alpha,
    marginLeft: 5 * alpha
  },
  soldView: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    left: 5,
    width: 74 * alpha,
    top: 62 * alpha,
    height: 22 * alpha,
    justifyContent: "center",
    alignItems: "center"
  },
  soldtextText: {
    backgroundColor: "transparent",
    color: "white",
    fontFamily: NON_TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center"
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
    color: "rgb(167, 167, 167)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    width: "100%"
  },
  priceText: {
    backgroundColor: "transparent",
    color: "rgb(54, 54, 54)",
    fontFamily: TITLE_FONT,
    fontSize: 18 * fontAlpha,
    marginTop: 5 * alpha,
    marginBottom: 30 * alpha,
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
  ingredientTwoView: {
    backgroundColor: "rgb(245, 245, 245)",
    width: 27 * alpha,
    height: 14 * alpha,
    marginLeft: 10 * alpha,
    justifyContent: "center"
  }
});
