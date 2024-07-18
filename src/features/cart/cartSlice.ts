import { toast } from 'react-toastify';
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
                if (currentCartItem) {
                    if (currentCartItem.quantity + 1 < currentCartItem.product.unitInStock) {
                        toast.success("Thêm vào giỏ hàng thành công", { autoClose: 1000, position: "bottom-left" });
                        currentCartItem.quantity++;
                    }
                    else {
                        notifyError("Sản phẩm tồn kho không đủ")
                    }
                }
            } else {
                if (action.payload.quantity <= action.payload.product.unitInStock) {
                    toast.success("Thêm vào giỏ hàng thành công", { autoClose: 1000, position: "bottom-left" });
                    state.push(action.payload);
                } else {
                    notifyError("Sản phẩm tồn kho không đủ")
                }
            }
        },
        cartItemRemove(state, action: PayloadAction<number>) {
            return state.filter((cartItem => cartItem.product.id !== action.payload))
        },
        cartUpdate(state,
            action: PayloadAction<{ productId: number, value: number }>) {
            const currentCartItem = state.find(i => i.product.id === action.payload.productId);
            if (currentCartItem) {
                const newQuantity = currentCartItem.quantity + action.payload.value;
                if (newQuantity <= 0) {
                    notifyError("Số lượng phải lớn hơn 1")
                }
                if (newQuantity <= currentCartItem.product.unitInStock) {
                    toast.success("Thêm vào giỏ hàng thành công", { autoClose: 1000, position: "bottom-left" });
                    currentCartItem.quantity = newQuantity;
                } else {
                    notifyError("Sản phẩm tồn kho không đủ")
                }

            }
        }


    }

})
export const { cartClear, cartItemAdd, cartItemRemove, cartUpdate } = cartSlice.actions
export default cartSlice.reducer
export const notifyError = (error: string) => {
    toast.error(error, {
    })
}
export const getCount = (cart: CartItem[]) => {
    return cart.length
}
export const getTotalPrice = (cart: CartItem[]) => {
    return cart
        .reduce((total, cartItem) => total + (cartItem.product.price * cartItem.quantity), 0);
}