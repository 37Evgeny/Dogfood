import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "../utils/api";
import productsReducer from './products/productsSlice'
import userReducer from './user/userSlice'
import singleProductReducer from './singleProduct/singleProductsSlice'

const store = configureStore({
    reducer: {
        products: productsReducer,
        user: userReducer,
        singleProduct: singleProductReducer
    },
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        thunk:{
            extraArgument:api,
        }
    })
})

export default store;