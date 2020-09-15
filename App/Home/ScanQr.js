import {
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import Toast from 'react-native-easy-toast';
import QrCodeScanRequestObject from '../Requests/qr_code_scan_request_object';
import ScanStatusRequestObject from '../Requests/scan_status_request_object.js';

import {connect} from 'react-redux';
import {createAction} from '../Utils/index';
import HudLoading from '../Components/HudLoading';
import {
  TITLE_FONT,
  NON_TITLE_FONT,
  TOAST_DURATION,
} from '../Common/common_style';
import {alpha, fontAlpha, windowHeight} from '../Common/size';
@connect(({members, shops}) => ({
  currentMember: members.profile,
  company_id: members.company_id,
  location: members.location,
  selectedShop: shops.selectedShop,
}))
export default class ScanQr extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: (
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: TITLE_FONT,
          }}>
          Scan QR
        </Text>
      ),
      headerTintColor: 'black',
      headerLeft: (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.navigationBarItem}>
            <Image
              source={require('./../../assets/images/back.png')}
              style={styles.navigationBarItemIcon}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    loading: false,
    hasCameraPermission: null,
    scanned: false,
    visible: false,
  });

  componentDidMount() {
    this.getPermissionsAsync();
    // this.loadQrCodeScan('tup_98a17541-60c5-41fc-bcf1-9e6a65bed85d');
  }

  onSuccessfulScan() {
    const successTopUp = true;
    this.props.navigation.navigate('Profile', {successTopUp});
  }

  loadScanStatus(qr_code) {
    const {dispatch, currentMember} = this.props;
    const callback = (eventObject) => {
      if (eventObject.success) {
        if (eventObject?.message) {
          this.onSuccessfulScan();
        } else {
          if (eventObject.result.clazz == 'member') {
            this.onSuccessfulScan();
          }
        }
        this.setState({loading: false});
      } else {
        setTimeout(
          function () {
            this.loadScanStatus(qr_code);
          }.bind(this),
          2500,
        );
      }
    };
    const obj = new ScanStatusRequestObject(qr_code);
    obj.setUrlId(currentMember.id);
    dispatch(
      createAction('members/loadScanStatus')({
        object: obj,
        callback,
      }),
    );
  }

  loadQrCodeScan(qr_code) {
    const {dispatch, currentMember} = this.props;

    this.setState({loading: true});
    const callback = (eventObject) => {
      if (eventObject.success) {
        console.log(eventObject);
        setTimeout(
          function () {
            this.loadScanStatus(qr_code);
          }.bind(this),
          2500,
        );
      } else {
        this.setState({loading: false});
        if (eventObject?.message) {
          this.refs.toast.show(eventObject.message, TOAST_DURATION);
        }
      }
    };
    const obj = new QrCodeScanRequestObject(qr_code);
    obj.setUrlId(currentMember.id);
    dispatch(
      createAction('members/loadQrCodeScan')({
        object: obj,
        callback,
      }),
    );
  }

  async getPermissionsAsync() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = status === 'granted';
    this.setState({hasCameraPermission});
  }

  render() {
    const {hasCameraPermission, scanned, currentMember} = this.state;

    if (hasCameraPermission === null) {
      return (
        <View style={styles.qrView}>
          <Text style={styles.noLabelText}>
            Requesting for camera permission
          </Text>
        </View>
      );
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.qrView}>
          <Text style={styles.noLabelText}>No access to camera</Text>
        </View>
      );
    }
    if (currentMember === null) {
      return (
        <View style={styles.qrView}>
          <Text style={styles.noLabelText}>
            Login / Register to you account to use
          </Text>
        </View>
      );
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
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({scanned: false})}
          />
        )}
        <Toast
          ref="toast"
          style={{bottom: windowHeight / 2 - 40}}
          textStyle={{fontFamily: TITLE_FONT, color: '#ffffff'}}
        />

        <HudLoading isLoading={this.state.loading} />
      </View>
    );
  }

  handleBarCodeScanned = ({type, data}) => {
    this.setState({scanned: true});
    this.loadQrCodeScan(data);
  };
}

const styles = StyleSheet.create({
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
    tintColor: 'black',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    marginLeft: 8 * alpha,
    width: 70 * alpha,
  },
  navigationBarItem: {
    width: '100%',
  },
  qrView: {
    backgroundColor: 'rgb(243, 243, 243)',
    flex: 1,
    justifyContent: 'center',
  },
  noLabelText: {
    color: 'rgb(149, 149, 149)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});
