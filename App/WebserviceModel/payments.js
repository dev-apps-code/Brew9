import EventObject from './event_object'
import { getSession, updateSession } from '../Services/payments'
import {createAction, Storage} from "../Utils/index"
export default {
    namespace: 'payments',

    state: {
        session_json:undefined,
        session_id:undefined
    },

    reducers: {
        setSessionJson(state, { payload }) {

            return {
                ...state,session_json:payload,session_id:payload.session.id
            }            
        },        
        setDefaultState(state, { payload }) {
            return {
                ...state,br
            }
        }
    },
    effects: {
        *loadGetSession({ payload }, { call, put, select }) 
        {
        try{

            const { object, callback } = payload
            const authtoken = yield select(state => state.members.userAuthToken)
            const json = yield call(
                getSession,
                authtoken,
                object,
            )
            
            if (json.result == 'SUCCESS') {
                yield put(createAction('setSessionJson')(json))
                typeof callback === 'function' && callback(null)   
            }else{
                typeof callback === 'function' && callback(null)    
            }            
            } catch (err) { }
        }, 
        *loadSetCreditCardSession({ payload }, { call, put, select }) 
        {

        try{
            const { object, callback } = payload

            const session_id = yield select(state => state.payments.session_id)
            const json = yield call(
                updateSession,
                session_id,
                object,
            )
            console.log(`json returned ${JSON.stringify(json)}`)
            console.log()
            if (json.result == 'SUCCESS') {
                yield put(createAction('setSessionJson')(json))
                typeof callback === 'function' && callback(null)   
            }else{
                typeof callback === 'function' && callback(null)    
            }            
            } catch (err) { }
        }, 
    },
}
