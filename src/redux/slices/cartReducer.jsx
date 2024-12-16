import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "carts",
    initialState: {
        item: []
    },
    reducers: {
        setCartItem(state, action) {
            state.item = action.payload;
        }
    }
});
const cartReducer = cartSlice.reducer;
const cartActions = cartSlice.actions;

export { cartReducer, cartActions };
