import React, {useEffect,useState } from 'react'
// import logo from '../assets/svg/logo.svg';
import '../scss/app.scss';
// import Home from './Home'
// import Footer from './Footer'
// import Nav from './Navcomp'
import { BrowserRouter, Route,Routes} from "react-router-dom";
import Login from './Login'
import Campus from './Campus';
import Admin from './Admin';
import Warden from './Warden';
import Student from './Student';
import Home from './Home'
import Head from './Head';
function App() {

  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Home/>} />
            {/* <Head/> */}
            <Route path="/Login" element={<Login/>} />
            <Route path="/Campus" element={<Campus/>} />
            <Route path="/student" element={<Student/>} />
            <Route path="/warden" element={<Warden/>} />
            <Route path="/admin" element={<Admin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App

