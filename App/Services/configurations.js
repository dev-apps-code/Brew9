import { Platform } from 'react-native';
import { KCURRENT_API_VERSION_HEADER, KSERVERURL } from '../Utils/server';
import { _parseJSON, logResponse } from '../Utils/webservice_helper';
import { getAppVersion, getBuildVersion } from '../Utils';

async function getMethod() {
  const api = await KSERVERURL();
  const url = `${api}/config_data`;

  console.log('url ', url);
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: KCURRENT_API_VERSION_HEADER,
      'Content-Type': 'application/x-www-form-urlencoded',
      AppVersion: getAppVersion(),
      BuildVersion: getBuildVersion(),
      Platform: Platform.OS
    }
  })
    .then((response) => _parseJSON(response))
    .then(logResponse('json'))
    .catch((error) => {
      console.error(error);
    });
}

export function getConfig() {
  return getMethod();
}
