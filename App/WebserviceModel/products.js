import { getProducts } from '../Services/products';
import EventObject from './event_object';

export default {
  namespace: 'products',

  state: {},
  reducers: {
    setDefaultState(state, { payload }) {
      return {
        ...state
      };
    }
  },
  effects: {
    *loadStoreProducts({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload;
        const authtoken = yield select((state) => state.members.userAuthToken);

        const json = yield call(getProducts, authtoken, object);
        const eventObject = new EventObject(json);
        if (eventObject.success == true) {
        }
        typeof callback === 'function' && callback(eventObject);
      } catch (err) {}
    }
  }
};
