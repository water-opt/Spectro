import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Orders.css';

<<<<<<< HEAD
const Orders = () => {
    const [orders, setOrders] = useState(null);
    const [filteredOrders, setFilteredOrders] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders');
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        filterOrders();
    }, [orders, searchQuery, dateFilter]);

    const filterOrders = () => {
        if (!orders) return;

        let filtered = [...orders];

        // Apply search by title filter
        if (searchQuery) {
            filtered = filtered.filter(order => order.product && order.product.productName.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // Apply date filter
        if (dateFilter) {
            filtered = filtered.filter(order => new Date(order.createdAt) >= dateFilter);
        }

        setFilteredOrders(filtered);
    };

    const cancelOrder = async (id, title) => {
        if (window.confirm(`Please confirm the cancellation of order '${title}'`)) {
            try {
                await axios.delete(`/api/orders/${id}`);
                setOrders(orders.filter(order => order._id !== id));
                setSelectedOrder(null);
                alert('Order canceled successfully.');
            } catch (error) {
                console.log('Error canceling order:', error);
            }
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDateChange = (event) => {
        const date = event.target.value ? new Date(event.target.value) : null;
        setDateFilter(date);
    };

    const handleRowClick = (order) => {
        setSelectedOrder(order);
    };

    const handleClosePopup = () => {
        setSelectedOrder(null);
    };

    if (error) {
        return (
            <div>
                An error occurred ...
            </div>
        );
    } else if (isLoading) {
        return (
            <div>
                Loading ...
            </div>
        );
    }

    return (
        <div>
            <div style={{ marginTop: '30px' }}>
                <div style={{ marginLeft: '50px' }}>
                    <div>
                        <p style={{ fontSize: '25px', fontWeight: 'bold' }}>Order History</p>
                        <p>Manage your recent orders and invoices.</p>
                        <div className='search-and-filter'>
                            <input className='search' type="text" placeholder="Search by title" value={searchQuery} onChange={handleSearchChange} />
                            <input className='filter' type="date" onChange={handleDateChange} />
                        </div>
                    </div>
                </div>
                <div className="vertical-line" style={{ borderTop: '2px solid #D3D3D3', width: '94%', margin: '0 auto' }}></div>
                <p style={{ marginTop: '28px', marginLeft: '50px' }} ><span style={{ fontSize: '17px', fontWeight: 'bold' }}>Order Details</span><br />Review and manage recent orders</p>
                <div style={{ marginBottom: '100px' }} >
                    <div style={{ marginLeft: '400px', marginRight: '50px' }}>
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th className="col">Title</th>
                                    <th className="col">Date</th>
                                    <th className="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders && filteredOrders.map((order) => (
                                    <tr key={order._id} onClick={() => handleRowClick(order)}>
                                        <td>{order.product ? order.product.productName : 'N/A'}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>LKR {order.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {selectedOrder && (
                <div className="order-details-popup">
                    <div className="popup-content">
                        <span className="close-btn" onClick={handleClosePopup}>×</span>
                        <h2 style={{ marginBottom: '30px', fontWeight: '700', fontSize: '20px' }}>Order Details</h2>
                        <div className="order-details">
                            <p><strong style={{ marginRight: '46px' }}>Title:</strong> {selectedOrder.product ? selectedOrder.product.productName : 'N/A'}</p>
                            <p><strong style={{ marginRight: '45px' }}>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                            <p><strong style={{ marginRight: '17px' }}>Quantity:</strong> {selectedOrder.quantity}</p>
                            <p><strong style={{ marginRight: '30px' }}>Status:</strong> <span className={`status ${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span></p>
                            <p><strong style={{ marginRight: '46px' }}>Total:</strong> LKR {selectedOrder.total}</p>
                        </div>
                        <div className="button-container">
                            <button onClick={() => cancelOrder(selectedOrder._id, selectedOrder.product.productName)}>Cancel Order</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
=======
const getProgressBarStyle = (status) => {
  let color;
  switch (status) {
    case 'pending':
      color = 'yellow';
      break;
    case 'processing':
      color = 'orange';
      break;
    case 'shipped':
      color = 'green';
      break;
    case 'delivered':
      color = 'blue';
      break;
    case 'cancelled':
      color = 'red';
      break;
    default:
      color = 'gray';
  }

  return { backgroundColor: color };
};

const OrderDetailsPopup = ({ selectedOrder, handleClosePopup, cancelOrder }) => (
  <aside className="order-details-popup">
    <button className="close-btn" onClick={handleClosePopup}>
      <span aria-label="Close">×</span>
    </button>
    <div className="item-images">
      {selectedOrder.orderItems.map((item) => (
        <img key={item.product._id} src={`/uploads/${item.product.fileName}`} alt={item.product.productName} />
      ))}
    </div>
    <p>Items: {selectedOrder.orderItems.map((item) => item.product.productName).join(', ')}</p>
    <p>Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
    <p>Total: LKR {selectedOrder.total.toFixed(2)}</p>
    <div className="order-status-details">
      <p>Status: {selectedOrder.status}</p>
      <div className="progress-bar-large" style={getProgressBarStyle(selectedOrder.status)}></div>
    </div>
    {selectedOrder.status !== 'cancelled' && (
      <button className='btn-cancel' onClick={() => cancelOrder(selectedOrder._id)}>Cancel Order</button>
    )}
  </aside>
);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showCancelled, setShowCancelled] = useState(false); // Add state for filtering cancelled orders

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const handleClosePopup = () => {
    setSelectedOrder(null);
  };

  const handleSearch = (e) => {
    setSearchDate(e.target.value);
    const formattedDate = new Date(e.target.value).toLocaleDateString('en-CA');

    const filteredOrders = orders.filter((order) => {
      const formattedOrderDate = new Date(order.createdAt).toLocaleDateString('en-CA');
      return formattedOrderDate.includes(formattedDate);
    });

    setSearchResults(filteredOrders);
  };

  const CancelOrder = async () => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?');
    if (!confirmed) {
      return;
    }
  
    setIsCancelling(true);
    try {
      await axios.put(`/api/orders/${selectedOrder._id}`, { status: 'cancelled' });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id ? { ...order, status: 'cancelled' } : order
        )
      );
      handleClosePopup();
    } catch (error) {
      console.error('Error cancelling order:', error);
      setIsCancelling(false);
    }
  };
  

  const handleShowCancelled = () => {
    setShowCancelled(!showCancelled);
  };

  return (
    <div className="orders-container">
      <header className="header">
        <h1>Order History</h1>
        <div className="search-bar">
          <input
            type="date"
            placeholder="Search by date..."
            value={searchDate}
            onChange={handleSearch}
          />
          {searchResults.length > 0 && <p className="search-results">Showing {searchResults.length} results</p>}
        </div>
        <div className="filter-bar">
          <label htmlFor="show-cancelled">Show Cancelled Orders</label>
          <input
            type="checkbox"
            id="show-cancelled"
            checked={showCancelled}
            onChange={handleShowCancelled}
          />
        </div>
      </header>
      <main className="main-content">
        {error && <div className="error-message">An error occurred while fetching orders.</div>}
        {isLoading && <div className="loading-message">Loading...</div>}
        {!isLoading && !error && (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(searchResults.length > 0 ? searchResults : orders)
                .filter((order) => !showCancelled || order.status === 'cancelled')
                .map((order) => (
                  <tr key={order._id} onClick={() => handleRowClick(order)} className={`order-details-row ${selectedOrder === order ? 'selected' : ''} ${order.status === 'cancelled' ? 'cancelled' : ''}`}>
                    <td>#{order._id}</td>
                    <td className="item-details">
                      <div className="item-summary">
                        {order.orderItems.map((item) => (
                          <span key={item.product._id} className="item-name">
                            {item.product.productName}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>LKR {order.total.toFixed(2)}</td>
                    <td>
                      <div className="order-status">
                        {selectedOrder === order && (
                          <>
                            <div className="progress-bar" style={getProgressBarStyle(order.status)}></div>
                            <p>{order.status}</p>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}
      </main>
      {selectedOrder && <OrderDetailsPopup selectedOrder={selectedOrder} handleClosePopup={handleClosePopup} cancelOrder={CancelOrder} />}
    </div>
  );
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
};

export default Orders;
