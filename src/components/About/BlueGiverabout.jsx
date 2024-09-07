// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line no-unused-vars
import { faBriefcase, faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { auth, db, doc, getDoc } from '../../firebaseConfig'; // Ensure the path is correct
import { onAuthStateChanged } from 'firebase/auth';

function BlueGiverabout() {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        if (user) {
          // Fetch user data from Firestore
          const userDocRef = doc(db, 'bluegiver', user.uid);  // Adjust to the correct Firestore collection
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserInfo(userData); // Update user info state
          } else {
            console.log("No such document!");
            setUserInfo({ name: 'No data', email: 'No data' });
          }
        } else {
          navigate('/login'); // Redirect if no user is authenticated
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    // Listen for auth state changes and fetch data
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        navigate('/login');
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, [navigate]);

  const navClass = 'bg-white text-gray-800';
  const activeLinkClass = 'bg-blue-400 text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';
  const defaultLinkClass = 'bg-gray-100 text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';

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
    <div className="bg-white h-screen flex flex-col">
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
                <NavLink to="/bgmessages" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Messages</NavLink>
                <NavLink to="/bghelp" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Help</NavLink>
                <NavLink to="/bgaccount" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Account <FontAwesomeIcon icon={faUser} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 p-8 mt-16 grid grid-cols-3 gap-4">
        {/* User information card */}
        <div className="sticky top-16 bg-gray-100 p-6 rounded-xl shadow-black shadow-lg col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-7xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{userInfo.name || 'Loading...'}</h2>
            <p className="text-blue-600 mb-4">Blue Giver</p>
            <p className="text-gray-700 mb-4">{userInfo.email || 'Loading...'}</p>
            <p className="text-gray-600 mb-6">
              You are committed to helping others by offering blue-collar job opportunities to skilled workers.
            </p>
            <hr className="w-2/3 border-t border-gray-300 mb-6" />
            <p className="text-gray-600 mb-6">
              Post job opportunities and help workers find their next job.
            </p>
          </div>
        </div>

        <div className="col-span-2">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md shadow-gray-600 mb-6">
            <h1 className="text-4xl font-bold mb-4">About the Blue Giver Module</h1>
            <p className="text-gray-700 mb-6">
              The Blue Giver module is part of the <strong>Profile2Career</strong> project, designed to help blue-collar job providers (givers) find qualified candidates for their job openings.
            </p>

            <h2 className="text-2xl font-semibold mb-2">Objectives</h2>
            <p className="text-gray-700 mb-6">
              The primary goals of the Blue Giver module are:
              <ul className="list-disc list-inside ml-4">
                <li>Enable job providers to post blue-collar job opportunities</li>
                <li>Connect with skilled workers</li>
                <li>Filter candidates based on job requirements</li>
                <li>Streamline the hiring process through an easy-to-use platform</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc list-inside ml-4 text-gray-700 mb-6">
              <li>Job posting and management tools for blue-collar employers</li>
              <li>Candidate filtering based on qualifications and experience</li>
              <li>Messaging system to communicate with applicants</li>
              <li>Real-time notifications for job applications</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-2">Project Timeline</h2>
            <p className="text-gray-700">
              The Blue Giver module follows the overall Profile2Career project timeline. It involves stages such as job posting, candidate management, and further enhancements like communication tools and advanced filtering options. The full timeline can be found in the project proposal.
            </p>
          </div>

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
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-center mb-4">{developer.name}</h3>
                    <p className="text-center text-gray-600 mb-2">{developer.role}</p>
                    <p className="text-center text-blue-600 mb-4">{developer.email}</p>
                    <hr className="border-t border-gray-300 mb-4" />
                    <p className="text-gray-700 text-center mb-2">Skills: {developer.skills.join(', ')}</p>
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
