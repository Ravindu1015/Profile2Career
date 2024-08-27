// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Firstpage from "./components/Welcome/Firstpage";
import PathSelectpage from './components/Welcome/PathSelectpage';
import BlueLoginpage from './components/Login/BlueLoginpage'; // Ensure this path is correct
import WhiteLoginpage from './components/Login/WhiteLoginpage';
import WhiteSignuppageS from './components/Login/WhiteSignuppageS'; // Seeker Signup Page
import WhiteSignupg from './components/Login/WhiteSignupg'; // Giver Signup Page (Ensure path is correct)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/path-select" element={<PathSelectpage />} />
        <Route path="/login/blue" element={<BlueLoginpage />} />
        <Route path="/login/white" element={<WhiteLoginpage />} />
        
        {/* Seeker Signup Page */}
        <Route path="/signup/white" element={<WhiteSignuppageS />} />
        
        {/* Giver Signup Page */}
        <Route path="/signup/giver" element={<WhiteSignupg />} /> {/* Add the Giver signup page route */}
        <Route path="/signup/white/giver" element={<WhiteSignupg />} />
        <Route path="/signup/white/seeker" element={<WhiteSignuppageS />} />
        
        
        {/* Other routes can go here */}
      </Routes>
    </Router>
  );
}

export default App;
