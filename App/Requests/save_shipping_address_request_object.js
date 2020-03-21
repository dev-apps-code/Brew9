import BaseRequestObject from "./base_request_object";

class SaveShippingAddressObjectRequest extends BaseRequestObject {

    constructor(
        data,
        member_id
    ) {
        super();
        this.first_name = data.name,
            this.last_name = data.name,
            this.street1 = data.street1,
            this.member_id = member_id,
            this.contact_number = data.contactNo,
            this.city = data.city,
            this.primary = data.default,
            this.delivery_area = data.delivery_area
            this.country = data.country,
            this.latitude = data.latitude,
            this.longitude = data.longitude,
            this.postal_code = data.postal_code,
            this.state = data.state,
            this.street2 = data.street2,
            this.unit_no = data.unit_no
    }

    getUrlString() {
        return `members/${this.url_id}/save_member_addresses`
    }


}
export default SaveShippingAddressObjectRequest

