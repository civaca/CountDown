import { createSlice } from "@reduxjs/toolkit";



export const clockSlice= createSlice({
    name:"clocks",
    initialState:{
        display:{
            minitus:25,
            secon:0
        },
        breack:{
            minitus:5,
            secon:0
        },
        session:{
            minitus:25,
            secon:0
        }
    },
    reducers:{
        addDisplay:(state) =>{

            
            if (state.display.secon==0){
                state.display.secon=59;
                state.display.minitus-=1;   
            } else{
                state.display.secon-=1;
            } 
            {

            }
            
            
            
        },
        changeSession:(state)=>{
            if(state.display.minitus!==state.session){
                state.display.minitus=state.session.minitus;
                state.display.secon=0
            }
        },
        addSeLength:(state)=>{
            if(state.session.minitus<60){
            state.session.minitus+=1;
            state.session.secon=0}
        },
        restSeLength:(state)=>{
            if(state.session.minitus>1){
            state.session.minitus-=1;}
        },
        addBrLength:(state)=>{
            if(state.breack.minitus<60){
            state.breack.minitus+=1;
            state.breack.secon=0
        }
        },
        restBrLength:(state)=>{
            if(state.breack.minitus>1){
            state.breack.minitus-=1;
            state.breack.secon=0
        }
        },
        restart:(state)=>{
            state.display.minitus=25;
            state.display.secon=0;
            state.breack.minitus=5;
            state.breack.secon=0;
            state.session.minitus=25;
            state.session.secon=0;

        }

        
    }
});

export const { addDisplay, changeSession, addSeLength,restSeLength,addBrLength,restBrLength, restart }= clockSlice.actions;
export default clockSlice.reducer