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

    onPointProductCellPress = (item_id, item_name) => {
		const { navigate } = this.props.navigation
		navigate("PointShopItem", {
			item_id: item_id,
			item_name: item_name,
		})
	}

    render() {
        const {item} = this.props

        return <TouchableWithoutFeedback
            onPress={() => this.onPointProductCellPress(item.id, item.name)}>
            <View
                navigation={this.props.navigation}
                style={styles.pointproductcell}>
                <Image
						source={{uri:item.image}}
						style={styles.imageImage}/>
                <View
                    style={styles.viewView}>
                    <Text
                        style={styles.titleText}>{item.name}</Text>
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
                            style={styles.valueText}>{item.points}</Text>
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
        backgroundColor: "#f6f4f5",
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
