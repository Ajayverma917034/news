import React from 'react';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`bg-gray h-16 fixed top-0 left-0 right-0 flex items-center 'pl-20'transition-padding duration-300`}>
      <button onClick={toggleSidebar} className="text-white ml-4">
        <FaBars />
      </button>
      <span className="text-white ml-4 font-bold">Dashboard</span>
    </div>
  );
};

export default Navbar;
