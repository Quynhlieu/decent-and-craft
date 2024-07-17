import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/Product";

const loadProductViewedHistoryFromLocalStorage = (): Product[] => {
    const savedHistory = localStorage.getItem("productViewedHistory");
    return savedHistory == undefined ? [] : JSON.parse(savedHistory)
};

const initialState: Product[] = loadProductViewedHistoryFromLocalStorage();

const productViewedHistorySlice = createSlice({
    name: "productViewedHistory",
    initialState,
    reducers: {
        productViewedHistoryLoad(state) {
            return state;
        },
        productViewedHistoryAdd(state, action: PayloadAction<Product>) {
            const existingIndex = state.findIndex(p => p.id === action.payload.id);
            if (existingIndex >= 0) {
                state.splice(existingIndex, 1);
            }
            state.push(action.payload);
            if (state.length > 10) {
                state.shift();
            }
        },
    },
});

export default productViewedHistorySlice.reducer;
export const { productViewedHistoryLoad, productViewedHistoryAdd } = productViewedHistorySlice.actions;
