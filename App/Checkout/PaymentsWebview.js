//
//  WebCommon
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, StyleSheet, TouchableOpacity, Image, Text, ActivityIndicator } from "react-native";
import React from "react";
import {connect} from "react-redux";
import ProfileRequestObject from '../Requests/profile_request_object'
import Brew9Modal from "../Components/Brew9Modal"
import {createAction} from '../Utils'
import { alpha, fontAlpha } from "../Common/size";
import { WebView } from "react-native-webview";
import { TITLE_FONT, NON_TITLE_FONT } from "../Common/common_style";
import {KPAYMENTYURL} from '../Utils/server.js'
@connect(({ members }) => ({
	currentMember: members.profile,
}))
export default class PaymentsWebview extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Payment",
      headerTintColor: "black",
      headerLeft: (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={params.onBackPressed ? params.onBackPressed : () => null}
            style={styles.navigationBarItem}
          >
            <Image
              source={require("./../../assets/images/back.png")}
              style={styles.navigationBarItemIcon}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      }
    };
  };

  constructor(props) {
    super(props);

    const amount = this.props.navigation.getParam('amount', 0) 
    const order_id = this.props.navigation.getParam('order_id', '') 
    const name = this.props.navigation.getParam('name', "") 
    const type = this.props.navigation.getParam('type', "") 
    const session_id = this.props.navigation.getParam('session_id', "") 

    this.state = {
      amount,
      order_id,
      name,
      type,
      session_id,
      modal_visible: false,
      modal_description: "",
			modal_title: "",
			modal_cancelable: false,
			modal_ok_text: null,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed,
      onItemPressed: this.onItemPressed
    });
  }

  onBackPressed = () => {
    this.props.navigation.goBack()
  };

  onClosePressed = () => {
    this.props.navigation.goBack();
  };

	renderPopup() {
		return <Brew9Modal
			title={this.state.modal_title}
			description={this.state.modal_description}
			visible={this.state.modal_visible}
			confirm_text={this.state.modal_ok_text}
			cancelable={this.state.modal_cancelable}
			okayButtonAction={this.state.modal_ok_action}
			cancelButtonAction={this.state.modal_cancel_action}
		/>
	}

  render() {
    const { name , amount, order_id, type,session_id} = this.state

    return (
      <View style={styles.mainView}>
        <WebView
          javaScriptEnable={true}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          style={styles.webviewWebView}          
          source={{ uri:  `${KPAYMENTYURL}?name=${name}&amount=${amount}&order_id=${order_id}&type=${type}&session_id=${session_id}` }}
        />    
        {this.renderPopup()}  
      </View>
    );
  }


	loadProfile(){
		const { dispatch, currentMember } = this.props

		const callback = eventObject => {

		}
		const obj = new ProfileRequestObject()
		if (currentMember != null){
			obj.setUrlId(currentMember.id)
		}
		
		dispatch(
			createAction('members/loadProfile')({
				object:obj,
				callback,
			})
		)
	}


  _onNavigationStateChange(webViewState){
    console.log(webViewState.url)

    const url = webViewState.url
    if (url.includes('hc-action-cancel')){
      this.props.navigation.goBack()
    }else if (url.includes('returnzz')){
      var regex = /[?&]([^=#]+)=([^&#]*)/g,
          params = {},
          match;
        while (match = regex.exec(url)) {
          params[match[1]] = match[2];
        }

        if (params.success == "true"){
          this.setState({
            modal_title:'Brew9',
            modal_description:decodeURIComponent(params.message),
            modal_ok_text: null,
            modal_ok_action: ()=> {
              this.setState({modal_visible:false})
              this.props.navigation.pop(2)
            },
            modal_visible:true,
          })
          this.loadProfile()
        }else{
          this.setState({
            modal_title:'Brew9',
            modal_description:decodeURIComponent(params.message),
            modal_ok_text: null,
            modal_ok_action: ()=> {
              this.setState({modal_visible:false})
              this.props.navigation.goBack()
            },
            modal_visible:true,
          })
        }

    }else if (url.includes('receipt')){
      
    }
  }
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: "row",
    marginLeft: 8 * alpha,
    width: 70 * alpha
  },
  navigationBarItem: {
    width: "100%"
  },
  navigationBarItemTitle: {
    color: "black",
    fontFamily: "DINPro-Bold",
    fontSize: 16 * fontAlpha
  },
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
    tintColor: "black"
  },
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  commonWebView: {
    backgroundColor: "white",
    flex: 1
  },
  webviewWebView: {
    backgroundColor: "transparent",
    flex: 1,
  },
  closeButton: {
    backgroundColor: "transparent",
    borderRadius: 12.5 * alpha,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    position: "absolute",
    width: 25 * alpha,
    height: 25 * alpha,
    top: 51 * alpha,
    right: 13 * alpha
  },
  closeButtonImage: {
    resizeMode: "contain",
    marginRight: 10 * alpha
  },
  closeButtonText: {
    color: "black",
    fontFamily: NON_TITLE_FONT,
    fontSize: 18 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left"
  }
});
