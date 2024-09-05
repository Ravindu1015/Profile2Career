// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons';
import { db, collection, getDocs } from '../../firebaseConfig'; // Adjust the import path as necessary

function BlueSeekerhome() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'wspost'));
      const postData = querySnapshot.docs.map((doc) => doc.data());
      setPosts(postData);
    };
    fetchPosts();
  }, []);

  const theme = 'blue';

  const navClass = theme === 'blue' ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800';
  const activeLinkClass = 'bg-blue-400 text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';
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
                  to="/bshome" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/bsabout" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  About
                </NavLink>
                <NavLink 
                  to="/bsmessages" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  Messages
                </NavLink>
                <NavLink 
                  to="/bshelp" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  Help
                </NavLink>
                <NavLink 
                  to="/bsaccount" 
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

      {/* Main Content */}
      <div className="flex-1 p-6 mt-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Available Opportunities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src={post.wsimage || '/default-image.png'} // Fallback if no image is provided
                  alt="Opportunity"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{post.wsjobtitle}</h2>
                  <p className="text-blue-600">{post.wssallary}</p>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
                <ul className="list-disc pl-5">
                  {post.wshavingskills.map((skill, idx) => (
                    <li key={idx} className="text-gray-600">{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">More Info</h3>
                <ul className="list-disc pl-5">
                  {post.wsmore.map((info, idx) => (
                    <li key={idx} className="text-gray-600">{info}</li>
                  ))}
                </ul>
              </div>
              <button className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlueSeekerhome;
