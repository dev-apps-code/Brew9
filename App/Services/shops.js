import { getMethod,postMethod,postMultipartMethod,postJsonMethod } from '../Utils/webservice_helper'

export function shops(authtoken,object) {
   return getMethod(authtoken,object)
}

export function shop_banner(authtoken,object) {
   return getMethod(authtoken,object)
}

export function makeOrder(authtoken,object) {

   return postJsonMethod(authtoken,object)
}