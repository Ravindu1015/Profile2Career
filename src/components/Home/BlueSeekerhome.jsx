// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line no-unused-vars
import { faBriefcase, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { db, collection, getDocs, auth, doc, getDoc } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

function BlueSeekerhome() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({ bs_fullname: '', bs_emailaddress: '' });

  useEffect(() => {
    const fetchUserDataAndPosts = async (user) => {
      try {
        if (user) {
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
            console.error('No such document!');
          }

          // Fetch posts
          const postsQuery = collection(db, 'bgpost');
          const querySnapshot = await getDocs(postsQuery);
          const postsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(postsData); 
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserDataAndPosts(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow-md mb-4 shadow-blue-300">
                {/* Job Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.bgjobtitle || 'No Title'}</h2>

                {/* Post Image */}
                {post.bgimage && (
                  <img src={post.bgimage} alt="Opportunity" className="w-full h-40 object-cover mb-4 rounded-lg" />
                )}

                {/* Post details */}
                <p className="text-gray-700 mb-4">Location: {post.bglocation || 'Not specified'}</p>
                <p className="text-gray-700 mb-4">
                  Skills: {Array.isArray(post.bgskills) ? post.bgskills.join(', ') : 'No Skills Provided'}
                </p>
                <p className="text-gray-700 mb-4">Salary: {post.bgsalary || 'Not specified'}</p>

                {/* Apply button */}
                <button className="bg-blue-400 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-transform">
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No posts available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlueSeekerhome;
