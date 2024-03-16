import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import './App.css';
import AdminDashboard from './AdminDashboard';
import AdminEditProduct from './AdminEditProduct';
import Home from './Home';
import Shop from './Shop';
import Product from './Product';
//import AdminRoute from './AdminRoute';



const App = () => {
    

  return(
    <BrowserRouter>
      <Header/>
      <main>
        <Routes>
          {/* <Route exact path='/' component={Home} />
          {<Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} /> */}
          <Route exact path='/admin/dashboard' Component={AdminDashboard} />
          <Route exact path='/admin/home' Component={Home} /> 
          <Route exact path='/admin/shop' Component={Shop} /> 
          <Route exact path='/product/:productId' Component={Product} /> 
          <Route exact path='/admin/edit/product/:productId' Component={AdminEditProduct} />
          {/* <Route component={NotFound} /> */}
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
