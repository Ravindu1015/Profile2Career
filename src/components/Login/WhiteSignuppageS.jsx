// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaHandsHelping } from 'react-icons/fa'; // Icons for Job Seeker and Giver

function WhiteSignuppageS() {
  const navigate = useNavigate();
  const [isSeeker, setIsSeeker] = useState(null); // To determine if Seeker or Giver is selected
  const [skills, setSkills] = useState(['']);

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const handleSkillChange = (index, event) => {
    const newSkills = skills.slice();
    newSkills[index] = event.target.value;
    setSkills(newSkills);
  };

  const handleRegisterClick = () => {
    // Handle the registration logic here
  };

  const handleGiverClick = () => {
    navigate('/signup/white/giver'); // Navigate to WhiteSignupg.jsx
  };

  return (
    <div className="bg-blue-100 bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-white">
      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>

      {isSeeker === null && (
        <div className="mb-8">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">Choose Your Path</h2>
          <div className="grid grid-cols-2 gap-8">
            {/* Seeker Grid */}
            <div
              className="flex flex-col items-center justify-center bg-white p-4 rounded-3xl h-96 w-96 shadow-lg shadow-gray-400 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => setIsSeeker(true)}
            >
              <FaUserTie className="text-blue-600 text-6xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Job Seeker</h3>
              <p className="text-gray-600 text-center">
                Looking for opportunities? Join as a seeker and find your ideal job.
              </p>
            </div>
            {/* Giver Grid */}
            <div
              className="flex flex-col items-center justify-center bg-white p-4 rounded-3xl h-96 w-96 shadow-lg shadow-gray-400 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={handleGiverClick}
            >
              <FaHandsHelping className="text-blue-600 text-6xl mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Job Giver</h3>
              <p className="text-gray-600 text-center">
                Have opportunities to offer? Register as a giver and connect with seekers.
              </p>
            </div>
          </div>
        </div>
      )}

      {isSeeker && (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 flex mt-8 mb-8">
          <div className="w-1/2 flex items-center justify-center">
            <img
              src="/image/log/signin.jpg"
              alt="Signup Illustration"
              className="w-full h-auto"
            />
          </div>

          <div className="w-1/2 p-8">
            <h2 className="text-3xl font-semibold text-gray-800">Register as a Job Seeker</h2>
            <p className="text-gray-600 mb-8">
              Join us by filling in the information below.
            </p>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="your-email@example.com"
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
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Skills</label>
                {skills.map((skill, index) => (
                  <input
                    key={index}
                    type="text"
                    className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder={`Skill ${index + 1}`}
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                ))}
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition duration-300 mt-2"
                  onClick={addSkill}
                >
                  Add Another Skill
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobExpectations">
                  Job Expectations
                </label>
                <input
                  type="text"
                  id="jobExpectations"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Describe your job expectations"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="interestCompanies">
                  Interested Companies
                </label>
                <input
                  type="text"
                  id="interestCompanies"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="List companies you are interested in"
                />
              </div>
              <button
                type="button"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={handleRegisterClick}
              >
                Register
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account? <a href="/login/white" className="text-blue-600 hover:underline">Sign in here</a>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WhiteSignuppageS;
