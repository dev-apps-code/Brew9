import React, { Component } from 'react'
import SpinnerKit from 'react-native-loading-spinner-overlay'
import { barHeight, windowWidth, windowHeight, alpha } from '../Common/size.js'
import Spinner from 'react-native-spinkit'
import { TITLE_FONT, NON_TITLE_FONT } from '../Common/common_style';
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Platform, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
// import { Image } from "react-native-expo-image-cache"

class AnimationLoading extends Component {
    render() {
        let { container } = this.props
        const size = 60 * alpha
        const type = 'ThreeBounce'
        const color = '#E6347E'
        return (

            <View style={[styles.container, container]}>
                <View style={styles.onboarding_container}>
                    <View style={styles.onboarding}>
                        {Platform.OS == 'ios' ? <FastImage
                            style={styles.onboarding_logo}
                            source={
                                require("./../../assets/images/Loading.gif")
                            }
                            resizeMode={FastImage.resizeMode.contain}
                        /> :
                            <Image style={styles.onboarding_logo}
                                source={
                                    require("./../../assets/images/Loading.gif")
                                } />}

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        // backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    onboarding_logo: {
        width: 150 * alpha,
        height: 150 * alpha,
    },
    spinner: {
        position: 'absolute',
        top: 50 * alpha,
    },
    onboarding: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120 * alpha,
        height: 120 * alpha,
        backgroundColor: 'transparent',
        borderRadius: 12 * alpha,
    },
    onboarding_container: {
        width: 120 * alpha,
        height: 240 * alpha,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
export default AnimationLoading
