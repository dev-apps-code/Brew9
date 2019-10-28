import BaseRequestObject from "./base_request_object";

class TopUpOrderRequestObject extends BaseRequestObject{

    constructor(shop_id){
        super();
        this.shop_id = shop_id
    }

   getUrlString() {
       return `top_up_products/${this.url_id}/make_order`
   }
}
export default TopUpOrderRequestObject 

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
        const authtoken = yield select(state => state.members.userAuthToken)
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
    const obj = new TopUpOrderRequestObject(shop_id)
    obj.setUrlId(:id) #TODO
    dispatch(
        createAction('top_ups/loadMakeOrder')({
            object:obj,
            callback,
        })
    )
}


 -------------- */

/* ---- JSON API RESPONSE ----- 



 -------------- */

