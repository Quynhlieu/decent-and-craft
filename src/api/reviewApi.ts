import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import { IReview } from "../features/productDetail/productDetailSlice";
export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        getAllReviewsByProductId: builder.query<IReview[], number>({
            query: (id: number) => `product-detail/${id}/reviews`,
        }),
        addReview: builder.mutation<IReview, { productId: number; request: IReview }>({
            query: ({ productId, request }) => ({
                url: `product-detail/${productId}/reviews`,
                method: 'POST',
                body: request,
            }),
        }),
    }),
})
export const {  useGetAllReviewsByProductIdQuery , useAddReviewMutation  } = reviewApi