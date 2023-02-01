import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Login = () => {
    let navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    let [msg, setMsg] = useState("");
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth)
            navigate('/');
    })
    async function check() {
        setMsg("");
        if (phone == '' || password == '') {
            setMsg('invalid phone number or password !');
            return;
        }
        let v = await fetch('http://localhost:4000/login', {
            method: 'post',
            body: JSON.stringify({ phone, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        v = await v.json();
        if (v.msg == 1) {
            setMsg('Login Succesfully !');
            let g = v.body;
            g = JSON.parse(g);
            
            setTimeout(function () {
                localStorage.setItem('user', JSON.stringify({ phone: `${phone}`, name: `${g.name}`, email: `${g.email}`,role:`${g.role}`}));
                if(g.role==0)
                    navigate('/');
                else
                    navigate('/admin');    
            }, 500);
            
        }
        else
            setMsg('Login Failed !');
    }
    return (
        <>
            <div className='login'>
                <h1>Enter login details</h1>
                <div className='hidden'>{msg}</div>
                <input placeholder='Enter phone number' type="text" onChange={(e) => { setPhone(e.target.value) }}></input>
                <input placeholder='Enter password' type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
                <input placeholder='Submit' type='submit' onClick={check}></input>
            </div>
            <h10>Not Registered?<Link to="/register">Signup</Link></h10></>
    );
}

export default Login;