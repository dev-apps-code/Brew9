import BaseRequestObject from "./base_request_object";

class ScanStatusRequestObject extends BaseRequestObject{

    constructor(qr_code){
        super();
        this.qr_code = qr_code
    }

    getUrlString() {
        return `members/${this.url_id}/scan_status`
    }
}
export default ScanStatusRequestObject

/* ---- SERVICES -----

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function qrCodeScan(authtoken,object) {
   return postMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL -----

*loadQrCodeScan({ payload }, { call, put, select })
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            qrCodeScan,
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
        loading_list = true,
        products_initial: true,
        products_data: [],
        products_page: 1,
     }
}


 -------------- */

/* ---- Method -----

loadQrCodeScan(){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading_list: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
           
            })        }
    }
    const obj = new QrCodeRequesObject()
    obj.setUrlId(:id) 
    dispatch(
        createAction('members/loadQrCodeScan')({
            object:obj,
            callback,
        })
    )
}


 -------------- */

/* ---- Load More -----

onEndReached={this.loadMore.bind(this)}

loadMore(){
    const { loading_list , products_data , products_total , products_page} = this.state
    if (!loading_list){
        if (products_total > products_data.length) {
            this.loadQrCode(products_page)
        }
    }
}

 -------------- */



/* ---- JSON API RESPONSE -----

{
    "success": true,
    "code": 200,
    "message": "",
    "total": 100,
    "result": [
        {
            "id": 2,
            "name": "Hot Chocolate",
            "clazz": "product_category",
            "products": [
                {
                    "id": 1,
                    "name": "Double Chocolate",
                    "price": "5.6",
                    "image": null,
                    "clazz": "product"
                }
            ]
        }
    ]
}

 -------------- */

