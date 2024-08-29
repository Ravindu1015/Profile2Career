// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Firstpage from "./components/Welcome/Firstpage";
import PathSelectpage from './components/Welcome/PathSelectpage';
import BlueLoginpage from './components/Login/BlueLoginpage';
import WhiteLoginpage from './components/Login/WhiteLoginpage';
import BlueSignuppageS from './components/Login/BlueSignuppageS'; // Seeker Signup Page in Blue
import BlueSignupg from './components/Login/BlueSignupg'; // Giver Signup Page in Blue
import WhiteSignuppageS from './components/Login/WhiteSignuppageS'; // Seeker Signup Page in White
import WhiteSignupg from './components/Login/WhiteSignupg'; // Giver Signup Page in White
import BlueSeekerhome from './components/Home/BlueSeekerhome'; // Seeker Home Page in Blue
import BlueGiverhome from './components/Home/BlueGiverhome'; // Giver Home Page in Blue
import WhiteSeekerhome from './components/Home/WhiteSeekerhome'; // Seeker Home Page in White
import WhiteGiverhome from './components/Home/WhiteGiverhome'; // Giver Home Page in White

// import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/path-select" element={<PathSelectpage />} />
        <Route path="/login/blue" element={<BlueLoginpage />} />
        <Route path="/login/white" element={<WhiteLoginpage />} />
        
        {/* Seeker Signup Pages */}
        <Route path="/signup/blue/seeker" element={<BlueSignuppageS />} />
        <Route path="/signup/white/seeker" element={<WhiteSignuppageS />} />
        
        {/* Giver Signup Pages */}
        <Route path="/signup/blue/giver" element={<BlueSignupg />} />
        <Route path="/signup/white/giver" element={<WhiteSignupg />} />
        
        {/* Seeker and Giver Home Pages */}
        <Route path="/home/blue/seeker" element={<BlueSeekerhome />} /> {/* Ensure you have this component */}
        <Route path="/home/blue/giver" element={<BlueGiverhome />} /> {/* Ensure you have this component */}
        <Route path="/home/white/seeker" element={<WhiteSeekerhome />} /> {/* Ensure you have this component */}
        <Route path="/home/white/giver" element={<WhiteGiverhome />} /> {/* Ensure you have this component */}
        
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
