import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import { IProductDetail } from "../interfaces/ProductDetail";
export const productDetailApi = createApi({
    reducerPath: 'productDetailApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        getProductDetailById: builder.query<IProductDetail, number>({
            query: (id:number) => `product-detail/${id}`,
        }),
        getAverageRating: builder.query<number, number>({
            query: (productId:number) => `product-detail/${productId}/reviews/average-rating`,
        }),

    }),
})
export const {  useGetProductDetailByIdQuery, useGetAverageRatingQuery } = productDetailApi