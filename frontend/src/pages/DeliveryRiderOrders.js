import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/OrderAccept.css'
import { useNavigate } from 'react-router-dom'

const OrdersDelivery = () => {
    const [orders, setOrders] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders/pending');
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [])

    const [acceptedOrders, setAcceptedOrders] = useState(new Set());

    const addToDelivery = async (id, user) => {
        const updates = { status: "processing" }

        try {
            await axios.put(`/api/orders/${id}`, updates);
            console.log('Order status updated to processing:', id);
            
            await axios.post('/api/order/rider', {
                order: id,
                user: user
            })
            console.log('Order added to delivery:', id);

            setAcceptedOrders(new Set([...acceptedOrders, id]));
        } catch (errors) {
            console.error('Error accepting the order:', error)
        }
    }

    return (
        <div className='orders-container'>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error fetching orders.</p>}
            {!isLoading && !error && (
                <table>
                    <thead>
                        <tr>
                            <th className="col">Order Number</th>
                            <th className="col">Order Date</th>
                            <th className="col">Deliver To</th>
                            <th className='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map((order) => (
                            <tr key={order._id}>
                                <td>#{order._id}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>{order.user.username},<br/> {order.user.mobile},<br/> {order.user.address}</td>
                                <td>
                                    <div>
                                        <button className='accept-btn' onClick={() => addToDelivery(order._id, order.user)}>
                                            {acceptedOrders.has(order._id) ? 'Accepted' : 'Accept'}
                                        </button>
                                        <p className='condition-order'>*you can't reject once accepted.</p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default OrdersDelivery