import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    remove: (state, action) => {
      state.items = state.items.filter((pr) => {
        if (pr.id == action.payload) {
          pr.cartQuantity--;
          state.totalPrice = state.totalPrice - pr?.attributes?.price;
          if (pr.cartQuantity == 0) {
            return false;
          }
        }
        return pr;
      });
    },
    add: (state, action) => {
        
      let addItem = false;
      state.totalPrice = state.totalPrice + action.payload?.price;
      state.items = state.items?.map((pr) => {
        if (pr.id == action.payload.id) {
            pr.cartQuantity++
            addItem=true
        }
        return pr
      });
      if(!addItem){
        state.items.push({...action.payload,cartQuantity:1})
      }
    },
  },
});
export const {add,remove,clear} = cartSlice.actions
export default cartSlice.reducer