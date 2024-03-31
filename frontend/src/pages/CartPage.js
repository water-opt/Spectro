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
                }
                return item;
            });
            setCartItems(updatedCartItems);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

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
    

    return (
        <div className="cart-container">
            {loading && <p>Loading...</p>}
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
            )}
        </div>
    );
};

export default Cart;
