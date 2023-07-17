import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';

const Cart = ({change, setBill}) => {
    let ct=[];
    const [pro,setPro]=useState([]);
    const navigate=useNavigate();
    const [b,setB]=useState(false);
    let load=(<div class='container'>
    <div class='loader'>
    <div class='loader--dot'></div>
    <div class='loader--dot'></div>
    <div class='loader--dot'></div>
    <div class='loader--dot'></div>
    <div class='loader--dot'></div>
    <div class='loader--dot'></div>
    <div class='loader--text'></div>
    </div></div>);
    let s=localStorage.getItem('cart');
    if(!s||JSON.parse(s).length===0)
        load=(<h4 style={{width:'50%',margin:'15% auto',display:'flex',justifyContent:'center'}}>Cart is Empty!</h4>);
    useEffect(()=>{
        const y=()=>{
            setB(true);
            let cart=localStorage.getItem('cart');
            if(cart)
            {
                let c=JSON.parse(cart);
                let X=[];
                let co=0;
                if(c.length===0)
                    setPro([]);
                for(let i=0;i<c.length;i++)
                {
                    const t=async ()=>{
                    
                        let p = await fetch('http://localhost:4000/find-product', {
                            method: 'post',
                            body: JSON.stringify({_id:c[i].id}),
                            headers: {
                                    'Content-Type': 'application/json'
                            }
                        });
                        p=await p.json();
                        p[0]['Qty']=c[i].Qty;
                        X.push(p[0]);
                        co=co+1
                        if(co===c.length)
                        {    
                            setPro(X);
                            $('.fa-trash').click(function(e){
                                let q=$(this.attributes[1]).val();
                                let y=JSON.parse(localStorage.getItem('cart'));
                                for(let i=0;i<y.length;i++)
                                {
                                    if(y[i].id===q)
                                    {
                                        y.splice(i,1);
                                        break;
                                    }
                                }
                                localStorage.setItem('cart',JSON.stringify(y));
                                change();
                                setB(false);
                            });
                        }  
                    };
                    t();
                }
            }
        }
        if(!b)
            y();
    });
    let sum=0;
    for(let i=0;i<pro.length;i++)
    {
        sum+=(pro[i].Qty*pro[i].price);
        ct.push(
            <div style={{width:'70%',margin:'4% auto',display:'flex',justifyItems:'center'}}>
                <img src={pro[i].fileImage.file} alt="..." style={{width:'16%',margin:'auto'}}/>
                <div style={{width:'30%',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    <h4>{pro[i].dishName}</h4>
                    <p>{pro[i].description}</p>
                </div>
                <h4 style={{display:'flex',alignItems:'center',margin:'auto'}}>x{pro[i].Qty}</h4>
                <h5 style={{display:'flex',alignItems:'center',margin:'auto'}}>Rs {pro[i].price}</h5>
                <i className="fa fa-trash" id={pro[i]._id} aria-hidden="true" style={{fontSize:'22px',margin:'auto 0px'}}></i>
            </div>
        );
        if(i===(pro.length-1))
        {
            ct.push(
                <>
                <hr style={{width:'70%',margin:'1% auto'}}/>
                <div style={{width:'20%',margin:'1% 10% 1% 70%'}}>
                    <h3>Total: {sum}</h3>
                    <Link to={{pathname:'/checkout',state:{bill:sum}}} style={{width:'50%',margin:'2% 0%',fontSize:'20px'}}>Checkout</Link>
                </div>
                </>
            );
            setBill(sum);
        }
      //console.log('asd');
    }
    return (
            <div style={{marginBottom:'10%'}}>
                {ct.length!=0
                    &&
                ct
                }
                {ct.length==0
                &&
                load
                }
            </div>
    );
}

export default Cart;