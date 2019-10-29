import { makeOrder } from '../Services/top_up.js'
import EventObject from './event_object'
import {createAction} from  '../Utils/index'
export default {
    namespace: 'top_up',

    state: {

    },
    reducers: {
        setDefaultState(state, { payload }) {
            return {
                ...state,
            }
        },
    },
    effects: {      
        *loadMakeOrder({ payload }, { call, put, select }) 
        {
        try{
    
            const { object, callback } = payload
            const authtoken = yield select(state => state.members.userAuthToken)
            const json = yield call(
                makeOrder,
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
