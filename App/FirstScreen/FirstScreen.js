import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  AppState,
  Linking,
  Platform
} from 'react-native';
if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Analytics, Event, PageHit } from 'expo-analytics';
import KochavaTracker from 'react-native-kochava-tracker';
import { createAction, Storage } from '../Utils';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-easy-toast';
import CurrentStatusRequestObject from '../Requests/current_status_request_object';
import { TITLE_FONT, NON_TITLE_FONT } from '../Common/common_style';
import { alpha, fontAlpha, windowHeight, windowWidth } from '../Common/size';
import { getMemberIdForApi } from '../Services/members_helper';
import { getAppVersion, getBuildVersion } from '../Utils/server';
import Brew9PopUp from '../Components/Brew9PopUp';
import { ANALYTICS_ID } from '../Common/config';
import { loadServer } from '../Utils/server';

@connect(({ members }) => ({
  members: members.profile,
  isReady: members.isReady
}))
export default class FirstScreen extends React.Component {
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
    this.state = this._getState();
  }

  _getState = () => ({
    appState: AppState.currentState,
    checked: false,
    loading: false,
    isSignedIn: false,
    isPermPopupVisible: false,
    popUpVisible: false
  });

  async componentDidMount() {
    await loadServer();

    if (!__DEV__) {
      const analytics = new Analytics(ANALYTICS_ID);
      analytics.event(
        new Event('FirstScreen', 'Launch', Platform.OS, getAppVersion())
      );
    }

    // Handle app state changes in screen
    AppState.addEventListener('change', this._handleAppStateChange);

    this.initializeKochavaTracker();
    this.props.dispatch(createAction('members/loadCurrentUserFromCache')({}));
    this.checkAppPermissions();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidUpdate(prevProps, prevState) {
    const { checked } = this.state;
    if (checked == false) {
      this.setState(
        {
          checked: true
        },
        function () {
          this.loadCurrentStatus();
        }
      );
    }
    if (prevProps.members != this.props.members) {
      this.checkLoginStatus();
    }
  }

  async checkAppPermissions() {
    await Permissions.askAsync(Permissions.NOTIFICATIONS);

    const storLocSettings = await AsyncStorage.getItem('permission_location');
    const permLocSettings = await Permissions.askAsync(Permissions.LOCATION);


    const params = {
      isPermPopupVisible: true,
      permPopupTitle: 'Location permissions required.',
      permPopupDesc:
        'To get full features of the app, you need to allow location permissions.',
      permType: 'location',
      permOkText: 'Ok',
      permCancelText: "Next Time"
    };

    if (
      Platform.OS === 'ios' &&
      permLocSettings &&
      permLocSettings.status !== 'granted'
    ) {
      if (storLocSettings !== 'denied') {
        this.setState(params);
      }
    }

    if (permLocSettings && permLocSettings.status === 'granted') {
      Location.watchPositionAsync(
        {
          distanceInterval: 1000,
          timeInterval: 10000
        },
        (newLocation) => {
          this.props.dispatch(createAction('members/setLocation')(newLocation));
        },
        (error) => console.log(error)
      );
    }
  }

  checkLoginStatus() {
    const { members, isReady, dispatch } = this.props;
    if (isReady) {
      if (typeof members === 'undefined' || members === null) {
        this.props.navigation.navigate('VerifyUserStack', {
          onGoBack: () => this.reset()
        });
      } else {
        this.props.navigation.navigate('TabGroupOne');
      }
    }
  }

  initializeKochavaTracker() {
    const {
      PARAM_LOG_LEVEL_ENUM_KEY,
      LOG_LEVEL_ENUM_TRACE_VALUE,
      LOG_LEVEL_ENUM_INFO_VALUE,
      PARAM_ANDROID_APP_GUID_STRING_KEY,
      PARAM_IOS_APP_GUID_STRING_KEY
    } = KochavaTracker;

    const configMapObject = {};

    configMapObject[PARAM_LOG_LEVEL_ENUM_KEY] = __DEV__
      ? LOG_LEVEL_ENUM_TRACE_VALUE
      : LOG_LEVEL_ENUM_INFO_VALUE;
    configMapObject[PARAM_ANDROID_APP_GUID_STRING_KEY] = 'kobrew9-npv3ph2ns';
    configMapObject[PARAM_IOS_APP_GUID_STRING_KEY] = 'kobrew9-82rqs2pdf';

    KochavaTracker.configure(configMapObject);
  }

  reset() {
    // console.log("back to first page");
    this.loadCurrentStatus();
  }

  _handleAppStateChange = (nextAppState) => {
    const { members } = this.props;
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if (Platform.OS === 'ios') {
        this.checkAppPermissions();
      }

      if (members != null) {
        this.loadCurrentStatus();
      }
    }
    this.setState({ appState: nextAppState });
  };

  loadCurrentStatus() {
    const { dispatch, members } = this.props;

    this.setState({ loading: true });
    const callback = (eventObject) => {
      this.setState({
        loading: false
      });
      if (eventObject.result.force_upgrade) {
        this.setState({
          popUpVisible: true,
          title: eventObject.result.title,
          description: eventObject.result.description,
          url: eventObject.result.url
        });
      } else if (eventObject.result.maintenance) {
        this.setState({
          popUpVisible: true,
          title: eventObject.result.title,
          description: eventObject.result.description,
          url: ''
        });
      } else {
        this.checkLoginStatus();
      }
    };
    AsyncStorage.getItem('notification_key', (err, result) => {
      var last_note = 0;
      if (result != null) {
        last_note = result;
      }
      const obj = new CurrentStatusRequestObject(last_note);
      obj.setUrlId(getMemberIdForApi(members));
      dispatch(
        createAction('members/loadCurrentStatus')({
          object: obj,
          callback
        })
      );
    });
  }

  onPressOk = () => {
    if (this.state.url != null && this.state.url != '') {
      Linking.openURL(this.state.url);
    }
  };

  renderForceUpdate = () => {
    let { popUpVisible, title, description } = this.state;
    return (
      <Brew9PopUp
        popUpVisible={popUpVisible}
        title={title}
        description={description}
        OkText={'Update'}
        onPressOk={this.onPressOk}
        onBackgroundPress={() => console.log('close')}
      />
    );
  };

  _onPressDenyPermission = async () => {
    const { permType } = this.state;

    if (permType === 'location') {
      await AsyncStorage.setItem('permission_location', 'denied');
      this.setState({ isPermPopupVisible: false });
    }
  };

  _onPressAllowPermission = async () => {
    const { permType } = this.state;
    const isPermPopupVisible = false;
    const permPopupDesc = '';
    const permPopupTitle = '';

    if (permType === 'location') {
      await AsyncStorage.setItem('permission_location', 'granted');
      const response = await Permissions.askAsync(Permissions.LOCATION);

      if (response.status === 'granted') {
        await AsyncStorage.setItem('permission_location2', 'granted');
      } else {
        Linking.openURL('app-settings:brew9//');
      }
    }

    this.setState({ isPermPopupVisible });
  };

  renderAskPermission = () => (
    <Brew9PopUp
      popUpVisible={this.state.isPermPopupVisible}
      title={this.state.permPopupTitle}
      description={this.state.permPopupDesc}
      OkText={this.state.permOkText}
      cancelText={this.state.permCancelText}
      onPressOk={this._onPressAllowPermission}
      onPressCancel={this._onPressDenyPermission}
      onBackgroundPress={() => console.log('close')}
    />
  );

  render() {
    return (
      <View>
        {this.renderForceUpdate()}
        {this.renderAskPermission()}
        <Toast
          ref="toast"
          style={{ bottom: windowHeight / 2 - 40 }}
          textStyle={{ fontFamily: TITLE_FONT, color: '#ffffff' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  firstView: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },
  popUpBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center'
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
    borderRadius: 5 * alpha
  },
  popUpInput1: {
    // backgroundColor: '#fff5ee',
    paddingHorizontal: 10 * alpha,
    paddingVertical: 10 * alpha,
    borderRadius: 5 * alpha,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    flexDirection: 'row'
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
  orderButtonText: {
    color: 'rgb(254, 254, 254)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  titleText: {
    paddingBottom: 5,
    textAlign: 'center',
    fontFamily: TITLE_FONT
  },
  descriptionText: {
    color: 'rgb(135, 135, 135)',
    fontFamily: TITLE_FONT,
    textAlign: 'center'
  }
});
