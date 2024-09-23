import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/ConfigurationPage';
import LoginPage from './pages/LoginPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LoginPage />} />
       
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
