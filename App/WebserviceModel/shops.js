import { shops, shop_banner,makeOrder,missions } from '../Services/shops'
import EventObject from './event_object'
import {createAction} from  '../Utils/index'
export default {
    namespace: 'shops',

    state: {
        selectedShop:null,
        popUp:false,
    },
    reducers: {
        setDefaultState(state, { payload }) {
            return {
                ...state,
            }
        },
        setSelectedShop(state, { payload }) {
            return { ...state, selectedShop: payload}
        },
        setPopUp(state, { payload }) {

            const {popUp} = payload
            return { ...state, popUp}
        },
    },
    effects: {
        *loadShops({ payload }, { call, put, select }) 
        {
        try{
    
            const { object, callback } = payload
            const authtoken = yield select(state => state.members.userAuthToken)
            const json = yield call(
                shops,
                authtoken,
                object,
            )
            const eventObject = new EventObject(json)
            if (eventObject.success == true) {
                yield put(createAction('setSelectedShop')(eventObject.result))
            }
            typeof callback === 'function' && callback(eventObject)
            } catch (err) { }
        },
        *loadMakeOrder({ payload }, { call, put, select }) 
        {
        try{
            const { object, callback } = payload

            const authtoken = yield select(state => state.members.userAuthToken)

            const json = yield call(
                makeOrder,
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
        *loadMissions({ payload }, { call, put, select }) 
        {
        try{

            const { object, callback } = payload
            const authtoken = yield select(state => state.members.userAuthToken)
            const json = yield call(
                missions,
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
