import {
  shops,
  shop_banner,
  makeOrder,
  missions,
  review,
  deliveryFee
} from '../Services/shops';
import EventObject from './event_object';
import { createAction } from '../Utils/index';
import _ from 'lodash';

export default {
  namespace: 'shops',

  state: {
    selectedShop: null,
    currentOrder: null,
    popUp: false,
    orders: []
  },
  reducers: {
    setDefaultState(state, { payload }) {
      return {
        ...state
      };
    },
    setSelectedShop(state, { payload }) {
      return { ...state, selectedShop: payload };
    },
    setCurrentOrder(state, { payload }) {
      const { order } = payload;

      let data = [...state.orders];

      _.remove(data, function(currentObject) {
        return currentObject.id === order.id;
      });

      data.unshift(order);

      return { ...state, currentOrder: order, orders: data };
    },
    setOrders(state, { payload }) {
      const { orders } = payload;
      return { ...state, orders: orders };
    },
    setPopUp(state, { payload }) {
      const { popUp } = payload;
      return { ...state, popUp };
    }
  },
  effects: {
    *loadShops({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload;
        const authtoken = yield select((state) => state.members.userAuthToken);
        const json = yield call(shops, authtoken, object);
        const eventObject = new EventObject(json);
        if (eventObject.success == true) {
          yield put(createAction('setSelectedShop')(eventObject.result));
        }
        typeof callback === 'function' && callback(eventObject);
      } catch (err) {}
    },
    *loadMakeOrder({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload;

        const authtoken = yield select((state) => state.members.userAuthToken);

        const json = yield call(makeOrder, authtoken, object);

        const eventObject = new EventObject(json);
        if (eventObject.success == true) {
          yield put(
            createAction('setCurrentOrder')({ order: eventObject.result })
          );
          if (eventObject.result.paid == true) {
            yield put(createAction('setPopUp')({ popUp: true }));
          }
          yield put(
            createAction('members/updateUnclaimedMission')(
              eventObject.result.member.unclaimed_mission_count
            )
          );
          yield put(
            createAction('members/saveCurrentUser')(eventObject.result.member)
          );
        }
        typeof callback === 'function' && callback(eventObject);
      } catch (err) {}
    },
    *loadShopBanners({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload;
        const authtoken = yield select((state) => state.userAuthToken);
        const json = yield call(shop_banner, authtoken, object);
        const eventObject = new EventObject(json);
        // if (eventObject.success == true) { }
        typeof callback === 'function' && callback(eventObject);
      } catch (err) {}
    },
    *loadMissions({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload;
        const authtoken = yield select((state) => state.members.userAuthToken);
        const json = yield call(missions, authtoken, object);
        const eventObject = new EventObject(json);
        if (eventObject.success == true) {
        }
        typeof callback === 'function' && callback(eventObject);
      } catch (err) {}
    },
    *loadReview({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload;
        const authtoken = yield select((state) => state.members.userAuthToken);
        const json = yield call(review, authtoken, object);
        const eventObject = new EventObject(json);
        if (eventObject.success == true) {
        }
        typeof callback === 'function' && callback(eventObject);
      } catch (err) {
        console.log('err', err);
      }
    },
    *loadDeliveryFee({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload;
        const authtoken = yield select((state) => state.members.userAuthToken);
        const json = yield call(deliveryFee, authtoken, object);
        const eventObject = new EventObject(json);
        if (eventObject.success == true) {
        }
        typeof callback === 'function' && callback(eventObject);
      } catch (err) {
        console.log('err', err);
      }
    }
  }
};
