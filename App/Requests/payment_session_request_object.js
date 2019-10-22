import BaseRequestObject from "./base_request_object";

class PaymentSessionRequestObject extends BaseRequestObject{

   getUrlString() {
       return `payments/get_session`
   }
}
export default PaymentSessionRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function getSession(authtoken,object) {
   return getMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*loadGetSession({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            getSession,
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

loadGetSession(){
    const { dispatch } = this.props
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
            })        }
    }
    const obj = new PaymentSessionRequestObject()
    dispatch(
        createAction('payments/loadGetSession')({
            object:obj,
            callback,
        })
    )
}


 -------------- */

/* ---- JSON API RESPONSE ----- 

{
    "merchant": "950029645",
    "result": "SUCCESS",
    "session": {
        "id": "SESSION0002817005484H7281231J30",
        "updateStatus": "NO_UPDATE",
        "version": "fa12b4b301"
    }
}

 -------------- */

