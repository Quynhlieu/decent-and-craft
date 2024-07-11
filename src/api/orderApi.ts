import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url.ts";
import IOrder from "../interfaces/IOrder.ts";

interface CreateOrder {
    voucherId?: number;
    addressId: number;
    notice?: string;
    shipment: string;
    shippingFee: number;
    userId: number;
    orderDetails: {
        productId: number;
        price: number;
        quantity: number;
    }[];
}
export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["PUT", "POST"],
    endpoints: (builder) => {
        return ({
            getOrderList: builder.query<IOrder[], number>({
                query: (userId: number) => `users/${userId}/orders`,
                providesTags: ["PUT", "POST"]
            }),
            createOrder: builder.mutation<IOrder, CreateOrder>({
                query: (createOrder) => ({
                    url: `users/${createOrder.userId}/orders`,
                    method: 'POST',
                    body: createOrder,
                }),
                invalidatesTags:["POST"]
            }),
        })
    }

})

export const {useGetOrderListQuery} = orderApi;