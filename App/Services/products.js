import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function getProducts(authtoken,object) {
    return getMethod(authtoken,object)
}