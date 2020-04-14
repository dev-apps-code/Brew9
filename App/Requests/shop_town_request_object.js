import BaseRequestObject from './base_request_object';

class ShopTownRequestObject extends BaseRequestObject {
  constructor() {
    super();
  }

  getUrlString() {
    return `towns`;
  }
}
export default ShopTownRequestObject;
