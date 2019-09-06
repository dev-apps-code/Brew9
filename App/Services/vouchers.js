import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function getValidVoucher(authtoken,object) {

    return getMethod(authtoken,object)
}

export function getUsedVoucher(authtoken,object) {

    return getMethod(authtoken,object)
}

export function getExpiredVoucher(authtoken,object) {

    return getMethod(authtoken,object)
}