import { loadCreditHistory } from '../Services/credit_statements'
import EventObject from './event_object'

export default {
    namespace: 'credit_statements',

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
        *loadCreditHistory({ payload }, { call, put, select }) {
            try {

                const { object, callback } = payload

                const authtoken = yield select(state => state.members.userAuthToken)

                const json = yield call(
                    loadCreditHistory,
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
