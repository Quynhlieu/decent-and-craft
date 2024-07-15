import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/Product";

export type CartItem = {
    product: Product,
    quantity: number
}
const loadCartFromLocalStorage = (): CartItem[] => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
}
const initialState: CartItem[] = loadCartFromLocalStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cartClear(state) {
            localStorage.removeItem("cart");
            state.length = 0;
        },
        cartItemAdd(state, action: PayloadAction<CartItem>) {
            const isExist = state.some(i => i.product.id === action.payload.product.id)
            if (isExist) {
                const currentCartItem = state.find(i => i.product.id === action.payload.product.id);
                (currentCartItem) && currentCartItem.quantity++;
            } else {
                state.push(action.payload)
            }
        },
        cartItemRemove(state, action: PayloadAction<number>) {
            return state.filter((cartItem => cartItem.product.id !== action.payload))
        },
        cartUpdate(state,
            action: PayloadAction<{ productId: number, value: number }>) {
            const currentCartItem = state.find(i => i.product.id === action.payload.productId);
            (currentCartItem)
                && (currentCartItem.quantity + action.payload.value > 0)
                && (currentCartItem.quantity += action.payload.value)
        }


    }

})
export const { cartClear, cartItemAdd, cartItemRemove, cartUpdate } = cartSlice.actions
export default cartSlice.reducer
export const getCount = (cart: CartItem[]) => {
    return cart.length
}
export const getTotalPrice = (cart: CartItem[]) => {
    return cart
        .reduce((total, cartItem) => total + (cartItem.product.price * cartItem.quantity), 0);
}