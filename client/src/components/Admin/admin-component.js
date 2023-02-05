import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminComponent=()=>{
    const auth=JSON.parse(localStorage.getItem('user'));
    return (
        (auth.role==1)?<Outlet/>:<Navigate to="/"></Navigate>
    );
}
export default AdminComponent;