import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { fileApi, userApi } from "./api"
import userReducer from "./userSlice"
import fileSlice from "./fileSlice"

export const store = configureStore({
    reducer : {
        [userApi.reducerPath] : userApi.reducer,    
        [fileApi.reducerPath] : fileApi.reducer,    
        user : userReducer,
        file : fileSlice
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware,fileApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;