import BaseRequestObject from "./base_request_object";

class ActivateAccountRequestObject extends BaseRequestObject{

    constructor(phone_no, country_code, referral_code, code){
        super();
        this.phone_no = phone_no
        this.country_code = country_code
        this.referral_code = referral_code
        this.code = code
    }

   getUrlString() {
       return `member/activate_account`
   }
}
export default ActivateAccountRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function activateAccount(authtoken,object) {
   return postMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*loadActivateAccount({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            activateAccount,
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

loadActivateAccount(){
    const { dispatch } = this.props
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
            })        }
    }
    const obj = new ActivateAccountRequestObject(phone_no, country_code, referral_code, code)
    dispatch(
        createAction('members/loadActivateAccount')({
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

