import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/OrderAccept.css'
import { useNavigate } from 'react-router-dom'
<<<<<<< HEAD
=======
import { useRole } from '../components/RoleContext'
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54

const OrdersDelivery = () => {
    const [orders, setOrders] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
<<<<<<< HEAD
    const navigate = useNavigate()

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders/all');
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchOrders();
=======
    const { role } = useRole()
    const navigate = useNavigate()

    useEffect(() => {
        if (role !== 'rider') {
            navigate('/login');
        } else {
            axios.get('/api/orders/pending')
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Failed to fetch data');
                    }
                    setOrders(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
    }, [])

    const [acceptedOrders, setAcceptedOrders] = useState(new Set());

    const addToDelivery = async (id, user) => {
<<<<<<< HEAD
        try {
=======
        const updates = { status: "processing" }

        try {
            await axios.put(`/api/orders/${id}`, updates);
            console.log('Order status updated to processing:', id);
            
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
            await axios.post('/api/order/rider', {
                order: id,
                user: user
            })
<<<<<<< HEAD
            console.log('Order Accepted:', id);
=======
            console.log('Order added to delivery:', id);

>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
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
