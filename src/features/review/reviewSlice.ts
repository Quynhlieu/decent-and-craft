import { PayloadAction, createSlice } from "@reduxjs/toolkit";

 type ReviewFormType = {
    rating:number,
    contents?:string,
}
const initialState:ReviewFormType = {
    rating:0,
    contents:""}; 
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
        
    }

})
export default reviewSlice.reducer;
export const {setRating,setContents} = reviewSlice.actions;