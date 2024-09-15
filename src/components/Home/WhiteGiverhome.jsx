// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUser, faPlusCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { auth, db, collection, query, getDocs, doc, getDoc } from '../../firebaseConfig'; // Ensure path is correct
import { onAuthStateChanged } from 'firebase/auth';

function WhiteGiverhome() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUserDataAndPosts = async (user) => {
      try {
        if (user) {
          // Fetch the user data from Firestore
          const userDocRef = doc(db, 'whitegivers', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserInfo(userData); // Update user info state
          } else {
            setUserInfo({ name: 'No data', email: 'No data' }); // Set default message if document does not exist
          }

          // Fetch the posts from Firestore
          const postsQuery = query(collection(db, 'wgpost'));
          const querySnapshot = await getDocs(postsQuery);

          const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPosts(postsData); // Update posts state
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
        fetchUserDataAndPosts(user);
      } else {
        navigate('/login');
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, [navigate]);

  const navClass = 'bg-gray-100 text-gray-800';
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
                <NavLink to="/home/white/giver" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Home</NavLink>
                <NavLink to="/wgabout" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>About</NavLink>
                <NavLink to="/wgmessage" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Message</NavLink>
                <NavLink to="/wghelp" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Help</NavLink>
                <NavLink to="/wgaccount" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
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
        <div className="sticky top-16 bg-white p-6 rounded-xl shadow-lg col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-7xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{userInfo.name || 'Loading...'}</h2>
            <p className="text-blue-600 mb-4">White Giver</p>
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
              onClick={() => navigate('/wgpost')}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
              Offer a Job
            </button>
          </div>
        </div>

        {/* Posts grid */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Posted Jobs</h1>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-gray-50 p-4 rounded-lg shadow-md mb-4 shadow-blue-300">
                {/* Job Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.wgjobtitle}</h2>

                {/* Post Header */}
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon icon={faUserCircle} className="text-2xl text-gray-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">{post.name}</p>
                    <p className="text-gray-600">{post.email}</p>
                  </div>
                </div>

                <hr className="border-t border-gray-300 mb-4" />

                {/* Post Image */}
                {post.wgimage && (
                  <img src={post.wgimage} alt="Job" className="w-full h-40 object-cover mb-4 rounded-lg" />
                )}

                {/* Post Details */}
                <p className="text-gray-700 mb-4">{post.wgmoreinfo?.join(', ')}</p>
                <p className="text-gray-700 mb-4">Salary: {post.wgsalary}</p>

                <hr className="border-t border-gray-300 mb-4" />

                {/* Apply Button */}
                <button className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300">
                  Apply
                </button>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WhiteGiverhome;
