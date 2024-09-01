// eslint-disable-next-line no-unused-vars
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUser, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function WhiteGiverhome() {
  const navigate = useNavigate(); // React Router's useNavigate hook
  const theme = 'white'; // Set theme for navbar styling

  const navClass = theme === 'white' ? 'bg-gray-100 text-gray-800' : 'bg-blue-800 text-white';
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
              <NavLink to="/" className="text-2xl font-bold font-cute">
                Profile2Career
              </NavLink>
            </div>
            <div className="flex-1 flex items-center justify-end">
              <div className="flex space-x-4">
                <NavLink 
                  to="/wghome" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/wgabout" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  About
                </NavLink>
                <NavLink 
                  to="/wgmessages" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  Messages
                </NavLink>
                <NavLink 
                  to="/wghelp" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  Help
                </NavLink>
                <NavLink 
                  to="/wgaccount" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  Account 
                  <FontAwesomeIcon icon={faUser} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4 mt-16">
        {/* User information card (left side) */}
        <div className="sticky top-16 bg-white p-6 rounded-xl shadow-black shadow-lg col-span-1" style={{ padding: '0.50in' }}>
          <div className="flex flex-col items-center text-center">
            {/* Enlarged Profile Picture */}
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-7xl text-gray-500" />
            </div>

            {/* User Information */}
            <h2 className="text-2xl font-bold mb-2">John Doe</h2>
            <p className="text-blue-600 mb-4">White Giver</p>
            <p className="text-gray-700 mb-4">johndoe@example.com</p>

            {/* Lengthier Role Description */}
            <p className="text-gray-600 mb-6">
              You are committed to helping those in need by volunteering your time and sharing your skills in community service. 
            </p>

            {/* Horizontal Line */}
            <hr className="w-2/3 border-t border-gray-300 mb-6" />

            {/* "Going to Offer a Job" Section */}
            <p className="text-gray-600 mb-6">
              You can post jobs that align with their skills and expertise, allowing them to apply
            </p>
            <button 
              className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
              onClick={() => navigate('../wgpost')}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
              Offer a Job
            </button>
          </div>
        </div>

        {/* Other content (right side) */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to White Giver Home</h1>
          <p className="text-gray-800">
            This is the main content area where you can display various information related to the user, tasks, or other details.
          </p>
          {/* Add more content here */}
        </div>
      </div>
    </div>
  );
}

export default WhiteGiverhome;
