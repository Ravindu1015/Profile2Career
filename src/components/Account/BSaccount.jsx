// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line no-unused-vars
import { faBriefcase, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faUser, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { auth, db, storage, doc, getDoc, updateDoc } from '../../firebaseConfig'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function BSaccount() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: '', email: '', profilePic: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        if (user) {
          const userDocRef = doc(db, 'bluecollarseekers', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserInfo(userData);
            setNewName(userData.name || '');
          } else {
            setUserInfo({ name: 'No data', email: 'No data' });
          }
        } else {
          navigate('/bluelogin'); // Redirect to BlueLoginpage
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        navigate('/bluelogin'); // Redirect to BlueLoginpage
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/bluelogin'); // Redirect to BlueLoginpage after sign-out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const userDocRef = doc(db, 'bluecollarseekers', auth.currentUser.uid);

      if (profileImage) {
        const profilePicRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
        await uploadBytes(profilePicRef, profileImage);
        const profilePicURL = await getDownloadURL(profilePicRef);

        await updateDoc(userDocRef, {
          name: newName,
          profilePic: profilePicURL,
        });
      } else {
        await updateDoc(userDocRef, { name: newName });
      }

      setIsEditing(false); // Exit editing mode
      setUserInfo((prev) => ({ ...prev, name: newName }));
    } catch (error) {
      console.error("Error saving changes: ", error);
    }
  };

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
                <NavLink to="/home/blue/seeker" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Home</NavLink>
                <NavLink to="/bsabout" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>About</NavLink>
                <NavLink to="/bsmessage" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Message</NavLink>
                <NavLink to="/bshelp" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Help</NavLink>
                <NavLink to="/bsaccount" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Account <FontAwesomeIcon icon={faUser} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 p-4 mt-16 flex flex-col items-center">
        {/* User information card */}
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              {userInfo.profilePic ? (
                <img src={userInfo.profilePic} alt="Profile" className="rounded-full w-32 h-32 object-cover" />
              ) : (
                <FontAwesomeIcon icon={faUser} className="text-7xl text-gray-500" />
              )}
            </div>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border-2 border-gray-300 p-2 rounded-lg mb-4 w-full"
                />
                <input type="file" onChange={handleProfileImageChange} className="mb-4" />
                <button
                  className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300 mb-4"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-2">{userInfo.name || 'Loading...'}</h2>
                <p className="text-blue-600 mb-4">Blue Seeker</p>
                <p className="text-gray-700 mb-6">{userInfo.email || 'Loading...'}</p>
                <button
                  className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300 mb-4"
                  onClick={() => setIsEditing(true)}
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Edit Profile
                </button>
              </>
            )}
            <button
              className="bg-red-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-500 hover:shadow-lg transition duration-300"
              onClick={handleSignOut}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BSaccount;
