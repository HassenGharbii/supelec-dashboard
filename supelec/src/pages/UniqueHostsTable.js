import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UniqueHostsTable() {
  const [uniqueHosts, setUniqueHosts] = useState([]);

  useEffect(() => {
    const fetchUniqueHosts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/unique-hosts');
        setUniqueHosts(response.data);  // Set the unique hosts in state
      } catch (error) {
        console.error('Error fetching unique hosts:', error);
      }
    };

    fetchUniqueHosts();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Unique Hosts</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-gray-700">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">IP Address</th>
              <th className="p-4">Name</th>
            </tr>
          </thead>
          <tbody>
            {uniqueHosts.map((host, index) => (
              <tr key={index} className="bg-gray-50">
                <td className="p-4">{host.ip_address}</td>
                <td className="p-4">{host.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UniqueHostsTable;
