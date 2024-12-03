import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
        productsCount: null,
        productsCate: []
    },
    reducers: {
        setProducts(state, action) {
            state.product = action.payload
        },
        setProductCate(state, action) {
            state.product = action.payload
        },
        setProductCount(state, action) {
            state.product = action.payload
        },

    }
})

const productReducer = productSlice.reducer;
const productActions = productSlice.actions;

export { productReducer, productActions };