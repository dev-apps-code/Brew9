import BaseRequestObject from './base_request_object';

export class NearestShopRequestObject extends BaseRequestObject {
  constructor(latitude, longitude) {
    super();
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getUrlString() {
    return `companies/${this.url_id}/shops/all`;
  }
}
