import BaseRequestObject from './base_request_object';

class AllShopsRequestObject extends BaseRequestObject {
  constructor(latitude, longitude) {
    super();

    if (typeof latitude !== 'undefined' && typeof longitude !== 'undefined') {
      this.latitude = latitude;
      this.longitude = longitude;
    }
  }

  getUrlString() {
    return `companies/${this.url_id}/shops/all`;
  }
}
export default AllShopsRequestObject;
