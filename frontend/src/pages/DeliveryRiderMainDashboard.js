import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/DeliveryRiderDashboard.css';

const MainRiderDashboard = () => {
  const navigate = useNavigate();
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  useEffect(() => {
    const fetchAcceptedOrders = async () => {
      try {
        const response = await fetch('/api/order/rider');
        const data = await response.json();
        setAcceptedOrders(data);
<<<<<<< HEAD
        console.log(data)
=======
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
      } catch (error) {
        console.error('Error fetching accepted orders:', error);
      }
    };

    fetchAcceptedOrders();
  }, []);

<<<<<<< HEAD
  return (
    <div className='container'>
      <header className='header'>
        <h1 className='logo'>Delivery Dashboard</h1>
        <div className='profile-info'>
          {/* Display rider name or other relevant information */}
          <i className='fas fa-user-circle'></i>
          <span>John Doe</span>
        </div>
      </header>
      <nav className='navigation'>
        <ul>
          <li>
            <Link to='/delivery/orders' className='navigation-link'>
              <i className='fas fa-list'></i> Available Orders
            </Link>
          </li>
          <li>
            <Link to='#' className='navigation-link active'>
              <i className='fas fa-check-circle'></i> Accepted Orders
              <span className='badge'>{acceptedOrders.length}</span>
=======
  const handleOrderClick = (orderId) => {
    navigate(`/riders/orders/${orderId}`);
  };

  return (
    <div className="delivery-rider-dashboard">
      <header className="header">
        <h1 className="logo">Delivery Dashboard</h1>
        <div className="profile-info">
          <i className="fas fa-user-circle"></i>
          <span>John Doe</span>
        </div>
      </header>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/delivery/orders" className="navigation-link">
              <i className="fas fa-list"></i> Available Orders
            </Link>
          </li>
          <li>
            <Link to="#" className="navigation-link active">
              <i className="fas fa-check-circle"></i> Accepted Orders
              <span className="badge">{acceptedOrders.length}</span>
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
            </Link>
          </li>
        </ul>
      </nav>
<<<<<<< HEAD
      <main className='content'>
        <h2>Accepted Orders</h2>
        {acceptedOrders.length > 0 ? (
          <ul className='orders-list'>
            {acceptedOrders.map((order) => (
              <li key={order.id} className='order-item'>
                <div className='order-details'>
=======
      <main className="content">
        <h2>Accepted Orders</h2>
        {acceptedOrders.length > 0 ? (
          <ul className="orders-list">
            {acceptedOrders.map((order) => (
              <li key={order.id} className="order-item" onClick={() => handleOrderClick(order.id)}>
                <div className="order-details">
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
                  <h3>Order ID: {order._id}</h3>
                  <p>Customer: {order.user.username}</p>
                  <p>Delivery Address: {order.user.address}</p>
                  {/* Add more order details if needed */}
                </div>
<<<<<<< HEAD
                <button className='view-order-btn' onClick={() => navigate(`/riders/orders/${order.id}`)}>
                  View Order Details
                </button>
=======
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
              </li>
            ))}
          </ul>
        ) : (
<<<<<<< HEAD
          <p className='no-orders-message'>You currently have no accepted orders.</p>
=======
          <p className="no-orders-message">You currently have no accepted orders.</p>
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
        )}
      </main>
    </div>
  );
};

export default MainRiderDashboard;
