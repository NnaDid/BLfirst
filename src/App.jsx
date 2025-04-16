import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import NotFound from './pages/NotFound';
import Home from './pages/user/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import LoginPage from './pages/admin/LoginPage';
import Dashboard from './pages/admin/Dashboad';
import Finance from './pages/admin/Finance';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';
import Admins from './pages/admin/Admins';
import ForgotPassword from './pages/user/ForgotPassword';

const App = () => {
  return (
    <Router> 
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/"element={<Home />} />

              <Route path="/login"    element={<Login/>}  />
              <Route path="/register"  element={<Register />}  /> 
              <Route path="/forgot-password"  element={<ForgotPassword />}  /> 

              {/* Admin */}
              {/* <Route path="/blx-admin" element={<LoginPage />} >  */}
              <Route path="/blx-admin" element={<LoginPage />} > 
                   <Route index element={<LoginPage />} />   
                   <Route path="Dashboard" element={<Dashboard />} />  
                   <Route path="Products" element={<Products />} /> 
                   <Route path="Orders" element={<Orders />} /> 
                   <Route path="Customers" element={<Users />} /> 
                   <Route path="Finance" element={<Finance />} /> 
                   <Route path="Admins" element={<Admins />} /> 
              </Route>
  

                {/* 404 Not Found */}
               <Route path="*" element={<NotFound />} />
            </Routes>

 
          </AnimatePresence> 
      </Router>
  )
}

export default App