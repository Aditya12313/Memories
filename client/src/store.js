import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/posts.js";
import  authReducer  from "./reducers/auth.js";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer
  },
});

export default store;