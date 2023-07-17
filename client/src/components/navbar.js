import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar=({comp})=>{
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
                <li style={{margin:'0px 30% 0px 7%', width:'4%'}}>{ auth&&JSON.parse(auth).role==1?<Link to="/admin">Home</Link>:<Link to="/"><img src={require('../img/download.jfif')} alt="..." style={{width:'82%',objectFit:'cover',borderRadius:'50%'}}/></Link>}</li>
                {auth &&JSON.parse(auth).role==0?<li style={{margin:'0px 1% 0px 25%'}}><a href='/#1'>Products</a></li>:<li><Link to="/admin/products">Products</Link></li>}
                <li style={{margin:'0px 1% 0px 1%'}}>{ auth ? <Link onClick={f2} to="/profile">{JSON.parse(auth).name}</Link> :
                <Link onClick={f} to="/login">Login</Link>}</li>
                {auth &&JSON.parse(auth).role==0&&<li style={{margin:'0px 7% 0px 1%'}}><Link to="/cart"><i class="fa fa-shopping-cart"></i> <span class='badge badge-warning' id='lblCartCount'> {comp} </span></Link></li>}
            </ul>
        </div>
    );
}

export default Navbar;