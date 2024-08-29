// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; // Import Google icon
import { auth, db } from './firebase'; // Import Firebase auth and Firestore
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

function BlueLoginpage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Firebase Authentication Sign-in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Get the logged-in user
      // eslint-disable-next-line no-unused-vars
      const user = userCredential.user;

      // Fetch the user data from the appropriate Firestore collection
      const q = query(collection(db, 'bluegiver'), where('bg_emailaddress', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User is a Giver, redirect to the Giver dashboard
        navigate('/dashboard/blue/giver');
      } else {
        // Check the blueseeker collection
        const qSeeker = query(collection(db, 'blueseeker'), where('bs_emailaddress', '==', email));
        const seekerSnapshot = await getDocs(qSeeker);

        if (!seekerSnapshot.empty) {
          // User is a Seeker, redirect to the Seeker dashboard
          navigate('/dashboard/blue/seeker');
        } else {
          // No matching user found in Firestore, handle this error
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
    navigate('/signup/blue/seeker'); // Navigate to the BlueSignuppageS component
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blueEmail">
                Email Address
              </label>
              <input 
                type="email" 
                id="blueEmail" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
                placeholder="your-email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bluePassword">
                Password
              </label>
              <input 
                type="password" 
                id="bluePassword" 
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
              onClick={handleSignupClick} // Add the click handler for signup
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

export default BlueLoginpage;
