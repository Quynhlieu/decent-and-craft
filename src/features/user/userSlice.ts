import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import IUser from "../../interfaces/IUser.ts";
import users from "../../data/user.ts";

type initialStateProp = {
    error: string,
    user?: IUser,
}
const initialState: initialStateProp = {
    error: "",
    user: undefined,
};

const userFromSessionStorage = sessionStorage.getItem('user');
    if (userFromSessionStorage) {
        initialState.user = JSON.parse(userFromSessionStorage);
    }
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ email: string, password: string }>) {
            const {email, password} = action.payload;
            const user = users.find(u=>(u.email===email&&u.password===password));
            if(user){
                state.error="";
                state.user=user;
            }
            else{
                state.error="Đăng nhập thất bại";
            }
        }
    }
})
export default userSlice.reducer;
export const {login} = userSlice.actions;