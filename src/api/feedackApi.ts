import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import Feedback from "../interfaces/IFeedback";

export const feedbackApi = createApi({
    reducerPath: "feedbackApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
        getAllFeedbacks: builder.query<Feedback[], void>({
            query: () => `feedbacks`
        })
    })
})
export const { useGetAllFeedbacksQuery } = feedbackApi
