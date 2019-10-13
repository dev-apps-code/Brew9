// export const KSERVERURL = "http://brew9.dreamcode.solutions/api";
export const KURL_INFO = "http://brew9.dreamcode.solutions/info";
export const KSERVERURL ='http://localhost:3000/api'
//export const KURL_INFO ='http://localhost:3000/info'
// export const KSERVERURL ='https://1a448323.ngrok.io/api'
// export const KURL_INFO = 'https://1a448323.ngrok.io/info'

export const KURL_TERMS_OF_SERVICE = KURL_INFO + "?page=terms_conditions&id=1";
export const KURL_PRIVACY_POLICY = KURL_INFO + "?page=privacy&id=1";
export const KURL_EULA = KURL_INFO + "?page=eula&id=1";

export const KURL_CREDIT = "http://www.innogix.com/co3/credit_policy.html";
export const KURL_TERMS_CO3_GO =
  "http://www.innogix.com/co3/co3_go_agreement.html";

export const KCURRENT_API_VERSION_HEADER = "application/dc.v12";

export const KTIMEOUT = 3 * 1000;

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
