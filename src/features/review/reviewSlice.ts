import { PayloadAction, createSlice } from "@reduxjs/toolkit";

 type ReviewFormType = {
    rating:number,
    contents?:string,
    isShow: boolean,
    key: number,
}
const initialState:ReviewFormType = {
    rating:0,
    contents:"",
    isShow: false,
    key:0,
}; 
const reviewSlice = createSlice({
    name:"review",
    initialState,
    reducers:{
        setRating(state,action:PayloadAction<number>){
            state.rating = action.payload;
        },
        setContents(state,action:PayloadAction<string>){
            state.contents = action.payload;
        },
        setIsShow(state, action: PayloadAction<boolean>){
            state.isShow = action.payload;
        },
        setKey(state, action: PayloadAction<number>){
            state.key = action.payload;
        }
    }

})
export default reviewSlice.reducer;
export const {setRating,setContents, setIsShow, setKey} = reviewSlice.actions;