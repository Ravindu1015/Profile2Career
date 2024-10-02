/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faQuestionCircle, faInfoCircle, faBriefcase, faEnvelope, faSearch } from '@fortawesome/free-solid-svg-icons';
// Import Firebase Authentication (optional if using Firebase)
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebaseConfig'; // Update with your Firebase config path

function WShelp() {
  const navigate = useNavigate();

  // Define state to store user info
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });

  // Fetch user info (using Firebase authentication as an example)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({
          name: user.displayName || 'Anonymous User / cant be fetched from Firestore',
          email: user.email || 'No Email Provided / cant be fetched from Firestore',
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
                <NavLink to="/home/white/seeker" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Home</NavLink>
                <NavLink to="/wsabout" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>About</NavLink>
                <NavLink to="/wsmessage" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Messages</NavLink>
                <NavLink to="/WShelp" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Help</NavLink>
                <NavLink to="/WSaccount" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
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
            <p className="text-blue-600 mb-4">White Seeker</p>
            <p className="text-gray-700 mb-4">{userInfo.email || 'Loading...'}</p>
            <p className="text-gray-600 mb-6">Seeking job opportunities in the white-collar sector.</p>
            <button 
              className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
              onClick={() => navigate('/wssearch')}
            >
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              Search Jobs
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
                Tips for White Seekers
              </h3>
              <ul className="list-disc list-inside text-gray-700 text-base leading-6">
                <li>Regularly update your profile to reflect your latest skills and achievements.</li>
                <li>Apply to jobs that align with your expertise and career goals.</li>
                <li>Follow up on your applications through the messaging feature.</li>
                <li>Prepare for interviews by researching the companies and the roles you are applying for.</li>
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
                  <strong>How do I search for jobs?</strong><br />
                  Navigate to the Search Jobs section, enter your criteria, and browse listings.
                </li>
                <li>
                  <strong>How do I apply for a job?</strong><br />
                  Click on a job listing and follow the steps to submit your application.
                </li>
                <li>
                  <strong>Can I update my application?</strong><br />
                  Yes, visit the Account page under My Applications to update or withdraw your submission.
                </li>
              </ul>
            </div>

            {/* Contact Us section */}
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-600" />
                Contact Us
              </h3>
              <p className="text-gray-700 text-base mb-4">For further assistance, feel free to contact us.</p>
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

export default WShelp;
