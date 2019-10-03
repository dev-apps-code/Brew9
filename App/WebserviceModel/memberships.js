import { getMembershipPlan } from '../Services/memberships.js'
import EventObject from './event_object'

export default {
    namespace: 'memberships',

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
        *loadMembershipPlans({ payload }, { call, put, select })
        {
            try {
                const { object, callback } = payload
                const authtoken = yield select(state => state.members.userAuthToken)

                const json = yield call(
                    getMembershipPlan,
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
