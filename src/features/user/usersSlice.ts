import User from "../../interfaces/IUser.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import users from "../../data/user.ts";
import {toast} from "react-toastify";
import IUser from "../../interfaces/IUser.ts";

type initialStateProp = {
    error: string,
    user?: IUser,
}
const initialState: initialStateProp = {
    error: "",
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        register(state, action: PayloadAction<User>) {
            const user = action.payload;
            if(user){
                const existingUser = users.find(u => u.email === user.email)
                if(existingUser){
                    state.error="Người dùng đã tồn tại!";
                    return state;
                }
                else{
                    state.error="";
                    state.user=user
                    users.push(user);
                    toast.success("Bạn đã đăng kí thành công!");
                    return state;
                }
            }
        },

    }
})
export default usersSlice.reducer;
export const {register} = usersSlice.actions;