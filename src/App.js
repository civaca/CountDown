import logo from './logo.svg';
import './App.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRef, useEffect, useState} from 'react';
import { addDisplay, addSeLength,changeSession,restSeLength,addBrLength,restBrLength, restart } from './redux/clockSlice';



function App() {
  const dispatch=useDispatch();
  const value=useSelector((state)=>state.clock.display);
  const breaks=useSelector((state)=>state.clock.breack);
  const sessionTime=useSelector((state)=>state.clock.session)
  const id=useRef();
  const startStop=useRef();
  useEffect(()=>{startStop.current=true},[])
  


  let add=()=>{

    if(startStop.current){
      clearInterval(id.current)
    id.current=setInterval(()=>dispatch(addDisplay()),1000)
    startStop.current=!startStop.current;
    console.log(startStop.current)
  } else{
    clearInterval(id.current)
    startStop.current=!startStop.current;
    console.log(startStop.current)
    
  }
   
  
    
 

  }
 
  let stop1=()=>{
    clearInterval(id.current)
    startStop.current=!startStop.current;
    dispatch(restart())
  
  }
  

  let addSl=()=>{
    clearInterval(id.current)
    startStop.current=!startStop.current;
    dispatch(addSeLength());
    dispatch(changeSession())
  }
  let addRl=()=>{
    clearInterval(id.current)
    startStop.current=!startStop.current;
    dispatch(restSeLength());
    dispatch(changeSession())
  }
  
  let addBre=()=>{
    clearInterval(id.current)
    startStop.current=!startStop.current;
    dispatch(addBrLength());
  }
  let resBre=()=>{
    clearInterval(id.current)
    startStop.current=!startStop.current;
    dispatch(restBrLength());
  }
  
  

  return (
    <div className="App">
      <h1>Hello </h1>
      <div id="break-label">
        <h2>Breack Length</h2>
        <span><p id="break-length">{breaks.minitus}</p><p>:{breaks.secon}</p></span>
        <button onClick={resBre} id="break-decrement">Bread drecrement</button>
        <button onClick={addBre} id="break-increment">Break increment</button>
      </div>
      <div id="session-label">
        <h2>Session Length</h2>
        <span><p id="session-length">{sessionTime.minitus}</p><p>:{sessionTime.secon}</p></span>
        <button onClick={addRl} id="session-decrement">Session drecrement</button>
        <button onClick={addSl} id="session-increment">Session increment</button>
      </div>
      <div>
        <h1 id="timer-label">Session</h1>
        <span><h1 >{value.minitus}</h1><h1>:{value.secon}</h1></span>
        <button id="start_stop"onClick={add}>Subir</button>
        <button id="reset" onClick={stop1}>Reset</button>
        </div>
    </div>
  );
}

export default App;
