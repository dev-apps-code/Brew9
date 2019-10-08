// import { btoa } from './node_modules/Base64'
import { KSERVERURL, encodeForFormData,KCURRENT_API_VERSION_HEADER } from './server'
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
  return `Basic ${authToken}`
}

export function getMethod(authtoken,object) {
  const urlString = `${KSERVERURL}/${object.getUrlString()}?${object.getFormData()}`
  // console.log(urlString)
  // console.log(authtoken)
  return fetch(urlString, {
    method: 'GET',
    headers: {
      Accept: KCURRENT_API_VERSION_HEADER,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Version': Constants.nativeAppVersion,
      'BuildVersion': Constants.nativeBuildVersion,
      'Platform': Constants.platform,
      Authorization: getBasicAuthentication(authtoken),
    }
  })
    .then(response => _parseJSON(response))
    .then(logResponse('json'))
    .catch(error => {
      console.error(error);
    });
}

export function postMethod(authtoken,object) {

    const urlString = `${KSERVERURL}/${object.getUrlString()}`
    // console.log(urlString)
    return fetch(urlString, {
    method: 'POST',
    headers: {
      Accept: KCURRENT_API_VERSION_HEADER,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Version': Constants.nativeAppVersion,
      'BuildVersion': Constants.nativeBuildVersion,
      'Platform': Constants.platform,
      Authorization: getBasicAuthentication(authtoken),
    }, body: object.getFormData()
  })
    .then(logResponse('json'))
    .then(response => _parseJSON(response))
    .catch(error => {
      console.error(error);
    });
}

export function postMultipartMethod(authtoken, object) {
     const urlString = `${KSERVERURL}/${object.getUrlString()}`
    // console.log(urlString)
    // console.log(object.getFormData())
    return fetch(urlString, {
    method: 'POST',
    headers: {
      Accept: KCURRENT_API_VERSION_HEADER,
      'Content-Type': 'multipart/form-data',
      'Version': Constants.nativeAppVersion,
      'BuildVersion': Constants.nativeBuildVersion,
      'Platform': Constants.platform,
      Authorization: getBasicAuthentication(authtoken),
    }, body: object.getFormData()
  })
    .then(logResponse('json'))
    .then(response => _parseJSON(response))
    .catch(error => {
      console.error(error);
    });
}

export function logResponse(description) {
  return function(res) {
      // console.log("Description")
      // console.log(description, res)
      return res
  }
}

export function _parseJSON(response) {
  // console.log("response " + response);
  return response.text().then(text => (text ? JSON.parse(text) : {}))
}

export default WebserviceHelper