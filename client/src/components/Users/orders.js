import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery';

const Order = () => {
    const [order,setOrder]=useState([]);
    const [b,setB]=useState(false);
    useEffect(()=>{
        let y=async()=>{
            setB(true);
            let p=await fetch('http://localhost:4000/orders',{
                method:'post',
                body:JSON.stringify({phone:JSON.parse(localStorage.getItem('user')).phone}),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            p=await p.json();
            let l=[];
            for(let i=0;i<p.length;i++)
            {
                l.push(<div style={{width:'40%',margin:'2% 4%',padding:'1% 2%',boxShadow:'initial',backgroundColor:'whitesmoke'}}>
                    <p>Order-Id: {p[i]._id}</p>
                    <p>{p[i].product.length} Items</p>
                    <p>Price: {p[i].total}</p>
                </div>);
            }
            if(l.length===0)
            {
                l.push(<div style={{margin:'15%',width:'40%'}}><h6>No Order Found !</h6></div>);
            }
            setOrder(l);
        }
        if(!b)
            y();
    })
    return (
        <div style={{marginBottom:'10%',marginLeft:'5%'}}>
            <h2>Orders</h2>
            {order}
            {
                order.length===0
                &&
                <div style={{width:'40%',margin:'2% 4%'}}>
                <div class="animated-background" style={{height:'100px',margin:'2%'}}>
                <div class="background-masker"></div></div>
                <div class="animated-background" style={{height:'100px',margin:'2%'}}>
                <div class="background-masker"></div></div>
                <div class="animated-background" style={{height:'100px',margin:'2%'}}>
                <div class="background-masker"></div>
                </div>
                <div class="css-dom"></div>
                </div>
                }
        </div>
    );
}

export default Order;