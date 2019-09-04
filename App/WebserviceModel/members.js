import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function store_push_token(authtoken,object) {
   return postMethod(authtoken,object)
}

