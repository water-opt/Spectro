import React, { useState, useEffect } from 'react'
import '../styles/Cart.css'
import axios from 'axios'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true)
            try {
                const itemsRaw = await fetch('/api/cart')
                const itemJson = await itemsRaw.json()
                setCartItems(itemJson)
            } catch (errors) {
                console.log('error fetching data')
            }
            setLoading(false)
        }

        fetchCartItems()
    }, [])

    const updateQuantity = async (productId, quantity) => {
        try {
            await fetch(`/api/cart/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity })
            });
            // Update local state
            const updatedCartItems = cartItems.map(item => {
                if (item.product._id === productId) {
                    return { ...item, quantity };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const totalPrice = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    const deleteItem = async (id) => {
        try {
            await axios.delete(`api/cart/${id}`)
            console.log('successfully deleted')
        } catch (errors) {
            console.log(errors)
        }
    }

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
                                    <img src={item.product.fileName} alt={item.product.title} />
                                    <div>
                                        <p>{item.product.title}</p>
                                        <div className="quantity">
                                            <button className="quantity-button" onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className="quantity-button" onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                                            <button className='delete-btn' onClick={() => deleteItem(item._id)}>X</button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
    );
};

export default Cart;
