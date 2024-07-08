import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice"
import userReducer from "../features/user/userSlice.ts";
import productDetailSlice from "../features/productDetail/productDetailSlice.ts";
import reviewSlice from "../features/review/reviewSlice.ts";
import { productApi } from "../api/productApi.ts";
import {userApi} from "../api/userApi.ts";
import {productDetailApi} from "../api/productDetailApi.ts";
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        user:userReducer,
        [userApi.reducerPath]: userApi.reducer,
        productDetail: productDetailSlice,
        review:reviewSlice,
        [productApi.reducerPath]:productApi.reducer,
        [productDetailApi.reducerPath]:productDetailApi.reducer
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(productApi.middleware, userApi.middleware, productDetailApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch