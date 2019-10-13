import { getMethod,postMethod,postMultipartMethod,postJsonMethod } from '../Utils/webservice_helper'

export function shops(authtoken,object) {
   return getMethod(authtoken,object)
}

export function shop_banner(authtoken,object) {
   return getMethod(authtoken,object)
}

export function makeOrder(authtoken,object) {
   console.log("tst12")
   return postJsonMethod(authtoken,object)
}

export function missions(authtoken,object) {
   return getMethod(authtoken,object)
}