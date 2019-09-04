import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function loadPointHistory(authtoken,object) {
    return getMethod(authtoken,object)
}