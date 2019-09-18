import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function shops(authtoken,object) {
   return getMethod(authtoken,object)
}
