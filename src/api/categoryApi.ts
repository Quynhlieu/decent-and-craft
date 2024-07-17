import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import BlogCategory from "../interfaces/IBlogCategory";
export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        getAllCategory: builder.query<BlogCategory[], void>({
            query: () => `categories`,
        }),
        
        
    }),
})
export const {useGetAllCategoryQuery } = categoryApi