// import { useParams } from "react-router-dom";
// export interface IReview {
//     id: number;
//   comments: string;
//   rating: number;
//   userId: number;
//   userFullName: string;
//   createdDate: string;
//   modifiedDate: string;
// }
// const { productId } = useParams();  
// const { data, error, isLoading } = useGetAllReviewsQuery(Number(productId));
// const reviews = data;    

// const initialState: IReview[] = reviews;// danh sach san pham

// const productDetailSlice = createSlice({
//     name: 'productDetail',
//     initialState,
//     reducers: {
//         reviewAdd(state, action: PayloadAction<{ productId: number, review: IReview }>) {
//             const {productId, review} = action.payload;
//             const product = state.find(i => i.product.id === productId); 
//             const isExist:boolean|undefined = product?.reviewList.some(review=>review.customer?.id==review.customer?.id);
//             if(isExist){
//                 const currentReview = product?.reviewList.find(r=>r.customer?.id==review.customer?.id);
//                 if(currentReview){
//                     currentReview.contents=review.contents;
//                     currentReview.rating=review.rating;
//                 }
//             }
//             else{
//                 product && product.reviewList.push(review);
//             }
//         }
//     },
// });

// export const {reviewAdd} = productDetailSlice.actions;

// export default productDetailSlice.reducer

// // Số lượt review
// export const getTotalReview = (reviews: IReview[]):number => {
//     return reviews && reviews.length;
// }