import BlogCategory from "../../interfaces/IBlogCategory.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface FilterItem {
    id: number,
    name: string,
    priceRange?: PriceRange
}
export interface PriceRange {
    from: number | null,
    to: number | null,
}
export enum SORT_DIR {
    ASC, DESC
}
export interface FilterInitialState {
    name?: string,
    priceRange?: PriceRange
    categories?: BlogCategory[],
    rating?: null | string,
    page: number,
    priceSort?: SORT_DIR
}
export const defaultInitial = {
    name: '',
    priceRange: {
        from: null,
        to: null,
    },
    categories: [],
    rating: "all",
    page: 0,
    priceSort: SORT_DIR.ASC

};
const initialState: FilterInitialState = defaultInitial

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateCategories(state, action: PayloadAction<BlogCategory[]>) {
            state.categories = action.payload
            console.log("update category", state.categories);
        },
        updatePage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        updateName(state, action: PayloadAction<string>) {
            console.log();
            state.name = action.payload
        },
        updatePriceRange(state, action: PayloadAction<PriceRange>) {
            state.priceRange = action.payload
            console.log("Update priceRange", state.priceRange);

        },
        updateRating(state, action: PayloadAction<string | null>) {
            state.rating = action.payload;
            console.log("Update rating", state.rating);

        },
        updatePriceSort(state, action: PayloadAction<SORT_DIR>) {
            state.priceSort = action.payload;
            console.log("Update price sort", state.priceSort);
        },
        resetFilter(state, action: PayloadAction<FilterInitialState>) {
            state = action.payload
            console.log("Reset filter ", state);
        },


    },
});
export default filterSlice.reducer
export const { updateCategories, updatePage, updatePriceRange, resetFilter, updateRating, updateName, updatePriceSort } = filterSlice.actions;

