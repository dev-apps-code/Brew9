import {
    getOrders
  } from '../Services/orders'
  import EventObject from './event_object'
  
  export default {
  
    namespace: 'orders',
  
    state: {
        cart: [],
        promotion:[],
        promotion_ids:[],
        cart_total: 0,
        cart_total_quantity: 0,
        products: [],
        promotion_trigger_count:0,
        discount_cart_total:0,
        toggle_update_count:0,
        promotions:[],
        promotion_ids:[],
    },

    reducers: {
        setDefaultState(state, { payload }) {
            return {
                ...state,
            }
        },
        reset_cart(state, { payload }) {
            return {
                ...state,cart:[],promotion:[],promotion_ids:[],cart_total_quantity:0,cart_total:0,remaining:0,
            }
        },
        update_cart(state, { payload }) {

            const {cart} = payload
            return {
                ...state,cart,toggle_update_count:state.toggle_update_count+1
            }
        },
        update_discount_cart_total(state, { payload }) {

            const {discount_cart_total} = payload
            return {
                ...state,cart,discount_cart_total
            }
        },
        update_cart_value(state, { payload }) {
            const {cart_total_quantity,cart_total,discount_cart_total} = payload
            var promotion_trigger_count = state.promotion_trigger_count
            promotion_trigger_count = promotion_trigger_count + 1
            return {
                ...state,cart_total_quantity,cart_total,discount_cart_total,promotion_trigger_count
            }
        },
    },
    effects: {
        *loadGetOrders({ payload }, { call, put, select }) 
        {
            try{
    
            const { object, callback } = payload
            const authtoken = yield select(state => state.member.userAuthToken)
            const json = yield call(
                getOrders,
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