import {productDetails} from "../../data/productDetail.ts"
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Image, IReview} from "../../interfaces/IProductDescription.ts";
import {Product} from "../../interfaces/Product.ts";

export interface IProductDetail {
    product: Product;
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
            const product = state.find(i => i.product.id === productId);
            const isExist:boolean|undefined = product?.reviewList.some(review=>review.customer?.id==review.customer?.id);
            if(isExist){
                const currentReview = product?.reviewList.find(r=>r.customer?.id==review.customer?.id);
                if(currentReview){
                    currentReview.contents=review.contents;
                    currentReview.rating=review.rating;
                }
            }
            else{
                product && product.reviewList.push(review);
            }
        }
    },
});

export const {reviewAdd} = productDetailSlice.actions;

export default productDetailSlice.reducer

// Số lượt review
export const getTotalReview = (reviews: IReview[]):number => {
    return reviews && reviews.length;
}



