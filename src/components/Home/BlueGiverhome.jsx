// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../Navbar';

function BlueGiverhome() {
  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <Navbar theme="blue" />
      <main className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Blue Giver Home</h1>
      </main>
    </div>
  );
}

export default BlueGiverhome;
