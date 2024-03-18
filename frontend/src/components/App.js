import React from 'react';
import './App.css';
import Header from './Header';
import AdminDashboard from './AdminDashboard';
import AdminEditProduct from './AdminEditProduct';
import Home from './Home';
import Shop from './Shop';
import Product from './Product';
import Login from '../pages/Login';
import Signup from '../pages/Registration';
import Cart from '../pages/CartPage';
import Orders from '../pages/OrdersPage';
import OrderDet from '../pages/OrderDetails';
import Rider from '../pages/RiderDetails'
// import RiderDash from '../pages/RidersDash'; // TODO: please fix errors here. This component conflicts with Product Management Admin Dashboard.
import RiderDet from '../pages/RiderDet';
import Vehicle from '../pages/VehicleDetails'
// import VehicleDash from '../pages/VehiclesDash'; // TODO: please fix errors here. This component conflicts with Product Management Admin Dashboard.
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App = () => {


    return (
        <BrowserRouter>
            <Header/>
            <main>
                <Routes>

                    <Route exact path='/admin/dashboard' Component={AdminDashboard}/>
                    <Route exact path='/admin/home' Component={Home}/>
                    <Route exact path='/admin/shop' Component={Shop}/>

                    {/* Routes for products */}
                    <Route exact path='/product/:productId' Component={Product}/>
                    <Route exact path='/admin/edit/product/:productId' Component={AdminEditProduct}/>

                    {/* Routes for users */}
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>

                    {/* Routes for cart & order management */}
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/orders/management' element={<Orders/>}/>
                    <Route path='/orders/management/:id' element={<OrderDet/>}/>

                    {/* Routes for vehicles & riders */}
                    <Route path='/vehicles/registrationform' element={<Vehicle/>}/>
                    {/* <Route path='/vehicles/dashboard' element={<VehicleDash/>}/> */}  {/* TODO: please fix errors here. This component conflicts with Product Management Admin Dashboard.*/}
                    <Route path='/riders/registrationform' element={<Rider/>}/>
                    {/* <Route path='/riders/dashboard' element={<RiderDash/>}/> */} {/* TODO: please fix errors here. This component conflicts with Product Management Admin Dashboard.*/}
                    <Route path='/riders/:id' element={<RiderDet/>}/>

                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;
