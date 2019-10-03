import { getValidVoucher, getUsedVoucher, getExpiredVoucher } from '../Services/vouchers'
import EventObject from './event_object'

export default {
    namespace: 'vouchers',

    state: {
        member_id: 1
    },
    reducers: {
        setDefaultState(state, { payload }) {
            return {
                ...state,
            }
        }
    },
    effects: {
        *loadValidVoucher({ payload }, { call, put, select }) {
            try {

                const { object, callback } = payload

                const authtoken = yield select(state => state.members.userAuthToken)

                const json = yield call(
                    getValidVoucher,
                    authtoken,
                    object,
                )
                const eventObject = new EventObject(json)
                if (eventObject.success == true) {
                }
                typeof callback === 'function' && callback(eventObject)
            } catch (err) { }
        },
        *loadUsedVoucher({ payload }, { call, put, select }) {
            try {

                const { object, callback } = payload

                const authtoken = yield select(state => state.members.userAuthToken)

                const json = yield call(
                    getValidVoucher,
                    authtoken,
                    object,
                )
                const eventObject = new EventObject(json)
                if (eventObject.success == true) {
                }
                typeof callback === 'function' && callback(eventObject)
            } catch (err) { }
        },
        *loadExpiredVoucher({ payload }, { call, put, select }) {
            try {

                const { object, callback } = payload

                const authtoken = yield select(state => state.members.userAuthToken)

                const json = yield call(
                    getValidVoucher,
                    authtoken,
                    object,
                )
                const eventObject = new EventObject(json)
                if (eventObject.success == true) {
                }
                typeof callback === 'function' && callback(eventObject)
            } catch (err) { }
        },
    },
}
