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
        putViewsProductById: builder.mutation<boolean, number>({
            query: (id) => ({
                url: `products/${id}/view`,
                method: 'PUT'
            }),
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
                let params = "products/filter?";
                if(filterState.name != ''){
                    params += `name=${filterState.name}&`
                }
                if(filterState.categories && filterState.categories.length != 0){
                    params += `categoryIds=${filterState.categories.map(c => c.id).join(',')}`;
                }if(filterState.priceRange?.from!=null){
                    params += `&minPrice=${filterState.priceRange.from}`;
                    // &maxPrice=${filterState.priceRange.from}`);
                }
                if(filterState.priceRange?.to!=null){
                    params += `&maxPrice=${filterState.priceRange.to}`;
                    // &maxPrice=${filterState.priceRange.from}`);
                }
                if(filterState.page){
                    params += `&page=${filterState.page}`;
                }
                if(filterState.rating!="all"){
                    params += `&minRating=${filterState.rating}`;
                }
                console.log("Hello! How a u?", params);
                return `${params}&size=8`;
            }
        }),
    }),
})
export const { useGetAllProductQuery, useGetProductByIdQuery, useGetProductByCategoryIdQuery, useGetProductByCategoryListQuery, useGetProductFiltersQuery, useGetAllHotProductQuery, usePutViewsProductByIdMutation } = productApi
