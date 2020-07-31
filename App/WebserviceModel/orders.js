import { getOrders } from '../Services/orders';
import EventObject from './event_object';

export default {
  namespace: 'orders',

  state: {
    cart_order_id: null,
    cart: [],
    promotion: [],
    promotion_ids: [],
    cart_total: 0,
    cart_total_quantity: 0,
    products: [],
    promotion_trigger_count: 0,
    discount_cart_total: 0,
    toggle_update_count: 0,
    promotions: [],
    promotion_ids: [],
    clearCart: false,
    currentPromoText: ''
  },

  reducers: {
    setDefaultState(state, { payload }) {
      return {
        ...state
      };
    },
    updatePromotions(state, { payload }) {
      const { promotions } = payload;
      const promotion_ids = [];
      for (var index in promotions) {
        const promotion = promotions[index];
        promotion_ids.push(promotion.id);
      }
      return {
        ...state,
        promotions,
        promotion_ids
      };
    },
    updatePromotionText(state, { payload }) {
      const { promotionText } = payload;

      return {
        ...state,
        currentPromoText: promotionText
      };
    },
    resetCart(state, { payload }) {
      return {
        ...state,
        cart_order_id: null,
        cart: [],
        promotions: [],
        promotion_ids: [],
        cart_total_quantity: 0,
        cart_total: 0,
        remaining: 0,
        clearCart: true
      };
    },
    noClearCart(state, { payload }) {
      return {
        ...state,
        clearCart: false
      };
    },
    updateCart(state, { payload }) {
      const { cart } = payload;
      var promotion_trigger_count = state.promotion_trigger_count + 1;

      var total = 0.0;
      var quantity = 0;
      for (item of cart) {
        if (item.clazz == 'product') {
          var calculated = (
            parseInt(item.quantity) * parseFloat(item.price)
          ).toFixed(2);
          total = total + parseFloat(calculated);
          quantity = quantity + parseInt(item.quantity);
        }
      }
      return {
        ...state,
        cart,
        toggle_update_count: state.toggle_update_count + 1,
        cart_total_quantity: quantity,
        cart_total: total,
        promotion_trigger_count
      };
    },
    editCart(state, { payload }) {
      const { order, order_items } = payload;
      var promotion_trigger_count = state.promotion_trigger_count + 1;

      var total = 0.0;
      var quantity = 0;
      var new_cart = [];

      for (item of order_items) {
        if (item.clazz == 'order_item') {
          let cartItem = {
            clazz: 'product',
            id: item.product_id,
            name: item.product_name,
            description: '',
            price: item.final_price,
            quantity: item.quantity,
            selected_variants: item.selected_variants
          };
          new_cart.push(cartItem);
          var calculated = (
            parseInt(item.quantity) * parseFloat(item.final_price)
          ).toFixed(2);
          total = total + parseFloat(calculated);
          quantity = quantity + parseInt(item.quantity);
        }
      }

      return {
        ...state,
        cart_order_id: order.id,
        cart: new_cart,
        toggle_update_count: state.toggle_update_count + 1,
        cart_total_quantity: quantity,
        cart_total: total,
        promotion_trigger_count
      };
    },
    updateDiscountCartTotal(state, { payload }) {
      const { discount_cart_total } = payload;
      return {
        ...state,
        discount_cart_total
      };
    }
  },
  effects: {
    *loadGetOrders({ payload }, { call, put, select }) {
      try {
        const { object, callback } = payload;
        const authtoken = yield select((state) => state.member.userAuthToken);
        const json = yield call(getOrders, authtoken, object);
        const eventObject = new EventObject(json);
        if (eventObject.success == true) {
        }
        typeof callback === 'function' && callback(eventObject);
      } catch (err) {}
    }
  }
};
