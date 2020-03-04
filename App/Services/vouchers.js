import { getMethod, postMethod, postMultipartMethod, postJsonMethod } from '../Utils/webservice_helper'

export function getValidVoucher(authtoken, object) {

    return getMethod(authtoken, object)
}

export function getUsedVoucher(authtoken, object) {

    return getMethod(authtoken, object)
}

export function getExpiredVoucher(authtoken, object) {

    return getMethod(authtoken, object)
}

export function validVouchers(authtoken, object) {

    return postJsonMethod(authtoken, object)
}

export function verifyCouponCode(authtoken, object) {

    return getMethod(authtoken, object)
}
