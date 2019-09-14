import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function getMembershipPlan(authtoken,object) {
    return getMethod(authtoken,object)
}