import {
    getOrders
  } from '../Services/orders'
  import EventObject from './event_object'
  
  export default {
  
    namespace: 'orders',
  
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
        *loadGetOrders({ payload }, { call, put, select }) 
        {
            try{
    
            console.log("LoadingOrder")
            const { object, callback } = payload
            const authtoken = yield select(state => state.member.userAuthToken)
            const json = yield call(
                getOrders,
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