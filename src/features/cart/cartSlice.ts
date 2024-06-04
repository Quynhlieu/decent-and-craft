import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/Product";

export type CartItem = {
    product: Product,
    quantity: number
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cartLoad(state) {
            return state
        },
        cartItemAdd(state, action: PayloadAction<CartItem>) {
            const isExist = state.some(i => i.product.id === action.payload.product.id)
            if (isExist) {
                let currentCartItem = state.find(i => i.product.id === action.payload.product.id);
                currentCartItem && currentCartItem.quantity++;
            } else {
                state.push(action.payload)
            }
        },
        cartItemRemove(state, action: PayloadAction<Number>) {
            return state.filter((cartItem => cartItem.product.id !== action.payload))
        }

    }

})
export const { cartLoad, cartItemAdd, cartItemRemove } = cartSlice.actions
export default cartSlice.reducer
export const getCount = (cart: CartItem[]) => {
    return cart.length
}
export const getTotalPrice = (cart: CartItem[]) => {
    return cart
        .reduce((total, cartItem) => total + (cartItem.product.price*cartItem.quantity), 0);
}