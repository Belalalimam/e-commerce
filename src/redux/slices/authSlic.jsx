import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({ 
    name: "auth",
    initialState: {
        user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
        registerMessage: null

    },
    reducers:{
        Login(state, action){
            state.user = action.payload;
        },
        Logout(state){
            state.user = null
        },
        register(state, action){
            state.registerMessage = action.payload;
        }
    }
})

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, authActions };