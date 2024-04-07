import { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD

const AcceptedOrders = () => {
    const [orders, setOrders] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
=======
import { useParams } from 'react-router-dom';

const AcceptedOrders = () => {
    const [order, setOrder] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { id } = useParams()
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
    
    useEffect(() => {
        const fetchAcceptedOrders = async () => {
            try {
<<<<<<< HEAD
                const response = await axios.get('/api/order/rider');
                setOrders(response.data);
=======
                const response = await axios.get('#');
                setOrder(response.data);
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
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
<<<<<<< HEAD
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
=======
            <div className='container'>
                {order && 
                    <div>
                        
                    </div>
                }
            </div>
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
        </div>
    );
};

export default AcceptedOrders;
