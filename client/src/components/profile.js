import React, { useEffect} from 'react';
import { json, Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
       
    });
    async function f() {
        localStorage.removeItem('user');
        let t=localStorage.getItem('cart');
        if(t)
        {
            t=JSON.parse(t);

            let  v = await fetch('http://localhost:4000/add-cart', {
                method: 'post',
                body: JSON.stringify({phone:user.phone,cart:t}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            v=await v.json();
            localStorage.removeItem('cart');
        }
        navigate('/login');
    }
    return (
        <div className='profilebox'>
            <h4>Hi {user.name}, </h4>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: '5%' }}>
                <button onClick={() => { navigate('/account'); }}>Account details</button>
                {user.role == 1 ?
                    <button onClick={() => { navigate('/admin/orders') }}>My Orders</button>
                    : <button onClick={() => { navigate('/orders') }}>My Orders</button>
                }
                {user.role == 0 ?
                    <button onClick={()=>{navigate('/address')}}>Delivery Addresses</button> :
                    <button onClick={()=>{navigate('/admin/add-resturant')}}>Register Resutrant</button>
                }
                <button onClick={f}>Log out</button>
            </div>
        </div>
    );
}

export default Profile;