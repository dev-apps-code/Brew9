import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'
import {getBaiduriAuthorizationToken, getPaymentServer,getMerchantId} from '../Utils/server.js'
import {logResponse,_parseJSON} from '../Utils/webservice_helper'

export function getSession(authtoken,object) {
   return postMethod(authtoken,object)
}

export function updateSession(session_id,object) {

   const urlString = `${getPaymentServer()}/api/rest/version/47/merchant/${getMerchantId()}/session/${session_id}`
   console.log("Payment URL", urlString)
   return fetch(urlString, {
   method: 'PUT',
   headers: {
     'Content-Type': 'application/json',
     Authorization: getBaiduriAuthorizationToken(),
   }, body: object.getFormData()
   })
   .then(logResponse('json'))
   .then(response => {
    _parseJSON(response)
    console.log(_parseJSON(response))
   })
   .catch(error => {
     console.log("Error", error)
     console.error(error);
   });

}
