// import { btoa } from './node_modules/Base64'
import {
  KSERVERURL,
  KCURRENT_API_VERSION_HEADER,
  getBuildVersion,
  getAppVersion
} from './server';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
export class WebserviceHelper {
  // static b64EncodeUnicode(str) {
  //   return btoa(
  //     encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
  //       String.fromCharCode(`0x${p1}`)
  //     )
  //   )
  // }
}

export function getBasicAuthentication(authToken) {
  return `Basic ${authToken}`;
}

export async function getMethod(authtoken, object) {
  const url = await KSERVERURL();
  const urlString = `${url}/${object.getUrlString()}?${object.getFormData()}`;
  console.log('[GET]');
  console.log(urlString);

  return fetch(urlString, {
    method: 'GET',
    headers: {
      Accept: KCURRENT_API_VERSION_HEADER,
      'Content-Type': 'application/x-www-form-urlencoded',
      AppVersion: getAppVersion(),
      BuildVersion: getBuildVersion(),
      Platform: Platform.OS,
      Authorization: getBasicAuthentication(authtoken)
    }
  })
    .then((response) => _parseJSON(response))
    .then(logResponse('json'))
    .catch((error) => {
      console.error(error);
    });
}

export async function postMethod(authtoken, object) {
  const url = await KSERVERURL();
  const urlString = `${url}/${object.getUrlString()}`;
  console.log('[POST]');
  console.log(urlString);

  return fetch(urlString, {
    method: 'POST',
    headers: {
      Accept: KCURRENT_API_VERSION_HEADER,
      'Content-Type': 'application/x-www-form-urlencoded',
      AppVersion: Constants.nativeAppVersion,
      BuildVersion: Constants.nativeBuildVersion,
      Platform: Constants.platform,
      Authorization: getBasicAuthentication(authtoken)
    },
    body: object.getFormData()
  })
    .then(logResponse('json'))
    .then((response) => _parseJSON(response))
    .catch((error) => {
      console.error(error);
    });
}

export async function postJsonMethod(authtoken, object) {
  const url = await KSERVERURL();
  const urlString = `${url}/${object.getUrlString()}`;
  console.log('[POST JSON]');
  console.log(urlString);

  return fetch(urlString, {
    method: 'POST',
    headers: {
      Accept: KCURRENT_API_VERSION_HEADER,
      'Content-Type': 'application/json',
      Version: Constants.nativeAppVersion,
      BuildVersion: Constants.nativeBuildVersion,
      Platform: Constants.platform,
      Authorization: getBasicAuthentication(authtoken)
    },
    body: object.getFormData()
  })
    .then(logResponse('json'))
    .then((response) => _parseJSON(response))
    .catch((error) => {
      console.error(error);
    });
}

export async function postMultipartMethod(authtoken, object) {
  const url = await KSERVERURL();
  const urlString = `${url}/${object.getUrlString()}`;
  console.log('[POST MULTIPART]');
  console.log(urlString);
  return fetch(urlString, {
    method: 'POST',
    headers: {
      Accept: KCURRENT_API_VERSION_HEADER,
      'Content-Type': 'application/json',
      Version: Constants.nativeAppVersion,
      BuildVersion: Constants.nativeBuildVersion,
      Platform: Constants.platform,
      Authorization: getBasicAuthentication(authtoken)
    },
    body: object.getFormData()
  })
    .then(logResponse('json'))
    .then((response) => _parseJSON(response))
    .catch((error) => {
      console.error(error);
    });
}
export async function putMethod(authtoken, object) {
  const url = await KSERVERURL();
  const urlString = `${url}/${object.getUrlString()}`;
  console.log('[PUT]');
  console.log(urlString);
  return fetch(urlString, {
    method: 'PUT',
    headers: {
      Accept: KCURRENT_API_VERSION_HEADER,
      'Content-Type': 'multipart/form-data',
      Version: Constants.nativeAppVersion,
      BuildVersion: Constants.nativeBuildVersion,
      Platform: Constants.platform,
      Authorization: getBasicAuthentication(authtoken)
    },
    body: object.getFormData()
  })
    .then(logResponse('json'))
    .then((response) => _parseJSON(response))
    .catch((error) => {
      console.error(error);
    });
}

export async function deleteMethod(authtoken, object) {
  const url = await KSERVERURL();
  const urlString = `${url}/${object.getUrlString()}?${object.getFormData()}`;
  console.log('[DELETE]');
  console.log(urlString);
  return fetch(urlString, {
    method: 'DELETE',
    headers: {
      Accept: KCURRENT_API_VERSION_HEADER,
      'Content-Type': 'application/x-www-form-urlencoded',
      AppVersion: Constants.nativeAppVersion,
      BuildVersion: Constants.nativeBuildVersion,
      Platform: Constants.platform,
      Authorization: getBasicAuthentication(authtoken)
    }
  })
    .then((response) => _parseJSON(response))
    .then(logResponse('json'))
    .catch((error) => {
      console.error(error);
    });
}

export function logResponse(description) {
  return function (res) {
    return res;
  };
}

export function _parseJSON(response) {
  return response.text().then((text) => (text ? JSON.parse(text) : {}));
}

export default WebserviceHelper;
