import React from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {alpha, fontAlpha, NON_TITLE_FONT, Colors} from '@common';
import {ONLY_FOR_PICKUP} from '@constants';
import {defined, getResponseMsg} from '@utils';
import {connect} from 'react-redux';

class CartCell extends React.Component {
  constructor(props) {
    super(props);
  }

  onMinusPressed = () => {
    this.props.onChangeQuantity(
      this.props.item,
      this.props.index,
      'remove',
      true,
    );
  };

  onAddPressed = () => {
    this.props.onChangeQuantity(this.props.item, this.props.index, 'add', true);
  };

  render() {
    var filtered = [];
    var variants = [];

    if (this.props.variations) {
      filtered = this.props.variations.filter(function (el) {
        return el;
      });
      variants = filtered.map((a) => a.value);
    }

    const {item, isDelivery} = this.props;
    const {allow_delivery} = item;

    const allowDelivery = !defined(allow_delivery) || allow_delivery;
    const notForDelivery = isDelivery && allowDelivery === false;
    const notForDeliveryText = this.props.disabledMessage;

    return (
      <TouchableWithoutFeedback onPress={this.onCart3Press}>
        <View navigation={this.props.navigation} style={styles.cart3}>
          <View pointerEvents="box-none" style={styles.container}>
            <View pointerEvents="box-none" style={styles.cartContent}>
              <View style={styles.detailsView}>
                <View style={styles.infoView}>
                  <Text
                    style={[
                      styles.titleText,
                      notForDelivery && {color: Colors.lightGray3},
                    ]}>
                    {this.props.name}
                  </Text>
                  <Text
                    style={[
                      styles.descriptionText,
                      notForDelivery && {color: Colors.darkGray2},
                    ]}>
                    {variants.join(', ')}
                  </Text>
                  {notForDelivery && (
                    <Text style={styles.alert}>{notForDeliveryText}</Text>
                  )}
                </View>
                <View style={styles.flex} />
                <Text style={styles.priceText}>
                  ${parseFloat(this.props.price).toFixed(2)}
                </Text>
              </View>
              <View style={styles.flex} />
              <View style={styles.optionsView}>
                <View pointerEvents="box-none" style={styles.quantityContainer}>
                  <Text style={styles.quantityText}>{this.props.quantity}</Text>
                </View>
                <View pointerEvents="box-none" style={styles.buttonsContainer}>
                  <View pointerEvents="box-none" style={styles.buttonsContent}>
                    <TouchableOpacity
                      onPress={this.onMinusPressed}
                      style={styles.minusButton}>
                      <Image
                        source={require('./../../assets/images/button-4.png')}
                        style={styles.minusButtonImage}
                      />
                    </TouchableOpacity>
                    <View style={styles.flex} />
                    <TouchableOpacity
                      onPress={this.onAddPressed}
                      style={styles.addButton}>
                      <Image
                        source={require('./../../assets/images/add-17.png')}
                        style={styles.addButtonImage}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.lineView} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 23 * alpha,
    justifyContent: 'center',
    padding: 0,
    width: 23 * alpha,
  },
  addButtonImage: {
    resizeMode: 'contain',
  },
  alert: {
    color: Colors.red,
    fontSize: 10 * fontAlpha,
  },
  buttonsContainer: {
    bottom: 0 * alpha,
    justifyContent: 'center',
    position: 'absolute',
    right: 0 * alpha,
    top: 0 * alpha,
  },
  buttonsContent: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 23 * alpha,
    justifyContent: 'flex-end',
    width: 74 * alpha,
  },
  cart3: {
    backgroundColor: 'white',
    height: 70 * alpha,
    width: '100%',
  },
  cartContent: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 47 * alpha,
    marginLeft: 20 * alpha,
    marginRight: 19 * alpha,
  },
  container: {
    bottom: 0 * alpha,
    justifyContent: 'center',
    left: 0 * alpha,
    position: 'absolute',
    right: 0 * alpha,
    top: 0 * alpha,
  },
  descriptionText: {
    backgroundColor: 'transparent',
    color: 'rgb(130, 128, 128)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginTop: 4 * alpha,
    textAlign: 'left',
  },
  detailsView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 47 * alpha,
    width: 242 * alpha,
  },
  flex: {
    flex: 1,
  },
  infoView: {
    backgroundColor: 'transparent',
    height: 47 * alpha,
    width: 200 * alpha,
  },
  lineView: {
    backgroundColor: 'rgb(229, 227, 227)',
    bottom: 0 * alpha,
    height: 1 * alpha,
    left: 18 * alpha,
    position: 'absolute',
    right: 19 * alpha,
  },
  minusButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 23 * alpha,
    justifyContent: 'center',
    padding: 0,
    width: 23 * alpha,
  },
  minusButtonImage: {
    resizeMode: 'contain',
  },
  optionsView: {
    backgroundColor: 'transparent',
    height: 23 * alpha,
    width: 74 * alpha,
  },
  priceText: {
    backgroundColor: 'transparent',
    color: 'rgb(57, 57, 57)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  quantityContainer: {
    alignSelf: 'center',
    bottom: 0 * alpha,
    justifyContent: 'center',
    position: 'absolute',
    top: 0 * alpha,
  },
  quantityText: {
    backgroundColor: 'transparent',
    color: 'rgb(85, 83, 81)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  titleText: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
});
export default CartCell;
