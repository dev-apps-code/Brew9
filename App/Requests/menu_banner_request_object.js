import BaseRequestObject from "./base_request_object";

class MenuBannerRequestObject extends BaseRequestObject{

   getUrlString() {
       return `shops/${this.url_id}`
   }
}
export default MenuBannerRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function :id(authtoken,object) {
   return getMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*load:id({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.members.userAuthToken)
        const json = yield call(
            :id,
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
     }
}


 -------------- */

/* ---- Method ----- 

load:id(page){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading_list: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({

            })        }
    }
    const obj = new MenuBannerRequestObject()
    obj.setUrlId(:id) #TODO
    obj.setPage(page_no)
    dispatch(
        createAction('shops/load:id')({
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
            this.load:id(products_page)
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

