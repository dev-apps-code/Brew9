import BaseRequestObject from './base_request_object';

export class AllShopsRequestObject extends BaseRequestObject {
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
