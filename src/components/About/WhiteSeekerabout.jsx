// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebaseConfig'; // Update with your Firebase config path

function WhiteSeekerabout() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });

  const navigate = useNavigate();

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

  const developers = [
    {
      name: "Ravindu Prabashwara",
      role: "Frontend Developer",
      email: "ravinduchan15@gmail.com",
      skills: ["React", "JavaScript", "CSS"],
      avatar: "https://via.placeholder.com/150"
    },
    {
      name: "Chanudi Shehani",
      role: "Backend Developer",
      email: "dgcshehani44@gmail.com",
      skills: ["Node.js", "Express", "MongoDB"],
      avatar: "https://via.placeholder.com/150"
    },
    {
      name: "S Jeyaprashanth",
      role: "Machine Learning Module Developer",
      email: "sjeyaprashanth10@gmail.com",
      skills: ["Python", "TensorFlow", "ML Algorithms"],
      avatar: "https://via.placeholder.com/150"
    },
    {
      name: "Chiththaja Sathsiri",
      role: "UI/UX Designer",
      email: "chiththajasathsiri@gmail.com",
      skills: ["Figma", "Sketch", "Adobe XD"],
      avatar: "https://via.placeholder.com/150"
    }
  ];

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
                <NavLink to="/home/white/seeker" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Home</NavLink>
                <NavLink to="/wsabout" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>About</NavLink>
                <NavLink to="/wsmessage" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Messages</NavLink>
                <NavLink to="/wshelp" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Help</NavLink>
                <NavLink to="/wsaccount" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Account <FontAwesomeIcon icon={faUserCircle} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 p-4 mt-16 grid grid-cols-3 gap-4">
        {/* User information card */}
        <div className="sticky top-16 bg-white p-6 rounded-xl shadow-md col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUserCircle} className="text-7xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{userInfo.name || 'Loading...'}</h2>
            <p className="text-blue-600 mb-4">White Seeker</p>
            <p className="text-gray-700 mb-4">{userInfo.email || 'Loading...'}</p>
            <p className="text-gray-600 mb-6">Aspiring to find the perfect white-collar career opportunities.</p>
            <button 
              className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
              onClick={() => navigate('/wssearch')}
            >
              <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
              Find Jobs
            </button>
          </div>
        </div>

        {/* About section */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About the White Seeker Module</h1>
          <p className="text-gray-700 mb-6">
            The White Seeker module is part of the <strong>Profile2Career</strong> project, designed to help white-collar job seekers connect with employers looking for their skills and expertise.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Objectives</h2>
          <p className="text-gray-700 mb-6">
            The primary goals of the White Seeker module are:
            <ul className="list-disc list-inside ml-4">
              <li>Enable job seekers to search and apply for job opportunities</li>
              <li>Connect with employers looking for qualified professionals</li>
              <li>Build a professional profile to attract potential employers</li>
              <li>Streamline the job search process through an intuitive platform</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc list-inside ml-4 text-gray-700 mb-6">
            <li>Search for jobs based on qualifications and experience</li>
            <li>Apply for multiple job opportunities in a few clicks</li>
            <li>Real-time notifications for job status updates</li>
            <li>Message employers directly within the platform</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-2">Project Timeline</h2>
          <p className="text-gray-700">
            The White Seeker module is aligned with the overall Profile2Career project timeline, covering stages such as job searching, applying, and communication. Additional features like advanced search filters will be rolled out in the coming months.
          </p>

          {/* Developers section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md shadow-gray-600">
            <h2 className="text-3xl font-bold mb-4">Meet the Developers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {developers.map((developer, index) => (
                <div 
                  key={index} 
                  className="bg-white w-full h-full p-6 rounded-2xl shadow-md shadow-blue-300 flex flex-col justify-between"
                >
                  {/* Developer Image */}
                  <img
                    src={developer.avatar}
                    alt={`${developer.name}'s avatar`}
                    className="w-32 h-32 rounded-full mx-auto mb-6"
                  />

                  {/* Developer Information */}
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-2">{developer.name}</h3>
                    <p className="text-xl text-gray-700 mb-2">{developer.role}</p>
                    <p className="text-gray-600 mb-4">Email: {developer.email}</p>
                    <p className="text-gray-600">Skills:</p>
                    <ul className="list-disc list-inside text-gray-600">
                      {developer.skills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhiteSeekerabout;
