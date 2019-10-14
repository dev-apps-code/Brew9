import BaseRequestObject from "./base_request_object";

class GetOrderRequestObject extends BaseRequestObject{

   getUrlString() {
       return `order/${this.url_id}`
   }
}
export default GetOrderRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function :memberId(authtoken,object) {
   return getMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*load:memberId({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.member.userAuthToken)
        const json = yield call(
            :memberId,
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

load:memberId(){
    const { dispatch } = this.props
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
            })        }
    }
    const obj = new GetOrderRequestObject()
    dispatch(
        createAction('orders/load:memberId')({
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
    "result": {
        "name": "tony voon",
        "nickname": null,
        "email": "vsching85@gmail.com",
        "phone_no": "7651914",
        "dob": null,
        "gender": null,
        "country_code": "016",
        "clazz": "member",
        "auth_token": "$2a$11$W1p1cVKNQbT9DPQItBGWQu",
        "points": 0,
        "credits": "0.0",
        "image": null,
        "free_membership": {
            "membership_points": 0,
            "experience_points": 0,
            "expiry_date": null,
            "membership_plan": {
                "id": 3,
                "name": "Free Membership",
                "benefits": "Membership will reward monthly vouchers",
                "price": "36.0",
                "membership_plan_type": "free",
                "plan_image": {
                    "url": null,
                    "thumb": {
                        "url": null
                    }
                },
                "clazz": "membership_plan",
                "membership_level": {}
            }
        },
        "premium_membership": {
            "membership_points": 0,
            "experience_points": 0,
            "expiry_date": null,
            "membership_plan": {
                "id": 4,
                "name": "Premium Membership",
                "benefits": "Membership will reward monthly vouchers",
                "price": "36.0",
                "membership_plan_type": "paid",
                "plan_image": {
                    "url": null,
                    "thumb": {
                        "url": null
                    }
                },
                "clazz": "membership_plan",
                "membership_level": {}
            }
        }
    }
}

 -------------- */

