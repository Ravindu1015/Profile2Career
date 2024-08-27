// src/App.jsx

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Firstpage from "./components/Welcome/Firstpage";
import PathSelectpage from './components/Welcome/PathSelectpage';
 // Ensure this path is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/path-select" element={<PathSelectpage />} />
        {/* Other routes can go here */}
      </Routes>
    </Router>
  );
}

export default App;
