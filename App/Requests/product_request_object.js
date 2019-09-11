import BaseRequestObject from "./base_request_object";

class ProductRequestObject extends BaseRequestObject{

    constructor(){
        super();
    }

    getUrlString() {
        return `shops/${this.url_id}/products/`
    }
}
export default ProductRequestObject