import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LineChart from '../assets/charts/LineChart';
import RDCDiagram from '../assets/charts/RDCdiagram';
import { FaServer, FaWifi, FaPowerOff, FaChartLine } from "react-icons/fa";
import { MdDevices, MdError } from 'react-icons/md';
import logo1 from '../assets/img/Magnetoo-logo.jpeg';
import logo2 from '../assets/img/axone.png';
import Navbar from './Navbar';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  const offlineDevices = useMemo(() => (Array.isArray(devices) ? devices.filter((device) => device.success_percentage === "0.00") : []), [devices]);
  const onlineDevices = useMemo(() => (Array.isArray(devices) ? devices.filter((device) => device.success_percentage === "100.00") : []), [devices]);

  const fetchData = () => {
    fetch(`http://localhost:5001/status`)
      .then((response) => response.json())
      .then((data) => { 
        setDevices(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Erreur lors de la récupération des données :", error));
  };

  useEffect(() => {
    fetchData(); 
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000); 

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    console.log('Déconnexion...');
    navigate('/');
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex-1 flex flex-col relative">
        <Navbar handleLogout={handleLogout} />

        <main className="flex-1 p-4 overflow-y-auto relative z-0">
          {/* Section Vue d'ensemble des dispositifs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Carte Dispositifs Totaux */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 h-40 flex flex-col items-center justify-center rounded-xl shadow-lg transition duration-300 hover:scale-105 border border-gray-600 p-4">
              <MdDevices className="text-4xl text-gray-300 mb-2" />
              <div className="text-lg font-medium text-gray-300 mb-1">Dispositifs Totaux</div>
              <div className="text-4xl font-bold text-white">{devices.length}</div>
            </div>

            {/* Carte Dispositifs En Ligne */}
            <div className="bg-gradient-to-r from-green-700 to-green-600 h-40 flex flex-col items-center justify-center rounded-xl shadow-lg transition duration-300 hover:scale-105 border border-green-600 p-4">
              <FaWifi className="text-4xl text-green-300 mb-2" />
              <div className="text-lg font-medium text-green-300 mb-1">Dispositifs En Ligne</div>
              <div className="text-4xl font-bold text-white">{onlineDevices.length}</div>
            </div>

            {/* Carte Dispositifs Hors Ligne */}
            <div className="bg-gradient-to-r from-red-700 to-red-600 h-40 flex flex-col items-center justify-center rounded-xl shadow-lg transition duration-300 hover:scale-105 border border-red-600 p-4">
              <FaPowerOff className="text-4xl text-red-300 mb-2 animate-spin-slow" />
              <div className="text-lg font-medium text-red-300 mb-1">Dispositifs Hors Ligne</div>
              <div className="text-4xl font-bold text-white">{offlineDevices.length}</div>
            </div>
          </div>

          {/* Section Perte de Paquets et Tableau des Dispositifs Hors Ligne */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Graphique Perte de Paquets */}
            <div className="bg-gray-800 rounded-lg shadow-md p-3 border border-gray-700">
              <div className="flex items-center space-x-2 mb-3">
                <FaChartLine className="text-lg text-gray-400" />
                <h2 className="text-lg font-bold text-white">Perte de Paquets au Fil du Temps</h2>
              </div>
              <LineChart
                data={devices.map(entry => ({
                  pinged_at: entry.pinged_at,
                  value: entry.packet_loss,
                }))}
              />
            </div>

            {/* Tableau des Dispositifs Hors Ligne */}
            <div className="bg-gray-800 rounded-lg shadow-md p-3 border border-gray-700 overflow-x-auto">
              <div className="flex items-center space-x-2 mb-3">
                <MdError className="text-lg text-red-300" />
                <h2 className="text-lg font-bold text-white">Dispositifs Hors Ligne</h2>
              </div>
              <table className="min-w-full text-center table-auto">
                <thead>
                  <tr className="bg-gray-700 text-gray-300">
                    <th className="px-3 py-2 text-xs font-bold border-b border-gray-600">Adresse IP</th>
                    <th className="px-3 py-2 text-xs font-bold border-b border-gray-600">Service</th>
                    <th className="px-3 py-2 text-xs font-bold border-b border-gray-600">Dernière Détection Hors Ligne</th>
                  </tr>
                </thead>
                <tbody>
                  {offlineDevices.length > 0 ? (
                    offlineDevices.map((device, index) => (
                      <tr key={index} className={`border-t border-gray-600 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-600 transition-colors duration-200`}>
                        <td className="px-3 py-2 text-xs text-white">{device.ip_address}</td>
                        <td className="px-3 py-2 text-xs text-white">{device.department}</td>
                        <td className="px-3 py-2 text-xs text-white">{new Date(device.pinged_at).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-3 py-2 text-center text-xs text-gray-400" colSpan="3">
                        Aucun dispositif hors ligne trouvé.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section Diagramme RDC */}
          <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg">
            
            <div className="text-gray-300">
              
              <RDCDiagram switchers={devices} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
