import BaseRequestObject from "./base_request_object";

class DeliveryFeeRequestObject extends BaseRequestObject {

    constructor(total) {
        super();
        this.total = total


    }

    getUrlString() {
        return `shops/${this.url_id}/get_delivery_fee`
    }

    getFormData() {
        var string = "total=" + this.total;

        return string
    }
}
export default DeliveryFeeRequestObject