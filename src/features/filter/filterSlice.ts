import { Product } from "../../interfaces/Product";
import BlogCategory from "../../interfaces/IBlogCategory.ts";

export interface FilterItem {
    id: number,
    name: string,
}
export interface FilterInitialState {
    name?: string,
    priceRange?: {
        from: number | null,
        to: number | null,
    }
    categories?: BlogCategory[],
    rating?: number[] | string,
}
const initialState: FilterInitialState = {
    name: '',
    priceRange:{
        from: 0,
        to: null,
    },
    categories: [],
    rating: "all"
};

