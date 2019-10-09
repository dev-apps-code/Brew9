import {
  storePushToken,
  qrCode,
  notifications,
  profile,
  updateProfile,
  updatePhoneNumber,
  verifyPhoneNumberUpdate,
  login,
  loginWithFacebook,
  activateAccount,
} from '../Services/members'
import EventObject from './event_object'
import { AsyncStorage } from 'react-native'
import {createAction} from "../Utils"

function getCurrentUser() {
  return AsyncStorage.getItem("profile", (err, result) => {
    if (result != null) {
      return result
    }
    return null
  })
}

function saveCurrentUserToStorage(profile) {
  
  AsyncStorage.setItem("profile", JSON.stringify(profile))
}
export default {

  namespace: 'members',

  state: {
    userAuthToken: "",
    profile: null,
    isReady: false,
    company_id:1,
    currency:'$',
    location:null,

  },


  reducers: {
     setDefaultState(state, { payload }) {
        return {
          ...state,
          profile:null,
          isReady: false,
          userAuthToken: "",
        }
     },
    loadCurrentUser(state, { payload }) {
      console.log("load profiel",profile)
      return { ...state, profile: payload, isReady: true, userAuthToken: payload ? payload.auth_token : "" }
    },
    setLocation(state, { payload }) {
      return { ...state, location: payload}
    },
    saveCurrentUser(state,{payload}) {
      saveCurrentUserToStorage(payload)
      return { ...state, profile: payload, isReady: true, userAuthToken: payload ? payload.auth_token : "" }
    },
  },
  effects: {
    *loadStorePushToken({ payload }, { call, put, select }) 
    {
      try {
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          storePushToken,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {}
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadQrCode({ payload }, { call, put, select })
    {
      try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            qrCode,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {}
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadNotifications({ payload }, { call, put, select })
    {
      try{
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            notifications,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {}
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadProfile({ payload }, { call, put, select })
    {
      try{
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            profile,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('saveCurrentUser')(eventObject.result))
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadUpdateProfile({ payload }, { call, put, select })
    {
      try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            updateProfile,
            authtoken,
            object,
        )
        console.log("AuthToken", authtoken)
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('saveCurrentUser')(eventObject.result))
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadUpdatePhoneNumber({ payload }, { call, put, select })
    {
      try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            updatePhoneNumber,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {}
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadVerifyPhoneNumberUpdate({ payload }, { call, put, select })
    {
      try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            verifyPhoneNumberUpdate,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {}
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadLogin({ payload }, { call, put, select })
    {
      try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            login,
            authtoken,
            object,
        )
        console.log("return")
        const eventObject = new EventObject(json)
        if (eventObject.success == true) { 
          console.log("return yes",eventObject.result)
          yield put(createAction('saveCurrentUser')(eventObject.result))
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadLoginWithFacebook({ payload }, { call, put, select })
    {
      try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            loginWithFacebook,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)

        if (eventObject.success == true) {
          yield put(createAction('saveCurrentUser')(eventObject.result))
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadActivateAccount({ payload }, { call, put, select })
    {
      try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            activateAccount,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('saveCurrentUser')(eventObject.result))
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadCurrentUserFromCache({ payload }, { call, put, select }) {
      try {
        const json = yield call(getCurrentUser)
        const currentUser = JSON.parse(json)

        yield put(createAction('loadCurrentUser')(currentUser))

      } catch (err) {
        console.log('loadingCurrentUser', err)
      }
    },
  },
}
