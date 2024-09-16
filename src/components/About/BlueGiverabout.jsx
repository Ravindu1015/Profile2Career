// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig'; // Update with your Firebase config path

function BlueGiverabout() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });

  const navigate = useNavigate();

  // Fetch user info (using Firebase authentication)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'bluegiver', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserInfo({
              name: data.name || 'Anonymous User',
              email: data.email || 'No Email Provided',
            });
          }
        } catch (error) {
          console.error("Error fetching BlueGiver data:", error);
        }
      } else {
        // User is signed out, redirect to login
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
                <NavLink to="/home/blue/giver" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Home</NavLink>
                <NavLink to="/bgabout" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>About</NavLink>
                <NavLink to="/bgmessage" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Messages</NavLink>
                <NavLink to="/bghelp" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Help</NavLink>
                <NavLink to="/bgaccount" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
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
            <p className="text-blue-600 mb-4">Blue Giver</p>
            <p className="text-gray-700 mb-4">{userInfo.email || 'Loading...'}</p>
            <p className="text-gray-600 mb-6">Helping blue-collar job providers find the right candidates.</p>
            <button 
              className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
              onClick={() => navigate('/bgpost')}
            >
              <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
              Post a Job
            </button>
          </div>
        </div>

        {/* About section */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About the Blue Giver Module</h1>
          <p className="text-gray-700 mb-6">
            The Blue Giver module is part of the <strong>Profile2Career</strong> project, dedicated to connecting blue-collar job providers with skilled candidates for their job openings.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Objectives</h2>
          <p className="text-gray-700 mb-6">
            The main objectives of the Blue Giver module include:
            <ul className="list-disc list-inside ml-4">
              <li>Allowing employers to post blue-collar job opportunities</li>
              <li>Helping employers find qualified workers quickly</li>
              <li>Providing a platform for easy communication with job applicants</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc list-inside ml-4 text-gray-700 mb-6">
            <li>Job posting tools for blue-collar employers</li>
            <li>Candidate filtering based on experience and skills</li>
            <li>Messaging system for direct communication with applicants</li>
            <li>Real-time notifications for job applications</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-2">Project Timeline</h2>
          <p className="text-gray-700">
            The Blue Giver module is aligned with the overall Profile2Career project timeline, focusing on job posting, candidate management, and future improvements like better filtering and communication tools.
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
                    <h3 className="text-xl font-semibold text-gray-900">{developer.name}</h3>
                    <p className="text-blue-600">{developer.role}</p>
                    <p className="text-gray-700">{developer.email}</p>

                    <h4 className="text-lg font-medium mt-4 text-gray-900">Skills</h4>
                    <ul className="text-gray-700 mt-2">
                      {developer.skills.map((skill, i) => (
                        <li key={i} className="inline-block bg-gray-200 text-gray-900 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                          {skill}
                        </li>
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

export default BlueGiverabout;
