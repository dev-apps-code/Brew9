import BaseRequestObject from "./base_request_object";

class PointsProductsRequestObject extends BaseRequestObject{

    getUrlString() {
        return `companies/${this.url_id}/points_products`
    }
}
export default PointsProductsRequestObject

/* ---- SERVICES -----

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function pointsProducts(authtoken,object) {
   return getMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL -----

*loadPointsProducts({ payload }, { call, put, select })
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            pointsProducts,
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
         loading = true,
     }
}


 -------------- */

/* ---- Method -----

loadPointsProducts(){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
        }
    }
    const obj = new PointsProductsRequestObject()
    obj.setUrlId(:id) #TODO
    dispatch(
        createAction('companies/loadPointsProducts')({
            object:obj,
            callback,
        })
    }
}


 -------------- */

/* ---- JSON API RESPONSE -----

{
    "success": true,
    "code": 200,
    "message": "",
    "result": [
        {
            "id": 1,
            "name": "Free Membership",
            "clazz": "membership_plan",
            "points_products": [
                {
                    "id": 4,
                    "name": "sad",
                    "points": 100,
                    "membership_plan_id": 1,
                    "product_type": "Physical",
                    "expired_in_type": "day",
                    "expired_in": 23,
                    "can_use_time": "whole day",
                    "image": {
                        "url": null
                    },
                    "clazz": "points_product"
                },
                {
                    "id": 2,
                    "name": "xdsad free vouchersdas",
                    "points": 500,
                    "membership_plan_id": 1,
                    "product_type": null,
                    "expired_in_type": null,
                    "expired_in": null,
                    "can_use_time": null,
                    "image": {
                        "url": null
                    },
                    "clazz": "points_product"
                },
                {
                    "id": 1,
                    "name": "xdsad free voucher",
                    "points": 1000,
                    "membership_plan_id": 1,
                    "product_type": null,
                    "expired_in_type": null,
                    "expired_in": null,
                    "can_use_time": null,
                    "image": {
                        "url": null
                    },
                    "clazz": "points_product"
                }
            ]
        },
        {
            "id": 2,
            "name": "Premium Membership",
            "clazz": "membership_plan",
            "points_products": [
                {
                    "id": 3,
                    "name": "xdsad free vouchersddddas",
                    "points": 300,
                    "membership_plan_id": 2,
                    "product_type": null,
                    "expired_in_type": null,
                    "expired_in": null,
                    "can_use_time": null,
                    "image": {
                        "url": null
                    },
                    "clazz": "points_product"
                }
            ]
        }
    ]
}

 -------------- */

