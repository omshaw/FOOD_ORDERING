import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Update = () => {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [rname, setRname] = useState("");
    const [dishName, setDishName] = useState("");
    const [dname, setDname] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [msg, setMsg] = useState("");
    const [updatedprice, setUpdatedprice] = useState();
    const [updateddescription, setUpdateddescription] = useState("");
    const [updatedimage, setUpdatedimage] = useState("");
    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => [
                resolve(fileReader.result)
            ]
            fileReader.onerror = (error) => {
                reject(error)
            }
        });
    }
    async function f() {
        const d = { name, dishName };
        setMsg("");
        setName("");
        setDishName("");
        setImage("");
        setPrice();
        setRname("");
        setDname("");
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
            setRname(v[0].name);
            setDname(v[0].dishName);
            setImage(v[0].fileImage.file);
            setPrice(v[0].price);
            setDescription(v[0].description);
            setUpdatedprice(v[0].price);
        }
        else {
            console.log('something went wrong!');
        }
    }
    async function f2(ele) {
        let v = await fetch('http://localhost:4000/admin/update-product', {
            method: 'post',
            body: JSON.stringify(ele),
            find: JSON.stringify({ name, dishName }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        v = await v.json();
        if (v.msg)
            setMsg(v.msg);
        else
            setMsg('Something Went Wrong !')
    }
    return (
        <div className='box' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Update Item:</h1>
            <div className='hidden'>{msg}</div>
            <input placeholder='Enter Resturant Name' type="text" onChange={(e) => { setMsg(""); setName(e.target.value) }} value={name} required></input>
            <input placeholder='Enter Dish Name' type="text" onChange={(e) => { setMsg(""); setDishName(e.target.value) }} value={dishName} required></input>
            <button onClick={f}>Search</button>
            <br />
            {
                price &&
                (
                    <>
                        <h5>Resturant Name- {rname}</h5>
                        <h5>Dish Name- {dname}</h5>
                        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
                            <label><h5 style={{ 'marginBottom': '0' }}>Price:</h5></label>
                            <input type="number" value={updatedprice} onChange={(e) => { setUpdatedprice(e.target.value) }} style={{ 'borderStyle': 'none', 'width': '20%', 'margin': '2%' }}></input>
                            <button onClick={() => { f2({ price: `${updatedprice}` }) }}>update</button>
                        </div>
                        <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'maxWidth': '30%' }}>
                            <label><h5 style={{ 'marginBottom': '0' }}>Description:</h5></label>
                            <div type="text" contentEditable="true" onInput={(e) => { setUpdateddescription(e.currentTarget.textContent); console.log(description) }} style={{ 'borderStyle': 'none', verticalAlign: 'true', textAlign: 'center', margin: '2%', minWidth: '60%' }}>{description}</div>
                            <button onClick={() => { f2({ description: `${updateddescription}` }) }}>update</button>
                        </div>
                        <div>
                            <img alt="not fount" width={"250px"} src={image} />
                            <br />
                            <input
                                type="file"
                                name="myImage"
                                onChange={(event) => {
                                    setUpdatedimage(event.target.files[0]);
                                }}
                            />
                            <button onClick={async () => {
                                const Image = await convertToBase64(updatedimage);
                                setImage(Image);
                                const fileImage = {
                                    file: Image
                                }; f2({fileImage})
                            }}>update</button>
                        </div></>
                )
            }
        </div>
    );
}
export default Update;