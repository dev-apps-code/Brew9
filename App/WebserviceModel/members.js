import { storePushToken } from '../Services/members'
import EventObject from './event_object'

export default {
  namespace: 'members',

  state: {
    userAuthToken:''
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
  },
}
