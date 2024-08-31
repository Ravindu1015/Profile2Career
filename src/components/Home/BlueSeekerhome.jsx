// eslint-disable-next-line no-unused-vars
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons';

function BlueSeekerhome() {
  const theme = 'white'; // Set theme for navbar styling

  const navClass = theme === 'white' ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800';
  const activeLinkClass = theme === 'white' ? 'bg-blue-400 text-black shadow-lg' : 'bg-blue-400 text-black shadow-lg';

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Navbar */}
      <nav className={`${navClass} fixed top-0 left-0 right-0 shadow-md`}>
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
                  to="/home" 
                  className={({ isActive }) => 
                    `bg-white text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                      isActive ? activeLinkClass : 'hover:shadow-lg hover:scale-105'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => 
                    `bg-white text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                      isActive ? activeLinkClass : 'hover:shadow-lg hover:scale-105'
                    }`
                  }
                >
                  About
                </NavLink>
                <NavLink 
                  to="/messages" 
                  className={({ isActive }) => 
                    `bg-white text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                      isActive ? activeLinkClass : 'hover:shadow-lg hover:scale-105'
                    }`
                  }
                >
                  Messages
                </NavLink>
                <NavLink 
                  to="/help" 
                  className={({ isActive }) => 
                    `bg-white text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                      isActive ? activeLinkClass : 'hover:shadow-lg hover:scale-105'
                    }`
                  }
                >
                  Help
                </NavLink>
                <NavLink 
                  to="/account" 
                  className={({ isActive }) => 
                    `bg-white text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                      isActive ? activeLinkClass : 'hover:shadow-lg hover:scale-105'
                    }`
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

      <main className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Blue Seeker Home</h1>
      </main>
    </div>
  );
}

export default BlueSeekerhome;
