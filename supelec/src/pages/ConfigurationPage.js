import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import LineChart from '../assets/charts/LineChart';
import RDCDiagram from '../assets/charts/RDCdiagram';
import { FaServer, FaWifi, FaPowerOff } from "react-icons/fa"; // Importing icons from react-icons
import logo1 from '../assets/img/Magnetoo-logo.jpeg';
import logo2 from '../assets/img/axone.png';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();  // React Router's navigate hook

  const offlineDevices = useMemo(() => devices.filter((device) => device.success_percentage === "0.00"), [devices]);
  const onlineDevices = useMemo(() => devices.filter((device) => device.success_percentage === "100.00"), [devices]);

  const fetchData = () => {
    fetch(`http://localhost:5001/status`)
      .then((response) => response.json())
      .then((data) => { 
        setDevices(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData(); 
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000); 

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    // Logic to handle logout
    console.log('Logging out...');
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex-1 flex flex-col relative">
        <header className="flex justify-between items-center p-2 shadow-md z-10 bg-gray-100 dark:bg-gray-900">
          {/* Logos Bar */}
          <div className="flex space-x-4">
            <div className='flex flex-row'>
              <img src={logo1} alt="Logo 1" className="h-12" />
              <p className='mt-3 text-blue-500 font-bold'>Magnetoo</p>
            </div>
            <img src={logo2} alt="Logo 2" className="h-12 left-0" />
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-2 overflow-y-auto relative z-0">
          {/* Devices Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Devices Card */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 h-52 flex flex-col items-center justify-center rounded-2xl shadow-2xl transform transition duration-300 hover:scale-105 border border-gray-800 p-6">
              <FaServer className="text-5xl text-gray-400 mb-4 animate-pulse" />
              <div className="text-xl font-semibold text-gray-400 mb-2">Total Devices</div>
              <div className="text-6xl font-bold text-white">{devices.length}</div>
            </div>

            {/* Online Devices Card */}
            <div className="bg-gradient-to-r from-green-800 to-green-700 h-52 flex flex-col items-center justify-center rounded-2xl shadow-2xl transform transition duration-300 hover:scale-105 border border-green-700 p-6">
              <FaWifi className="text-5xl text-green-300 mb-4 animate-bounce" />
              <div className="text-xl font-semibold text-green-300 mb-2">Online Devices</div>
              <div className="text-6xl font-bold text-white">{onlineDevices.length}</div>
            </div>

            {/* Offline Devices Card */}
            <div className="bg-gradient-to-r from-red-800 to-red-700 h-52 flex flex-col items-center justify-center rounded-2xl shadow-2xl transform transition duration-300 hover:scale-105 border border-red-700 p-6">
              <FaPowerOff className="text-5xl text-red-300 mb-4 animate-spin-slow" />
              <div className="text-xl font-semibold text-red-300 mb-2">Offline Devices</div>
              <div className="text-6xl font-bold text-white">{offlineDevices.length}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-gray-800 h-[300px] rounded-lg shadow-lg p-2 border border-gray-700">
              <LineChart
                title="Packet Loss Over Time"
                data={devices.map(entry => ({
                  pinged_at: entry.pinged_at,
                  value: entry.packet_loss,
                }))}
              />
            </div>

            {/* Offline Devices Table Section */}
            <div className="bg-gray-800 h-[300px] rounded-lg shadow-lg p-4 border border-gray-700 overflow-x-auto">
              <h2 className="text-xl font-bold mb-4 text-white">Offline Devices</h2>
              <table className="min-w-full text-center table-auto">
                <thead>
                  <tr className="bg-gray-700 text-gray-300">
                    <th className="px-4 py-3 text-sm font-bold border-b border-gray-600">IP Address</th>
                    <th className="px-4 py-3 text-sm font-bold border-b border-gray-600">Department</th>
                    <th className="px-4 py-3 text-sm font-bold border-b border-gray-600">Last Seen Offline</th>
                  </tr>
                </thead>
                <tbody>
                  {offlineDevices.length > 0 ? (
                    offlineDevices.map((device, index) => (
                      <tr key={index} className={`border-t border-gray-600 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-600 transition-colors duration-200`}>
                        <td className="px-4 py-3 text-sm text-white">{device.ip_address}</td>
                        <td className="px-4 py-3 text-sm text-white">{device.department}</td>
                        <td className="px-4 py-3 text-sm text-white">{new Date(device.pinged_at).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-4 py-3 text-center text-sm text-gray-400" colSpan="3">
                        No offline devices found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* New Div with max width */}
          <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="text-gray-300">
              <RDCDiagram switchers={devices}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
