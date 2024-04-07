<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Cart.css'
import axios from 'axios'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true)
            try {
                const itemsRaw = await fetch('/api/cart')
                const itemJson = await itemsRaw.json()
                setCartItems(itemJson)
                console.log(cartItems)
            } catch (error) {
                console.log('error fetching data')
            }
            setLoading(false)
        }

        fetchCartItems()
    }, [])

    const updateQuantity = async (id, quantity) => {
        try {
            await fetch(`/api/cart/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity })
            });
            const updatedCartItems = cartItems.map(item => {
                if (item.product._id === id) {
                    return { ...item, quantity };
=======
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [confirmStep, setConfirmStep] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/cart');
                setCartItems(response.data);
                updateTotalPrice(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
            setLoading(false);
        };

        fetchCartItems();
    }, []);

    const updateQuantity = async (id, newQuantity, index) => {
        console.log(id)
        try {
            await axios.put(`/api/cart/${id}`, { quantity: newQuantity });
            const updatedCartItems = cartItems.map(item => {
                if (item.orderItems && item.orderItems[index].product._id === id) {
                    item.orderItems[index].quantity = newQuantity;
                    item.orderItems[index].total = newQuantity * item.orderItems[index].product.productPrice;
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
                }
                return item;
            });
            setCartItems(updatedCartItems);
<<<<<<< HEAD
=======
            updateTotalPrice(updatedCartItems);
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

<<<<<<< HEAD
    const totalPrice = cartItems.reduce((total, item) => total + (item.product.productPrice * item.quantity), 0);

    const deleteItem = async (id) => {  
        if (window.confirm('Confirm removing ..')) {
            try {
                await axios.delete(`api/cart/${id}`);
                setCartItems(prevItems => prevItems.filter(item => item.product._id !== id));              
                alert('Deleted successfully ..');
            } catch (error) {
                console.log('Error deleting product:', error);
            }
        }
        alert('Item removed ..');
    }

    const placeOrder = async () => {
        try {
          const orderItems = cartItems?.map(item => ({
            product: { _id: item.product._id },
            quantity: item.quantity,
            total: totalPrice
          }));
      
          if (!orderItems || orderItems.length === 0) {
            console.log('Cart is empty');
            return;
          }
      
          const response = await axios.post('/api/orders', { orderItems });
          console.log('Response data:', response.data);
      
          if (response.data.orderIds && response.data.orderIds.length > 0) {
            const orderId = response.data.orderIds;
            setOrderPlaced(true);
            setCartItems([]);
            setOrderId(orderId);
      
            // Redirect to the invoice page after successful order placement
            navigate(`/orders/invoice/${orderId}`);
          } else {
            console.error('Order ID not found in response');
          }
        } catch (error) {
          console.error('Error placing order:', error);
        }
      };
    
=======
    const deleteItem = async (id) => {
        if (window.confirm('Confirm removing ..')) {
            try {
                await axios.delete(`/api/cart/${id}`);
                const updatedCartItems = cartItems.filter(item => item._id !== id);
                setCartItems(updatedCartItems);
                updateTotalPrice(updatedCartItems);
                alert('Deleted successfully ..');
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const updateTotalPrice = (items) => {
        const newTotalPrice = items.reduce((total, item) => total + (item.orderItems ? item.orderItems[0].total || 0 : 0), 0);
        setTotalPrice(newTotalPrice);
    };

    const placeOrder = async () => {
        try {
            setConfirmStep(true);
            setTimeout(async () => {
                const orderItems = cartItems.map(item => ({
                    product: item.orderItems ? item.orderItems[0].product : null,
                    quantity: item.orderItems ? item.orderItems[0].quantity : null,
                    total: item.orderItems ? item.orderItems[0].total : null,
                })).filter(orderItem => orderItem.product && orderItem.quantity && orderItem.total);

                const response = await axios.post('/api/orders', { orderItems, totalPrice });
                console.log('Response data:', response.data);

                if (response.data.orderId) {
                    const orderId = response.data.orderId;
                    setOrderPlaced(true);
                    setCartItems([]);
                    setOrderId(orderId);
                    navigate(`/orders/invoice/${orderId}`);
                } else {
                    console.error('Order ID not found in response');
                }
            }, 10000);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54

    return (
        <div className="cart-container">
            {loading && <p>Loading...</p>}
<<<<<<< HEAD
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Items</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems && cartItems.map(item => (
                        <tr key={item.product._id}>
                            <td>
                                <div className="item-info">
                                    <img src={`/uploads/${item.product.fileName}`} alt={item.product.productName} />
                                    <div>
                                        <p>{item.product.productName}</p>
                                        <div className="quantity">
                                            <button className="quantity-button" onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className="quantity-button" onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                                            <button className='delete-btn' onClick={() => deleteItem(item._id)}>X</button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>${(item.product.productPrice * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            {!orderPlaced && (
                <button onClick={placeOrder}>Place Order</button>
            )}
            {orderPlaced && (
                <p>Order placed successfully!</p>
=======
            {!confirmStep && (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {item.orderItems && item.orderItems.map((orderItem, subIndex) => (
                                            <div className="item-info" key={subIndex} style={{ marginTop: '6px' }}>
                                                <img src={`/uploads/${orderItem.product.fileName}`} alt={orderItem.product.productName} />
                                                <div>
                                                    <p>{orderItem.product.productName}</p>
                                                    <div className="quantity">
                                                        <button className="fas fa-minus" onClick={() => updateQuantity(orderItem.product._id, orderItem.quantity - 1, subIndex)}></button>
                                                        <span>{orderItem.quantity}</span>
                                                        <button className="fas fa-plus" onClick={() => updateQuantity(orderItem.product._id, orderItem.quantity + 1, subIndex)}></button>
                                                        <button className='fas fa-trash' onClick={() => deleteItem(orderItem.product._id)}></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                    <td>${item.orderItems.reduce((total, orderItem) => total + (orderItem.total || 0), 0).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    {!orderPlaced && (
                        <button onClick={placeOrder}>Place Order</button>
                    )}
                    {orderPlaced && (
                        <p>Order placed successfully!</p>
                    )}
                </>
            )}
            {confirmStep && (
                <div className="confirmation-page" style={{ display: 'flex', flexDirection: 'row' }}>
                    <p>We will contact you soon. Please be in touch.<br/> <span style={{ color: 'gray' }}>*you can't cancel the order after 24 hours.</span> </p>
                    <div className="loading-spinner" style={{ marginLeft: '150px', marginTop: '15px' }}></div>
                    <Link to='/admin/shop'><button style={{ marginTop: '100px', marginLeft: '90px' }}>Cancel</button></Link>
                </div>
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
            )}
        </div>
    );
};

export default Cart;
