export const KSERVERURL = "http://139.162.16.119:3050/api";
export const KURL_INFO = "http://139.162.16.119:3050/info";
//export const KSERVERURL ='http://localhost:3000/api'
//export const KURL_INFO ='http://localhost:3000/info'
// export const KSERVERURL ='https://3358a428.ngrok.io/api'
// export const KURL_INFO = 'https://3358a428.ngrok.io/info'

export const KURL_TERMS_OF_SERVICE = KURL_INFO + "?page=terms_conditions";
export const KURL_PRIVACY_POLICY = KURL_INFO + "?page=privacy";
export const KURL_EULA = KURL_INFO + "?page=eula";

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
