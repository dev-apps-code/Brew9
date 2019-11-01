import BaseRequestObject from "./base_request_object";

class CreditStatementRequestObject extends BaseRequestObject{

    constructor(){
        super();
    }

    getUrlString() {
        return `members/${this.url_id}/credit_history`
    }
}
export default CreditStatementRequestObject