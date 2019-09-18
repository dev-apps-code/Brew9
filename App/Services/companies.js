import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function topUpProducts(authtoken,object) {
    return getMethod(authtoken,object)
}

export function pointsProducts(authtoken,object) {
    return getMethod(authtoken,object)
}