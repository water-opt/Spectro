import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Orders.css';

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
};

export default Orders;
