// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons';
import { doc, updateDoc, arrayUnion, getDocs, collection, getDoc } from "firebase/firestore";
import { db, auth } from '../../firebaseConfig'; // Firebase setup
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, NavLink } from 'react-router-dom';

function BlueSeekerhome() {
  const navigate = useNavigate();

  // State for user info
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });

  // State for job posts
  const [jobs, setJobs] = useState([]);

  // Fetch authenticated user info and jobs
  useEffect(() => {
    const fetchUserDataAndPosts = async (user) => {
      try {
        // Fetch user data
        const userDocRef = doc(db, 'blueseeker', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserInfo({
            name: userData.bs_fullname || 'N/A',
            email: userData.bs_emailaddress || 'N/A',
          });
        } else {
          console.error('No such document for the user in blueseeker collection');
        }

        // Fetch job posts from Firestore
        const jobDocs = await getDocs(collection(db, 'bgpost'));
        const jobList = jobDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobList);
      } catch (error) {
        console.error("Error fetching jobs or user data: ", error);
      }
    };

    // Firebase auth listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserDataAndPosts(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Function to handle job applications
  const applyForJob = async (jobId, jobTitle, giverId) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert('You need to be logged in to apply for jobs.');
        return;
      }

      // Check if the seeker exists before updating
      const seekerRef = doc(db, "blueseeker", user.uid);
      const seekerSnap = await getDoc(seekerRef);

      if (!seekerSnap.exists()) {
        console.error("No such document for the seeker in blueseeker collection");
        throw new Error("No such document for the seeker");
      }

      // Update the BlueSeeker's message
      await updateDoc(seekerRef, {
        applications: arrayUnion({
          jobId,
          jobTitle,
          date: new Date().toISOString(),
          status: "pending"
        })
      });

      // Update the BlueGiver's message
      const giverRef = doc(db, "bluegiver", giverId);
      const giverSnap = await getDoc(giverRef);

      if (!giverSnap.exists()) {
        console.error("No such document for the giver in bluegiver collection");
        throw new Error("No such document for the giver");
      }

      await updateDoc(giverRef, {
        applications: arrayUnion({
          jobId,
          jobTitle,
          applicantId: user.uid,
          applicantName: user.displayName || 'Anonymous',
          date: new Date().toISOString(),
          status: "pending"
        })
      });

      // Notify the user that they've applied
      alert("You applied for the job!");

    } catch (error) {
      console.error("Error applying for job: ", error);
    }
  };

  // Navigation and class names
  const navClass = 'bg-white text-gray-800';
  const activeLinkClass = 'bg-blue-400 text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';
  const defaultLinkClass = 'bg-gray-100 text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';

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
                <NavLink to="/home/blue/seeker" className={({ isActive }) => (isActive ? activeLinkClass : defaultLinkClass)}>Home</NavLink>
                <NavLink to="/bsabout" className={({ isActive }) => (isActive ? activeLinkClass : defaultLinkClass)}>About</NavLink>
                <NavLink to="/bsmessage" className={({ isActive }) => (isActive ? activeLinkClass : defaultLinkClass)}>Message</NavLink>
                <NavLink to="/bshelp" className={({ isActive }) => (isActive ? activeLinkClass : defaultLinkClass)}>Help</NavLink>
                <NavLink to="/bsaccount" className={({ isActive }) => (isActive ? activeLinkClass : defaultLinkClass)}>
                  Account <FontAwesomeIcon icon={faUser} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4 mt-16">
        {/* User information card */}
        <div className="sticky top-16 bg-gray-100 p-6 rounded-xl shadow-black shadow-lg col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-7xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{userInfo.name || 'Loading...'}</h2>
            <p className="text-blue-600 mb-4">Blue Seeker</p>
            <p className="text-gray-700 mb-4">{userInfo.email || 'Loading...'}</p>
            <p className="text-gray-600 mb-6">
              You are committed to finding opportunities that align with your skills and expertise.
            </p>
          </div>
        </div>

        {/* Posts grid */}
        <div className="col-span-2 bg-gray-100 p-6 rounded-lg shadow-md space-y-4 shadow-black">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Available Opportunities</h1>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="bg-white p-4 rounded-lg shadow-md mb-4 shadow-blue-300">
                {/* Job Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{job.bgjobtitle || 'No Title'}</h2>

                {/* Post Image */}
                {job.bgimage && (
                  <img src={job.bgimage} alt="Opportunity" className="w-full h-40 object-cover mb-4 rounded-lg" />
                )}

                {/* Post details */}
                <p className="text-gray-700 mb-4">{job.bgdescription || 'No Description Available'}</p>

                {/* Apply Button */}
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                  onClick={() => applyForJob(job.id, job.bgjobtitle, job.bgcreatedby)}
                >
                  Apply
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No jobs available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlueSeekerhome;
