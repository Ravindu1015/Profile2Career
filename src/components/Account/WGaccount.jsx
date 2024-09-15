
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line no-unused-vars
import { faBriefcase, faUser, faPlusCircle, faUserCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { auth, db, doc, getDoc } from '../../firebaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth';
import './WGaccount.css'; 

function WGaccount() {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        const userDocRef = doc(db, 'whitegivers', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserInfo(userDocSnap.data());
        } else {
          setUserInfo({ name: 'No data', email: 'No data' });
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 shadow-md z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <FontAwesomeIcon icon={faBriefcase} className="text-2xl mr-2" />
              <NavLink to="/" className="text-2xl font-bold font-cute">
                Profile2Career
              </NavLink>
            </div>
            <div className="flex-1 flex items-center justify-end">
              <div className="flex space-x-4">
                <NavLink to="/home/white/giver" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-600'}>Home</NavLink>
                <NavLink to="/wgabout" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-600'}>About</NavLink>
                <NavLink to="/wgmessage" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-600'}>Message</NavLink>
                <NavLink to="/wghelp" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-600'}>Help</NavLink>
                <NavLink to="/wgaccount" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-600'}>
                  Account <FontAwesomeIcon icon={faUser} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 p-4 mt-16 relative">
        {/* Expandable User Info Grid */}
        <div className={`user-info-grid ${isExpanded ? 'expanded' : ''}`}>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-7xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{userInfo.name || 'Loading...'}</h2>
            <p className="text-gray-700 mb-4">{userInfo.email || 'Loading...'}</p>
            <button
              className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className={`content-area ${isExpanded ? 'expanded' : ''}`}>
          {/* Your main content here */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Account Details</h1>
          <p className="text-gray-700 mb-4">Here you can manage your account details and settings.</p>
        </div>
      </div>
    </div>
  );
}

export default WGaccount;
