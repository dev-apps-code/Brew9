import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {alpha, fontAlpha, windowWidth} from '../Common/size';
import {connect} from 'react-redux';
import Toast, {DURATION} from 'react-native-easy-toast';
import HudLoading from '../Components/HudLoading';
import ActivateAccountRequestObject from '../Requests/activate_account_request_object';
import LoginWithSmsRequestObject from '../Requests/login_with_sms_request_object';
import {createAction} from '@utils';
import CountDown from 'react-native-countdown-component';
import {
  KURL_TERMS_OF_SERVICE,
  KURL_PRIVACY_POLICY,
  KURL_EULA,
  KSERVERURL,
} from '../Utils/server';
import Hyperlink from 'react-native-hyperlink';
import {
  TITLE_FONT,
  NON_TITLE_FONT,
  TOAST_DURATION,
} from '../Common/common_style';
import {resetTo} from '../Utils/route_helper';
import {BUILD_VERSION_ANDROID, DEVELOP_MODE} from '../Common/config';
import Brew9Toast from '../Components/Brew9Toast';

const {FOREVER} = DURATION;

@connect(({members}) => ({
  members: members.profile,
  company_id: members.company_id,
  location: members.location,
}))
class VerifyUser extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      header: null,
      headerLeft: null,
      headerRight: null,
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
      count_down: 3,
    };
  }

  async componentDidMount() {
    // let str = KSERVERURL;
    // let r = str.match(/https?:\/\/(.*?)\//);
    // let link = r[1];
    // if (link != 'app.brew9.co'){
    //   this.refs.toast.show(
    //     `${link} +  - api version ${KCURRENT_API_VERSION_HEADER} - build no  ${BUILD_VERSION_ANDROID}`
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
      link + ' - api version 2 - build no ' + BUILD_VERSION_ANDROID,
      TOAST_DURATION,
    );
    this.props.navigation.state.params.onGoBack();
    this.props.navigation.goBack();
  }

  componentWillMount() {}

  onTermsAndConditionsPressed = (url, title) => {
    url = KURL_EULA;
    const {navigate} = this.props.navigation;
    navigate('WebCommon', {
      title: title,
      web_url: url + '&id=' + this.props.company_id,
      onGoBack: () => this.reset(),
    });
  };

  onClosePressed = () => {
    const {navigation} = this.props;

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
        TOAST_DURATION,
      );
      return;
    }
    this.loadLogin();
  };

  onUpdateCode(iso2) {
    var country_code = this.phone.getCountryCode();
    this.setState({
      country: iso2,
      country_code: country_code,
    });
  }

  loadLogin() {
    const {dispatch} = this.props;
    const {phone_no, country_code} = this.state;

    if (isNaN(phone_no)) {
      this.refs.toast.show(
        'Please ensure you have enter valid phone number!',
        TOAST_DURATION,
      );
      return;
    }
    if (phone_no == null || phone_no == '') {
      this.refs.toast.show(
        'Please ensure you have enter your phone number!',
        TOAST_DURATION,
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
        TOAST_DURATION,
      );
      return;
    }

    this.setState({loading: true});
    const callback = (eventObject) => {
      if (eventObject.success) {
        console.log(eventObject);
        this.setState({
          login_success: true,
          is_counting: true,
          code_from_server: eventObject.result.code,
          // code:eventObject.result.code
        });
      }
      this.setState({
        loading: false,
      });
    };
    const obj = new LoginWithSmsRequestObject(phone_no, country_code);
    dispatch(
      createAction('members/loadLogin')({
        object: obj,
        callback,
      }),
    );
  }

  onVerifyPressed = () => {
    Keyboard.dismiss();
    this.loadActivateAccount();
  };

  loadActivateAccount() {
    const {dispatch} = this.props;
    this.setState({loading: true});
    const callback = (eventObject) => {
      this.setState({loading: false});

      if (eventObject.success) {
        const {navigation} = this.props;
        var obj = eventObject.result;
        if (obj.name == '' || obj.name == null) {
          navigation.navigate('Register');
        } else {
          // if (
          //   navigation.getParam('returnToRoute') != undefined &&
          //   navigation.getParam('returnToRoute') != null
          // ) {
          //   navigation.goBack();
          // } else {
          //   navigation.navigate('TabGroupOne');
          // }
          resetTo(this.props, 'FirstScreen');
        }
      } else {
        this.refs.toast.show(eventObject.message, TOAST_DURATION);
      }
    };
    const obj = new ActivateAccountRequestObject(
      this.state.phone_no,
      this.state.country_code,
      this.referral_code,
      this.state.code,
    );
    dispatch(
      createAction('members/loadActivateAccount')({
        object: obj,
        callback,
      }),
    );
  }

  lastTap = null;
  tapCount = 1;
  /**
   * Tap 10 times within 15 seconds
   */
  handleChangeServerTap = async () => {
    if (DEVELOP_MODE) {
      const now = Date.now();
      const PRESS_DELAY = 15000;

      if (this.lastTap && now - this.lastTap < PRESS_DELAY) {
        this.tapCount++;

        if (this.tapCount >= 5 && this.tapCount < 10) {
          let count = this.tapCount;
          let tap = count < 9 ? 'taps' : 'tap';
          let toastText = `You are ${10 - count} ${tap} away to change server.`;
          this.refs.tapToast.show(toastText, FOREVER);
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
    }
  };

  render() {
    const {members} = this.props;
    return (
      <View style={styles.verifyuserView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={this.onClosePressed}
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableWithoutFeedback
            onPressOut={this.handleChangeServerTap.bind(this)}>
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
                alignItems: 'space-between',
              }}>
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
                  flex: 1,
                }}
              />
              <View style={styles.numberView}>
                <TextInput
                  autoCorrect={false}
                  keyboardType="phone-pad"
                  onChangeText={(phone_no) => this.setState({phone_no})}
                  placeholder="123456789"
                  // maxLength={7}
                  style={styles.textInputTextInput}
                />
                <View
                  style={{
                    flex: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={this.onSendPressed}
                  style={styles.sendButton}>
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
            {this.state.login_success ? (
              <View style={styles.activationView}>
                <TextInput
                  autoCorrect={false}
                  keyboardType="phone-pad"
                  onChangeText={(code) => this.setState({code: code})}
                  placeholder="Activation Code"
                  style={styles.activationCodeTextInput}
                  value={this.state.code}
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
                    flex: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={this.onVerifyPressed}
                  style={styles.verifyButton}>
                  <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <View style={styles.countDownContainer}>
              <View style={styles.countDownWrapper}>
                {this.state.is_counting ? (
                  <CountDown
                    digitStyle={{backgroundColor: 'transparent'}}
                    digitTxtStyle={styles.countdownText}
                    onFinish={() => this.setState({is_counting: false})}
                    running={this.state.is_counting}
                    separatorStyle={{color: '#FFFFFF'}}
                    showSeparator
                    size={12}
                    style={
                      this.state.is_counting
                        ? styles.sendCountdown
                        : styles.hidden
                    }
                    timeLabels={{m: null, s: null}}
                    timeToShow={['M', 'S']}
                    until={120}
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
              flex: 1,
            }}
          />
          {/* <TouchableOpacity
						onPress={this.onTermsAndConditionsPressed}
						style={styles.termsAndConditionsButton}>
						<Text
							style={styles.termsAndConditionsButtonText}>Terms and Conditions</Text>
					</TouchableOpacity> */}
          <Hyperlink
            linkStyle={[{color: '#0000EE'}, styles.description_text]}
            linkText={(url) =>
              url === KURL_TERMS_OF_SERVICE
                ? 'Terms of Service'
                : url === KURL_PRIVACY_POLICY
                ? 'Privacy Policy'
                : url === KURL_EULA
                ? 'End User License Agreement'
                : url
            }
            onPress={(url) =>
              this.onTermsAndConditionsPressed(
                url,
                url === KURL_TERMS_OF_SERVICE
                  ? 'Terms of Service'
                  : url === KURL_PRIVACY_POLICY
                  ? 'Privacy Policy'
                  : url === KURL_EULA
                  ? 'End User License Agreement'
                  : url,
              )
            }>
            <Text numberOfLines={2} style={styles.description_text}>
              By using this app, you agree to our{' '}
              <Text style={{textDecorationLine: 'underline'}}>
                {KURL_TERMS_OF_SERVICE}
              </Text>
              ,{' '}
              <Text style={{textDecorationLine: 'underline'}}>
                {KURL_PRIVACY_POLICY}
              </Text>{' '}
              and{' '}
              <Text style={{textDecorationLine: 'underline'}}>{KURL_EULA}</Text>
              .
            </Text>
          </Hyperlink>
        </View>
        <HudLoading isLoading={this.state.loading} />
        <Brew9Toast ref="toast" />
        <Toast
          defaultCloseDelay={0}
          // style={{ bottom: windowHeight / 2 - 40 }}
          position="bottom"
          ref="tapToast"
          textStyle={{fontFamily: TITLE_FONT, color: '#ffffff'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activationCodeTextInput: {
    backgroundColor: 'transparent',
    color: 'rgb(46, 46, 46)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    height: 25 * alpha,
    marginLeft: 14 * alpha,
    padding: 0,
    textAlign: 'left',
    width: 221 * alpha,
  },
  activationView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'rgb(140, 140, 140)',
    borderRadius: 7 * alpha,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 41 * alpha,
    marginTop: 17 * alpha,
    overflow: 'hidden',
  },
  closeButton: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    borderRadius: 12.5 * alpha,
    flexDirection: 'row',
    height: 25 * alpha,
    justifyContent: 'center',
    marginRight: 11 * alpha,
    marginTop: 11 * alpha,
    padding: 0,
  },
  closeButtonText: {
    color: 'rgb(0, 178, 227)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 18 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  countDownContainer: {
    alignItems: 'center',
    marginTop: 20 * alpha,
    width: 330 * alpha,
  },
  countDownWrapper: {
    backgroundColor: 'rgb(0, 178, 227)',
    borderRadius: 4 * alpha,
  },
  countdownText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 19 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    width: 100 * alpha,
  },
  countryCodeView: {
    alignItems: 'center',
    borderColor: 'rgb(140, 140, 140)',
    borderRadius: 7 * alpha,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 41 * alpha,
    width: 60 * alpha,
  },
  countrycodeButtonText: {
    color: 'rgb(0, 178, 227)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginRight: 10 * alpha,
    textAlign: 'center',
    width: 60 * alpha,
  },

  description_text: {
    color: 'rgb(90, 90, 90)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    marginBottom: 40 * alpha,
    paddingLeft: 15 * alpha,
    paddingRight: 15 * alpha,
    textAlign: 'center',
    width: windowWidth,
  },
  formView: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    height: 100 * alpha,
    marginLeft: 10 * alpha,
    marginRight: 10 * alpha,
    marginTop: 16 * alpha,
    width: 330 * alpha,
  },
  hidden: {
    height: 0,
    width: 0,
  },
  logoImage: {
    backgroundColor: 'transparent',
    height: 54 * alpha,
    marginLeft: 23 * alpha,
    resizeMode: 'contain',
    tintColor: 'rgb(0, 178, 227)',
    width: 110 * alpha,
  },
  messageText: {
    backgroundColor: 'transparent',
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginLeft: 23 * alpha,
    marginTop: 8 * alpha,
    textAlign: 'left',
  },
  modalView: {
    backgroundColor: 'transparent',
    flex: 1,
    marginTop: 40 * alpha,
  },
  numberView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'rgb(140, 140, 140)',
    borderRadius: 7 * alpha,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 42 * alpha,
    width: 259 * alpha,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: 'rgb(0, 178, 227)',
    borderRadius: 4 * alpha,
    flexDirection: 'row',
    height: 26 * alpha,
    justifyContent: 'center',
    marginRight: 8 * alpha,
    padding: 0,
    width: 72 * alpha,
  },
  sendButtonText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  sendCountdown: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40 * alpha,
    justifyContent: 'center',
    padding: 0,
    width: 100 * alpha,
  },
  textInputTextInput: {
    backgroundColor: 'transparent',
    color: 'rgb(46, 46, 46)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    height: 25 * alpha,
    marginLeft: 15 * alpha,
    padding: 0,
    textAlign: 'left',
    width: 140 * alpha,
  },
  verifyButton: {
    alignItems: 'center',
    backgroundColor: 'rgb(0, 178, 227)',

    borderRadius: 4 * alpha,
    flexDirection: 'row',
    height: 26 * alpha,
    justifyContent: 'center',
    marginRight: 8 * alpha,
    padding: 0,
    width: 72 * alpha,
  },
  verifyButtonText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  verifyuserView: {
    backgroundColor: 'white',
    flex: 1,
  },
  welcomeText: {
    backgroundColor: 'transparent',
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 25 * fontAlpha,

    fontStyle: 'normal',
    marginLeft: 23 * alpha,
    marginTop: 83 * alpha,
    textAlign: 'left',
  },
});

export default VerifyUser;
