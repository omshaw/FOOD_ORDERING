import React, { useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Login from './components/login';
import Signup from './components/signup';
import Profile from './components/profile';
import Cart from './components/Users/cart.js';
import Account from './components/account.js';
import Admin from './components/Admin/admin.js';
import Error from './components/pagenotfound.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateComponent from './components/privateComponent';
import AdminComponent from './components/Admin/admin-component';
import UserComponent from './components/Users/user-componenet';
import Update from './components/Admin/update-product';
import Add from './components/Admin/add-product';
import Delete from './components/Admin/delete-product';
import Home from './components/Users/home';
import Products from './components/Admin/products';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route element={<UserComponent/>}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/products' element={<h1>Products</h1>}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            </Route>
            <Route element={<AdminComponent />}>
              <Route path='/admin' element={<Admin />}></Route>
              <Route path='/admin/add-product' element={<Add />}></Route>
              <Route path='/admin/update-product' element={<Update/>}></Route>
              <Route path='/admin/products' element={<Products/>}></Route>
              <Route path='/admin/delete-product' element={<Delete/>}></Route>
            </Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/account' element={<Account />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Signup />}></Route>
          <Route path='*' element={<Error />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
