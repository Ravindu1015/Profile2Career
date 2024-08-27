// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHardHat, faBriefcase } from '@fortawesome/free-solid-svg-icons'; // Example icons

function PathSelectpage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleCardClick = (topic) => {
    if (topic === 'Blue Collar') {
      navigate('/login/blue'); // Adjust the route if needed
    } else if (topic === 'White Collar') {
      navigate('/login/white'); // Adjust the route if needed
    }
  };

  return (
    <div className="bg-blue-100 bg-cover bg-center h-screen flex flex-col items-center justify-center text-white relative">
      {/* Back Button */}
      <button 
        onClick={handleBackClick} 
        className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 w-full max-w-4xl">
        
        {/* Card 1 - Blue Collar */}
        <div 
          onClick={() => handleCardClick('Blue Collar')} 
          className="flex flex-col items-center justify-center bg-white p-4 rounded-3xl h-96 w-96 shadow-lg shadow-gray-400 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faHardHat} size="3x" className="text-blue-600" />
          </div>
          <h2 className="text-black text-2xl font-bold mb-2 text-center">Blue Collar</h2>
          <p className="text-black text-center text-[13px] ml-8 mr-8">
            Blue-collar jobs involve physical labor or skilled trades and are often outside office settings. They don’t necessarily require a college degree but demand specialized skills. 😊
          </p>
        </div>

        {/* Card 2 - White Collar */}
        <div 
          onClick={() => handleCardClick('White Collar')} 
          className="flex flex-col items-center justify-center bg-white p-4 rounded-3xl h-96 w-96 shadow-lg shadow-gray-400 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faBriefcase} size="3x" className="text-blue-600" />
          </div>
          <h2 className="text-black text-2xl font-bold mb-2 text-center">White Collar</h2>
          <p className="text-black text-center text-[13px] ml-8 mr-8">
            White-collar jobs, performed in office settings. Examples include customer service managers, financial managers, engineers, and marketing managers. Salaries replace hourly wages. 😊
          </p>
        </div>
      </div>
    </div>
  );
}

export default PathSelectpage;
