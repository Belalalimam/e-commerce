import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlic";
// import { categoryReducer } from "./slices/categorySlice";
// import { commentReducer } from "./slices/commentSlice";
// import { passwordReducer } from "./slices/passwordSlice";
// import { postReducer } from "./slices/postSlice";
// import { profileReducer } from "./slices/profileSlice";

const Store = configureStore({
    reducer: {
       auth: authReducer,
    //    profile: profileReducer,
    //    post: postReducer,
    //    category: categoryReducer,
    //    comment: commentReducer,
    //    password: passwordReducer,
    }
});

export default Store;