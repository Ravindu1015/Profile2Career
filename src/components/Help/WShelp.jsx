/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faQuestionCircle, faInfoCircle, faBriefcase, faEnvelope, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
// Import Firebase Authentication (optional if using Firebase)
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebaseConfig'; // Update with your Firebase config path

function WShelp() {
  const navigate = useNavigate();

  // Define state to store user info
  const [userInfo, setUserInfo] = useState({
    wsname: '',
    wsemail: ''
  });

  // Fetch user info (using Firebase authentication as an example)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({
          name: user.displayName || 'Anonymous User',
          email: user.email || 'No Email Provided',
        });
      } else {
        // User is signed out, redirect to login or handle it
        navigate('/login');
      }
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, [navigate]);

  const navClass = 'bg-gray-100 text-gray-800';
  const activeLinkClass = 'bg-blue-400 text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-semibold font-title hover:shadow-lg hover:scale-105 transition duration-300';
  const defaultLinkClass = 'bg-white text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium font-title hover:shadow-lg hover:scale-105 transition duration-300';

  return (
    <div className="bg-gray-100 h-screen flex flex-col font-body">
      {/* Main Navbar */}
      <nav className={`${navClass} fixed top-0 left-0 right-0 shadow-md z-10`}>
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
                <NavLink to="/home/white/seeker" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/wsabout" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  About
                </NavLink>
                <NavLink to="/wsmessage" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Messages
                </NavLink>
                <NavLink to="/WShelp" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Help
                </NavLink>
                <NavLink to="/WSaccount" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Account <FontAwesomeIcon icon={faUser} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-6 mt-28">
        {/* User information card */}
        <div className="sticky top-16 bg-white p-6 rounded-xl shadow-lg col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-7xl text-gray-500" />
            </div>
            <h2 className="text-3xl font-bold mb-2">{userInfo.name || 'Loading...'}</h2>
            <p className="text-blue-600 text-xl mb-4">White Seeker</p>
            <p className="text-gray-700 text-base mb-4">{userInfo.email || 'Loading...'}</p>
            <p className="text-gray-600 text-lg mb-6">
              You are dedicated to finding the right opportunities and matching your skills with available jobs.
            </p>
            <hr className="w-2/3 border-t border-gray-300 mb-6" />
            <p className="text-gray-600 text-base mb-6">
              Explore job postings and apply for positions that align with your career goals.
            </p>
            <button 
              className="bg-blue-400 text-white px-4 py-2 rounded-full text-lg shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
              onClick={() => navigate('/wsapply')}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
              Find Jobs
            </button>
          </div>
        </div>

        {/* Help content */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Help & Support</h2>
          <div className="space-y-6">
            {/* Tips section */}
            <div>
              <h3 className="text-2xl font-semibold mb-2">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-600" />
                Tips for White Seekers
              </h3>
              <ul className="list-disc list-inside text-gray-700 text-lg">
                <li>Complete your profile with accurate and detailed information.</li>
                <li>Set job alerts to receive notifications for relevant job postings.</li>
                <li>Keep your resume updated and tailored for the roles you are applying for.</li>
                <li>Utilize networking opportunities to connect with potential employers.</li>
              </ul>
            </div>

            {/* FAQ section */}
            <div>
              <h3 className="text-2xl font-semibold mb-2">
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2 text-blue-600" />
                Frequently Asked Questions
              </h3>
              <ul className="space-y-2 text-lg">
                <li>
                  <strong>How do I apply for a job?</strong><br />
                  Navigate to the Find Jobs section, search for job postings, and apply directly through the platform.
                </li>
                <li>
                  <strong>How can I update my profile?</strong><br />
                  Go to the Account page and edit your profile information under Profile Settings.
                </li>
                <li>
                  <strong>How do I set up job alerts?</strong><br />
                  Access the Job Alerts section in your dashboard and configure alerts based on your job preferences.
                </li>
              </ul>
            </div>

            {/* Contact Us section */}
            <div>
              <h3 className="text-2xl font-semibold mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-600" />
                Contact Us
              </h3>
              <p className="text-gray-700 text-lg mb-4">If you need further assistance, feel free to reach out to us.</p>
              <button 
                className="bg-blue-400 text-white px-4 py-2 rounded-full text-lg shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
                onClick={() => window.location.href = 'mailto:support@profile2career.com'}
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Compose Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WShelp;
