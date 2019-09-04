import BaseRequestObject from "./base_request_object";

class PointStatementRequestObject extends BaseRequestObject{

    constructor(){
        super();
    }

    getUrlString() {
        return `members/${this.url_id}/pointHistory`
    }
}
export default PointStatementRequestObject