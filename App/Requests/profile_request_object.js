import BaseRequestObject from "./base_request_object";

class ProfileRequestObject extends BaseRequestObject{

   getUrlString() {
       return `members/${this.url_id}/profile`
   }
}
export default ProfileRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function profile(authtoken,object) {
   return getMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*loadProfile({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            profile,
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

loadProfile(){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
            })        }
    }
    const obj = new ProfileRequestObject()
    obj.setUrlId(:id) #TODO
    dispatch(
        createAction('members/loadProfile')({
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
        "phone_no": null,
        "dob": null,
        "gender": null,
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
        },
        "points": 0,
        "credits": "0.0",
        "image": null
    }
}

 -------------- */

