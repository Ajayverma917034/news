import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ads from "./advertisement/adsSlice"

const rootReducer = combineReducers({
    ads: ads,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export default store;