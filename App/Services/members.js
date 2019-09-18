import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function storePushToken(authtoken,object) {
   return postMethod(authtoken,object)
}

export function qrCode(authtoken,object) {
   return getMethod(authtoken,object)
}

export function notifications(authtoken,object) {
   return getMethod(authtoken,object)
}