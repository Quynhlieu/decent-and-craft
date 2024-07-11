import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice"
import usersReducer from "../features/user/usersSlice.ts";
import userReducer from "../features/user/userSlice.ts";
import productDetailSlice from "../features/productDetail/productDetailSlice.ts";
import reviewSlice from "../features/review/reviewSlice.ts";
import { productApi } from "../api/productApi.ts";
import { blogApi } from "../api/blogApi.ts";
import { feedbackApi } from "../api/feedackApi.ts";
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        user: userReducer,
        users: usersReducer,
        productDetail: productDetailSlice,
        review: reviewSlice,
        [productApi.reducerPath]: productApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware,
            blogApi.middleware
            , feedbackApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch