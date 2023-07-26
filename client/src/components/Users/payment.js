import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Link, useNavigate} from 'react-router-dom';
import { redirect } from 'react-router-dom';
const Payment = () => {
    let data = JSON.parse(localStorage.getItem('cart'));
    const [ti,setTi]=useState(5);
    let t=5;
    async function f()
    {
        $('.wrapper').css('display','none');
        $('.success').css('display','flex');
        let d=JSON.parse(localStorage.getItem('order'));
        d['phone']=JSON.parse(localStorage.getItem('user')).phone;
        let p=await fetch('http://localhost:4000/create-order',{
            method:'post',
            body:JSON.stringify(d),
            headers:{
                'Content-Type':'application/json'
            }
        });
        p=await p.json();
        if(p.msg==='Order placed Successfully !')
        {
            setInterval(()=>{t--;setTi(t)},1000);
            setTimeout(function()
            { 
                localStorage.removeItem('cart');
                localStorage.removeItem('order');
                window.location = "/"; 
            },5000);
        }
        else
            console.log('sad');
    }
    return (
        <>
        <div class="wrapper">
        {/* <h2>Payment Form</h2> */}
            <div class="input-group">
                <div class="input-box">
                    <h4>Payment Details</h4>
                    <input type="radio" name="pay" id="bc1" checked class="radio"/>
                    <label for="bc1"><span><i class="fa fa-cc-visa"></i> Credit Card</span></label>
                    <input type="radio" name="pay" id="bc2" class="radio"/>
                    <label for="bc2"><span><i class="fa fa-cc-paypal"></i> Paypal</span></label>
                </div>
            </div>
            <div class="input-group">
                <div class="input-box">
                    <input type="tel" placeholder="Card Number" required class="name"/>
                    <i class="fa fa-credit-card icon"></i>
                </div>
            </div>
            <div class="input-group">
                <div class="input-box">
                    <input type="tel" placeholder="Card CVC" required class="name"/>
                    <i class="fa fa-user icon"></i>
                </div>
                <div class="input-box">
                    <select>
                        <option>Month</option>
                        <option>Jan</option>
                        <option>Feb</option>
                        <option>Mar</option>
                        <option>Apr</option>
                        <option>May</option>
                        <option>Jun</option>
                        <option>Jul</option>
                        <option>Aug</option>
                        <option>Sept</option>
                        <option>Oct</option>
                        <option>Nov</option>
                        <option>Dec</option>
                    </select>
                    <select>
                        <option>Year</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                    </select>
                </div>
            </div>
            <div class="input-group">
                <div class="input-box">
                    <button className='but' onClick={f}>PAY Rs {JSON.parse(localStorage.getItem('order')).total}</button>
                </div>
            </div>
    </div>
    <div className='success' style={{display:'none',width:'40%',margin:'7% auto',flexDirection:'column',boxShadow:'0px 0px 20px rgba(0,0,0,0.5)',backgroundColor:'cornsilk'}}>
            <i class="fa fa-check-circle-o" aria-hidden="true" style={{fontSize:'100px',color:'green',margin:'4% auto'}}></i>
            <h4 style={{margin:'2% auto'}}>Success</h4>
            <h4 style={{margin:'2% auto 7% auto'}}>Redirecting to home page in {ti} seconds</h4>
        </div>
    </>
    );
}

export default Payment;