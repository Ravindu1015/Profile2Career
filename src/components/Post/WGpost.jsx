// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUser, faPlusCircle, faImage } from '@fortawesome/free-solid-svg-icons';
import { db, collection, addDoc } from '../../firebaseConfig'; // Adjust the import path as necessary



function WGpost() {
  const navigate = useNavigate();
  const theme = 'white'; // Set theme for navbar styling

  const [jobTitle, setJobTitle] = useState('');
  const [skills, setSkills] = useState(['']);
  const [salary, setSalary] = useState('');
  const [moreInfo, setMoreInfo] = useState(['']);
  const [image, setImage] = useState(null);

  const navClass = theme === 'white' ? 'bg-gray-100 text-gray-800' : 'bg-blue-800 text-white';
  const activeLinkClass = 'bg-blue-400 text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';
  const defaultLinkClass = 'bg-white text-gray-800 shadow-md px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:shadow-lg hover:scale-105';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, 'wgpost'), {
        wgjobtitle: jobTitle,
        wgskills: skills,
        wgsallary: salary,
        wgmoreinfo: moreInfo,
        wgimage: image ? URL.createObjectURL(image) : '' // Convert image to a URL string
      });
      alert('Job posted successfully!');
      navigate('/wghome');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error posting job');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

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
                <NavLink 
                  to="/wghome" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/wgabout" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  About
                </NavLink>
                <NavLink 
                  to="/wgmessages" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  Messages
                </NavLink>
                <NavLink 
                  to="/wghelp" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  Help
                </NavLink>
                <NavLink 
                  to="/wgaccount" 
                  className={({ isActive }) => 
                    isActive ? activeLinkClass : defaultLinkClass
                  }
                >
                  Account 
                  <FontAwesomeIcon icon={faUser} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 grid grid-cols-3 gap-4 p-4 mt-16">
        {/* User information card (left side) */}
        <div className="sticky top-16 bg-white p-6 rounded-xl shadow-black shadow-lg col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-7xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">John Doe</h2>
            <p className="text-blue-600 mb-4">White Giver</p>
            <p className="text-gray-700 mb-4">johndoe@example.com</p>
            <p className="text-gray-600 mb-6">
              You are committed to helping those in need by volunteering your time and sharing your skills in community service. 
            </p>
            <hr className="w-2/3 border-t border-gray-300 mb-6" />
            <p className="text-gray-600 mb-6">
              You can post jobs that align with their skills and expertise, allowing them to apply
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

        {/* Form (right side) */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Post a Job</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="job-title" className="text-gray-700 font-semibold mb-2">Job Title</label>
              <input 
                id="job-title" 
                type="text" 
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg" 
                placeholder="Enter job title"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="skills" className="text-gray-700 font-semibold mb-2">Skills</label>
              <textarea 
                id="skills" 
                rows="4" 
                value={skills.join('\n')}
                onChange={(e) => setSkills(e.target.value.split('\n'))}
                className="border border-gray-300 p-2 rounded-lg" 
                placeholder="List required skills"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="salary" className="text-gray-700 font-semibold mb-2">Salary</label>
              <input 
                id="salary" 
                type="text" 
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg" 
                placeholder="Enter salary range"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="more-info" className="text-gray-700 font-semibold mb-2">More Info</label>
              <textarea 
                id="more-info" 
                rows="4" 
                value={moreInfo.join('\n')}
                onChange={(e) => setMoreInfo(e.target.value.split('\n'))}
                className="border border-gray-300 p-2 rounded-lg" 
                placeholder="Provide more information"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="photo" className="text-gray-700 font-semibold mb-2">Add Photo</label>
              <div className="flex items-center">
                <input 
                  id="photo" 
                  type="file" 
                  className="border border-gray-300 p-2 rounded-lg hidden" 
                  onChange={handleImageChange}
                />
                <label htmlFor="photo" className="cursor-pointer text-blue-500 flex items-center">
                  <FontAwesomeIcon icon={faImage} className="mr-2" />
                  Upload Photo
                </label>
              </div>
            </div>
            <button 
              type="submit" 
              className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


