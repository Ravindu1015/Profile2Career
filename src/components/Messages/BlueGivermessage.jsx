// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line no-unused-vars
import { faUser, faEnvelope, faCheckCircle, faTimesCircle, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import { useNavigate, NavLink } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

function BlueGivermessage() {
  const navigate = useNavigate();

  // State for storing authenticated user info
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });

  // State for job postings, applications, and unread messages
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Fetch user info and applications (Firebase Authentication and Firestore)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({
          name: user.displayName || 'Anonymous User',
          email: user.email || 'No Email Provided',
        });
        fetchApplications(user.uid);
        fetchJobPostings(user.uid);
      } else {
        navigate('/login');
      }
    });

    // Mock unread messages count (for now)
    setUnreadMessages(2);

    return () => unsubscribe();
  }, [navigate]);

  // Fetch applications from Firestore
  const fetchApplications = async (userId) => {
    try {
      const docRef = doc(db, "bluegiver", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setApplications(docSnap.data().applications || []);
      }
    } catch (error) {
      console.error("Error fetching applications: ", error);
    }
  };

  // Fetch job postings from Firestore
  const fetchJobPostings = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobs(jobsList.filter(job => job.giverId === userId));
    } catch (error) {
      console.error("Error fetching job postings: ", error);
    }
  };

  // Handle actions for applications
  const handleAccept = (applicantId) => {
    alert(`You accepted the applicant: ${applicantId}`);
    // Implement actual acceptance logic
  };

  const handleReject = (applicantId) => {
    alert(`You rejected the applicant: ${applicantId}`);
    // Implement actual rejection logic
  };

  const handleReview = (applicantId) => {
    navigate(`/profile/${applicantId}`);
  };

  // Navigation link styling
  const navClass = 'bg-gray-100 text-gray-800';
  const activeLinkClass = 'bg-blue-600 text-white shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';
  const defaultLinkClass = 'bg-white text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';

  return (
    <div className="bg-gray-100 h-screen flex flex-col font-body">
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
                  Account <FontAwesomeIcon icon={faUser} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4 mt-16">
        {/* User Information */}
        <div className="sticky top-16 bg-white p-6 rounded-xl shadow-black shadow-lg col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-7xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{userInfo.name || 'Loading...'}</h2>
            <p className="text-blue-600 mb-4">Blue Giver</p>
            <p className="text-gray-700 mb-4">{userInfo.email || 'Loading...'}</p>
            <p className="text-gray-600 mb-6">
              You have posted jobs to find top talent for your organization.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Messages and Activity</h1>

          {/* Job Postings */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Your Job Postings</h2>
            <ul className="list-disc list-inside text-gray-700 text-lg">
              {jobs.map(job => (
                <li key={job.id} className="mb-4">
                  <strong className="text-xl">{job.title}</strong>
                  <p className="text-gray-600">Posted on {new Date(job.date).toLocaleDateString()} at {job.time}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Applications</h2>
            <ul className="space-y-4">
              {applications.map((app, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-md shadow-blue-300">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-xl">{app.applicantName || app.applicant}</strong>
                    <span className="text-gray-600 text-sm">{app.jobTitle}</span>
                  </div>
                  <p className="text-gray-600 mb-2">Applied on {new Date(app.date).toLocaleDateString()}</p>
                  <div className="flex space-x-4">
                    {app.status === 'pending' ? (
                      <>
                        <button 
                          className="bg-green-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-500 hover:shadow-lg transition duration-300"
                          onClick={() => handleAccept(app.applicantId)}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                          Accept
                        </button>
                        <button 
                          className="bg-red-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-500 ml-4 hover:shadow-lg transition duration-300"
                          onClick={() => handleReject(app.applicantId)}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                          Reject
                        </button>
                        <button
                          className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 ml-4 hover:shadow-lg transition duration-300"
                          onClick={() => handleReview(app.applicantId)}
                        >
                          Review
                        </button>
                      </>
                    ) : (
                      <button
                        className="bg-gray-400 text-white px-4 py-2 rounded-full shadow-md"
                      >
                        Reviewed
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4 mt-auto">
        <p className="text-gray-700">© 2024 Profile2Career. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default BlueGivermessage;
