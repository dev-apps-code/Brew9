

  // import {createAction} from "./Utils"
  
   export default {
  
    namespace: 'config',
  
    state: {
        isToggleShopLocation:false,
        selectedTab:'home'
    },
  
    reducers: {
      setTab(state, { payload }) {
        return {
          ...state,
          selectedTab:payload,
        }   
      },
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
  