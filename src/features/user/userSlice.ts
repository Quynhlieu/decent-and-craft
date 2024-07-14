import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../../interfaces/IUser.ts";

// type 1 is normal user, type 2 is google login user
type InitialState = {
    error: string;
    user?: IUser;
    type: number;
};

const userFromSessionStorage = sessionStorage.getItem('user');
const initialState: InitialState = {
    error: "",
    type: 1,
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
        setUserType(state, action: PayloadAction<number>) {
            state.type = action.payload;
        },
        logout(state) {
            state.user = undefined;
            sessionStorage.clear();
        },
    },
});

export default userSlice.reducer;
export const { updateInfo, logout, setUserType } = userSlice.actions;
