import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import {IProductDetail} from "../features/productDetail/productDetailSlice.ts";
export const productDetailApi = createApi({
    reducerPath: 'productDetailApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        getProductDetailById: builder.query<IProductDetail, number>({
            query: (id:number) => `product-detail/${id}`,
        }),
    }),
})
export const {  useGetProductDetailByIdQuery } = productDetailApi