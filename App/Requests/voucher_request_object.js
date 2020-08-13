import BaseRequestObject from './base_request_object';

class VoucherRequestObject extends BaseRequestObject {
  constructor() {
    super();
  }

  setUrlId(url_id) {
    this.url_id = url_id;
  }

  setPage(page) {
    this.page_no = page;
  }

  setStatus(status) {
    this.status = status;
  }

  setShopId(shop_id) {
    this.shop_id = shop_id;
  }

  getUrlString() {
    return `members/${this.url_id}/vouchers/${this.shop_id}`;
  }
}
export default VoucherRequestObject;
