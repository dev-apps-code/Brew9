import BaseRequestObject from "./base_request_object";

class MembershipRequestObject extends BaseRequestObject{

    constructor(){
        super();
    }

    getUrlString() {
        return `companies/${this.url_id}/membership_plans`
    }
}
export default MembershipRequestObject