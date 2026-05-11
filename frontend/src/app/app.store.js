import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/Auth/Auth.slice.js"
export const store = configureStore({
    reducer:{
        auth: authReducer,
    }
})