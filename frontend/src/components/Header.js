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