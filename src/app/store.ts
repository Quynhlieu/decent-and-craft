import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice"
import userReducer from "../features/user/userSlice.ts";
import productDetailSlice from "../features/productDetail/productDetailSlice.ts";
import reviewSlice from "../features/review/reviewSlice.ts";
import orderReducer from "../features/order/orderSlice.ts";
import { productApi } from "../api/productApi.ts";
import { blogApi } from "../api/blogApi.ts";
import { feedbackApi } from "../api/feedackApi.ts";
import { userApi } from "../api/userApi.ts";
import { productDetailApi } from "../api/productDetailApi.ts";
import { addressApi } from "../api/addressApi.ts";
import { orderApi } from "../api/orderApi.ts";
import saveCartMiddleware from "../features/cart/saveCartMiddleware.ts";
import { voucherApi } from "../api/voucherApi.ts";
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        user: userReducer,
        order: orderReducer,
        [userApi.reducerPath]: userApi.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        productDetail: productDetailSlice,
        review: reviewSlice,
        [productApi.reducerPath]: productApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
        [productDetailApi.reducerPath]: productDetailApi.reducer,
        [voucherApi.reducerPath]: voucherApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware,
            userApi.middleware,
            productDetailApi.middleware,
            addressApi.middleware,
            orderApi.middleware,
            blogApi.middleware,
            feedbackApi.middleware,
            voucherApi.middleware,
            saveCartMiddleware
        )
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch