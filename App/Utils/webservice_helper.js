import { btoa } from './node_modules/Base64'
import { KSERVERURL, encodeForFormData,KCURRENT_API_VERSION_HEADER } from './Utils/server.js.js'

export class WebserviceHelper {
  static b64EncodeUnicode(str) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
        String.fromCharCode(`0x${p1}`)
      )
    )
  }
}

export function getBasicAuthentication(authToken) {
  return `Basic ${authToken}`
}

export function getMethod(urlString,object, authtoken) {

  return fetch(`${KSERVERURL}/${urlString}`, {
    method: 'GET',
    headers: {
      Accept: KCURRENT_API_VERSION_HEADER,
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: getBasicAuthentication(authtoken),
    },
  })
    .then(response => _parseJSON(response))
    .then(logResponse('json'))
    .catch(error => {
      console.error(error);
    });
}

export function postMethod(authtoken,object) {
    return fetch(`${KSERVERURL}/${object.getUrlString}`, {
    method: 'POST',
    headers: {
      Accept: KCURRENT_API_VERSION_HEADER,
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: getBasicAuthentication(authtoken),
    }, body: formData
  })
    .then(logResponse('json'))
    .then(response => _parseJSON(response))
    .catch(error => {
      console.error(error);
    });
}

export function postMultipartMethod(urlString,object, authtoken) {
    return fetch(`${KSERVERURL}/${urlString}`, {
    method: 'POST',
    headers: {
      Accept: KCURRENT_API_VERSION_HEADER,
      'Content-Type': 'multipart/form-data',
      Authorization: getBasicAuthentication(authtoken),
    }, body: formData
  })
    .then(logResponse('json'))
    .then(response => _parseJSON(response))
    .catch(error => {
      console.error(error);
    });
}

export function logResponse(description) {
  return function(res) {
    console.log(description, res)
    return res
  }
}

export function _parseJSON(response) {
  // console.log("response " + response);
  return response.text().then(text => (text ? JSON.parse(text) : {}))
}

export default WebserviceHelper
