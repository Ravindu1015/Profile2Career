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
import BlueGiverabout from './components/About/BlueGiverabout';
import BGaccount from './components/Account/BGaccount';
import BGhelp from './components/Help/BGhelp';
import BlueGivermessages from './components/Messages/BlueGivermessages';
import BlueSeekerabout from './components/About/BlueSeekerabout';
import BSaccount from './components/Account/BSaccount';
import BShelp from './components/Help/BShelp';
import BlueSeekermessages from './components/Messages/BlueSeekermessages';
import WhiteGiverabout from './components/About/WhiteGiverabout';
import WGaccount from './components/Account/WGaccount';
import WGhelp from './components/Help/WGhelp';
import WhiteGivermessages from './components/Messages/WhiteGivermessages';
import WhiteSeekerabout from './components/About/WhiteSeekerabout';
import WSaccount from './components/Account/WSaccount';
import WShelp from './components/Help/WShelp';
import WhiteSeekermessages from './components/Messages/WhiteSeekermessages';
// eslint-disable-next-line no-unused-vars
import WGpost from './components/Post/wgpost';
// eslint-disable-next-line no-unused-vars
import BGpost from './components/Post/bgpost';


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

        <Route path="/bghome" element={<BlueGiverhome />} />
        <Route path="/bgabout" element={<BlueGiverabout />} />
        <Route path="/bgaccount" element={<BGaccount />} />
        <Route path="/bghelp" element={<BGhelp />} />
        <Route path="/bgmessage" element={<BlueGivermessages />} />
        <Route path="/bshome" element={<BlueSeekerhome />} />
        <Route path="/bsabout" element={<BlueSeekerabout />} /> 
        <Route path="/bsaccount" element={<BSaccount />} />
        <Route path="/bshelp" element={<BShelp />} />
        <Route path="/bsmessage" element={<BlueSeekermessages />} />


        <Route path="/wghome" element={<WhiteGiverhome />} />
        <Route path="/wgabout" element={<WhiteGiverabout />} />
        <Route path="/wgaccount" element={<WGaccount />} />
        <Route path="/wghelp" element={<WGhelp />} />
        <Route path="/wgmessage" element={<WhiteGivermessages />} />
        <Route path="/wshome" element={<WhiteSeekerhome />} />
        <Route path="/wsabout" element={<WhiteSeekerabout />} />
        <Route path="/wsaccount" element={<WSaccount />} />
        <Route path="/wshelp" element={<WShelp />} />
        <Route path="/wsmessage" element={<WhiteSeekermessages />} />

        <Route path="/wgpost" element={<WGpost />} />
        <Route path="/bgpost" element={<BGpost />} />

        
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;