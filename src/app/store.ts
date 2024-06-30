import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice"
import usersReducer from "../features/user/usersSlice.ts";
import userReducer from "../features/user/userSlice.ts";
import productDetailSlice from "../features/productDetail/productDetailSlice.ts";
import reviewSlice from "../features/review/reviewSlice.ts";
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        user:userReducer,
        users: usersReducer,
        productDetail: productDetailSlice,
        review:reviewSlice,
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch