import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
        productsCount: null,
        productsCate: [],
        productSingle: null,
        isProductCreated: false,
        loading: false,
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
        setSingleProduct(state, action) {
            state.productSingle = action.payload
        },
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
        setIsProductCreated(state) {
            state.isProductCreated = true;
            state.loading = false;
        },
        clearIsProductCreated(state) {
            state.isProductCreated = false;
        },


    }
})

const productReducer = productSlice.reducer;
const productActions = productSlice.actions;

export { productReducer, productActions };