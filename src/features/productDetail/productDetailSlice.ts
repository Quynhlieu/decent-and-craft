import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IProductDetail {
    id: number;
    product: Product;
    imageList: ImageList[];
    categoryList: CategoryList[];
    productBlog: ProductBlog;
    views: number;
}
interface ProductBlog {
    id: number;
    content: string;
}
interface CategoryList {
    id: number;
    name: string;
}
export interface ImageList {
    id: number;
    url: string;
}
interface Product {
    createdDate: string;
    modifiedDate: string;
    id: number;
    name: string;
    thumbnail: string;
    price: number;
    origin: number;
    status: string;
    unitInStock: number;
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

export interface ProductDetailState {
    productDetail: IProductDetail | null,
    reviews: IReview[],
}

const initialState: ProductDetailState = {
    productDetail: null,
    reviews: []
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
        reviewAdd(state, action: PayloadAction<{ productId: number, review: IReview }>) {
            // const {productId, review} = action.payload;
            // // const product = state.find(i => i.product.id === productId);
            // const product = state.productDetail.product;
            // const isExist:boolean|undefined = product?.reviewList.some(review=>review.customer?.id==review.customer?.id);
            // if(isExist){
            //     const currentReview = product?.reviewList.find(r=>r.customer?.id==review.customer?.id);
            //     if(currentReview){
            //         currentReview.contents=review.contents;
            //         currentReview.rating=review.rating;
            //     }
            // }
            // else{
            //     product && product.reviewList.push(review);
            // }
        }
    },
});

export const {productDetailLoad, reviewsLoad, reviewAdd} = productDetailSlice.actions;

export default productDetailSlice.reducer

// Số lượt review
export const getTotalReview = (reviews: IReview[]):number => {
    return reviews && reviews.length;
}



