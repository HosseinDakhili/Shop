import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items:[],
    totalPrice:0
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem:(state,action)=>{

        },
        removeItems:(state,action)=>{},
        clearCart:(state)=>{}
    }
})

export const {addItem,removeItems,clearCart} =cartSlice.actions
export default cartSlice.reducer