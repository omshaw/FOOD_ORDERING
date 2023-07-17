import React, { useEffect, useState } from 'react';
// import  from 'react-router-dom';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
const Resturant = ({change}) => {
    const {id}=useParams();
    const [rec,setRec]=useState([]);
    const [v,setV]=useState([]);
    const [b,setB]=useState(false);
    const pro=[];
        
    // const [b,setB]=useState(false);
    let dummy=(<div style={{height:'100vh'}}></div>)
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
    useEffect(()=>{
        const y=async()=>
        {
            setB(true);
            let p = await fetch('http://localhost:4000/resturants', {
                method: 'post',
                body: JSON.stringify({_id:id}),
                headers: {
                        'Content-Type': 'application/json'
                }
            });
            p=await p.json();
            setRec(p);
            let V=await fetch('http://localhost:4000/find-product',{
                method: 'post',
                body: JSON.stringify({name:p[0].name}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            V=await V.json();
            setV(V);
            $('.Sub').click(async function(e) {
                e.preventDefault();
                let p=$(this.nextElementSibling).val()-1;
                if(p<0)
                    return;
                $(this.nextElementSibling).val(p);
                // console.log($(this.previousElementSibling)[0].attributes[0].value);
                let t=$(this.previousElementSibling)[0].attributes[0].value;
                let old=localStorage.getItem('cart');
                if(old)
                {
                    let o=JSON.parse(old);
                    let update=false;
                    for(let i=0;i<o.length;i++)
                    {
                        if(o[i].id===t)
                        {
                            update=true;
                            o[i].Qty=p;
                            if(p===0)
                            {
                                o.splice(i,1);
                            }
                            break;
                        }   
                    }
                    if(update)
                    {
                        localStorage.setItem('cart',JSON.stringify(o));
                    }
                    else
                    {
                        o.push({id:t,Qty:p})
                        localStorage.setItem('cart',JSON.stringify(o));
                    }
                }
                else
                    localStorage.setItem('cart',JSON.stringify([{id:t,Qty:p}]));
                change();
            });
            $('.Add').click(async function(e) {
                e.preventDefault();
                let p=$(this.previousElementSibling).val();
                p=parseInt(p)+1;
                // console.log(p);
                $(this.previousElementSibling).val(p);
                let t=$(this.parentNode.childNodes)[0].attributes[0].value;
                let old=localStorage.getItem('cart');
                if(old)
                {
                    let o=JSON.parse(old);
                    let update=false;
                    for(let i=0;i<o.length;i++)
                    {
                        if(o[i].id===t)
                        {
                            update=true;
                            o[i].Qty=p;
                            break;
                        }   
                    }
                    if(update)
                    {
                        localStorage.setItem('cart',JSON.stringify(o));
                    }
                    else
                    {
                        o.push({id:t,Qty:p})
                        localStorage.setItem('cart',JSON.stringify(o));
                    }
                }
                else
                    localStorage.setItem('cart',JSON.stringify([{id:t,Qty:p}]));
                change();
            });
            $('.count').on('input',function(e){
                let s=e.target.value;
                if(e.target.value==='')
                {
                    s='0';
                }
                if(s.length>1&&s[0]==='0')
                    s=s[1];
                $(this).val(s);


                let t=$(this.parentNode.childNodes)[0].attributes[0].value;
                let old=localStorage.getItem('cart');
                if(old)
                {
                    let o=JSON.parse(old);
                    let update=false;
                    for(let i=0;i<o.length;i++)
                    {
                        if(o[i].id===t)
                        {
                            update=true;
                            o[i].Qty=parseInt(s);
                            if(parseInt(s)===0)
                            {
                                o.splice(i,1);
                            }
                            break;
                        }   
                    }
                    if(update)
                    {
                            localStorage.setItem('cart',JSON.stringify(o));
                    }
                    else if(s!=='0')
                    {
                        o.push({id:t,Qty:parseInt(s)})
                        localStorage.setItem('cart',JSON.stringify(o));
                    }
                }
                else
                {
                    if(s!=='0')
                        localStorage.setItem('cart',JSON.stringify([{id:t,Qty:parseInt(s)}]));
                }
                change();
            });
            
        }
        if(!b)
            y();
        const cart = localStorage.getItem('cart');
        if(cart)
        {
            let c=JSON.parse(cart);
            for(let i=0;i<c.length;i++)
            {
                let k=$(`#${c[i].id}`)[0];
                if(k)
                    $(k.nextElementSibling.nextElementSibling).val(c[i].Qty);
            }
        }
    });
    for(let i=0;i<v.length;i++)
    {
        pro.push(
            <>
            <div class="card" style={{display:'flex',flexDirection:'row',width:'60%',margin:'2% auto 3% auto'}}>
                <div style={{width:'40%',margin:'auto 0px'}}>
                    <p>{v[i].dishName}</p>
                    <p>Rs {v[i].price}</p>
                    <p style={{fontSize:'12px'}}>{v[i].description}</p>
                </div> 
                <div style={{width:'60%'}}>
                    <img src={v[i].fileImage.file} class="card-img-top" alt="..." style={{ width: '50%', objectFit: 'cover',margin:'auto',display:'block' }} />
                    <div style={{margin:'2% auto', width:'50%',display:'flex',flexDirection :'row'}}>
                        <p id={v[i]._id}/>
                        <button className='Sub' style={{border:'none',display:'block',margin:'0px 3% 0px 35%',width:'10%'}}>-</button>
                        <input className='count' style={{width:'15%',border:'none',outline:'none',textAlign:'center'}} value={0}/>
                        <button className='Add' style={{border:'none',display:'block',margin:'0px 35% 0px 3%',width:'10%'}}>+</button>
                    </div>
                </div>
            </div>
            <hr style={{width:'56%',margin:'0px auto'}}/>
            </>
        );
        load=[];
    }
    return (
        <>
        {
            rec.length===0
            &&
            dummy
        }      
        {
            rec.length!==0
            &&
            <div>
            <p style={{margin:'2% 30% 0% 20%'}}>{rec[0].name}</p>
            <p style={{margin:'1% 30% 1% 20%'}}>{rec[0].location.address}</p>
            <hr style={{width:'60%',margin:'0px auto 5% auto'}}></hr>
            {pro.length===0 && load}
            {pro}
            </div>
        }
        </>
    );
}

export default Resturant;