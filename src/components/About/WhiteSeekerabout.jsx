// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line no-unused-vars
import { faBriefcase, faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function WhiteSeekerabout() {
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
                <NavLink to="/home/white/seeker" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Home</NavLink>
                <NavLink to="/wsabout" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>About</NavLink>
                <NavLink to="/wsmessages" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Messages</NavLink>
                <NavLink to="/wshelp" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>Help</NavLink>
                <NavLink to="/wsaccount" className={({ isActive }) => isActive ? activeLinkClass : defaultLinkClass}>
                  Account <FontAwesomeIcon icon={faUser} className="ml-2" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 p-8 mt-16">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-4">About the White Seeker Module</h1>
          <p className="text-gray-700 mb-6">
            The White Seeker module is part of the <strong>Profile2Career</strong> project, aimed at providing job seekers with opportunities that align with their skills and career objectives.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Objectives</h2>
          <p className="text-gray-700 mb-6">
            Our primary goal is to create a platform where white-collar job seekers can:
            <ul className="list-disc list-inside ml-4">
              <li>Discover relevant job postings</li>
              <li>Connect with potential employers</li>
              <li>Apply for positions that suit their skills</li>
              <li>Receive career-related advice and resources</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc list-inside ml-4 text-gray-700 mb-6">
            <li>User-friendly interface for seekers</li>
            <li>Up-to-date job postings from verified companies</li>
            <li>Skills-based filtering for job recommendations</li>
            <li>Personalized job alerts and career guidance</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-2">Project Timeline</h2>
          <p className="text-gray-700">
            The project is divided into multiple phases, starting with the initial research and development of the seeker module, followed by the implementation of additional features such as advanced filtering, messaging, and notifications. A detailed timeline can be found in the project proposal.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhiteSeekerabout;
