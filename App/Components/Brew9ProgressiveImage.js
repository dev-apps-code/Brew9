import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated, View, Image, StyleSheet} from 'react-native';

class Brew9ProgressiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageOpacity: new Animated.Value(0),
      thumbnailContainerOpacity: new Animated.Value(1),
      thumbnailOpacity: new Animated.Value(0),
    };
  }

  onLoadThumbnail() {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: this.props.thumbnailFadeDuration,
    }).start();
    this.props.onLoadThumbnail();
  }

  onLoadImage() {
    Animated.timing(this.state.thumbnailContainerOpacity, {
      toValue: 0,
      duration: this.props.imageFadeDuration,
    }).start();
    this.props.onLoadImage();
  }

  render() {
    return (
      <View style={this.props.style}>
        <Image
          resizeMode="cover"
          source={this.props.placeHolderSource}
          style={[styles.image, this.props.style]}
        />
        <Animated.View
          style={[
            styles.image,
            {opacity: this.state.thumbnailContainerOpacity},
          ]}>
          <Animated.Image
            blurRadius={this.props.thumbnailBlurRadius}
            onLoad={() => this.onLoadThumbnail()}
            resizeMode="cover"
            source={this.props.thumbnailSource}
            style={[
              styles.image,
              {opacity: this.state.thumbnailOpacity},
              this.props.style,
            ]}
          />
        </Animated.View>
        <Image
          onLoad={() => this.onLoadImage()}
          resizeMode="cover"
          source={{...this.props.imageSource, cache: 'force-cache'}}
          style={[styles.image, this.props.style]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

Brew9ProgressiveImage.propTypes = {
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

Brew9ProgressiveImage.defaultProps = {
  thumbnailFadeDuration: 250,
  imageFadeDuration: 250,
  thumbnailBlurRadius: 5,
  onLoadThumbnail: Function.prototype,
  onLoadImage: Function.prototype,
};

export {Brew9ProgressiveImage};
