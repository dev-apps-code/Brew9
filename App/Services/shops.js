import {
  getMethod,
  postMethod,
  postMultipartMethod,
  postJsonMethod,
  deleteMethod
} from '../Utils/webservice_helper';

export function shops(authtoken, object) {
  return getMethod(authtoken, object);
}

export function shop_banner(authtoken, object) {
  return getMethod(authtoken, object);
}

export function makeOrder(authtoken, object) {
  return postJsonMethod(authtoken, object);
}

export function missions(authtoken, object) {
  return getMethod(authtoken, object);
}

export function review(authtoken, object) {
  return postMethod(authtoken, object);
}

export function deliveryFee(authtoken, object) {
  return getMethod(authtoken, object);
}

export function shopTown(authtoken, object) {
  return getMethod(authtoken, object);
}

export function favoriteShop(authtoken, object) {
  return postMethod(authtoken, object);
}

export function unfavoriteShop(authtoken, object) {
  return deleteMethod(authtoken, object);
}
