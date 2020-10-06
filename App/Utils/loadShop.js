import {SelectShopRequestObject} from '@requests';
import {createAction} from './createAction';

export const loadShop = (shopId, location, companyId, dispatch, callback) => {
  const latitude = location !== null ? location.coords.latitude : null;
  const longitude = location !== null ? location.coords.longitude : null;

  if (latitude !== null && longitude !== null) {
    const object = new SelectShopRequestObject(latitude, longitude);

    object.setUrlId(companyId);
    object.setShopId(shopId);

    const params = {object, callback};
    const action = createAction('shops/selectShop')(params);
    dispatch(action);
  } else {
    const object = new SelectShopRequestObject();
    object.setUrlId(companyId);
    object.setShopId(shopId);

    const params = {object, callback};
    const action = createAction('shops/selectShop')(params);
    dispatch(action);
  }
};
