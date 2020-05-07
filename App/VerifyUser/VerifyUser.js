import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import React from 'react';
import { alpha, fontAlpha, windowWidth, windowHeight } from '../Common/size';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import HudLoading from '../Components/HudLoading';
import ActivateAccountRequestObject from '../Requests/activate_account_request_object';
import LoginWithSmsRequestObject from '../Requests/login_with_sms_request_object';
import { createAction } from '../Utils';
import CountDown from 'react-native-countdown-component';
import {
  KURL_TERMS_OF_SERVICE,
  KURL_PRIVACY_POLICY,
  KURL_EULA,
  KSERVERURL,
  APPBUILDVERSIONANDROID
} from '../Utils/server';
import Hyperlink from 'react-native-hyperlink';
import {
  TITLE_FONT,
  NON_TITLE_FONT,
  TOAST_DURATION
} from '../Common/common_style';

@connect(({ members }) => ({
  members: members.profile,
  company_id: members.company_id,
  location: members.location
}))
export default class VerifyUser extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
      headerLeft: null,
      headerRight: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      phone_no: null,
      country_code: '673',
      country: 'bn',
      login_success: false,
      code: '',
      code_from_server: '',
      is_counting: false,
      count_down: 3
    };
  }

  async componentDidMount() {
    // let str = KSERVERURL;
    // let r = str.match(/https?:\/\/(.*?)\//);
    // let link = r[1];
    // if (link != 'app.brew9.co'){
    //   this.refs.toast.show(
    //     `${link} +  - api version ${KCURRENT_API_VERSION_HEADER} - build no  ${APPBUILDVERSIONANDROID}`
    //   );
    // }
  }

  async reset() {
    // console.log("back to verify page");
    // console.log(KSERVERURL);
    let str = KSERVERURL;
    let r = str.match(/https?:\/\/(.*?)\//);
    let link = r[1];
    // console.log(link)
    this.refs.toast.show(
      link + ' - api version 2 - build no ' + APPBUILDVERSIONANDROID
    );
    this.props.navigation.state.params.onGoBack();
    this.props.navigation.goBack();
  }

  componentWillMount() {}

  onTermsAndConditionsPressed = (url, title) => {
    url = KURL_EULA;
    const { navigate } = this.props.navigation;
    navigate('WebCommon', {
      title: title,
      web_url: url + '&id=' + this.props.company_id,
      onGoBack: () => this.reset()
    });
  };

  onClosePressed = () => {
    const { navigation } = this.props;

    if (
      navigation.getParam('returnToRoute') != undefined &&
      navigation.getParam('returnToRoute') != null
    ) {
      navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('TabGroupOne');
    }
  };

  onSendPressed = () => {
    Keyboard.dismiss();
    if (this.state.is_counting) {
      this.refs.toast.show(
        'Please wait for 2 minutes before trying to resend',
        TOAST_DURATION
      );
      return;
    }
    this.loadLogin();
  };

  onUpdateCode(iso2) {
    var country_code = this.phone.getCountryCode();
    this.setState({
      country: iso2,
      country_code: country_code
    });
  }

  loadLogin() {
    const { dispatch } = this.props;
    const { phone_no, country_code } = this.state;

    if (isNaN(phone_no)) {
      this.refs.toast.show(
        'Please ensure you have enter valid phone number!',
        TOAST_DURATION
      );
      return;
    }
    if (phone_no == null || phone_no == '') {
      this.refs.toast.show(
        'Please ensure you have enter your phone number!',
        TOAST_DURATION
      );
      return;
    }

    if (phone_no.length < 7) {
      this.refs.toast.show('Your phone number is too short', TOAST_DURATION);
      return;
    }

    if (country_code == null || country_code == '') {
      this.refs.toast.show(
        'Please ensure you have enter a country code!',
        TOAST_DURATION
      );
      return;
    }

    this.setState({ loading: true });
    const callback = (eventObject) => {
      if (eventObject.success) {
        console.log(eventObject);
        this.setState({
          login_success: true,
          is_counting: true,
          code_from_server: eventObject.result.code
          // code:eventObject.result.code
        });
      }
      this.setState({
        loading: false
      });
    };
    const obj = new LoginWithSmsRequestObject(phone_no, country_code);
    dispatch(
      createAction('members/loadLogin')({
        object: obj,
        callback
      })
    );
  }

  onVerifyPressed = () => {
    Keyboard.dismiss();
    this.loadActivateAccount();
  };

  loadActivateAccount() {
    const { dispatch } = this.props;
    this.setState({ loading: true });
    const callback = (eventObject) => {
      this.setState({
        loading: false
      });
      if (eventObject.success) {
        var obj = eventObject.result;
        if (obj.name == '' || obj.name == null) {
          const { navigate } = this.props.navigation;
          navigate('Register');
        } else {
          const { navigation } = this.props;
          if (
            navigation.getParam('returnToRoute') != undefined &&
            navigation.getParam('returnToRoute') != null
          ) {
            navigation.goBack();
          } else {
            this.props.navigation.navigate('TabGroupOne');
          }
        }
      } else {
        this.refs.toast.show(eventObject.message, TOAST_DURATION);
      }
    };
    const obj = new ActivateAccountRequestObject(
      this.state.phone_no,
      this.state.country_code,
      this.referral_code,
      this.state.code
    );
    dispatch(
      createAction('members/loadActivateAccount')({
        object: obj,
        callback
      })
    );
  }

  lastTap = null;
  tapCount = 1;
  /**
   * Tap 10 times within 15 seconds
   */
  handleChangeServerTap = async () => {
    const now = Date.now();
    const PRESS_DELAY = 15000;

    if (this.lastTap && now - this.lastTap < PRESS_DELAY) {
      // await changeServerIndex(KSERVERURLLIST.length);
      this.tapCount++;
      console.log('tapped %s times', this.tapCount);

      if (this.tapCount >= 5 && this.tapCount < 10) {
        let count = this.tapCount;
        let tap = count < 9 ? 'taps': 'tap';
        let toastText = `You are ${10 - count} ${tap} away to change server.`;
        this.refs.tapToast.show(toastText, DURATION.FOREVER);
      }
      if (this.tapCount == 10) {
        this.refs.tapToast.close();
        this.props.navigation.push('ChangeServer');
        this.tapCount = 1;
      }
    } else {
      this.lastTap = now;
      this.tapCount = 1;
    }
  };

  render() {
    const { members } = this.props;
    return (
      <View style={styles.verifyuserView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={this.onClosePressed}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableWithoutFeedback
            onPressOut={this.handleChangeServerTap.bind(this)}
          >
            <Image
              source={require('./../../assets/images/group-24-4.png')}
              style={styles.logoImage}
            />
          </TouchableWithoutFeedback>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.messageText}>
            Enter your mobile number to continue.
          </Text>
          <View style={styles.formView}>
            <View
              pointerEvents="box-none"
              style={{
                height: 42 * alpha,
                flexDirection: 'row',
                alignItems: 'space-between'
              }}
            >
              <View style={styles.countryCodeView}>
                <Text style={styles.countrycodeButtonText}>+673</Text>

                {/* <PhoneInput
									ref={(ref) => { this.phone = ref }}
									initialCountry={this.state.country}
									style={{marginLeft: 10 * alpha}}
									textStyle={styles.phoneCountryCodeText}
									textProps={{keyboardType:"number-pad", editable:false}}
									onSelectCountry={(iso2) => this.onUpdateCode(iso2)}
									offset={10}/> */}
              </View>
              <View
                style={{
                  flex: 1
                }}
              />
              <View style={styles.numberView}>
                <TextInput
                  autoCorrect={false}
                  keyboardType="phone-pad"
                  placeholder="123456789"
                  style={styles.textInputTextInput}
                  // maxLength={7}
                  onChangeText={(phone_no) => this.setState({ phone_no })}
                />
                <View
                  style={{
                    flex: 1
                  }}
                />
                <TouchableOpacity
                  onPress={this.onSendPressed}
                  style={styles.sendButton}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
            {this.state.login_success ? (
              <View style={styles.activationView}>
                <TextInput
                  autoCorrect={false}
                  placeholder="Activation Code"
                  keyboardType="phone-pad"
                  value={this.state.code}
                  style={styles.activationCodeTextInput}
                  onChangeText={(code) => this.setState({ code: code })}
                />

                {/* <OTPInputView
						style={styles.activationCodeTextInput}
						pinCount={6}
						// code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
						// onCodeChanged = {code => { this.setState({code})}}
						autoFocusOnLoad
						codeInputFieldStyle={styles.underlineStyleBase}
						codeInputHighlightStyle={styles.underlineStyleHighLighted}
						onCodeFilled = {(code => {
							console.log(`Your verification code for Brew9 is ${code}`)
						})}
					/> */}
                <View
                  style={{
                    flex: 1
                  }}
                />
                <TouchableOpacity
                  onPress={this.onVerifyPressed}
                  style={styles.verifyButton}
                >
                  <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <View style={styles.countDownContainer}>
              <View style={styles.countDownWrapper}>
                {this.state.is_counting ? (
                  <CountDown
                    until={120}
                    onFinish={() => this.setState({ is_counting: false })}
                    running={this.state.is_counting}
                    style={
                      this.state.is_counting
                        ? styles.sendCountdown
                        : styles.hidden
                    }
                    size={12}
                    digitStyle={{ backgroundColor: 'transparent' }}
                    digitTxtStyle={styles.countdownText}
                    separatorStyle={{ color: '#FFFFFF' }}
                    timeToShow={['M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                  />
                ) : undefined}
              </View>
            </View>
          </View>
          {/* {this.state.loading ?
					<View style={[styles.container, styles.horizontal]}>
						<ActivityIndicator size="large" color="#FFFFFF"/>
					</View>
					: null } */}
          <View
            style={{
              flex: 1
            }}
          />
          {/* <TouchableOpacity
						onPress={this.onTermsAndConditionsPressed}
						style={styles.termsAndConditionsButton}>
						<Text
							style={styles.termsAndConditionsButtonText}>Terms and Conditions</Text>
					</TouchableOpacity> */}
          <Hyperlink
            onPress={(url) =>
              this.onTermsAndConditionsPressed(
                url,
                url === KURL_TERMS_OF_SERVICE
                  ? 'Terms of Service'
                  : url === KURL_PRIVACY_POLICY
                  ? 'Privacy Policy'
                  : url === KURL_EULA
                  ? 'End User License Agreement'
                  : url
              )
            }
            linkStyle={[{ color: '#0000EE' }, styles.description_text]}
            linkText={(url) =>
              url === KURL_TERMS_OF_SERVICE
                ? 'Terms of Service'
                : url === KURL_PRIVACY_POLICY
                ? 'Privacy Policy'
                : url === KURL_EULA
                ? 'End User License Agreement'
                : url
            }
          >
            <Text style={styles.description_text} numberOfLines={2}>
              By using this app, you agree to our{' '}
              <Text style={{ textDecorationLine: 'underline' }}>
                {KURL_TERMS_OF_SERVICE}
              </Text>
              ,{' '}
              <Text style={{ textDecorationLine: 'underline' }}>
                {KURL_PRIVACY_POLICY}
              </Text>{' '}
              and{' '}
              <Text style={{ textDecorationLine: 'underline' }}>
                {KURL_EULA}
              </Text>
              .
            </Text>
          </Hyperlink>
        </View>
        <HudLoading isLoading={this.state.loading} />
        <Toast
          ref="toast"
          style={{ bottom: windowHeight / 2 - 40 }}
          textStyle={{ fontFamily: TITLE_FONT, color: '#ffffff' }}
        />
        <Toast
          ref="tapToast"
          // style={{ bottom: windowHeight / 2 - 40 }}
          textStyle={{ fontFamily: TITLE_FONT, color: '#ffffff' }}
          position="bottom"
          defaultCloseDelay={0}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  verifyuserView: {
    backgroundColor: 'white',
    flex: 1
  },
  modalView: {
    backgroundColor: 'transparent',
    flex: 1,
    marginTop: 40 * alpha
  },
  bitmapImage: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    width: 28 * alpha,
    height: 16 * alpha,
    marginLeft: 34 * alpha
  },
  closeButton: {
    backgroundColor: 'transparent',
    borderRadius: 12.5 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    alignSelf: 'flex-end',
    height: 25 * alpha,
    marginRight: 11 * alpha,
    marginTop: 11 * alpha
  },
  closeButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  closeButtonText: {
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    color: 'rgb(0, 178, 227)',
    fontSize: 18 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  logoImage: {
    resizeMode: 'contain',
    tintColor: 'rgb(0, 178, 227)',
    backgroundColor: 'transparent',
    width: 110 * alpha,
    height: 54 * alpha,
    marginLeft: 23 * alpha
  },
  welcomeText: {
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 25 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'left',
    backgroundColor: 'transparent',
    marginTop: 83 * alpha,
    marginLeft: 23 * alpha
  },
  messageText: {
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    marginTop: 8 * alpha,
    marginLeft: 23 * alpha
  },
  formView: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    width: 330 * alpha,
    marginLeft: 10 * alpha,
    marginRight: 10 * alpha,
    height: 100 * alpha,
    marginTop: 16 * alpha
  },
  countrycodeButtonText: {
    width: 60 * alpha,
    color: 'rgb(0, 178, 227)',
    fontFamily: NON_TITLE_FONT,
    textAlign: 'center',
    marginRight: 10 * alpha,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center'
  },
  countryCodeView: {
    borderRadius: 7 * alpha,
    borderColor: 'rgb(140, 140, 140)',
    borderWidth: 0.5,
    width: 60 * alpha,
    height: 41 * alpha,
    flexDirection: 'row',
    alignItems: 'center'
  },

  numberView: {
    backgroundColor: 'white',
    borderRadius: 7 * alpha,
    borderColor: 'rgb(140, 140, 140)',
    borderWidth: 0.5,
    width: 259 * alpha,
    height: 42 * alpha,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInputTextInput: {
    color: 'rgb(46, 46, 46)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    padding: 0,
    width: 140 * alpha,
    height: 25 * alpha,
    marginLeft: 15 * alpha
  },
  countDownContainer: {
    marginTop: 20 * alpha,
    width: 330 * alpha,
    alignItems: 'center'
  },
  countDownWrapper: {
    backgroundColor: 'rgb(0, 178, 227)',
    borderRadius: 4 * alpha
  },
  sendButton: {
    backgroundColor: 'rgb(0, 178, 227)',
    borderRadius: 4 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 72 * alpha,
    height: 26 * alpha,
    marginRight: 8 * alpha
  },
  sendButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  sendButtonText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center'
  },
  hidden: {
    width: 0,
    height: 0
  },
  sendCountdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 100 * alpha,
    height: 40 * alpha
  },
  countdownText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 19 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    width: 100 * alpha
  },
  activationView: {
    backgroundColor: 'white',
    borderRadius: 7 * alpha,
    overflow: 'hidden',
    borderColor: 'rgb(140, 140, 140)',
    borderWidth: 0.5,
    height: 41 * alpha,
    marginTop: 17 * alpha,
    flexDirection: 'row',
    alignItems: 'center'
  },
  activationCodeTextInput: {
    color: 'rgb(46, 46, 46)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    backgroundColor: 'transparent',
    padding: 0,
    width: 221 * alpha,
    height: 25 * alpha,
    marginLeft: 14 * alpha
  },
  verifyButton: {
    backgroundColor: 'rgb(0, 178, 227)',
    borderRadius: 4 * alpha,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 72 * alpha,
    height: 26 * alpha,
    marginRight: 8 * alpha
  },
  verifyButtonText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center'
  },
  verifyButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  termsAndConditionsButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    alignSelf: 'center',
    width: 210 * alpha,
    height: 16 * alpha,
    marginBottom: 40 * alpha
  },
  termsAndConditionsButtonText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'center'
  },
  termsAndConditionsButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  description_text: {
    width: windowWidth,
    marginBottom: 40 * alpha,
    color: 'rgb(90, 90, 90)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
    paddingLeft: 15 * alpha,
    paddingRight: 15 * alpha
  },
  phoneCountryCodeText: {
    marginLeft: 0 * alpha,
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    color: 'black'
  },
  errorMessageText: {
    color: 'white',
    fontSize: 12 * fontAlpha,
    fontFamily: NON_TITLE_FONT,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginTop: 48 * alpha
  },
  container: {
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10 * alpha
  },
  reSendButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },

  underlineStyleBase: {
    backgroundColor: 'transparent',
    fontFamily: TITLE_FONT,
    color: 'rgb(46, 46, 46)',
    width: 10 * alpha,
    borderWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6'
  }
});
