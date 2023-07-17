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
import Resutrant from './components/Admin/add-resturant';
import Res from './components/Users/resturant';
import Address from './components/Users/address';
import Checkout from './components/Users/checkout';
function App() {
  const st=localStorage.getItem('cart');
  const [state,setState]=useState((!st||JSON.parse(st).length===0)?undefined:JSON.parse(st).length);
  const [bill,setBill]=useState(0);
  const change=()=>{
    const l=localStorage.getItem('cart');
    if(!l||JSON.parse(l).length===0)
      setState();
    else
      setState(JSON.parse(l).length);
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar comp={state}/>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route element={<UserComponent/>}>
            <Route path='/' element={<Home change={change}/>}></Route>
            <Route path='/products' element={<h1>Products</h1>}></Route>
            <Route path='/cart' element={<Cart change={change} setBill={setBill}/>}></Route>
            <Route path='/resturant/:id' element={<Res change={change}/>}></Route>
            <Route path='/address' element={<Address />}></Route>
            <Route path='/checkout' element={<Checkout bill={bill}/>}></Route>
            </Route>
            <Route element={<AdminComponent />}>
              <Route path='/admin' element={<Admin />}></Route>
              <Route path='/admin/add-product' element={<Add />}></Route>
              <Route path='/admin/update-product' element={<Update/>}></Route>
              <Route path='/admin/products' element={<Products/>}></Route>
              <Route path='/admin/delete-product' element={<Delete/>}></Route>
              <Route path='/admin/add-resturant' element={<Resutrant/>}></Route>
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
