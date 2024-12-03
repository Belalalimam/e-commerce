import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlic";
import { profileReducer } from "../redux/slices/profileSlic"
import { likeReducer } from "./slices/likeReducer";
// import { catrReducer } from "./slices/catrReducer";
// import { passwordReducer } from "./slices/passwordSlice";

const Store = configureStore({
    reducer: {
       auth: authReducer,
       profile: profileReducer,
       like: likeReducer,
    //    catr: catrReducer,
    //    password: passwordReducer, 
    }
});

export default Store;