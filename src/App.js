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
   const [startStop,setStart]=useState(true);
   //true:NOt running
  //false:running
   const strings=useRef()
  const audio= document.getElementById("beep")
  
// first render
  useEffect(()=>{
  strings.current="Session"
 document.getElementById("timer-label").innerHTML="Session"
  } ,[])
  
  //Sound
  if (value.minitus==0 && value.secon==0){
      audio.play()
     }

//Stoper when timer reaches zeros
useEffect(()=>{
//Countdown Session
if (value.minitus==0 && value.secon==0 && strings.current=="Session" ){
 clearInterval(id.current)
  setTimeout(()=>{if(startStop==false){
    dispatch(reachesZero());
        strings.current="Break"
      clearInterval(id.current);
      id.current=setInterval(()=>dispatch(addDisplay()),1000);}
    },1000)
  
  
  }
  //Countdown Breack
  if (value.minitus==0 && value.secon==0 && strings.current=="Break"){
    clearInterval(id.current);
      setTimeout(()=>{dispatch(reachesZeroBreacks());
        strings.current="Session";
        clearInterval(id.current);
      id.current=setInterval(dispatch(()=>addDisplay(),1000));
      },1000)
      
    }
})

  
// Timer starts
let add=()=>{

  if(startStop){
    clearInterval(id.current);
    id.current=setInterval(()=>dispatch(addDisplay()),   1000);
    setStart(false)
  } else{
    clearInterval(id.current);
    setStart(true)

  }  
 }

 //Functions of buttons

  let stop1=()=>{
    clearInterval(id.current)
    if(startStop==false){
      setStart(true)}
      dispatch(restart())
      
      document.getElementById("timer-label").innerText="Session";
      strings.current="Session"
      document.getElementById("beep").load()
    }
// +- session
  let addSl=()=>{
    if(sessionTime.minitus<60 && startStop==true){
    dispatch(addSeLength());
    if( document.getElementById("timer-label").innerText=="Session" ){
      dispatch(changeSession())
    
    }}
    

  }
  let addRl=()=>{
      if(sessionTime.minitus>1 && startStop==true) {
    dispatch(restSeLength());
    if(document.getElementById("timer-label").innerText=="Session" ){
      dispatch(changeSession()); }}
    

  }
//+- breaks
  let addBre=()=>{
    if(breaks.minitus<60 && startStop==true) {
    dispatch(addBrLength());
    if (document.getElementById("timer-label").innerText=="Break" ){
      dispatch(changeDisplayBreacks())
    }
  
  }
  
}
  let resBre=()=>{
    if(breaks.minitus>1 && startStop==true) {
    dispatch(restBrLength());
    if (document.getElementById("timer-label").innerText=="Break"){
      dispatch(changeDisplayBreacks())
    }
  
  }

  }

  return (
    <div className="App">
      <h1 id="titlemain">25 + 5 Clock</h1>
      <div className="dis">
        <h2 id="break-label" >Breack Length</h2>
        <span ><h3 id="break-length">{breaks.minitus}</h3></span>
        <span className="length">
        <button className="btn btn-primary"onClick={resBre} id="break-decrement">-</button>
        <button className="btn btn-primary" onClick={addBre} id="break-increment">+</button>
        </span>
      </div>
      <div className="dis">
        <h2  id="session-label">Session Length</h2>
        <span ><h3 id="session-length">{sessionTime.minitus}</h3></span>
        <span  className="length">
        <button className="btn btn-primary" onClick={addRl} id="session-decrement">-</button>
        <button className="btn btn-primary" onClick={addSl} id="session-increment">+</button>
        </span>
      </div>
      <div className="display">
       <h1 id="timer-label">{strings.current}</h1>
        <h1  id="time-left" >{value.minitus.toString().padStart(2,"0")+":"+value.secon.toString().padStart(2,"0")}</h1></div>
       <div className="display">
        <button className="btn btn-info" id="start_stop"onClick={add}>Start</button>
        <button className="btn btn-info" id="reset" onClick={stop1}>Reset</button>
         </div>
        
    </div>
  );
}

export default App;
