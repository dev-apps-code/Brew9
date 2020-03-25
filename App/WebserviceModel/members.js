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
  scanStatus,
  updateAvatar,
  currentStatus,
  verifyCouponCode,
  getShippingAddress,
  saveShippingAddress,
  updateShippingAddress
} from '../Services/members'
import EventObject from './event_object'
import { AsyncStorage } from 'react-native'
import * as SecureStore from "expo-secure-store";
import { createAction } from "../Utils"
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
  return AsyncStorage.getItem("notification_key", (err, result) => {
    if (result != null) {
      return result
    }
    return null
  })
}

function getCurrentNotification() {
  return AsyncStorage.getItem("notifications", (err, result) => {
    if (result != null) {
      const current_notification = JSON.parse(result)
      return current_notification
    }
    return null
  })
}

export default {

  namespace: 'members',

  state: {
    userAuthToken: "",
    profile: null,
    last_read: null,
    isReady: false,
    company_id: 1,
    currency: '$',
    location: null,
    notifications: [],
    unreadNotificationCount: 0,
    unclaimedMission: 0
  },

  reducers: {
    setDefaultState(state, { payload }) {
      return {
        ...state,
        profile: null,
        isReady: false,
        userAuthToken: "",
      }
    },
    loadCurrentUser(state, { payload }) {
      return { ...state, profile: payload, isReady: true, userAuthToken: payload ? payload.auth_token : "" }
    },
    markAllNotificationAsRead(state, { payload }) {

      const notifications = state.notifications
      let data = [...notifications]
      var last_read = null
      if (data.length > 0) {

        for (var index in data) {
          data[index].read = true
        }

        last_read = data[0].id

        AsyncStorage.setItem("notification_key", JSON.stringify(last_read))
        AsyncStorage.setItem("notifications", JSON.stringify(data))

      }
      return { ...state, unreadNotificationCount: 0, notifications: data, last_read: last_read }
    },
    markOnPressNotificationAsRead(state, { payload }) {
      const notifications = state.notifications
      var last_read = null
      let data = [...notifications]
      let { item } = payload
      let tempData = data.map(notification => {
        if (notification.id == item.id && item.read == false) {

          last_read = item.id
          notification.read = true
          AsyncStorage.setItem("notification_key", JSON.stringify(last_read))

        }
        return notification
      })
      let count = tempData.filter(notification => {
        return notification.read == false
      })
      AsyncStorage.setItem("notifications", JSON.stringify(data))

      return { ...state, notifications: tempData, unreadNotificationCount: count.length }

    },
    updateUnreadNotification(state, { payload }) {
      return { ...state, unreadNotificationCount: payload }
    },
    updateUnclaimedMission(state, { payload }) {
      return { ...state, unclaimedMission: payload }
    },
    updateNotifications(state, { payload }) {
      let unread = 0
      let notifications = payload.result
      if (notifications != null && notifications.length > 0) {
        if (payload.last_read != null) {
          for (var index in notifications) {
            let item = notifications[index]
            let read = item.id <= payload.last_read ? true : false
            notifications[index].read = read

          }
        } else {
          for (var index in notifications) {
            notifications[index].read = false
          }
        }
        var new_notification_list = _.unionBy(notifications, 'id');
        var sorted = _.orderBy(new_notification_list, 'id', 'desc')
        let count = new_notification_list.filter(item => { return item.read == false })

        return { ...state, notifications: sorted, unreadNotificationCount: count.length }
      }
      else {
        return { ...state, notifications: [], unreadNotificationCount: unread }
      }

    },
    destroyCurrentUser(state, { payload }) {
      clearCurrentUser()
      return { ...state, profile: null, isReady: true, userAuthToken: "" }
    },
    setLocation(state, { payload }) {
      return { ...state, location: payload }
    },
    setDeliveryOption(state, { payload }) {
      return { ...state, delivery: payload }
    },
    saveCurrentUser(state, { payload }) {
      saveCurrentUserToStorage(payload)
      return { ...state, profile: payload, isReady: true, userAuthToken: payload ? payload.auth_token : "" }
    },
    saveCurrentShippingAddress(state, { payload }) {


      return { ...state, shippingAddress: payload, }
    },
    savePrimaryShippingAddress(state, { payload }) {
      let shippingAddress = state.shippingAddress
      let currentShippingAddress = shippingAddress.map(item => {
        if (item.id == payload.id) {
          item.primary = true
        } else {
          item.primary = false
        }
        return item
      })

      return { ...state, shippingAddress: currentShippingAddress }
    }
  },
  effects: {
    *loadStorePushToken({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          storePushToken,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) { }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadQrCode({ payload }, { call, put, select }) {
      try {

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          qrCode,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) { }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadScanStatus({ payload }, { call, put, select }) {
      try {

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          scanStatus,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          if (eventObject.result.clazz == 'member') {
            yield put(createAction('saveCurrentUser')(eventObject.result))
          }
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadNotifications({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          notifications,
          authtoken,
          object,
        )
        const last_read = yield call(getLastRead)
        const current_notification = yield call(getCurrentNotification)
        let current_notifications = JSON.parse(current_notification)
        const eventObject = new EventObject(json)
        const result = eventObject.result
        yield put(createAction('updateNotifications')({ result, last_read, current_notifications }))
        if (eventObject.success == true) {
          if (eventObject.member) {
            yield put(createAction('updateUnclaimedMission')(eventObject.member.unclaimed_mission_count))
          }
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadProfile({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          profile,
          authtoken,
          object,
        )
        console.log("Loading Profile")
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('updateUnclaimedMission')(eventObject.result.unclaimed_mission_count))
          yield put(createAction('saveCurrentUser')(eventObject.result))
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadUpdateProfile({ payload }, { call, put, select }) {
      try {
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
    *loadUpdateAvatar({ payload }, { call, put, select }) {
      try {
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
    *loadUpdatePhoneNumber({ payload }, { call, put, select }) {
      try {

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          updatePhoneNumber,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) { }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadVerifyPhoneNumberUpdate({ payload }, { call, put, select }) {
      try {

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          verifyPhoneNumberUpdate,
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
    *loadLogin({ payload }, { call, put, select }) {
      try {

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
    *loadLoginWithFacebook({ payload }, { call, put, select }) {
      try {

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
    *loadActivateAccount({ payload }, { call, put, select }) {
      try {

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
          yield put(createAction('updateUnreadNotification')(eventObject.result.badges_count))
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadCurrentUserFromCache({ payload }, { call, put, select }) {
      try {
        const json = yield call(getCurrentUser)
        // const last_read = yield call(getLastRead)
        const currentUser = JSON.parse(json)

        yield put(createAction('loadCurrentUser')(currentUser))
        // yield put(createAction('loadNotification')({currentUser, last_read}))

      } catch (err) {
        console.log('loadingCurrentUser', err)
      }
    },
    *loadDestroy({ payload }, { call, put, select }) {
      try {

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
        } else {
          yield put(createAction('destroyCurrentUser')(eventObject.result))
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadOrders({ payload }, { call, put, select }) {
      try {

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
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
    *loadPointProductRedemption({ payload }, { call, put, select }) {
      try {

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          pointProductRedemption,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) { }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadCurrentOrder({ payload }, { call, put, select }) {
      try {

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          currentOrder,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('updateUnclaimedMission')(eventObject.member.unclaimed_mission_count))
          yield put(createAction('shops/setOrders')({ orders: eventObject.result }))
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadQrCodeScan({ payload }, { call, put, select }) {
      try {

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          qrCodeScan,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadMissionStatements({ payload }, { call, put, select }) {
      try {

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          missionStatements,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('updateUnclaimedMission')(eventObject.member.unclaimed_mission_count))
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *missionRewardClaim({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          missionRewardClaim,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('updateUnclaimedMission')(eventObject.result.member.unclaimed_mission_count))
          yield put(createAction('saveCurrentUser')(eventObject.result.member))
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *missionLogin({ payload }, { call, put, select }) {
      try {
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
    *loadCurrentStatus({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
          currentStatus,
          authtoken,
          object,
        )

        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          let members = Array.isArray(eventObject.result)
          if (!members) {
            yield put(createAction('saveCurrentUser')(eventObject.result))
          }
          yield put(createAction('updateUnreadNotification')(eventObject.result.unread_notification))
          yield put(createAction('updateUnclaimedMission')(eventObject.result.unclaimed_mission_count))
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadVerifyCouponCode({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload

        const authtoken = yield select(state => state.members.userAuthToken)

        const json = yield call(
          verifyCouponCode,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          if (eventObject.member) {
            yield put(createAction('saveCurrentUser')(eventObject.member))
          }
        }
        typeof callback === 'function' && callback(eventObject)
      } catch (err) { }
    },
    *loadShippingAddress({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)

        const json = yield call(
          getShippingAddress,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('saveCurrentUser')(eventObject.result))
          yield put(createAction('saveCurrentShippingAddress')(eventObject.result['list of addresses']))

        }
        typeof callback === 'function' && callback(eventObject)

      } catch (err) { console.log('loadShippingAddress', err) }
    },
    *saveShippingAddress({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)

        const json = yield call(
          saveShippingAddress,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('saveCurrentUser')(eventObject.result))
          yield put(createAction('saveCurrentShippingAddress')(eventObject.result['list of addresses']))

        }
        typeof callback === 'function' && callback(eventObject)

      } catch (err) { console.log('addShippingAddress', err) }
    },
    *updateShippingAddress({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)

        const json = yield call(
          updateShippingAddress,
          authtoken,
          object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {
          yield put(createAction('saveCurrentUser')(eventObject.result))
          yield put(createAction('saveCurrentShippingAddress')(eventObject.result['list of addresses']))

        }
        typeof callback === 'function' && callback(eventObject)

      } catch (err) { console.log('updateShippingAddresseventObject', err) }
    }
  },

}
