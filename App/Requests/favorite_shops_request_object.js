import BaseRequestObject from './base_request_object';

export class FavoriteShopsRequestObject extends BaseRequestObject {
  constructor(shopId, latitude, longitude) {
    super();

    if (typeof latitude !== 'undefined' && typeof longitude !== 'undefined') {
      this.latitude = latitude;
      this.longitude = longitude;
    }

    if (typeof shopId !== 'undefined') {
      this.id = shopId;
    }
  }

  getUrlString() {
    return `companies/${this.url_id}/favorite_shops`;
  }
}

export class DeleteFavoriteRequestObject extends BaseRequestObject {
  constructor(shopId) {
    super();
    this.shopId = shopId;
  }

  getUrlString() {
    return `companies/${this.url_id}/favorite_shops/${this.shopId}`;
  }
}
