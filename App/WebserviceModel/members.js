import { storePushToken, qrCode, notifications } from '../Services/members'
import EventObject from './event_object'

export default {
  namespace: 'members',

  state: {
    userAuthToken: "",
    member_id: 1,
    member_name: 'Jason',
    member_points: 300,
    member_credits: 100.20,
    member_free_membership_exp: 100,
    member_premium_membership_exp: 200,
    member_available_vouchers: 4,
    currency: "BND",
    member_image: "https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-04-512.png",
    company_id: 1,
    wallet_enabled: false,
    isPremium: false,
    membership_name: "Free Member",
    free_membership_level: "Lv1",
    free_membership_next_level_exp: 300,
    premium_membership_next_level_exp: 500,
    // membership_background: "https://9e7a68b5.ngrok.io/uploads/membership_plan/plan_image/1/bg-02_3x.png",
    membership_background: "https://4ab01521.ngrok.io/uploads/membership_plan/plan_image/2/bg-03_3x.png",
    membership_expiry_date: "2020-01-01",

  },

  reducers: {
   setDefaultState(state, { payload }) {
        return {
          ...state,       
        }
      }
   },
  effects: {
    *loadStorePushToken({ payload }, { call, put, select }) 
    {
      try {
        const { object, callback } = payload
        const authtoken = yield select(state => state.member.userAuthToken)
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
        // const authtoken = yield select(state => state.member.userAuthToken)
        const authtoken = ""
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
        // const authtoken = yield select(state => state.member.userAuthToken)
        const authtoken = ""
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
  },
}
