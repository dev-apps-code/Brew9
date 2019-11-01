import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function loadCreditHistory(authtoken,object) {
    return getMethod(authtoken,object)
}