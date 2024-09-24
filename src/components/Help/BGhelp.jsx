/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faQuestionCircle, faInfoCircle, faBriefcase, faEnvelope, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
// Import Firebase Authentication (optional if using Firebase)
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebaseConfig'; // Update with your Firebase config path

function BGhelp() {
  const navigate = useNavigate();

  // Define state to store user info
  const [userInfo, setUserInfo] = useState({
    bgname: '',
    bgemail: ''
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
  const activeLinkClass = 'bg-blue-400 text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';
  const defaultLinkClass = 'bg-white text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Navbar */}
      <nav className={`${navClass} fixed top-0 left-0 right-0 shadow-md z-10`}>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <FontAwesomeIcon icon={faBriefcase} className="text-2xl mr-2" />
              <NavLink to="/" className="text-2xl font-bold">
                Profile2Career
              </NavLink>
            </div>
            <div className="flex-1 flex items-center justify-end">
              <div className="flex space-x-4">
                <NavLink to="/home/blue/giver" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Home</NavLink>
                <NavLink to="/bgabout" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>About</NavLink>
                <NavLink to="/bgmessage" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Messages</NavLink>
                <NavLink to="/BGhelp" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Help</NavLink>
                <NavLink to="/BGaccount" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Account <FontAwesomeIcon icon={faUser} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4 mt-16">
        {/* User information card */}
        <div className="sticky top-16 bg-white p-6 rounded-xl shadow-black shadow-lg col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-7xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{userInfo.name || 'Loading...'}</h2>
            <p className="text-blue-600 mb-4">Blue Giver</p>
            <p className="text-gray-700 mb-4">{userInfo.email || 'Loading...'}</p>
            <p className="text-gray-600 mb-6">Committed to providing job opportunities for blue-collar workers.</p>
            <button 
              className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
              onClick={() => navigate('/bgpost')}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
              Post a Job
            </button>
          </div>
        </div>

        {/* Help content */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Help & Support</h1>
          <div className="space-y-8">
            {/* Tips section */}
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-600" />
                Tips for Blue Givers
              </h3>
              <ul className="list-disc list-inside text-gray-700 text-base leading-6">
                <li>Ensure job postings are clear with all relevant details for blue-collar roles.</li>
                <li>Regularly review applicants to find the right fit for your open positions.</li>
                <li>Use messaging features to communicate quickly with applicants.</li>
                <li>Consider practical on-site interviews where necessary.</li>
              </ul>
            </div>

            {/* FAQ section */}
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center">
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2 text-blue-600" />
                Frequently Asked Questions
              </h3>
              <ul className="space-y-4 text-base text-gray-700">
                <li>
                  <strong>How do I post a job?</strong><br />
                  Navigate to the Post a Job section, fill in the details, and submit your posting.
                </li>
                <li>
                  <strong>How do I view applications?</strong><br />
                  Go to the Messages section to view and contact applicants.
                </li>
                <li>
                  <strong>Can I edit or remove a job posting?</strong><br />
                  Yes, you can edit or delete posts from the Account section under My Jobs.
                </li>
              </ul>
            </div>

            {/* Contact Us section */}
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-600" />
                Contact Us
              </h3>
              <p className="text-gray-700 text-base mb-4">For further help, feel free to reach out to us.</p>
              <button 
                className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
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

export default BGhelp;
