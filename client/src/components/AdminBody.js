import React from 'react';
import Card from './Card';
// redux
import { useSelector } from 'react-redux';

const AdminBody = () => {
    const { products } = useSelector(state => state.products);

    return (
        <div className='container'>
            {products && products.length > 0 && (
                <div className='row row-cols-1 row-cols-md-3 g-4'>
                    {products && products.map(product => (
                        <div key={product._id} className='col mb-4'>
                            <Card product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminBody;
