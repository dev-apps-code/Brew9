import EventObject from './event_object.js'
import { getPointHistories } from '../Services/point_statements'

export default {
    namespace: 'point_statements',

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
        *loadPointHistory({ payload }, { call, put, select }) {
            try {
                const { callback, member_id, page } = payload
                const authtoken = yield select(state => state.member.userAuthToken)
                const json = yield call(getPointHistories, authtoken, member_id, page)
                const eventObject = new EventObject(json)
                typeof callback === 'function' && callback(eventObject)
            } catch (err) {}
        },
    },
}
