import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
const Home = ({change}) => {
    const t = [];
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
    const navigate = useNavigate();
    const [l, setL] = useState([]);
    const [b,SetB]=useState(true);
    useEffect(() => {
        const auth = localStorage.getItem('user');
        change();
        if (!auth)
            navigate('/login');
        const y=async () => {
            let p = await fetch('http://localhost:4000/resturants', {
                method: 'post',
                body: JSON.stringify({}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            p=await p.json();
            console.log(p);
            SetB(false);
            setL(p);
        }
        if(b)
            y();
        $('.card2').click(async function(e) {
            // console.log($(this.childNodes[1].childNodes[0]).text());
            var name=$(this.childNodes[1].childNodes[0]).text();
            let x="";
            for (var i = 0; i < l.length; i++) {
                if(l[i].name === name)
                {
                    x=l[i]._id;
                    break;
                }
            }
            navigate('./resturant/'+(x));
        });
    })
    function f() {
        document.getElementById('btn').style.visibility = 'visible';
    }
    for (var i = 0; i < l.length; i++) {
        t.push(
            <div class="card">
                <div class="card2">
                    <img src={l[i].fileImage.file} class="card-img-top" alt="..." style={{ width: '100%', height: '275px', objectFit: 'cover' }} />
                    <div class="card-body">
                        <h5 class="card-title">{l[i].name}</h5>
                        <p class="card-text">Some quick example text.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{l[i].location.address}</li>
                        <li class="list-group-item">A second item</li>
                    </ul>
                </div>
                
                <div class="card-body" id="card">
                    <a onClick={f} class="card-link">Quick View</a>
                </div> 
             </div>
            /* <div className="row g-0" id='btn' style={{visibility:'hidden',zIndex:'10',width:'20%',margin:'4% -16% 4% -4%',backgroundColor:'white',border:'1px solid brown'}}>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div> */
            //  </div>
        );
        load=[];
    }
    return (
        <>
            <div id="demo" class="carousel slide" data-bs-ride="carousel" data-interval="4000">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={require("../../img/5.jpg")} className="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h4 style={{ color: 'darkorange' }}>Home-made Burger</h4>
                            <p style={{ color: 'black' }}>Have a healthy & delicious home-made burger at lowest price.</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={require("../../img/6.webp")} className="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h4>Healthy Diet</h4>
                            <p style={{ color: 'bisque' }}>Try Now some healthy options !</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={require("../../img/7.jpg")} className="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h4>Try some hot combo choice</h4>
                            <p style={{ color: 'black' }}>Save extra with combos</p>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div className="Ncard" id="1" style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {t}
            </div>
            {load}        
              
        </>
    );
}

export default Home;