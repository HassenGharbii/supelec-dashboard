const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const axios = require('axios');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

let pool;
let pingIntervals = {};  // Store intervals by IP address

// MySQL connection pool
const createMySQLConnection = async () => {
  try {
    const pool = mysql.createPool({
      host: 'db',  
      user: 'supelecadmin',
      password: 'supelecadmin',
      database: 'supelecdb',
      port: 3306,  
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    console.log('MySQL connection pool created.');
    return pool;
  } catch (err) {
    console.error('Error creating MySQL connection pool:', err);
    throw new Error('Failed to connect to MySQL.');
  }
};

// Function to create the `host_pings` table if it doesn't exist
// Function to create the `host_pings` table if it doesn't exist
const createTable = async (pool) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS host_pings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ip_address VARCHAR(15) NOT NULL,
      hostname VARCHAR(100) NOT NULL,
      department VARCHAR(100) DEFAULT 'Unknown',
      success_percentage DECIMAL(5, 2),
      packet_loss DECIMAL(5, 2),
      min_rtt_ms DECIMAL(10, 2),
      max_rtt_ms DECIMAL(10, 2),
      avg_rtt_ms DECIMAL(10, 2),
      pinged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    const connection = await pool.getConnection();
    await connection.query(createTableQuery);  
    connection.release();
    console.log('host_pings table created or already exists');
  } catch (err) {
    console.error('Error creating host_pings table:', err);
    throw err;
  }
};



// Initialize the MySQL connection pool and create the table
const initialize = async () => {
  try {
    pool = await createMySQLConnection();
    await createTable(pool);
  } catch (err) {
    console.error('Error during initialization:', err);
    throw err;
  }
};

// Ping an IP and save results to the database
app.post('/add-host', async (req, res) => {
  const { ip_address, hostname, department } = req.body;  // Add department here
  if (!ip_address || !hostname || !department) {
    return res.status(400).send('IP address, hostname, and department are required');
  }

  try {
    const pingResponse = await axios.post('http://python-api:5000/ping', { ips: [ip_address] });
    const pingResult = pingResponse.data[ip_address]; 

    const { success_percentage, packet_loss, min_rtt_ms, max_rtt_ms, avg_rtt_ms } = pingResult;

    const connection = await pool.getConnection();

    const query = `
      INSERT INTO host_pings (ip_address, hostname, department, success_percentage, packet_loss, min_rtt_ms, max_rtt_ms, avg_rtt_ms)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    await connection.query(query, [
      ip_address,
      hostname,
      department,  // Include department in the query
      success_percentage,
      packet_loss,
      min_rtt_ms,
      max_rtt_ms,
      avg_rtt_ms
    ]);

    connection.release();
    res.status(200).send({ message: 'Host added and ping results saved successfully' });

    // Start pinging the new host every 10 seconds
    if (!pingIntervals[ip_address]) {
      console.log(`Starting to ping new host: ${ip_address}`);
      pingIntervals[ip_address] = setInterval(async () => {
        try {
          const pingResponse = await axios.post('http://python-api:5000/ping', { ips: [ip_address] });
          const pingResult = pingResponse.data[ip_address];

          const { success_percentage, packet_loss, min_rtt_ms, max_rtt_ms, avg_rtt_ms } = pingResult;

          const connection = await pool.getConnection();
          await connection.query(query, [
            ip_address,
            hostname,
            department,  // Include department in the interval query as well
            success_percentage,
            packet_loss,
            min_rtt_ms,
            max_rtt_ms,
            avg_rtt_ms
          ]);
          connection.release();
        } catch (error) {
          console.error(`Error pinging ${ip_address}:`, error);
        }
      }, 10000);  // Ping every 10 seconds
    }
  } catch (error) {
    console.error('Error communicating with Flask API or saving to the database:', error);
    res.status(500).send('Error communicating with Flask API or saving to the database');
  }
});


// Route to delete a host from the database
app.post('/delete-host', async (req, res) => {
  const { ip_address } = req.body;
  if (!ip_address) {
    return res.status(400).send('IP address is required');
  }

  const query = 'DELETE FROM host_pings WHERE ip_address = ?';

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(query, [ip_address]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Host not found' });
    }

    // Clear the interval for the IP address if it exists
    if (pingIntervals[ip_address]) {
      clearInterval(pingIntervals[ip_address]);
      delete pingIntervals[ip_address];
    }

    res.status(200).json({ message: 'Host deleted successfully' });
  } catch (err) {
    console.error('Error deleting host:', err);
    res.status(500).json({ message: 'Error deleting host from the database' });
  }
});

// Function to start pinging all hosts when the server starts
// Function to start pinging all hosts when the server starts
const startPingingAllHosts = async () => {
  const query = `
    SELECT ip_address, hostname, department
    FROM host_pings;
  `;

  try {
    const connection = await pool.getConnection();
    const [hosts] = await connection.query(query);
    connection.release();

    if (hosts.length === 0) {
      console.log('No hosts found to ping.');
      return;
    }

    hosts.forEach(host => {
      const { ip_address, hostname, department } = host;

      // Start pinging the host every 10 seconds
      if (!pingIntervals[ip_address]) {
        console.log(`Resuming ping for host: ${hostname} (${ip_address}) from department: ${department}`);
        pingIntervals[ip_address] = setInterval(async () => {
          try {
            const pingResponse = await axios.post('http://python-api:5000/ping', { ips: [ip_address] });
            const pingResult = pingResponse.data[ip_address];

            const { success_percentage, packet_loss, min_rtt_ms, max_rtt_ms, avg_rtt_ms } = pingResult;

            const connection = await pool.getConnection();
            const query = `
              INSERT INTO host_pings (ip_address, hostname, department, success_percentage, packet_loss, min_rtt_ms, max_rtt_ms, avg_rtt_ms)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
              ON DUPLICATE KEY UPDATE
                success_percentage = VALUES(success_percentage),
                packet_loss = VALUES(packet_loss),
                min_rtt_ms = VALUES(min_rtt_ms),
                max_rtt_ms = VALUES(max_rtt_ms),
                avg_rtt_ms = VALUES(avg_rtt_ms),
                pinged_at = CURRENT_TIMESTAMP;
            `;

            await connection.query(query, [
              ip_address,
              hostname,
              department,
              success_percentage,
              packet_loss,
              min_rtt_ms,
              max_rtt_ms,
              avg_rtt_ms
            ]);
            connection.release();
          } catch (error) {
            console.error(`Error pinging ${ip_address}:`, error);
          }
        }, 10000);  // Ping every 10 seconds
      }
    });
  } catch (error) {
    console.error('Error fetching hosts on server startup:', error);
  }
};
app.get('/data', async (req, res) => {
  const query = `
    SELECT ip_address, hostname, department, success_percentage, packet_loss, min_rtt_ms, max_rtt_ms, avg_rtt_ms, pinged_at
    FROM host_pings
    ORDER BY pinged_at DESC;
  `;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(query);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No data found' });
      
    }
    console.log(rows)

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data from the database' });
  }
});
// Route to delete all records for a host from the database
app.post('/delete', async (req, res) => {
  const { ip_address } = req.body;
  if (!ip_address) {
    return res.status(400).send('IP address is required');
  }

  const query = 'DELETE FROM host_pings WHERE ip_address = ?';

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(query, [ip_address]);
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No records found for this IP address' });
    }

    // Clear the interval for the IP address if it exists
    if (pingIntervals[ip_address]) {
      clearInterval(pingIntervals[ip_address]);
      delete pingIntervals[ip_address];
    }

    res.status(200).json({ message: 'All records for the host deleted successfully' });
  } catch (err) {
    console.error('Error deleting host records:', err);
    res.status(500).json({ message: 'Error deleting host records from the database' });
  }
});
app.get('/status', async (req, res) => {
  const query = `
  SELECT *
FROM host_pings l1
INNER JOIN (
    SELECT ip_address,hostname,MAX(pinged_at) AS most_recent_ping
    FROM host_pings
    GROUP BY ip_address,hostname
) l2 ON l1.ip_address = l2.ip_address
AND l1.hostname = l2.hostname
AND l1.pinged_at = l2.most_recent_ping;

`;

try {
  const connection = await pool.getConnection();
  const [rows] = await connection.query(query);
  connection.release();

  if (rows.length === 0) {
    return res.status(404).json({ message: 'No data found' });
    
  }
  console.log(rows)

  res.status(200).json(rows);
} catch (error) {
  console.error('Error fetching dashboard data:', error);
  res.status(500).json({ message: 'Error fetching dashboard data from the database' });
}
  
}
)
  


// Start the server
app.listen(port, async () => {
  await initialize();
  console.log(`Node.js server running on http://localhost:${port}`);

  // Start pinging all hosts that are already in the database
  startPingingAllHosts();
});
