import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function missionRewardClaim(authtoken,object) {
    return postMethod(authtoken,object)
}