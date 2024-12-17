import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category", 
    initialState: {
        category: [],
    }, 
    reducers: {
        setCategory(state, action) {
            state.category = action.payload
        },
    }
})

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;

export { categoryReducer, categoryActions };



