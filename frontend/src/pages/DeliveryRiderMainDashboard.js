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
      } catch (error) {
        console.error('Error fetching accepted orders:', error);
      }
    };

    fetchAcceptedOrders();
  }, []);

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
            </Link>
          </li>
        </ul>
      </nav>
      <main className="content">
        <h2>Accepted Orders</h2>
        {acceptedOrders.length > 0 ? (
          <ul className="orders-list">
            {acceptedOrders.map((order) => (
              <li key={order.id} className="order-item" onClick={() => handleOrderClick(order.id)}>
                <div className="order-details">
                  <h3>Order ID: {order._id}</h3>
                  <p>Customer: {order.user.username}</p>
                  <p>Delivery Address: {order.user.address}</p>
                  {/* Add more order details if needed */}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-orders-message">You currently have no accepted orders.</p>
        )}
      </main>
    </div>
  );
};

export default MainRiderDashboard;