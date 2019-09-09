import BaseRequestObject from "./base_request_object";

class PushRequestObject extends BaseRequestObject{

    constructor(device_key, device_type, push_identifier, os){
        super();
        this.device_key = device_key
        this.device_type = device_type
        this.push_identifier = push_identifier
        this.os = os
    }
  
    getUrlString() {
       return `members/${this.url_id}/store_push_token`
   }


}
export default PushRequestObject