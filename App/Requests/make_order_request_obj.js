import BaseRequestObject from "./base_request_object";

class MakeOrderRequestObj extends BaseRequestObject {

    constructor(order_items, voucher_item_ids, payment_method, promotion_ids, claim_status, claim_time, order_id, latitude, longitude, delivery, address_id) {
        super();
        this.order_items = order_items
        this.voucher_item_ids = voucher_item_ids
        this.payment_method = payment_method
        this.promotion_ids = promotion_ids
        this.claim_status = claim_status
        this.claim_time = claim_time
        this.order_id = order_id
        this.latitude = latitude
        this.longitude = longitude
        this.delivery = delivery
        this.address_id = address_id
    }

    getUrlString() {
        return `shops/${this.url_id}/make_order`
    }

    getFormData() {
        var string = JSON.stringify({ 'payment_method': this.payment_method, 'order_items': this.order_items, 'voucher_item_ids': this.voucher_item_ids, 'promotion_ids': this.promotion_ids, 'claim_status': this.claim_status, 'claim_time': this.claim_time, 'order_id': this.order_id, "latitude": this.latitude, "longitude": this.longitude, "deliver": this.delivery, "address_id": this.address_id });

        return string
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