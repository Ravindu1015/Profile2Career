// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Firstpage() {
  const navigate = useNavigate();

  const handleExploreMoreClick = () => {
    navigate('/path-select'); // Navigate to PathSelectpage
  };

  return (
    <div className="bg-[url('/image/welcome/wel.jpg')] bg-cover bg-center h-screen flex items-center justify-center text-white">
      <div className="bg-black bg-opacity-70 p-8 rounded-lg text-center ml-32 mr-32">
        <h1 className="text-4xl font-bold mb-4">Profile2Career</h1>
        <h2 className="text-2xl font-bold mb-4">Personality Profiling for Career Recommendations and Job Sourcing</h2>
        <p className="text-justify mr-32 ml-32">
          Profile2Career caters to both white-collar and blue-collar job seekers and providers, ensuring a diverse range of job opportunities and career paths. Whether users are looking for professional, administrative roles or skilled labor positions, the platform’s advanced algorithms and extensive job listings provide tailored solutions for all career aspirations. This inclusive approach ensures that Profile2Career meets the needs of a wide array of users, helping them find the right job and career path in an ever-changing job market.
        </p>
        <p className="text-center">
          making Profile2Career a comprehensive and dynamic career solution platform.
        </p>
        <button 
          onClick={handleExploreMoreClick} // Add onClick handler
          className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full"
        >
          Explore More
        </button>
      </div>
    </div>
  );
}

export default Firstpage;
