import BaseRequestObject from "./base_request_object";

class DeliveryFeeRequestObject extends BaseRequestObject {

    constructor(total,address_id) {
        super();
        this.total = total
        this.address_id = address_id


    }

    getUrlString() {
        return `shops/${this.url_id}/get_delivery_fee`
    }

    getFormData() {
        var string = "total=" + this.total + '&address_id' + this.address_id;
        console.log("\n\nID:")
        console.log(this.address_id)

        return string
    }
}
export default DeliveryFeeRequestObject