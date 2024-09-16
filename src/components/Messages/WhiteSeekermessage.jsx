// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line no-unused-vars
import { faUser, faEnvelope, faCheckCircle, faTimesCircle, faBriefcase } from '@fortawesome/free-solid-svg-icons';
// Import Firebase Authentication (optional if using Firebase)
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebaseConfig'; // Update with your Firebase config path

function WhiteSeekermessage() {
  const navigate = useNavigate();

  // State for user info
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });

  // State for job applications and messages
  const [applications, setApplications] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Fetch user info (using Firebase authentication)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({
          name: user.displayName || 'Anonymous User',
          email: user.email || 'No Email Provided',
        });
      } else {
        navigate('/login');
      }
    });

    // Fetch applications and messages (mock data for now)
    setApplications([
      { id: 1, jobTitle: "Software Engineer", company: "TechCorp", date: "2024-09-14", status: "pending" },
      { id: 2, jobTitle: "Product Manager", company: "Innovate Ltd.", date: "2024-09-10", status: "accepted" }
    ]);

    // Mock unread messages count
    setUnreadMessages(2);

    return () => unsubscribe();
  }, [navigate]);

  const navClass = 'bg-gray-100 text-gray-800';
  const activeLinkClass = 'bg-blue-400 text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';
  const defaultLinkClass = 'bg-white text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';

  return (
    <div className="bg-gray-100 h-screen flex flex-col font-body">
      {/* Navbar */}
      <nav className={`${navClass} fixed top-0 left-0 right-0 shadow-md z-10`}>
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
                <NavLink to="/home/white/seeker" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Home</NavLink>
                <NavLink to="/wsabout" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>About</NavLink>
                <NavLink to="/wsmessage" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Messages</NavLink>
                <NavLink to="/wshelp" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Help</NavLink>
                <NavLink to="/wsaccount" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Account <FontAwesomeIcon icon={faUser} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4 mt-16">
        {/* User Information */}
        <div className="sticky top-16 bg-white p-6 rounded-xl shadow-black shadow-lg col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-7xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{userInfo.name || 'Loading...'}</h2>
            <p className="text-blue-600 mb-4">White Seeker</p>
            <p className="text-gray-700 mb-4">{userInfo.email || 'Loading...'}</p>
            <p className="text-gray-600 mb-6">
              You have applied for jobs to advance your career.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Messages and Activity</h1>

          {/* Job Applications */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Your Applications</h2>
            <ul className="space-y-4">
              {applications.map(app => (
                <li key={app.id} className="bg-gray-50 p-4 rounded-lg shadow-md shadow-blue-300">
                  You applied for <span className="text-xl font-semibold">{app.jobTitle}</span> at {app.company} on {app.date}.
                  <span className={`ml-4 px-2 py-1 rounded-full text-sm ${app.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {app.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Unread Messages */}
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-blue-600 text-2xl mr-2" />
            <p className="text-lg">You have {unreadMessages} unread messages.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhiteSeekermessage;
