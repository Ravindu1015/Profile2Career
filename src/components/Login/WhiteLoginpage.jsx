// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; // Import Google icon
import { auth, db } from "../../firebaseConfig.js"; // Import Firebase auth and Firestore
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

function WhiteLoginpage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Firebase Authentication Sign-in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // eslint-disable-next-line no-unused-vars
      const user = userCredential.user;

      // Fetch user data from Firestore
      const qGiver = query(collection(db, 'whitegiver'), where('wg_emailaddress', '==', email));
      const giverSnapshot = await getDocs(qGiver);

      if (!giverSnapshot.empty) {
        // User is a Giver, redirect to the Giver home page
        navigate('/home/white/giver');
      } else {
        // Check the whiteseeker collection
        const qSeeker = query(collection(db, 'whiteseeker'), where('ws_emailaddress', '==', email));
        const seekerSnapshot = await getDocs(qSeeker);

        if (!seekerSnapshot.empty) {
          // User is a Seeker, redirect to the Seeker home page
          navigate('/home/white/seeker');
        } else {
          // No matching user found in Firestore
          setError('User not found in the system.');
        }
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password.');
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleSignupClick = () => {
    navigate('/signup/white/seeker'); // Navigate to the WhiteSignuppageS component
  };

  return (
    <div className="bg-blue-100 bg-cover bg-center h-screen flex flex-col items-center justify-center text-white relative">
      <button 
        onClick={handleBackClick} 
        className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>
      
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-3xl p-8 flex mt-20 mb-20">
        <div className="w-1/2 flex items-center justify-center">
          <img 
            src="/image/log/login.jpg" // Updated the image path to be relative
            alt="Login Illustration" 
            className="w-full h-auto" 
          />
        </div>

        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-gray-800 -mt-10">Welcome Back :)</h2>
          <p className="text-gray-600 mb-8">
            To keep connected with us, please login with your personal information by email address and password.
          </p>
          <form onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                placeholder="your-email@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input 
                type="password" 
                id="password" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700 text-sm">Remember Me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login Now
            </button>
            <button 
              type="button" 
              className="w-full bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition duration-300 mt-4"
              onClick={handleSignupClick}
            >
              Create Account
            </button>
          </form>
          <div className="mt-6 flex items-center justify-center">
            <span className="text-gray-600 text-sm">Or you can join with</span>
            <div className="flex space-x-4 ml-4">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <FontAwesomeIcon icon={faGoogle} size="2x" /> {/* Google Icon */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhiteLoginpage;
