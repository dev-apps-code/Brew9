import BaseRequestObject from "./base_request_object";

class ShopAreaRequestObject extends BaseRequestObject {

    constructor() {
        super();

    }

    getUrlString() {
        return `shops/${this.url_id}/get_areas`
    }
}
export default ShopAreaRequestObject


