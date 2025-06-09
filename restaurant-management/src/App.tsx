import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import MenuManagement from './components/MenuManagement';
import Orders from './components/Orders';
import Reservations from './components/Reservations';
import StaffManagement from './components/StaffManagement';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/staff" element={<StaffManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 