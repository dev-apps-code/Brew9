import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function getPointProduct(authtoken,object) {
    return getMethod(authtoken,object)
}