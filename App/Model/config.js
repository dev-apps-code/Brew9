import EventObject from './../WebserviceModel/event_object';
import { createAction } from '../Utils';
import { getConfig } from '../Services/configurations';

export default {
  namespace: 'config',

  state: {
    isToggleShopLocation: false,
    selectedTab: 'home',
    responses: []
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
      payload.response_messages.map((i) => responses.set(i.key, i.text));
      return { ...state, responses };
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
