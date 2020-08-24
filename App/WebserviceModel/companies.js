import EventObject from './event_object';
import {
  topUpProducts,
  pointsProducts,
  shopArea
} from '../Services/companies.js';

export default {
  namespace: 'companies',

  state: {},

  reducers: {
    setDefaultState(state, { payload }) {
      return {
        ...state
      };
    }
  },
  effects: {
    *loadTopUpProducts({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload;
        const authtoken = yield select((state) => state.members.userAuthToken);

        const json = yield call(topUpProducts, authtoken, object);
        const eventObject = new EventObject(json);
        if (eventObject.success == true) {
        }
        typeof callback === 'function' && callback(eventObject);
      } catch (err) {}
    },
    *loadPointsProducts({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload;
        const authtoken = yield select((state) => state.members.userAuthToken);

        const json = yield call(pointsProducts, authtoken, object);
        const eventObject = new EventObject(json);
        if (eventObject.success == true) {
        }
        typeof callback === 'function' && callback(eventObject);
      } catch (err) {}
    },
    *loadShopArea({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload;
        const authtoken = yield select((state) => state.members.userAuthToken);

        const json = yield call(shopArea, authtoken, object);
        const eventObject = new EventObject(json);
        if (eventObject.success == true) {
        }
        typeof callback === 'function' && callback(eventObject);
      } catch (err) {
        console.log('error loadShopArea', err);
      }
    }
  }
};
