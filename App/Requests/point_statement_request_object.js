import BaseRequestObject from "./base_request_object";

class PointStatementRequestObject extends BaseRequestObject{

    constructor(){
        super();
    }

    setUrlId(url_id){
        console.log("URKID")
        this.url_id = url_id
    }

    setPage(page) {
        this.page_no = page
    }

    getUrlString() {
        return `members/${this.url_id}/pointHistory`
    }





}
export default PointStatementRequestObject