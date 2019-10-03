import BaseRequestObject from "./base_request_object";

class UpdateProfileRequestObject extends BaseRequestObject{

    constructor(dob, nickname, image, gender){
        super();
        this.dob = dob
        this.nickname = nickname
        this.image = image
        this.gender = gender
    }

   getUrlString() {
       return `members/${this.url_id}/update_profile`
   }
}
export default UpdateProfileRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function updateProfile(authtoken,object) {
   return multipartMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*loadUpdateProfile({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            updateProfile,
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

loadUpdateProfile(){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
            })        }
    }
    const obj = new UpdateProfileRequestObject(dob, nickname, image, gender)
    obj.setUrlId(:id) #TODO
    dispatch(
        createAction('members/loadUpdateProfile')({
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

