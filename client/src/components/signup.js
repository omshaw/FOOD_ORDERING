import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone,setPhone]=useState("");
    let [msg, setMsg] = useState("");
    const [email,setEmail]= useState("");
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth)
            navigate('/');
    })
    async function check() {
        setMsg("");
        if (name == '' || password == '') {
            setMsg('Name or password must not be empty !');
        } 
        else if (name.length < 5 || name.length > 15) {
            setMsg('length of name must be >= 5 and <=15 characters !');
        }
        else if (password.length < 6 || password.length > 10) {
            setMsg('length of password must be >= 6 and <=10 characters !');
        }
        else {
            let v = await fetch('http://localhost:4000/register', {
                method: 'POST',
                body: JSON.stringify({ name, password,email,phone}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            v=await v.json();
            setMsg(v.body)
            if(v.body=='Register Successfully!')
            {
                setTimeout(function(){
                    navigate('/login');
                }, 1000);
            }
        }
    }
    return (
        <><div className='login'>
            <h1>Register</h1>
            <div className='hidden'>{msg}</div>
            <input placeholder='Enter Name' type="text" onChange={(e) => { setName(e.target.value) }} required></input>
            <input placeholder='Enter phone number' type="text" onChange={(e) => { setPhone(e.target.value) }} required></input>
            <input placeholder='Enter E-mail' type="email" onChange={(e) => { setEmail(e.target.value) }} required></input>
            <input placeholder='Enter Password' type="password" onChange={(e) => { setPassword(e.target.value) }} required></input>
            <input placeholder='Submit' type='submit' onClick={check}></input>
        </div>
            <h10>Already Registered?<Link to="/login">login</Link></h10></>
    );
}
export default Signup;