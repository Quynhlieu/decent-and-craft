/* eslint-disable react-hooks/rules-of-hooks */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { CartItem } from "../cart/cartSlice";
import { IProductDetail } from "../../interfaces/ProductDetail";


export interface ProductBlog {
    id: number;
    content: string;
}
export interface ImageList {
    id: number;
    url: string;
}
export interface IReview {
    id: number;
  comments: string;
  rating: number;
  userId: number;
  userFullName: string;
  createdDate: string;
  modifiedDate: string;
}
export interface AddReviewDto {
    userId: number
    productId: number
    rating: number
    text?: string
  }
  export interface UpdateReviewDto {
    reviewId: number
    userId: number
    productId: number
    rating: number
    text?: string
  }

export interface ProductDetailState {
    productDetail: IProductDetail | null,
    reviews: IReview[],
    cartItem: CartItem | null
}

const initialState: ProductDetailState = {
    productDetail: null,
    reviews: [],
    cartItem: null
};

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        productDetailLoad(state,  action: PayloadAction<IProductDetail>) {
           state.productDetail = action.payload
        },
        reviewsLoad(state,  action: PayloadAction<IReview[]>) {
            state.reviews = action.payload
        },
        reviewAdd(state, action: PayloadAction<{request: IReview }>) {
            const {request} = action.payload;
            state.reviews.push(request);
        },
        addCartItem(state,  action: PayloadAction<CartItem>) {
            state.cartItem = action.payload
         },
         updateCartItem(state,  action: PayloadAction<number>) {
            state.cartItem && (state.cartItem.quantity + action.payload > 0)
            && (state.cartItem.quantity += action.payload)
         },
         updateAverageRating(state, action: PayloadAction<number>) {
            if (state.productDetail) {
                state.productDetail.averageRating = action.payload;
            }
        },
    },
});

export const {productDetailLoad, reviewsLoad, reviewAdd, addCartItem, updateCartItem, updateAverageRating} = productDetailSlice.actions;

export default productDetailSlice.reducer

// Số lượt review
export const getTotalReview = (reviews: IReview[]):number => {
    return reviews && reviews.length;
}



