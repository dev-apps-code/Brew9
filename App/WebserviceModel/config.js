import EventObject from './event_object';
import { getConfig } from '../Services/config';
import { createAction } from '../Utils';

export default {
  namespace: 'config',
  state: {
    responses: []
  },
  reducers: {
    setDefaultState(state, { payload }) {
      return { ...state };
    },
    setResponses(state, { payload }) {
      return { ...state, responses: payload.response_messages };
    }
  },
  effects: {
    *loadConfig({ payload }, { call, put, select }) {
      try {
        const { callback } = payload;
        const json = yield call(getConfig);
        const eventObject = new EventObject(json);
        if (eventObject.success == true) {
          yield put(createAction('setResponses')(eventObject.result));
        }
        typeof callback === 'function' && callback(eventObject);
      } catch (err) {
        console.log('*loadConfig Error: ', err);
      }
    }
  }
};
