import { createSlice } from "@reduxjs/toolkit";

export const clockSlice= createSlice({
    name:"clocks",
    initialState:{
        display:1
    },
    reducers:{
        addDisplay:(state) =>{
            state.display+=1;
        },
    }
});

export const { addDisplay }= clockSlice.actions;
export default clockSlice.reducer