import BaseRequestObject from "./base_request_object";

class MakeOrderRequestObj extends BaseRequestObject{

    constructor(order_items, voucher_item_ids){
        super();
        this.order_items = order_items
        this.voucher_item_ids = voucher_item_ids
    }

   getUrlString() {
       return `shops/${this.url_id}/make_order`
   }
}
export default MakeOrderRequestObj

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function makeOrder(authtoken,object) {
   return getMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*loadMakeOrder({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.member.userAuthToken)
        const json = yield call(
            makeOrder,
            authtoken,
            object,
        )
        const eventObject = new EventObject(json)
        if (eventObject.success == true) {}
        typeof callback === 'function' && callback(eventObject)
        } catch (err) { }
    }, 



 -------------- */





/* **** ---- VIEW FUNCTIONS START HERE ----- **** 

/* ---- Constructor ----- 

constructor(props) {
    super(props)
     this.state = {
         loading: true,
     }
}


 -------------- */

/* ---- Method ----- 

loadMakeOrder(){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
            })        }
    }
    const obj = new MakeOrderRequestObj(order_items, voucher_item_ids)
    obj.setUrlId(:id) #TODO
    dispatch(
        createAction('shops/loadMakeOrder')({
            object:obj,
            callback,
        })
    )
}


 -------------- */