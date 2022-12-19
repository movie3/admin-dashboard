import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsReducer";
import usersReducer from "./usersReducer";
import commentsReducer from "./commentReducer";

const store = configureStore({
    reducer : {
        users : usersReducer,
        posts : postsReducer,
        comments : commentsReducer,
    }
})

export default store;