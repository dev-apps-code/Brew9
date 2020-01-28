import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Animated, AppState, Modal, TouchableWithoutFeedback, TextInput } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowWidth, windowHeight } from "../Common/size";
import { LIGHT_GREY, TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR, TABBAR_INACTIVE_TINT, TABBAR_ACTIVE_TINT, DISABLED_COLOR, LIGHT_BLUE, DEFAULT_GREY_BACKGROUND } from "../Common/common_style";


export default class ProfileRowMenu extends React.PureComponent {

    render() {
        let { onPress, icon, value, title, iconStyle } = this.props
        return (
            <TouchableOpacity
                onPress={onPress}
                style={styles.pointButtonView}
            >
                <View
                    style={styles.pointView}>
                    <Image
                        source={icon}
                        style={[styles.pointiconImage, iconStyle]} />
                    <Text
                        style={styles.pointvalueText}>{value}</Text>
                    <View style={{
                        flexDirection: "row",
                        marginTop: 5 * alpha
                    }}>
                        <Text style={styles.pointText}>{title}</Text>
                        <Image
                            source={require("./../../assets/images/next.png")}
                            style={styles.infoArrow} />
                    </View>
                </View>
            </TouchableOpacity>
        )

    }

}


const styles = StyleSheet.create({
    pointButtonView: {
        alignSelf: "center",
        backgroundColor: "transparent",
        // width: (windowWidth - 60) / 3,
        height: 83 * alpha,
        alignItems: "center",
        elevation: 2 * alpha,
        // borderWidth: 1
    },
    pointView: {
        backgroundColor: "transparent",
        // width: (windowWidth - 60) / 3,
        aspectRatio: 1,
        height: 83 * alpha,
        alignItems: "center",
    },
    pointiconImage: {
        tintColor: LIGHT_GREY,
        resizeMode: "contain",
        backgroundColor: "transparent",
        width: 49 * alpha,
        height: 33 * alpha,
    },
    pointvalueText: {
        color: PRIMARY_COLOR,
        fontFamily: TITLE_FONT,
        fontSize: 18 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        backgroundColor: "transparent",
        marginTop: 6 * alpha,
    },
    pointText: {
        color: "rgb(54, 54, 54)",
        fontFamily: TITLE_FONT,
        fontSize: 13 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        backgroundColor: "transparent",
        marginLeft: 14 * alpha,
    },
    infoArrow: {
        width: 9 * alpha,
        marginLeft: 5 * alpha,
        height: "100%",
        tintColor: "rgb(54, 54, 54)",
        resizeMode: "contain",
    },
})