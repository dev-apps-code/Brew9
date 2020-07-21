import BaseRequestObject from './base_request_object';

export default class SelectShopRequestObject extends BaseRequestObject {
  constructor() {
    super();
  }

  setShopId(id) {
    this.shopId = id;
  }

  getUrlString() {
    return `companies/${this.url_id}/shops/${this.shopId}`;
  }
}
