import { KCURRENT_API_VERSION_HEADER, KSERVERURL } from '../Utils/server';
import { _parseJSON } from '../Utils/webservice_helper';

export function getConfig() {
  const api = await KSERVERURL();
  const url = `${api}/config_data`;

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
