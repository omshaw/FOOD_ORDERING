import React, { useState } from "react";

const Delete = () => {
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [rname, setRname] = useState("");
    const [dname, setDname] = useState("");
    const [dishName, setDishName] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    async function f() {
        const d = { name, dishName };
        setMsg("");
        setName("");
        setDishName("");
        setRname("");
        setDname("");
        setImage("");
        setPrice();
        setDescription("");
        if (!d.name) {
            setMsg('Resturant Name must not empty !');
            return;
        }
        if (!d.dishName) {
            setMsg('Dish Name must not empty !');
            return;
        }

        let v = await fetch('http://localhost:4000/find-product', {
            method: 'post',
            body: JSON.stringify(d),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        v = await v.json();
        if (v.msg) {
            setMsg(v.msg);
        }
        else if (v) {
            setImage(v[0].fileImage.file);
            setPrice(v[0].price);
            setDescription(v[0].description);
            setDname(v[0].dishName);
            setRname(v[0].name);
        }
        else {
            console.log('something went wrong!');
        }
    }
    async function f2() {
        const ele = { name, dishName };
        let v = await fetch('http://localhost:4000/admin/delete-product', {
            method: 'post',
            body: JSON.stringify(ele),
            find: JSON.stringify({ name, dishName }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        v = await v.json();
        if (v.msg)
            setMsg(v.msg);
        else
            setMsg('Something Went Wrong !');
    }
    return (
        <div className='box' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Delete Item:</h1>
            <div className='hidden'>{msg}</div>
            <input placeholder='Enter Resturant Name' type="text" onChange={(e) => { setMsg(""); setName(e.target.value) }} value={name} required></input>
            <input placeholder='Enter Dish Name' type="text" onChange={(e) => { setMsg(""); setDishName(e.target.value) }} value={dishName} required></input>
            <button onClick={f}>Search</button>
            {price &&
                (
                    <>
                        <h5>Resturant Name- {rname}</h5>
                        <h5>Dish Name- {dname}</h5>
                        <h5>Price: {price}</h5>
                        <h5>Description: {description}</h5>
                        <img alt="not fount" width={"250px"} src={image} />
                        <br />
                        <button onClick={f2}>Delete</button>
                    </>
                )
            }
        </div>
    );
}

export default Delete;