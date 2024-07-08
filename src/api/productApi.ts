import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import { Product } from "../interfaces/Product";
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        getAllProduct: builder.query<Product[], void>({
            query: () => `products`,
        }),
        getProductById: builder.query<Product, number>({
            query: (id) => `products/${id}`,
        }),
    }),
})
export const { useGetAllProductQuery, useGetProductByIdQuery } = productApi