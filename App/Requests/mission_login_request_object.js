import BaseRequestObject from "./base_request_object";

class MissionLoginRequestObject extends BaseRequestObject{

    constructor(){
        super();
    }

   getUrlString() {
       return `members/${this.url_id}/login_mission`
   }
}
export default MissionLoginRequestObject
