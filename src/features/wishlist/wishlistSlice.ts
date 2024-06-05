import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/Product";
const initialState: Product[] = [];
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
            state.filter(p => p.id !== action.payload.id)
        }


    }

})
export default wishlistSlice.reducer
export const { wishlistLoad, wishlistAdd, wishlistRemove } = wishlistSlice.actions;