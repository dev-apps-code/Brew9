import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function getOrders(authtoken,object) {
    console.log("Ordering")
   return getMethod(authtoken,object)
}