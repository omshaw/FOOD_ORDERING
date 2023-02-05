import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UserComponent=()=>{
    const auth=JSON.parse(localStorage.getItem('user'));
    return (
        (auth.role==0)?<Outlet/>:<Navigate to="/admin"></Navigate>
    );
}
export default UserComponent;