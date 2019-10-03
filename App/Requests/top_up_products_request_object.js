import BaseRequestObject from "./base_request_object";

class TopUpProductsRequestObject extends BaseRequestObject{

   getUrlString() {
       return `companies/${this.url_id}/top_up_products`
   }
}
export default TopUpProductsRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function topUpProducts(authtoken,object) {
   return getMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*loadTopUpProducts({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            topUpProducts,
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

loadTopUpProducts(){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
        }
    }
    const obj = new TopUpProductsRequestObject()
    obj.setUrlId(:id) #TODO
    dispatch(
        createAction('companies/loadTopUpProducts')({
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
  "result": {}
}

 -------------- */

