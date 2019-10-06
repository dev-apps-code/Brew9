//
//  PointProductCellTwo
//  Brew9
//
//  Created by .
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, Image, TouchableWithoutFeedback, StyleSheet } from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";

export default class PointProductNoHeaderCell extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    onPointProductCellPress = () => {

    }

    render() {

        return <TouchableWithoutFeedback
            onPress={this.onPointProductCellPress}>
            <View
                navigation={this.props.navigation}
                style={styles.pointproductcell}>
                <Image
                    source={require("./../../assets/images/bg-03.png")}
                    style={styles.imageImage}/>
                <View
                    style={styles.viewView}>
                    <Text
                        style={styles.titleText}>Voucher A</Text>
                    <View
                        pointerEvents="box-none"
                        style={{
                            width: 78 * alpha,
                            height: 22 * alpha,
                            marginLeft: 13 * alpha,
                            flexDirection: "row",
                            alignItems: "flex-start",
                        }}>
                        <Text
                            style={styles.valueText}>1000</Text>
                        <Text
                            style={styles.pointsText}>Points</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    }
}

const styles = StyleSheet.create({
    pointproductcell: {
        backgroundColor: "transparent",
        width: "50%",
        height: 250 * alpha,
    },
    imageImage: {
        resizeMode: "cover",
        backgroundColor: "transparent",
        width: 170 * alpha,
        height: 170 * alpha,
        alignSelf: "center",
    },
    viewView: {
        backgroundColor: "transparent",
        height: 90 * alpha,
        alignItems: "flex-start",
    },
    titleText: {
        color: "black",
        fontFamily: "DINPro-Medium",
        fontSize: 16 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        backgroundColor: "transparent",
        marginLeft: 13 * alpha,
        marginTop: 10 * alpha,
    },
    valueText: {
        color: "rgb(0, 178, 227)",
        fontFamily: "DINPro-Medium",
        fontSize: 16 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        backgroundColor: "transparent",
    },
    pointsText: {
        color: "black",
        fontFamily: "DINPro-Medium",
        fontSize: 14 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        backgroundColor: "transparent",
        marginLeft: 3 * alpha,
        marginTop: 2 * alpha,
    },
})
