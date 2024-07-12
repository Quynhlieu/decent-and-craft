import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url.ts";
import IAddress from "../interfaces/IAddress.ts";

export interface AddAddress {
    userId: number;
    province: string;
    district: string;
    ward: string;
    description: string;
    fullName: string;
    phoneNumber: string;
    isDefault: boolean;
}

export interface UpdateAddress {
    addressId: number;
    userId: number;
    province: string;
    district: string;
    ward: string;
    description: string;
    fullName: string;
    phoneNumber: string;
    isDefault: boolean;
}

export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["PUT", "POST"],
    endpoints: (builder) => {
        return ({
            getAddressList: builder.query<IAddress[], number>({
                query: (userId: number) => `users/${userId}/address`,
                providesTags: ["PUT", "POST"]
            }),
            addAddress: builder.mutation<IAddress, AddAddress>({
                query: (newAddress) => ({
                    url: `users/${newAddress.userId}/address`,
                    method: 'POST',
                    body: newAddress,
                }),
                invalidatesTags:["POST"]
            }),
            updateAddress: builder.mutation<IAddress, UpdateAddress>({
                query: (updateAddress) => ({
                    url: `users/${updateAddress.userId}/address/${updateAddress.addressId}`,
                    method: 'PUT',
                    body: updateAddress,
                }),
                invalidatesTags:["PUT"]
            }),
        })
    }
})
export const {useUpdateAddressMutation, useGetAddressListQuery, useAddAddressMutation} = addressApi