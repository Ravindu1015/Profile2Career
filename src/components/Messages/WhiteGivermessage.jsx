// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faEnvelope, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
// Import Firebase Authentication (optional if using Firebase)
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebaseConfig'; // Update with your Firebase config path

function WhiteGivemessage() {
  const navigate = useNavigate();

  // State for user info
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });

  // State for job postings and applications
  const [jobs, setJobs] = useState([]);
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

    // Fetch job postings and applications (mock data for now)
    setJobs([
      { id: 1, title: "Software Engineer", date: "2024-09-13", time: "10:00 AM" },
      { id: 2, title: "Product Manager", date: "2024-09-12", time: "11:30 AM" }
    ]);
    setApplications([
      { id: 1, jobTitle: "Software Engineer", applicant: "John Doe", date: "2024-09-14", status: "pending" }
    ]);

    // Mock unread messages count
    setUnreadMessages(3);

    return () => unsubscribe();
  }, [navigate]);

  const handleAccept = (id) => {
    // Logic to accept applicant
    alert(`Applicant ${id} accepted`);
  };

  const handleReject = (id) => {
    // Logic to reject applicant
    alert(`Applicant ${id} rejected`);
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col font-body">
      {/* Main Navbar */}
      <nav className="bg-white fixed top-0 left-0 right-0 shadow-md z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <FontAwesomeIcon icon={faBriefcase} className="text-3xl mr-2" />
              <NavLink to="/" className="text-3xl font-extrabold font-title">
                Profile2Career
              </NavLink>
            </div>
            <div className="flex-1 flex items-center justify-end">
              <div className="flex space-x-4">
                <NavLink to="/home/white/giver" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-600'}>
                  Home
                </NavLink>
                <NavLink to="/wgabout" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-600'}>
                  About
                </NavLink>
                <NavLink to="/wgmessage" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-600'}>
                  Messages
                </NavLink>
                <NavLink to="/WGhelp" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-600'}>
                  Help
                </NavLink>
                <NavLink to="/WGaccount" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-600'}>
                  Account <FontAwesomeIcon icon={faUser} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 grid grid-cols-3 gap-4 p-6 mt-28">
        {/* User Information */}
        <div className="sticky top-16 bg-white p-6 rounded-xl shadow-lg col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-7xl text-gray-500" />
            </div>
            <h2 className="text-3xl font-bold mb-2">{userInfo.name || 'Loading...'}</h2>
            <p className="text-blue-600 text-xl mb-4">White Giver</p>
            <p className="text-gray-700 text-base mb-4">{userInfo.email || 'Loading...'}</p>
            <p className="text-gray-600 text-lg mb-6">
              You have posted jobs to find top talent for your organization.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Messages and Activity</h2>
          <div className="space-y-6">
            {/* Job Postings */}
            <div>
              <h3 className="text-2xl font-semibold mb-2">Your Job Postings</h3>
              <ul className="list-disc list-inside text-gray-700 text-lg">
                {jobs.map(job => (
                  <li key={job.id}>
                    {job.title} - {job.date} at {job.time}
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div>
              <h3 className="text-2xl font-semibold mb-2">Applications</h3>
              <ul className="space-y-2 text-lg">
                {applications.map(app => (
                  <li key={app.id}>
                    <strong>{app.applicant}</strong> applied for {app.jobTitle} on {app.date}
                    <div className="mt-2">
                      <button 
                        className="bg-green-400 text-white px-4 py-2 rounded-full text-lg shadow-md hover:bg-green-500 transition duration-300"
                        onClick={() => handleAccept(app.id)}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                        Accept
                      </button>
                      <button 
                        className="bg-red-400 text-white px-4 py-2 rounded-full text-lg shadow-md hover:bg-red-500 ml-4 transition duration-300"
                        onClick={() => handleReject(app.id)}
                      >
                        <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                        Reject
                      </button>
                    </div>
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
    </div>
  );
}

export default WhiteGivemessage;
