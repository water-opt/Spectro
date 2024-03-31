import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './Header';
import AdminDashboard from './AdminDashboard';
import AdminEditProduct from './AdminEditProduct';
import AdminProductReport from './AdminProductReport';
import Home from './Home';
import Shop from './Shop';
import Product from './Product';
import Login from '../pages/Login';
import Signup from '../pages/Registration';
import Cart from '../pages/CartPage';
import Orders from '../pages/OrdersPage';
import OrderDet from '../pages/OrderDetails';
import RiderDet from '../pages/RiderDet';
import Invoice from '../pages/Invoice';
import Vehicle from '../pages/VehicleDetails'; // TODO: please fix errors here. This component conflicts with with Admin Home.
import Rider from '../pages/RiderDetails'; // TODO: please fix errors here. This component conflicts with Admin Home.
import VehicleDash from '../pages/VehiclesDash'; // TODO: please fix errors here. This component conflicts with Product Management Admin Dashboard.
import RiderDash from '../pages/RidersDash'; // TODO: please fix errors here. This component conflicts with Product Management Admin Dashboard.
import OrderAccept from '../pages/DeliveryRiderOrders';
import OrdersAccepted from '../pages/Status'
import MainAdminDashboard from '../pages/AdminMainDashboard'
import DeliveryAdminMain from '../pages/DeliveryAdminMain'
import DeliveryRiderMainDashboard from '../pages/DeliveryRiderMainDashboard'

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
                    <Route exact path='/admin/report' Component={AdminProductReport}/>

                    {/* Routes for users */}
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>

                    {/* Routes for cart & order management */}
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/orders/management' element={<Orders/>}/>
                    <Route path='/orders/management/:id' element={<OrderDet/>}/>
                    <Route path='/orders/invoice/:orderId' element={<Invoice />}/>

                    {/* Routes for vehicles & riders */}
                    <Route path='/vehicles/registrationform' element={<Vehicle/>}/>
                    <Route path='/riders/registrationform' element={<Rider/>}/>
                    <Route path='/vehicles/dashboard' element={<VehicleDash/>}/>
                    <Route path='/riders/dashboard' element={<RiderDash/>}/> 
                    <Route path='/riders/:id' element={<RiderDet/>}/>
                    <Route path='/delivery/orders' element={<OrderAccept />} />
                    <Route path='/delivery/orders/accepted' element={<OrdersAccepted />} />
                    <Route path='/delivery/main/dashboard' element={<DeliveryAdminMain />} />
                    <Route path='/delivery/rider/dashboard' element={<DeliveryRiderMainDashboard />} />

                    <Route path='/admin/main/dashboard' element={<MainAdminDashboard />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;
