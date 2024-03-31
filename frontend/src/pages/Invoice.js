import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Invoice.css';
import axios from 'axios';

const Invoice = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    console.log(orderId)

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

    return (
        <div className="invoice-container">
            {loading && <p>Loading...</p>}
            {order && (
                <>
                    <div className="invoice-header">
                        <h2>Invoice</h2>
                        <p>Invoice Number: #{order._id}</p>
                    </div>
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
                            <p>Email: {order.user.email}</p>
                            <p>{order.user.address}</p>
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
                </>
            )}
        </div>
    );
};

export default Invoice;
