import React from "react";
import {Link} from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/actions/productActions";

const Card = ({ product }) => {

    const dispatch = useDispatch();

    return (
    
    <div className='col-md-8 mb-8'>

        <div className='card h-100'>
            <a href='#!'>
                <img
                    className='img-fluid w-100'
                    style={{ height: '200px' }}
                    src={`/uploads/${product.fileName}`}
                    alt='product'

                />
            </a>

            <div className='card-body text-center'>
                <h5>{product.productName}</h5>
                <hr />
                <h6 className='md-3'>
                    <span className='text-secondary mr-2'>
                        {product.productPrice.toLocaleString('en-US',
                            {
                                style: 'currency',
                                currency: 'LKR',
                            })}
                    </span>
                </h6>
                <p>
                    {product.productDesc.length > 60 ? product.productDesc.substring(0, 60)+ '...' : product.productDesc.substring(0, 60) }
                </p>
                <Link
                    
                    to={`/admin/edit/product/${product._id}`}
                    type= 'button'
                    className='btn btn-secondary btn-sm me-2'>

                    <i className='far fa-edit pr-1'></i>    
                    Edit
                </Link>
                <button type='button' className='btn btn-danger btn-sm' onClick={() => dispatch(deleteProduct(product._id))}>
                    <i className='far fa-trash-alt pr-1'></i>
                    Delete
                </button>
            </div>
        </div>
    </div>
    );
};

export default Card;