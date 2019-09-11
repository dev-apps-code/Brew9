import BaseRequestObject from "./base_request_object";

class PointStatementRequestObject extends BaseRequestObject{

    constructor(){
        super();
    }

    getUrlString() {
        return `members/${this.url_id}/point_history`
    }
}
export default PointStatementRequestObject