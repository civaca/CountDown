import './App.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRef, useEffect, useState} from 'react';
import { addDisplay, addSeLength,changeSession,restSeLength,addBrLength,restBrLength, restart,
  reachesZero, reachesZeroBreacks, changeDisplayBreacks} from './redux/clockSlice';



function App() {
// new states values
  const dispatch=useDispatch();
  const value=useSelector((state)=>state.clock.display);
  const breaks=useSelector((state)=>state.clock.breack);
  const sessionTime=useSelector((state)=>state.clock.session)
// constants values for set interval y display
   const id=useRef()
   const startStop=useRef()
   const strings=useRef()
  
// first render
  useEffect(()=>{
  startStop.current=true;
 strings.current="Session"
 document.getElementById("timer-label").innerText="Session"
  } ,[])


  

//Stoper when timer reaches zeros
if(value.minitus==0 && value.secon==1){
  setTimeout(()=>document.getElementById("beep").play(),1000)
}

if (value.minitus==0 && value.secon==0 && strings.current=="Session"){
document.getElementById("timer-label").innerText="Break";

clearInterval(id.current)
 setTimeout(()=>{dispatch(reachesZero());
    strings.current="Break"
    clearInterval(id.current);
    id.current=setInterval(()=>dispatch(addDisplay()),1000);
  },1000)

 
}

if (value.minitus==0 && value.secon==0 && strings.current=="Break"){
  document.getElementById("timer-label").innerText="Break"; 
  
  clearInterval(id.current);
    setTimeout(()=>{dispatch(reachesZeroBreacks());
      strings.current="Session"
      clearInterval(id.current);
    id.current=setInterval(()=>addDisplay(),1000);
    },1000)
    
  }
  
// Timer starts
let add=()=>{
  if(startStop.current){
    clearInterval(id.current);
    startStop.current=!startStop.current;
    id.current=setInterval(()=>dispatch(addDisplay()),   1000);
   
  } else{
  clearInterval(id.current)
 startStop.current=!startStop.current;
  }
 }

 //Functions of buttons

  let stop1=()=>{
    clearInterval(id.current)
    if(startStop==false){
      startStop.current=!startStop.current;}
      dispatch(restart())
      
      document.getElementById("timer-label").innerText="Session";
      strings.current="Session"
      document.getElementById("beep").load()
    }

  let addSl=()=>{
    if(startStop.current){
    dispatch(addSeLength());
    if(strings.current=="Session"){
      dispatch(changeSession())
    
    }}
  }
  let addRl=()=>{
      if(startStop.current) {
    dispatch(restSeLength());
    if(strings.current=="Session"){
      dispatch(changeSession()); }}
  }

  let addBre=()=>{
    if(startStop.current) {
    dispatch(addBrLength());
    if (strings.current=="Break"){
      dispatch(changeDisplayBreacks())
    }
  
  }
  
  
}
  let resBre=()=>{
    if(startStop.current) {
    dispatch(restBrLength());
    if (strings.current=="Break"){
      dispatch(changeDisplayBreacks())
    }
  
  }

    
  }





  return (
    <div className="App">
      <h1 id="titlemain">25 + 5 Clock</h1>
      <div id="break-label" className="dis">
        <h2>Breack Length</h2>
        <span ><h3 id="break-length">{breaks.minitus}</h3></span>
        <button className="btn btn-primary"onClick={resBre} id="break-decrement">-</button>
        <button className="btn btn-primary" onClick={addBre} id="break-increment">+</button>
      </div>
      <div id="session-label" className="dis">
        <h2>Session Length</h2>
        <span ><h3 id="session-length">{sessionTime.minitus}</h3></span>
        <button className="btn btn-primary" onClick={addRl} id="session-decrement">-</button>
        <button className="btn btn-primary" onClick={addSl} id="session-increment">+</button>
      </div>
      <div className="display">
       <h1 id="timer-label">{strings.current}</h1>
        <h1  id="time-left" >{value.minitus.toString().padStart(2,"0")+":"+value.secon.toString().padStart(2,"0")}</h1></div>
       <div className="display">
        <button className="btn btn-info" id="start_stop"onClick={add}>Start</button>
        <button className="btn btn-info" id="reset" onClick={stop1}>Reset</button>
         <audio src='beep.wav' id='beep'/>



        </div>
        
    </div>
  );
}

export default App;
