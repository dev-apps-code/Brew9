import BaseRequestObject from "./base_request_object";

class PointProductsItemRequestObject extends BaseRequestObject{

    getUrlString() {
        return `/points_products/${this.url_id}`
    }
}
export default PointProductsItemRequestObject

/* ---- SERVICES -----

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function :id(authtoken,object) {
   return getMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL -----

*load:id({ payload }, { call, put, select })
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            :id,
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

load:id(){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
            })        }
    }
    const obj = new PointProductsItemRequestObject()
    obj.setUrlId(:id) #TODO
    dispatch(
        createAction('point_products/load:id')({
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

