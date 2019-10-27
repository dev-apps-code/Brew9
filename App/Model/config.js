

  // import {createAction} from "./Utils"
  
   export default {
  
    namespace: 'config',
  
    state: {
        isToggleShopLocation:false,
    },
  
  
    reducers: {
       setDefaultState(state, { payload }) {
          return {
            ...state,
            isToggleShopLocation:false,
          }
       },  
       setToggleShopLocation(state, { payload }) {
        return {
          ...state,
          isToggleShopLocation:payload,
        }
     },     
    },
    // effects: {
   
  
    // },
  }
  