import { storePushToken } from '../Services/members'
import EventObject from './event_object'

export default {
  namespace: 'members',

  state: {

  },
  reducers: {
   setDefaultState(state, { payload }) {
        return {
          ...state,       
        }
      }
   },
  effects: {
    *loadStorePushToken({ payload }, { call, put, select }) {
        try {

          const { object, callback } = payload
          var authtoken = "";

          console.log("load store3")
          // const authtoken = yield select(state => state.member.userAuthToken)
          
          const json = yield call(
            storePushToken,
            authtoken,
            object,
          )
          const eventObject = new EventObject(json)
          if (eventObject.success == true) {
          }
          typeof callback === 'function' && callback(eventObject)
        } catch (err) { }
      },    
  },
}
