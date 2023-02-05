import React from 'react';
import { json, Link, useNavigate } from 'react-router-dom';

const Profile=()=>{
    let navigate=useNavigate();
    let user=JSON.parse(localStorage.getItem('user'));
    function f()
    {
        localStorage.removeItem('user');
        navigate('/login');
    }
    return (
        <div className='profilebox'>
            <h4>Hi {user.name}, </h4>
            <div style={{display:'flex',justifyContent:'space-evenly',margin:'5%'}}>
            <button onClick={()=>{navigate('/account');}}>Account details</button>
            {   user.role==1?
                <button onClick={()=>{navigate('/admin/orders')}}>My Orders</button>
                :<button onClick={()=>{navigate('/orders')}}>My Orders</button>
            }
            {   user.role==1?
                <button>Pickup Addresses</button>
                :<button>Delivery Addresses</button>
            }
            <button onClick={f}>Log out</button>
            </div>
        </div>
    );
}

export default Profile;