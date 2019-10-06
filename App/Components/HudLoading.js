import React, { Component } from 'react'
import SpinnerKit from 'react-native-loading-spinner-overlay'
import { barHeight, windowWidth, windowHeight, alpha } from '../Common/size.js'
// import Spinner from 'react-native-spinkit'

import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'

class HudLoading extends Component {
  render() {
    const size = 60 * alpha
    const type = 'ThreeBounce'
    const color = '#E6347E'
    return (
      <SpinnerKit
        visible={this.props.isLoading}
        style={styles.spinnerKit}
        overlayColor="rgba(0, 0, 0, 0.25)"
      >
        <View style={styles.container}>
          <View style={styles.onboarding_container}>
            <View style={styles.onboarding}>

              {/* <Image
                style={styles.onboarding_logo}
                source={require("./../../assets/images/logo.png")}
              /> */}
              <ActivityIndicator
                 size="large" color="white"
                 style={styles.spinner}
                 visible={true}
              />
            </View>
          </View>
        </View>
      </SpinnerKit>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboarding_logo: {
    marginTop: 10 * alpha,
    width: 120 * alpha,
    height: 60 * alpha,
  },
  spinner: {
    position: 'absolute',
    top: 50 * alpha,
  },
  onboarding: {
    alignItems: 'center',
    // justifyContent:'center',
    width: 120 * alpha,
    height: 120 * alpha,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: 12 * alpha,
  },
  onboarding_container: {
    width: 120 * alpha,
    height: 240 * alpha,
  },
})
export default HudLoading
