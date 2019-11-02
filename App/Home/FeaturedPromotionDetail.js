//
//  PromotionDetail
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { alpha, fontAlpha, windowWidth } from "../Common/size";
import { TITLE_FONT, NON_TITLE_FONT } from "../Common/common_style";

export default class FeaturedPromotionDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Promotion",
      headerTintColor: "black",
      headerLeft: (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={params.onBackPressed ? params.onBackPressed : () => null}
            style={styles.navigationBarItem}
          >
            <Image
              source={require("./../../assets/images/back.png")}
              style={styles.navigationBarItemIcon}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      imageWidth: 0,
      imageHeight: 0,
      image_check: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed
    });
  }

  onBackPressed = () => {
    this.props.navigation.goBack();
  };

  render() {
    const promo = this.props.navigation.getParam("details", null);

    if (!this.state.image_check) {
      Image.getSize(promo.image.url, (width, height) => {

        final_width = windowWidth
        final_height = height * windowWidth / width
        
        // if (this.props.width && !this.props.height) {
        //     this.setState({
        //       imageWidth: this.props.width,
        //       imageHeight: height * (this.props.width / width)
        //     });
        // } else if (!this.props.width && this.props.height) {
        //     this.setState({
        //       imageWidth: width * (this.props.height / height),
        //       imageHeight: this.props.height
        //     });
        // } else {
        //     this.setState({ imageWidth: width, imageHeight: height, image_check: true })
        // }
        this.setState({ imageWidth: final_width, imageHeight: final_height, image_check: true })
      })
    }
    

    console.log(this.state.imageHeight,this.state.imageWidth)
    return (
      <ScrollView style={styles.promotiondetailView}>
        <Text style={styles.titleText}>{promo.title}</Text>
        <Text style={styles.timeText}>{promo.date}</Text>
        <Image
          source={{ uri: promo.image.url }}
          style={[styles.promoimageImage, { height: this.state.imageHeight, width: this.state.imageWidth }]}
        />
        <Text style={styles.descriptionText}>{promo.description}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: "row",
    marginLeft: 8 * alpha,
    width: 70 * alpha
  },
  navigationBarItem: {
    width: "100%"
  },
  navigationBarItemTitle: {
    color: "black",
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha
  },
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
    tintColor: "black"
  },
  promotiondetailView: {
    backgroundColor: "white",
    flex: 1,
  },
  labelText: {
    color: "black",
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    backgroundColor: "transparent",
    marginTop: 13 * alpha
  },
  titleText: {
    color: "black",
    fontFamily: NON_TITLE_FONT,
    fontSize: 24 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent",
    alignSelf: "flex-start",
    width: 295 * alpha,
    marginLeft: 20 * alpha,
    marginTop: 23 * alpha
  },
  timeText: {
    color: "rgb(151, 151, 151)",
    fontFamily: "ClanPro-NarrBook",
    fontSize: 11 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent",
    alignSelf: "flex-start",
    marginLeft: 20 * alpha,
    marginTop: 6 * alpha
  },
  promoimageImage: {
    resizeMode: "contain",
    backgroundColor: "transparent",
    alignSelf: "center",
    marginTop: 18 * alpha
  },
  descriptionText: {
    color: "black",
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent",
    marginLeft: 20 * alpha,
    marginRight: 20 * alpha,
    marginTop: 20 * alpha,
    marginBottom: 20 * alpha,
  }
});
