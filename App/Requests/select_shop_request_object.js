import BaseRequestObject from './base_request_object';

export default class SelectShopRequestObject extends BaseRequestObject {
  constructor(latitude, longitude) {
    super();

    this.latitude = latitude || null;
    this.longitude = longitude || null;
  }

  setShopId(id) {
    this.shopId = id;
  }

  getUrlString() {
    return `companies/${this.url_id}/shops/${this.shopId}`;
  }
}
