import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Animated, AppState, Modal, TouchableWithoutFeedback, TextInput } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowWidth, windowHeight } from "../Common/size";
import { LIGHT_GREY, TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR, TABBAR_INACTIVE_TINT, TABBAR_ACTIVE_TINT, DISABLED_COLOR, LIGHT_BLUE, DEFAULT_GREY_BACKGROUND } from "../Common/common_style";


export default class ProfileMenu extends React.PureComponent {

    render() {
        let { onPress, text } = this.props
        return (
            <TouchableOpacity
                onPress={onPress}
                style={styles.menuRowbuttonButton}>
                <View
                    style={styles.menuRowView}>
                    <View
                        pointerEvents="box-none"
                        style={{
                            position: "absolute",
                            left: 0 * alpha,
                            right: 0 * alpha,
                            top: 0 * alpha,
                            bottom: 0,
                            justifyContent: "center",
                        }}>
                        <View
                            pointerEvents="box-none"
                            style={{
                                height: 24 * alpha,
                                marginLeft: 20 * alpha,
                                marginRight: 30 * alpha,
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                            <Text
                                style={styles.menuRowLabelText}>{text}</Text>
                            <View
                                style={{
                                    flex: 1,
                                }} />
                            <Image
                                source={require("./../../assets/images/next.png")}
                                style={styles.menuRowArrowImage} />
                        </View>
                    </View>
                    <View
                        pointerEvents="box-none"
                        style={{
                            position: "absolute",
                            left: 0 * alpha,
                            right: 0 * alpha,
                            top: 0 * alpha,
                            bottom: 0,
                        }}>

                        <Text
                            style={styles.menuRowDescriptionText}></Text>

                        <View
                            style={styles.menuRowLineView} />
                    </View>
                </View>
            </TouchableOpacity>
        )

    }

}


const styles = StyleSheet.create({
    menuRowView: {
        backgroundColor: "transparent",
        height: 58 * alpha,
        marginRight: 1 * alpha,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    menuRowLabelText: {
        color: "rgb(54, 54, 54)",
        fontFamily: NON_TITLE_FONT,
        fontSize: 14 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        backgroundColor: "transparent",
    },
    menuRowDisableLabelText: {
        color: "rgb(188, 188, 188)",
        fontFamily: NON_TITLE_FONT,
        fontSize: 14 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        backgroundColor: "transparent",
    },
    menuRowDescriptionText: {
        color: "rgb(188, 188, 188)",
        fontFamily: NON_TITLE_FONT,
        fontSize: 12 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        backgroundColor: "transparent",
        marginRight: 23 * alpha,
    },
    arrowTwoView: {
        backgroundColor: "transparent",
        width: 7 * alpha,
        height: 8 * alpha,
    },
    menuRowbuttonButton: {
        backgroundColor: "transparent",
        flex: 1,
    },

    menuRowLineView: {
        backgroundColor: "rgb(245, 245, 245)",
        position: "absolute",
        alignSelf: "center",
        width: 375 * alpha,
        top: 57 * alpha,
        height: 1 * alpha,
        left: 20 * alpha,
    },
    menuRowArrowImage: {
        width: 10 * alpha,
        tintColor: "rgb(195, 195, 195)",
        resizeMode: "contain",
    },
})