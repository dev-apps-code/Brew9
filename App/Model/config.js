import EventObject from './../WebserviceModel/event_object';
import { createAction } from '../Utils';
import { getConfig } from '../Services/configurations';

export default {
  namespace: 'config',

  state: {
    isToggleShopLocation: false,
    selectedTab: 'home',
    responses: new Map(),
    shopResponses: new Map()
  },

  reducers: {
    setTab(state, { payload }) {
      return { ...state, selectedTab: payload };
    },
    setDefaultState(state, { payload }) {
      return { ...state, isToggleShopLocation: false };
    },
    setToggleShopLocation(state, { payload }) {
      return { ...state, isToggleShopLocation: payload };
    },
    saveResponses(state, { payload }) {
      const responses = new Map();
      const overrides = new Map();


      payload.response_messages.map((r) => {
        responses.set(r.key, r.text);

        if (r.overrides && r.overrides.length > 0) {
          r.overrides.map((i) => {
            const shopMessages = new Map();
            shopMessages.set(r.key, i.text);
            overrides.set(i.shop_id, shopMessages);
          });
        }
      });
      return { ...state, responses, shopResponses: overrides };
    }
  },
  effects: {
    *loadConfig({ payload }, { call, put, select }) {
      try {
        const { callback } = payload;
        const json = yield call(getConfig, {});
        const eventObject = new EventObject(json);
        if (eventObject.success == true) {
          yield put(createAction('saveResponses')(eventObject.result));
        }
        typeof callback === 'function' && callback(eventObject);
      } catch (err) {
        console.log('*loadConfig Error: ', err);
      }
    }
  }
};
