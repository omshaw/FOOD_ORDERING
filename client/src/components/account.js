import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Account = () => {
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user'));
    function f() {
        localStorage.removeItem('user');
        navigate('/')
    }
    return (
        <div className='profilebox'>
            <h4>
            Name- {user.name} <br/>
            Email- {user.email} <br/>
            Phone- {user.phone}
            </h4>
        </div>
    );
}

export default Account;