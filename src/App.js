import logo from './logo.svg';
import './App.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addDisplay } from './redux/clockSlice';

function App() {
  const dispatch=useDispatch();
  const value=useSelector((state)=>state.clock.display)
  return (
    <div className="App">
      <h1>Hello </h1>
        <h1>{value}</h1>
        <button onClick={()=>dispatch(addDisplay())}>Subir</button>
        
    </div>
  );
}

export default App;
