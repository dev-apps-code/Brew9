//
//  Home
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { Alert, Text, Button, StyleSheet, Image, TouchableOpacity, View } from "react-native"
import React from "react"
import { alpha, fontAlpha, windowHeight } from "../Common/size"
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';
import QrCodeScanRequestObject from '../Requests/qr_code_scan_request_object'
import { connect } from 'react-redux'
import { createAction, dispatch } from '../Utils/index'
import HudLoading from "../Components/HudLoading"
import Toast, {DURATION} from 'react-native-easy-toast'
import { TITLE_FONT, NON_TITLE_FONT, TOAST_DURATION } from '../Common/common_style';

@connect(({ members, shops }) => ({
	currentMember: members.profile,
	company_id: members.company_id,
	location: members.location,
	selectedShop: shops.selectedShop
}))
export default class ScanQr extends React.Component {

    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state
        return {
            title: "Scan QR",
            headerTintColor: "black",
            headerLeft: <View
                style={styles.headerLeftContainer}>
                <TouchableOpacity
                    onPress={params.onBackPressed ? params.onBackPressed : () => null}
                    style={styles.navigationBarItem}>
                    <Image
                        source={require("./../../assets/images/back.png")}
                        style={styles.navigationBarItemIcon}/>
                </TouchableOpacity>
            </View>,
            headerRight: null,
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0
            },
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            hasCameraPermission: null,
            scanned: false,
        }
    }

    async componentDidMount() {
        this.getPermissionsAsync()
        this.props.navigation.setParams({
            onBackPressed: this.onBackPressed,
        })
    }

    onSuccessfulScan= () => {
        const { navigate } = this.props.navigation
        this.props.navigation.goBack()
		navigate("Profile")
    }
    
    loadQrCodeScan(qr_code){
        const { dispatch, currentMember } = this.props

        this.setState({ loading: true })
        const callback = eventObject => {
            this.setState({
                loading: false,
            })  
            if (eventObject.success) {
                this.refs.toast.show(eventObject.message, TOAST_DURATION, () => {
                    this.onSuccessfulScan()
                })
            }
            else {
                this.refs.toast.show(eventObject.message, TOAST_DURATION)
            }   
        }
        const obj = new QrCodeScanRequestObject(qr_code)
        obj.setUrlId(currentMember.id) 
        dispatch(
            createAction('members/loadQrCodeScan')({
                object:obj,
                callback,
            })
        )
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    componentDidUpdate() {

    }

    onBackPressed = () => {

        this.props.navigation.goBack()
    }

    render() {
        const { hasCameraPermission, scanned, currentMember } = this.state;

        if (hasCameraPermission === null) {
            return <View style={styles.qrView}><Text style={styles.noLabelText}>Requesting for camera permission</Text></View>
        }
        if (hasCameraPermission === false) {
            return <View style={styles.qrView}><Text style={styles.noLabelText}>No access to camera</Text></View>
        }
        if (currentMember === null) {
            return <View style={styles.qrView}><Text style={styles.noLabelText}>Login / Register to you account to use</Text></View>
        }
        return (
            <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            {scanned && (
                <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
            )}
            <Toast ref="toast" style={{bottom: (windowHeight / 2) - 40}}/>
            <HudLoading isLoading={this.state.loading}/>
            </View>
        )
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true })
        this.loadQrCodeScan(data)
    }
}

const styles = StyleSheet.create({
    navigationBarItemIcon: {
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
    headerLeftContainer: {
        flexDirection: "row",
        marginLeft: 8 * alpha,
        width: 70 * alpha,
    },
    navigationBarItem: {
        width: "100%"
    },
    qrView: {
        backgroundColor: "rgb(243, 243, 243)",
        flex: 1,
        justifyContent: "center"
    },
    noLabelText: {
		color: "rgb(149, 149, 149)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 12 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		backgroundColor: "transparent",
	},
})


