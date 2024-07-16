import { FilterInitialState } from './../features/filter/filterSlice';
import { Page } from './../interfaces/Page';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import { Product } from "../interfaces/Product";
import { PageIml } from "../interfaces/PageIml";
import { FilterInitialState, PriceRange } from '../features/filter/filterSlice';
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => ({
        getAllProduct: builder.query<Product[], void>({
            query: () => `products`,
        }),
        getAllHotProduct: builder.query<Product[], void>({
            query: () => `products/hot-products`,
        }),
        getProductById: builder.query<Product, number>({
            query: (id) => `products/${id}`,
        }),
        getProductsByFilters: builder.query<PageIml, {minPrice: number, maxPrice: number, categoryId: number, page: Page }>({
            query: ({minPrice, maxPrice, categoryId, page}) => `products/filter?minPrice=${minPrice}&maxPrice=${maxPrice}&categoryId=${categoryId}&page=${page.number}`
        }),
        getProductByCategoryId: builder.query<PageIml, number>({
            query: (categoryId: number) => `products/filter?categoryId=${categoryId}`
        }),
        getProductByCategoryList: builder.query<PageIml, { categoryId: string[], page: number, priceRange: PriceRange,  }>({
            query: ({ categoryId, page, priceRange }) => {
                const categoryIdParams = categoryId.map(id => `categoryId=${id}`).join('&');
                const size = 8;
                console.log("Hello! How a u?", categoryIdParams);
                return `products/filter?${categoryIdParams}&minPrice=1000&maxPrice=2000000&size=${size}&page=${page}`;
            }
        }),
        getProductFilters: builder.query<PageIml, FilterInitialState>({
            query: (filterState) => {
                const size = 8;
                let params = "products/filter?";
                if(filterState.categories){
                    params += String(filterState.categories.map(c => `categoryId=${c.id}`).join('&'));
                }if(filterState.priceRange?.from!=null){
                    params += String(`&minPrice=${filterState.priceRange.from}`)
                    // &maxPrice=${filterState.priceRange.from}`);
                }
                if(filterState.priceRange?.to!=null){
                    params += String(`&maxPrice=${filterState.priceRange.to}`)
                    // &maxPrice=${filterState.priceRange.from}`);
                }
                if(filterState.page){
                    params += String(`&page=${filterState.page}&size=8`);
                }
                console.log("Hello! How a u?", params);
                return params;
            }
        }),
    }),
})
export const { useGetAllProductQuery, useGetProductByIdQuery, useGetProductByCategoryIdQuery, useGetProductByCategoryListQuery, useGetProductFiltersQuery, useGetAllHotProductQuery } = productApi
