import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    jwt:null,
    user:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.jwt = action.payload.jwt
            state.user = action.payload.user
        },
        logout:(state) =>{
            state.token = null
            state.user = null
        }
    }
})
export const {login,logout} = authSlice.actions
export default authSlice.reducer