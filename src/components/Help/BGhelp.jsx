/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line no-unused-vars
import { faUser, faQuestionCircle, faInfoCircle, faBriefcase, faEnvelope, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
// Import Firebase Authentication (optional if using Firebase)
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebaseConfig'; // Update with your Firebase config path

function BGhelp() {
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
                <NavLink to="/home/blue/giver" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/bgabout" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  About
                </NavLink>
                <NavLink to="/BlueGivermessages" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Messages
                </NavLink>
                <NavLink to="/BGhelp" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Help
                </NavLink>
                <NavLink to="/BGaccount" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
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
            <p className="text-blue-600 mb-4">Blue Giver</p>
            <p className="text-gray-700 mb-4">{userInfo.email || 'Loading...'}</p>
            <p className="text-gray-600 mb-6">
              You are committed to helping those in need by volunteering your time and sharing your skills in community service.
            </p>
            <hr className="w-2/3 border-t border-gray-300 mb-6" />
            <p className="text-gray-600 mb-6">
              You can post jobs that align with their skills and expertise, allowing them to apply.
            </p>
            <button 
              className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
              onClick={() => navigate('/bgpost')}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
              Offer a Job
            </button>
          </div>
        </div>

        {/* Help content */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-black shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Help & Support</h2>

          {/* Tips Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Tips for Blue Givers</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Regularly update the jobs or opportunities you are offering to make them visible to seekers.</li>
              <li>Communicate clearly with applicants to ensure they understand the requirements and expectations.</li>
              <li>Be open to feedback from those you are helping, as it can improve your impact.</li>
              <li>Stay active and responsive to messages from potential seekers.</li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
            <div className="text-gray-700">
              <p className="mb-2">
                <strong>Q:</strong> How do I offer a job or opportunity?<br />
                <strong>A:</strong> Simply click the Offer a Job button, and fill out the required details. It will be posted for seekers to view.
              </p>
              <p className="mb-2">
                <strong>Q:</strong> How can I view the seekers applying to my posted jobs?<br />
                <strong>A:</strong> Navigate to the Messages section, where you can communicate with interested seekers.
              </p>
              <p className="mb-2">
                <strong>Q:</strong> How do I manage my account details?<br />
                <strong>A:</strong> You can update your account information by visiting the Account section.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-700 mb-4">
              If you have any further questions or need support, feel free to reach out to us.
            </p>
            <button 
              className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
              onClick={() => window.location.href = 'mailto:support@profile2career.com'}
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BGhelp;
