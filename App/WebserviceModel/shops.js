import { shops, shop_banner } from '../Services/shops'
import EventObject from './event_object'

export default {
    namespace: 'shops',

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
        *loadShops({ payload }, { call, put, select }) 
        {
        try{
    
            const { object, callback } = payload
            const authtoken = yield select(state => state.userAuthToken)
            const json = yield call(
                shops,
                authtoken,
                object,
            )
            const eventObject = new EventObject(json)
            if (eventObject.success == true) {}
            typeof callback === 'function' && callback(eventObject)
            } catch (err) { }
        },
        *loadShopBanners({ payload }, { call, put, select })
        {
            try{

                const { object, callback } = payload
                const authtoken = yield select(state => state.userAuthToken)
                const json = yield call(
                    shop_banner,
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
