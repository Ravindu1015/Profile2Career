// eslint-disable-next-line no-unused-vars
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons';

function WhiteGiverhome() {
  const theme = 'white'; // Set theme for navbar styling

  const navClass = theme === 'white' ? 'bg-gray-100 text-gray-800' : 'bg-blue-800 text-white';
  const activeLinkClass = 'bg-blue-400 text-black shadow-lg'; // Active button styling for current page
  const defaultLinkClass = 'bg-white text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';

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

      <main className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to White Giver Home</h1>
      </main>
    </div>
  );
}

export default WhiteGiverhome;
