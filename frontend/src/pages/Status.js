import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AcceptedOrders = () => {
    const [order, setOrder] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { id } = useParams()
    
    useEffect(() => {
        const fetchAcceptedOrders = async () => {
            try {
                const response = await axios.get('#');
                setOrder(response.data);
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
            <div className='container'>
                {order && 
                    <div>
                        
                    </div>
                }
            </div>
        </div>
    );
};

export default AcceptedOrders;
