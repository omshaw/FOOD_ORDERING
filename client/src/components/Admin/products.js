import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("");
    const [t,SetT]=useState([]);
    async function f() {
        setMsg("");
        const d = { name };
        setName("");
        let v = await fetch('http://localhost:4000/admin/find-product', {
            method: 'post',
            body: JSON.stringify(d),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        v = await v.json();
        console.log(v[0].name);
        if (v.msg) {
            setMsg('No such Resurant exist!');
            return;
        }
        const k=[]
        for (let i = 0; i < v.length; i++) {
            k.push(
                <div className='card'>
                    <h5>Resturant Name- {v[i].name}</h5>
                    <br/>
                    <h5>Dish Name- {v[i].dishName}</h5>
                    <br/>
                    <h5>Price: {v[i].price}</h5>
                    <br/>
                    <h5>Description: {v[i].description}</h5>
                    <br/>
                    <img alt="not fount" width={"250px"} src={v[i].fileImage.file} />
                    <br />
                </div>
            );
        }
        SetT(k);
    }
    return (
        <>
            <div className='box' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>Item:</h1>
                <div className='hidden'>{msg}</div>
                <input placeholder='Enter Resturant Name' type="text" onChange={(e) => { setMsg(""); setName(e.target.value) }} value={name} required></input>
                <button onClick={f}>Search</button>
            </div>
            <div className="Ncard" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {t}
            </div>
        </>
    );
}
export default Products;