import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart", 
    initialState: {
        cart: null,
    },
    reducers: {
        setCart(state, action) {
            state.cart = action.payload
        },
    }
})

const cartReducer = cartSlice.reducer;
const cartActions = cartSlice.actions;

export { cartReducer, cartActions };
