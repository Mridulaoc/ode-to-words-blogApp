import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlicer";
import commentSlice from "./commentSlicer";
import likeSlicer from "./likeSlicer";


const store = configureStore({

    reducer:{
        auth:authSlice,
        comments : commentSlice,
        likes: likeSlicer
    }

})

export default store;