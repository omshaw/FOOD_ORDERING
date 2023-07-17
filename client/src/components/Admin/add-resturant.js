import React, { useEffect, useRef, useState } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
mapboxgl.accessToken = "pk.eyJ1Ijoic3RhcjRkcm9pZCIsImEiOiJja3psMjNnZnAzcGQ3Mm9vMTdkMDVneGd5In0.JNouDdGA-nuHFqrCvqYUGA";

const Resutrant = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(88.38);
    const [lat, setLat] = useState(22.62);
    const [zoom, setZoom] = useState(14);
    const [add, setAdd] = useState("");
    const [name, setName] = useState("");
    let [image, setImage] = useState(null);
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
    const [msg, setMsg] = useState("");
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user'));
    async function address(lg, lt) {
        let v = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lg},${lt}.json?&access_token=${mapboxgl.accessToken}`)
        v = await v.json();
        setAdd(v.features[0].place_name);
    }
    useEffect(() => {
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
    // useEffect(() => {
    //     if (!map.current) return; // wait for map to initialize
    //     map.current.on('move', () => {
    //         setLng(map.current.getCenter().lng.toFixed(4));
    //         setLat(map.current.getCenter().lat.toFixed(4));
    //         setZoom(map.current.getZoom().toFixed(2));
    //     });
    // });
    async function f() {
        if (name == "") {
            setMsg('Enter Resturant Name !');
            return;
        }
        if (add == "") {
            setMsg('Select location from the map!');
            return;
        }
        if(image==null)
        {
            setMsg('Upload Image of the Resturant');
        }
        let v = await fetch('http://localhost:4000/admin/find-resturant', {
            method: 'post',
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        v = await v.json();
        if (v.length) {
            setMsg('Resturant Name Already Exist !');
            return;
        }
        const Image = await convertToBase64(image);
        const fileImage = {
            file: Image
        }
        const location = {
            address: add,
            lng: lng,
            lat: lat
        };
        v = await fetch('http://localhost:4000/admin/add-resturant', {
            method: 'post',
            body: JSON.stringify({ name,fileImage,location}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        v = await v.json();
        setMsg(v.msg);
        setName("");
        setAdd("");
        setImage(null);
        inputref.current.value = "";
    }

    return (
        <div>
            <div className='box' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>Register Resturant:</h1>
                <div className='hidden'>{msg}</div>
                <input placeholder='Enter Resturant Name' type="text" onChange={(e) => { setMsg(""); setName(e.target.value) }} value={name} required></input>
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
                <label>Drop Resturant location below</label>
            </div>
            <div className="map-container" ref={mapContainer} style={{ 'height': '400px', 'margin': '2% 5%' }} />
            {add && <p style={{ 'display': 'flex', 'justifyContent': 'center' }}>Address: {add}</p>}
            <button style={{ 'margin': '0 45.8%' }} onClick={f}>Submit</button>
        </div>
    );
}

export default Resutrant;