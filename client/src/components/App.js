import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import AdminDashboard from './AdminDashboard';
import AdminEditProduct from './AdminEditProduct';
//import AdminRoute from './AdminRoute';



const App = () => {
    

  return(
    <BrowserRouter>
      <Header/>
      <main>
        <Routes>
          {/* <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} /> */}
          <Route exact path='/admin/dashboard' Component={AdminDashboard} />
          <Route exact path='/admin/edit/product/:productId' Component={AdminEditProduct} />
          {/* <Route component={NotFound} /> */}
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
