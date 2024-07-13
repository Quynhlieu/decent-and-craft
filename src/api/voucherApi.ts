import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import Voucher from "../interfaces/IVoucher";

export const voucherApi = createApi({
    reducerPath: "voucherApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
        getAllVouchers: builder.query<Voucher[], void>({
            query: () => `vouchers`
        })
    })
})
export const { useGetAllVouchersQuery} = voucherApi 
