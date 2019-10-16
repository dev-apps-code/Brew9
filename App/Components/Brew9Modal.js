import React, { Component } from 'react'
import { alpha, fontAlpha, windowWidth } from "../Common/size";
import Modal, { ModalContent, ModalButton, ModalFooter } from 'react-native-modals';
import { View, Text, StyleSheet, Image, ActivityIndicator, Button } from 'react-native'

class Brew9Modal extends Component {
    
  render() {
  
    return (
        <Modal
            width={windowWidth*0.8}
            visible={this.props.visible}
            footer={
              this.props.cancelable ?
              <ModalFooter>               
                  <ModalButton
                    text={this.props.confirm_text ? this.props.confirm_text : "OK"}
                    onPress={this.props.okayButtonAction}
                  />
                  <ModalButton
                        text={this.props.cancel_text ? this.props.cancel_text : "Cancel"}
                        onPress={this.props.cancelButtonAction}
                  />
              </ModalFooter> : <ModalFooter>               
                  <ModalButton
                    text={this.props.confirm_text ? this.props.confirm_text : "OK"}
                    onPress={this.props.okayButtonAction}
                  />
              </ModalFooter>
            }>
            <ModalContent>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                <Text style={styles.description}>
                    {this.props.description}
                </Text>
            </ModalContent>
        </Modal>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.8,
    alignSelf: "center",
  },
  title: {
    color: "rgb(57, 57, 57)",
		fontFamily: "SFProText-Bold",
		fontSize: 16 * alpha,
		fontStyle: "normal",
		textAlign: "center",
    alignSelf: "center",
    marginBottom:10*alpha,
  },
  description: {
    color: "rgb(57, 57, 57)",
		fontFamily: "SFProText-Medium",
		fontSize: 14 * alpha,
		fontStyle: "normal",
		textAlign: "center",
		alignSelf: "center",
  },
  spinner: {
    position: 'absolute',
    top: 50 * alpha,
  },
  onboarding: {
    alignItems: 'center',
    // justifyContent:'center',
    width: 120 * alpha,
    height: 120 * alpha,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: 12 * alpha,
  },
  onboarding_container: {
    width: 120 * alpha,
    height: 240 * alpha,
  },
})
export default Brew9Modal
