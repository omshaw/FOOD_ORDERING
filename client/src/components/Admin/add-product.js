import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Add = () => {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [dishName, setDishName] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    let [image, setImage] = useState(null);
    const [msg, setMsg] = useState("");
    const inputref = useRef();
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
        setMsg("");
        const Image = await convertToBase64(image);
        const fileImage = {
            file: Image
        }
        const d = { name, dishName, price, description, fileImage };
        setName("");
        setDishName("");
        setDescription("");
        setPrice("");
        setImage(null);
        inputref.current.value = "";
        let v = await fetch('http://localhost:4000/admin/find-product', {
            method: 'post',
            body: JSON.stringify({ name, dishName }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        v = await v.json();
        if (!v.msg) {
            setMsg('Item already exist !');
            return;
        }
        v = await fetch('http://localhost:4000/admin/add-product', {
            method: 'post',
            body: JSON.stringify(d),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        v = await v.json();
        if (v) {
            setMsg(v.msg);
            if (v.msg == 'Item Added successfully !') {
                setTimeout(() => {
                    navigate('/admin');
                }, 500)
            }
        }
    }
    return (
        <div className='box' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Add Item:</h1>
            <div>{msg}</div>
            <input placeholder='Enter Resturant Name' type="text" onChange={(e) => { setName(e.target.value) }} value={name} required></input>
            <input placeholder='Enter Dish Name' type="text" onChange={(e) => { setDishName(e.target.value) }} value={dishName} required></input>
            <input placeholder='Enter Price' type="number" onChange={(e) => { setPrice(e.target.value) }} value={price} required></input>
            <textarea rows='5' cols='30' placeholder='Enter Description' type="text" onChange={(e) => { setDescription(e.target.value) }} value={description} required></textarea>
            {image && (
                <div>
                    <img alt="not fount" width={"250px"} src={URL.createObjectURL(image)} />
                    <br />
                    <button onClick={() => { console.log(URL.createObjectURL(image)); setImage(null) }}>Remove</button>
                </div>
            )}
            <br />
            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    setImage(event.target.files[0]);
                }}
                ref={inputref}
            />
            <input placeholder='Submit' type='submit' onClick={f}></input>
        </div>
    );
}
export default Add;