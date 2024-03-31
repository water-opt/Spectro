import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/DeliveryMain.css'; 

const DeliveryDashboardAdmin = () => {
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  return (
    <div className='container'>
      <div className='header'>
        <h1>Delivery Dashboard</h1>
      </div>
      <nav className='navigation'>
        <ul>
          <li>
            <Link to='/riders/registrationform'>
              <i className='fas fa-user-plus'></i> New Riders
            </Link>
          </li>
          <li>
            <Link to='/vehicles/registrationform'>
              <i className='fas fa-truck-pickup'></i> New Vehicles
            </Link>
          </li>
          <li>
            <Link to='/riders/dashboard'>
              <i className='fas fa-users'></i> All Riders
            </Link>
          </li>
          <li>
            <Link to='/vehicles/dashboard'>
              <i className='fas fa-truck'></i> All Vehicles
            </Link>
          </li>
        </ul>
      </nav>
      <div className='content'>
        {/* Add content specific to the current page here (optional) */}
      </div>
    </div>
  );
};

export default DeliveryDashboardAdmin;
