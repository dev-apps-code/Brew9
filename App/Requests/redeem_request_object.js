import BaseRequestObject from "./base_request_object";

class RedeemRequestObject extends BaseRequestObject{

    constructor(shop_id){
        super();
        this.shop_id = shop_id
    }


   getUrlString() {
       return `points_products/${this.url_id}/redeem`
   }

}
export default RedeemRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function redeem(authtoken,object) {
   return postMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*loadRedeem({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            redeem,
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

loadRedeem(){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
            })        }
    }
    const obj = new RedeemRequestObject()
    obj.setUrlId(:id) #TODO
    dispatch(
        createAction('point_products/loadRedeem')({
            object:obj,
            callback,
        })
    )
}


 -------------- */

/* ---- JSON API RESPONSE ----- 

{
    "success": true,
    "code": 200,
    "message": "",
    "result": [
        {
            "id": 3,
            "name": "xdsad free vouchersddddas",
            "points": 300,
            "product_type": null,
            "expired_in_type": null,
            "expired_in": null,
            "can_use_time": null,
            "clazz": "points_product",
            "image": null,
            "can_purchase": true
        }
    ]
}

 -------------- */

