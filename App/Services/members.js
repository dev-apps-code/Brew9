import { getMethod,postMethod,postMultipartMethod,deleteMethod } from '../Utils/webservice_helper'
import ProfileRequestObject from '../Requests/profile_request_object'

export function storePushToken(authtoken,object) {
   return postMethod(authtoken,object)
}

export function qrCode(authtoken,object) {
   return getMethod(authtoken,object)
}

export function notifications(authtoken,object) {
   return getMethod(authtoken,object)
}

export function profile(authtoken,object) {
   return getMethod(authtoken,object)
}

export function updateProfile(authtoken,object) {
   return postMultipartMethod(authtoken,object)
}

export function updatePhoneNumber(authtoken,object) {
   return postMethod(authtoken,object)
}

export function verifyPhoneNumberUpdate(authtoken,object) {
   return postMethod(authtoken,object)
}

export function login(authtoken,object) {
   console.log("return yes")
   return postMethod(authtoken,object)
}

export function loginWithFacebook(authtoken,object) {
   return postMethod(authtoken,object)
}

export function activateAccount(authtoken,object) {
   return postMethod(authtoken,object)
}

export function destroy(authtoken,object) {
   return deleteMethod(authtoken,object)
}

export function orders(authtoken,object) {
   return getMethod(authtoken,object)
}

export function pointProductRedemption(authtoken,object) {
   return getMethod(authtoken,object)
}

export function currentOrder(authtoken,object) {
   return getMethod(authtoken,object)
}

export function qrCodeScan(authtoken,object) {
   return postMethod(authtoken,object)
}

export function missionStatements(authtoken,object) {
   return getMethod(authtoken,object)
}