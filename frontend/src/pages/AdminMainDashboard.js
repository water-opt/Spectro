import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/MainDash.css';
import axios from 'axios';
import { useRole } from '../components/RoleContext';

const MainAdminDashboard = () => {
    const [orders, setOrders] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState(false);
    const [isSidePanelOpen, setSidePanelOpen] = useState(false);
    const { role } = useRole();
    const sidePanelRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/login');
        } else {
            axios.get('/api/orders/all')
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Failed to fetch data');
                    }
                    setOrders(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setErrors(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        const handleOutsideClick = (event) => {
            if (sidePanelRef.current && !sidePanelRef.current.contains(event.target)) {
                setSidePanelOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [role, navigate]);

    const toggleSidePanel = () => {
        setSidePanelOpen(!isSidePanelOpen);
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'orange';
            case 'processing':
                return 'blue';
            case 'cancelled':
                return 'red';
            case 'finished':
                return 'green';
            default:
                return 'gray';
        }
    }

    const totalOrderAmount = orders ? orders.reduce((total, order) => total + order.total, 0) : 0;

    return (
        <div className='container-dashboard'>
            <div className='upper-container' style={{ marginTop: '50px' }}>
                <div className='upper-left-container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='small-container enhanced' style={{ backgroundColor: '#FFFFFF', width: '150px', height: '150px', cursor: 'pointer' }} onClick={() => console.log('Total Sales Clicked')}>
                        <p style={{ paddingTop: '10px', paddingLeft: '10px', color: '#333' }}><strong>Total Sales</strong></p>
                        <p style={{ textAlign: 'center', marginTop: '35px', fontSize: '18px', color: '#007bff' }}><strong>LKR {totalOrderAmount}</strong></p>
                    </div>
                    <div className='small-container enhanced' style={{ backgroundColor: '#FFFFFF', width: '150px', height: '150px', cursor: 'pointer' }} onClick={() => console.log('Pending Orders Clicked')}>
                        <p style={{ paddingTop: '10px', paddingLeft: '10px', color: '#333' }}><strong>Pending,</strong></p>
                        <p style={{ textAlign: 'center', marginTop: '35px', fontSize: '18px', color: '#ffc107' }}><strong># (Count)</strong></p>
                    </div>
                    <div className='small-container enhanced' style={{ backgroundColor: '#FFFFFF', width: '150px', height: '150px', cursor: 'pointer' }} onClick={() => console.log('Processing Orders Clicked')}>
                        <p style={{ paddingTop: '10px', paddingLeft: '10px', color: '#333' }}><strong>Processing,</strong></p>
                        <p style={{ textAlign: 'center', marginTop: '35px', fontSize: '18px', color: '#28a745' }}><strong># (Count)</strong></p>
                    </div>
                    <div className='small-container enhanced' style={{ backgroundColor: '#FFFFFF', width: '150px', height: '150px', cursor: 'pointer' }} onClick={() => console.log('Cancelled Orders Clicked')}>
                        <p style={{ paddingTop: '10px', paddingLeft: '10px', color: '#333' }}><strong>Cancelled,</strong></p>
                        <p style={{ textAlign: 'center', marginTop: '35px', fontSize: '18px', color: '#dc3545' }}><strong># (Count)</strong></p>
                    </div>
                </div>
                <div className='upper-right-container'>
                    Upper Right Container
                </div>
            </div>
            <div className='bottom-container'>
                <div className='bottom-left-container'>
                    Bottom Left Container
                </div>
                <div className='bottom-right-container'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : errors ? (
                        <p>Error fetching data</p>
                    ) : (
                        <table className='orders-table'>
                            <thead>
                                <tr>
                                    <th>Order Number</th>
                                    <th>Placed at</th>
                                    <th></th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>#{order._id}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <span
                                                className='status-box'
                                                style={{ backgroundColor: getStatusColor(order.status) }}
                                            ></span>
                                            {order.status}
                                        </td>
                                        <td>LKR {order.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <div ref={sidePanelRef} className={`side-panel ${isSidePanelOpen ? 'open' : ''}`}>
                <div className='title-container'>
                    <p>Admin Menu</p>
                </div>
                <div className='options-container'>
                    <Link to='/delivery/main/dashboard' className='option'>Delivery Options</Link>
                    <Link to='/admin/dashboard' className='option'>Product Options</Link>
                    <Link to='#' className='option'>Supplier Requests</Link>
                </div>
            </div>
            <button className='toggle-button' onClick={toggleSidePanel}>
                {isSidePanelOpen ? 'Close Side Panel' : 'Open Side Panel'}
            </button>
        </div>
    );
};

export default MainAdminDashboard;
