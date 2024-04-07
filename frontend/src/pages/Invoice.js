import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Invoice.css';
import axios from 'axios';

const Invoice = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

<<<<<<< HEAD
    console.log(orderId)

=======
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/orders/${orderId}`);
                setOrder(response.data);
                setLoading(false);
            } catch (error) {
                console.log(`error: ${error}`);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

<<<<<<< HEAD
=======
    const handlePrint = () => {
        window.print();
    };

>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
    return (
        <div className="invoice-container">
            {loading && <p>Loading...</p>}
            {order && (
                <>
<<<<<<< HEAD
                    <div className="invoice-header">
                        <h2>Invoice</h2>
                        <p>Invoice Number: #{order._id}</p>
                    </div>
=======
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
                    <div className="invoice-details">
                        <div className="invoice-details-left">
                            <h3>Bill From</h3>
                            <p>Spectro PVT Limited</p>
                            <p>Ja-ela road</p>
                            <p>Kirindiwita, Western Province</p>
                            <p>Email: contactus@spectro.com</p>
                        </div>
                        <div className="invoice-details-right">
                            <h3>Bill To</h3>
                            <p>{order.user.username}</p>
<<<<<<< HEAD
                            <p>Email: {order.user.email}</p>
                            <p>{order.user.address}</p>
=======
                            <p><strong>Email:</strong> {order.user.email}</p>
                            <p><strong>Contact:</strong> {order.user.mobile}</p>
                            <p><strong>Address:</strong> {order.user.address}</p>
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
                        </div>
                    </div>
                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
<<<<<<< HEAD
                        <tbody> 
                            {order && (
                                <tr key={order._id}>
                                    <td>{order.product.productName}</td>
                                    <td>{order.quantity}</td>
                                    <td>${order.product.productPrice.toFixed(2)}</td>
                                    <td>${(order.quantity * order.product.productPrice).toFixed(2)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="invoice-footer">
                        <p>Subtotal: ${order.total.toFixed(2)}</p>
                    </div>
=======
                        <tbody>
                            {order.orderItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product.productName}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.product.productPrice}</td>
                                    <td>${(item.quantity * item.product.productPrice).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="invoice-footer">
                        <span style={{ position: 'absolute', left: '175px', marginTop: '10px' }}>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                        <p>Subtotal: ${order.total.toFixed(2)}</p>
                    </div>
                    <button onClick={handlePrint}>Print</button>
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
                </>
            )}
        </div>
    );
};

export default Invoice;
