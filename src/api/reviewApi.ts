import { AddReviewDto, UpdateReviewDto } from './../features/productDetail/productDetailSlice';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import { IReview } from "../features/productDetail/productDetailSlice";
import IUser from "../interfaces/IUser";
export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ['Review'],
    endpoints: (builder) => ({
        getAllReviewsByProductId: builder.query<IReview[], number>({
            query: (id: number) => `product-detail/${id}/reviews`,
            providesTags: (result, error, id) => [{ type: 'Review', id }],
        }),
        getUser: builder.query<IUser, number>({
            query: (id: number) => `users/${id}`,
        }),
        addReview: builder.mutation<IReview, AddReviewDto>({
            query: (request) => ({
                url: `product-detail/${request.productId}/reviews`,
                method: 'POST',
                body: request,
            }),
            invalidatesTags: (result, error, { productId }) => [{ type: 'Review', id: productId }],
        }),
        updateReview: builder.mutation<IReview, UpdateReviewDto>({
            query: (request) => ({
                url: `product-detail/${request.productId}/reviews/${request.reviewId}`,
                method: 'PUT',
                body: request,
            }),
            invalidatesTags: (result, error, { productId }) => [{ type: 'Review', id: productId }],
        }),
        filterRating: builder.query<IReview[], { productId: number, rating: number }>({
            query: ({ productId, rating }) => `product-detail/${productId}/reviews/filter?rating=${rating}`,
            providesTags: (result, error, { productId }) => [{ type: 'Review', id: productId }],
        }),
    }),
})
export const {  useGetAllReviewsByProductIdQuery , useAddReviewMutation, useGetUserQuery, useUpdateReviewMutation  } = reviewApi