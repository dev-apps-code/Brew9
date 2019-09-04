import BaseRequestObject from "./base_request_object";

class PushRequestObject extends BaseRequestObject{

    constructor(device_key, device_type, push_identifier, os){
        this.device_key = device_key
        this.device_type = device_type
        this.push_identifier = push_identifier
        this.os = os
    }

    setUrlId(url_id){
        this.url_id = url_id
    }
    
    getUrlString() {
       return `members/${this.url_id}/store_push_token`
   }
}
export default PushRequestObject