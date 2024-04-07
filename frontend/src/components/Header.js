<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {

    //views
    const showNavigation = () => (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to='#' className="navbar-brand" >Furniture Store App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='#' className="nav-link" aria-current="page" >Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='#'  className="nav-link" >Signin</Link>
                        </li>
                        
                    </ul> */}

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link to='/admin/shop' className="nav-link" aria-current="page" ><i className='fas fa-shopping-bag'></i> Shop</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/home' className="nav-link" aria-current="page" ><i className='fas fa-home'></i> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/dashboard' className="nav-link" aria-current="page" ><i className='fas fa-home'></i> Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/cart' className="nav-link" aria-current="page" ><i className='fas fa-cart'></i> Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='#' className="nav-link" ><i className='fas fa-sign-out-alt'></i> Logout</Link>
                        </li>

                    </ul>

                    {/* <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
        </nav>

    );

    // render
    return (
        <header id='header'>
            {showNavigation()}
        </header>
    );


};

export default Header;
=======
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRole } from '../components/RoleContext';
import RoleContext from '../components/RoleContext';
import { isEmpty } from 'lodash';
import axios from 'axios';

const Header = () => {
    const { role } = useRole()
    const { setRole } = useContext(RoleContext);
    const [contentType, setContentType] = useState('Spectro')
    const navigate = useNavigate()

    useEffect(() => {
        if (role === 'admin') {
            setContentType('admin dashboard')
        } else if (role === 'rider') {
            setContentType('rider dashboard')
        }
    }, [role])

    const logout = async () => {
        try {
            setRole(null)
            const response = await axios.post('/api/user/logout')
            console.log(response.data.message)
            navigate('/login')      
          } catch (error) {
            console.error('Logout failed:', error)
          }
    }

    return (
        <header id='header' style={{ backgroundColor: '#f8f9fa', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '10px 0' }}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to='/admin/home' className="navbar-brand" style={{ fontWeight: 'bold', color: '#333' }}>{contentType}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {role === 'admin' && 
                            <li className="nav-item">
                                <Link to='/admin/main/dashboard' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-dashboard'></i> Dashboard</Link>
                            </li>}
                            {role === 'user' && 
                            <>
                                <li className="nav-item">
                                    <Link to='/admin/home' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-home'></i> Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/admin/shop' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-shopping-bag'></i> Shop</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/cart' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-shopping-cart'></i> Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/orders/management' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-truck'></i> Orders</Link>
                                </li>
                            </>
                            }
                            {isEmpty(role) && 
                            <li className="nav-item">
                                <Link to='/login' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-sign-in-alt'></i> Login</Link>
                            </li>}
                            {role && 
                            <li className="nav-item">
                                <button className="nav-link" onClick={logout} style={{ border: 'none', backgroundColor: 'transparent', color: '#333', cursor: 'pointer' }}><i className='fas fa-sign-out-alt'></i> Logout</button>
                            </li>}
                            {role === 'rider' && 
                            <li className="nav-item">
                                <Link to='/delivery/rider/dashboard' className="nav-link" aria-current="page" style={{ color: '#333' }}><i className='fas fa-sign-in-alt'></i> Dashboard</Link>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
