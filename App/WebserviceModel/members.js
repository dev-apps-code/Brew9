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
  destroy,
  orders,
  pointProductRedemption,
  currentOrder,
  qrCodeScan,
  missionStatements,
  missionRewardClaim,
  missionLogin,
  updateAvatar
} from '../Services/members'
import EventObject from './event_object'
import { AsyncStorage } from 'react-native'
import * as SecureStore from "expo-secure-store";
import {createAction} from "../Utils"
import { create } from 'uuid-js'
import _ from 'lodash'
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

function clearCurrentUser() {
  AsyncStorage.clear()
}

function getLastRead() {
  console.log("getlast")
  return AsyncStorage.getItem("notification_key", (err, result) => {
    if (result != null) {
      return result
    }
    return null
  })
  
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
    notifications: []
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
      console.log("LoadUser")
      return { ...state, profile: payload, isReady: true, userAuthToken: payload ? payload.auth_token : "" }
    },
    loadNotification(state, {payload}) {
      
      if (payload.currentUser != null) {
        if (payload.last_read != null) {
          var notifications = _.filter(payload.currentUser.notifications, function(o) { 
            return o.id > payload.last_read; 
          })
          
          return { ...state, notifications : notifications }
        } else {
          return { ...state, notifications : payload.currentUser.notifications }
        }
      } else {
        return { ...state, notifications : [] }
      }
      
    },
    destroyCurrentUser(state, {payload}) {
      clearCurrentUser()
      return { ...state, profile: null, isReady: true, userAuthToken: "" }
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
      console.log("Here")
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
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('saveCurrentUser')(eventObject.result))
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadUpdateAvatar({ payload }, { call, put, select })
    {
      console.log("Avatar")
      try{
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            updateAvatar,
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
        if (eventObject.success == true) {           
          // yield put(createAction('saveCurrentUser')(eventObject.result))
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
        const last_read = yield call(getLastRead)
        const currentUser = JSON.parse(json)

        yield put(createAction('loadCurrentUser')(currentUser))
        yield put(createAction('loadNotification')({currentUser, last_read}))

      } catch (err) {
        console.log('loadingCurrentUser', err)
      }
    },
    *loadDestroy({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            destroy,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        
        if (eventObject.success == true) {
          yield put(createAction('destroyCurrentUser')(eventObject.result))
        }else{
          yield put(createAction('destroyCurrentUser')(eventObject.result))
        }
        typeof callback === 'function' && callback(eventObject)
        } catch (err) { }
    }, 
    *loadOrders({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        console.log("Auth", authtoken)
        const json = yield call(
            orders,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
        }
        typeof callback === 'function' && callback(eventObject)
        } catch (err) { }
    },
    *loadPointProductRedemption({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            pointProductRedemption,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {}
        typeof callback === 'function' && callback(eventObject)
        } catch (err) { }
    }, 
    *loadCurrentOrder({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            currentOrder,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {}
        typeof callback === 'function' && callback(eventObject)
        } catch (err) { }
    }, 
    *loadQrCodeScan({ payload }, { call, put, select })
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        console.log("Authtoken", authtoken)
        const json = yield call(
            qrCodeScan,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('saveCurrentUser')(eventObject.result.member))
        }
        typeof callback === 'function' && callback(eventObject)
        } catch (err) { }
    },
    *loadMissionStatements({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            missionStatements,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {}
        typeof callback === 'function' && callback(eventObject)
        } catch (err) { }
    }, 
    *missionRewardClaim({ payload }, { call, put, select }) 
    {
    try{
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            missionRewardClaim,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('saveCurrentUser')(eventObject.result.member))
        }
        typeof callback === 'function' && callback(eventObject)
        } catch (err) { }
    }, 
    *missionLogin({ payload }, { call, put, select }) 
    {
    try{
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            missionLogin,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('saveCurrentUser')(eventObject.result.member))
        }
        typeof callback === 'function' && callback(eventObject)
        } catch (err) { }
    }, 
  },
}
