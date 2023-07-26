import React, { useEffect, useState, useRef } from 'react';
import $, { data } from 'jquery';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
mapboxgl.accessToken = "pk.eyJ1Ijoic3RhcjRkcm9pZCIsImEiOiJja3psMjNnZnAzcGQ3Mm9vMTdkMDVneGd5In0.JNouDdGA-nuHFqrCvqYUGA";

const Address = () => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [b,setB]=useState(false);
    const [lng, setLng] = useState(88.38);
    const [lat, setLat] = useState(22.62);
    const [zoom, setZoom] = useState(14);
    const [add, setAdd] = useState("");
    const [msg, setMsg] = useState("");
    const [saveAdd,setSaveAdd]=useState([]);
    async function address(lg, lt) {
        let v = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lg},${lt}.json?&access_token=${mapboxgl.accessToken}`)
        v = await v.json();
        setAdd(v.features[0].place_name);
    }
    useEffect(()=>{
        let y=()=>{
            setB(true);
            let data=JSON.parse(localStorage.getItem('user')).address;
            let o=[];
            for(let i=0;i<data.length;i++)
            {
                o.push(
                <div style={{display:'flex'}}>
                <div style={{width:'30%',margin:'2% 2%',borderRadius:'10px',borderStyle:'inset'}}>
                    {data[i].location}
                </div>
                <i class="fa fa-pencil edit" aria-hidden="true" style={{fontSize:'14px',margin:'auto 7px auto 5px'}}></i>
                <i class="fa fa-check" aria-hidden="true" style={{margin:'auto 7px auto 5px',display:'none'}}></i>
                <i class="fa fa-trash delete" aria-hidden="true" style={{fontSize:'14px',margin:'auto 5px auto 7px'}}></i>
                </div>);
            }
            setSaveAdd(o);
        };
        if(!b)
            y();
        
        $('.delete').click(function(){
            let data=JSON.parse(localStorage.getItem('user'));
            let sel=$(this.previousElementSibling.previousElementSibling.previousElementSibling)[0].innerText;
            for(let i=0;i<data.address.length;i++)
            {
                if(data.address[i].location===sel)
                {
                    data.address.splice(i,1);
                    localStorage.setItem('user',JSON.stringify(data));
                    setB(false);
                    break;
                }
            }
            let k=async()=>{
                let p=await fetch('http://localhost:4000/address',{
                    method:'post',
                    body:JSON.stringify(data),
                    headers:{
                        'content-Type': 'application/json'
                    }
                });
                p=await p.json();
                console.log(p);
            }
            k();
        });
        $('.edit').click(function(){
            $(this).css('display','none');
            $(this.nextElementSibling).css('display','block');
            $(this.previousElementSibling).attr('contenteditable','true');
            
        });
        $('.fa-check').click(function(){
            $(this.previousElementSibling).css('display','block');
            $(this).css('display','none');
            $(this.previousElementSibling.previousElementSibling).attr('contenteditable','false');
            // let l=Array.prototype.indexOf.call($(this.parentElement.parentElement.children), $(this.parentElement));
            let p=this.parentElement.parentElement.children;
            let child=this.parentElement;
            let l=Array.from(p).indexOf(child);
            let data=JSON.parse(localStorage.getItem('user'));
            data.address[l-1].location=this.previousElementSibling.previousElementSibling.innerText;
            localStorage.setItem('user',JSON.stringify(data));
            let k=async()=>{
            let p=await fetch('http://localhost:4000/address',{
                method:'post',
                body:JSON.stringify(data),
                headers:{
                    'content-Type': 'application/json'
                }
            });
            p=await p.json();
            console.log(p);
            }
            k();
        });
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        let marker = new mapboxgl.Marker({ draggable: true })
            .setLngLat({ lng, lat })
            .addTo(map.current);
        marker.on('dragend', () => {
            setLat(parseFloat(marker.getLngLat().lat));
            setLng(parseFloat(marker.getLngLat().lng));
            address(marker.getLngLat().lng, marker.getLngLat().lat);
            setMsg("");
        })
        map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
        const ctrl = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: false
        });
        map.current.addControl(ctrl);
        ctrl.on('result', (e) => {
            marker.remove();
            marker = new mapboxgl.Marker({ draggable: true })
                .setLngLat(e.result.center)
                .addTo(map.current)
            address(e.result.center[0], e.result.center[1]);
            setLat(e.result.center[1]);
            setLng(e.result.center[0]);
            setMsg("");
            marker.on('dragend', () => {
                setLat(marker.getLngLat().lat);
                setLng(marker.getLngLat().lng);
                address(marker.getLngLat().lng, marker.getLngLat().lat);
                setMsg("");
            })
        });
    });
    function f() {
        let data=JSON.parse(localStorage.getItem('user'));
            if(data.address.length)
                data.address.push({location:add,lng:lng,lat:lat});
            else
                data.address=[{location:add,lng:lng,lat:lat}];
            let o=[];
            for(let i=0;i<data.address.length;i++)
            {
                o.push(
                    <div style={{display:'flex'}}>
                    <div style={{width:'30%',margin:'2% 2%',borderRadius:'10px',borderStyle:'inset'}}>
                        {data.address[i].location}
                    </div>
                    <i class="fa fa-pencil edit" aria-hidden="true" style={{fontSize:'14px',margin:'auto 7px auto 5px'}}></i>
                    <i class="fa fa-check" aria-hidden="true" style={{margin:'auto 7px auto 5px',display:'none'}}></i>
                    <i class="fa fa-trash delete" aria-hidden="true" style={{fontSize:'14px',margin:'auto 5px auto 7px'}}></i>
                    </div>);
                if((i+1)===data.address.length)
                {
                    setSaveAdd(o);
                }
            }
            localStorage.setItem('user',JSON.stringify(data));
            $('.map-container').css('visibility','hidden');
            setAdd("");
            let k=async()=>{
            let p=await fetch('http://localhost:4000/address',{
                method:'post',
                body:JSON.stringify(data),
                headers:{
                    'content-Type': 'application/json'
                }
            });
            p=await p.json();
            console.log(p);
            }
            k();
    }
    return (
        <div style={{marginBottom:'10%',marginLeft:'5%'}}>
            <h2>Addresses</h2>
            {saveAdd}
            <button onClick={()=>{$('.map-container').css('visibility','visible')}}>Add Address</button>
            <div className="map-container" ref={mapContainer} style={{ 'height': '400px', 'margin': '2% 5%',visibility:'hidden'}} />
            {add && <><p style={{ 'display': 'flex', 'justifyContent': 'center' }}>Address: {add}</p> <button id='save' onClick={f} style={{'margin':'0px 50%',width:'5%'}}>Save</button></>}
        </div>
    );
}

export default Address;