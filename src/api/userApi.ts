import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import BASE_URL from "./url";
import IUser from "../interfaces/IUser"

export interface UserRegister {
    email: string
    password: string
    fullName: string
}

export interface UserLogin {
    email: string
    password: string
}

export interface UserChangePassword {
    userId: number
    currentPassword: string
    newPassword: string
}

export interface UserUpdate{
    userId: number
    fullName: string
    phone: string
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: (builder) => {
        return ({
            register: builder.mutation<IUser, UserRegister>({
                query: (userRegister) => ({
                    url: 'users/register',
                    method: 'POST',
                    body: userRegister,
                }),
            }),
            login: builder.mutation<IUser, UserLogin>({
                query: (userLogin) => ({
                    url: 'users/login',
                    method: 'POST',
                    body: userLogin,
                })
            }),
            changePassword: builder.mutation<IUser, UserChangePassword>({
                query: (userChangePassword) =>({
                    url: `users/${userChangePassword.userId}/change-password`,
                    method: "PUT",
                    body: userChangePassword,
                })
            }),
            updateInfoUser: builder.mutation<IUser, UserUpdate>({
                query:(userUpdate)=>({
                    url: `users/${userUpdate.userId}`,
                    method: "PUT",
                    body: userUpdate,
                })
            })
        });
    },
});

export const { useRegisterMutation, useLoginMutation, useChangePasswordMutation, useUpdateInfoUserMutation } = userApi;
