/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faQuestionCircle, faInfoCircle, faBriefcase, faEnvelope, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
// Import Firebase Authentication (optional if using Firebase)
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebaseConfig'; // Update with your Firebase config path

function BShelp() {
  const navigate = useNavigate();

  // Define state to store user info
  const [userInfo, setUserInfo] = useState({
    bsname: '',
    bsemail: ''
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
      {/* Main Navbar */}
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
                <NavLink to="/home/blue/seeker" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/bsabout" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  About
                </NavLink>
                <NavLink to="/bsmessage" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Messages
                </NavLink>
                <NavLink to="/BShelp" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Help
                </NavLink>
                <NavLink to="/BSaccount" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Account <FontAwesomeIcon icon={faUser} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4 mt-28">
        {/* User information card */}
        <div className="sticky top-16 bg-white p-6 rounded-xl shadow-black shadow-lg col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-7xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{userInfo.name || 'Loading...'}</h2>
            <p className="text-blue-600 mb-4">Blue Seeker</p>
            <p className="text-gray-700 mb-4">{userInfo.email || 'Loading...'}</p>
            <p className="text-gray-600 mb-6">
              You are dedicated to finding the right opportunities by matching your skills with the jobs available.
            </p>
            <hr className="w-2/3 border-t border-gray-300 mb-6" />
            <p className="text-gray-600 mb-6">
              Apply to the jobs that suit your expertise and start your career journey with Profile2Career.
            </p>
            <button 
              className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
              onClick={() => navigate('/bsapply')}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
              Search Jobs
            </button>
          </div>
        </div>

        {/* Help content */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
          <div className="space-y-6">
            {/* Tips section */}
            <div>
              <h3 className="text-xl font-semibold mb-2">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-blue-600" />
                Tips for Blue Seekers
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Keep your profile updated with relevant skills and experiences.</li>
                <li>Regularly check for job postings that match your expertise.</li>
                <li>Set job alerts to be notified of new opportunities in your field.</li>
                <li>Utilize the messaging feature to communicate with potential employers.</li>
              </ul>
            </div>

            {/* FAQ section */}
            <div>
              <h3 className="text-xl font-semibold mb-2">
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2 text-blue-600" />
                Frequently Asked Questions
              </h3>
              <ul className="space-y-2">
                <li>
                  <strong>How do I apply for jobs?</strong><br />
                  You can apply for jobs by navigating to the Search Jobs page and submitting applications to the ones that align with your skills.
                </li>
                <li>
                  <strong>How do I update my profile?</strong><br />
                  Go to the Account page and update your information such as skills, education, and work experience.
                </li>
                <li> 
                  <strong>Can I contact employers directly?</strong><br />
                  Yes, you can use the Messages feature to communicate with employers who have posted jobs you are interested in.
                </li>
              </ul>
            </div>

            {/* Contact Us section */}
            <div>
              <h3 className="text-xl font-semibold mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-600" />
                Contact Us
              </h3>
              <p className="text-gray-700 mb-4">If you need further assistance, feel free to reach out to us.</p>
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

export default BShelp;
