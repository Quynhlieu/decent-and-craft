import { Page } from './../interfaces/Page';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import { Product } from "../interfaces/Product";
import { PageIml } from "../interfaces/PageIml";
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
        getProductsByFilters: builder.query<PageIml, {minPrice: number, maxPrice: number, categoryId: number, page: Page }>({
            query: ({minPrice, maxPrice, categoryId, page}) => `filter?minPrice=${minPrice}&maxPrice=${maxPrice}&categoryId=${categoryId}&page=${page.number}`
        }),
        getProductByCategoryId: builder.query<PageIml, {categoryId: number}>({
            query: ({categoryId}) => `filter?categoryId=${categoryId}`
        }),
        
    }),
})
export const { useGetAllProductQuery, useGetProductByIdQuery, useGetProductByCategoryIdQuery } = productApi