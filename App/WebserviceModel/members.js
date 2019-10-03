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
      return { ...state, profile: payload, isReady: true, userAuthToken: payload ? payload.auth_token : "" }
    },
    saveCurrentUser(state,{payload}) {
<<<<<<< HEAD
      saveCurrentUserToStorage(payload)
      return { ...state, profile: payload, userAuthToken:profile.auth_token, isReady: true }
=======
      saveCurrentUser(payload)
      return { ...state, profile: payload, isReady: true, userAuthToken: payload ? payload.auth_token : "" }
>>>>>>> bef212c3cdf60264ac0230fe0a75a7be7a9a6dd0
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
<<<<<<< HEAD

=======
>>>>>>> bef212c3cdf60264ac0230fe0a75a7be7a9a6dd0
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
<<<<<<< HEAD
        const authtoken = yield select(state => state.userAuthToken)
=======
        const authtoken = yield select(state => state.members.userAuthToken)
>>>>>>> bef212c3cdf60264ac0230fe0a75a7be7a9a6dd0
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
        const eventObject = new EventObject(json)
        if (eventObject.success == true) { }
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
