import BaseRequestObject from "./base_request_object";

class ValidVouchersRequestObject extends BaseRequestObject{

   getUrlString() {
       return `members/${this.url_id}/valid_vouchers`
   }
}
export default ValidVouchersRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function validVouchers(authtoken,object) {
   return getMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*loadValidVouchers({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            validVouchers,
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

loadValidVouchers(){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
            })        }
    }
    const obj = new ValidVouchersRequestObject()
    obj.setUrlId(:id) #TODO
    dispatch(
        createAction('members/loadValidVouchers')({
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
    "message": 0,
    "result": [
        {
            "id": 8,
            "used": false,
            "used_date": null,
            "expiry_date": "2019-10-16 00:00:00 +0800",
            "clazz": "voucher_item",
            "voucher": {
                "name": "Free Delivery",
                "description": null,
                "display_value": null,
                "discount_price": "5.0",
                "free_quantity": null,
                "discount_type": null,
                "clazz": "voucher"
            },
            "expired": false,
            "available_date": "2019.10.11-2019.10.16"
        }
    ]
}

 -------------- */

