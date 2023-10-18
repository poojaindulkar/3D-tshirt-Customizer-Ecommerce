import React ,{useEffect}from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Customizer from "./Customizer"
import Canvas from "../canvas"
import "../main.css"
import CustomHome from './CustomHome';
import Header  from '../components/Layout/Header';
import { useSnapshot } from 'valtio';
import state from '../store';
const Custom = () => {
  const snap = useSnapshot(state);
  
  return (
    <div>
    {snap.Home && (<div className="app transition-all-ease-in">
         <Routes>    
    
          <Route path="/" element={<CustomHome/>} />
               
        </Routes>
        <Canvas />
        <Customizer />
        
    </div>)}
    </div>
  )
}

export default Custom