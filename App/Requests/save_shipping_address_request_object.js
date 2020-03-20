import BaseRequestObject from "./base_request_object";

class SaveShippingAddressObjectRequest extends BaseRequestObject {

    constructor(
        data
    ) {
        super();
        this.data = data
    }

    getUrlString() {
        return `members/${this.url_id}/save_member_addresses`
    }

    getFormData() {
        console.log(this.data)
        const data = new FormData()

        data.append('member_id', this.url_id)

        if (this.data.name != null) {
            data.append('fullname', this.data.name)
        }

        if (this.contact_number != null) {
            data.append('contact_number', this.contact_number)
        }
        if (this.data.street1 != null) {
            data.append('address', this.data.street1)
        }
        // if (this.data.street2 != null) {
        //     data.append('street2', this.data.street2)
        // }
        if (this.data.city != null) {
            data.append('city', this.data.city)
        }
        // if (this.data.unit_no != null) {
        //     data.append('unit_no', this.data.unit_no)
        // }
        if (this.data.state != null) {
            data.append('state', this.data.state)
        }
        if (this.data.postal_code != null) {
            data.append('postal_code', this.data.postal_code)
        }
        if (this.data.country != null) {
            data.append('country', this.data.country)
        }
        if (this.data.land_mark != null) {
            data.append('land_mark', this.data.land_mark)
        }
        if (this.data.latitude != null) {
            data.append('latitude', this.data.latitude)
        }
        if (this.data.longitude != null) {
            data.append('longitude', this.data.longitude)
        }
        if (this.data.delivery_area != null) {
            data.append('delivery_area', this.data.delivery_area)
        }

        return data
    }
}
export default SaveShippingAddressObjectRequest

