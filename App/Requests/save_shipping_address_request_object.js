import BaseRequestObject from "./base_request_object";

class SaveShippingAddressObjectRequest extends BaseRequestObject {

    constructor(
        first_name,
        last_name,
        contact_number,
        unit_no,
        street1,
        street2,
        city,
        state,
        postal_code,
        country,
        land_mark,
        latitude,
        longitude,
        delivery_area
    ) {
        super();
        this.first_name = first_name
        this.last_name = last_name
        this.contact_number = contact_number
        this.street1 = street1
        this.street2 = street2
        this.city = city
        this.unit_no = unit_no
        this.state = state
        this.postal_code = postal_code
        this.country = country
        this.land_mark = land_mark
        this.latitude = latitude
        this.longitude = longitude
        this.delivery_area = delivery_area
    }

    getUrlString() {
        return `members/${this.url_id}/update_profile`
    }

    getFormData() {

        const data = new FormData()
        if (this.first_name != null) {
            data.append('first_name', this.first_name)
        }
        if (this.last_name != null) {
            data.append('last_name', this.last_name)
        }

        if (this.contact_number != null) {
            data.append('contact_number', this.contact_number)
        }
        if (this.street1 != null) {
            data.append('street1', this.street1)
        }
        if (this.street2 != null) {
            data.append('street2', this.street2)
        }
        if (this.city != null) {
            data.append('city', this.city)
        }
        if (this.unit_no != null) {
            data.append('unit_no', this.unit_no)
        }
        if (this.state != null) {
            data.append('state', this.state)
        }
        if (this.postal_code != null) {
            data.append('postal_code', this.postal_code)
        }
        if (this.country != null) {
            data.append('country', this.country)
        }
        if (this.land_mark != null) {
            data.append('land_mark', this.land_mark)
        }
        if (this.latitude != null) {
            data.append('latitude', this.latitude)
        }
        if (this.longitude != null) {
            data.append('longitude', this.longitude)
        }
        if (this.delivery_area != null) {
            data.append('delivery_area', this.delivery_area)
        }

        return data
    }
}
export default SaveShippingAddressObjectRequest

