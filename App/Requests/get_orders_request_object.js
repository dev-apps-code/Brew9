import BaseRequestObject from "./base_request_object";

class GetOrdersRequestObject extends BaseRequestObject{

    constructor(page_no){
        super();
        this.page_no = page_no
    }

   getUrlString() {
       return `members/${this.url_id}/orders`
   }
}
export default GetOrdersRequestObject

/* ---- SERVICES ----- 

import { getMethod,postMethod,postMultipartMethod } from '../Utils/webservice_helper'

export function orders(authtoken,object) {
   return getMethod(authtoken,object)
}



 -------------- */



/* ---- MODEL ----- 

*loadOrders({ payload }, { call, put, select }) 
    {
    try{

        const { object, callback } = payload
        const authtoken = yield select(state => state.member.userAuthToken)
        const json = yield call(
            orders,
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
        orders_initial: true,
        orders_data: [],
        orders_page: 1,
     }
}


 -------------- */

/* ---- Method ----- 

loadOrders(page){
    const { dispatch } = this.props
#TODO URLID
    this.setState({ loading_list: true })
    const callback = eventObject => {
        if (eventObject.success) {
            this.setState({
            orders_initial: false,
            orders_data: this.state.orders_data.concat(eventObject.result) }),
            orders_total: eventObject.total,
            orders_page: this.state.orders_page + 1
            loading_list: false,
            })        }
    }
    const obj = new GetOrdersRequestObject(page_no)
    obj.setUrlId(:id) #TODO
    obj.setPage(page_no)
    dispatch(
        createAction('members/loadOrders')({
            object:obj,
            callback,
        })
    )
}


 -------------- */

/* ---- Load More ----- 

onEndReached={this.loadMore.bind(this)}

loadMore(){
    const { loading_list , orders_data , orders_total , orders_page} = this.state
    if (!loading_list){
        if (orders_total > orders_data.length) {
            this.loadOrders(orders_page)
        }
    }
}

 -------------- */



/* ---- JSON API RESPONSE ----- 

{
    "success": true,
    "code": 200,
    "message": 8,
    "total": 0,
    "result": [
        {
            "queue_no": 1935,
            "receipt_no": null,
            "total": "5.6",
            "paid": false,
            "payment_method": null,
            "payment_time": "2019-10-10 19:45:01 +0800",
            "clazz": "order",
            "order_items": [
                {
                    "product_name": "Double Chocolate",
                    "product_id": 1,
                    "original_price": "5.6",
                    "final_price": "5.6",
                    "quantity": 1,
                    "total_price": "5.6",
                    "variations": null,
                    "remarks": null
                }
            ]
        },
        {
            "queue_no": 1757,
            "receipt_no": null,
            "total": "5.6",
            "paid": false,
            "payment_method": null,
            "payment_time": "2019-10-10 18:12:59 +0800",
            "clazz": "order",
            "order_items": [
                {
                    "product_name": "Double Chocolate",
                    "product_id": 1,
                    "original_price": "5.6",
                    "final_price": "5.6",
                    "quantity": 1,
                    "total_price": "5.6",
                    "variations": null,
                    "remarks": null
                }
            ]
        },
        {
            "queue_no": 2636,
            "receipt_no": null,
            "total": "5.6",
            "paid": false,
            "payment_method": null,
            "payment_time": "2019-10-10 18:06:04 +0800",
            "clazz": "order",
            "order_items": [
                {
                    "product_name": "Double Chocolate",
                    "product_id": 1,
                    "original_price": "5.6",
                    "final_price": "5.6",
                    "quantity": 1,
                    "total_price": "5.6",
                    "variations": null,
                    "remarks": null
                }
            ]
        },
        {
            "queue_no": 2626,
            "receipt_no": null,
            "total": "5.6",
            "paid": false,
            "payment_method": null,
            "payment_time": "2019-10-10 18:05:12 +0800",
            "clazz": "order",
            "order_items": [
                {
                    "product_name": "Double Chocolate",
                    "product_id": 1,
                    "original_price": "5.6",
                    "final_price": "5.6",
                    "quantity": 1,
                    "total_price": "5.6",
                    "variations": null,
                    "remarks": null
                }
            ]
        },
        {
            "queue_no": 1249,
            "receipt_no": null,
            "total": "5.6",
            "paid": false,
            "payment_method": null,
            "payment_time": "2019-10-10 18:04:01 +0800",
            "clazz": "order",
            "order_items": [
                {
                    "product_name": "Double Chocolate",
                    "product_id": 1,
                    "original_price": "5.6",
                    "final_price": "5.6",
                    "quantity": 1,
                    "total_price": "5.6",
                    "variations": null,
                    "remarks": null
                }
            ]
        },
        {
            "queue_no": 858,
            "receipt_no": null,
            "total": "5.6",
            "paid": false,
            "payment_method": null,
            "payment_time": "2019-10-10 17:58:13 +0800",
            "clazz": "order",
            "order_items": [
                {
                    "product_name": "Double Chocolate",
                    "product_id": 1,
                    "original_price": "5.6",
                    "final_price": "5.6",
                    "quantity": 1,
                    "total_price": "5.6",
                    "variations": null,
                    "remarks": null
                }
            ]
        },
        {
            "queue_no": 7294,
            "receipt_no": null,
            "total": "5.6",
            "paid": false,
            "payment_method": null,
            "payment_time": "2019-10-10 17:57:40 +0800",
            "clazz": "order",
            "order_items": [
                {
                    "product_name": "Double Chocolate",
                    "product_id": 1,
                    "original_price": "5.6",
                    "final_price": "5.6",
                    "quantity": 1,
                    "total_price": "5.6",
                    "variations": null,
                    "remarks": null
                }
            ]
        },
        {
            "queue_no": 6652,
            "receipt_no": null,
            "total": "5.6",
            "paid": false,
            "payment_method": null,
            "payment_time": "2019-10-10 17:57:00 +0800",
            "clazz": "order",
            "order_items": [
                {
                    "product_name": "Double Chocolate",
                    "product_id": 1,
                    "original_price": "5.6",
                    "final_price": "5.6",
                    "quantity": 1,
                    "total_price": "5.6",
                    "variations": null,
                    "remarks": null
                }
            ]
        }
    ]
}

 -------------- */

