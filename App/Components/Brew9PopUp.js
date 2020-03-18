import React, { Component } from 'react'
import { alpha, fontAlpha, windowWidth, windowHeight, LIGHT_GREY } from "../Common/size";
import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput, TouchableOpacity, Modal, ActivityIndicator, Button } from 'react-native'
import { TITLE_FONT, NON_TITLE_FONT } from '../Common/common_style';

class Brew9PopUp extends Component {

    render() {
        let { popUpVisible, title, inputPlaceholder, input, description, onPressOk, onChangeText, onBackgroundPress } = this.props
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={popUpVisible}
                onRequestClose={onBackgroundPress}>

                <TouchableWithoutFeedback onPress={onBackgroundPress} >
                    <View style={[styles.popUpBackground]}>
                        <View style={[styles.popUpContent]}>
                            <Text style={styles.titleText}>{title}</Text>
                            <View style={{ marginBottom: 10 }}>
                                {description && <View style={styles.popUpInput1}>
                                    <Text style={styles.descriptionText}>{description}</Text>
                                </View>}
                                {input && <View style={styles.popUpInput1}>
                                    <TextInput
                                        style={styles.descriptionText}
                                        placeholder={inputPlaceholder}
                                        maxLength={8}
                                        onChangeText={onChangeText}

                                    />

                                </View>}
                            </View>
                            <TouchableOpacity
                                onPress={onPressOk}
                                style={styles.popUpInput3}>
                                <Text
                                    style={styles.orderButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        )
    }
}

const styles = StyleSheet.create({
    popUpBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    popUpContent: {
        backgroundColor: 'white',
        minHeight: windowHeight / 5,
        // aspectRatio: 1,
        maxHeight: windowHeight / 2,
        paddingVertical: 20 * alpha,
        marginHorizontal: 50 * alpha,
        paddingHorizontal: 20 * alpha,
        justifyContent: 'space-between',
        borderRadius: 5 * alpha,

    },
    popUpInput1: {
        // backgroundColor: '#fff5ee',
        paddingHorizontal: 10 * alpha,
        paddingVertical: 10 * alpha,
        borderRadius: 5 * alpha,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        flexDirection: 'row'
    },
    couponCode: {
        // backgroundColor: '#f5f5f5',
        padding: 10 * alpha,
        color: LIGHT_GREY,
        fontFamily: TITLE_FONT,
        fontSize: 16 * fontAlpha,
        borderRadius: 5 * alpha,
        fontStyle: "normal",
        textAlign: "center",
        // height: 40 * alpha,
        width: 200 * alpha,
        flex: 1
    },
    popUpInput3: {
        backgroundColor: 'rgb(0, 178, 227)',
        paddingHorizontal: 10 * alpha,
        paddingVertical: 10 * alpha,
        borderRadius: 5 * alpha,
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1,
        marginTop: 5
    },
    titleText: {
        paddingBottom: 5,
        textAlign: 'center',
        fontFamily: TITLE_FONT,

    },
    descriptionText: {
        color: 'rgb(135, 135, 135)',
        fontFamily: TITLE_FONT,
        textAlign: 'center'
    },
    orderButtonText: {
        color: "rgb(254, 254, 254)",
        fontFamily: NON_TITLE_FONT,
        fontSize: 14 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
    },
})
export default Brew9PopUp
