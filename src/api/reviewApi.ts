import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import {IReview} from "../interfaces/IProductDescription.ts";
export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        getAllReviewById: builder.query<IReview, number>({
            query: (id:number) => `product-detail/${id}/reviews`,
        }),
    }),
})
// export const {  useGetAllReviewById } = reviewApi