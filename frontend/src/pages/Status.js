import { useState, useEffect } from 'react';
import axios from 'axios';

const AcceptedOrders = () => {
    const [orders, setOrders] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const fetchAcceptedOrders = async () => {
            try {
                const response = await axios.get('/api/order/rider');
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchAcceptedOrders();
    }, []);
    
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error fetching data</p>}
            {orders && (
                <table>
                    <thead>
                        <tr>
                            <th>Order number</th>
                            <th>Address & Contact</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.address}, <br/>{order.user.mobile}</td>
                                <td>{order.order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AcceptedOrders;
