import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRole } from '../components/RoleContext';

const Header = () => {
    const { role } = useRole();
    const [contentType, setContentType] = useState('Spectro')

    useEffect(() => {
        if (role === 'admin') {
            setContentType('admin dashboard')
        } else if (role === 'rider') {
            setContentType('rider dashboard')
        }
    }, [role])

    // render
    return (
        <header id='header'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to='/admin/home' className="navbar-brand" >{contentType}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {role === 'admin' && 
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <li className="nav-item">
                                    <Link to='/admin/main/dashboard' className="nav-link" aria-current="page" ><i className='fas fa-dashboard'></i> Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='#' className="nav-link" ><i className='fas fa-sign-out-alt'></i> Logout</Link>
                                </li>
                                </div>}
                            {role === 'user' && 
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <li className="nav-item">
                                    <Link to='/admin/home' className="nav-link" aria-current="page" ><i className='fas fa-home'></i> Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/admin/shop' className="nav-link" aria-current="page" ><i className='fas fa-shopping-bag'></i> Shop</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/cart' className="nav-link" aria-current="page" ><i className='fas fa-shopping-cart'></i> Cart</Link>
                                </li>
                                {!role && 
                                <li className="nav-item">
                                    <Link to='/login' className="nav-link" aria-current="page" ><i className='fas fa-sign-in-alt'></i> Login</Link>
                                </li>}
                                {role && 
                                <li className="nav-item">
                                    <Link to='#' className="nav-link" ><i className='fas fa-sign-out-alt'></i> Logout</Link>
                                </li>}             
                            </div>}
                            {role === 'rider' && 
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                <li className="nav-item">
                                    <Link to='/delivery/rider/dashboard' className="nav-link" aria-current="page" ><i className='fas fa-sign-in-alt'></i> Dashboard</Link>
                                </li>
                                {role && 
                                <li className="nav-item">
                                    <Link to='#' className="nav-link" ><i className='fas fa-sign-out-alt'></i> Logout</Link>
                                </li>}
                            </div>}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
