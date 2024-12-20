import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
        productsDashboard: [],
        productsCount: null,
        productsCate: [],
        productsCateSize: [],
        productSingle: null,
        isProductCreated: false,
        loading: false,
    },
    reducers: {
        setProducts(state, action) {
            state.product = action.payload
        },
        setProductDashboard(state, action) {
            state.productsDashboard = action.payload
        },
        setProductCount(state, action) {
            state.productsCount = action.payload
        },
        setProductCate(state, action) {
            state.productsCate = action.payload
        },
        setProductCateSize(state, action) {
            state.productsCateSize = action.payload
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
        deleteProduct(state,action) {
            state.product = state.product.filter(p => p._id !== action.payload);        
        },
        setCart(state,action) {
          state.product.cart = action.payload.cart;
        },


    }
})

const productReducer = productSlice.reducer;
const productActions = productSlice.actions;

export { productReducer, productActions };