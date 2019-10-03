import BaseRequestObject from "./base_request_object";

class QrCodeRequestObject extends BaseRequestObject{

    getUrlString() {
        return `members/${this.url_id}/qr_code`
    }
}
export default QrCodeRequestObject

/* ---- SERVICES -----

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function qrCode(authtoken,object) {
   return getMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL -----

*loadQrCode({ payload }, { call, put, select })
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            qrCode,
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

loadQrCode(page){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading_list: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            products_initial: false,
            products_data: this.state.products_data.concat(eventObject.result) }),
            products_total: eventObject.total,
            products_page: this.state.products_page + 1
            loading_list: false,
            })        }
    }
    const obj = new QrCodeRequesObject()
    obj.setUrlId(:id) #TODO
    obj.setPage(page_no)
    dispatch(
        createAction('members/loadQrCode')({
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

