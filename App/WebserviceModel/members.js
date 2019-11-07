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
  missionStatements
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

function clearCurrentUser() {
  AsyncStorage.clear()
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
      return { ...state, profile: payload, isReady: true, userAuthToken: payload ? payload.auth_token : "" }
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
        const currentUser = JSON.parse(json)

        yield put(createAction('loadCurrentUser')(currentUser))

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

  },
}
