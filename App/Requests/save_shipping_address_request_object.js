import BaseRequestObject from './base_request_object';

class SaveShippingAddressObjectRequest extends BaseRequestObject {
  constructor(data, member_id) {
    super();
    this.member_id = member_id;
    this.fullname = data.fullname;
    this.address = data.address;
    this.contact_number = data.contact_number;
    this.city = data.city;
    this.state = data.state;
    this.postal_code = data.postal_code;
    this.country = data.country;
    // FIXME this should be data.tag but data.tag is used differently in the component
    this.tag = data.tag;
    // FIXME this should be removed if no longer used
    this.land_mark = data.land_mark;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.delivery_area = data.delivery_area;
    this.primary = data.primary;
    this.address_details = data.address_details;
  }

  getUrlString() {
    return `members/${this.url_id}/save_member_addresses`;
  }
}
export default SaveShippingAddressObjectRequest;
