import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice"
import userReducer from "../features/user/userSlice.ts";
import filterReducer from "../features/filter/filterSlice.ts";
import productDetailSlice from "../features/productDetail/productDetailSlice.ts";
import reviewSlice from "../features/review/reviewSlice.ts";
import { productApi } from "../api/productApi.ts";
import { userApi } from "../api/userApi.ts";
import { productDetailApi } from "../api/productDetailApi.ts";
import { addressApi } from "../api/addressApi.ts";
import { orderApi } from "../api/orderApi.ts";
import { blogApi } from "../api/blogApi.ts";
import { feedbackApi } from "../api/feedackApi.ts";
import { reviewApi } from "../api/reviewApi.ts";
import { categoryApi } from "../api/categoryApi.ts";
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        user: userReducer,
        filter: filterReducer,
        [userApi.reducerPath]: userApi.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        productDetail: productDetailSlice,
        review: reviewSlice,
        [productApi.reducerPath]: productApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
        [productDetailApi.reducerPath]: productDetailApi.reducer,
        [reviewApi.reducerPath]:reviewApi.reducer,
        [categoryApi.reducerPath]:categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware,
            userApi.middleware,
            productDetailApi.middleware,
            addressApi.middleware,
            orderApi.middleware,
            blogApi.middleware,
            feedbackApi.middleware,
            reviewApi.middleware,
            categoryApi.middleware,)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch