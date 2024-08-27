// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WhiteSignupg() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(['']);
  const [jobs, setJobs] = useState(['']);

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

  const addJob = () => {
    setJobs([...jobs, '']);
  };

  const handleJobChange = (index, event) => {
    const newJobs = jobs.slice();
    newJobs[index] = event.target.value;
    setJobs(newJobs);
  };

  const handleRegisterClick = () => {
    // Handle the registration logic here
  };

  return (
    <div className="bg-blue-100 bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-white">
      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>

      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 flex mt-8 mb-8">
        <div className="w-1/2 flex items-center justify-center">
          <img
            src="/image/log/signin.jpg"
            alt="Signup Illustration"
            className="w-full h-auto"
          />
        </div>

        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-gray-800">Register as a Job Giver</h2>
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="1234 Main St, City, Country"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Expected Skills</label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">Jobs</label>
              {jobs.map((job, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-full p-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder={`Job ${index + 1}`}
                  value={job}
                  onChange={(e) => handleJobChange(index, e)}
                />
              ))}
              <button
                type="button"
                className="bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300 transition duration-300 mt-2"
                onClick={addJob}
              >
                Add Another Job
              </button>
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
    </div>
  );
}

export default WhiteSignupg;
