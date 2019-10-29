import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function makeOrder(authtoken,object) {
   return postMethod(authtoken,object)
}