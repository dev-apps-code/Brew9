// export const KSERVERURL = "https://app.brew9.co/api"
// export const KURL_INFO = "https://app.brew9.co/info"
// export const KPAYMENTYURL = "https://app.brew9.co/payments/baiduri"

export const KSERVERURL = "http://test.brew9.co/api"
export const KURL_INFO = "http://test.brew9.co/info"
export const KPAYMENTYURL = "http://test.brew9.co/payments/baiduri"

// export const KSERVERURL ='http://localhost:3000/api'
// export const KURL_INFO ='http://localhost:3000/info'
// export const KPAYMENTYURL ='http://localhost:3000/payments/baiduri'

// export const KPAYMENTYURL ='http://payment.brew9.com'
// export const KSERVERURL ='https://18624bd1.ngrok.io/api'
// export const KURL_INFO = 'https://18624bd1.ngrok.io/info'

export const KURL_TERMS_OF_SERVICE = KURL_INFO + "?page=terms_conditions&id=f1";
export const KURL_PRIVACY_POLICY = KURL_INFO + "?page=privacy&id=1";
export const KURL_EULA = KURL_INFO + "?page=eula&id=1";
export const KURL_MEMBERSHIP_INFO = KURL_INFO + '/membership_info';
export const KCURRENT_API_VERSION_HEADER = "application/dc.v3 gzip";
export const APPBUILDVERSIONIOS = "3";
export const APPBUILDVERSIONANDROID = "3";


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

export function getPaymentServer(){
  if (IS_TEST){
    return 'https://baiduri-bpgs.mtf.gateway.mastercard.com'
  }else{
    return 'https://baiduri-bpgs.gateway.mastercard.com'
  }
}

export function getMerchantId(){
    return '950029645'
}

export function getBaiduriAuthorizationToken(){
  return 'Basic TUVSQ0hBTlQuOTUwMDI5NjQ1Ojc0NTlkZWNiZWFiOWEwMzUxYzU4ZDk3YjFkZjg4NDdm'
}
