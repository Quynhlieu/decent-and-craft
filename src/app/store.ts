import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice"
import userReducer from "../features/user/userSlice.ts";
import productDetailSlice from "../features/productDetail/productDetailSlice.ts";
import reviewSlice from "../features/review/reviewSlice.ts";
import { productApi } from "../api/productApi.ts";
import {userApi} from "../api/userApi.ts";
import {productDetailApi} from "../api/productDetailApi.ts";
import {addressApi} from "../api/addressApi.ts";
import {orderApi} from "../api/orderApi.ts";
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        user:userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        productDetail: productDetailSlice,
        review:reviewSlice,
        [productApi.reducerPath]:productApi.reducer,
        [productDetailApi.reducerPath]:productDetailApi.reducer
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(productApi.middleware, userApi.middleware, productDetailApi.middleware, addressApi.middleware, orderApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch