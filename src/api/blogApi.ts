import { blogApi } from './blogApi';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import IBlog from '../interfaces/IBlog';


export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
        getAllblogs: builder.query<IBlog[], void>({
            query: () => `blogs`
        }),
    })
}