import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function storePushToken(authtoken,object) {

   return postMethod(authtoken,object)
}