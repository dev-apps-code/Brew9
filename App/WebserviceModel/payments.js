import EventObject from './event_object'
import { getPointProduct,redeem } from '../Services/point_products'
import {createAction, Storage} from "../Utils/index"
export default {
    namespace: 'payments',

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
       
    },
}
