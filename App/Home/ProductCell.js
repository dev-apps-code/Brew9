import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {
  alpha,
  fontAlpha,
  ANALYTICS_ID,
  TITLE_FONT,
  NON_TITLE_FONT,
  PRIMARY_COLOR,
  LIGHT_BLUE_BACKGROUND,
} from '@common';
import {Analytics, Event} from 'expo-analytics';
import {Image as ExpoImage} from 'react-native-expo-image-cache';

class ProductCell extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onProductCellPress = () => {
    if (this.props.productHidden != undefined && !this.props.productHidden) {
      this.props.onCellPress(this.props.item, this.props.index);
      const analytics = new Analytics(ANALYTICS_ID);
      analytics.event(new Event('Product', 'Click', this.props.item.name));
    }
  };

  onAddPressed = () => {
    this.props.onChangeQuantity(
      this.props.item,
      this.props.index,
      'add',
      false,
    );
  };

  onRemovePressed = () => {
    this.props.onChangeQuantity(
      this.props.item,
      this.props.index,
      'remove',
      false,
    );
  };

  onSelectOptionPressed = () => {
    this.props.onCellPress(this.props.item, this.props.index);
  };

  onAddPressed = () => {
    this.props.onChangeQuantity(
      this.props.item,
      this.props.index,
      'add',
      false,
    );
  };

  onRemovePressed = () => {
    this.props.onChangeQuantity(
      this.props.item,
      this.props.index,
      'remove',
      false,
    );
  };

  onSelectOptionPressed = () => {
    this.props.onCellPress(this.props.item, this.props.index);
  };

  render() {
    let {
      productingredient,
      productDiscountPrice,
      productprice,
      productimage,
      navigation,
      productHidden,
      productstatus,
      productname,
      recommended,
      productsummary,
      productTagLabel,
      productTagColor,
      productTagText,
    } = this.props;
    var ingredients = null;
    if (productingredient !== undefined) {
      ingredients = productingredient.map((item, key) => {
        var highlight = false;

        if (item.highlight == true) {
          hightlight = true;
        }

        return (
          <View
            key={key}
            style={
              item.highlight
                ? styles.ingredientHighlightView
                : styles.ingredientView
            }>
            <Text
              numberOfLines={1}
              style={
                item.highlight
                  ? styles.ingredientHighlightText
                  : styles.ingredientText
              }>
              {item.name}
            </Text>
          </View>
        );
      });
    }

    var hasDiscount =
      productDiscountPrice > 0.0 && productDiscountPrice ? true : false;
    var hasPrice = productprice > 0.0 && productprice ? true : false;
    const uri = productimage;
    return (
      <TouchableWithoutFeedback onPress={this.onProductCellPress}>
        <View style={{backgroundColor: 'white'}}>
          <View navigation={navigation} style={styles.productcell}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {productHidden ? (
                <Image
                  blurRadius={10}
                  source={{uri: productimage, cache: 'force-cache'}}
                  style={styles.productblurimageImage}
                />
              ) : (
                <ExpoImage {...{uri}} style={styles.productimageImage} />
              )}
              {productstatus != null && productstatus.length > 0 ? (
                <View style={styles.soldView}>
                  <Text style={styles.soldtextText}>{productstatus}</Text>
                </View>
              ) : null}
            </View>
            {productHidden ? (
              <View style={styles.blurView}>
                <Image
                  source={require('./../../assets/images/blur.png')}
                  style={styles.detailBlurImage}
                />
              </View>
            ) : (
              <View style={styles.detailsView}>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text numberOfLines={2} style={styles.titleText}>
                      {productname}
                    </Text>

                    {recommended && (
                      <Image
                        source={require('./../../assets/images/star_icon.png')}
                        style={styles.recommendedStarImage}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    {hasDiscount && (
                      <View
                        style={[
                          styles.promoBox,
                          {backgroundColor: productTagColor},
                        ]}>
                        <Text
                          style={[
                            styles.promoBoxText,
                            {color: productTagText},
                          ]}>
                          {productTagLabel}
                        </Text>
                      </View>
                    )}

                    {ingredients}
                  </View>

                  <Text
                    numberOfLines={hasPrice ? 2 : 3}
                    style={styles.descriptionText}>
                    {productsummary}
                  </Text>
                </View>

                {hasPrice && (
                  <View style={{flexDirection: 'row'}}>
                    {hasDiscount ? (
                      <View
                        style={{flexDirection: 'row', alignItems: 'baseline'}}>
                        <Text style={styles.priceText}>
                          {hasPrice
                            ? `$${parseFloat(productDiscountPrice).toFixed(2)}`
                            : ''}
                        </Text>

                        <Text style={styles.discountPriceText}>
                          {hasPrice
                            ? `$${parseFloat(productprice).toFixed(2)}`
                            : ''}
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.priceText}>
                        {`$${parseFloat(productprice).toFixed(2)}`}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            )}

            {/* { this.props.productHidden && (<BlurView tint="light" intensity={85} blurRadius={100} style={styles.blurView}></BlurView>)} */}

            {productHidden && (
              <Text style={styles.toBeUnvieiledText}>To Be Unveiled</Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  blurView: {
    backgroundColor: 'transparent',
    bottom: 0,
    flex: 1,
    height: 113 * alpha,
    left: 0,
    marginRight: 10 * alpha,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  descriptionText: {
    backgroundColor: 'transparent',
    color: 'rgb(100, 100, 100)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    width: '100%',
  },
  detailBlurImage: {
    backgroundColor: 'transparent',
    height: '100%',
    resizeMode: 'contain',
    width: 200 * alpha,
  },
  detailsView: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10 * alpha,
    marginRight: 10 * alpha,
    width: '100%',
  },
  discountPriceText: {
    backgroundColor: 'transparent',
    color: 'rgb(130, 130, 130)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    marginLeft: 5 * alpha,
    marginTop: 5 * alpha,
    textAlign: 'left',
    textDecorationLine: 'line-through',
  },
  ingredientHighlightText: {
    backgroundColor: 'transparent',
    color: PRIMARY_COLOR,
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    paddingHorizontal: 4 * alpha,
    textAlign: 'left',
  },
  ingredientHighlightView: {
    backgroundColor: LIGHT_BLUE_BACKGROUND,
    justifyContent: 'center',
    marginRight: 4 * alpha,
    marginVertical: 4 * alpha,
    paddingVertical: 2 * alpha,
  },
  ingredientText: {
    backgroundColor: 'transparent',
    color: 'rgb(130, 130, 130)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    paddingHorizontal: 4 * alpha,
    textAlign: 'left',
  },
  ingredientView: {
    backgroundColor: 'rgb(245, 245, 245)',
    justifyContent: 'center',
    marginRight: 4 * alpha,
    marginVertical: 4 * alpha,
    paddingVertical: 2 * alpha,
  },
  priceText: {
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 20 * fontAlpha,
    fontStyle: 'normal',
    marginTop: 5 * alpha,
    textAlign: 'left',
  },
  productblurimageImage: {
    backgroundColor: 'transparent',
    height: 74 * alpha,
    marginLeft: 5 * alpha,
    resizeMode: 'cover',
    width: 74 * alpha,
  },
  productcell: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5 * alpha,
    width: '100%',
  },
  productimageImage: {
    backgroundColor: 'transparent',
    height: 74 * alpha,
    marginLeft: 5 * alpha,
    resizeMode: 'cover',
    width: 74 * alpha,
  },
  promoBox: {
    alignSelf: 'flex-start',
    backgroundColor: '#fde9f1',
    marginRight: 2.5 * alpha,
    marginVertical: 4 * alpha,
    paddingVertical: 4 * alpha,
  },
  promoBoxText: {
    color: '#f05071',
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    paddingHorizontal: 4 * alpha,
    textAlign: 'left',
  },
  recommendedStarImage: {
    backgroundColor: 'transparent',
    height: 14 * alpha,
    marginLeft: 6 * alpha,
    marginRight: -4 * alpha,
    resizeMode: 'contain',
    width: 14 * alpha,
  },
  soldView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: 74 * alpha,
  },
  soldtextText: {
    backgroundColor: PRIMARY_COLOR,
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 10 * fontAlpha,
    paddingBottom: 2 * alpha,
    paddingLeft: 5 * alpha,
    paddingRight: 5 * alpha,
    paddingTop: 2 * alpha,
    textAlign: 'center',
  },
  titleText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  toBeUnvieiledText: {
    backgroundColor: PRIMARY_COLOR,
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    paddingBottom: 3 * alpha,
    paddingLeft: 5 * alpha,
    paddingRight: 5 * alpha,
    paddingTop: 3 * alpha,
    position: 'absolute',
    right: 0,
    textAlign: 'left',
    top: 0,
  },
});

export default ProductCell;
