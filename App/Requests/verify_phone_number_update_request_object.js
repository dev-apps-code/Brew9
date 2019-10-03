import BaseRequestObject from "./base_request_object";

class VerifyPhoneNumberUpdateRequestObject extends BaseRequestObject{

    constructor(code, phone_no, country_code){
        super();
        this.code = code
        this.phone_no = phone_no
        this.country_code = country_code
    }

   getUrlString() {
       return `members/${this.url_id}/verify_phone_number_update`
   }
}
export default VerifyPhoneNumberUpdateRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function verifyPhoneNumberUpdate(authtoken,object) {
   return postMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*loadVerifyPhoneNumberUpdate({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            verifyPhoneNumberUpdate,
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

loadVerifyPhoneNumberUpdate(){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
            })        }
    }
    const obj = new VerifyPhoneNumberUpdateRequestObject(code, phone_no, country_code)
    obj.setUrlId(:id) #TODO
    dispatch(
        createAction('members/loadVerifyPhoneNumberUpdate')({
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
        "email": "vsching85@gmail.com",
        "clazz": "member",
        "phone_no": "7651914",
        "dob": null,
        "gender": null,
        "country_code": "016",
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
                "clazz": "membership_plan"
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
                "clazz": "membership_plan"
            }
        }
    }
}

 -------------- */

