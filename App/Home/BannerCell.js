//
//  BannerCell
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import React from "react"
import { TouchableWithoutFeedback, Image, View, StyleSheet } from "react-native"
import { alpha, fontAlpha } from "../Common/size";
import { Analytics, Event, PageHit } from 'expo-analytics';
import { ANALYTICS_ID } from "../Common/config"

export default class BannerCell extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    onBannerCellPress = () => {
        const analytics = new Analytics(ANALYTICS_ID)
        analytics.event(new Event('Banner', 'Click', `${this.props.bannerDescription}`))
        this.props.onPressItem(this.props.item, this.props.index)
    }

    render() {

        return <TouchableWithoutFeedback
            onPress={this.onBannerCellPress}>
            <View
                navigation={this.props.navigation}
                style={styles.bannercell}>
                <Image
                    source={{ uri: this.props.bannerImage }}
                    style={styles.bannerImage} />
            </View>
        </TouchableWithoutFeedback>
    }
}

const styles = StyleSheet.create({
    bannercell: {
        backgroundColor: "transparent",
        width: 150 * 2 * alpha,
        flex: 1,
    },
    bannerImage: {
        backgroundColor: "transparent",
        resizeMode: "cover",
        height: 150 * alpha,
        marginLeft: 5 * alpha,
        marginRight: 5 * alpha,
        marginTop: 5 * alpha,
    },
})
