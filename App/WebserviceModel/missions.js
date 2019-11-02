import { missionRewardClaim } from '../Services/missions.js'
import EventObject from './event_object'
import {createAction} from  '../Utils/index'
export default {
    namespace: 'missions',

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
        *missionRewardClaim({ payload }, { call, put, select }) 
        {
        try{
    
            const { object, callback } = payload
            const authtoken = yield select(state => state.members.userAuthToken)
            const json = yield call(
                missionRewardClaim,
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
