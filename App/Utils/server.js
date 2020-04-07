import Constants from "expo-constants";
import { Platform } from "react-native"
import {getServerIndex} from './storage'
// export const KSERVERURL = "https://app.brew9.co/api"
// export const KURL_INFO = "https://app.brew9.co/info"
// export const KPAYMENTYURL = "https://app.brew9.co/payments/baiduri"

// export const KSERVERURL = "http://test.brew9.co/api"
// export const KURL_INFO = "http://test.brew9.co/info"
// export const KPAYMENTYURL = "http://test.brew9.co/payments/baiduri"

// export const KSERVERURL = "https://dev.brew9.co/api"
// export const KURL_INFO = "https://dev.brew9.co/info"
// export const KPAYMENTYURL = "https://dev.brew9.co/payments/baiduri"

// export const KSERVERURL ='http://localhost:3000/api'
// export const KURL_INFO ='http://localhost:3000/info'
// export const KPAYMENTYURL ='http://localhost:3000/payments/baiduri'

// export const KPAYMENTYURL ='http://payment.brew9.com'
// export const KSERVERURL ='https://18624bd1.ngrok.io/api'
// export const KURL_INFO = 'https://18624bd1.ngrok.io/info'

export const KSERVERURLLIST = [
  "http://test.brew9.co/api",
  "https://app.brew9.co/api",
  "http://dev1.brew9.co/api",
  "http://dev1.brew9.co/api",
  // "http://dev2.brew9.co/api",
  // "http://dev3.brew9.co/api",
  // "http://dev4.brew9.co/api",
];
export const KURL_INFOLIST = [
  "http://test.brew9.co/info",
  "https://app.brew9.co/info",
  "http://dev1.brew9.co/info",
  "http://dev1.brew9.co/info",

  // "http://dev2.brew9.co/info",
  // "http://dev3.brew9.co/info",
  // "http://dev4.brew9.co/info",

];
export const KPAYMENTYURLLIST = [
  "http://test.brew9.co/payments/baiduri",
  "https://app.brew9.co/payments/baiduri",
  "http://dev1.brew9.co/payments/baiduri",
  "http://dev1.brew9.co/payments/baiduri",
  // "http://dev2.brew9.co/payments/baiduri",
  // "http://dev3.brew9.co/payments/baiduri",
  // "http://dev4.brew9.co/payments/baiduri",

];


export async function loadServer() {
  // console.log("loadserverindex")
  var serverIndex = await getServerIndex();
  KSERVERURL = KSERVERURLLIST[serverIndex];
  KURL_INFO = KURL_INFOLIST[serverIndex];
  KPAYMENTYURL = KPAYMENTYURLLIST[serverIndex];
  KURL_TERMS_OF_SERVICE = KURL_INFO + "?page=terms_conditions&id=f1";
  KURL_PRIVACY_POLICY = KURL_INFO + "?page=privacy&id=1";
  KURL_EULA = KURL_INFO + "?page=eula&id=1";
  KURL_MEMBERSHIP_INFO = KURL_INFO + "/membership_info";
  return;
}

export let KSERVERURL = KSERVERURLLIST[0];
export let KURL_INFO = KURL_INFOLIST[0];
export let KPAYMENTYURL = KPAYMENTYURLLIST[0];


export let KURL_TERMS_OF_SERVICE = KURL_INFO + "?page=terms_conditions&id=f1";
export let KURL_PRIVACY_POLICY = KURL_INFO + "?page=privacy&id=1";
export let KURL_EULA = KURL_INFO + "?page=eula&id=1";
export let KURL_MEMBERSHIP_INFO = KURL_INFO + '/membership_info';
export let KCURRENT_API_VERSION_HEADER = "application/dc.v5 gzip";
export let APPBUILDVERSIONIOS = "14";
export let APPBUILDVERSIONANDROID = "14";

export const KTIMEOUT = 3 * 1000;

const IS_TEST = false;

export function encodeForFormData(details) {
  let formBody = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  formBody = formBody.join("&");
  return formBody;
}

export function getBuildVersion() {
  if (Platform.OS === "android") {
    return APPBUILDVERSIONANDROID
  }
  return APPBUILDVERSIONIOS
}

export function getAppVersion() {
  return Constants.manifest.version
}



export function getPaymentServer() {
  if (IS_TEST) {
    return 'https://baiduri-bpgs.mtf.gateway.mastercard.com'
  } else {
    return 'https://baiduri-bpgs.gateway.mastercard.com'
  }
}

export function getMerchantId() {
  return '950029645'
}

export function getBaiduriAuthorizationToken() {
  return 'Basic TUVSQ0hBTlQuOTUwMDI5NjQ1Ojc0NTlkZWNiZWFiOWEwMzUxYzU4ZDk3YjFkZjg4NDdm'
}
