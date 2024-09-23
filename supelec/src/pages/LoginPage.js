import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vidBack from '../assets/img/loginbg.mp4';
import logo1 from '../assets/img/Magnetoo-logo.jpeg';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'supelecadmin' && password === 'supelecadmin') {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Background video */}
      <video
        src={vidBack}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay for dimming video */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Glassmorphism Login form */}
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-xl border border-opacity-30 border-gray-400 p-8 rounded-2xl shadow-xl w-full max-w-sm">
        
        {/* Logo and Title */}
        <div className="flex items-center justify-center mb-6">
          <img src={logo1} alt="Magnetoo Logo" className="h-10 mr-3" />
          <h2 className="text-2xl font-semibold text-blue-500">Magnetoo</h2>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-white">Username</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-500 rounded-lg bg-gray-900 bg-opacity-60 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-white">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-500 rounded-lg bg-gray-900 bg-opacity-60 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium p-3 rounded-lg transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
