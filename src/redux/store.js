import { configureStore } from "@reduxjs/toolkit";
import clockReducer from "./clockSlice"

export default configureStore({
    reducer:{
        clock:clockReducer
    }
});