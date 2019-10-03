import BaseRequestObject from "./base_request_object";

class NearestShopRequestObject extends BaseRequestObject{

    constructor(latitude, longitude){
        super();
        this.latitude = latitude
        this.longitude = longitude
    }

   getUrlString() {
       return `companies/${this.url_id}/shops`
   }
}
export default NearestShopRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function shops(authtoken,object) {
   return getMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*loadShops({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            shops,
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

loadShops(){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            loading: false,
        }
    }
    const obj = new NearestShopRequestObject(latitude, longitude)
    obj.setUrlId(:id) #TODO
    dispatch(
        createAction('companies/loadShops')({
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
    "result": {
        "shop": {
            "id": 1,
            "name": "Brew9",
            "address": "1 Chome-1-83 Shimorenjaku, Mitaka, Tokyo 181-0013, Japan",
            "clazz": "shop",
            "opening_hour": {
                "start_time": "09:00",
                "end_time": "21:00"
            },
            "menu_banners": [
                {
                    "id": 1,
                    "description": "asdsad",
                    "clazz": "menu_banner",
                    "image": "http://localhost:3000/uploads/menu_banner/image/1/AdobeStock_133492319-1300x502.jpeg"
                }
            ],
            "is_off_day": false,
            "is_opened": false
        }
    }
}

 -------------- */

