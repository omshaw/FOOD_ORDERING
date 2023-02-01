import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Admin = () => {
    const navigate=useNavigate();
    return (
        <div style={{}}>
        <h1>    Admin </h1>
        <div className='BOX' style={{justifyContent:'space-around',display:'flex', margin:'10%'}}>
        <button onClick={()=>{navigate('./add-product')}}>Add Items</button>
        <button onClick={()=>{navigate('./update-product')}}>Update Items</button>
        <button onClick={()=>{navigate('./delete-product')}}> Delete Items</button>
        </div>
        </div>
    );
}

export default Admin;