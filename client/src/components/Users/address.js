import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery';
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
                o.push(<div style={{width:'30%',margin:'2% 2%',borderRadius:'10px',borderStyle:'inset'}}>{data[i].location}</div>);
            }
            setSaveAdd(o);
        };
        if(!b)
            y();
        $('#save').click(async ()=>{
            let data=JSON.parse(localStorage.getItem('user'));
            if(data.address)
                data.address.push({location:add,lng:lng,lat:lat});
            else
                data.address=[{location:add,lng:lng,lat:lat}];
            let o=[];
            for(let i=0;i<data.address.length;i++)
            {
                o.push(<div>{data.address[i].location}</div>);
                if((i+1)===data.address.length)
                {
                    setSaveAdd(o);
                }
            }
            localStorage.setItem('user',JSON.stringify(data));
            $('.map-container').css('visibility','hidden');
            setAdd("");
            let p=await fetch('http://localhost:4000/address',{
                method:'post',
                body:JSON.stringify(data),
                headers:{
                    'content-Type': 'application/json'
                }
            });
            p=await p.json();
            console.log(p);
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
    return (
        <div style={{marginBottom:'10%',position:'relative',left:'5%',top:'2%'}}>
            <h2>Addresses</h2>
            {saveAdd}
            <button onClick={()=>{$('.map-container').css('visibility','visible')}}>Add Address</button>
            <div className="map-container" ref={mapContainer} style={{ 'height': '400px', 'margin': '2% 5%',visibility:'hidden'}} />
            {add && <><p style={{ 'display': 'flex', 'justifyContent': 'center' }}>Address: {add}</p> <button id='save' style={{'margin':'0px 50%',width:'5%'}}>Save</button></>}
        </div>
    );
}

export default Address;