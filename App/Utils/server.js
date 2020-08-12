import Constants from 'expo-constants';
import { Platform, AsyncStorage } from 'react-native';

import {
  SERVERS as AVAILABLE_SERVERS,
  DEFAULT_SERVER,
  DEFAULT_PROTOCOL
} from '../Constants/server_list';
import { DEVELOP_MODE } from '../Common/config';

const URL = async () => {
  let server = DEFAULT_SERVER;
  if (DEVELOP_MODE) {
    let selectedServerUrl = await AsyncStorage.getItem('selected_server_url');
    server = selectedServerUrl || DEFAULT_SERVER;
  }

  // console.log('server ', server);
  let protocol =
    (await AsyncStorage.getItem('selected_server_protocol')) ||
    DEFAULT_PROTOCOL;
  return `${protocol}${server}`;
};

export const KSERVERURL = async () => (await URL()) + 'api';
export const KURL_INFO = async () => (await URL()) + 'info';
export const KPAYMENTYURL = async () => (await URL()) + 'payments/baiduri';

export var KURL_TERMS_OF_SERVICE = '';
export var KURL_PRIVACY_POLICY = '';
export var KURL_EULA = '';
export var KURL_MEMBERSHIP_INFO = '';

export var KCURRENT_API_VERSION_HEADER = 'application/dc.v7 gzip';
export var APPBUILDVERSIONIOS = '30';
export var APPBUILDVERSIONANDROID = '30';

export const KTIMEOUT = 3 * 1000;

const IS_TEST = false;

export function encodeForFormData(details) {
  let formBody = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  formBody = formBody.join('&');
  return formBody;
}

export function getBuildVersion() {
  if (Platform.OS === 'android') {
    return APPBUILDVERSIONANDROID;
  }
  return APPBUILDVERSIONIOS;
}

export function getAppVersion() {
  return Constants.manifest.version;
}

export function getPaymentServer() {
  if (IS_TEST) {
    return 'https://baiduri-bpgs.mtf.gateway.mastercard.com';
  } else {
    return 'https://baiduri-bpgs.gateway.mastercard.com';
  }
}

export function getMerchantId() {
  return '950029645';
}

export function getBaiduriAuthorizationToken() {
  return 'Basic TUVSQ0hBTlQuOTUwMDI5NjQ1Ojc0NTlkZWNiZWFiOWEwMzUxYzU4ZDk3YjFkZjg4NDdm';
}

async function initialize_server() {
  const server = AsyncStorage.getItem('selected_server_url') || DEFAULT_SERVER;
  const protocol =
    AsyncStorage.getItem('selected_server_protocol') || DEFAULT_PROTOCOL;

  return Promise.all([await server, await protocol]);
}

export async function loadServer() {
  await initialize_server();
  const url = await KURL_INFO();
  // console.log('url ', url);
  KURL_TERMS_OF_SERVICE = `${url}?page=terms_conditions&id=f1`;
  KURL_PRIVACY_POLICY = `${url}?page=privacy&id=1`;
  KURL_EULA = `${url}?page=eula&id=1`;
  KURL_MEMBERSHIP_INFO = `${url}/membership_info`;
}
