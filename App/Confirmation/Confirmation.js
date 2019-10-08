//
//  Confirmation
//  Project
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { TouchableOpacity, StyleSheet, Image, Text, View } from "react-native"
import React from "react"
import { alpha, fontAlpha} from "../Common/size"
import {connect} from "react-redux"
import {createAction, Storage} from "../Utils"
import CodeInput from 'react-native-confirmation-code-input'
import ActivateAccountRequestObject from '../Requests/activate_account_request_object'
import LoginWithSmsRequestObject from "../Requests/login_with_sms_request_object";
import CountDown from 'react-native-countdown-component'
import Toast, {DURATION} from 'react-native-easy-toast'
import HudLoading from "../Components/HudLoading"

@connect(({ members }) => ({
    members: members.profile,
	isReady: members.isReady
}))
export default class Confirmation extends React.Component {

    static navigationOptions = ({ navigation }) => {

		const { params = {} } = navigation.state
		return {
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
            code: "",
            isCounting: true,
            referral_code: null,
            country_code: this.props.navigation.getParam("country_code", ""),
            phone_no: this.props.navigation.getParam("phone_no", ""),
        }
    }

    componentDidMount() {
		this.props.navigation.setParams({
			onBackPressed: this.onBackPressed,
			onItemPressed: this.onItemPressed,
		})
    }
    
    onBackPressed = () => {
		this.props.navigation.goBack()
    }
    
    loadActivateAccount(){
        const { dispatch } = this.props
        this.setState({ loading: true })
        const callback = eventObject => {

            if (eventObject.success) {
                this.props.navigation.navigate("TabGroupOne")
            }else{
                this.refs.toast.show(eventObject.message);
            }
            this.setState({
                loading: false,
            })
        }
        const obj = new ActivateAccountRequestObject(this.state.phone_no, this.state.country_code, this.referral_code, this.state.code)
        dispatch(
            createAction('members/loadActivateAccount')({
                object:obj,
                callback,
            })
        )
    }

    loadLogin(){
        const { dispatch } = this.props
        this.setState({ loading: true })
        const callback = eventObject => {
            if (eventObject.success) {
                
            }else{
                this.refs.toast.show(eventObject.message);
            }
            this.setState({
                loading: false,
            })
        }
        const obj = new LoginWithSmsRequestObject(this.state.phone_no, this.state.country_code)
        dispatch(
            createAction('members/loadLogin')({
                object:obj,
                callback,
            })
        )
    }

    onReSendPressed = () => {
        this.loadLogin()
    }

    onSubmitPressed = () => {
        this.loadActivateAccount()
    }

    render() {

        return <View
            style={styles.confirmationView}>

            <Text
                style={styles.enterCodeText}>Enter Code</Text>
            <Text
                style={styles.messageText}>We have send you an SMS on {this.props.navigation.getParam("country_code", "")} {this.props.navigation.getParam("phone_no", "")}{"\n"}with 6 digit verification code.</Text>
            <View
                style={styles.codeView}>
                {/*<Image*/}
                {/*    source={require("./../../assets/images/group-4.png")}*/}
                {/*    style={styles.groupImage}/>*/}
                <CodeInput
                    ref="codeInputRef2"
                    keyboardType="numeric"
                    codeLength={6}
                    size={40}
                    space={4 * alpha}
                    className='border-b'
                    autoFocus={true}
                    inactiveColor={"rgba(145, 145, 145, 1)"}
                    activeColor={"rgba(0, 178, 227, 1)"}
                    onFulfill={(code) => this.setState({code: code})}
                    codeInputStyle={styles.codeText}
                />
                <TouchableOpacity
                    onPress={this.onSubmitPressed}
                    style={styles.submitButton}>
                    <Text
                        style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <Text
                style={styles.instructionText}>Didn’t receive it?</Text>
            {this.state.isCounting ? <CountDown
                until={120}
                onFinish={() => this.setState({isCounting: false})}
                style={styles.reSendButton}
                size={7}
                digitStyle={{backgroundColor: 'transparent', padding: 0, width: 20 * alpha, height: 20 * alpha}}
                digitTxtStyle={styles.countdownText}
                separatorStyle={{color: '#000000'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
            /> : <TouchableOpacity
                onPress={this.onReSendPressed}
                style={styles.reSendButton}>
                <Text
                    style={styles.reSendButtonText}>Re-send</Text>
            </TouchableOpacity>
            }
            <Toast ref="toast"
            position="center"/>
			<HudLoading isLoading={this.state.loading}/>
         
        </View>
    }
}

const styles = StyleSheet.create({
    headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
		width: 70 * alpha,
	},
	navigationBarItem: {
		width: "100%",
	},
    navigationBarItemIcon: {
        tintColor: "rgb(0, 194, 236)",
        width: 18 * alpha,
		height: 18 * alpha,
	},
    confirmationView: {
        backgroundColor: "transparent",
        flex: 1,
        alignItems: "center",
    },
    enterCodeText: {
        color: "rgb(46, 46, 46)",
        fontFamily: "SFProText-Medium",
        fontSize: 16 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "bold",
        textAlign: "left",
        backgroundColor: "transparent",
        marginTop: 83 * alpha,
    },
    messageText: {
        color: "rgb(145, 145, 145)",
        fontFamily: "Helvetica",
        fontSize: 12 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        backgroundColor: "transparent",
        marginTop: 15 * alpha,
    },
    codeView: {
        backgroundColor: "transparent",
        width: 217 * alpha,
        height: 126 * alpha,
        marginTop: 24 * alpha,
    },
    codeText: {
        backgroundColor: "transparent",
        fontFamily: "Helvetica",
        fontSize: 32 * fontAlpha,
        color: "black"
    },
    groupImage: {
        backgroundColor: "transparent",
        resizeMode: "cover",
        width: null,
        height: 5 * alpha,
        marginRight: 1 * alpha,
    },
    submitButtonImage: {
        resizeMode: "contain",
        marginRight: 10 * alpha,
    },
    submitButton: {
        backgroundColor: "rgb(0, 178, 227)",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        height: 33 * alpha,
        marginTop: 19 * alpha,
    },
    submitButtonText: {
        color: "white",
        fontFamily: "SFProText-Medium",
        fontSize: 12 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "bold",
        textAlign: "center",
    },
    instructionText: {
        color: "rgb(98, 97, 97)",
        fontFamily: "Helvetica",
        fontSize: 13 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        backgroundColor: "transparent",
        marginTop: 21 * alpha,
    },
    reSendButtonImage: {
        resizeMode: "contain",
        marginRight: 10 * alpha,
    },
    reSendButton: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        width: 50 * alpha,
        height: 12 * alpha,
        marginTop: 15 * alpha,
    },
    reSendButtonText: {
        color: "rgb(0, 178, 227)",
        fontFamily: "Helvetica",
        fontSize: 10 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
    },
    countdownText: {
        color: "rgb(98, 97, 97)",
        fontFamily: "Helvetica",
        fontSize: 12 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
    },
})
