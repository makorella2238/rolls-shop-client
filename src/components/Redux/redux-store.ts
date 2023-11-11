import {combineReducers, configureStore} from "@reduxjs/toolkit";
import appSlice from "./app/app-slice";

const rootReducer = combineReducers({
    app: appSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store