import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = ({bill}) => {
    let data=JSON.parse(localStorage.getItem('cart'));
    const [b,setB]=useState(false);
    const [tdata,setTdata]=useState([]);
    const [add,setAdd]=useState([]);
    const navigate=useNavigate();
    if(!b)
    {
        setB(true);
        let k=[];
        data.map(function(obj) {
            let y=async ()=>{
                let p=await fetch('http://localhost:4000/find-product',{
                    method:'post',
                    body: JSON.stringify({_id:obj.id}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                p=await p.json();
                k.push(<tr><td>{p[0].dishName +" - "+ p[0].name}</td><td>{p[0].price}</td><td>{obj.Qty}</td></tr>)
                if(k.length===data.length)
                    setTdata(k);
            }
            y();
        })
        let n=[];
        JSON.parse(localStorage.getItem('user')).address.map(function(obj) {
            n.push(<div style={{display:'flex'}}><input className='options' type='radio' name='address'></input><div style={{width:'40%',margin:'2%',borderStyle:'inset',cursor:'pointer',display:'inline-flex'}}>{obj.location}</div></div>);         
        });
        setAdd(n);
    } 
    // let c=document.querySelector('.options');
    // if(c)
    //     c.classList.add('selected');
    $('.options').click((e)=>{
        let k=document.querySelector('.selected');
        if(k)
            k.classList.remove('selected');
        e.currentTarget.nextElementSibling.classList.add('selected');
    })
    function f()
    {
        let k=document.querySelector('.selected');
        if(!k)
            return;
        console.log('Bill:'+ bill+((bill>250)?0:30)+0.5);
        console.log('Address:'+k.innerText);
        let Address=k.innerText;
        let product=[];
        for(let i=0;i<tdata.length;i++)
        {
            let list={};
            list['name']=tdata[i].props.children[0].props.children;
            list['price']=tdata[i].props.children[1].props.children;
            list['Qty']=tdata[i].props.children[2].props.children;
            product.push(list);
        }
        // product=JSON.stringify(product);
        console.log('Product:'+product);
        let total=bill+((bill>250)?0:30)+0.5;
        localStorage.setItem('order',JSON.stringify({total,Address,product}));
        navigate('/payment');
    }
    return (
            <div style={{marginBottom:'5%'}}>
            <h3 style={{margin:'1%'}}>SUMMARY</h3>
            <hr style={{width:'75%',marginLeft:'1%'}}/>
            <table style={{width:'50%',margin:'auto',overflowY:'scroll',height:'18px'}}>
                <th>Product</th><th>Price</th><th>Quantity</th>
                {tdata}
                {
                tdata.length===0
                &&
                <tr><td><div class="animated-background">
                <div class="background-masker"></div>
                </div></td><td><div class="animated-background">
                <div class="background-masker"></div>
                </div></td>
                <td><div class="animated-background">
                <div class="background-masker"></div>
                </div></td>
                <div class="css-dom"></div></tr>
                }
            </table>
            <hr style={{width:'75%',marginLeft:'1%'}}/>
            <table style={{width:'50%',margin:'auto'}}>
                <tr>Subtotal<th>Rs {bill}</th></tr>
                <tr/>
                <tr>Taxes<th>Rs 0.5</th></tr>
                <tr/>
                <tr>Delivery Charge{(bill>250)?<th>Rs 0</th>:<th>Rs 30</th>}</tr>
                <hr/>
                <tr>Total<th>Rs {bill+((bill>250)?0:30)+0.5}</th></tr>
                <p style={{fontSize:'12px'}}>Free Delivery on order above Rs250</p>
            </table>
            <h3 style={{margin:'1%'}}>Delivery</h3>
            <hr style={{width:'75%',marginLeft:'1%'}}/>
            <table style={{width:'50%',margin:'auto',overflowY:'scroll',height:'18px'}}>
                {add}
                <button onClick={()=>{$('.new').css('visibility','visible')}} style={{'margin':'2%'}}>New Address</button>
                <input className='new' type='text' style={{visibility:'hidden'}}></input>
            </table>
            <button onClick={f} style={{margin:'2%',width:'8%',position:'absolute',right:'25%',border:'none',fontSize:'18px',backgroundColor:'grey'}}>Continue</button>
            </div>
    );
}

export default Checkout;