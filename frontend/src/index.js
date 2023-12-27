import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import {Provider} from 'react-redux';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import ProfileScreen from './Screens/ProfileScreen';
import OrderListScreen from './Screens/admin/OrderListScreen';
import ProductListScreen from './Screens/admin/ProductListScreen';
import ProductEditScreen from './Screens/admin/ProductEditScreen';

const router = createBrowserRouter (
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/products/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} /> 
      <Route path='/register' element={<RegisterScreen />} />  

      <Route path='' element={<PrivateRoute />}>
      <Route path='/shipping' element={<ShippingScreen />} />  
      <Route path='/payment' element={<PaymentScreen />} /> 
      <Route path='/placeorder' element={<PlaceOrderScreen />} />  
      <Route path='/order/:id' element={<OrderScreen />} />  
      <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
      <Route path='/admin/orderlist' element={<OrderListScreen />} /> 
      <Route path='/admin/productlist' element={<ProductListScreen />} /> 
      <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} /> 


      </Route>
      
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
