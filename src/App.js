import logo from './logo.svg';
import './App.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRef, useEffect, useState} from 'react';
import { addDisplay, addSeLength,changeSession,restSeLength,addBrLength,restBrLength, restart,
  reachesZero, reachesZeroBreacks, changeString, changeStringBreack} from './redux/clockSlice';



function App() {
  const dispatch=useDispatch();
  const value=useSelector((state)=>state.clock.display);
  const breaks=useSelector((state)=>state.clock.breack);
  const sessionTime=useSelector((state)=>state.clock.session)
  const titleDisplay=useSelector((state)=>state.clock.stringDisplay)

   const id=useRef()
   const startStop=useRef()
   const strings=useRef()
  

  useEffect(()=>{
  startStop.current=true;
 strings.current="Session"
 document.getElementById("timer-label").innerText="Session"
  } ,[])






//Stoper when timer reaches zeros



if(value.minitus==0 && value.secon==0 && strings.current=="Session"){
  clearInterval(id.current);
  document.getElementById("beep").play()
  document.getElementById("timer-label").innerText="Breacks"
setTimeout(()=>{
 
   
   dispatch(reachesZero());
  
   strings.current="Breacks";
   
  
    }, 1000 )
    id.current=setInterval(()=>dispatch(addDisplay()),1000);
    }


// Breacks reaches zero


if(value.minitus==0 && value.secon==0 && strings.current=="Breacks"){
  clearInterval(id.current);
  document.getElementById("timer-label").innerText="Session";

  setTimeout(()=>{
    clearInterval(id.current);
    dispatch(reachesZeroBreacks());
   
    strings.current="Session";
    id.current=setInterval(()=>dispatch(addDisplay()),1000);

    },1000)

    
}




// Timer starts
let add=()=>{


  if(startStop.current){
    clearInterval(id.current);
    setTimeout(()=>{dispatch(addDisplay());
      id.current=setInterval(()=>dispatch(addDisplay()),1000);
      startStop.current=!startStop.current;
    },1000) 

   
    

  console.log(startStop.current, id.current)
  } else{
  clearInterval(id.current)
 startStop.current=!startStop.current;
  console.log(startStop.current)

  }
 }

 //Functions of buttons

  let stop1=()=>{


    if(startStop==false){
      startStop.current=!startStop.current;}
      dispatch(restart())
      clearInterval(id.current)
      document.getElementById("timer-label").innerText="Session";
      strings.current="Session"




  }


  let addSl=()=>{
    if(startStop.current){
    dispatch(addSeLength());
    dispatch(changeSession())}
  }
  let addRl=()=>{
      if(startStop.current) {
    dispatch(restSeLength());
    dispatch(changeSession())}
  }

  let addBre=()=>{
    if(startStop.current) {
    dispatch(addBrLength());}
  }
  let resBre=()=>{
    if(startStop.current) {
    dispatch(restBrLength());}
  }




  return (
    <div className="App">
      <h1>Hello </h1>
      <div id="break-label">
        <h2>Breack Length</h2>
        <span className="dis"><p id="break-length">{breaks.minitus}</p></span>
        <button onClick={resBre} id="break-decrement">Bread drecrement</button>
        <button onClick={addBre} id="break-increment">Break increment</button>
      </div>
      <div id="session-label">
        <h2>Session Length</h2>
        <span className="dis"><p id="session-length">{sessionTime.minitus}</p></span>
        <button onClick={addRl} id="session-decrement">Session drecrement</button>
        <button onClick={addSl} id="session-increment">Session increment</button>
      </div>
      <div>
       <span> <h1 id="timer-label"></h1>
        <h1 className="dis" id="time-left" >{+value.minitus.toString().padStart(2,"0")+":"+value.secon.toString().padStart(2,"0")}</h1></span>
        <button id="start_stop"onClick={add}>Start</button>
        <button id="reset" onClick={stop1}>Reset</button>
         <audio src='beep.wav' id='beep'/>



        </div>

    </div>
  );
}

export default App;
