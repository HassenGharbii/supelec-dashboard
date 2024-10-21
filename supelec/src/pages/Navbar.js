import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { FaBars, FaSignOutAlt } from 'react-icons/fa';  // Icons for the menu
import logo1 from '../assets/img/Magnetoo-logo.jpeg';
import logo2 from '../assets/img/axone.png';

const Navbar = ({ handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);  // Menu state
  const navigate = useNavigate();

  // Toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle the logout
  const onLogout = () => {
    handleLogout();
    setMenuOpen(false); // Close menu after logout
    navigate('/');  // Redirect to login or home page
  };

  return (
    <header className="flex justify-between items-center p-4 shadow-md z-10 bg-gray-900 text-white">
      {/* Logos Bar */}
      <div className="flex space-x-4 items-center">
        <div className='flex flex-row'>
          <img src={logo1} alt="Logo 1" className="h-12" />
          <p className='ml-2 text-blue-300 font-bold mt-3'>Magnetoo</p>
        </div>
      </div>

      {/* Right Side (Logo2 and Menu) */}
      <div className="flex items-center space-x-4">
        {/* Logo 2 */}
        <img src={logo2} alt="Logo 2" className="h-14" />

        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center"
          >
            <FaBars className="mr-2" /> Menu
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-20">
              <button
                onClick={onLogout}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-700 rounded-t-lg"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
