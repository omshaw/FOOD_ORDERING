import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar=()=>{
    const auth=localStorage.getItem('user');
    const navigate=useNavigate();
    function f()
    {
        navigate('/login');
    }
    function f2()
    {
        navigate('/profile');
    }
    return (
        <div>
            <ul className="navbar">
                <li>{ auth&&JSON.parse(auth).role==1?<Link to="/admin">Home</Link>:<Link to="/">Home</Link>}</li>
                {auth &&JSON.parse(auth).role==0?<li><a href='#1'>Products</a></li>:<li><Link to="/admin/products">Products</Link></li>}
                <li>{ auth ? <Link onClick={f2} to="/profile">{JSON.parse(auth).name}</Link> :
                <Link onClick={f} to="/login">Login</Link>}</li>
                {auth &&JSON.parse(auth).role==0&&<li><Link to="/cart">Cart</Link></li>}
            </ul>
        </div>
    );
}

export default Navbar;