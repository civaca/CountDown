import { createSlice } from "@reduxjs/toolkit";



export const clockSlice= createSlice({
    name:"clocks",
    initialState:{
        display:{
            minitus:25,
            secon:0,
            string:"Session"
        },
        breack:{
            minitus:5,
            secon:0
        },
        session:{
            minitus:25,
            secon:0
        },
        stringDisplay:'Session',
      
    },
    reducers:{
        addDisplay:(state) =>{
        
                if (state.display.secon==0){
                    state.display.secon=59;
                    state.display.minitus-=1;   
                } else{
                    state.display.secon-=1;
                }    
               
        },
        changeSession:(state)=>{
            if(state.display.minitus!==state.session.minitus){
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
            if(state.display.minitus!==state.breack.minitus && state.stringDisplay=="Breack"){
                state.display.minitus=state.breack.minitus;
                state.display.secon=0
            }

        },
        restBrLength:(state)=>{
            if(state.breack.minitus>1){
            state.breack.minitus-=1;
            state.breack.secon=0
        }
        if(state.display.minitus!==state.breack.minitus && state.stringDisplay=="Breack"){
            state.display.minitus=state.breack.minitus;
            state.display.secon=0
        }
        },
        restart:(state)=>{
            state.display.minitus=25;
            state.display.secon=0;
            state.breack.minitus=5;
            state.breack.secon=0;
            state.session.minitus=25;
            state.session.secon=0;
    

        },
        reachesZero:(state)=>{
            state.display.minitus=state.breack.minitus;
            
            
            
           
        },
        reachesZeroBreacks:(state)=>{
            state.display.minitus=state.session.minitus;
           
            
        },
        changeString:(state)=>{
           
            state.display.string="Breack";   
            
        
        },
        changeStringBreack:(state)=>{
            state.display.string="Session";
            
        }
               
    }
});

export const { addDisplay, changeSession, addSeLength,restSeLength,addBrLength,restBrLength, restart, reachesZero, reachesZeroBreacks,
     changeString, changeStringBreack}= clockSlice.actions;
export default clockSlice.reducer