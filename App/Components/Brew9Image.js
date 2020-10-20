import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {alpha, Colors} from '@common';

class Brew9Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    loadingIndicatorOpacity: new Animated.Value(1),
  });

  onLoadImage() {
    Animated.timing(this.state.loadingIndicatorOpacity, {
      toValue: 0,
      duration: this.props.imageFadeDuration,
    }).start();
    this.props.onLoadImage();
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Image
          resizeMode="cover"
          source={this.props.placeHolderSource}
          style={[styles.absolute, this.props.style]}
        />
        <Animated.View
          resizeMode="cover"
          style={[
            styles.loadingIndicatorContainer,
            {opacity: this.state.loadingIndicatorOpacity},
            this.props.style,
            styles.image,
          ]}>
          <ActivityIndicator color={Colors.darkGray1} size="small" />
        </Animated.View>
        <View style={styles.absolute}>
          <Image
            onLoad={() => this.onLoadImage()}
            // resizeMode="cover"
            source={this.props.imageSource}
            style={[styles.productimageImage, this.props.imageStyle]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  absolute: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    alignSelf: 'center',
    height: 150 * alpha,
    resizeMode: 'cover',
    width: 300 * alpha,
  },
  loadingIndicatorContainer: {
    alignContent: 'center',
    // backgroundColor: Colors.lightGray1,
    height: 150 * alpha,
    justifyContent: 'center',
    width: 300 * alpha,
  },
  productimageImage: {
    alignSelf: 'center',
    height: 150 * alpha,
    resizeMode: 'cover',
    width: 150 * alpha,
  },
});

Brew9Image.propTypes = {
  placeHolderColor: PropTypes.string,
  placeHolderSource: PropTypes.number,
  imageSource: PropTypes.object.isRequired,
  imageFadeDuration: PropTypes.number.isRequired,
  onLoadThumbnail: PropTypes.func.isRequired,
  onLoadImage: PropTypes.func.isRequired,
  thumbnailSource: PropTypes.object.isRequired,
  thumbnailFadeDuration: PropTypes.number.isRequired,
  thumbnailBlurRadius: PropTypes.number,
};

Brew9Image.defaultProps = {
  thumbnailFadeDuration: 250,
  imageFadeDuration: 250,
  thumbnailBlurRadius: 5,
  onLoadThumbnail: Function.prototype,
  onLoadImage: Function.prototype,
};

export {Brew9Image};
