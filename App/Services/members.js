import { storePushToken } from '../Services/members'
import EventObject from './event_object.js'

export default {
  namespace: 'members',

  state: {

  },
  reducers: {
   
  },
  effects: {
    *loadStorePushToken({ payload }, { call, put, select }) {
        try {
          const { object, callback } = payload
          const authtoken = yield select(state => state.member.userAuthToken)
  
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
