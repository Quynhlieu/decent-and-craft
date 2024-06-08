import {productDetails} from "../../data/productDetail.ts"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Image, IReview} from "../../interfaces/IProductDescription.ts";
import {Product} from "../../interfaces/Product.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";

export interface IProductDetail extends Product {
    discount: number;
    images: Image[];
    overview: string;
    reviewList: IReview[];
    productDescriptions: string;
}

const initialState: IProductDetail[] = productDetails;// danh sach san pham

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        reviewAdd(state, action: PayloadAction<{ productId: number, review: IReview }>) {
            const {productId, review} = action.payload;
            const product = state.find(i => i.id === productId);
            product && product.reviewList.push(review);
        },
        // reviewUpdate(state, action: PayloadAction<{ productId: number, review: IReview }>) {
        //     const {productId, review} = action.payload;
        //     const product = state.find(i => i.id === productId);
        //     product.reviewList.find(i.)
        //
        // },
    },
});

export const {reviewAdd} = productDetailSlice.actions;

export default productDetailSlice.reducer

// Số lượt review
export const getTotalReview = (reviews: IReview[]) => {
    return reviews.length;
}



