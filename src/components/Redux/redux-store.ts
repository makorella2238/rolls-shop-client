import {combineReducers, configureStore} from "@reduxjs/toolkit";
import appSlice from "./app/app-slice.ts";

const rootReducer = combineReducers({
    app: appSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store