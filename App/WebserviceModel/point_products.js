import EventObject from './event_object'
import { getPointProduct,redeem } from '../Services/point_products'
import {createAction, Storage} from "../Utils/index"
export default {
    namespace: 'point_products',

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
        *loadPointProduct({ payload }, { call, put, select })
        {
            try{

                const { object, callback } = payload
                const authtoken = yield select(state => state.members.userAuthToken)

                const json = yield call(
                    getPointProduct,
                    authtoken,
                    object,
            )
                const eventObject = new EventObject(json)
                if (eventObject.success == true) {}
                typeof callback === 'function' && callback(eventObject)
            } catch (err) { }
        },
        *loadRedeem({ payload }, { call, put, select }) 
            {
            try{

                const { object, callback } = payload
                const authtoken = yield select(state => state.members.userAuthToken)
                const json = yield call(
                    redeem,
                    authtoken,
                    object,
                )
                const eventObject = new EventObject(json)
                if (eventObject.success == true) {
                    yield put(createAction('members/saveCurrentUser')(eventObject.result.member))
                }
                typeof callback === 'function' && callback(eventObject)
                } catch (err) { }
            }, 
    },
}
