import BaseRequestObject from "./base_request_object";

class ShopAreaRequestObject extends BaseRequestObject {

    constructor(shop_id) {
        super();
        this.shop_id = shop_id

    }

    getUrlString() {
        return `shops/${this.shop_id}/get_areas`
    }
}
export default ShopAreaRequestObject


