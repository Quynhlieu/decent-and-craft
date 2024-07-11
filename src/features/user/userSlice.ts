import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../../interfaces/IUser.ts";

type InitialState = {
    error: string;
    user?: IUser;
};

const userFromSessionStorage = sessionStorage.getItem('user');
const initialState: InitialState = {
    error: "",
    user: userFromSessionStorage ? JSON.parse(userFromSessionStorage) : undefined,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateInfo(state, action: PayloadAction<IUser>) {
            state.user = { ...state.user, ...action.payload };
            sessionStorage.setItem('user', JSON.stringify(state.user));
        },
        logout(state) {
            state.user = undefined;
            sessionStorage.removeItem('user');
        },
    },
});

export default userSlice.reducer;
export const { updateInfo, logout } = userSlice.actions;
