import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function getOrders(authtoken,object) {
    return getMethod(authtoken,object)
}