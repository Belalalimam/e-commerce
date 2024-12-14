import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
    name: "like",
    initialState: {
        like: null, 
    },
    reducers: {
        setlike(state, action) {
            state.like = action.payload
        },

    }
})

const likeReducer = likeSlice.reducer;
const likeActions = likeSlice.actions;

export { likeReducer, likeActions };