import BaseRequestObject from "./base_request_object";

class UpdatePhoneNumberRequestObject extends BaseRequestObject{

    constructor(phone_no, country_code){
        super();
        this.phone_no = phone_no
        this.country_code = country_code
    }

   getUrlString() {
       return `members/${this.url_id}/update_phone_number`
   }
}
export default UpdatePhoneNumberRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function updatePhoneNumber(authtoken,object) {
   return postMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*loadUpdatePhoneNumber({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            updatePhoneNumber,
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

loadUpdatePhoneNumber(){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
            })        }
    }
    const obj = new UpdatePhoneNumberRequestObject(phone_no, country_code)
    obj.setUrlId(:id) #TODO
    dispatch(
        createAction('members/loadUpdatePhoneNumber')({
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
        "clazz": "sms_request",
        "code": "2360"
    }
}

 -------------- */

