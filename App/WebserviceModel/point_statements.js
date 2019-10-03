import { loadPointHistory } from '../Services/point_statements'
import EventObject from './event_object'

export default {
    namespace: 'point_statements',

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
        *loadPointHistory({ payload }, { call, put, select }) {
            try {

                const { object, callback } = payload

                const authtoken = yield select(state => state.members.userAuthToken)

                const json = yield call(
                    loadPointHistory,
                    authtoken,
                    object
                )
                const eventObject = new EventObject(json)
                if (eventObject.success == true) {
                }
                typeof callback === 'function' && callback(eventObject)
            } catch (err) { }
        },
    },
}
