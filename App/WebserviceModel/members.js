import { storePushToken } from '../Services/members'
import EventObject from './event_object'

export default {
  namespace: 'members',

  state: {
<<<<<<< HEAD
    userAuthToken:''
=======
      member_id: 1,
      member_point: 300,
>>>>>>> 416464d3be9b9445f4344bba75d18c5592022220
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

<<<<<<< HEAD
          const authtoken = yield select(state => state.member.userAuthToken)
          
=======
          // const authtoken = yield select(state => state.member.userAuthToken)
          const authtoken = ""
>>>>>>> 416464d3be9b9445f4344bba75d18c5592022220
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
