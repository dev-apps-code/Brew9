import BaseRequestObject from "./base_request_object";

class GetCurrentOrderRequestObject extends BaseRequestObject{

   getUrlString() {
       return `members/${this.url_id}/current_order`
   }
}
export default GetCurrentOrderRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function currentOrder(authtoken,object) {
   return getMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*loadCurrentOrder({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            currentOrder,
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

loadCurrentOrder(){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
            })        }
    }
    const obj = new GetCurrentOrderRequestObject()
    obj.setUrlId(:id) #TODO
    dispatch(
        createAction('members/loadCurrentOrder')({
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
            "id": 9,
            "queue_no": 2663,
            "receipt_no": null,
            "total": "5.6",
            "paid": true,
            "payment_method": null,
            "payment_time": "2019-10-11 08:18:09 +0800",
            "clazz": "order",
            "shop": {
                "name": "Brew9"
            },
            "status": "Completed",
            "order_items": [
                {
                    "product_name": "Double Chocolate",
                    "product_id": 1,
                    "original_price": "5.6",
                    "final_price": "5.6",
                    "quantity": 1,
                    "total_price": "5.6",
                    "variations": null,
                    "remarks": null,
                    "thumb": "http://localhost:3000/uploads/product/image/1/Screen_Shot_2019-10-02_at_4.37.26_PM.png"
                }
            ]
        }
    ]
}

 -------------- */

