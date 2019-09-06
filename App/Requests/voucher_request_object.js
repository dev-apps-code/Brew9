import BaseRequestObject from "./base_request_object";

class VoucherRequestObject extends BaseRequestObject{

    constructor(){
        super();
    }

    setUrlId(url_id){
        this.url_id = url_id
    }

    setPage(page) {
        this.page_no = page
    }

    setStatus(status) {
        this.status = status
    }

    getUrlString() {
        return `members/${this.url_id}/vouchers`
    }

}
export default VoucherRequestObject