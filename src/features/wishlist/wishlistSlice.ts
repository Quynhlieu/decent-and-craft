import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/Product";

const loadWishlistFromLocalStorage = (): Product[] => {
    const saveWishlist = localStorage.getItem("wishlist");
    return saveWishlist ? JSON.parse(saveWishlist) : [];
}
const initialState: Product[] = loadWishlistFromLocalStorage();
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        wishlistLoad(state) {
            return state
        },
        wishlistAdd(state, action: PayloadAction<Product>) {
            state.push(action.payload)
        },
        wishlistRemove(state, action: PayloadAction<Product>) {
            return state.filter(p => p.id !== action.payload.id)
        }


    }

})
export default wishlistSlice.reducer
export const { wishlistLoad, wishlistAdd, wishlistRemove } = wishlistSlice.actions;