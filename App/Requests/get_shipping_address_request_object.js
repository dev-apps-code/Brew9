import BaseRequestObject from "./base_request_object";

class GetShippingAddressRequestObject extends BaseRequestObject {

    constructor() {
        super();
    }

    getUrlString() {
        return `members/${this.url_id}/get_member_addresses`
    }
}
export default GetShippingAddressRequestObject


